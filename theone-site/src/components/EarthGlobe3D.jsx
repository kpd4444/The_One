import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import earthAtmosMapUrl from "../assets/earth/earth_atmos_2048.jpg";
import earthCloudMapUrl from "../assets/earth/earth_clouds_1024.png";
import earthNormalMapUrl from "../assets/earth/earth_normal_2048.jpg";
import earthSpecularMapUrl from "../assets/earth/earth_specular_2048.jpg";

const STAR_COUNT = 1200;

function createStars() {
  const positions = new Float32Array(STAR_COUNT * 3);

  for (let index = 0; index < STAR_COUNT; index += 1) {
    const radius = 8 + Math.random() * 10;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    positions[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[index * 3 + 1] = radius * Math.cos(phi);
    positions[index * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color: 0xcfe0ff,
    size: 0.035,
    transparent: true,
    opacity: 0.75,
    sizeAttenuation: true,
    depthWrite: false,
  });

  return new THREE.Points(geometry, material);
}

function createAtmosphereMaterial() {
  return new THREE.ShaderMaterial({
    uniforms: {
      glowColor: { value: new THREE.Color("#72afff") },
    },
    vertexShader: `
      varying vec3 vNormal;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 glowColor;
      varying vec3 vNormal;
      void main() {
        float intensity = pow(0.72 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 4.0);
        gl_FragColor = vec4(glowColor * intensity, intensity * 0.88);
      }
    `,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
    transparent: true,
    depthWrite: false,
  });
}

export default function EarthGlobe3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) {
      return undefined;
    }

    const mountNode = mountRef.current;
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.26;
    renderer.domElement.className = "earth-globe-canvas";
    mountNode.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 1000);
    camera.position.set(0, 0, 3.45);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.55;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.minPolarAngle = Math.PI * 0.33;
    controls.maxPolarAngle = Math.PI * 0.67;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.48;

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.05);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.15);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);

    const rimLight = new THREE.DirectionalLight(0x8eb8ff, 0.72);
    rimLight.position.set(-4, -1.5, -2);
    scene.add(rimLight);

    const hemiLight = new THREE.HemisphereLight(0xbfd6ff, 0x1a2742, 0.92);
    scene.add(hemiLight);

    const group = new THREE.Group();
    scene.add(group);

    const loader = new THREE.TextureLoader();
    let frameId = 0;
    let resizeObserver;
    let stars;
    let earthMesh;
    let cloudMesh;
    let atmosphereMesh;
    let disposed = false;

    const resize = () => {
      const width = mountNode.clientWidth || 480;
      const height = mountNode.clientHeight || width;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    Promise.all([
      loader.loadAsync(earthAtmosMapUrl),
      loader.loadAsync(earthNormalMapUrl),
      loader.loadAsync(earthSpecularMapUrl),
      loader.loadAsync(earthCloudMapUrl),
    ]).then(([surfaceMap, normalMap, specularMap, cloudMap]) => {
      if (disposed) {
        [surfaceMap, normalMap, specularMap, cloudMap].forEach((texture) => texture.dispose());
        return;
      }

      surfaceMap.colorSpace = THREE.SRGBColorSpace;
      cloudMap.colorSpace = THREE.SRGBColorSpace;
      normalMap.colorSpace = THREE.NoColorSpace;
      specularMap.colorSpace = THREE.NoColorSpace;

      [surfaceMap, normalMap, specularMap, cloudMap].forEach((texture) => {
        texture.anisotropy = 8;
      });

      const earthGeometry = new THREE.SphereGeometry(1.08, 64, 64);
      const earthMaterial = new THREE.MeshPhongMaterial({
        map: surfaceMap,
        normalMap,
        normalScale: new THREE.Vector2(0.55, 0.55),
        specularMap,
        specular: new THREE.Color("#6d7f95"),
        shininess: 14,
        emissive: new THREE.Color("#1b2f56"),
        emissiveIntensity: 0.16,
      });

      earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
      earthMesh.rotation.set(0.22, -1.95, 0.08);
      group.add(earthMesh);

      const cloudGeometry = new THREE.SphereGeometry(1.096, 64, 64);
      const cloudMaterial = new THREE.MeshPhongMaterial({
        map: cloudMap,
        transparent: true,
        opacity: 0.4,
        depthWrite: false,
      });

      cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
      cloudMesh.rotation.copy(earthMesh.rotation);
      group.add(cloudMesh);

      atmosphereMesh = new THREE.Mesh(
        new THREE.SphereGeometry(1.13, 64, 64),
        createAtmosphereMaterial(),
      );
      atmosphereMesh.rotation.copy(earthMesh.rotation);
      group.add(atmosphereMesh);

      stars = createStars();
      scene.add(stars);

      resize();
      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(mountNode);

      const animate = () => {
        cloudMesh.rotation.y += 0.0009;
        controls.update();
        renderer.render(scene, camera);
        frameId = window.requestAnimationFrame(animate);
      };

      frameId = window.requestAnimationFrame(animate);
    });

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frameId);
      resizeObserver?.disconnect();
      controls.dispose();

      scene.traverse((object) => {
        if (object.isMesh) {
          object.geometry?.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach((material) => material.dispose());
          } else {
            object.material?.dispose();
          }
        }
      });

      stars?.geometry.dispose();
      stars?.material.dispose();
      renderer.dispose();

      if (mountNode.contains(renderer.domElement)) {
        mountNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div className="earth-globe-three" ref={mountRef} aria-hidden="true" />;
}

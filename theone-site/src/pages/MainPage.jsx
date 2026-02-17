const quickMenus = [
  { icon: "🎓", label: "더원" },
  { icon: "💻", label: "조성록" },
  { icon: "📄", label: "더원" },
  { icon: "📰", label: "더원" },
  { icon: "🧩", label: "더원" },
  { icon: "🏅", label: "더원" },
];

const courses = [
  { title: "SPRING BOOT JAVA", tone: "tone-blue" },
  { title: "ADVANCED BACK-END", tone: "tone-gold" },
  { title: "SPRING BOOT JAVA", tone: "tone-red" },
];

export default function MainPage() {
  return (
    <main>
      <section className="visual-strip" aria-hidden="true" />

      <section className="quick-section section">
        <div className="container">
          <div className="quick-grid">
            {quickMenus.map((item) => (
              <button key={item.label} className="quick-item" type="button">
                <span>{item.icon}</span>
                <strong>{item.label}</strong>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section course-section">
        <div className="container">
          <div className="course-head">
            <h2> 시작!</h2>
            <a href="#">더 보기 ❯</a>
          </div>

          <div className="course-grid">
            {courses.map((course) => (
              <article key={`${course.title}-${course.tone}`} className={`course-card ${course.tone}`}>
                <div className="course-overlay">
                  <p>{course.title}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

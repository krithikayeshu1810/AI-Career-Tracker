function About() {
  return (
    <section
      id="about"
      className="py-24 px-6 bg-gradient-to-b from-slate-950 to-slate-900"
    >

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">

        <div>

          <p className="text-blue-400 font-semibold mb-3">
            ABOUT CAREERPILOT
          </p>

          <h2 className="text-4xl md:text-5xl font-bold">
            Your Career Journey,
            <span className="text-blue-500"> Simplified.</span>
          </h2>

          <p className="text-slate-400 text-lg leading-8 mt-6">
            CareerPilot is an AI-powered career management platform
            designed for students and job seekers.
          </p>

          <p className="text-slate-400 text-lg leading-8 mt-4">
            Track your applications, improve your resume,
            discover career opportunities and understand your
            career progress from one dashboard.
          </p>

          <button className="mt-8 px-7 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold transition">
            Explore CareerPilot
          </button>

        </div>

        <div className="grid grid-cols-2 gap-5">

          <div className="p-7 rounded-2xl bg-blue-500/10 border border-blue-500/20">
            <div className="text-4xl">🎯</div>
            <h3 className="font-bold text-xl mt-4">
              Career Goals
            </h3>
            <p className="text-slate-400 mt-2">
              Stay focused on your career goals.
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-violet-500/10 border border-violet-500/20">
            <div className="text-4xl">📈</div>
            <h3 className="font-bold text-xl mt-4">
              Track Progress
            </h3>
            <p className="text-slate-400 mt-2">
              See how your applications are progressing.
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-cyan-500/10 border border-cyan-500/20">
            <div className="text-4xl">🤖</div>
            <h3 className="font-bold text-xl mt-4">
              AI Assistance
            </h3>
            <p className="text-slate-400 mt-2">
              Improve your resume with intelligent analysis.
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
            <div className="text-4xl">💼</div>
            <h3 className="font-bold text-xl mt-4">
              Job Opportunities
            </h3>
            <p className="text-slate-400 mt-2">
              Organize your job search easily.
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}

export default About;
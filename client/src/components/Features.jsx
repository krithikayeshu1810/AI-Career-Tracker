const features = [
  {
    icon: "🤖",
    title: "Resume Analyzer",
    description:
      "Analyze your resume and improve your ATS score with useful feedback.",
  },
  {
    icon: "💼",
    title: "Job Tracker",
    description:
      "Track companies, applications, interviews and job opportunities.",
  },
  {
    icon: "📊",
    title: "Analytics",
    description:
      "Understand your career progress with simple visual analytics.",
  },
  {
    icon: "👤",
    title: "Profile",
    description:
      "Maintain your education, skills, GitHub and LinkedIn information.",
  },
];

function Features() {
  return (
    <section
      id="features"
      className="py-24 px-6 bg-slate-950"
    >

      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-14">

          <p className="text-blue-400 font-semibold mb-3">
            POWERFUL FEATURES
          </p>

          <h2 className="text-4xl md:text-5xl font-bold">
            Everything For Your Career
          </h2>

          <p className="text-slate-400 mt-5 max-w-2xl mx-auto">
            Everything you need to manage your career journey
            in one place.
          </p>

        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {features.map((feature) => (

            <div
              key={feature.title}
              className="group p-7 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/40 hover:bg-blue-500/5 transition duration-300"
            >

              <div className="text-4xl mb-6 group-hover:scale-110 transition">
                {feature.icon}
              </div>

              <h3 className="text-xl font-bold">
                {feature.title}
              </h3>

              <p className="text-slate-400 mt-4 leading-7">
                {feature.description}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Features;
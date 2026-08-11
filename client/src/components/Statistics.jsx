const stats = [
  ["500+", "Registered Users"],
  ["1200+", "Job Applications"],
  ["350+", "Resumes Analyzed"],
  ["98%", "Success Rate"],
];

function Statistics() {
  return (
    <section className="py-20 px-6 bg-slate-900">

      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

          {stats.map(([number, label]) => (

            <div
              key={label}
              className="text-center p-8 rounded-2xl bg-white/5 border border-white/10"
            >

              <h2 className="text-4xl md:text-5xl font-extrabold text-blue-400">
                {number}
              </h2>

              <p className="text-slate-400 mt-3">
                {label}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Statistics;
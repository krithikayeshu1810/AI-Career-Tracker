const testimonials = [
  {
    name: "Rahul Sharma",
    text: "CareerPilot helped me organize all my job applications. The dashboard is simple and easy to use.",
  },
  {
    name: "Priya Reddy",
    text: "The Resume Analyzer gave me useful suggestions. I improved my resume and got interview calls.",
  },
  {
    name: "Arjun Kumar",
    text: "This is one of the best career management platforms for students and freshers.",
  },
];

function Testimonials() {
  return (
    <section className="py-24 px-6 bg-slate-950">

      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-14">

          <p className="text-blue-400 font-semibold">
            TESTIMONIALS
          </p>

          <h2 className="text-4xl font-bold mt-2">
            What Our Users Say
          </h2>

        </div>

        <div className="grid md:grid-cols-3 gap-6">

          {testimonials.map((item) => (

            <div
              key={item.name}
              className="p-7 rounded-2xl bg-white/5 border border-white/10"
            >

              <div className="text-yellow-400 text-xl">
                ★★★★★
              </div>

              <p className="text-slate-300 leading-7 mt-5">
                "{item.text}"
              </p>

              <h3 className="font-bold mt-6">
                {item.name}
              </h3>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Testimonials;
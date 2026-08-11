import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  const handleLearnMore = () => {
    document
      .getElementById("features")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  return (
    <section
      id="home"
      className="min-h-screen pt-32 flex items-center relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950"
    >

      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />

      <div className="absolute bottom-0 -left-40 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">

        <div className="max-w-4xl">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-7">
            🚀 Your Career. Your Future.
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">

            Build Your Career

            <span className="block bg-gradient-to-r from-blue-400 to-violet-500 bg-clip-text text-transparent">
              With Confidence
            </span>

          </h1>

          <p className="mt-7 text-lg md:text-xl text-slate-300 leading-8 max-w-3xl">
            CareerPilot helps you track jobs, analyze your resume,
            discover career paths, and monitor your career progress
            in one powerful platform.
          </p>

          <div className="flex flex-wrap gap-5 mt-10">

            <button
              onClick={() => navigate("/register")}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-blue-600/20 transition"
            >
              Get Started 🚀
            </button>

            <button
              onClick={handleLearnMore}
              className="border border-white/20 bg-white/5 hover:bg-white/10 px-8 py-4 rounded-xl font-bold text-lg transition"
            >
              Learn More
            </button>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;
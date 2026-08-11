import { useNavigate } from "react-router-dom";
import {
  FaReact,
  FaNodeJs,
  FaPython,
} from "react-icons/fa";

function CareerPath() {
  const navigate = useNavigate();

  const careerPaths = [
    {
      id: "frontend",
      title: "Frontend Developer",
      icon: <FaReact />,
      level: "Beginner → Advanced",
      skills: [
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "Tailwind CSS",
      ],
    },
    {
      id: "fullstack",
      title: "Full Stack Developer",
      icon: <FaNodeJs />,
      level: "Beginner → Advanced",
      skills: [
        "React",
        "Node.js",
        "Express",
        "MySQL",
        "MongoDB",
      ],
    },
    {
      id: "python",
      title: "Python Developer",
      icon: <FaPython />,
      level: "Beginner → Advanced",
      skills: [
        "Python",
        "Flask",
        "Django",
        "SQL",
        "REST APIs",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10 text-white md:px-10">

      {/* Header */}
      <div className="mb-10">
        <p className="font-semibold tracking-wide text-blue-400">
          CAREER ROADMAP
        </p>

        <h1 className="mt-2 text-4xl font-extrabold md:text-5xl">
          Career Path 🧭
        </h1>

        <p className="mt-3 max-w-2xl text-lg text-slate-400">
          Choose a career path and start learning the skills
          required to build your career.
        </p>
      </div>

      {/* Career Cards */}
      <div className="grid gap-7 lg:grid-cols-3">

        {careerPaths.map((path) => (
          <div
            key={path.id}
            className="
              rounded-3xl
              border border-slate-800
              bg-slate-900/80
              p-8
              shadow-xl
              transition-all
              duration-300
              hover:-translate-y-2
              hover:border-blue-500/50
              hover:shadow-blue-900/20
            "
          >

            {/* Icon */}
            <div
              className="
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-2xl
                bg-blue-500/10
                text-4xl
                text-blue-400
              "
            >
              {path.icon}
            </div>

            {/* Title */}
            <h2 className="mt-7 text-2xl font-bold">
              {path.title}
            </h2>

            <p className="mt-2 text-sm font-medium text-blue-400">
              {path.level}
            </p>

            {/* Skills */}
            <div className="mt-7 space-y-3">
              {path.skills.map((skill, index) => (
                <div
                  key={skill}
                  className="flex items-center gap-3"
                >
                  <span
                    className="
                      flex
                      h-8
                      w-8
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-blue-500/10
                      text-sm
                      font-bold
                      text-blue-400
                    "
                  >
                    {index + 1}
                  </span>

                  <span className="text-slate-300">
                    {skill}
                  </span>
                </div>
              ))}
            </div>

            {/* Start Learning */}
            <button
              onClick={() =>
                navigate(`/dashboard/learning/${path.id}`)
              }
              className="
                mt-8
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-blue-600
                px-6
                py-4
                font-bold
                text-white
                shadow-lg
                shadow-blue-900/20
                transition
                hover:bg-blue-500
              "
            >
              Start Learning
              <span>→</span>
            </button>

          </div>
        ))}

      </div>
    </div>
  );
}

export default CareerPath;
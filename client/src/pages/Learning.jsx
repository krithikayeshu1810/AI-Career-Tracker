import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaChevronRight,
  FaBookOpen,
  FaCode,
  FaGraduationCap,
  FaTrophy,
} from "react-icons/fa";

function Learning() {
  const navigate = useNavigate();
  const { path } = useParams();

  const courses = {
    frontend: {
      title: "Frontend Developer",
      subtitle:
        "Learn to build modern and responsive websites.",

      lessons: [
        {
          title: "HTML Basics",
          description:
            "Learn the foundation of every web page.",

          content: [
            "HTML stands for HyperText Markup Language.",
            "HTML is used to create the structure of a webpage.",
            "You will learn headings, paragraphs, links, images and buttons.",
          ],

          code: `<h1>My First Website</h1>

<p>Welcome to CareerPilot!</p>

<button>Click Me</button>`,
        },

        {
          title: "CSS Basics",
          description:
            "Learn how to style and design websites.",

          content: [
            "CSS stands for Cascading Style Sheets.",
            "CSS controls colors, fonts, spacing and layouts.",
            "You will learn Flexbox, Grid and responsive design.",
          ],

          code: `h1 {
  color: blue;
  font-size: 40px;
}

p {
  color: gray;
}`,
        },

        {
          title: "JavaScript Basics",
          description:
            "Make your websites interactive.",

          content: [
            "JavaScript adds behavior and interactivity to websites.",
            "You will learn variables, functions, conditions and events.",
            "JavaScript is the foundation for learning React.",
          ],

          code: `const name = "CareerPilot";

console.log("Welcome to " + name);`,
        },

        {
          title: "React Basics",
          description:
            "Build modern user interfaces with React.",

          content: [
            "React is a JavaScript library for building user interfaces.",
            "You will learn components, props, state and hooks.",
            "You will also learn React Router.",
          ],

          code: `function Welcome() {
  return <h1>Welcome to CareerPilot!</h1>;
}

export default Welcome;`,
        },

        {
          title: "Tailwind CSS",
          description:
            "Create beautiful interfaces using utility classes.",

          content: [
            "Tailwind CSS provides utility classes for designing interfaces.",
            "You can style React components directly using Tailwind classes.",
            "You will learn responsive layouts, colors and spacing.",
          ],

          code: `<button className="bg-blue-600 text-white px-6 py-3 rounded-xl">
  Start Learning
</button>`,
        },
      ],
    },

    fullstack: {
      title: "Full Stack Developer",
      subtitle:
        "Learn frontend, backend, APIs and databases.",

      lessons: [
        {
          title: "React",
          description:
            "Build the frontend of modern applications.",

          content: [
            "Learn React components and JSX.",
            "Understand props, state and hooks.",
            "Build interactive frontend applications.",
          ],

          code: `function App() {
  return <h1>Hello React</h1>;
}`,
        },

        {
          title: "Node.js",
          description:
            "Run JavaScript on the backend.",

          content: [
            "Node.js allows JavaScript to run outside the browser.",
            "It is commonly used for backend development.",
            "You can create servers and APIs using Node.js.",
          ],

          code: `const http = require("http");

const server = http.createServer((req, res) => {
  res.end("Hello Server");
});

server.listen(5000);`,
        },

        {
          title: "Express.js",
          description:
            "Create backend APIs using Express.",

          content: [
            "Express is a Node.js framework.",
            "It makes creating APIs and routes easier.",
            "You will learn GET, POST, PUT and DELETE.",
          ],

          code: `const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(5000);`,
        },

        {
          title: "MySQL",
          description:
            "Learn relational databases.",

          content: [
            "MySQL stores data inside tables.",
            "You will learn databases, tables, rows and columns.",
            "You will also learn SQL queries.",
          ],

          code: `SELECT * FROM users;

SELECT * FROM jobs;`,
        },

        {
          title: "MongoDB",
          description:
            "Learn NoSQL databases.",

          content: [
            "MongoDB is a NoSQL database.",
            "It stores data in document-like structures.",
            "MongoDB is commonly used with Node.js.",
          ],

          code: `{
  "name": "Krithika",
  "role": "Developer"
}`,
        },
      ],
    },

    python: {
      title: "Python Developer",
      subtitle:
        "Learn Python and backend development.",

      lessons: [
        {
          title: "Python Basics",
          description:
            "Learn Python programming fundamentals.",

          content: [
            "Learn variables and data types.",
            "Understand conditions and loops.",
            "Learn functions and basic Python programming.",
          ],

          code: `name = "CareerPilot"

print(name)`,
        },

        {
          title: "Flask",
          description:
            "Build web applications using Flask.",

          content: [
            "Flask is a lightweight Python web framework.",
            "You can use Flask to create websites and APIs.",
          ],

          code: `from flask import Flask

app = Flask(__name__)

@app.route("/")
def home():
    return "Hello Flask"

app.run()`,
        },

        {
          title: "Django",
          description:
            "Learn a powerful Python web framework.",

          content: [
            "Django is a high-level Python web framework.",
            "It provides tools for building complete applications.",
          ],

          code: `django-admin startproject myproject`,
        },

        {
          title: "SQL",
          description:
            "Learn how to work with databases.",

          content: [
            "SQL is used to communicate with relational databases.",
            "You will learn SELECT, INSERT, UPDATE and DELETE.",
          ],

          code: `SELECT * FROM students;

INSERT INTO students (name)
VALUES ('Krithika');`,
        },

        {
          title: "REST APIs",
          description:
            "Learn how applications communicate.",

          content: [
            "REST APIs allow frontend and backend applications to communicate.",
            "You will learn GET, POST, PUT and DELETE.",
          ],

          code: `GET    /api/users
POST   /api/users
PUT    /api/users/1
DELETE /api/users/1`,
        },
      ],
    },
  };

  const course = courses[path];

  const [currentLesson, setCurrentLesson] = useState(0);
  const [completed, setCompleted] = useState([]);

  if (!course) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold">
            Course Not Found
          </h1>

          <button
            onClick={() =>
              navigate("/dashboard/career-path")
            }
            className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-500"
          >
            Back to Career Paths
          </button>
        </div>
      </div>
    );
  }

  const lesson = course.lessons[currentLesson];

  const progress = Math.round(
    (completed.length / course.lessons.length) * 100
  );

  const markComplete = () => {
    if (!completed.includes(currentLesson)) {
      setCompleted((previous) => [
        ...previous,
        currentLesson,
      ]);
    }
  };

  const nextLesson = () => {
    markComplete();

    if (currentLesson < course.lessons.length - 1) {
      setCurrentLesson(
        (previous) => previous + 1
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Top Bar */}

      <div className="border-b border-slate-800 bg-slate-950">

        <div className="mx-auto max-w-7xl px-6 py-5">

          <button
            onClick={() =>
              navigate("/dashboard/career-path")
            }
            className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-blue-400"
          >
            <FaArrowLeft />
            Back to Career Paths
          </button>

        </div>

      </div>

      {/* Main */}

      <main className="mx-auto max-w-7xl px-6 py-10">

        {/* Header */}

        <div className="mb-8">

          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-400">

            <FaGraduationCap />

            Learning Path

          </div>

          <h1 className="text-4xl font-extrabold md:text-5xl">
            {course.title}
          </h1>

          <p className="mt-3 text-lg text-slate-400">
            {course.subtitle}
          </p>

        </div>

        {/* Progress */}

        <div className="mb-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">

          <div className="mb-3 flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-400">
                Course Progress
              </p>

              <p className="mt-1 font-bold">
                {completed.length} of{" "}
                {course.lessons.length} lessons completed
              </p>

            </div>

            <span className="text-2xl font-bold text-blue-400">
              {progress}%
            </span>

          </div>

          <div className="h-3 overflow-hidden rounded-full bg-slate-800">

            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

        </div>

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">

          {/* Sidebar */}

          <aside className="h-fit rounded-2xl border border-slate-800 bg-slate-900 p-4 lg:sticky lg:top-6">

            <div className="mb-4 flex items-center gap-2 px-3">

              <FaBookOpen className="text-blue-400" />

              <h2 className="font-bold">
                Course Lessons
              </h2>

            </div>

            <div className="space-y-2">

              {course.lessons.map(
                (item, index) => {

                  const active =
                    currentLesson === index;

                  const done =
                    completed.includes(index);

                  return (
                    <button
                      key={item.title}
                      onClick={() =>
                        setCurrentLesson(index)
                      }
                      className={`w-full rounded-xl p-3 text-left transition ${
                        active
                          ? "bg-blue-600 text-white"
                          : "text-slate-400 hover:bg-slate-800 hover:text-white"
                      }`}
                    >

                      <div className="flex items-center gap-3">

                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-bold ${
                            active
                              ? "bg-white/20"
                              : done
                              ? "bg-green-500/10 text-green-400"
                              : "bg-slate-800"
                          }`}
                        >
                          {done ? (
                            <FaCheckCircle />
                          ) : (
                            index + 1
                          )}
                        </div>

                        <div className="min-w-0">

                          <p className="truncate text-sm font-semibold">
                            {item.title}
                          </p>

                          <p className="mt-1 text-xs opacity-70">
                            Lesson {index + 1}
                          </p>

                        </div>

                      </div>

                    </button>
                  );
                }
              )}

            </div>

          </aside>

          {/* Lesson Content */}

          <section>

            <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl">

              {/* Lesson Header */}

              <div className="border-b border-slate-800 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 p-7 md:p-10">

                <p className="text-sm font-bold uppercase tracking-widest text-blue-400">
                  Lesson {currentLesson + 1}
                </p>

                <h2 className="mt-2 text-3xl font-bold md:text-4xl">
                  {lesson.title}
                </h2>

                <p className="mt-3 text-lg text-slate-400">
                  {lesson.description}
                </p>

              </div>

              {/* Body */}

              <div className="p-7 md:p-10">

                {/* What You Learn */}

                <div>

                  <div className="mb-5 flex items-center gap-3">

                    <div className="rounded-lg bg-blue-500/10 p-3 text-blue-400">
                      <FaBookOpen />
                    </div>

                    <h3 className="text-xl font-bold">
                      What You'll Learn
                    </h3>

                  </div>

                  <div className="space-y-3">

                    {lesson.content.map(
                      (text, index) => (

                        <div
                          key={index}
                          className="flex gap-4 rounded-xl border border-slate-800 bg-slate-950/60 p-4"
                        >

                          <FaCheckCircle className="mt-1 shrink-0 text-blue-400" />

                          <p className="leading-7 text-slate-300">
                            {text}
                          </p>

                        </div>

                      )
                    )}

                  </div>

                </div>

                {/* Code */}

                <div className="mt-10">

                  <div className="mb-5 flex items-center gap-3">

                    <div className="rounded-lg bg-purple-500/10 p-3 text-purple-400">
                      <FaCode />
                    </div>

                    <h3 className="text-xl font-bold">
                      Example
                    </h3>

                  </div>

                  <div className="overflow-hidden rounded-2xl border border-slate-800 bg-black">

                    <div className="flex items-center gap-2 border-b border-slate-800 px-5 py-3">

                      <span className="h-3 w-3 rounded-full bg-red-400" />

                      <span className="h-3 w-3 rounded-full bg-yellow-400" />

                      <span className="h-3 w-3 rounded-full bg-green-400" />

                      <span className="ml-3 text-xs text-slate-500">
                        example
                      </span>

                    </div>

                    <pre className="overflow-x-auto p-6 text-sm leading-7 text-green-400">
                      <code>
                        {lesson.code}
                      </code>
                    </pre>

                  </div>

                </div>

                {/* Buttons */}

                <div className="mt-10 flex flex-col gap-4 border-t border-slate-800 pt-7 sm:flex-row sm:justify-between">

                  <button
                    onClick={markComplete}
                    className={`flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-bold transition ${
                      completed.includes(currentLesson)
                        ? "bg-green-500/10 text-green-400"
                        : "bg-slate-800 text-white hover:bg-green-500/10 hover:text-green-400"
                    }`}
                  >
                    <FaCheckCircle />

                    {completed.includes(
                      currentLesson
                    )
                      ? "Lesson Completed"
                      : "Mark as Complete"}
                  </button>

                  {currentLesson <
                  course.lessons.length - 1 ? (
                    <button
                      onClick={nextLesson}
                      className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-3 font-bold hover:bg-blue-500"
                    >
                      Next Lesson
                      <FaChevronRight />
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        markComplete();
                      }}
                      className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-7 py-3 font-bold hover:from-blue-500 hover:to-indigo-500"
                    >
                      <FaTrophy />
                      Complete Course
                    </button>
                  )}

                </div>

              </div>

            </div>

            {/* Completed */}

            {progress === 100 && (

              <div className="mt-6 rounded-2xl border border-green-500/20 bg-green-500/10 p-7 text-center">

                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-500/20 text-2xl">
                  🏆
                </div>

                <h2 className="mt-4 text-2xl font-bold">
                  Congratulations! 🎉
                </h2>

                <p className="mt-2 text-slate-400">
                  You completed the{" "}
                  {course.title} learning path.
                </p>

              </div>

            )}

          </section>

        </div>

      </main>

    </div>
  );
}

export default Learning;
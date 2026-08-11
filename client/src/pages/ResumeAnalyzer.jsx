import { useState } from "react";
import {
  FaFilePdf,
  FaUpload,
  FaCheckCircle,
  FaLightbulb,
  FaExclamationTriangle,
  FaKey,
  FaStar,
} from "react-icons/fa";
import axios from "axios";

function ResumeAnalyzer() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState("");

  // ================= FILE CHANGE =================

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    setError("");
    setResult(null);

    if (!selectedFile) {
      setFile(null);
      return;
    }

    // Only PDF
    if (selectedFile.type !== "application/pdf") {
      setError("Please upload a PDF file only.");
      setFile(null);
      return;
    }

    // 5 MB limit
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError("Resume file must be smaller than 5 MB.");
      setFile(null);
      return;
    }

    setFile(selectedFile);
  };

  // ================= AI ANALYSIS =================

  const handleAnalyze = async () => {
    if (!file) {
      setError("Please upload your resume first.");
      return;
    }

    try {
      setAnalyzing(true);
      setError("");
      setResult(null);

      const formData = new FormData();

      formData.append("resume", file);

      // Get logged-in user
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      if (user?.id) {
        formData.append("userId", user.id);
      }

      const response = await axios.post(
        "http://localhost:5000/api/resume/analyze",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("AI Resume Result:", response.data);

      setResult(response.data);

    } catch (error) {
      console.log("Resume Analysis Error:", error);

      setError(
        error.response?.data?.message ||
          "Unable to analyze resume. Please try again."
      );

    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white px-4 sm:px-6 lg:px-8 py-10">

      <div className="max-w-6xl mx-auto">

        {/* ================= HEADER ================= */}

        <div className="mb-8">

          <p className="text-blue-400 font-semibold tracking-wider">
            AI RESUME ANALYZER
          </p>

          <h1 className="text-3xl md:text-4xl font-bold mt-2">
            Resume Analyzer 🤖
          </h1>

          <p className="text-slate-400 mt-2">
            Upload your resume and let AI analyze your resume,
            ATS compatibility, errors and improvements.
          </p>

        </div>

        {/* ================= UPLOAD ================= */}

        <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl">

          <div className="border-2 border-dashed border-blue-500/30 rounded-2xl p-8 md:p-12 text-center hover:border-blue-500 transition">

            <FaFilePdf className="text-6xl text-red-400 mx-auto" />

            <h2 className="text-2xl font-bold mt-5">
              Upload Your Resume
            </h2>

            <p className="text-slate-400 mt-2">
              Upload your PDF resume and AI will analyze it.
            </p>

            {/* Choose PDF */}

            <label className="inline-flex items-center gap-3 mt-7 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl cursor-pointer font-semibold transition">

              <FaUpload />

              Choose PDF

              <input
                type="file"
                accept="application/pdf,.pdf"
                className="hidden"
                onChange={handleFileChange}
              />

            </label>

            {/* Selected File */}

            {file && (
              <div className="mt-5">

                <p className="text-blue-400 font-medium">
                  📄 {file.name}
                </p>

                <p className="text-slate-500 text-sm mt-1">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>

              </div>
            )}

            {/* Error */}

            {error && (
              <div className="mt-5 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">

                ⚠️ {error}

              </div>
            )}

            {/* Analyze */}

            <button
              onClick={handleAnalyze}
              disabled={analyzing || !file}
              className="block mx-auto mt-6 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed transition"
            >

              {analyzing
                ? "🤖 AI is analyzing..."
                : "🤖 Analyze Resume with AI"}

            </button>

          </div>

        </div>

        {/* ================= LOADING ================= */}

        {analyzing && (
          <div className="mt-8 bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6 text-center">

            <div className="animate-pulse">

              <p className="text-blue-400 font-semibold text-lg">
                🤖 AI is analyzing your resume...
              </p>

              <p className="text-slate-400 mt-2">
                Please wait while AI reviews your resume.
              </p>

            </div>

          </div>
        )}

        {/* ================= AI RESULT ================= */}

        {result && (

          <div className="mt-8 space-y-6">

            {/* Score + Summary */}

            <div className="grid lg:grid-cols-3 gap-6">

              {/* SCORE */}

              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-center shadow-xl">

                <FaCheckCircle className="text-5xl mx-auto text-white" />

                <p className="text-blue-100 mt-5">
                  AI Resume Score
                </p>

                <h2 className="text-7xl font-extrabold mt-2">
                  {result.score}
                </h2>

                <p className="text-blue-100 mt-2">
                  / 100
                </p>

                <p className="text-blue-100 mt-4">
                  AI Generated Score
                </p>

              </div>

              {/* SUMMARY */}

              <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-8">

                <div className="flex items-center gap-3">

                  <FaStar className="text-yellow-400 text-2xl" />

                  <h2 className="text-2xl font-bold">
                    AI Resume Summary
                  </h2>

                </div>

                <p className="text-slate-300 mt-5 leading-7">
                  {result.summary ||
                    "AI did not provide a summary."}
                </p>

              </div>

            </div>

            {/* ================= ERRORS ================= */}

            <AnalysisSection
              icon={<FaExclamationTriangle />}
              title="Errors Found"
              items={result.errors}
              type="error"
            />

            {/* ================= ATS ================= */}

            <AnalysisSection
              icon={<FaKey />}
              title="ATS Issues"
              items={result.atsIssues}
              type="warning"
            />

            {/* ================= MISSING KEYWORDS ================= */}

            <AnalysisSection
              icon={<FaKey />}
              title="Missing Keywords"
              items={result.missingKeywords}
              type="info"
            />

            {/* ================= STRENGTHS ================= */}

            <AnalysisSection
              icon={<FaCheckCircle />}
              title="Resume Strengths"
              items={result.strengths}
              type="success"
            />

            {/* ================= SUGGESTIONS ================= */}

            <AnalysisSection
              icon={<FaLightbulb />}
              title="AI Suggestions"
              items={result.suggestions}
              type="suggestion"
            />

          </div>

        )}

      </div>

    </div>
  );
}


// =====================================================
// ANALYSIS SECTION
// =====================================================

function AnalysisSection({
  icon,
  title,
  items,
  type,
}) {
  const safeItems = Array.isArray(items)
    ? items
    : [];

  const styles = {
    error: "border-red-500/20 bg-red-500/5",
    warning: "border-yellow-500/20 bg-yellow-500/5",
    info: "border-blue-500/20 bg-blue-500/5",
    success: "border-green-500/20 bg-green-500/5",
    suggestion: "border-purple-500/20 bg-purple-500/5",
  };

  const iconStyles = {
    error: "text-red-400",
    warning: "text-yellow-400",
    info: "text-blue-400",
    success: "text-green-400",
    suggestion: "text-purple-400",
  };

  return (
    <div
      className={`border rounded-3xl p-6 md:p-8 ${styles[type]}`}
    >

      <div className="flex items-center gap-3">

        <span
          className={`text-xl ${iconStyles[type]}`}
        >
          {icon}
        </span>

        <h2 className="text-2xl font-bold">
          {title}
        </h2>

      </div>

      {safeItems.length === 0 ? (

        <p className="text-slate-400 mt-5">
          No issues found by AI. 👍
        </p>

      ) : (

        <ul className="mt-5 space-y-3">

          {safeItems.map((item, index) => (

            <li
              key={index}
              className="bg-slate-950/50 border border-white/5 rounded-xl p-4 text-slate-300"
            >
              {item}
            </li>

          ))}

        </ul>

      )}

    </div>
  );
}

export default ResumeAnalyzer;
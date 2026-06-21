import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ConnectSection from "./components/ConnectSection";

// ─────────────────────────────────────────────────────────────
// DATA & SCHEMAS
// ─────────────────────────────────────────────────────────────

const COURSES = [
  {
    id: "btech", label: "B.Tech", type: "ug",
    branches: [
      { id: "btech-cs", label: "Computer Science (CSE)" },
      { id: "btech-ec", label: "Electronics & Communication (ECE)" },
      { id: "btech-me", label: "Mechanical Engineering" },
      { id: "btech-ce", label: "Civil Engineering" },
      { id: "btech-bt", label: "Biotechnology" },
    ],
  },
  {
    id: "bca", label: "BCA", type: "ug",
    branches: [{ id: "bca-gen", label: "General" }],
  },
  {
    id: "bba", label: "BBA", type: "ug",
    branches: [{ id: "bba-gen", label: "General" }],
  },
  {
    id: "bcom", label: "B.Com", type: "ug",
    branches: [{ id: "bcom-gen", label: "General" }],
  },
  {
    id: "mca", label: "MCA", type: "pg",
    branches: [{ id: "mca-gen", label: "General" }],
  },
  {
    id: "mba", label: "MBA", type: "pg",
    branches: [{ id: "mba-gen", label: "General" }],
  },
  {
    id: "mtech", label: "M.Tech", type: "pg",
    branches: [{ id: "mtech-gen", label: "General" }],
  },
];

const SEMESTERS = [1, 2, 3, 4, 5, 6, 7, 8];

const PAPERS = [
  { id: 1,  branch: "btech-cs", sem: 3, subject: "Data Structures",   year: 2023, exam: "End Sem" },
  { id: 2,  branch: "btech-cs", sem: 3, subject: "Data Structures",   year: 2022, exam: "Mid Sem" },
  { id: 3,  branch: "btech-cs", sem: 4, subject: "Operating Systems", year: 2023, exam: "End Sem" },
  { id: 4,  branch: "btech-cs", sem: 4, subject: "Computer Networks", year: 2023, exam: "End Sem" },
  { id: 5,  branch: "btech-cs", sem: 5, subject: "DBMS",              year: 2023, exam: "End Sem" },
  { id: 6,  branch: "btech-cs", sem: 5, subject: "TOC",               year: 2022, exam: "End Sem" },
  { id: 7,  branch: "btech-ce", sem: 1, subject: "Engineering Maths", year: 2023, exam: "End Sem" },
  { id: 8,  branch: "btech-ce", sem: 1, subject: "Physics",           year: 2022, exam: "End Sem" },
  { id: 9,  branch: "btech-ce", sem: 2, subject: "Structural Analysis",year: 2023, exam: "End Sem" },
  { id: 10, branch: "btech-me", sem: 3, subject: "Thermodynamics",    year: 2023, exam: "End Sem" },
  { id: 11, branch: "btech-ec", sem: 4, subject: "Digital Electronics",year: 2023, exam: "End Sem" },
  { id: 12, branch: "bca-gen",  sem: 2, subject: "Database Management",year: 2023, exam: "End Sem" },
  { id: 13, branch: "bca-gen",  sem: 3, subject: "Data Structures",   year: 2022, exam: "End Sem" },
  { id: 14, branch: "bba-gen",  sem: 1, subject: "Principles of Mgmt",year: 2023, exam: "End Sem" },
  { id: 15, branch: "mca-gen",  sem: 1, subject: "Cloud Computing",   year: 2023, exam: "End Sem" },
  { id: 16, branch: "mca-gen",  sem: 2, subject: "Cyber Security",    year: 2023, exam: "End Sem" },
  // Biotech
  { id: 17, branch: "btech-bt", sem: 1, subject: "Cell Biology",       year: 2023, exam: "End Sem" },
  { id: 18, branch: "btech-bt", sem: 2, subject: "Microbiology",       year: 2023, exam: "End Sem" },
  // B.Com
  { id: 19, branch: "bcom-gen", sem: 1, subject: "Financial Accounting",year: 2023, exam: "End Sem" },
  { id: 20, branch: "bcom-gen", sem: 2, subject: "Business Law",       year: 2023, exam: "End Sem" },
  // MBA
  { id: 21, branch: "mba-gen",  sem: 1, subject: "Marketing Management",year: 2023, exam: "End Sem" },
  { id: 22, branch: "mba-gen",  sem: 2, subject: "Human Resource Mgmt", year: 2023, exam: "End Sem" },
  // M.Tech
  { id: 23, branch: "mtech-gen", sem: 1, subject: "Advanced Algorithms", year: 2023, exam: "End Sem" },
  { id: 24, branch: "mtech-gen", sem: 2, subject: "Machine Learning",    year: 2023, exam: "End Sem" },
];

// ─────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────

function groupBySubject(arr) {
  return arr.reduce((acc, item) => {
    if (!acc[item.subject]) acc[item.subject] = [];
    acc[item.subject].push(item);
    return acc;
  }, {});
}

function getCourse(courseId) {
  return COURSES.find((c) => c.id === courseId) || null;
}

function getBranch(courseId, branchId) {
  return getCourse(courseId)?.branches.find((b) => b.id === branchId) || null;
}

function getCourseByBranchId(branchId) {
  return COURSES.find((c) => c.branches.some((b) => b.id === branchId)) || null;
}

function getBranchByBranchId(branchId) {
  for (const c of COURSES) {
    const b = c.branches.find((br) => br.id === branchId);
    if (b) return b;
  }
  return null;
}

// ─────────────────────────────────────────────────────────────
// ICONS
// ─────────────────────────────────────────────────────────────

const CourseIcons = {
  btech: (
    <svg className="w-6 h-6 text-indigo-500 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
    </svg>
  ),
  bca: (
    <svg className="w-6 h-6 text-purple-500 dark:text-purple-400 group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
    </svg>
  ),
  bba: (
    <svg className="w-6 h-6 text-emerald-500 dark:text-emerald-400 group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v5.75c0 .621-.504 1.125-1.125 1.125h-2.25A1.125 1.125 0 013 18.875v-5.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v10.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v14.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  ),
  bcom: (
    <svg className="w-6 h-6 text-pink-500 dark:text-pink-400 group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  mca: (
    <svg className="w-6 h-6 text-cyan-500 dark:text-cyan-400 group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
    </svg>
  ),
  mba: (
    <svg className="w-6 h-6 text-amber-550 dark:text-amber-400 group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  mtech: (
    <svg className="w-6 h-6 text-sky-500 dark:text-sky-400 group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 9h6v6H9V9zM9 1v3m6-3v3M9 20v3m6-3v3M1 9h3m-3 6h3m16-6h3m-3 6h3" />
    </svg>
  )
};

const FileIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <polyline points="14,2 14,8 20,8" />
  </svg>
);

// ─────────────────────────────────────────────────────────────
// NAVBAR
// ─────────────────────────────────────────────────────────────

function Navbar({ reset, theme, setTheme }) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-900 bg-white/70 dark:bg-zinc-950/70 transition-colors duration-300">
      <div className="max-w-6xl mx-auto h-16 px-4 flex items-center justify-between">
        <button onClick={reset} className="flex items-center gap-3 hover:opacity-90 transition cursor-pointer">
          <img src="/logo.png" alt="PaperStack" className="w-8 h-8 rounded-lg object-cover ring-1 ring-zinc-200 dark:ring-zinc-800" />
          <div className="text-left">
            <div className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-white flex items-center gap-1.5">
              PaperStack 
              <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-650 dark:text-zinc-400 font-normal">GEU</span>
            </div>
          </div>
        </button>
        
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-6 text-xs text-zinc-500 dark:text-zinc-400 font-medium">
            <button onClick={reset} className="hover:text-zinc-900 dark:hover:text-white transition cursor-pointer">Browse</button>
            <button onClick={() => document.getElementById("contribute")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-zinc-900 dark:hover:text-white transition cursor-pointer">Upload</button>
            <button onClick={() => document.getElementById("connect")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-zinc-900 dark:hover:text-white transition cursor-pointer">About</button>
          </nav>
          
          {/* Theme Toggle Button */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex items-center justify-center w-8 h-8 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 hover:dark:text-white transition cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              // Sun Icon
              <svg className="w-4 h-4 animate-float" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              // Moon Icon
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
          
          <a 
            href="https://github.com/sanskar18-commits/PaperStack"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 dark:bg-white border border-zinc-950 dark:border-white hover:bg-zinc-800 dark:hover:bg-zinc-100 text-xs font-semibold text-white dark:text-black transition"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
            <span>Star</span>
          </a>
        </div>
      </div>
    </header>
  );
}

// ─────────────────────────────────────────────────────────────
// BREADCRUMB + BACK NAVIGATION
// ─────────────────────────────────────────────────────────────

function Breadcrumb({ courseId, branchId, sem, onGoHome, onGoCourse, onGoBranch }) {
  const course = getCourse(courseId);
  const branch = getBranch(courseId, branchId);
  const multipleBranches = course?.branches.length > 1;

  const steps = [];

  if (course) {
    steps.push({ label: course.label, onClick: onGoCourse, active: !branchId && !sem });
  }

  if (branch && multipleBranches) {
    steps.push({ label: branch.label, onClick: onGoBranch, active: branchId && !sem });
  }

  if (sem) {
    steps.push({ label: `Sem ${sem}`, onClick: null, active: true });
  }

  if (steps.length === 0) return null;

  function handleBack() {
    if (sem) {
      onGoBranch();
    } else if (branchId && multipleBranches) {
      onGoCourse();
    } else {
      onGoHome();
    }
  }

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <button
        onClick={handleBack}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-350 dark:hover:border-zinc-700 hover:bg-zinc-200 hover:dark:bg-zinc-900 transition text-xs font-semibold text-zinc-700 dark:text-zinc-300 cursor-pointer"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
        </svg>
        Back
      </button>

      <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 dark:text-zinc-500">
        <button onClick={onGoHome} className="hover:text-zinc-700 dark:hover:text-zinc-300 transition cursor-pointer">home</button>
        {steps.map((step, i) => (
          <span key={i} className="flex items-center gap-1.5">
            <span className="text-zinc-300 dark:text-zinc-800">/</span>
            {step.onClick && !step.active ? (
              <button onClick={step.onClick} className="hover:text-zinc-700 dark:hover:text-zinc-300 transition text-zinc-500 dark:text-zinc-400 cursor-pointer">
                {step.label.toLowerCase()}
              </button>
            ) : (
              <span className={step.active && i === steps.length - 1 ? "text-zinc-900 dark:text-zinc-200" : "text-zinc-500 dark:text-zinc-400"}>
                {step.label.toLowerCase()}
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// COURSE GRID
// ─────────────────────────────────────────────────────────────

function CourseGrid({ onSelect }) {
  const ug = COURSES.filter((c) => c.type === "ug");
  const pg = COURSES.filter((c) => c.type === "pg");

  function CourseCard({ course }) {
    const icon = CourseIcons[course.id] || null;
    return (
      <button
        onClick={() => onSelect(course.id)}
        className="group glass-card rounded-3xl p-6 text-left transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between h-36"
      >
        <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 blur-2xl rounded-full" />
        <div className="flex items-start justify-between">
          <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            {icon}
          </div>
          <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-800 dark:group-hover:text-zinc-200 transition-colors">
            {course.branches.length > 1 ? `${course.branches.length} branches` : "General"}
          </span>
        </div>
        <div>
          <div className="text-lg font-bold text-zinc-900 dark:text-white tracking-tight">{course.label}</div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 flex items-center gap-1">
            Explore Papers
            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
          </div>
        </div>
      </button>
    );
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-900 pb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
          <h2 className="text-xs font-mono tracking-widest text-zinc-500 dark:text-zinc-400 uppercase">Undergraduate Programs</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ug.map((c) => <CourseCard key={c.id} course={c} />)}
        </div>
      </div>
      
      {pg.length > 0 && (
        <div className="space-y-4 pt-4">
          <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-900 pb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
            <h2 className="text-xs font-mono tracking-widest text-zinc-500 dark:text-zinc-400 uppercase">Postgraduate Programs</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {pg.map((c) => <CourseCard key={c.id} course={c} />)}
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// BRANCH SELECT
// ─────────────────────────────────────────────────────────────

function BranchSelect({ courseId, onSelect }) {
  const course = getCourse(courseId);
  if (!course) return null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">Select Branch</h2>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">Under program: <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{course.label}</span></p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {course.branches.map((branch) => (
          <button 
            key={branch.id} 
            onClick={() => onSelect(branch.id)}
            className="group glass-card rounded-2xl p-5 text-left hover:bg-zinc-50 dark:hover:bg-zinc-900/50 cursor-pointer flex items-center justify-between"
          >
            <div>
              <div className="text-base font-semibold text-zinc-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">{branch.label}</div>
              <div className="text-xs text-zinc-400 dark:text-zinc-500 mt-1 font-mono">{branch.id.toUpperCase()}</div>
            </div>
            <div className="w-8 h-8 rounded-xl bg-zinc-100 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 group-hover:dark:text-white transition-colors">
              →
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SEMESTER SELECT
// ─────────────────────────────────────────────────────────────

function SemesterSelect({ selected, onSelect, available }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">Select Semester</h2>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">Available academic terms showing active state</p>
      </div>
      
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-8 gap-3">
        {SEMESTERS.map((s) => {
          const active = available.includes(s);
          return (
            <button 
              key={s} 
              disabled={!active} 
              onClick={() => active && onSelect(s)}
              className={`h-16 rounded-2xl font-bold transition-all border flex flex-col items-center justify-center gap-1 cursor-pointer
                ${selected === s 
                  ? "bg-zinc-900 text-white dark:bg-white dark:text-black border-zinc-900 dark:border-white shadow-xl shadow-zinc-900/10 dark:shadow-white/5"
                  : active 
                    ? "bg-zinc-100 dark:bg-zinc-900/60 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-200 hover:border-zinc-400 dark:hover:border-zinc-500 hover:bg-zinc-200 hover:dark:bg-zinc-900 hover:-translate-y-0.5 duration-150"
                    : "opacity-20 cursor-not-allowed bg-zinc-50 dark:bg-zinc-950/20 border-zinc-200 dark:border-zinc-900/50 text-zinc-400 dark:text-zinc-650"}`}
            >
              <span className="text-base">S{s}</span>
              <span className="text-[9px] font-mono font-normal">Semester</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// PAPER CARD
// ─────────────────────────────────────────────────────────────

function PaperCard({ paper, onAction }) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-zinc-200 dark:border-zinc-900 bg-white/50 dark:bg-zinc-950/50 p-4 hover:border-zinc-300 dark:hover:border-zinc-800 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/10 transition-all duration-200">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 flex items-center justify-center text-zinc-500 dark:text-zinc-400">
          <FileIcon />
        </div>
        <div>
          <div className="font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
            <span>{paper.year} Exam Paper</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full border ${
              paper.exam === "End Sem" 
                ? "bg-indigo-500/5 border-indigo-500/20 text-indigo-600 dark:text-indigo-400"
                : "bg-purple-500/5 border-purple-500/20 text-purple-600 dark:text-purple-400"
            }`}>{paper.exam}</span>
          </div>
          <div className="text-xs text-zinc-500 dark:text-zinc-500 font-mono mt-0.5">SUBJECT: {paper.subject}</div>
        </div>
      </div>
      <div className="flex gap-2 w-full sm:w-auto">
        <button 
          onClick={() => onAction("Viewing", paper)}
          className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white border border-zinc-200 dark:border-zinc-800 transition cursor-pointer"
        >
          View PDF
        </button>
        <button 
          onClick={() => onAction("Downloading", paper)}
          className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-zinc-900 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 text-xs font-bold text-white dark:text-black transition cursor-pointer"
        >
          Download
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SUBJECT ACCORDION
// ─────────────────────────────────────────────────────────────

function SubjectAccordion({ subject, papers, onAction }) {
  const [open, setOpen] = useState(true);

  const endSem = papers.filter((p) => p.exam === "End Sem").sort((a, b) => b.year - a.year);
  const midSem = papers.filter((p) => p.exam === "Mid Sem").sort((a, b) => b.year - a.year);

  return (
    <div className="rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-900 bg-white/20 dark:bg-zinc-900/10 backdrop-blur-xl">
      <button 
        onClick={() => setOpen(!open)}
        className="w-full px-6 py-5 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-900/30 transition cursor-pointer"
      >
        <div className="text-left">
          <div className="text-lg font-bold text-zinc-900 dark:text-white tracking-tight">{subject}</div>
          <div className="text-xs text-zinc-500 dark:text-zinc-550 mt-1 flex items-center gap-2">
            <span>{papers.length} paper{papers.length > 1 ? "s" : ""} available</span>
            <span>·</span>
            <span className="text-indigo-600 dark:text-indigo-400 font-mono">ACTIVE</span>
          </div>
        </div>
        <div className={`w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-205 dark:border-zinc-800 flex items-center justify-center text-zinc-500 dark:text-zinc-400 transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
          ↓
        </div>
      </button>

      {open && (
        <div className="px-6 pb-6 space-y-6">
          {endSem.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-1 h-1 rounded-full bg-indigo-500" />
                <p className="text-xs font-mono tracking-wider text-zinc-500 dark:text-zinc-500 uppercase">End Sem Papers</p>
              </div>
              <div className="space-y-2">
                {endSem.map((paper) => <PaperCard key={paper.id} paper={paper} onAction={onAction} />)}
              </div>
            </div>
          )}

          {midSem.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-1 h-1 rounded-full bg-purple-500" />
                <p className="text-xs font-mono tracking-wider text-zinc-500 dark:text-zinc-500 uppercase">Mid Sem Papers</p>
              </div>
              <div className="space-y-2">
                {midSem.map((paper) => <PaperCard key={paper.id} paper={paper} onAction={onAction} />)}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// RESULTS LIST
// ─────────────────────────────────────────────────────────────

function Results({ papers, onAction }) {
  const grouped = groupBySubject(papers);
  const subjects = Object.keys(grouped).sort();

  if (papers.length === 0) {
    return (
      <div className="py-16 text-center border border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl">
        <div className="text-4xl mb-3">📂</div>
        <h3 className="text-lg font-bold text-zinc-900 dark:text-white">No Papers Found</h3>
        <p className="text-zinc-500 text-sm mt-1.5 max-w-xs mx-auto">No exam files are registered under this term yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {subjects.map((subject) => (
        <SubjectAccordion key={subject} subject={subject} papers={grouped[subject]} onAction={onAction} />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SEARCH RESULTS VIEW
// ─────────────────────────────────────────────────────────────

function SearchResults({ results, onAction, onGoToSem }) {
  if (results.length === 0) {
    return (
      <div className="py-20 text-center border border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl bg-zinc-50 dark:bg-zinc-900/10">
        <div className="text-4xl mb-3">🔍</div>
        <h3 className="text-lg font-bold text-zinc-900 dark:text-white">No Matching Papers</h3>
        <p className="text-zinc-500 text-sm mt-1.5">Try searching for other terms like "Data", "Maths", "Operating".</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-2 border-b border-zinc-200 dark:border-zinc-900">
        <h2 className="text-sm font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">Search Results ({results.length})</h2>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {results.map((paper) => {
          const course = getCourseByBranchId(paper.branch);
          const branch = getBranchByBranchId(paper.branch);
          return (
            <div 
              key={paper.id} 
              className="glass-card rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs px-2 py-0.5 rounded bg-zinc-150 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-650 dark:text-zinc-400 font-mono uppercase">
                    {course?.label} {branch && branch.label !== "General" ? `· ${branch.label}` : ""}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-zinc-150 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-indigo-655 dark:text-indigo-400 font-mono">
                    Sem {paper.sem}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-650 dark:text-purple-400 font-semibold text-[10px]">
                    {paper.exam}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-zinc-900 dark:text-white tracking-tight">{paper.subject}</h4>
                <p className="text-xs text-zinc-500 font-mono">Year: {paper.year}</p>
              </div>
              <div className="flex items-center gap-2 w-full md:w-auto">
                <button
                  onClick={() => onGoToSem(course?.id, paper.branch, paper.sem)}
                  className="flex-1 md:flex-initial px-3.5 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 text-xs font-semibold text-zinc-700 dark:text-zinc-300 transition cursor-pointer"
                >
                  Go to Semester
                </button>
                <button
                  onClick={() => onAction("Viewing", paper)}
                  className="flex-1 md:flex-initial px-3.5 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 text-xs font-semibold text-zinc-700 dark:text-zinc-300 transition cursor-pointer"
                >
                  View
                </button>
                <button
                  onClick={() => onAction("Downloading", paper)}
                  className="flex-1 md:flex-initial px-3.5 py-2 rounded-xl bg-zinc-900 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 text-xs font-bold text-white dark:text-black transition cursor-pointer"
                >
                  Download
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN APP
// ─────────────────────────────────────────────────────────────

export default function App() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedSem, setSelectedSem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [toast, setToast] = useState(null);

  // Theme support
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  // ── Handlers ─────────────────────────────────────────────

  function reset() {
    setSelectedCourse(null);
    setSelectedBranch(null);
    setSelectedSem(null);
    setSearchQuery("");
  }

  function handleCourseSelect(id) {
    const course = getCourse(id);
    setSelectedCourse(id);
    setSelectedBranch(null);
    setSelectedSem(null);
    setSearchQuery("");
    if (course?.branches.length === 1) {
      setSelectedBranch(course.branches[0].id);
    }
  }

  function goHome() {
    setSelectedCourse(null);
    setSelectedBranch(null);
    setSelectedSem(null);
  }

  function goCourse() {
    setSelectedBranch(null);
    setSelectedSem(null);
  }

  function goBranch() {
    setSelectedSem(null);
  }

  function triggerAction(action, paper) {
    setToast({
      message: `${action} "${paper.subject}" (${paper.year} ${paper.exam})...`,
      type: "success"
    });
    setTimeout(() => setToast(null), 3500);
  }

  function jumpToSemester(courseId, branchId, sem) {
    setSelectedCourse(courseId);
    setSelectedBranch(branchId);
    setSelectedSem(sem);
    setSearchQuery("");
  }

  // ── Derived Data ─────────────────────────────────────────

  const availableSems = useMemo(() => {
    if (!selectedBranch) return [];
    return [...new Set(PAPERS.filter((p) => p.branch === selectedBranch).map((p) => p.sem))].sort();
  }, [selectedBranch]);

  const filteredPapers = useMemo(() => {
    if (!selectedBranch || !selectedSem) return [];
    return PAPERS.filter((p) => p.branch === selectedBranch && p.sem === selectedSem);
  }, [selectedBranch, selectedSem]);

  // Global search matching
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return PAPERS.filter((p) => {
      const course = getCourseByBranchId(p.branch);
      const branch = getBranchByBranchId(p.branch);
      return (
        p.subject.toLowerCase().includes(q) ||
        p.year.toString().includes(q) ||
        p.exam.toLowerCase().includes(q) ||
        (course && course.label.toLowerCase().includes(q)) ||
        (branch && branch.label.toLowerCase().includes(q))
      );
    });
  }, [searchQuery]);

  // View flags
  const isSearching      = searchQuery.trim().length > 0;
  const showCourseGrid   = !selectedCourse && !isSearching;
  const showBranchSelect = selectedCourse && !selectedBranch && !isSearching;
  const showSemSelect    = selectedBranch && !selectedSem && !isSearching;
  const showResults      = selectedBranch && selectedSem && !isSearching;
  const showBreadcrumb   = !!selectedCourse && !isSearching;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col relative overflow-hidden transition-colors duration-300">
      
      {/* Dynamic Background Spotlight */}
      <div className="absolute top-[-10%] left-[5%] bg-glow-spotlight" />
      <div className="absolute bottom-[20%] right-[-10%] bg-glow-spotlight" />

      <Navbar reset={reset} theme={theme} setTheme={setTheme} />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 space-y-12 z-10 relative">

        {/* Hero Section */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 dark:border-indigo-500/25 text-indigo-650 dark:text-indigo-400 text-xs font-semibold">
            <span>Unofficial GEU Deemed Archive</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-none">
            PaperStack
          </h1>
          <p className="text-zinc-650 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
            Quick, friction-free access to previous year question papers for Graphic Era Deemed University, Dehradun.
          </p>

          {/* Global Search Bar */}
          <div className="max-w-md mx-auto pt-2 relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-2xl blur-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-center">
              <span className="absolute left-4 text-zinc-400 dark:text-zinc-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search subjects (e.g. Data Structures, Physics)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-12 py-3 bg-white/75 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 focus:border-indigo-500/40 focus:outline-none rounded-2xl text-xs sm:text-sm placeholder-zinc-400 dark:placeholder-zinc-500 text-zinc-900 dark:text-white transition-all backdrop-blur-xl"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 text-zinc-500 hover:text-zinc-900 dark:hover:text-white text-xs font-semibold cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="space-y-6">
          {/* Breadcrumb Navigation */}
          {showBreadcrumb && (
            <Breadcrumb
              courseId={selectedCourse}
              branchId={selectedBranch}
              sem={selectedSem}
              onGoHome={goHome}
              onGoCourse={goCourse}
              onGoBranch={goBranch}
            />
          )}

          {/* Animate Transition between views */}
          <AnimatePresence mode="wait">
            <motion.div
              key={
                isSearching 
                  ? "search" 
                  : `${selectedCourse}-${selectedBranch}-${selectedSem}`
              }
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
            >
              {isSearching && (
                <SearchResults 
                  results={searchResults} 
                  onAction={triggerAction} 
                  onGoToSem={jumpToSemester} 
                />
              )}
              {showCourseGrid && <CourseGrid onSelect={handleCourseSelect} />}
              {showBranchSelect && <BranchSelect courseId={selectedCourse} onSelect={setSelectedBranch} />}
              {showSemSelect && <SemesterSelect selected={selectedSem} onSelect={setSelectedSem} available={availableSems} />}
              {showResults && <Results papers={filteredPapers} onAction={triggerAction} />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* About & Community Section */}
        <ConnectSection />

      </main>

      <footer className="border-t border-zinc-200 dark:border-zinc-900 py-10 mt-16 bg-zinc-100/50 dark:bg-zinc-950/20 text-center space-y-2 z-10 relative">
        <p className="text-xs text-zinc-500 dark:text-zinc-650 font-mono">
          PaperStack &copy; {new Date().getFullYear()} · Academic Resource Sharing
        </p>
        <p className="text-[10px] text-zinc-500 dark:text-zinc-600 max-w-xs sm:max-w-md mx-auto leading-relaxed">
          Disclaimer: This is an unofficial student-run platform and is not affiliated with Graphic Era Deemed University.
        </p>
      </footer>

      {/* Glassmorphic Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 bg-white/90 dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl backdrop-blur-xl ring-1 ring-black/5 dark:ring-white/5"
          >
            <div className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </div>
            <p className="text-xs font-semibold text-zinc-800 dark:text-white tracking-wide">{toast.message}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
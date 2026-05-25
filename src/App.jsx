import { useState, useMemo } from "react";

// ─────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────

const COURSES = [
  {
    id: "btech", label: "B.Tech", type: "ug",
    branches: [
      { id: "btech-cs", label: "Computer Science" },
      { id: "btech-ec", label: "Electronics" },
      { id: "btech-me", label: "Mechanical" },
      { id: "btech-ce", label: "Civil" },
    ],
  },
  {
    id: "bca", label: "BCA", type: "ug",
    branches: [{ id: "bca-gen", label: "All" }],
  },
  {
    id: "bba", label: "BBA", type: "ug",
    branches: [{ id: "bba-gen", label: "All" }],
  },
  {
    id: "mca", label: "MCA", type: "pg",
    branches: [{ id: "mca-gen", label: "All" }],
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

// ─────────────────────────────────────────────────────────────
// ICONS
// ─────────────────────────────────────────────────────────────

const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <circle cx="11" cy="11" r="7" />
    <path strokeLinecap="round" d="M20 20l-3-3" />
  </svg>
);

const FileIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <polyline points="14,2 14,8 20,8" />
  </svg>
);

// ─────────────────────────────────────────────────────────────
// NAVBAR
// ─────────────────────────────────────────────────────────────

function Navbar({ reset }) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl border-b border-zinc-800 bg-zinc-950/80">
      <div className="max-w-6xl mx-auto h-16 px-4 flex items-center justify-between">
        <button onClick={reset} className="flex items-center gap-3 hover:opacity-80 transition">
          <img src="/logo.png" alt="PaperStack" className="w-9 h-9 rounded-xl object-cover" />
          <div className="text-left">
            <div className="text-sm font-semibold">PaperStack</div>
            <div className="text-xs text-zinc-500"></div>
          </div>
        </button>
        <nav className="hidden md:flex items-center gap-8 text-sm text-zinc-500">
          <button className="hover:text-white transition">Browse</button>
          <button className="hover:text-white transition">Upload</button>
          <button className="hover:text-white transition">About</button>
        </nav>
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
  const multipleBreanches = course?.branches.length > 1;

  // Build steps: each step = { label, onClick, active }
  const steps = [];

  if (course) {
    steps.push({ label: course.label, onClick: onGoCourse, active: !branchId && !sem });
  }

  if (branch && multipleBreanches) {
    steps.push({ label: branch.label, onClick: onGoBranch, active: branchId && !sem });
  }

  if (sem) {
    steps.push({ label: `Sem ${sem}`, onClick: null, active: true });
  }

  if (steps.length === 0) return null;

  // Determine what "back" means at current depth
  function handleBack() {
    if (sem) {
      onGoBranch(); // back to semester select
    } else if (branchId && multipleBreanches) {
      onGoCourse(); // back to branch select
    } else {
      onGoHome(); // back to course grid
    }
  }

  return (
    <div className="flex items-center gap-3 flex-wrap">
      {/* Back button */}
      <button
        onClick={handleBack}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-600 hover:bg-zinc-800 transition text-sm text-zinc-300"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
        </svg>
        Back
      </button>

      {/* Breadcrumb trail */}
      <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-600">
        <button onClick={onGoHome} className="hover:text-zinc-400 transition">home</button>
        {steps.map((step, i) => (
          <span key={i} className="flex items-center gap-1.5">
            <span className="text-zinc-800">/</span>
            {step.onClick && !step.active ? (
              <button onClick={step.onClick} className="hover:text-zinc-400 transition text-zinc-500">
                {step.label}
              </button>
            ) : (
              <span className={step.active && i === steps.length - 1 ? "text-zinc-300" : "text-zinc-500"}>
                {step.label}
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SEARCH BAR
// ─────────────────────────────────────────────────────────────

function SearchBar({ query, setQuery }) {
  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none">
        <SearchIcon />
      </div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search subject, course, branch..."
        className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/70 pl-12 pr-10 py-4 text-sm outline-none transition-all focus:border-zinc-600 focus:ring-4 focus:ring-zinc-800/50"
      />
      {query && (
        <button onClick={() => setQuery("")}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-400 transition text-lg">
          ×
        </button>
      )}
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
    return (
      <button
        onClick={() => onSelect(course.id)}
        className="group relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 text-left transition-all hover:border-zinc-600 hover:-translate-y-1 duration-200"
      >
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-zinc-700 via-white to-zinc-700 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="text-2xl font-semibold mb-2">{course.label}</div>
        <div className="text-sm text-zinc-500 mb-4">
          {course.branches.length} branch{course.branches.length > 1 ? "es" : ""}
        </div>
        <div className="text-sm text-zinc-400">Explore Papers →</div>
      </button>
    );
  }

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <p className="text-xs font-mono tracking-widest text-zinc-600 uppercase">Undergraduate</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ug.map((c) => <CourseCard key={c.id} course={c} />)}
        </div>
      </div>
      {pg.length > 0 && (
        <div className="space-y-3">
          <p className="text-xs font-mono tracking-widest text-zinc-600 uppercase">Postgraduate</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-semibold">Select Branch</h2>
        <p className="text-zinc-500 text-sm mt-1">{course.label}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {course.branches.map((branch) => (
          <button key={branch.id} onClick={() => onSelect(branch.id)}
            className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 text-left hover:border-zinc-600 hover:bg-zinc-800/40 transition-all hover:-translate-y-0.5 duration-200">
            <div className="text-lg font-medium">{branch.label}</div>
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
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-semibold">Select Semester</h2>
        <p className="text-zinc-500 text-sm mt-1">Only semesters with available papers are shown active</p>
      </div>
      <div className="flex flex-wrap gap-4">
        {SEMESTERS.map((s) => {
          const active = available.includes(s);
          return (
            <button key={s} disabled={!active} onClick={() => active && onSelect(s)}
              className={`w-16 h-16 rounded-2xl font-semibold transition-all border
                ${selected === s ? "bg-white text-black border-white scale-105"
                  : active ? "bg-zinc-900 border-zinc-800 hover:border-zinc-600 hover:-translate-y-0.5 duration-150"
                  : "opacity-20 cursor-not-allowed bg-zinc-900 border-zinc-800"}`}>
              S{s}
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

function PaperCard({ paper }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4 hover:border-zinc-700 transition-all">
      <div className="flex items-center gap-3">
        <span className="text-zinc-500"><FileIcon /></span>
        <div>
          <div className="font-medium">{paper.year}</div>
          <div className="text-xs text-zinc-500">{paper.exam}</div>
        </div>
      </div>
      <div className="flex gap-2">
        <a href="#" onClick={(e) => e.preventDefault()}
          className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition text-sm font-medium">
          View PDF
        </a>
        <a href="#" onClick={(e) => e.preventDefault()}
          className="px-4 py-2 rounded-xl bg-white text-black hover:opacity-90 transition text-sm font-medium">
          Download
        </a>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SUBJECT ACCORDION
// ─────────────────────────────────────────────────────────────

function SubjectAccordion({ subject, papers }) {
  const [open, setOpen] = useState(true);

  const endSem = papers.filter((p) => p.exam === "End Sem").sort((a, b) => b.year - a.year);
  const midSem = papers.filter((p) => p.exam === "Mid Sem").sort((a, b) => b.year - a.year);

  return (
    <div className="rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900/40 backdrop-blur-xl">
      <button onClick={() => setOpen(!open)}
        className="w-full px-6 py-5 flex items-center justify-between hover:bg-zinc-800/40 transition">
        <div className="text-left">
          <div className="text-lg font-semibold">{subject}</div>
          <div className="text-sm text-zinc-500 mt-1">{papers.length} paper{papers.length > 1 ? "s" : ""} available</div>
        </div>
        <span className={`text-zinc-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`}>↓</span>
      </button>

      {open && (
        <div className="px-5 pb-5 space-y-5">

          {endSem.length > 0 && (
            <div>
              <p className="text-xs font-mono tracking-widest text-zinc-600 uppercase mb-3 pt-4">End Sem</p>
              <div className="space-y-3">
                {endSem.map((paper) => <PaperCard key={paper.id} paper={paper} />)}
              </div>
            </div>
          )}

          {midSem.length > 0 && (
            <div>
              <p className="text-xs font-mono tracking-widest text-zinc-600 uppercase mb-3">Mid Sem</p>
              <div className="space-y-3">
                {midSem.map((paper) => <PaperCard key={paper.id} paper={paper} />)}
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
}
// ─────────────────────────────────────────────────────────────
// RESULTS
// ─────────────────────────────────────────────────────────────

function Results({ papers }) {
  const grouped = groupBySubject(papers);
  const subjects = Object.keys(grouped).sort();

  if (papers.length === 0) {
    return (
      <div className="py-24 text-center">
        <div className="text-6xl mb-4">📂</div>
        <h3 className="text-2xl font-semibold">No Papers Found</h3>
        <p className="text-zinc-500 mt-3">Try another semester or search keyword.</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {subjects.map((subject) => (
        <SubjectAccordion key={subject} subject={subject} papers={grouped[subject]} />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN APP
// ─────────────────────────────────────────────────────────────

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedSem, setSelectedSem] = useState(null);

  const isSearching = query.trim().length > 0;

  // ── Navigation handlers ──────────────────────────────────

  function reset() {
    setSelectedCourse(null);
    setSelectedBranch(null);
    setSelectedSem(null);
    setQuery("");
  }

  function handleCourseSelect(id) {
    const course = getCourse(id);
    setSelectedCourse(id);
    setSelectedBranch(null);
    setSelectedSem(null);
    // Auto-skip branch if only one
    if (course?.branches.length === 1) {
      setSelectedBranch(course.branches[0].id);
    }
  }

  // "Back" to course grid = reset course + branch + sem
  function goHome() {
    setSelectedCourse(null);
    setSelectedBranch(null);
    setSelectedSem(null);
  }

  // "Back" to branch select = clear branch + sem (keep course)
  function goCourse() {
    setSelectedBranch(null);
    setSelectedSem(null);
  }

  // "Back" to semester select = clear sem only (keep course + branch)
  function goBranch() {
    setSelectedSem(null);
  }

  // ── Derived data ─────────────────────────────────────────

  const availableSems = useMemo(() => {
    if (!selectedBranch) return [];
    return [...new Set(PAPERS.filter((p) => p.branch === selectedBranch).map((p) => p.sem))].sort();
  }, [selectedBranch]);

  const filteredPapers = useMemo(() => {
    if (isSearching) {
      const q = query.toLowerCase();
      return PAPERS.filter(
        (p) =>
          p.subject.toLowerCase().includes(q) ||
          COURSES.find((c) => c.branches.some((b) => b.id === p.branch))?.label.toLowerCase().includes(q)
      );
    }
    if (!selectedBranch || !selectedSem) return [];
    return PAPERS.filter((p) => p.branch === selectedBranch && p.sem === selectedSem);
  }, [selectedBranch, selectedSem, query, isSearching]);

  // ── View flags ───────────────────────────────────────────

  const showCourseGrid   = !isSearching && !selectedCourse;
  const showBranchSelect = !isSearching && selectedCourse && !selectedBranch;
  const showSemSelect    = !isSearching && selectedBranch && !selectedSem;
  const showResults      = !isSearching && selectedBranch && selectedSem;
  const showBreadcrumb   = !isSearching && selectedCourse;

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar reset={reset} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">

        {/* Title */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            PaperStack
            <span className="block text-zinc-500">Search Download Prepare</span>
          </h1>
          <p className="text-zinc-400 text-sm">
            Select your course and semester — or search directly.
          </p>
        </div>

        {/* Search */}
        <SearchBar query={query} setQuery={setQuery} />

        {/* Breadcrumb — only when navigating, not searching */}
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

        {/* Views */}
        {showCourseGrid   && <CourseGrid onSelect={handleCourseSelect} />}
        {showBranchSelect && <BranchSelect courseId={selectedCourse} onSelect={setSelectedBranch} />}
        {showSemSelect    && <SemesterSelect selected={selectedSem} onSelect={setSelectedSem} available={availableSems} />}
        {showResults      && <Results papers={filteredPapers} />}
        {isSearching      && <Results papers={filteredPapers} />}

      </main>

      <footer className="border-t border-zinc-900 py-8 mt-20 text-center text-sm text-zinc-600 font-mono">
        PaperStack · academic use only 
      </footer>
    </div>
  );
}
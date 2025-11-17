"use client";
import { useState } from "react";

interface DayDetail {
  day: number;
  title: string;
  summary: string;
  coreProblem: string;
  objectives: string[];
  concepts: string[];
  deliverables: string[];
  extension: string;
  reflection: string[];
  quality: string[];
}

export default function Home() {
  const days: DayDetail[] = [
    {
      day: 1,
      title: "Python Basics & Environment",
      summary: "Set up reproducible backend workspace & health endpoint",
      coreProblem: "Create project scaffold with app factory, config layer, /health route returning version & timestamp.",
      objectives: ["Virtual environments & dependency management", "Configuration separation & environment variables", "Logging basics", "PEP8 awareness"],
      concepts: ["venv/pip", "dotenv", "logging", "app factory pattern"],
      deliverables: ["Project root with src/", "config module (dev/test)", "/health endpoint", "README quick start"],
      extension: "Add structured JSON logging with request ID middleware",
      reflection: ["Why isolate environments?", "List 3 config risks", "Recall steps to create/activate venv"],
      quality: ["Single command run", "No hard-coded secrets", "Clear README instructions"],
    },
    {
      day: 2,
      title: "Modular Design & Errors",
      summary: "Utility layer + standardized error responses",
      coreProblem: "Implement utilities (time, ID generation, validation) & global error handler returning JSON schema.",
      objectives: ["Functions & modules organization", "Error handling patterns", "Type hints usage", "Separation of concerns"],
      concepts: ["exceptions", "custom error classes", "dataclasses/pydantic", "import structure"],
      deliverables: ["utilities module", "/version endpoint", "error handler"],
      extension: "Request timing middleware logging duration",
      reflection: ["Distinguish syntax vs logic error", "2 benefits of type hints"],
      quality: ["No circular imports", "Consistent error schema", "Unit tests for utilities"],
    },
    {
      day: 3,
      title: "Data Modeling & Persistence",
      summary: "Task & Note models with repository/service layer",
      coreProblem: "Define ORM models & CRUD service functions decoupled from framework.",
      objectives: ["ORM fundamentals", "Repository pattern", "Transactions & sessions", "DTO separation"],
      concepts: ["SQL basics", "SQLAlchemy sessions", "entities vs DTO", "pagination"],
      deliverables: ["models.py", "db session management", "CRUD services"],
      extension: "Filtering & pagination for tasks (status, priority)",
      reflection: ["Why abstract persistence?", "Differences in-memory vs DB"],
      quality: ["Pure services", "Consistent session handling", "Avoid N+1 queries"],
    },
    {
      day: 4,
      title: "RESTful API Layer",
      summary: "Expose CRUD endpoints for tasks with validation",
      coreProblem: "Implement /tasks endpoints with proper status codes & schema validation.",
      objectives: ["REST principles", "Status codes", "Input validation", "Serialization"],
      concepts: ["idempotence", "422 vs 404", "request/response schema", "error envelope"],
      deliverables: ["/tasks GET POST", "/tasks/{id} GET PUT DELETE", "validation models"],
      extension: "Bulk create tasks with transactional rollback",
      reflection: ["Idempotent vs safe?", "4 status codes & meaning"],
      quality: ["422 for validation errors", "404 for missing", "No stack traces leaked"],
    },
    {
      day: 5,
      title: "Auth & User Scope",
      summary: "JWT auth protecting user-scoped tasks",
      coreProblem: "Add user model, registration, login issuing JWT; secure task endpoints by owner.",
      objectives: ["Password hashing", "JWT flow", "Auth middleware", "Least privilege"],
      concepts: ["bcrypt", "JWT structure", "token expiry", "401 vs 403"],
      deliverables: ["/auth/register", "/auth/login", "auth middleware", "scoped task queries"],
      extension: "Refresh token & admin role listing all tasks",
      reflection: ["Risks of plain passwords?", "JWT flow steps"],
      quality: ["Hashed passwords", "Secret in env", "Clear error codes"],
    },
    {
      day: 6,
      title: "Relationships & Nested Resources",
      summary: "Notes linked to tasks with cascades",
      coreProblem: "Implement Note entity & /tasks/{id}/notes nested endpoints with cascaded deletes.",
      objectives: ["Foreign keys", "Eager vs lazy", "Nested routing", "Cascade rules"],
      concepts: ["joins", "relationship loading", "serialization of nested data"],
      deliverables: ["Note model", "nested endpoints", "cascade delete"],
      extension: "Search across tasks & notes (LIKE) with ranking",
      reflection: ["Eager vs lazy loading?", "Pros/cons nested routes"],
      quality: ["Efficient queries", "Correct cascades", "Consistent JSON"],
    },
    {
      day: 7,
      title: "Validation & Testing",
      summary: "Comprehensive unit & integration tests + input hardening",
      coreProblem: "Add tests for services & API; strengthen field validations.",
      objectives: ["Testing pyramid", "Fixtures", "Mocking", "Coverage mindset"],
      concepts: ["pytest", "fixtures", "property-based testing", "coverage report"],
      deliverables: ["tests/ directory", "coverage script", "enhanced validation"],
      extension: "Property-based test for task filtering",
      reflection: ["Unit vs integration?", "Good test name traits"],
      quality: [">85% service coverage", "Fast deterministic tests", "Isolated state"],
    },
    {
      day: 8,
      title: "Performance & Caching",
      summary: "Profile & cache frequent task queries",
      coreProblem: "Add timing metrics & per-user cache with invalidation on mutations.",
      objectives: ["Profiling", "Caching strategy", "Invalidation", "Metrics logging"],
      concepts: ["timing decorators", "cache keys", "TTL", "stale data risks"],
      deliverables: ["performance module", "cached getTasks", "invalidation hooks"],
      extension: "ETag or Last-Modified conditional responses",
      reflection: ["Why measure first?", "Caching pitfalls"],
      quality: ["Correct invalidation", "Metrics visible", "Toggle to disable cache"],
    },
    {
      day: 9,
      title: "Observability, Security & Docker",
      summary: "Containerize app + security headers & rate limits",
      coreProblem: "Add Dockerfile, compose, structured logs, rate limiting, security headers.",
      objectives: ["12-factor alignment", "Containerization", "Security headers", "Rate limiting"],
      concepts: ["docker layering", "CORS/CSP basics", "token bucket", "log correlation"],
      deliverables: ["Dockerfile", "docker-compose.yml", "middleware headers & rate limit"],
      extension: "OpenAPI + Swagger UI generation",
      reflection: ["3 attack surfaces?", "Docker build & run steps"],
      quality: ["Slim image", "Reproducible build", "Secure defaults"],
    },
    {
      day: 10,
      title: "Deployment & CI/CD",
      summary: "Automate tests & deploy container; finalize docs",
      coreProblem: "Set up CI workflow & deployment instructions; finalize README with architecture/API spec.",
      objectives: ["CI pipeline", "Secrets management", "Documentation quality", "Migration strategy"],
      concepts: ["GitHub Actions", "environment variables", "smoke tests", "blue-green outline"],
      deliverables: ["ci.yml", "production config section", "enhanced README"],
      extension: "Automated migration step & blue-green strategy outline",
      reflection: ["Why automate tests?", "Essential README sections"],
      quality: ["Passing CI", "Clear env var table", "Deployment reproducibility"],
    },
  ];

  const [openDay, setOpenDay] = useState<number | null>(null);
  const toggleDay = (day: number) => setOpenDay(openDay === day ? null : day);

  function DetailList({ label, items }: { label: string; items: string[] }) {
    return (
      <div>
        <span className="font-semibold">{label}:</span>
        <ul className="mt-1 list-disc pl-5 space-y-0.5">
          {items.map((it, i) => (
            <li key={i} className="text-gray-600 dark:text-gray-400">
              {it}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 dark:from-[#0d1117] dark:via-[#121a24] dark:to-[#141e28]">
      {/* Hero Section */}
      <section className="px-6 py-20 md:py-32">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-block mb-6 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400 text-sm font-semibold">
            🐍 Free Learning Path
          </div>
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-purple-600 dark:from-blue-300 dark:to-purple-400 mb-6">
            Master Python Backend
            <br />
            in 10 Days
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-200 mb-12 max-w-3xl mx-auto">
            A comprehensive, hands-on learning path to build production-ready backend applications with Python, Flask, and modern development practices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg">
              Start Learning →
            </button>
            <button className="px-8 py-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-semibold text-lg transition-all border-2 border-gray-200 dark:border-gray-700">
              View Curriculum
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 py-16 bg-white/60 dark:bg-[#1c2732]/50 backdrop-blur">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-8">
          {[
            { number: "10", label: "Days" },
            { number: "40+", label: "Lessons" },
            { number: "15+", label: "Projects" },

          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Curriculum Section */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900 dark:text-white">
            Your Learning Journey
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 text-lg">
            Structured curriculum designed to take you from beginner to backend developer
          </p>

          <div className="space-y-6">
            {days.map((d) => {
              const isOpen = openDay === d.day;
              return (
                <div
                  key={d.day}
                  className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1b232c] shadow-md overflow-hidden dark:shadow-[0_0_0_1px_rgba(255,255,255,0.05)]"
                >
                  <button
                    onClick={() => toggleDay(d.day)}
                    className="w-full flex items-start gap-4 p-6 text-left hover:bg-gray-50 dark:hover:bg-[#232f3b] transition-colors"
                    aria-expanded={isOpen}
                  >
                    <div className="shrink-0 w-14 h-14 bg-linear-to-br from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-sm dark:shadow-none">
                      {d.day}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                        {d.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                        {d.summary}
                      </p>
                    </div>
                    <div className={`text-2xl font-medium text-blue-600 dark:text-blue-300 transition-transform ${isOpen ? "rotate-90" : ""}`}>→</div>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 space-y-4 text-sm text-gray-700 dark:text-gray-200">
                      <div>
                        <span className="font-semibold">Core Problem:</span> {d.coreProblem}
                      </div>
                      <DetailList label="Objectives" items={d.objectives} />
                      <DetailList label="Required Concepts" items={d.concepts} />
                      <DetailList label="Deliverables" items={d.deliverables} />
                      <div>
                        <span className="font-semibold">Challenge Extension:</span> {d.extension}
                      </div>
                      <DetailList label="Reflection Prompts" items={d.reflection} />
                      <DetailList label="Quality Criteria" items={d.quality} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 bg-linear-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Why This Course?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "💻",
                title: "Hands-On Projects",
                desc: "Build real-world applications including REST APIs, authentication systems, and full CRUD applications",
              },
              {
                icon: "🎯",
                title: "Practical Focus",
                desc: "Learn by doing with code examples, exercises, and projects you can add to your portfolio",
              },
              {
                icon: "🚀",
                title: "Modern Stack",
                desc: "Master Flask, SQLAlchemy, JWT, Docker, and other industry-standard tools",
              },
              {
                icon: "📚",
                title: "Comprehensive",
                desc: "From Python basics to deployment - everything you need to become a backend developer",
              },
              {
                icon: "⚡",
                title: "Fast-Paced",
                desc: "Intensive 10-day program designed to get you job-ready quickly",
              },
              {
                icon: "🎓",
                title: "Self-Paced",
                desc: "Learn at your own speed with lifetime access to all materials and updates",
              },
            ].map((feature, i) => (
              <div key={i} className="text-center">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-blue-100">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Join thousands of developers who have mastered Python backend development
          </p>
          <button className="px-10 py-5 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-bold text-xl transition-all transform hover:scale-105 shadow-2xl">
            Begin Day 1 - It&apos;s Free! 🎉
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 bg-gray-900 text-gray-400 text-center">
        <p>© 2025 Python Backend Learning Path. Built for aspiring backend developers.</p>
      </footer>
    </div>
  );
}

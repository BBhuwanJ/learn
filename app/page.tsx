"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

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
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' || 'dark';
    setTheme(savedTheme);
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    console.log('Switching theme from', theme, 'to', newTheme);
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
      console.log('Added dark class to html element');
    } else {
      document.documentElement.classList.remove('dark');
      console.log('Removed dark class from html element');
    }
    console.log('HTML classList:', document.documentElement.classList.toString());
  };

  const days: DayDetail[] = [
    {
      day: 1,
      title: "Python Fundamentals + HTTP Basics",
      summary: "Build a Simple Notes API",
      coreProblem: "Create a basic Flask API with in-memory storage for notes with CRUD operations.",
      objectives: ["Python basics and syntax", "HTTP fundamentals (GET, POST, PUT, DELETE)", "Flask framework introduction", "JSON request/response handling"],
      concepts: ["Flask routes and views", "Request/Response objects", "In-memory data storage", "HTTP status codes"],
      deliverables: ["Flask app with /notes endpoints", "CRUD operations for notes", "Basic error handling", "README with API usage"],
      extension: "Add input validation and search functionality for notes",
      reflection: ["What are HTTP methods and when to use each?", "Why use JSON for API communication?", "How does Flask routing work?"],
      quality: ["Clean code structure", "Proper HTTP status codes", "Clear API documentation"],
    },
    {
      day: 2,
      title: "Database Integration (SQL)",
      summary: "Add SQLite Database",
      coreProblem: "Replace in-memory storage with SQLite database for persistent data storage.",
      objectives: ["SQL fundamentals", "Database design basics", "SQLite integration", "Data persistence"],
      concepts: ["SQL queries (SELECT, INSERT, UPDATE, DELETE)", "Database connections", "Schema design", "Primary keys and indexes"],
      deliverables: ["SQLite database setup", "Migration from in-memory to DB", "Database initialization script", "Updated CRUD operations"],
      extension: "Add timestamps, soft deletes, and basic search with SQL queries",
      reflection: ["Why use a database instead of in-memory storage?", "What are primary keys and why are they important?", "How do you prevent SQL injection?"],
      quality: ["Proper database schema", "Connection management", "Error handling for DB operations"],
    },
    {
      day: 3,
      title: "ORM & Data Modeling",
      summary: "Migrate to SQLAlchemy",
      coreProblem: "Implement SQLAlchemy ORM for cleaner database operations and better data modeling.",
      objectives: ["ORM concepts", "SQLAlchemy basics", "Model definition", "Relationships between models"],
      concepts: ["Models and schemas", "ORM sessions", "Query building", "One-to-many relationships"],
      deliverables: ["SQLAlchemy models", "Database migrations", "Refactored CRUD with ORM", "Category/Tag relationships"],
      extension: "Add many-to-many relationships with tags and advanced querying",
      reflection: ["What are the benefits of using an ORM?", "How do relationships work in databases?", "When would you use raw SQL vs ORM?"],
      quality: ["Well-defined models", "Efficient queries", "Proper session management"],
    },
    {
      day: 4,
      title: "Authentication & Authorization",
      summary: "Add User Auth with JWT",
      coreProblem: "Implement user registration, login, and JWT-based authentication for securing API endpoints.",
      objectives: ["Authentication vs authorization", "Password hashing", "JWT tokens", "Protected routes"],
      concepts: ["bcrypt for password hashing", "JWT structure and validation", "Authorization headers", "User sessions"],
      deliverables: ["User model and registration", "/auth/login and /auth/register endpoints", "JWT token generation", "Protected note endpoints"],
      extension: "Add refresh tokens, role-based access control (RBAC), and token expiration",
      reflection: ["Why hash passwords?", "How do JWT tokens work?", "What's the difference between authentication and authorization?"],
      quality: ["Secure password storage", "Proper token validation", "Clear error messages for auth failures"],
    },
    {
      day: 5,
      title: "Advanced API Design",
      summary: "RESTful Best Practices",
      coreProblem: "Refactor API to follow REST principles with proper pagination, filtering, and versioning.",
      objectives: ["REST principles", "API versioning", "Pagination and filtering", "Request validation"],
      concepts: ["Resource-based URLs", "Query parameters", "HTTP headers", "API versioning strategies"],
      deliverables: ["Paginated list endpoints", "Filtering and sorting", "API versioning (v1)", "Request/response schemas"],
      extension: "Add HATEOAS links, rate limiting, and comprehensive API documentation",
      reflection: ["What makes an API RESTful?", "Why is pagination important?", "How do you version APIs?"],
      quality: ["Consistent API design", "Proper use of HTTP methods", "Clear documentation"],
    },
    {
      day: 6,
      title: "File Handling & Background Tasks",
      summary: "Async Processing",
      coreProblem: "Implement file uploads for notes and background task processing for async operations.",
      objectives: ["File upload handling", "Background task processing", "Task queues", "Async operations"],
      concepts: ["Multipart form data", "File storage strategies", "Celery or RQ for background tasks", "Task monitoring"],
      deliverables: ["File upload endpoint", "Background task for processing", "File storage system", "Task status endpoint"],
      extension: "Add image processing, email notifications, and scheduled tasks",
      reflection: ["Why use background tasks?", "How do you handle file uploads securely?", "What are task queues?"],
      quality: ["Secure file handling", "Proper async task management", "Error handling for background jobs"],
    },
    {
      day: 7,
      title: "Testing & Quality",
      summary: "Write Comprehensive Tests",
      coreProblem: "Add unit tests, integration tests, and achieve high code coverage for the API.",
      objectives: ["Testing principles", "Unit vs integration tests", "Test fixtures", "Code coverage"],
      concepts: ["pytest framework", "Test fixtures and mocking", "Testing API endpoints", "Coverage reports"],
      deliverables: ["Unit tests for models and services", "Integration tests for API", "Test fixtures", "Coverage report >80%"],
      extension: "Add end-to-end tests, performance tests, and CI integration",
      reflection: ["Why is testing important?", "What's the difference between unit and integration tests?", "How do you achieve good test coverage?"],
      quality: ["Comprehensive test suite", "Fast and reliable tests", "Clear test documentation"],
    },
    {
      day: 8,
      title: "Caching & Performance",
      summary: "Redis Integration",
      coreProblem: "Implement caching with Redis to improve API performance and reduce database load.",
      objectives: ["Caching strategies", "Redis basics", "Performance optimization", "Cache invalidation"],
      concepts: ["Cache-aside pattern", "TTL (Time To Live)", "Redis data types", "Performance profiling"],
      deliverables: ["Redis integration", "Cached endpoints", "Cache invalidation logic", "Performance benchmarks"],
      extension: "Add cache warming, distributed caching, and query optimization",
      reflection: ["When should you use caching?", "What are cache invalidation strategies?", "How do you measure API performance?"],
      quality: ["Effective caching strategy", "Proper cache invalidation", "Measurable performance improvements"],
    },
    {
      day: 9,
      title: "API Documentation & Deployment",
      summary: "Production Ready",
      coreProblem: "Create comprehensive API documentation and prepare application for production deployment.",
      objectives: ["API documentation tools", "Deployment strategies", "Environment configuration", "Production best practices"],
      concepts: ["Swagger/OpenAPI", "Docker containers", "Environment variables", "CORS and security headers"],
      deliverables: ["Swagger documentation", "Dockerfile and docker-compose", "Production config", "Deployment guide"],
      extension: "Add monitoring, logging aggregation, and health checks",
      reflection: ["Why is API documentation important?", "What are the differences between dev and prod environments?", "How do you secure a production API?"],
      quality: ["Complete API documentation", "Containerized application", "Secure production configuration"],
    },
    {
      day: 10,
      title: "Advanced Features & Architecture",
      summary: "Microservices & WebSockets",
      coreProblem: "Explore microservices architecture and implement real-time features with WebSockets.",
      objectives: ["Microservices concepts", "WebSocket communication", "Service-to-service communication", "Scalability patterns"],
      concepts: ["Service decomposition", "API Gateway pattern", "WebSocket protocol", "Message queues"],
      deliverables: ["WebSocket endpoint for real-time updates", "Service architecture diagram", "Inter-service communication", "Scalability documentation"],
      extension: "Implement event-driven architecture, service mesh, and distributed tracing",
      reflection: ["What are microservices and when to use them?", "How do WebSockets differ from HTTP?", "What are the challenges of distributed systems?"],
      quality: ["Clean architecture", "Scalable design", "Real-time functionality"],
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
      {/* Theme Toggle Button */}
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={toggleTheme}
          className="p-3 rounded-full bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors shadow-lg border-2 border-gray-200 dark:border-gray-600"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? (
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          )}
        </button>
      </div>

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
            <Link
              href="/day/1"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg text-center"
            >
              Start Learning →
            </Link>
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
                  <div className="w-full flex items-start gap-4 p-6">
                    <Link
                      href={`/day/${d.day}`}
                      className="shrink-0 w-14 h-14 bg-linear-to-br from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-sm dark:shadow-none hover:scale-110 transition-transform"
                    >
                      {d.day}
                    </Link>
                    <div className="flex-1">
                      <Link href={`/day/${d.day}`}>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                          {d.title}
                        </h3>
                      </Link>
                      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                        {d.summary}
                      </p>
                    </div>
                    <button
                      onClick={() => toggleDay(d.day)}
                      className={`text-2xl font-medium text-blue-600 dark:text-blue-300 transition-transform hover:scale-110 ${isOpen ? "rotate-90" : ""}`}
                      aria-expanded={isOpen}
                      aria-label="Toggle details"
                    >
                      →
                    </button>
                  </div>
                  {isOpen && (
                    <div className="px-6 pb-6 space-y-4 text-sm text-gray-700 dark:text-gray-200 border-t border-gray-200 dark:border-gray-700 pt-4">
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
                      <div className="pt-4">
                        <Link
                          href={`/day/${d.day}`}
                          className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                        >
                          Start Day {d.day} →
                        </Link>
                      </div>
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
          <Link
            href="/day/1"
            className="inline-block px-10 py-5 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-bold text-xl transition-all transform hover:scale-105 shadow-2xl"
          >
            Begin Day 1 🎉
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 bg-gray-900 text-gray-400 text-center">
        <p>© 2025 Python Backend Learning Path. Built for aspiring backend developers.</p>
      </footer>
    </div>
  );
}

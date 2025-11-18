"use client";
import React, { use, useState, useEffect } from 'react';
import Link from 'next/link';

interface PageProps {
    params: Promise<{ id: string }>;
}

const DayChallenge: React.FC<PageProps> = ({ params }) => {
    const resolvedParams = use(params);
    const dayId = parseInt(resolvedParams.id);
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

    // Day 1 Content
    if (dayId === 1) {
        return renderDay1();
    }

    // Day 2 Content
    if (dayId === 2) {
        return renderDay2();
    }

    // Default fallback
    return (
        <div className="min-h-screen bg-white dark:bg-[#0d1117] py-12 px-6">
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Day {dayId} Coming Soon!</h1>
                <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline">← Back to Home</Link>
            </div>
        </div>
    );

    function renderDay1() {
        return (
            <div className="min-h-screen bg-white dark:bg-[#0d1117] py-12 px-6">
                <div className="max-w-4xl mx-auto">
                    {/* Theme Toggle Button */}
                    <div className="fixed top-6 right-6 z-50">
                        <button
                            onClick={toggleTheme}
                            className="p-3 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors shadow-lg"
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

                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-4 flex items-center justify-center gap-3">
                            🚀 10-Day Python Backend Mastery
                        </h1>
                        <div className="text-xl text-gray-600 dark:text-gray-400 mb-6">Project-Based Learning Challenge</div>
                        <div className="inline-block px-6 py-3 bg-blue-600 text-white rounded-full font-semibold text-lg">
                            DAY 1: HTTP Server Basics
                        </div>
                    </div>

                    <div className="h-1 bg-blue-600 rounded mb-12"></div>

                    {/* Problem Statement */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg">
                        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-4 flex items-center gap-2">
                            🎯 Problem Statement
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            Build a <strong>Personal Notes API</strong> from scratch using Flask. This API will allow users to create, read, update, and delete notes without any database (use in-memory storage for now).
                        </p>
                    </div>

                    {/* Requirements */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-4 flex items-center gap-2">
                            📝 Requirements
                        </h2>
                        <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-600 p-6 rounded-r-lg">
                            <h3 className="text-xl font-bold text-green-700 dark:text-green-400 mb-4">Core Features to Implement:</h3>
                            <ol className="space-y-3 list-decimal list-inside text-gray-700 dark:text-gray-300">
                                <li><strong>GET /notes</strong> - Retrieve all notes</li>
                                <li><strong>GET /notes/&lt;id&gt;</strong> - Retrieve a specific note by ID</li>
                                <li><strong>POST /notes</strong> - Create a new note</li>
                                <li><strong>PUT /notes/&lt;id&gt;</strong> - Update an existing note</li>
                                <li><strong>DELETE /notes/&lt;id&gt;</strong> - Delete a note</li>
                            </ol>
                        </div>
                    </div>

                    {/* Data Structure */}
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Data Structure for a Note:</h3>
                        <pre className="bg-gray-900 text-green-400 p-6 rounded-lg overflow-x-auto">
                            <code>{`{
  "id": 1,
  "title": "My First Note",
  "content": "This is the content of my note",
  "created_at": "2025-11-17T10:30:00",
  "updated_at": "2025-11-17T10:30:00"
}`}</code>
                        </pre>
                    </div>

                    {/* Acceptance Criteria */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-6">✅ Acceptance Criteria</h2>

                        {/* GET /notes */}
                        <div className="bg-white dark:bg-[#161b22] border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-6 shadow-sm">
                            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                                <span className="inline-block px-3 py-1 bg-green-500 text-white text-sm rounded mr-2">GET</span>
                                /notes
                            </h3>
                            <p className="mb-2"><strong className="text-gray-700 dark:text-gray-300">Purpose:</strong> <span className="text-gray-600 dark:text-gray-400">Returns a JSON array of all notes</span></p>
                            <p className="mb-4"><strong className="text-gray-700 dark:text-gray-300">Status Code:</strong> <span className="text-gray-600 dark:text-gray-400">200 OK</span></p>
                            <p className="font-semibold mb-2 text-gray-700 dark:text-gray-300">Expected Response:</p>
                            <pre className="bg-gray-900 text-green-400 p-4 rounded overflow-x-auto">
                                <code>{`{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Shopping List",
      "content": "Buy milk, eggs, bread",
      "created_at": "2025-11-17T10:30:00",
      "updated_at": "2025-11-17T10:30:00"
    }
  ],
  "count": 1
}`}</code>
                            </pre>
                        </div>

                        {/* GET /notes/<id> */}
                        <div className="bg-white dark:bg-[#161b22] border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-6 shadow-sm">
                            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                                <span className="inline-block px-3 py-1 bg-green-500 text-white text-sm rounded mr-2">GET</span>
                                /notes/&lt;id&gt;
                            </h3>
                            <p className="mb-2"><strong className="text-gray-700 dark:text-gray-300">Purpose:</strong> <span className="text-gray-600 dark:text-gray-400">Returns a single note if found</span></p>
                            <p className="mb-4"><strong className="text-gray-700 dark:text-gray-300">Status Codes:</strong> <span className="text-gray-600 dark:text-gray-400">200 OK or 404 Not Found</span></p>
                            <p className="font-semibold mb-2 text-gray-700 dark:text-gray-300">Success Response:</p>
                            <pre className="bg-gray-900 text-green-400 p-4 rounded overflow-x-auto mb-4">
                                <code>{`{
  "success": true,
  "data": {
    "id": 1,
    "title": "Shopping List",
    "content": "Buy milk, eggs, bread",
    "created_at": "2025-11-17T10:30:00",
    "updated_at": "2025-11-17T10:30:00"
  }
}`}</code>
                            </pre>
                            <p className="font-semibold mb-2 text-gray-700 dark:text-gray-300">Error Response:</p>
                            <pre className="bg-gray-900 text-green-400 p-4 rounded overflow-x-auto">
                                <code>{`{
  "success": false,
  "error": "Note not found"
}`}</code>
                            </pre>
                        </div>

                        {/* POST /notes */}
                        <div className="bg-white dark:bg-[#161b22] border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-6 shadow-sm">
                            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                                <span className="inline-block px-3 py-1 bg-yellow-500 text-white text-sm rounded mr-2">POST</span>
                                /notes
                            </h3>
                            <p className="mb-2"><strong className="text-gray-700 dark:text-gray-300">Purpose:</strong> <span className="text-gray-600 dark:text-gray-400">Creates a new note with auto-generated ID</span></p>
                            <p className="mb-4"><strong className="text-gray-700 dark:text-gray-300">Status Code:</strong> <span className="text-gray-600 dark:text-gray-400">201 Created</span></p>
                            <p className="font-semibold mb-2 text-gray-700 dark:text-gray-300">Request Body:</p>
                            <pre className="bg-gray-900 text-green-400 p-4 rounded overflow-x-auto mb-4">
                                <code>{`{
  "title": "My Note",
  "content": "Note content here"
}`}</code>
                            </pre>
                            <p className="font-semibold mb-2 text-gray-700 dark:text-gray-300">Response:</p>
                            <pre className="bg-gray-900 text-green-400 p-4 rounded overflow-x-auto">
                                <code>{`{
  "success": true,
  "message": "Note created successfully",
  "data": {
    "id": 2,
    "title": "My Note",
    "content": "Note content here",
    "created_at": "2025-11-17T11:00:00",
    "updated_at": "2025-11-17T11:00:00"
  }
}`}</code>
                            </pre>
                        </div>

                        {/* PUT /notes/<id> */}
                        <div className="bg-white dark:bg-[#161b22] border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-6 shadow-sm">
                            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                                <span className="inline-block px-3 py-1 bg-blue-500 text-white text-sm rounded mr-2">PUT</span>
                                /notes/&lt;id&gt;
                            </h3>
                            <p className="mb-2"><strong className="text-gray-700 dark:text-gray-300">Purpose:</strong> <span className="text-gray-600 dark:text-gray-400">Updates an existing note</span></p>
                            <p className="mb-4"><strong className="text-gray-700 dark:text-gray-300">Status Codes:</strong> <span className="text-gray-600 dark:text-gray-400">200 OK or 404 Not Found</span></p>
                            <p className="font-semibold mb-2 text-gray-700 dark:text-gray-300">Request Body:</p>
                            <pre className="bg-gray-900 text-green-400 p-4 rounded overflow-x-auto">
                                <code>{`{
  "title": "Updated Title",
  "content": "Updated content"
}`}</code>
                            </pre>
                        </div>

                        {/* DELETE /notes/<id> */}
                        <div className="bg-white dark:bg-[#161b22] border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-6 shadow-sm">
                            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                                <span className="inline-block px-3 py-1 bg-red-500 text-white text-sm rounded mr-2">DELETE</span>
                                /notes/&lt;id&gt;
                            </h3>
                            <p className="mb-2"><strong className="text-gray-700 dark:text-gray-300">Purpose:</strong> <span className="text-gray-600 dark:text-gray-400">Deletes a note by ID</span></p>
                            <p className="mb-4"><strong className="text-gray-700 dark:text-gray-300">Status Codes:</strong> <span className="text-gray-600 dark:text-gray-400">200 OK or 404 Not Found</span></p>
                            <p className="font-semibold mb-2 text-gray-700 dark:text-gray-300">Response:</p>
                            <pre className="bg-gray-900 text-green-400 p-4 rounded overflow-x-auto">
                                <code>{`{
  "success": true,
  "message": "Note deleted successfully"
}`}</code>
                            </pre>
                        </div>
                    </div>

                    {/* Error Handling Requirements */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-6">🚨 Error Handling Requirements</h2>
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-red-100 dark:bg-red-900/40">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Error Type</th>
                                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Status Code</th>
                                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Response</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-red-200 dark:divide-red-800">
                                        <tr>
                                            <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">Missing required fields</td>
                                            <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">400 Bad Request</td>
                                            <td className="px-6 py-4 text-sm"><code className="text-xs bg-gray-900 text-green-400 px-2 py-1 rounded">{`{"success": false, "error": "Title and content are required"}`}</code></td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">Invalid JSON</td>
                                            <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">400 Bad Request</td>
                                            <td className="px-6 py-4 text-sm"><code className="text-xs bg-gray-900 text-green-400 px-2 py-1 rounded">{`{"success": false, "error": "Invalid JSON format"}`}</code></td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">Note not found</td>
                                            <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">404 Not Found</td>
                                            <td className="px-6 py-4 text-sm"><code className="text-xs bg-gray-900 text-green-400 px-2 py-1 rounded">{`{"success": false, "error": "Note not found"}`}</code></td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">Invalid ID</td>
                                            <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">400 Bad Request</td>
                                            <td className="px-6 py-4 text-sm"><code className="text-xs bg-gray-900 text-green-400 px-2 py-1 rounded">{`{"success": false, "error": "Invalid note ID"}`}</code></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Learning Objectives */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-6">🎓 Learning Objectives</h2>
                        <div className="bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-600 p-6 rounded-r-lg">
                            <p className="font-semibold mb-4 text-gray-700 dark:text-gray-300">By completing this task, you will learn:</p>
                            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                                <li>✅ Setting up a Flask application</li>
                                <li>✅ Creating RESTful routes</li>
                                <li>✅ Handling different HTTP methods (GET, POST, PUT, DELETE)</li>
                                <li>✅ Processing JSON request/response</li>
                                <li>✅ HTTP status codes</li>
                                <li>✅ Error handling</li>
                                <li>✅ In-memory data storage</li>
                                <li>✅ Auto-incrementing IDs</li>
                                <li>✅ Timestamp generation</li>
                            </ul>
                        </div>
                    </div>

                    {/* Setup Instructions */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-6">🛠️ Setup Instructions</h2>

                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">1. Install Flask:</h3>
                                <pre className="bg-gray-900 text-green-400 p-4 rounded overflow-x-auto">
                                    <code>{`pip install flask`}</code>
                                </pre>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">2. Create project structure:</h3>
                                <pre className="bg-gray-900 text-green-400 p-4 rounded overflow-x-auto">
                                    <code>{`day1_notes_api/
├── app.py              # Your main application file
└── requirements.txt`}</code>
                                </pre>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">3. Start with this boilerplate:</h3>
                                <pre className="bg-gray-900 text-green-400 p-4 rounded overflow-x-auto">
                                    <code>{`from flask import Flask, request, jsonify
from datetime import datetime

app = Flask(__name__)

# In-memory storage (list of dictionaries)
notes = []
note_id_counter = 1

# Your routes go here...

if __name__ == '__main__':
    app.run(debug=True, port=5000)`}</code>
                                </pre>
                            </div>
                        </div>
                    </div>

                    {/* Testing Your API */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-6">🧪 Testing Your API</h2>
                        <p className="mb-4 text-gray-700 dark:text-gray-300">Use these curl commands or Postman/Thunder Client:</p>

                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Create a note:</h3>
                                <pre className="bg-gray-900 text-green-400 p-4 rounded overflow-x-auto">
                                    <code>{`curl -X POST http://localhost:5000/notes \\
  -H "Content-Type: application/json" \\
  -d '{"title":"Test Note","content":"This is a test"}'`}</code>
                                </pre>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Get all notes:</h3>
                                <pre className="bg-gray-900 text-green-400 p-4 rounded overflow-x-auto">
                                    <code>{`curl http://localhost:5000/notes`}</code>
                                </pre>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Get specific note:</h3>
                                <pre className="bg-gray-900 text-green-400 p-4 rounded overflow-x-auto">
                                    <code>{`curl http://localhost:5000/notes/1`}</code>
                                </pre>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Update a note:</h3>
                                <pre className="bg-gray-900 text-green-400 p-4 rounded overflow-x-auto">
                                    <code>{`curl -X PUT http://localhost:5000/notes/1 \\
  -H "Content-Type: application/json" \\
  -d '{"title":"Updated","content":"New content"}'`}</code>
                                </pre>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Delete a note:</h3>
                                <pre className="bg-gray-900 text-green-400 p-4 rounded overflow-x-auto">
                                    <code>{`curl -X DELETE http://localhost:5000/notes/1`}</code>
                                </pre>
                            </div>
                        </div>
                    </div>

                    {/* Bonus Challenges */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-6">🌟 Bonus Challenges (Optional)</h2>
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-600 p-6 rounded-r-lg">
                            <p className="font-semibold mb-4 text-gray-700 dark:text-gray-300">If you finish early, try these:</p>
                            <ol className="space-y-2 list-decimal list-inside text-gray-700 dark:text-gray-300">
                                <li><strong>Add validation:</strong> Title must be 1-100 characters, content max 1000 characters</li>
                                <li><strong>Search feature:</strong> GET /notes/search?q=keyword - search in title and content</li>
                                <li><strong>Add tags:</strong> Each note can have an array of tags</li>
                                <li><strong>Sorting:</strong> GET /notes?sort=created_at&order=desc</li>
                                <li><strong>Add a simple HTML frontend</strong> to interact with your API</li>
                            </ol>
                        </div>
                    </div>

                    {/* Time Allocation */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-6">⏱️ Time Allocation</h2>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                            <div className="bg-linear-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 p-4 rounded-lg text-center border border-blue-200 dark:border-blue-700">
                                <div className="font-bold text-gray-800 dark:text-gray-200">Setup & Research</div>
                                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-2">30 min</div>
                            </div>
                            <div className="bg-linear-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 p-4 rounded-lg text-center border border-purple-200 dark:border-purple-700">
                                <div className="font-bold text-gray-800 dark:text-gray-200">Implementation</div>
                                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mt-2">2 hours</div>
                            </div>
                            <div className="bg-linear-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 p-4 rounded-lg text-center border border-green-200 dark:border-green-700">
                                <div className="font-bold text-gray-800 dark:text-gray-200">Testing & Debugging</div>
                                <div className="text-2xl font-bold text-green-600 dark:text-green-400 mt-2">45 min</div>
                            </div>
                            <div className="bg-linear-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 p-4 rounded-lg text-center border border-orange-200 dark:border-orange-700">
                                <div className="font-bold text-gray-800 dark:text-gray-200">Documentation</div>
                                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400 mt-2">15 min</div>
                            </div>
                        </div>
                        <p className="text-center text-lg font-bold text-gray-700 dark:text-gray-300">Total: ~3.5 hours</p>
                    </div>

                    {/* Resources */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-6">📚 Resources to Help You</h2>
                        <div className="space-y-3">
                            <a href="https://flask.palletsprojects.com/en/3.0.x/quickstart/" target="_blank" rel="noreferrer" className="block bg-white dark:bg-[#161b22] border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                                <span className="text-blue-600 dark:text-blue-400 hover:underline">📖 Flask Quickstart Documentation</span>
                            </a>
                            <a href="https://httpstatuses.com/" target="_blank" rel="noreferrer" className="block bg-white dark:bg-[#161b22] border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                                <span className="text-blue-600 dark:text-blue-400 hover:underline">📖 HTTP Status Codes Reference</span>
                            </a>
                            <a href="https://docs.python.org/3/library/datetime.html" target="_blank" rel="noreferrer" className="block bg-white dark:bg-[#161b22] border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                                <span className="text-blue-600 dark:text-blue-400 hover:underline">📖 Python datetime Module</span>
                            </a>
                        </div>
                    </div>

                    {/* Success Checklist */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-6">✨ Success Checklist</h2>
                        <p className="mb-4 text-gray-700 dark:text-gray-300">Before moving to Day 2, ensure:</p>
                        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                            <li className="flex items-start gap-2">
                                <span className="text-green-600 dark:text-green-400 text-xl">☐</span>
                                <span>All 5 endpoints work correctly</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-600 dark:text-green-400 text-xl">☐</span>
                                <span>Proper HTTP status codes are returned</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-600 dark:text-green-400 text-xl">☐</span>
                                <span>Error handling is implemented</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-600 dark:text-green-400 text-xl">☐</span>
                                <span>JSON responses follow the specified format</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-600 dark:text-green-400 text-xl">☐</span>
                                <span>Timestamps are automatically generated</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-600 dark:text-green-400 text-xl">☐</span>
                                <span>IDs auto-increment properly</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-600 dark:text-green-400 text-xl">☐</span>
                                <span>You can test all operations via curl/Postman</span>
                            </li>
                        </ul>
                    </div>

                    {/* Ready to Start */}
                    <div className="bg-linear-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-2 border-blue-300 dark:border-blue-700 rounded-lg p-8 text-center mb-8">
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">🎯 Ready to Start?</h3>
                        <p className="text-gray-700 dark:text-gray-300 mb-2">Begin coding and feel free to ask questions if you get stuck!</p>
                        <p className="text-gray-700 dark:text-gray-300"><strong>Remember:</strong> The goal is to understand, not just to finish. Take your time with each concept.</p>
                    </div>

                    {/* Navigation */}
                    <div className="flex justify-between items-center mb-8">
                        <Link href="/" className="px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg font-semibold transition-colors">
                            ← Back to Home
                        </Link>
                        <Link href="/day/2" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors">
                            Next: Day 2 →
                        </Link>
                    </div>

                    {/* Footer */}
                    <div className="text-center pt-8 border-t-2 border-gray-200 dark:border-gray-700">
                        <p className="font-bold text-gray-700 dark:text-gray-300">10-Day Python Backend Mastery Challenge</p>
                        <p className="text-gray-600 dark:text-gray-400">Day 1 of 10 | Created for Your Learning Journey</p>
                    </div>
                </div>
            </div>
        );
    }

    function renderDay2() {
        return (
            <div className="min-h-screen bg-white dark:bg-[#0d1117] py-12 px-6">
                <div className="max-w-4xl mx-auto">
                    {/* Theme Toggle Button */}
                    <div className="fixed top-6 right-6 z-50">
                        <button
                            onClick={toggleTheme}
                            className="p-3 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors shadow-lg"
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

                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-4 flex items-center justify-center gap-3">
                            🗄️ 10-Day Python Backend Mastery
                        </h1>
                        <div className="text-xl text-gray-600 dark:text-gray-400 mb-6">Project-Based Learning Challenge</div>
                        <div className="inline-block px-6 py-3 bg-purple-600 text-white rounded-full font-semibold text-lg">
                            DAY 2: Database Integration (SQLite)
                        </div>
                    </div>

                    <div className="h-1 bg-purple-600 rounded mb-12"></div>

                    {/* Problem Statement */}
                    <div className="bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-600 p-6 mb-8 rounded-r-lg">
                        <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-400 mb-4 flex items-center gap-2">
                            🎯 Problem Statement
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                            Your Day 1 Notes API works great, but there's a problem: <strong>every time you restart the server, all your notes disappear!</strong> This happens because we're storing data in memory (a Python list).
                        </p>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            Today, you'll learn how to <strong>persist data</strong> by integrating a <strong>SQLite database</strong>. This means your notes will survive server restarts and be stored permanently on disk.
                        </p>
                    </div>

                    {/* Why Database? */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-400 mb-4">🤔 Why Do We Need a Database?</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 p-4 rounded-lg">
                                <h3 className="font-bold text-red-700 dark:text-red-400 mb-2">❌ In-Memory Storage Problems:</h3>
                                <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                                    <li>• Data lost on restart</li>
                                    <li>• No data between requests</li>
                                    <li>• Can't handle large datasets</li>
                                    <li>• No concurrent access</li>
                                    <li>• No querying capabilities</li>
                                </ul>
                            </div>
                            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 p-4 rounded-lg">
                                <h3 className="font-bold text-green-700 dark:text-green-400 mb-2">✅ Database Benefits:</h3>
                                <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                                    <li>• Persistent storage</li>
                                    <li>• Data survives restarts</li>
                                    <li>• Efficient querying</li>
                                    <li>• Handle millions of records</li>
                                    <li>• Transaction support</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Requirements */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-400 mb-4 flex items-center gap-2">
                            📝 Your Mission
                        </h2>
                        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 p-6 rounded-r-lg">
                            <h3 className="text-xl font-bold text-blue-700 dark:text-blue-400 mb-4">Transform your Notes API:</h3>
                            <ol className="space-y-3 list-decimal list-inside text-gray-700 dark:text-gray-300">
                                <li><strong>Replace in-memory list</strong> with SQLite database</li>
                                <li><strong>Create a database schema</strong> for notes table</li>
                                <li><strong>Refactor all CRUD operations</strong> to use SQL queries</li>
                                <li><strong>Add database initialization</strong> on app startup</li>
                                <li><strong>Keep the same API endpoints</strong> (no breaking changes!)</li>
                                <li><strong>Add proper connection management</strong> and error handling</li>
                            </ol>
                        </div>
                    </div>

                    {/* Database Schema */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-400 mb-4">📊 Database Schema Design</h2>
                        <p className="mb-4 text-gray-700 dark:text-gray-300">Create a <code className="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded text-sm">notes</code> table with this structure:</p>

                        <div className="bg-white dark:bg-[#161b22] border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden mb-4">
                            <table className="w-full">
                                <thead className="bg-gray-100 dark:bg-gray-800">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Column</th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Type</th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Constraints</th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Purpose</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    <tr>
                                        <td className="px-6 py-4 text-sm font-mono text-purple-600 dark:text-purple-400">id</td>
                                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">INTEGER</td>
                                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">PRIMARY KEY, AUTOINCREMENT</td>
                                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">Unique identifier</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 text-sm font-mono text-purple-600 dark:text-purple-400">title</td>
                                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">TEXT</td>
                                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">NOT NULL</td>
                                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">Note title</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 text-sm font-mono text-purple-600 dark:text-purple-400">content</td>
                                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">TEXT</td>
                                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">NOT NULL</td>
                                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">Note content</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 text-sm font-mono text-purple-600 dark:text-purple-400">created_at</td>
                                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">TIMESTAMP</td>
                                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">DEFAULT CURRENT_TIMESTAMP</td>
                                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">Creation time</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 text-sm font-mono text-purple-600 dark:text-purple-400">updated_at</td>
                                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">TIMESTAMP</td>
                                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">DEFAULT CURRENT_TIMESTAMP</td>
                                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">Last update time</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">SQL CREATE TABLE Statement:</h3>
                        <pre className="bg-gray-900 text-green-400 p-4 rounded overflow-x-auto">
                            <code>{`CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`}</code>
                        </pre>
                    </div>

                    {/* Implementation Steps */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-400 mb-6">🛠️ Implementation Guide</h2>

                        <div className="space-y-6">
                            {/* Step 1 */}
                            <div className="bg-white dark:bg-[#161b22] border-l-4 border-blue-500 p-6 rounded-r-lg shadow-sm">
                                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">
                                    <span className="inline-block w-8 h-8 bg-blue-500 text-white rounded-full text-center mr-2">1</span>
                                    Database Connection Setup
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">Create helper functions to manage database connections:</p>
                                <pre className="bg-gray-900 text-green-400 p-4 rounded overflow-x-auto">
                                    <code>{`import sqlite3
from flask import Flask, request, jsonify, g
import os

DATABASE = 'notes.db'

def get_db():
    """Get database connection, reuse if exists"""
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
        db.row_factory = sqlite3.Row  # Access columns by name
    return db

@app.teardown_appcontext
def close_connection(exception):
    """Close database connection after request"""
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()`}</code>
                                </pre>
                            </div>

                            {/* Step 2 */}
                            <div className="bg-white dark:bg-[#161b22] border-l-4 border-purple-500 p-6 rounded-r-lg shadow-sm">
                                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">
                                    <span className="inline-block w-8 h-8 bg-purple-500 text-white rounded-full text-center mr-2">2</span>
                                    Initialize Database
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">Create the notes table when app starts:</p>
                                <pre className="bg-gray-900 text-green-400 p-4 rounded overflow-x-auto">
                                    <code>{`def init_db():
    """Initialize the database with schema"""
    with app.app_context():
        db = get_db()
        db.execute('''
            CREATE TABLE IF NOT EXISTS notes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                content TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        db.commit()
        print("Database initialized successfully!")

# Call this when app starts
init_db()`}</code>
                                </pre>
                            </div>

                            {/* Step 3 */}
                            <div className="bg-white dark:bg-[#161b22] border-l-4 border-green-500 p-6 rounded-r-lg shadow-sm">
                                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">
                                    <span className="inline-block w-8 h-8 bg-green-500 text-white rounded-full text-center mr-2">3</span>
                                    Refactor GET /notes
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">Query all notes from database:</p>
                                <pre className="bg-gray-900 text-green-400 p-4 rounded overflow-x-auto">
                                    <code>{`@app.route('/notes', methods=['GET'])
def get_all_notes():
    db = get_db()
    cursor = db.execute('SELECT * FROM notes ORDER BY created_at DESC')
    notes = cursor.fetchall()
    
    # Convert to list of dictionaries
    notes_list = [{
        'id': note['id'],
        'title': note['title'],
        'content': note['content'],
        'created_at': note['created_at'],
        'updated_at': note['updated_at']
    } for note in notes]
    
    return jsonify({
        'success': True,
        'data': notes_list,
        'count': len(notes_list)
    }), 200`}</code>
                                </pre>
                            </div>

                            {/* Step 4 */}
                            <div className="bg-white dark:bg-[#161b22] border-l-4 border-yellow-500 p-6 rounded-r-lg shadow-sm">
                                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">
                                    <span className="inline-block w-8 h-8 bg-yellow-500 text-white rounded-full text-center mr-2">4</span>
                                    Refactor POST /notes
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">Insert new note into database:</p>
                                <pre className="bg-gray-900 text-green-400 p-4 rounded overflow-x-auto">
                                    <code>{`@app.route('/notes', methods=['POST'])
def create_note():
    data = request.get_json()
    
    # Validation
    if not data or 'title' not in data or 'content' not in data:
        return jsonify({
            'success': False,
            'error': 'Title and content are required'
        }), 400
    
    db = get_db()
    cursor = db.execute(
        'INSERT INTO notes (title, content) VALUES (?, ?)',
        (data['title'], data['content'])
    )
    db.commit()
    
    # Get the created note
    note = db.execute('SELECT * FROM notes WHERE id = ?', 
                     (cursor.lastrowid,)).fetchone()
    
    return jsonify({
        'success': True,
        'message': 'Note created successfully',
        'data': dict(note)
    }), 201`}</code>
                                </pre>
                            </div>

                            {/* Step 5 */}
                            <div className="bg-white dark:bg-[#161b22] border-l-4 border-orange-500 p-6 rounded-r-lg shadow-sm">
                                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">
                                    <span className="inline-block w-8 h-8 bg-orange-500 text-white rounded-full text-center mr-2">5</span>
                                    Refactor PUT /notes/&lt;id&gt;
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">Update note with timestamp:</p>
                                <pre className="bg-gray-900 text-green-400 p-4 rounded overflow-x-auto">
                                    <code>{`@app.route('/notes/<int:note_id>', methods=['PUT'])
def update_note(note_id):
    data = request.get_json()
    
    if not data or 'title' not in data or 'content' not in data:
        return jsonify({
            'success': False,
            'error': 'Title and content are required'
        }), 400
    
    db = get_db()
    
    # Check if note exists
    note = db.execute('SELECT * FROM notes WHERE id = ?', 
                     (note_id,)).fetchone()
    if not note:
        return jsonify({
            'success': False,
            'error': 'Note not found'
        }), 404
    
    # Update note
    db.execute('''
        UPDATE notes 
        SET title = ?, content = ?, updated_at = CURRENT_TIMESTAMP 
        WHERE id = ?
    ''', (data['title'], data['content'], note_id))
    db.commit()
    
    # Get updated note
    updated_note = db.execute('SELECT * FROM notes WHERE id = ?', 
                             (note_id,)).fetchone()
    
    return jsonify({
        'success': True,
        'message': 'Note updated successfully',
        'data': dict(updated_note)
    }), 200`}</code>
                                </pre>
                            </div>

                            {/* Step 6 */}
                            <div className="bg-white dark:bg-[#161b22] border-l-4 border-red-500 p-6 rounded-r-lg shadow-sm">
                                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">
                                    <span className="inline-block w-8 h-8 bg-red-500 text-white rounded-full text-center mr-2">6</span>
                                    Refactor DELETE /notes/&lt;id&gt;
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">Delete note from database:</p>
                                <pre className="bg-gray-900 text-green-400 p-4 rounded overflow-x-auto">
                                    <code>{`@app.route('/notes/<int:note_id>', methods=['DELETE'])
def delete_note(note_id):
    db = get_db()
    
    # Check if note exists
    note = db.execute('SELECT * FROM notes WHERE id = ?', 
                     (note_id,)).fetchone()
    if not note:
        return jsonify({
            'success': False,
            'error': 'Note not found'
        }), 404
    
    # Delete note
    db.execute('DELETE FROM notes WHERE id = ?', (note_id,))
    db.commit()
    
    return jsonify({
        'success': True,
        'message': 'Note deleted successfully'
    }), 200`}</code>
                                </pre>
                            </div>
                        </div>
                    </div>

                    {/* Learning Objectives */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-400 mb-6">🎓 Key Concepts You'll Master</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 p-4 rounded-lg">
                                <h3 className="font-bold text-blue-700 dark:text-blue-400 mb-2">SQL Fundamentals:</h3>
                                <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                                    <li>✓ CREATE TABLE statements</li>
                                    <li>✓ INSERT, SELECT, UPDATE, DELETE</li>
                                    <li>✓ WHERE clauses and filtering</li>
                                    <li>✓ PRIMARY KEY & AUTOINCREMENT</li>
                                    <li>✓ Timestamps and defaults</li>
                                </ul>
                            </div>
                            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 p-4 rounded-lg">
                                <h3 className="font-bold text-purple-700 dark:text-purple-400 mb-2">Python sqlite3 Module:</h3>
                                <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                                    <li>✓ Database connections</li>
                                    <li>✓ Cursor operations</li>
                                    <li>✓ Parameterized queries (SQL injection prevention)</li>
                                    <li>✓ Row factories</li>
                                    <li>✓ Transaction management (commit/rollback)</li>
                                </ul>
                            </div>
                            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 p-4 rounded-lg">
                                <h3 className="font-bold text-green-700 dark:text-green-400 mb-2">Flask Integration:</h3>
                                <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                                    <li>✓ Application context (g object)</li>
                                    <li>✓ Teardown functions</li>
                                    <li>✓ Database initialization</li>
                                    <li>✓ Connection pooling basics</li>
                                </ul>
                            </div>
                            <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-700 p-4 rounded-lg">
                                <h3 className="font-bold text-orange-700 dark:text-orange-400 mb-2">Best Practices:</h3>
                                <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                                    <li>✓ Always use parameterized queries</li>
                                    <li>✓ Close connections properly</li>
                                    <li>✓ Handle database errors</li>
                                    <li>✓ Validate data before inserting</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Testing Section */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-400 mb-6">🧪 Testing Your Database Integration</h2>

                        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-600 p-6 rounded-r-lg mb-4">
                            <h3 className="font-bold text-yellow-700 dark:text-yellow-400 mb-3">Verification Steps:</h3>
                            <ol className="space-y-2 list-decimal list-inside text-gray-700 dark:text-gray-300">
                                <li><strong>Create some notes</strong> using POST requests</li>
                                <li><strong>Stop your Flask server</strong> (Ctrl+C)</li>
                                <li><strong>Restart the server</strong></li>
                                <li><strong>GET /notes</strong> - Your notes should still be there! 🎉</li>
                                <li><strong>Check the database file</strong> - You should see <code className="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded text-sm">notes.db</code> in your project folder</li>
                            </ol>
                        </div>

                        <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">SQLite Database Browser (Optional):</h3>
                        <p className="text-gray-700 dark:text-gray-300 mb-2">View your database visually with SQLite browser:</p>
                        <pre className="bg-gray-900 text-green-400 p-4 rounded overflow-x-auto mb-4">
                            <code>{`# Install DB Browser for SQLite
# Download from: https://sqlitebrowser.org/

# Or use command line:
sqlite3 notes.db
sqlite> SELECT * FROM notes;
sqlite> .schema notes
sqlite> .exit`}</code>
                        </pre>
                    </div>

                    {/* Common Pitfalls */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-400 mb-6">⚠️ Common Pitfalls & Solutions</h2>
                        <div className="space-y-4">
                            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-4">
                                <h3 className="font-bold text-red-700 dark:text-red-400 mb-2">❌ SQL Injection Vulnerability</h3>
                                <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">NEVER do this:</p>
                                <pre className="bg-gray-900 text-red-400 p-3 rounded text-xs mb-2 overflow-x-auto">
                                    <code>{`# DANGEROUS! Don't do this!
query = f"SELECT * FROM notes WHERE id = {note_id}"
db.execute(query)`}</code>
                                </pre>
                                <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">Always use parameterized queries:</p>
                                <pre className="bg-gray-900 text-green-400 p-3 rounded text-xs overflow-x-auto">
                                    <code>{`# SAFE! Always do this!
db.execute('SELECT * FROM notes WHERE id = ?', (note_id,))`}</code>
                                </pre>
                            </div>

                            <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-700 rounded-lg p-4">
                                <h3 className="font-bold text-orange-700 dark:text-orange-400 mb-2">⚡ Forgetting to Commit</h3>
                                <p className="text-gray-700 dark:text-gray-300 text-sm">After INSERT, UPDATE, or DELETE, always call <code className="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded text-xs">db.commit()</code></p>
                            </div>

                            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4">
                                <h3 className="font-bold text-yellow-700 dark:text-yellow-400 mb-2">🔍 Database Locked Error</h3>
                                <p className="text-gray-700 dark:text-gray-300 text-sm">Make sure you're closing connections properly using teardown functions</p>
                            </div>
                        </div>
                    </div>

                    {/* Bonus Challenges */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-400 mb-6">🌟 Bonus Challenges</h2>
                        <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-l-4 border-purple-600 p-6 rounded-r-lg">
                            <p className="font-semibold mb-4 text-gray-700 dark:text-gray-300">Ready for more? Try these:</p>
                            <ol className="space-y-3 list-decimal list-inside text-gray-700 dark:text-gray-300">
                                <li>
                                    <strong>Search Functionality:</strong> Add <code className="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded text-sm">GET /notes/search?q=keyword</code>
                                    <pre className="bg-gray-900 text-green-400 p-3 rounded text-xs mt-2 overflow-x-auto">
                                        <code>{`SELECT * FROM notes WHERE title LIKE ? OR content LIKE ?`}</code>
                                    </pre>
                                </li>
                                <li>
                                    <strong>Soft Deletes:</strong> Add a <code className="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded text-sm">deleted_at</code> column instead of actually deleting records
                                </li>
                                <li>
                                    <strong>Pagination:</strong> Add <code className="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded text-sm">GET /notes?page=1&limit=10</code> using LIMIT and OFFSET
                                </li>
                                <li>
                                    <strong>Categories:</strong> Add a category field and filter by category
                                </li>
                                <li>
                                    <strong>Database Seeding:</strong> Create a script to populate sample data for testing
                                </li>
                            </ol>
                        </div>
                    </div>

                    {/* Resources */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-400 mb-6">📚 Essential Resources</h2>
                        <div className="space-y-3">
                            <a href="https://docs.python.org/3/library/sqlite3.html" target="_blank" rel="noreferrer" className="block bg-white dark:bg-[#161b22] border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                                <span className="text-blue-600 dark:text-blue-400 hover:underline">📖 Python sqlite3 Documentation</span>
                            </a>
                            <a href="https://www.sqlitetutorial.net/" target="_blank" rel="noreferrer" className="block bg-white dark:bg-[#161b22] border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                                <span className="text-blue-600 dark:text-blue-400 hover:underline">📖 SQLite Tutorial</span>
                            </a>
                            <a href="https://flask.palletsprojects.com/en/3.0.x/patterns/sqlite3/" target="_blank" rel="noreferrer" className="block bg-white dark:bg-[#161b22] border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                                <span className="text-blue-600 dark:text-blue-400 hover:underline">📖 Flask + SQLite Integration</span>
                            </a>
                            <a href="https://sqlitebrowser.org/" target="_blank" rel="noreferrer" className="block bg-white dark:bg-[#161b22] border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                                <span className="text-blue-600 dark:text-blue-400 hover:underline">🔧 DB Browser for SQLite (GUI Tool)</span>
                            </a>
                        </div>
                    </div>

                    {/* Success Checklist */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-400 mb-6">✨ Success Checklist</h2>
                        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-6">
                            <p className="font-semibold mb-4 text-gray-700 dark:text-gray-300">Before moving to Day 3, ensure:</p>
                            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                                <li className="flex items-start gap-2">
                                    <span className="text-green-600 dark:text-green-400 text-xl">☐</span>
                                    <span>Database file (<code className="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded text-sm">notes.db</code>) is created</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-600 dark:text-green-400 text-xl">☐</span>
                                    <span>All CRUD operations work with database</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-600 dark:text-green-400 text-xl">☐</span>
                                    <span>Data persists after server restart</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-600 dark:text-green-400 text-xl">☐</span>
                                    <span>Using parameterized queries (no SQL injection)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-600 dark:text-green-400 text-xl">☐</span>
                                    <span>Proper connection management with teardown</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-600 dark:text-green-400 text-xl">☐</span>
                                    <span>Timestamps auto-update on create/update</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-600 dark:text-green-400 text-xl">☐</span>
                                    <span>Error handling for database operations</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-600 dark:text-green-400 text-xl">☐</span>
                                    <span>Can view data using SQLite browser or CLI</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Time Allocation */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-400 mb-6">⏱️ Time Allocation</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 p-4 rounded-lg text-center border border-blue-200 dark:border-blue-700">
                                <div className="font-bold text-gray-800 dark:text-gray-200">SQL Learning</div>
                                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-2">45 min</div>
                            </div>
                            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 p-4 rounded-lg text-center border border-purple-200 dark:border-purple-700">
                                <div className="font-bold text-gray-800 dark:text-gray-200">Refactoring</div>
                                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mt-2">2 hours</div>
                            </div>
                            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 p-4 rounded-lg text-center border border-green-200 dark:border-green-700">
                                <div className="font-bold text-gray-800 dark:text-gray-200">Testing</div>
                                <div className="text-2xl font-bold text-green-600 dark:text-green-400 mt-2">45 min</div>
                            </div>
                            <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 p-4 rounded-lg text-center border border-orange-200 dark:border-orange-700">
                                <div className="font-bold text-gray-800 dark:text-gray-200">DB Exploration</div>
                                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400 mt-2">30 min</div>
                            </div>
                        </div>
                        <p className="text-center text-lg font-bold text-gray-700 dark:text-gray-300">Total: ~4 hours</p>
                    </div>

                    {/* Reflection Questions */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-400 mb-6">💭 Reflection Questions</h2>
                        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 p-6 rounded-r-lg">
                            <p className="font-semibold mb-4 text-gray-700 dark:text-gray-300">Think about these:</p>
                            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                                <li>❓ What are the advantages of using a database over in-memory storage?</li>
                                <li>❓ Why do we use parameterized queries instead of string formatting?</li>
                                <li>❓ What is a primary key and why is it important?</li>
                                <li>❓ How does SQLite differ from MySQL or PostgreSQL?</li>
                                <li>❓ What happens if you forget to call <code className="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded text-sm">commit()</code>?</li>
                                <li>❓ When would you need to use <code className="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded text-sm">rollback()</code>?</li>
                            </ul>
                        </div>
                    </div>

                    {/* What's Next */}
                    <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-2 border-purple-300 dark:border-purple-700 rounded-lg p-8 text-center mb-8">
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">🚀 What's Next?</h3>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            <strong>Day 3: ORM & Data Modeling</strong><br />
                            Learn SQLAlchemy to work with databases using Python objects instead of raw SQL!
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                            But first, master the SQL fundamentals from today. Understanding raw SQL will make ORMs much easier.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div className="flex justify-between items-center mb-8">
                        <Link href="/day/1" className="px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg font-semibold transition-colors">
                            ← Day 1
                        </Link>
                        <Link href="/" className="px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg font-semibold transition-colors">
                            Home
                        </Link>
                        <Link href="/day/3" className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors">
                            Day 3 →
                        </Link>
                    </div>

                    {/* Footer */}
                    <div className="text-center pt-8 border-t-2 border-gray-200 dark:border-gray-700">
                        <p className="font-bold text-gray-700 dark:text-gray-300">10-Day Python Backend Mastery Challenge</p>
                        <p className="text-gray-600 dark:text-gray-400">Day 2 of 10 | Database Integration with SQLite</p>
                    </div>
                </div>
            </div>
        );
    }
};

export default DayChallenge;

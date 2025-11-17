"use client";
import React, { use, useState, useEffect } from 'react';
import Link from 'next/link';

const Day1Challenge: React.FC = () => {
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
};

export default Day1Challenge;

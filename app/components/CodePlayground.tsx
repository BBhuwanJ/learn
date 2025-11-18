"use client";
import React, { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';

interface CodePlaygroundProps {
    language: 'python' | 'sql';
    initialCode?: string;
    title?: string;
    description?: string;
    expectedOutput?: string;
    setupCode?: string;
    height?: string;
    enablePackageInstall?: boolean;
    enableFileSystem?: boolean;
}

interface FileNode {
    name: string;
    type: 'file' | 'folder';
    content?: string;
    children?: FileNode[];
}

export default function CodePlayground({
    language,
    initialCode = '',
    title = 'Interactive Code Editor',
    description = '',
    expectedOutput = '',
    setupCode = '',
    height = '400px',
    enablePackageInstall = false,
    enableFileSystem = false
}: CodePlaygroundProps) {
    const [code, setCode] = useState(initialCode);
    const [output, setOutput] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const [pyodide, setPyodide] = useState<any>(null);
    const [db, setDb] = useState<any>(null);
    const outputRef = useRef<HTMLPreElement>(null);
    const [packageToInstall, setPackageToInstall] = useState('');
    const [installedPackages, setInstalledPackages] = useState<string[]>([]);
    const [isInstalling, setIsInstalling] = useState(false);
    const [fileSystem, setFileSystem] = useState<FileNode[]>([
        {
            name: 'app.py',
            type: 'file',
            content: initialCode
        }
    ]);
    const [currentFile, setCurrentFile] = useState('app.py');

    // Initialize Pyodide for Python
    useEffect(() => {
        if (language === 'python' && !pyodide) {
            const loadPyodide = async () => {
                try {
                    // @ts-ignore
                    const pyodideInstance = await window.loadPyodide({
                        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/',
                    });

                    // Install commonly needed packages
                    await pyodideInstance.loadPackage(['micropip']);

                    if (setupCode) {
                        await pyodideInstance.runPythonAsync(setupCode);
                    }

                    setPyodide(pyodideInstance);
                    setOutput('✅ Python environment ready! You can start coding.\n');

                    if (enablePackageInstall) {
                        setOutput(prev => prev + '💡 Use the package installer to add Flask, requests, etc.\n');
                    }
                } catch (error: any) {
                    setOutput(`❌ Error loading Python: ${error.message}\n`);
                }
            };
            loadPyodide();
        }
    }, [language, setupCode, pyodide, enablePackageInstall]);

    // Initialize SQL.js for SQLite
    useEffect(() => {
        if (language === 'sql' && !db) {
            const loadSQL = async () => {
                try {
                    // @ts-ignore
                    const SQL = await window.initSqlJs({
                        locateFile: (file: string) => `https://sql.js.org/dist/${file}`
                    });

                    const database = new SQL.Database();

                    // Run setup SQL if provided
                    if (setupCode) {
                        database.run(setupCode);
                    }

                    setDb(database);
                    setOutput('✅ SQLite database ready! You can start querying.\n');
                } catch (error: any) {
                    setOutput(`❌ Error loading SQLite: ${error.message}\n`);
                }
            };
            loadSQL();
        }
    }, [language, setupCode, db]);

    const runPythonCode = async () => {
        if (!pyodide) {
            setOutput('⏳ Python is still loading, please wait...\n');
            return;
        }

        setIsRunning(true);
        setOutput('🔄 Running Python code...\n');

        try {
            // If file system is enabled, write all files to Pyodide's virtual filesystem
            if (enableFileSystem) {
                fileSystem.forEach((file) => {
                    if (file.type === 'file' && file.content) {
                        pyodide.FS.writeFile(file.name, file.content);
                    }
                });
            }

            // Capture stdout
            const capturedOutput: string[] = [];
            pyodide.setStdout({
                batched: (text: string) => {
                    capturedOutput.push(text);
                }
            });

            // Run the code
            const result = await pyodide.runPythonAsync(code);

            let outputText = capturedOutput.join('');
            if (result !== undefined && result !== null) {
                outputText += `\n▶ Result: ${result}`;
            }

            setOutput(outputText || '✅ Code executed successfully (no output)');
        } catch (error: any) {
            setOutput(`❌ Error:\n${error.message || error}`);
        } finally {
            setIsRunning(false);
        }
    };

    const installPackage = async () => {
        if (!pyodide || !packageToInstall.trim()) {
            setOutput('⚠️ Please enter a package name\n');
            return;
        }

        setIsInstalling(true);
        const pkg = packageToInstall.trim();
        setOutput(`📦 Installing ${pkg}...\n`);

        try {
            await pyodide.runPythonAsync(`
import micropip
await micropip.install('${pkg}')
            `);

            setInstalledPackages(prev => [...prev, pkg]);
            setOutput(prev => prev + `✅ Successfully installed ${pkg}\n`);
            setPackageToInstall('');
        } catch (error: any) {
            setOutput(prev => prev + `❌ Error installing ${pkg}: ${error.message}\n`);
        } finally {
            setIsInstalling(false);
        }
    };

    const createNewFile = (fileName: string) => {
        if (!fileName.trim()) return;

        const newFile: FileNode = {
            name: fileName,
            type: 'file',
            content: `# ${fileName}\n`
        };

        setFileSystem(prev => [...prev, newFile]);
        setCurrentFile(fileName);
        setCode(newFile.content || '');
    };

    const switchFile = (fileName: string) => {
        const file = fileSystem.find(f => f.name === fileName);
        if (file && file.type === 'file') {
            setCurrentFile(fileName);
            setCode(file.content || '');
        }
    };

    const updateFileContent = (fileName: string, content: string) => {
        setFileSystem(prev =>
            prev.map(file =>
                file.name === fileName
                    ? { ...file, content }
                    : file
            )
        );
    };

    // Update file content when code changes
    useEffect(() => {
        if (enableFileSystem && currentFile) {
            updateFileContent(currentFile, code);
        }
    }, [code, currentFile, enableFileSystem]);

    const runSQLCode = () => {
        if (!db) {
            setOutput('⏳ SQLite is still loading, please wait...\n');
            return;
        }

        setIsRunning(true);
        setOutput('🔄 Executing SQL...\n');

        try {
            const statements = code.split(';').filter(s => s.trim());
            let outputText = '';

            statements.forEach((statement, index) => {
                if (!statement.trim()) return;

                try {
                    const results = db.exec(statement);

                    if (results.length > 0) {
                        results.forEach((result: any) => {
                            const { columns, values } = result;

                            outputText += `\n📊 Query ${index + 1} Results:\n`;
                            outputText += '─'.repeat(60) + '\n';

                            // Header
                            outputText += columns.join(' | ') + '\n';
                            outputText += '─'.repeat(60) + '\n';

                            // Rows
                            if (values.length === 0) {
                                outputText += '(No rows returned)\n';
                            } else {
                                values.forEach((row: any[]) => {
                                    outputText += row.join(' | ') + '\n';
                                });
                            }

                            outputText += `\n✅ ${values.length} row(s) returned\n`;
                        });
                    } else {
                        outputText += `\n✅ Statement ${index + 1} executed successfully\n`;
                    }
                } catch (err: any) {
                    outputText += `\n❌ Error in statement ${index + 1}:\n${err.message}\n`;
                }
            });

            setOutput(outputText || '✅ SQL executed successfully');
        } catch (error: any) {
            setOutput(`❌ Error:\n${error.message || error}`);
        } finally {
            setIsRunning(false);
        }
    };

    const runCode = () => {
        if (language === 'python') {
            runPythonCode();
        } else {
            runSQLCode();
        }
    };

    const resetCode = () => {
        setCode(initialCode);
        setOutput('');
    };

    const clearOutput = () => {
        setOutput('');
    };

    return (
        <div className="mb-8 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-[#161b22]">
            {/* Header */}
            <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                            {title}
                        </h3>
                        {description && (
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{description}</p>
                        )}
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={resetCode}
                            className="px-3 py-1.5 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                        >
                            ↺ Reset
                        </button>
                        <button
                            onClick={clearOutput}
                            className="px-3 py-1.5 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                        >
                            🗑️ Clear Output
                        </button>
                        <button
                            onClick={runCode}
                            disabled={isRunning || (language === 'python' && !pyodide) || (language === 'sql' && !db)}
                            className="px-4 py-1.5 text-sm bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold"
                        >
                            {isRunning ? '⏳ Running...' : '▶ Run Code'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Package Installer (Python only) */}
            {enablePackageInstall && language === 'python' && pyodide && (
                <div className="bg-blue-50 dark:bg-blue-900/20 px-4 py-3 border-b border-blue-200 dark:border-blue-800">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">📦 Install Package:</span>
                        <input
                            type="text"
                            value={packageToInstall}
                            onChange={(e) => setPackageToInstall(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && installPackage()}
                            placeholder="e.g., flask, requests, numpy"
                            className="flex-1 px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                            disabled={isInstalling}
                        />
                        <button
                            onClick={installPackage}
                            disabled={isInstalling || !packageToInstall.trim()}
                            className="px-4 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                        >
                            {isInstalling ? '⏳ Installing...' : '+ Install'}
                        </button>
                    </div>
                    {installedPackages.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                            <span className="text-xs text-gray-600 dark:text-gray-400">Installed:</span>
                            {installedPackages.map((pkg, idx) => (
                                <span key={idx} className="px-2 py-0.5 text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded">
                                    ✓ {pkg}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Editor Area with Sidebar (VS Code style) */}
            <div className="flex border-b border-gray-200 dark:border-gray-700">
                {/* Left Sidebar - File Tree */}
                {enableFileSystem && (
                    <div className="w-56 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col">
                        {/* Sidebar Header */}
                        <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">Explorer</span>
                                <button
                                    onClick={() => {
                                        const fileName = prompt('Enter file name (e.g., models.py, config.py):');
                                        if (fileName) createNewFile(fileName);
                                    }}
                                    className="px-1.5 py-0.5 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                                    title="New File"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* File List */}
                        <div className="flex-1 overflow-y-auto py-1">
                            {fileSystem.map((file, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => file.type === 'file' && switchFile(file.name)}
                                    className={`px-3 py-1.5 text-sm cursor-pointer transition-colors flex items-center gap-2 ${currentFile === file.name
                                            ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 border-l-2 border-blue-600'
                                            : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                                        }`}
                                >
                                    <span className="text-base">{file.type === 'file' ? '📄' : '📁'}</span>
                                    <span className="truncate">{file.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Right Side - Editor */}
                <div className="flex-1 flex flex-col">
                    {/* File Tab */}
                    {enableFileSystem && (
                        <div className="bg-gray-100 dark:bg-gray-800 px-4 py-1.5 border-b border-gray-200 dark:border-gray-700 flex items-center gap-2">
                            <span className="text-base">📄</span>
                            <span className="text-xs font-semibold text-gray-800 dark:text-gray-200">{currentFile}</span>
                        </div>
                    )}

                    {/* Code Editor */}
                    <div className="flex-1">
                        <Editor
                            height={height}
                            language={language}
                            value={code}
                            onChange={(value) => setCode(value || '')}
                            theme="vs-dark"
                            options={{
                                minimap: { enabled: false },
                                fontSize: 14,
                                lineNumbers: 'on',
                                scrollBeyondLastLine: false,
                                automaticLayout: true,
                                tabSize: 2,
                                wordWrap: 'on',
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Output Panel */}
            <div className="bg-gray-900 text-green-400 p-4 font-mono text-sm overflow-auto max-h-64">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-500 text-xs">OUTPUT:</span>
                </div>
                <pre ref={outputRef} className="whitespace-pre-wrap">
                    {output || 'Click "Run Code" to see output here...'}
                </pre>
            </div>

            {/* Expected Output (if provided) */}
            {expectedOutput && (
                <div className="bg-blue-50 dark:bg-blue-900/20 border-t border-blue-200 dark:border-blue-800 p-4">
                    <div className="text-sm">
                        <span className="font-semibold text-blue-700 dark:text-blue-400">💡 Expected Output:</span>
                        <pre className="mt-2 text-gray-700 dark:text-gray-300 font-mono text-xs whitespace-pre-wrap">
                            {expectedOutput}
                        </pre>
                    </div>
                </div>
            )}
        </div>
    );
}

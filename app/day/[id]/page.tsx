"use client";
import React, { use, useState, useEffect } from 'react';
import Link from 'next/link';
import Day1Content from '../components/Day1Content';
import Day2Content from '../components/Day2Content';

interface PageProps {
    params: Promise<{ id: string }>;
}

const DayChallenge: React.FC<PageProps> = ({ params }) => {
    const resolvedParams = use(params);
    const dayId = parseInt(resolvedParams.id);
    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' || 'dark';
            if (savedTheme === 'dark') {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
            return savedTheme;
        }
        return 'dark';
    });

    useEffect(() => {
        // Listen for theme changes from other pages/tabs
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'theme' && e.newValue) {
                const newTheme = e.newValue as 'light' | 'dark';
                setTheme(newTheme);
                if (newTheme === 'dark') {
                    document.documentElement.classList.add('dark');
                } else {
                    document.documentElement.classList.remove('dark');
                }
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);

        // Update DOM immediately
        const root = document.documentElement;
        if (newTheme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }

        // Trigger storage event for other tabs
        window.dispatchEvent(new StorageEvent('storage', {
            key: 'theme',
            newValue: newTheme,
            oldValue: theme,
        }));
    };

    // Day 1 Content
    if (dayId === 1) {
        return <Day1Content theme={theme} toggleTheme={toggleTheme} />;
    }

    // Day 2 Content
    if (dayId === 2) {
        return <Day2Content theme={theme} toggleTheme={toggleTheme} />;
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
};

export default DayChallenge;

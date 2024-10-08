import { AppContext } from "@/context/AppContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import Avatar from 'react-avatar';

export default function Sidebar() {
    const router = useRouter();
    const isActive = (href: string) => router.pathname === href;

    // Access user from AppContext
    const { isSidebarCollapsed, toggleSidebar, selectedIndustry, user } = useContext(AppContext) || {};

    // Check if user is logged in
    const isUserLoggedIn = !!user;  // true if user is logged in, false otherwise

    return (
        <aside className={`bg-gray-800 text-white p-4 transition-width duration-300 ${isSidebarCollapsed ? "w-16" : "w-64"}`}>
            <button onClick={toggleSidebar} className="mb-4">
                {isSidebarCollapsed ? "Expand" : "Collapse"}
            </button>
            {/* Show user details only if the user is logged in */}
            {!isSidebarCollapsed && isUserLoggedIn && (
                <div className="mb-4 text-center">
                    <Avatar src={user?.photoURL || ''} size="50" round={true} alt="User Avatar" />
                    <h2 className="mt-2 text-lg font-bold">Welcome Back</h2>
                    <p className="text-sm">{user?.displayName || ''}</p>
                    <p className="text-xs text-gray-400">{user?.email || ''}</p>
                </div>
            )}


            {/* Disable menu if user is not logged in */}
            <nav className={`${!isUserLoggedIn ? 'pointer-events-none opacity-50' : ''}`}>
                <ul>
                    <li>
                        <Link legacyBehavior href="/">
                            <a className={isActive("/") ? "bg-blue-700" : ""}>Home</a>
                        </Link>
                    </li>

                    {/* Conditional rendering based on industry */}
                    {selectedIndustry === "IT" && (
                        <>
                            <li>
                                <details>
                                    <summary className="cursor-pointer">Practice</summary>
                                    <ul className="ml-4">
                                        <li><Link legacyBehavior href="/it/practice/coding-challenge"><a className={isActive("/it/practice/coding-challenges") ? "bg-blue-500" : ""}>Coding Challenges</a></Link></li>
                                        <li><Link legacyBehavior href="/it/practice/system-design"><a className={isActive("/it/practice/system-design") ? "bg-blue-500" : ""}>System Design</a></Link></li>
                                        <li><Link legacyBehavior href="/practice/quiz-mode"><a className={isActive("/practice/quiz-mode") ? "bg-blue-500" : ""}>Quiz Mode</a></Link></li>
                                        <li><Link legacyBehavior href="/practice/mock-interview-challenges"><a className={isActive("/practice/mock-interview-challenges") ? "bg-blue-500" : ""}>Mock Interview Challenges</a></Link></li>
                                        <li><Link legacyBehavior href="/practice/code-refactor-challenges"><a className={isActive("/practice/code-refactor-challenges") ? "bg-blue-500" : ""}>Code Refactor Challenges</a></Link></li>
                                    </ul>
                                </details>
                            </li>
                            <li>
                                <details>
                                    <summary className="cursor-pointer">AI Mock Interview</summary>
                                    <ul className="ml-4">
                                        <li><Link legacyBehavior href="/ai-mock-interview/coding-interview"><a className={isActive("/ai-mock-interview/coding-interview") ? "bg-blue-500" : ""}>Coding Interview</a></Link></li>
                                        <li><Link legacyBehavior href="/ai-mock-interview/system-design-interview"><a className={isActive("/ai-mock-interview/system-design-interview") ? "bg-blue-500" : ""}>System Design Interview</a></Link></li>
                                        <li><Link legacyBehavior href="/ai-mock-interview/behavioral-interview"><a className={isActive("/ai-mock-interview/behavioral-interview") ? "bg-blue-500" : ""}>Behavioral Interview</a></Link></li>
                                    </ul>
                                </details>
                            </li>
                            <li>
                                <details>
                                    <summary className="cursor-pointer">Learning Paths</summary>
                                    <ul className="ml-4">
                                        <li><Link legacyBehavior href="/learning-paths/roadmaps-by-role"><a className={isActive("/learning-paths/roadmaps-by-role") ? "bg-blue-500" : ""}>Roadmaps by Role</a></Link></li>
                                        <li><Link legacyBehavior href="/learning-paths/tech-roadmaps"><a className={isActive("/learning-paths/tech-roadmaps") ? "bg-blue-500" : ""}>Technology-Specific Roadmaps</a></Link></li>
                                        <li><Link legacyBehavior href="/learning-paths/personalized-learning-path"><a className={isActive("/learning-paths/personalized-learning-path") ? "bg-blue-500" : ""}>Personalized Learning Path</a></Link></li>
                                    </ul>
                                </details>
                            </li>
                        </>
                    )}

                    <li>
                        <details>
                            <summary className="cursor-pointer">Company-Specific Prep</summary>
                            <ul className="ml-4">
                                <li><Link legacyBehavior href="/company-specific-prep/interview-questions-by-company"><a className={isActive("/company-specific-prep/interview-questions-by-company") ? "bg-blue-500" : ""}>Interview Questions by Company</a></Link></li>
                                <li><Link legacyBehavior href="/company-specific-prep/interview-insights-by-role"><a className={isActive("/company-specific-prep/interview-insights-by-role") ? "bg-blue-500" : ""}>Interview Insights by Role</a></Link></li>
                                <li><Link legacyBehavior href="/company-specific-prep/mock-interviews-by-company"><a className={isActive("/company-specific-prep/mock-interviews-by-company") ? "bg-blue-500" : ""}>Mock Interviews by Company</a></Link></li>
                            </ul>
                        </details>
                    </li>

                    <li>
                        <details>
                            <summary className="cursor-pointer">Code Playground</summary>
                            <ul className="ml-4">
                                <li><a href="#">Integrated Code Editor</a></li>
                                <li><a href="#">Collaboration Mode</a></li>
                            </ul>
                        </details>
                    </li>

                    <li>
                        <details>
                            <summary className="cursor-pointer">Community</summary>
                            <ul className="ml-4">
                                <li><Link legacyBehavior href="#"><a>Discussion Forum</a></Link></li>
                                <li><Link legacyBehavior href="#"><a>Mentorship Program</a></Link></li>
                                <li><Link legacyBehavior href="#"><a>User-Generated Questions</a></Link></li>
                            </ul>
                        </details>
                    </li>

                    <li>
                        <details>
                            <summary className="cursor-pointer">Job Prep Tools</summary>
                            <ul className="ml-4">
                                <li><Link legacyBehavior href="#"><a>ATS Scanner</a></Link></li>
                                <li><Link legacyBehavior href="#"><a>AI Cover Letter</a></Link></li>
                                <li><Link legacyBehavior href="#"><a>Auto Apply</a></Link></li>
                                <li><Link legacyBehavior href="#"><a>Resume Builder</a></Link></li>
                                <li><Link legacyBehavior href="#"><a>Portfolio Builder</a></Link></li>
                                <li><Link legacyBehavior href="#"><a>Job Search</a></Link></li>
                                <li><Link legacyBehavior href="#"><a>Company Research Tool</a></Link></li>
                                <li><Link legacyBehavior href="#"><a>Linkedin Auto Network</a></Link></li>
                                <li><Link legacyBehavior href="#"><a>Resume Keyword Analyzer</a></Link></li>
                                <li><Link legacyBehavior href="#"><a>Job Application Tracker</a></Link></li>
                            </ul>
                        </details>
                    </li>

                    <li>
                        <details>
                            <summary className="cursor-pointer">Profile</summary>
                            <ul className="ml-4">
                                <li><Link legacyBehavior href="#"><a>Dashboard</a></Link></li>
                                <li><Link legacyBehavior href="#"><a>Analytics</a></Link></li>
                                <li><Link legacyBehavior href="#"><a>Bookmarks</a></Link></li>
                                <li><Link legacyBehavior href="#"><a>Completed Quizzes & Challenges</a></Link></li>
                                <li><Link legacyBehavior href="#"><a>Settings</a></Link></li>
                            </ul>
                        </details>
                    </li>

                    <li>
                        <Link legacyBehavior href="/about">
                            <a>About</a>
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}

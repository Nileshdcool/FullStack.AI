import Link from "next/link";

interface SidebarProps {
    toggleSidebar: () => void;
    isCollapsed: boolean;
    selectedIndustry: string;
}

export default function Sidebar({ toggleSidebar, isCollapsed, selectedIndustry }: SidebarProps) {
    return (
        <aside className={`bg-gray-800 text-white p-4 transition-width duration-300 ${isCollapsed ? "w-16" : "w-64"}`}>
        <button onClick={toggleSidebar} className="mb-4">
            {isCollapsed ? "Expand" : "Collapse"}
        </button>
        <nav>
            <ul>
                <li>
                    <Link legacyBehavior href="/">
                        <a>Home</a>
                    </Link>
                </li>
                {selectedIndustry === "IT" && (
                    <>
                    <li>
                    <details>
                        <summary className="cursor-pointer">Practice</summary>
                        <ul className="ml-4">
                            <li><Link legacyBehavior href="/practice/coding-challenges"><a>Coding Challenges</a></Link></li>
                            <li><Link legacyBehavior href="/practice/system-design"><a>System Design</a></Link></li>
                            <li><Link legacyBehavior href="/practice/quiz-mode"><a>Quiz Mode</a></Link></li>
                            <li><Link legacyBehavior href="/practice/mock-interview-challenges"><a>Mock Interview Challenges</a></Link></li>
                            <li><Link legacyBehavior href="/practice/code-refactor-challenges"><a>Code Refactor Challenges</a></Link></li>
                        </ul>
                    </details>
                </li>
                <li>
                    <details>
                        <summary className="cursor-pointer">AI Mock Interview</summary>
                        <ul className="ml-4">
                            <li><Link legacyBehavior href="/ai-mock-interview/coding-interview"><a>Coding Interview</a></Link></li>
                            <li><Link legacyBehavior href="/ai-mock-interview/system-design-interview"><a>System Design Interview</a></Link></li>
                            <li><Link legacyBehavior href="/ai-mock-interview/behavioral-interview"><a>Behavioral Interview</a></Link></li>
                        </ul>
                    </details>
                </li>
                <li>
                    <details>
                        <summary className="cursor-pointer">Learning Paths</summary>
                        <ul className="ml-4">
                            <li><Link legacyBehavior href="/learning-paths/roadmaps-by-role"><a>Roadmaps by Role</a></Link></li>
                            <li><Link legacyBehavior href="/learning-paths/technology-specific-roadmaps"><a>Technology-Specific Roadmaps</a></Link></li>
                            <li><Link legacyBehavior href="/learning-paths/personalized-learning-path"><a>Personalized Learning Path</a></Link></li>
                        </ul>
                    </details>
                </li>
                    </>
                )}
                <li>
                    <details>
                        <summary className="cursor-pointer">Company-Specific Prep</summary>
                        <ul className="ml-4">
                            <li><Link legacyBehavior href="/company-specific-prep/interview-questions-by-company"><a>Interview Questions by Company</a></Link></li>
                            <li><Link legacyBehavior href="/company-specific-prep/interview-insights-by-role"><a>Interview Insights by Role</a></Link></li>
                            <li><Link legacyBehavior href="/company-specific-prep/mock-interviews-by-company"><a>Mock Interviews by Company</a></Link></li>
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
                            <li><Link legacyBehavior href="#"><a>Resume Builder</a></Link></li>
                            <li><Link legacyBehavior href="#"><a>Portfolio Builder</a></Link></li>
                            <li><Link legacyBehavior href="#"><a>Job Search</a></Link></li>
                            <li><Link legacyBehavior href="#"><a>Company Research Tool</a></Link></li>
                        </ul>
                    </details>
                </li>
                <li>
                    <details>
                        <summary className="cursor-pointer">Profile</summary>
                        <ul className="ml-4">
                            <li><Link legacyBehavior href="#"><a>Dashboard</a></Link></li>
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
    )
}
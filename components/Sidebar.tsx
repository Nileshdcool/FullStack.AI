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
                    <Link legacyBehavior href="/ai-mock-interview">
                        <a>AI Mock Interview</a>
                    </Link>
                </li>
                <li>
                    <Link legacyBehavior href="/learning-paths">
                        <a>Learning Paths</a>
                    </Link>
                </li>
                    </>
                )}
                <li>
                    <Link legacyBehavior href="/company-specific-prep">
                        <a>Company-Specific Prep</a>
                    </Link>
                </li>
                <li>
                    <Link legacyBehavior href="/code-playground">
                        <a>Code Playground</a>
                    </Link>
                </li>
                <li>
                    <Link legacyBehavior href="/community">
                        <a>Community</a>
                    </Link>
                </li>
                <li>
                    <Link legacyBehavior href="/job-prep-tools">
                        <a>Job Prep Tools</a>
                    </Link>
                </li>
                <li>
                    <Link legacyBehavior href="/profile">
                        <a>Profile</a>
                    </Link>
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
import Link from "next/link";
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white p-4">
                    <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <h2 className="text-xl font-bold mb-2">Community</h2>
                            <div className="flex space-x-4">
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                    <FaFacebook className="text-white" />
                                </a>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                    <FaTwitter className="text-white" />
                                </a>
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                                    <FaLinkedin className="text-white" />
                                </a>
                                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                                    <FaGithub className="text-white" />
                                </a>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold mb-2">Sitemap</h2>
                            <ul>
                                <li><Link legacyBehavior href="/"><a>Home</a></Link></li>
                                <li><Link legacyBehavior href="/practice"><a>Practice</a></Link></li>
                                <li><Link legacyBehavior href="/ai-mock-interview"><a>AI Mock Interview</a></Link></li>
                                <li><Link legacyBehavior href="/learning-paths"><a>Learning Paths</a></Link></li>
                                <li><Link legacyBehavior href="/company-specific-prep"><a>Company-Specific Prep</a></Link></li>
                                <li><Link legacyBehavior href="/code-playground"><a>Code Playground</a></Link></li>
                                <li><Link legacyBehavior href="/community"><a>Community</a></Link></li>
                                <li><Link legacyBehavior href="/job-prep-tools"><a>Job Prep Tools</a></Link></li>
                                <li><Link legacyBehavior href="/profile"><a>Profile</a></Link></li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold mb-2">Contact Us</h2>
                            <p>Email: support@fullstack.ai</p>
                            <p>Phone: +1 234 567 890</p>
                            <p>Address: 123 AI Street, Tech City, USA</p>
                        </div>
                    </div>
                    <div className="text-center mt-4">
                        &copy; 2023 FullStack.AI
                    </div>
                </footer>
    )
}
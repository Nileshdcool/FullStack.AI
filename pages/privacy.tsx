import Link from 'next/link';

export default function PrivacyPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <h1 className="text-5xl font-extrabold text-gray-800 mb-6">Privacy Policy</h1>
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl">
            <p className="text-lg text-gray-700 mb-4">
                Your privacy is important to us. This privacy policy explains what personal data we collect and how we use it.
            </p>
            <p className="text-lg text-gray-700 mb-4">
                We collect data to provide better services to our users. We collect information in the following ways:
            </p>
            <ul className="text-lg text-gray-700 list-disc list-inside mb-4">
                <li>Information you give us.</li>
                <li>Information we get from your use of our services.</li>
            </ul>
            <p className="text-lg text-gray-700 mb-4">
                We use the information we collect to provide, maintain, protect, and improve our services, to develop new ones, and to protect our users.
            </p>
            <Link legacyBehavior href="/">
                <a className="mt-6 px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 inline-block">
                Go back home
                </a>
            </Link>
            </div>
        </div>
    );
}
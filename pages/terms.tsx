import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-5xl font-extrabold text-gray-800 mb-6">Terms of Service</h1>
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl">
        <p className="text-lg text-gray-700 mb-4">
          Welcome to Elevar.AI. These terms and conditions outline the rules and regulations for the use of our website.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          By accessing this website we assume you accept these terms and conditions. Do not continue to use Elevar.AI if you do not agree to all of the terms and conditions stated on this page.
        </p>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">License</h2>
        <p className="text-lg text-gray-700 mb-4">
          Unless otherwise stated, Elevar.AI and/or its licensors own the intellectual property rights for all material on Elevar.AI. All intellectual property rights are reserved. You may access this from Elevar.AI for your own personal use subjected to restrictions set in these terms and conditions.
        </p>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">User Comments</h2>
        <p className="text-lg text-gray-700 mb-4">
          Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. Elevar.AI does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of Elevar.AI, its agents, and/or affiliates. Comments reflect the views and opinions of the person who posts their views and opinions.
        </p>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Hyperlinking to our Content</h2>
        <p className="text-lg text-gray-700 mb-4">
          The following organizations may link to our Website without prior written approval:
        </p>
        <ul className="text-lg text-gray-700 list-disc list-inside mb-4">
          <li>Government agencies;</li>
          <li>Search engines;</li>
          <li>News organizations;</li>
          <li>Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites of other listed businesses;</li>
          <li>System-wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups which may not hyperlink to our Web site.</li>
        </ul>
        <p className="text-lg text-gray-700 mb-4">
          These organizations may link to our home page, to publications, or to other Website information so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement, or approval of the linking party and its products and/or services; and (c) fits within the context of the linking party’s site.
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
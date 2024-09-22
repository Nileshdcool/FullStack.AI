export function FinanceContent() {
    const financeTechNames = [
        'Blockchain', 'Cryptocurrency', 'Algorithmic Trading', 'Risk Management'
    ];

    const qaList = [
        { question: "What is Blockchain?", answer: "Blockchain is a distributed ledger technology that allows data to be stored globally on thousands of servers." },
        { question: "What is Cryptocurrency?", answer: "Cryptocurrency is a digital or virtual currency that uses cryptography for security and operates independently of a central bank." },
        { question: "What is Algorithmic Trading?", answer: "Algorithmic trading is the use of algorithms to automate trading strategies in financial markets." },
        { question: "What is Risk Management?", answer: "Risk management involves identifying, assessing, and prioritizing risks followed by coordinated efforts to minimize, monitor, and control the probability or impact of unfortunate events." }
    ];

    return (
        <section className="my-8">
            <h2 className="text-2xl font-bold mb-4">Finance Technologies</h2>
            <div className="flex flex-wrap">
                {financeTechNames.map((tech) => (
                    <span
                        key={tech}
                        className="bg-blue-200 text-blue-800 px-2 py-1 m-1 rounded-full cursor-pointer hover:bg-blue-300"
                        onClick={() => alert(`Clicked on ${tech}`)}
                    >
                        {tech}
                    </span>
                ))}
            </div>
            <section className="my-8">
                <h2 className="text-2xl font-bold mb-4">Questions & Answers</h2>
                <div className="space-y-4">
                    {qaList.map((qa, index) => (
                        <details key={index} className="bg-gray-100 p-4 rounded shadow-md">
                            <summary className="cursor-pointer font-semibold">{qa.question}</summary>
                            <p className="mt-2">{qa.answer}</p>
                        </details>
                    ))}
                </div>
            </section>
        </section>
    );
}
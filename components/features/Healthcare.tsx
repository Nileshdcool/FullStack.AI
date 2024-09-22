export function HealthcareContent({}) {
    const healthcareTechNames = [
        'Electronic Health Records', 'Telemedicine', 'Medical Imaging', 'Health Information Exchange'
    ];

    const qaList = [
        { question: "What is Electronic Health Records?", answer: "Electronic Health Records (EHR) are digital versions of patients' paper charts." },
        { question: "What is Telemedicine?", answer: "Telemedicine allows healthcare professionals to evaluate, diagnose, and treat patients at a distance using telecommunications technology." },
        { question: "What is Medical Imaging?", answer: "Medical Imaging is the technique and process of creating visual representations of the interior of a body for clinical analysis and medical intervention." },
        { question: "What is Health Information Exchange?", answer: "Health Information Exchange (HIE) is the electronic movement of health-related information among organizations according to nationally recognized standards." }
    ];

    return (
        <section className="my-8">
            <h2 className="text-2xl font-bold mb-4">Healthcare Technologies</h2>
            <div className="flex flex-wrap">
                {healthcareTechNames.map((tech) => (
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
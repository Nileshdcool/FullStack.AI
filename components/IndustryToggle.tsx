interface IndustryToggleProps {
    selectedIndustry: string;
    setSelectedIndustry: (industry: string) => void;
    handleIndustryChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function IndustryButtonToggle({ selectedIndustry, setSelectedIndustry }: IndustryToggleProps) {
    return (
        <div className="flex justify-center my-4 space-x-2">
            <button
            className={`px-4 py-2 rounded-full transition duration-300 ease-in-out transform hover:scale-105 ${selectedIndustry === "IT" ? "bg-blue-500 text-white" : "bg-blue-200 text-blue-700"}`}
            onClick={() => setSelectedIndustry("IT")}
            >
            IT
            </button>
            <button
            className={`px-4 py-2 rounded-full transition duration-300 ease-in-out transform hover:scale-105 ${selectedIndustry === "Healthcare" ? "bg-green-500 text-white" : "bg-green-200 text-green-700"}`}
            onClick={() => setSelectedIndustry("Healthcare")}
            >
            Healthcare
            </button>
            <button
            className={`px-4 py-2 rounded-full transition duration-300 ease-in-out transform hover:scale-105 ${selectedIndustry === "Finance" ? "bg-yellow-500 text-white" : "bg-yellow-200 text-yellow-700"}`}
            onClick={() => setSelectedIndustry("Finance")}
            >
            Finance
            </button>
        </div>
    );
}


export function IndustrySelectToggle({ selectedIndustry, handleIndustryChange }: IndustryToggleProps) {
    return (
        <div className="mb-4">
          <label htmlFor="industry-select" className="block text-lg font-medium mb-2 text-blue-600">Select Industry:</label>
          <select
            id="industry-select"
            onChange={handleIndustryChange}
            value={selectedIndustry}
            className="p-2 border-2 border-blue-500 rounded w-full bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
          >
            <option value="IT">IT</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Finance">Finance</option>
          </select>
        </div>
    );
}
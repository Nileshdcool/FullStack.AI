import { AppContext } from "@/context/AppContext";
import { useContext } from "react";



export function IndustryButtonToggle() {
    const { handleIndustryChange, selectedIndustry } = useContext(AppContext) || {};
    return (
        <div className="flex justify-center my-4 space-x-2">
            <button
            className={`px-4 py-2 rounded-full transition duration-300 ease-in-out transform hover:scale-105 ${selectedIndustry === "IT" ? "bg-blue-500 text-white" : "bg-blue-200 text-blue-700"}`}
            onClick={() => handleIndustryChange && handleIndustryChange("IT")}
            >
            IT
            </button>
            <button
            className={`px-4 py-2 rounded-full transition duration-300 ease-in-out transform hover:scale-105 ${selectedIndustry === "Healthcare" ? "bg-green-500 text-white" : "bg-green-200 text-green-700"}`}
            onClick={() => handleIndustryChange && handleIndustryChange("Healthcare")}
            >
            Healthcare
            </button>
            <button
            className={`px-4 py-2 rounded-full transition duration-300 ease-in-out transform hover:scale-105 ${selectedIndustry === "Finance" ? "bg-yellow-500 text-white" : "bg-yellow-200 text-yellow-700"}`}
            onClick={() => handleIndustryChange && handleIndustryChange("Finance")}
            >
            Finance
            </button>
            <button
            className={`px-4 py-2 rounded-full transition duration-300 ease-in-out transform hover:scale-105 ${selectedIndustry === "Education" ? "bg-purple-500 text-white" : "bg-purple-200 text-purple-700"}`}
            onClick={() => handleIndustryChange && handleIndustryChange("Education")}
            >
            Education
            </button>
            <button
            className={`px-4 py-2 rounded-full transition duration-300 ease-in-out transform hover:scale-105 ${selectedIndustry === "Manufacturing" ? "bg-red-500 text-white" : "bg-red-200 text-red-700"}`}
            onClick={() => handleIndustryChange && handleIndustryChange("Manufacturing")}
            >
            Manufacturing
            </button>
        </div>
    );
}


export function IndustrySelectToggle() {
    const { selectedIndustry } = useContext(AppContext) || {};
    return (
        <div className="mb-4">
          <label htmlFor="industry-select" className="block text-lg font-medium mb-2 text-blue-600">Select Industry:</label>
          <select
            id="industry-select"
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
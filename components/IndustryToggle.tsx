import { AppContext } from "@/context/AppContext";
import { useContext } from "react";

interface Industry {
  id: number;
  Name: string;
}

interface IndustryButtonToggleProps {
  industries: Industry[];
  selectedIndustry: string;
  onChange: (industryId: string) => void; // Prop for handling industry change
}

export function IndustryButtonToggle({
  industries,
  selectedIndustry,
  onChange,
}: IndustryButtonToggleProps) {
  return (
    <div className="flex justify-center my-4 space-x-2">
      {industries.map((industry) => (
        <button
          key={industry.id}
          className={`px-4 py-2 rounded-full transition duration-300 ease-in-out transform hover:scale-105 ${
            selectedIndustry === industry.Name
              ? "bg-blue-500 text-white"
              : "bg-blue-200 text-blue-700"
          }`}
          onClick={() => onChange(industry.Name)} // Use the passed onChange function
        >
          {industry.Name}
        </button>
      ))}
    </div>
  );
}


interface Industry {
  id: number;
  Name: string;
}

interface IndustryButtonToggleProps {
  industries: Industry[];
  selectedIndustry: string;
  onChange: (industryId: string) => void;
}

function getRandomColor() {
  const colors = [
    "bg-blue-200 text-blue-700",
    "bg-green-200 text-green-700",
    "bg-yellow-200 text-yellow-700",
    "bg-purple-200 text-purple-700",
    "bg-red-200 text-red-700",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

export function IndustryButtonToggle({
  industries,
  selectedIndustry,
  onChange,
}: IndustryButtonToggleProps) {
  return (
    <div className="flex justify-center my-4 space-x-2">
      {industries.map((industry) => {
        const bgColor = selectedIndustry === industry.Name ? "bg-blue-500 text-white" : getRandomColor();
        return (
          <button
            key={industry.id}
            className={`px-4 py-2 rounded-full transition duration-300 ease-in-out transform hover:scale-105 ${bgColor}`}
            onClick={() => onChange(industry.Name)}
          >
            {industry.Name}
          </button>
        );
      })}
    </div>
  );
}

import { SetStateAction, useState } from "react";
import { ITContent } from "../components/features/ITContent";
import { HealthcareContent } from "@/components/features/Healthcare";
import { FinanceContent } from "@/components/features/Finance";
import { IndustryButtonToggle } from "@/components/IndustryToggle";

export default function Home() {
  const [activeTab, setActiveTab] = useState('Full-Stack, Web & Mobile');
  const [selectedIndustry, setSelectedIndustry] = useState('IT');

  const handleIndustryChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setSelectedIndustry(event.target.value);
  }

  return (
    <div className="container mx-auto p-4">
      <section className="text-center my-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to FullStack.AI</h1>
        <p className="text-lg mb-4">
          Discover a wealth of knowledge and resources to help you succeed in your career.
        </p>
          <IndustryButtonToggle selectedIndustry={selectedIndustry}
          handleIndustryChange={handleIndustryChange}
          setSelectedIndustry={setSelectedIndustry} />
      </section>
      {selectedIndustry === 'IT' && (
        <ITContent activeTab={activeTab} setActiveTab={setActiveTab} />
      )}
      {selectedIndustry === 'Healthcare' && (
        <HealthcareContent />
      )}
      {selectedIndustry === 'Finance' && (
        <FinanceContent />
      )}
    </div>
  );
}
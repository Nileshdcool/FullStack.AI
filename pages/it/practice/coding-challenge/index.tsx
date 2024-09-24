import React from 'react';

const CodingChallengePage: React.FC = () => {
  const challenges = [
    {
      title: 'Challenge 1: Reverse a String',
      description: 'Write a function that reverses a string.',
      difficulty: 'Beginner',
    },
    {
      title: 'Challenge 2: FizzBuzz',
      description: 'Write a function that prints the numbers from 1 to 100. But for multiples of three, print "Fizz" instead of the number, and for the multiples of five, print "Buzz". For numbers which are multiples of both three and five, print "FizzBuzz".',
      difficulty: 'Intermediate',
    },
    {
      title: 'Challenge 3: Merge Sort',
      description: 'Implement the merge sort algorithm.',
      difficulty: 'Advanced',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <header className="bg-blue-600 w-full py-4 text-white text-center">
        <h1 className="text-3xl font-bold">Coding Challenges</h1>
      </header>
      <main className="flex-grow container mx-auto p-4">
        <section className="my-8">
          <h2 className="text-2xl font-semibold mb-4">Available Challenges</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.map((challenge, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2">{challenge.title}</h3>
                <p className="text-gray-700 mb-4">{challenge.description}</p>
                <span className={`text-sm px-2 py-1 rounded ${challenge.difficulty === 'Beginner' ? 'bg-green-500 text-white' : challenge.difficulty === 'Intermediate' ? 'bg-yellow-500 text-white' : 'bg-red-500 text-white'}`}>
                  {challenge.difficulty}
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer className="bg-gray-800 w-full py-4 text-white text-center">
        <p>&copy; 2023 Elevar.AI. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default CodingChallengePage;
import ExampleComponent from "@/components/ReduxExample";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
        <section className="text-center my-8">
          <h1 className="text-4xl font-bold mb-4">Welcome to FullStack.AI</h1>
          <p className="text-lg mb-4">
            Discover a wealth of knowledge and resources to help you succeed in your career.
          </p>
          <button className="bg-green-500 text-white px-4 py-2 rounded">Get Started</button>
          <ExampleComponent />
        </section>

        <section className="my-8">
          <h2 className="text-2xl font-bold mb-4">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded shadow-md">
              <h3 className="text-xl font-semibold mb-2">Expert Knowledge</h3>
              <p>
                Our platform is built by industry experts to provide you with the most relevant and up-to-date information.
              </p>
            </div>
            <div className="bg-white p-4 rounded shadow-md">
              <h3 className="text-xl font-semibold mb-2">Comprehensive Resources</h3>
              <p>
                Access a wide range of resources, including articles, tutorials, and guides to help you excel in your field.
              </p>
            </div>
            <div className="bg-white p-4 rounded shadow-md">
              <h3 className="text-xl font-semibold mb-2">Community Support</h3>
              <p>
                Join a community of like-minded professionals and get support from peers and mentors.
              </p>
            </div>
          </div>
        </section>

        <section className="my-8">
          <h2 className="text-2xl font-bold mb-4">Testimonials</h2>
          <div className="bg-white p-4 rounded shadow-md">
            <p className="italic">
              “Great place to review your knowledge. Must be a go-to resource to prepare for a tough interview and get your dream job.”
            </p>
            <p className="text-right mt-2">― Tam Huynh, Senior Rails Developer, ⭐⭐⭐⭐⭐</p>
          </div>
        </section>

        <section className="my-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Join Us Today</h2>
          <p className="text-lg mb-4">
            Sign up now and unlock access to thousands of answers and resources to help you succeed.
          </p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Sign Up</button>
        </section>
      </div>
  );
}

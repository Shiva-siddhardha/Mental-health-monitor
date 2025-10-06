import React from "react";
import Navbar from "../navbar/Navbar";

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <div
        className="max-w-4xl mx-auto p-8 relative overflow-hidden"
        style={{
          background: "linear-gradient(to right, #1B2735, #0D1117)",
          borderRadius: "1.5rem",
          boxShadow: "0 4px 20px rgba(48, 76, 137, 0.3)",
          marginTop: "4rem",
          border: "1px solid #304C89",
          WebkitBackdropFilter: "blur(10px)",
          backdropFilter: "blur(10px)",
        }}
      >
        {/* Starry background overlay */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjRkZGIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgY3g9IjMiIGN5PSIzIiByPSIxIi8+PC9nPjwvc3ZnPg==')",
            opacity: "0.1",
          }}
        />

        {/* Content container */}
        <div className="relative z-10">
          <h1 
            className="text-3xl font-bold mb-8 text-center"
            style={{
              background: "linear-gradient(to right, #A5B4FC, #818CF8)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            About Us
          </h1>

          <div className="space-y-8">
            <div className="bg-[#141E33] p-6 rounded-xl border border-[#304C89] shadow-lg">
              <p className="text-lg text-[#A5B4FC] leading-relaxed">
                Welcome to our Mental Health App! Our mission is to support and empower
                individuals on their journey toward mental wellness. Whether you're
                seeking guidance, inspiration, or a safe space to explore your
                emotions, we're here for you.
              </p>
            </div>

            <div className="bg-[#141E33] p-6 rounded-xl border border-[#304C89] shadow-lg">
              <h2 className="text-2xl font-semibold mb-4" style={{
                background: "linear-gradient(to right, #A5B4FC, #818CF8)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}>
                Our Vision
              </h2>
              <p className="text-lg text-[#A5B4FC] leading-relaxed">
                Our vision is a world where mental health is prioritized, understood,
                and accessible to everyone. We aim to break the stigma surrounding
                mental health challenges and foster an environment of care, empathy,
                and connection.
              </p>
            </div>

            <div className="bg-[#141E33] p-6 rounded-xl border border-[#304C89] shadow-lg">
              <h2 className="text-2xl font-semibold mb-4" style={{
                background: "linear-gradient(to right, #A5B4FC, #818CF8)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}>
                What We Offer
              </h2>
              <ul className="list-none space-y-3 text-lg text-[#A5B4FC]">
                <li className="flex items-center">
                  <span className="mr-2">✨</span>
                  Interactive quizzes to assess your mental health
                </li>
                <li className="flex items-center">
                  <span className="mr-2">🌟</span>
                  Personalized recommendations for improvement
                </li>
                <li className="flex items-center">
                  <span className="mr-2">💫</span>
                  Resources and tools to support mental well-being
                </li>
                <li className="flex items-center">
                  <span className="mr-2">⭐</span>
                  A community that promotes positivity and growth
                </li>
              </ul>
            </div>

            <div className="bg-[#141E33] p-6 rounded-xl border border-[#304C89] shadow-lg">
              <h2 className="text-2xl font-semibold mb-4" style={{
                background: "linear-gradient(to right, #A5B4FC, #818CF8)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}>
                Contact Us
              </h2>
              <p className="text-lg text-[#A5B4FC] leading-relaxed">
                Have questions or feedback? Feel free to reach out to us at
                <span className="font-semibold" style={{
                  background: "linear-gradient(to right, #A5B4FC, #818CF8)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}> contact@mentalhealthapp.com</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
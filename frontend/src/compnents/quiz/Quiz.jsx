import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Loader from "react-js-loader";
import { useNavigate, useParams } from "react-router-dom";
import { useMentalHealth } from "../../Mentalhealthcontext/MentalHealthContext";
import Navbar from "../navbar/Navbar";
const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

const questions = [
  "How often have you felt down, depressed, or hopeless in the past two weeks?",
  "How often do you feel little interest or pleasure in doing things?",
  "How often do you feel nervous, anxious, or on edge?",
  "How often do you have trouble relaxing?",
  "How often do you feel so restless that it is hard to sit still?",
  "How often do you feel fatigued or have little energy?",
  "How often do you feel bad about yourself, or that you are a failure or have let yourself or your family down?",
  "How often do you have trouble concentrating on things, such as reading the newspaper or watching television?",
  "How often do you feel afraid, as if something awful might happen?",
  "How often do you have trouble falling or staying asleep, or sleeping too much?",
  "How often do you feel easily annoyed or irritable?",
  "How often do you experience physical symptoms such as headaches, stomachaches, or muscle pain?",
  "How often do you feel disconnected or detached from reality or your surroundings?",
  "How often do you find it difficult to control your worry?",
  "How often do you avoid social situations due to fear of being judged or embarrassed?",
];

const options = ["Not at all", "Several days", "More than half the days", "Nearly every day"];

const ScoreMeter = ({ score, navigate }) => {
  const { username } = useParams();
  
  const getScoreColor = () => {
    if (score <= 25) return 'bg-green-600';
    if (score <= 50) return 'bg-yellow-600';
    if (score <= 75) return 'bg-orange-600';
    return 'bg-red-600';
  };

  const getScoreDescription = () => {
    if (score <= 25) return 'Low Mental Health Concern';
    if (score <= 50) return 'Mild Mental Health Concern';
    if (score <= 75) return 'Moderate Mental Health Concern';
    return 'High Mental Health Concern';
  };

  return (
    <div className="mt-6 p-6 bg-[#1B2735] rounded-lg shadow-md border border-[#304C89] backdrop-blur-sm">
      <h2 className="text-xl font-semibold mb-4 text-center text-white">Mental Health Assessment Score</h2>
      <div className="w-full bg-[#141E33] rounded-full h-6 overflow-hidden mb-4 border border-[#304C89]">
        <div 
          className={`h-6 rounded-full transition-all duration-500 ease-in-out ${getScoreColor()}`}
          style={{ width: `${score}%` }}
        ></div>
      </div>
      <div className="flex justify-between text-sm text-white mb-2">
        <span>0</span>
        <span>50</span>
        <span>100</span>
      </div>
      <p className={`text-center font-bold ${getScoreColor()} text-white rounded-full py-2`}>
        {getScoreDescription()} ({score}/100)
      </p>
      <div className="mt-4 text-center">
        <button 
          onClick={() => navigate(`/${username}/music-recommendations`, { state: { score } })}
          className="bg-gradient-to-r from-[#304C89] to-[#818CF8] hover:from-[#3a5ca3] hover:to-[#8e97f9] text-white font-bold py-2 px-4 rounded-full transition-all"
        >
          View Music Recommendations
        </button>
      </div>
    </div>
  );
};

const Quiz = () => {
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hoveredOption, setHoveredOption] = useState(null);
  const [score, setScore] = useState(null);
  const navigate = useNavigate();
  const { username } = useParams();
  const { updateQuizResults } = useMentalHealth(); // Use the context

  const calculateScore = () => {
    const scoreMap = {
      "Not at all": 0,
      "Several days": 25,
      "More than half the days": 50,
      "Nearly every day": 75
    };

    const totalScore = answers.reduce((acc, answer) => {
      return acc + (scoreMap[answer] || 0);
    }, 0);

    const finalScore = Math.round((totalScore / (questions.length * 75)) * 100);
    return finalScore;
  };

  const handleChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleOptionHover = (index) => setHoveredOption(index);
  const handleOptionLeave = () => setHoveredOption(null);

  const handleSubmit = async () => {
    // Validate API key availability before proceeding
    if (!API_KEY || !genAI) {
      setResult("AI analysis is currently unavailable because the Gemini API key is not configured. Please contact the site administrator.");
      return;
    }

    const calculatedScore = calculateScore();
    setScore(calculatedScore);

    setLoading(true);
    setResult(null);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });

      const prompt = `Analyze the following mental health quiz answers and generate a short summary regarding the person's mental health and what they can do. Use points and headings, and format it neatly with paragraphs:\n\n${questions
        .map((q, i) => `${i + 1}. ${q} ${answers[i]}`)
        .join("\n")}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      let text = await response.text();

      text = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

      setResult(text);
      
      // Create a results object
      const quizResultData = {
        score: calculatedScore,
        analysis: text,
        answers: answers,
        questions: questions
      };
      
      // Save to context
      updateQuizResults(quizResultData);
      
      // IMPORTANT: Also save to localStorage for persistence
      localStorage.setItem('quizResults', JSON.stringify(quizResultData));
      
    } catch (error) {
      console.error("Error analyzing answers:", error);
      setResult("An error occurred while analyzing the answers. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const apiDisabled = !API_KEY;

  return (
    <>
      <Navbar/>
      <div className="min-h-screen bg-[#0D1117] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1B2735] via-[#090E17] to-[#0D1117]">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjRkZGIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgY3g9IjMiIGN5PSIzIiByPSIxIi8+PC9nPjwvc3ZnPg==')] opacity-20"></div>
        <div
          className="max-w-4xl mx-auto p-6 relative z-10"
          style={{
            marginTop: "6rem",
          }}
        >
          <div className="bg-[#1B2735] rounded-2xl shadow-xl border border-[#304C89] overflow-hidden backdrop-blur-sm p-8">
            <h1 className="text-2xl font-bold mb-6 text-center text-white">Mental Health Quiz</h1>

            {apiDisabled && (
              <div className="mb-6 p-4 bg-red-600 text-white rounded-md">
                AI analysis is disabled because the Gemini API key is not configured. Please set REACT_APP_GEMINI_API_KEY in your environment variables to enable AI-powered analysis.
              </div>
            )}

            {questions.map((question, index) => (
              <div key={index} className="mb-4 text-white font-bold m-12">
                <p className="mb-2 text-lg">{`${index + 1}. ${question}`}</p>
                <div className="flex flex-col space-y-2">
                  {options.map((option, optionIndex) => (
                    <label
                      key={optionIndex}
                      className={`flex items-center p-3 px-5 block cursor-pointer rounded-full border border-[#304C89] transition-all ${
                        answers[index] === option ? 'bg-[#304C89] text-white' :
                        hoveredOption === index ? "hover:bg-[#304C89] hover:text-white" : "hover:bg-[#141E33]"
                      }`}
                      onMouseEnter={() => handleOptionHover(index)}
                      onMouseLeave={handleOptionLeave}
                    >
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={option}
                        checked={answers[index] === option}
                        onChange={() => handleChange(index, option)}
                        className="accent-[#818CF8]"
                      />
                      <span className="ps-3 text-lg font-normal">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <div className="text-center">
              <button
                onClick={handleSubmit}
                disabled={loading || apiDisabled}
                className={`mt-6 px-8 py-3 rounded-full ${
                  loading 
                    ? 'bg-[#141E33] text-white' 
                    : 'bg-gradient-to-r from-[#304C89] to-[#818CF8] hover:from-[#3a5ca3] hover:to-[#8e97f9] text-white'
                } font-bold transition-all ${apiDisabled ? 'opacity-60 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Processing...' : apiDisabled ? 'AI Unavailable' : 'Submit'}
              </button>
            </div>
            
            {loading && (
              <div className="text-center mt-8">
                <div className="inline-block">
                  <Loader type="box-rectangular" bgColor={"#818CF8"} color={'#818CF8'} size={100} />
                </div>
              </div>
            )}
            
            {result && (
              <div className="mt-8 p-6 bg-[#141E33] rounded-xl border border-[#304C89] backdrop-blur-sm">
                <h2 className="text-xl font-bold mb-4 text-white">Analysis Results</h2>
                <div 
                  className="text-white space-y-4"
                  dangerouslySetInnerHTML={{ __html: result }}
                />
                {score !== null && <ScoreMeter score={score} navigate={navigate} />}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Quiz;
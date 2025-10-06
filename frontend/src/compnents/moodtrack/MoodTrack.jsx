import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dialog, Transition } from '@headlessui/react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../navbar/Navbar';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const MoodTrack = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mood, setMood] = useState(null);
  const [moodData, setMoodData] = useState([]);
  const [selectedMoodIndex, setSelectedMoodIndex] = useState(null);
  
  const username = localStorage.getItem('tokenUser');

  useEffect(() => {
    // Fetch existing mood data for the user
    axios.get(`http://localhost:5000/api/moods/${username}`)
      .then(response => setMoodData(response.data))
      .catch(error => console.error('Error fetching mood data:', error));
  }, [username]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    setIsModalOpen(true);
  };

  const handleMoodSelect = (selectedMood, index) => {
    setSelectedMoodIndex(index);
    setTimeout(() => {
      setMood(selectedMood);
      axios.post(`http://localhost:5000/api/moods/${username}`, { date: selectedDate, mood: selectedMood })
        .then(response => {
          setMoodData(prevData => [...prevData, response.data]);
          setTimeout(() => {
            setIsModalOpen(false);
            setSelectedMoodIndex(null);
          }, 500);
        })
        .catch(error => console.error('Error saving mood:', error));
    }, 300);
  };

  const moodLabels = ['😄', '😊', '😐', '😔', '😢'];
  const moodDescriptions = ['Very Happy', 'Happy', 'Neutral', 'Sad', 'Very Sad'];
  const moodColors = ['#4CAF50', '#8BC34A', '#FFC107', '#FF9800', '#F44336'];
  const moodCounts = moodLabels.map(label => moodData.filter(entry => entry.mood === label).length);

  const data = {
    labels: moodLabels.map((label, i) => `${label} ${moodDescriptions[i]}`),
    datasets: [
      {
        label: 'Mood Frequency',
        data: moodCounts,
        backgroundColor: moodColors,
        borderWidth: 0,
        borderRadius: 8,
        hoverBackgroundColor: moodColors.map(color => color + 'CC'),
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(13, 17, 23, 0.9)',
        padding: 12,
        titleFont: { size: 16 },
        bodyFont: { size: 14 },
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#304C89',
        borderWidth: 1
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(48, 76, 137, 0.2)',
        },
        ticks: {
          color: '#A5B4FC'
        }
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#A5B4FC'
        }
      },
    },
    animation: {
      duration: 1500,
      easing: 'easeInOutQuart',
    },
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#0D1117] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1B2735] via-[#090E17] to-[#0D1117]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto p-8 mt-20 relative"
          style={{ maxWidth: '900px' }}
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjRkZGIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgY3g9IjMiIGN5PSIzIiByPSIxIi8+PC9nPjwvc3ZnPg==')] opacity-20"></div>
          <motion.div
            className="bg-[#1B2735] rounded-2xl shadow-xl border border-[#304C89] overflow-hidden backdrop-blur-sm relative"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-8">
              <motion.h1
                className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-[#A5B4FC] to-[#818CF8] bg-clip-text text-transparent"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Track Your Mood
              </motion.h1>
              
              <motion.div
                className="bg-[#141E33] rounded-xl shadow-md p-6 mb-8 border border-[#304C89] backdrop-blur-sm"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <label className="block text-sm font-medium text-[#A5B4FC] mb-2">Select Date</label>
                <input
                  type="date"
                  className="w-full px-4 py-3 rounded-lg bg-[#1B2735] border-[#304C89] text-[#A5B4FC] focus:ring-2 focus:ring-[#818CF8] focus:border-transparent transition-all duration-300"
                  onChange={handleDateChange}
                />
              </motion.div>

              <AnimatePresence>
                {isModalOpen && (
                  <Dialog
                    as={motion.div}
                    className="relative z-10"
                    onClose={() => setIsModalOpen(false)}
                    open={isModalOpen}
                    static
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 bg-[#0D1117] bg-opacity-90 backdrop-blur-sm"
                    />
                    
                    <div className="fixed inset-0 overflow-y-auto">
                      <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <motion.div
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.9, opacity: 0 }}
                          className="w-full max-w-md transform overflow-hidden rounded-2xl bg-[#1B2735] p-6 text-left align-middle shadow-xl transition-all border border-[#304C89] backdrop-blur-sm"
                        >
                          <Dialog.Title as="h3" className="text-xl font-semibold leading-6 text-[#A5B4FC] mb-4">
                            How are you feeling today?
                          </Dialog.Title>
                          <div className="grid grid-cols-5 gap-4">
                            {moodLabels.map((emoji, index) => (
                              <motion.button
                                key={index}
                                className={`p-4 rounded-lg ${selectedMoodIndex === index ? 'bg-[#304C89]' : 'hover:bg-[#141E33]'} border border-[#304C89] transition-colors`}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleMoodSelect(emoji, index)}
                              >
                                <div className="text-3xl mb-2">{emoji}</div>
                                <div className="text-xs text-[#A5B4FC]">{moodDescriptions[index]}</div>
                              </motion.button>
                            ))}
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </Dialog>
                )}
              </AnimatePresence>

              <motion.div
                className="bg-[#141E33] rounded-xl shadow-md p-6 border border-[#304C89] backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <h2 className="text-2xl font-semibold text-[#A5B4FC] mb-6 text-center">Your Mood History</h2>
                <div className="h-96">
                  <Bar data={data} options={chartOptions} />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default MoodTrack;

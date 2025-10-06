import React, { useState } from 'react';
import Navbar from '../navbar/Navbar';
import './Wellness.css';
// Import your local images
import mountainPose from '../../Assets/mountain-pose.jpeg';
import warriorPose from '../../Assets/warrior-pose.jpeg';
import treePose from '../../Assets/tree-pose.jpeg';
import childPose from '../../Assets/childs-pose.jpeg';
import downwardDog from '../../Assets/downwardfacingdog-pose.jpeg';
import cobraPose from '../../Assets/cobra-pose.jpeg';
import bridgePose from '../../Assets/bridge-pose.jpeg';
import warriorOne from '../../Assets/Virabhadrasana-1-Warrior-1-pose.jpg';
import trianglePose from '../../Assets/triangle-pose.jpeg';
import catCowPose from '../../Assets/Cat-Cow-Pose.jpg';
import crowPose from '../../Assets/crow-pose.jpg';
import headstand from '../../Assets/headstand-pose.jpg';
import pigeonPose from '../../Assets/pigeion-pose.jpeg';
import camelPose from '../../Assets/camel-pose.jpeg';
import corpsePose from '../../Assets/corpse-pose.jpeg';
// Add more imports for other poses as needed

const yogaPoses = [
    {
        id: 1,
        name: 'Mountain Pose (Tadasana)',
        description: 'A foundational pose that improves posture and balance.',
        benefits: ['Improves posture', 'Strengthens thighs, knees, and ankles', 'Increases body awareness'],
        difficulty: 'Beginner',
        image: mountainPose
    },
    {
        id: 2,
        name: 'Warrior II (Virabhadrasana II)',
        description: 'A powerful standing pose that builds strength and stability.',
        benefits: ['Strengthens legs and ankles', 'Opens hips and shoulders', 'Improves focus and concentration'],
        difficulty: 'Intermediate',
        image: warriorPose
    },
    {
        id: 3,
        name: 'Tree Pose (Vrksasana)',
        description: 'A balancing pose that enhances focus and stability.',
        benefits: ['Improves balance', 'Strengthens legs and core', 'Enhances concentration'],
        difficulty: 'Beginner',
        image: treePose
    },
    {
        id: 4,
        name: 'Child\'s Pose (Balasana)',
        description: 'A gentle resting pose that promotes relaxation.',
        benefits: ['Relieves stress and anxiety', 'Stretches back and hips', 'Promotes relaxation'],
        difficulty: 'Beginner',
        image: childPose
    },
    {
        id: 5,
        name: 'Downward-Facing Dog (Adho Mukha Svanasana)',
        description: 'A rejuvenating pose that energizes the body.',
        benefits: ['Strengthens arms and legs', 'Improves circulation', 'Relieves back pain'],
        difficulty: 'Intermediate',
        image: downwardDog
    },
    {
        id: 6,
        name: 'Cobra Pose (Bhujangasana)',
        description: 'A gentle backbend that opens the chest and strengthens the spine.',
        benefits: ['Strengthens back muscles', 'Improves posture', 'Opens chest and shoulders'],
        difficulty: 'Beginner',
        image: cobraPose
    },
    {
        id: 7,
        name: 'Bridge Pose (Setu Bandhasana)',
        description: 'A gentle backbend that strengthens the back and opens the chest.',
        benefits: ['Strengthens back and glutes', 'Improves spinal flexibility', 'Relieves stress and anxiety'],
        difficulty: 'Beginner',
        image: bridgePose
    },
    {
        id: 8,
        name: 'Warrior I (Virabhadrasana I)',
        description: 'A powerful standing pose that builds strength and focus.',
        benefits: ['Strengthens legs and ankles', 'Opens hips and chest', 'Improves balance and stability'],
        difficulty: 'Intermediate',
        image: warriorOne
    },
    {
        id: 9,
        name: 'Triangle Pose (Trikonasana)',
        description: 'A standing pose that stretches the sides of the body and opens the hips.',
        benefits: ['Stretches sides of the body', 'Opens hips and shoulders', 'Improves balance'],
        difficulty: 'Intermediate',
        image: trianglePose
    },
    {
        id: 10,
        name: 'Cat-Cow Pose (Marjaryasana-Bitilasana)',
        description: 'A gentle flow that warms up the spine and improves flexibility.',
        benefits: ['Improves spinal flexibility', 'Relieves back pain', 'Enhances body awareness'],
        difficulty: 'Beginner',
        image: catCowPose
    },
    {
        id: 11,
        name: 'Crow Pose (Bakasana)',
        description: 'An arm balance that builds strength and confidence.',
        benefits: ['Strengthens arms and wrists', 'Improves balance', 'Builds core strength'],
        difficulty: 'Advanced',
        image: crowPose
    },
    {
        id: 12,
        name: 'Headstand (Sirsasana)',
        description: 'An advanced inversion that builds strength and confidence.',
        benefits: ['Improves circulation', 'Strengthens shoulders and arms', 'Enhances focus and concentration'],
        difficulty: 'Advanced',
        image: headstand
    },
    {
        id: 13,
        name: 'Pigeon Pose (Eka Pada Rajakapotasana)',
        description: 'A hip-opening pose that releases tension and improves flexibility.',
        benefits: ['Opens hips', 'Relieves lower back pain', 'Improves hip mobility'],
        difficulty: 'Intermediate',
        image: pigeonPose
    },
    {
        id: 14,
        name: 'Camel Pose (Ustrasana)',
        description: 'A deep backbend that opens the chest and stretches the front body.',
        benefits: ['Opens chest and shoulders', 'Improves posture', 'Stretches hip flexors'],
        difficulty: 'Intermediate',
        image: camelPose
    },
    {
        id: 15,
        name: 'Corpse Pose (Savasana)',
        description: 'A relaxation pose that allows the body to rest and integrate the benefits of practice.',
        benefits: ['Reduces stress and anxiety', 'Improves sleep quality', 'Promotes deep relaxation'],
        difficulty: 'Beginner',
        image: corpsePose
    }
];

const Yoga = () => {
    const [selectedPose, setSelectedPose] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [difficultyFilter, setDifficultyFilter] = useState('all');

    const filteredPoses = yogaPoses.filter(pose => {
        const matchesSearch = pose.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            pose.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDifficulty = difficultyFilter === 'all' || pose.difficulty === difficultyFilter;
        return matchesSearch && matchesDifficulty;
    });

    return (
        <div className="wellness-container">
            <Navbar />
            <div className="wellness-content">
                <div className="wellness-header">
                    <h1>Yoga & Wellness</h1>
                    <p>Discover the transformative power of yoga for your mental and physical well-being</p>
                </div>

                <div className="wellness-filters">
                    <input
                        type="text"
                        placeholder="Search poses..."
                        className="wellness-search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <select
                        className="wellness-select"
                        value={difficultyFilter}
                        onChange={(e) => setDifficultyFilter(e.target.value)}
                    >
                        <option value="all">All Difficulties</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </select>
                </div>

                <div className="wellness-grid">
                    {filteredPoses.map((pose) => (
                        <div
                            key={pose.id}
                            className="wellness-card"
                        >
                            <div className="wellness-card-image">
                                <img
                                    src={pose.image}
                                    alt={pose.name}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = 'https://via.placeholder.com/500x300?text=Yoga+Pose';
                                    }}
                                />
                                <div className="wellness-card-difficulty">
                                    {pose.difficulty}
                                </div>
                            </div>
                            <div className="wellness-card-content">
                                <h3>{pose.name}</h3>
                                <p>{pose.description}</p>
                                <div className="wellness-card-benefits">
                                    <h4>Benefits:</h4>
                                    <ul>
                                        {pose.benefits.map((benefit, index) => (
                                            <li key={index}>{benefit}</li>
                                        ))}
                                    </ul>
                                </div>
                                <button
                                    onClick={() => setSelectedPose(pose)}
                                    className="wellness-button"
                                >
                                    Learn More
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {selectedPose && (
                    <div className="wellness-modal-overlay" onClick={() => setSelectedPose(null)}>
                        <div className="wellness-modal" onClick={e => e.stopPropagation()}>
                            <div className="wellness-modal-header">
                                <h2>{selectedPose.name}</h2>
                                <button
                                    onClick={() => setSelectedPose(null)}
                                    className="wellness-modal-close"
                                >
                                    ×
                                </button>
                            </div>
                            <img
                                src={selectedPose.image}
                                alt={selectedPose.name}
                                className="wellness-modal-image"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'https://via.placeholder.com/500x300?text=Yoga+Pose';
                                }}
                            />
                            <div className="wellness-modal-content">
                                <div>
                                    <h3>Description</h3>
                                    <p>{selectedPose.description}</p>
                                </div>
                                <div>
                                    <h3>Benefits</h3>
                                    <ul>
                                        {selectedPose.benefits.map((benefit, index) => (
                                            <li key={index}>{benefit}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h3>Difficulty Level</h3>
                                    <p>{selectedPose.difficulty}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Yoga; 
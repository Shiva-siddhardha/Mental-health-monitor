import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../navbar/Navbar';

const UpdateJournal = () => {
    const [title, setTitle] = useState('');
    const [article, setArticle] = useState('');
    const [tags, setTags] = useState('');
    const [coverPicture, setCoverPicture] = useState(null);
    const [currentCoverPicture, setCurrentCoverPicture] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const { username, id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJournal = async () => {
            try {
                setLoading(true);
                console.log(`Fetching journal for update from: http://localhost:5000/${username}/${id}`);
                const response = await axios.get(`http://localhost:5000/${username}/${id}`);
                console.log('Journal data received for update:', response.data);
                
                if (response.status === 200) {
                    const { title, article, tags, coverPicture } = response.data;
                    setTitle(title || '');
                    setArticle(article || '');
                    setTags(Array.isArray(tags) ? tags.join(', ') : '');
                    setCurrentCoverPicture(coverPicture || '');
                } else {
                    setError('Failed to fetch journal details');
                }
            } catch (error) {
                console.error('Error fetching journal:', error);
                setError('Failed to fetch journal details');
            } finally {
                setLoading(false);
            }
        };

        fetchJournal();
    }, [username, id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'title') setTitle(value);
        if (name === 'article') setArticle(value);
        if (name === 'tags') setTags(value);
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setCoverPicture(e.target.files[0]);
        }
    };

    const handleCancel = () => {
        navigate(`/${username}/profile`);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            // Create FormData object for file upload
            const formData = new FormData();
            formData.append('title', title);
            formData.append('article', article);
            formData.append('tags', tags);
            
            // Only append coverPicture if a new file was selected
            if (coverPicture) {
                formData.append('coverPicture', coverPicture);
            }
            
            console.log('Submitting journal update with data:', {
                title,
                article,
                tags,
                hasCoverPicture: !!coverPicture
            });

            // Important: Send the FormData directly, don't convert it to a regular object
            const response = await axios.put(
                `http://localhost:5000/journals/${username}/${id}`, 
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
    
            if (response.status === 200) {
                console.log('Journal updated successfully:', response.data);
                navigate(`/${username}/profile`);
            } else {
                throw new Error('Failed to update journal');
            }
        } catch (error) {
            console.error('Error updating journal:', error);
            setError('Failed to update journal: ' + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-white flex items-center justify-center">
                    <p>Loading journal data...</p>
                </div>
            </>
        );
    }

    return (
        <>
        <Navbar />
        <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 mt-20">
            <div className="max-w-3xl w-full bg-gray-100 rounded-lg shadow-md p-8" style={{ background: 'linear-gradient(to right, #D1D5DB, #E5E7EB, #F3F4F6)' }}>
                <h2 className="text-3xl font-bold leading-9 text-gray-900 text-center mb-8">Update your journal!</h2>
                <form className="space-y-8" onSubmit={handleSubmit}>
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">Title</label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                value={title}
                                onChange={handleChange}
                                className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="Your journal title"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="article" className="block text-sm font-medium leading-6 text-gray-900">Your Journal</label>
                            <textarea
                                id="article"
                                name="article"
                                rows={10}
                                value={article}
                                onChange={handleChange}
                                className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="Write your journal here..."
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="tags" className="block text-sm font-medium leading-6 text-gray-900">Tags</label>
                            <input
                                type="text"
                                name="tags"
                                id="tags"
                                value={tags}
                                onChange={handleChange}
                                className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="e.g., travel, food, lifestyle"
                            />
                        </div>
                        <div>
                            <label htmlFor="coverPicture" className="block text-sm font-medium leading-6 text-gray-900">
                                Cover Picture
                            </label>
                            {currentCoverPicture && (
                                <div className="mt-2 mb-4">
                                    <p className="text-sm text-gray-500 mb-2">Current cover image:</p>
                                    <img 
                                        src={`http://localhost:5000/${currentCoverPicture}`} 
                                        alt="Current cover" 
                                        className="h-40 w-auto object-cover rounded-md"
                                    />
                                </div>
                            )}
                            <input
                                type="file"
                                name="coverPicture"
                                id="coverPicture"
                                onChange={handleFileChange}
                                className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                            />
                            <p className="mt-1 text-sm text-gray-500">
                                Leave empty to keep current image
                            </p>
                        </div>
                    </div>

                    {error && <p className="text-red-500 text-center mt-4">{error}</p>}

                    <div className="mt-8 flex justify-end space-x-4">
                        <button type="button" onClick={handleCancel} className="text-lg font-semibold leading-6 text-gray-900">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            disabled={loading}
                        >
                            {loading ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
        </>
    );
};

export default UpdateJournal;
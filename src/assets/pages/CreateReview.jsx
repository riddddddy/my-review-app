import React, { useState } from 'react';
import supabase from '../../config/supabaseClient';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';


const CreateReview = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        contact: '',
        message: ''
    });

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [captchaToken, setCaptchaToken] = useState(null);


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Name validation: only letters and spaces
        const nameRegex = /^[A-Za-z\s]+$/;
        if (!nameRegex.test(form.name)) {
            setError("Name must contain only letters and spaces.");
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email)) {
            setError("Please enter a valid email address.");
            return;
        }

        // Contact validation: allow numbers, spaces, +, -, ()
        const contactRegex = /^[0-9+\-() ]*$/;
        if (!contactRegex.test(form.contact)) {
            setError("Contact must be a valid phone number.");
            return;
        }

        if (!captchaToken) {
            setError("Please verify that you are not a robot!");
            return;
        }

        // add your submission logic here
        const { data, error } = await supabase
            .from('reviews')
            .insert({
                name: form.name, email: form.email, contact: form.contact, message: form.message
            })

        if (error) {
            console.error(error.message)
            setError('Something is wrong. Please fill up the fields with *.')
        }

        console.log('success')

        setForm({
            name: '',
            email: '',
            contact: '',
            message: ''
        })

        navigate('/reviews')

    };

    useEffect(() => {
        document.title = 'Create a Review'
    }, [])

    const navigate = useNavigate()



    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center sm:px-4">
            <div className="w-full max-w-lg bg-white p-8 sm:rounded-2xl shadow-lg my-4 sm:my-0">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Leave a Review</h2>
                <p className="text-center text-gray-500 mb-8">We’d love to hear your feedback!</p>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Name*
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Your name"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email*
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="you@example.com"
                            required
                        />
                    </div>

                    {/* Contact */}
                    <div>
                        <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">
                            Contact
                        </label>
                        <input
                            type="text"
                            name="contact"
                            id="contact"
                            value={form.contact}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Phone or WhatsApp"
                        />
                    </div>

                    {/* Message */}
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                            Message*
                        </label>
                        <textarea
                            name="message"
                            id="message"
                            value={form.message}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Your review..."
                            rows={5}
                            required
                        />
                    </div>

                    <div className='flex justify-center'>
                        <ReCAPTCHA
                            sitekey= {import.meta.env.VITE_RECAPTCHA_SITE_KEY} 
                            onChange={(token) => setCaptchaToken(token)}
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Submit Review
                    </button>

                    {error && <div className='text-center text-red-500'>{error}</div>}

                </form>
            </div>
        </div>
    );
};

export default CreateReview;

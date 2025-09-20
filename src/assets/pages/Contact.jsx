import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import supabase from '../../config/supabaseClient'
import ReCAPTCHA from 'react-google-recaptcha';


const Contact = () => {

  useEffect(() => {
    document.title = 'Contact'
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);


  const submitHandler = async (e) => {
    e.preventDefault()

    setLoading(true)

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

    if (!captchaToken) {
      setError("Please verify that you are not a robot!");
      return;
    }

    const { data, error: errorSubmit } = await supabase
      .from('enquiries')
      .insert({ name: form.name, email: form.email, subject: form.subject, message: form.message })


    if (errorSubmit) {
      console.error(error.message)
      setError(errorSubmit)
    }

    setSuccess('Message has been successfully sent. We will reply to you asap.')

    setForm({
      name: '',
      email: '',
      subject: '',
      message: ''
    })

    setLoading(false)
  }


  return (
    <div className='container mx-auto'>
      <nav className="flex justify-end pt-5 px-6" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3 text-gray-700 text-sm">
          {/* Home link */}
          <li className="inline-flex items-center">
            <Link
              to='/'
              className="inline-flex items-center rounded hover:bg-gray-100 px-2 py-1 transition"
            >
              Home
            </Link>
            <svg
              className="w-4 h-4 mx-1 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </li>

          {/* Current page */}
          <li className="inline-flex items-center text-gray-400" aria-current="page">
            Contact
          </li>
        </ol>
      </nav>

      <div className="min-h-screen flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">Contact Us</h2>
          <p className="text-center text-gray-500 mb-8">
            Have questions or enquiries? Fill out the form below and we’ll get back to you.
          </p>

          <form className="space-y-6" onSubmit={submitHandler}>
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name*</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your full name"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="you@example.com"
                required
              />
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject*</label>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your enquiry topic"
                required
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message*</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Write your message..."
                required
              />
            </div>

            <div className='flex justify-center'>
              <ReCAPTCHA
                sitekey="6LeXWs8rAAAAAOSxq9sef7KuutKQSM_ChYB6flt_"
                onChange={(token) => setCaptchaToken(token)}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>

            {/* Error & Success messages */}
            {error && <div className="text-red-500 text-center mt-1">{error}</div>}
            {success && <div className="text-green-500 text-center mt-1">{success}</div>}
          </form>
        </div>
      </div>


    </div>
  )
}

export default Contact
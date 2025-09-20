import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import supabase from '../../config/supabaseClient'
import { useAppContext } from '../components/AppContext'
import { useState } from 'react'
import EnquiryCard from '../components/EnquiryCard'

const AdminDashboard = () => {
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)
    const [enquiries, setEnquiries] = useState([])

    const fetchEnquiries = async (e) => {
        const { data, errorFetch } = await supabase
            .from('enquiries')
            .select('*')

        if (errorFetch) {
            console.error(error.message)
            setError(errorFetch)
        }
        setEnquiries(data)
        console.log(data)
        setLoading(false)
    }

    useEffect(() => {
        fetchEnquiries()
    }, [])

    if (loading) {
        return (
            <div>Loading...</div>
        )
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
                        Admin Dashboard
                    </li>
                </ol>
            </nav>

            <div>
                <h1 className='text-3xl mt-5 text-center sm:text-start mb-5'>General enquiries</h1>

                {/* <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {enquiries.map((enquiry, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {enquiry.name}
                                </h3>
                                <span className="text-sm text-gray-500">{enquiry.email}</span>
                            </div>

                            <div className="mb-3">
                                <span className="text-sm font-medium text-gray-600">Subject:</span>
                                <p className="text-gray-700 mt-1">{enquiry.subject}</p>
                            </div>

                            <div>
                                <span className="text-sm font-medium text-gray-600">Message:</span>
                                <p className="text-gray-700 mt-1">{enquiry.message}</p>
                            </div>

                            <div className="mt-4 flex justify-end">
                                <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition">
                                    Reply
                                </button>
                            </div>
                        </div>
                    ))}
                </div> */}

                <div className="grid gap-6 sm:grid-cols-1">
                    {enquiries.map((enquiry) => (
                        <EnquiryCard
                            key={enquiry.id}
                            enquiry={enquiry}
                        />
                    ))}
                </div>

            </div>
        </div>
    )
}

export default AdminDashboard
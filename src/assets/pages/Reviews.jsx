import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import supabase from '../../config/supabaseClient'

const Reviews = () => {

    const [error, setError] = useState('')
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        document.title = 'Reviews'
        fetchReviews()
    }, [])

    const fetchReviews = async () => {
        const { data, error: fetchError } = await supabase
            .from('reviews')
            .select('*')
            .order('created_at', { ascending: false })

        if (fetchError) {
            console.error(error.message)
            setError('Something went wrong.')
        }

        if (data) {
            console.log(data)
            setReviews(data)
        }
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
                        Reviews
                    </li>
                </ol>
            </nav>

            <div className='flex justify-end pe-6 mt-6'>
                <button className='btn btn-primary'><Link to='/create-review'>Create Review</Link></button>
            </div>

            {/* <div className="container mx-auto px-4 py-6 space-y-4">
                {reviews.map((review, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition"
                    >
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">{review.name}</h3>
                        {review.contact != null && <p className='text-sm text-gray-500'>{review.contact}</p>}
                        <p className="text-sm text-gray-500 mb-3">{review.email}</p>
                        <p className="text-gray-700">{review.message}</p>
                    </div>
                ))}
            </div> */}

            <div className="container mx-auto px-4 py-6 space-y-6">
                {reviews.map((review, index) => (
                    <div
                        key={index}
                        className="bg-gray-50 border-l-4 border-blue-500 rounded-lg p-5 shadow-sm hover:shadow-md transition"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-semibold text-blue-900">{review.name}</h3>
                            <span className="text-sm text-black">{review.contact}</span>
                        </div>
                        <p className="text-sm text-blue-800 mb-3">{review.email}</p>
                        <p className="text-gray-800">{review.message}</p>
                    </div>
                ))}
            </div>


        </div>
    )
}

export default Reviews
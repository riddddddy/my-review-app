import React from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const About = () => {

  useEffect(() => {
    document.title = 'About Us'
  }, [])

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
            About
          </li>
        </ol>
      </nav>

      
    </div>
  )
}

export default About
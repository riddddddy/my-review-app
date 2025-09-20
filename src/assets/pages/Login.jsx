import React from 'react'
import supabase from '../../config/supabaseClient'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


const Login = () => {

    const [form, setForm] = useState({ email: "", password: "" })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        document.title = 'Login'
    }, [])

    async function loginWithEmail() {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: form.email,
            password: form.password,
        })

        if (error) {
            setError(error)
            setLoading(false)
        } else if (data) {
            console.log('User logged in:', data.user)
            setLoading(false)

            navigate('/')
        }



    }

    const submitHandler = (e) => {
        console.log('submit handler is clicked')
        e.preventDefault()
        setLoading(true)
        setError(null)

        loginWithEmail()
    }

    return (
        <div>
            <nav className="flex justify-end pt-5 px-6 bg-gray-100" aria-label="Breadcrumb">
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
                        Login
                    </li>
                </ol>
            </nav>



            <div className="flex min-h-screen items-center justify-center bg-gray-100 ">
                <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
                    <h2 className="mb-6 text-center text-3xl font-bold text-gray-800">
                        Welcome Back
                    </h2>
                    <p className="mb-8 text-center text-gray-500">
                        Please sign in to your account
                    </p>

                    <form className="space-y-6" onSubmit={submitHandler}>
                        {/* Email */}
                        <div>
                            <label htmlFor='email' className="mb-1 block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                name='email'
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                placeholder="you@example.com"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor='password' className="mb-1 block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                name='password'
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                placeholder="••••••••"
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                            />
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
                        >
                            {loading? 'Sigining In..' : 'Sign in'}
                        </button>
                    </form>

                    {error && <div className='text-red-500 text-center mt-3'>{error.message.charAt(0).toUpperCase() + error.message.slice(1)}
                    </div>}


                    {/* Extra Links
                <div className="mt-6 text-center text-sm text-gray-500">
                    <a href="#" className="text-blue-600 hover:underline">
                        Forgot your password?
                    </a>
                </div>

                <div className="mt-4 text-center text-sm text-gray-500">
                    Don’t have an account?{" "}
                    <a href="#" className="text-blue-600 hover:underline">
                        Sign up
                    </a>
                </div> */}
                </div>
            </div>

        </div>

    )
}

export default Login
'use client'

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useFormik } from "formik";
import { AsYouType } from 'libphonenumber-js'
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
    const [show, setShow] = useState<boolean>(false)
    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()

    const ShowHandler = () => setShow((prev: boolean) => !prev);

    axios.defaults.withCredentials = true;

    async function Handler(values: { phoneNumber: string, password: string }) {
        setLoading(true)

        await axios.post('http://localhost:5000/auth/admin/login', {
            phoneNumber: phoneNumber,
            password: password
        })
            .then((res) => {
                formik.resetForm()
                setError('')
                console.log(res.data.message);
                router.push('/dashboard/categories')
            })
            .catch((res) => {
                if (res.response.status === 302) {
                    setError('Invalid password')
                } else if (res.response.status === 401) {
                    setError('Admin not found')
                } else {
                    setError('')
                }
                setPassword('')
                formik.setFieldValue('password', '')
            })
        setLoading(false);
    }

    const formatPhoneNumber = (value: string) => {
        const asYouType = new AsYouType('UZ')
        return asYouType.input(value);
    }

    const formik = useFormik({
        initialValues: {
            phoneNumber: phoneNumber,
            password: password,
        },
        onSubmit: Handler
    })

    const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const formattedPhoneNumber = formatPhoneNumber(event.target.value)
        setPhoneNumber(formattedPhoneNumber)
        formik.setFieldValue('phoneNumber', formattedPhoneNumber);
    }

    const handlePaswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setPassword(value)
        formik.setFieldValue('password', value)
    }

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 translate-y-56 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="text-center text-2xl font-bold text-gray-900">
                    Sign in to Admin Panel
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={formik.handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Phone number
                        </label>
                        <div className="mt-2">
                            <div className="relative items-center flex w-full rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400">
                                <label htmlFor="phoneNumber" className="font-semibold border-r pr-4 pl-2">+998 </label>
                                <input
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    type="text"
                                    placeholder="00 000 00 00"
                                    required
                                    className="w-full rounded-md border-0 py-2 px-3 focus:outline-none text-gray-900 shadow-sm  placeholder:text-gray-400"
                                    onChange={handlePhoneNumberChange}
                                    value={formik.values.phoneNumber}
                                    maxLength={12}
                                />
                            </div>
                            {error === 'Admin not found' ? (
                                <div className="text-red-500 text-sm">{error}</div>
                            ) : null}
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                        </div>
                        <div className="mt-2 relative">
                            <input
                                id="password"
                                name="password"
                                type={show ? 'text' : 'password'}
                                autoComplete="current-password"
                                placeholder="*******"
                                required
                                className="block w-full focus:outline-none rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                                onChange={handlePaswordChange}
                                value={formik.values.password}
                            />
                            {show ? (
                                <Eye onClick={ShowHandler} className='cursor-pointer absolute top-2.5 right-5 w-5 h-5' />
                            ) : (
                                <EyeOff onClick={ShowHandler} className='cursor-pointer absolute top-2.5 right-5 w-5 h-5' />
                            )}
                            {error === 'Invalid password' ? (
                                <div className="text-red-500 text-sm">{error}</div>
                            ) : null}
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full uppercase justify-center rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800"
                        >
                            {loading ? (
                                <svg className="animate-spin h-5 w-5 text-current" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" fill="currentColor" />
                                </svg>
                            ) : 'Sign in'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
'use client'

import { useStatesContext } from '@/contexts/datasContexts/datasContexts'
import { useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/components/ui/use-toast'
import { ToastAction } from '@/components/ui/toast'
import { login } from '@/app/functions/functions'
import { AsYouType } from 'libphonenumber-js'
import { useRouter } from 'next/navigation'
import { Button } from '@nextui-org/react'
import { useCookies } from 'react-cookie'
import '../../../response.css'
import Link from "next/link";
import React from "react"

export default function LoginPage() {
    const [cookie, setCookie] = useCookies(['user'])
    const { state, setState } = useStatesContext()
    const queryClient = useQueryClient()
    const { toast } = useToast()
    const router = useRouter()

    const formatterPhoneNumber = (value: string) => {
        const formatter = new AsYouType('UZ')
        return formatter.input(value)
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        switch (name) {
            case 'phoneNumber':
                const formattedPhoneNumber = formatterPhoneNumber(value)
                setState({ ...state, phoneNumber: formattedPhoneNumber })
                break
            case 'password':
                setState({ ...state, password: value })
                break
        }
    }

    const tryClickHandler = async () => {
        await login(state.phoneNumber, state.password)
    }

    const showHandler = () => {
        setState({ ...state, show: !state.show })
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setState({ ...state, loading: true })
        try {
            const response = await login(state.phoneNumber, state.password)
            if (response?.status === 200) {
                setCookie('user', response.data?.user.id, { path: '/' })
                router.push('/')
                queryClient.invalidateQueries({ queryKey: ['user'] })
            } else if (response?.status === 404) {
                setState({ ...state, loading: false })
                toast({
                    title: 'User not found!',
                    description: '',
                })
            } else {
                setState({ ...state, loading: false })
                toast({
                    title: response?.data?.message || '',
                    description: '',
                    action: (
                        <ToastAction altText="" onClick={tryClickHandler}>Try again</ToastAction>
                    )
                });
            }
        } catch (error) {
            setState({ ...state, loading: false })
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
            toast({
                title: errorMessage,
                description: '',
                action: (
                    <ToastAction altText="" onClick={tryClickHandler}>Try again</ToastAction>
                )
            });
        }
        setState({ ...state, loading: false })
    }

    return (
        <>
            <div className="py-20 w-[600px] mx-auto px-20 justify-center main">
                <div className="py-12 mt-5">
                    <form action="#" method="POST" className="space-y-6" onSubmit={onSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-[14px] font-medium leading-6 text-gray-900">
                                Phone number
                            </label>
                            <div className="flex items-center mt-2 border rounded-md">
                                <label htmlFor="phoneNumber" className="px-3 border-r text-[15px]">+998</label>
                                <input
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    placeholder="00 000 00 00"
                                    value={state?.phoneNumber}
                                    type="text"
                                    required
                                    maxLength={12}
                                    onChange={onChange}
                                    className="block w-full p-3 text-[14px] text-gray-900 border-0 rounded-md outline-none ring-0 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-gray-300"
                                />
                            </div>
                        </div>

                        <div className='relative'>
                            <label htmlFor="password" className="block text-[14px] font-medium leading-6 text-gray-900">
                                Password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type={state.show ? 'text' : 'password'}
                                    value={state?.password}
                                    placeholder="********"
                                    required
                                    onChange={onChange}
                                    className="block w-full p-3 text-gray-900 border-0 text-[14px] rounded-md shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 outline-gray-300 focus:ring-gray-300"
                                />
                            </div>
                            <div className="absolute cursor-pointer top-12 right-3" onClick={showHandler}>
                                {state.show ?
                                    (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-[18px]">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                    </svg>) :
                                    (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-[18px]">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                    )}
                            </div>
                        </div>

                        <div>
                            <Button
                                isLoading={state.loading}
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-[#0295a9] px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm "
                            >
                                Sign in
                            </Button>
                        </div>
                    </form>

                    <p className="mt-4 text-[13px] text-center text-gray-900">
                        You have not account yet ?{' '}
                        <Link href='/auth/register' className="font-semibold leading-6 text-[#0295a9] hover:opacity-85">
                            Create account
                        </Link>
                    </p>
                </div>
            </div>
            <div className='relative information_text'>
                <div className='absolute top-0 bottom-0 left-0 right-0 flex flex-col w-full mx-auto space-y-4 text-center py-36 max-w-7xl'>
                    <img className='w-[300px] mx-auto' src="https://i.pinimg.com/564x/b5/79/d2/b579d2c58e40859f67db0127965b8a96.jpg" alt="" />
                    <p className='text-xl font-semibold'>Sorry!</p>
                    <p className='text-sm w-[400px] mx-auto'>This platform is for mobile devices only. If you want to continue on the desktop version, you can visit our desktop platform!</p>
                    <Link href='https://www.opharm.uz' className='text-[14px] bg-gray-200 w-[250px] py-2.5 rounded-md mx-auto'>Visit to desktop platform</Link>
                </div>
            </div>
        </>
    );
}
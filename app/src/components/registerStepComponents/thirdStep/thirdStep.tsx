'use client'

import { useStatesContext } from "@/contexts/datasContexts/datasContexts";
import { getUserPassword } from "@/app/functions/functions";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useCookies } from "react-cookie";

export default function ThirdStep() {
    const [cookie, setCookie] = useCookies(['user'])
    const { state, setState } = useStatesContext()
    const queryClient = useQueryClient()
    const { toast } = useToast()

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, password: e.target.value })
    }

    const tryClickHandler = async () => {
        await getUserPassword(state.password)
    }

    const showHandler = () => {
        setState({ ...state, show: !state.show })
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const response = await getUserPassword(state.password)
            if (response?.status === 200) {
                setCookie('user', response.data?.user.id, { path: '/', maxAge: 60 * 60 * 24 * 7 })
                setState({ ...state, currentStep: state.currentStep + 1 })
                queryClient.invalidateQueries({ queryKey: ['user'] })
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
            toast({
                title: 'Error occurred',
                description: errorMessage,
                action: (
                    <ToastAction altText="" onClick={tryClickHandler}>Try again</ToastAction>
                )
            });
        }
    }

    return (
        <div>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-10 font-semibold  text-gray-900">
                        Set password
                    </h2>
                    <p className="text-xs my-2">Set a password to log in to your profile</p>
                </div>
                <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-md">
                    <form method="POST" className="space-y-6" onSubmit={onSubmit}>
                        <div className="relative">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    placeholder="********"
                                    value={state?.password}
                                    type={state.show ? 'text' : 'password'}
                                    required
                                    autoComplete="password"
                                    onChange={onChange}
                                    className="block w-full rounded-md border-0 p-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 outline-none focus:ring-gray-300 sm:text-sm sm:leading-6"
                                />
                            </div>
                            <div className="absolute top-12 right-3 cursor-pointer" onClick={showHandler}>
                                {state.show ?
                                    (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                    </svg>) :
                                    (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                    )}
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-[#0295a9] px-1.5 py-2 text-sm font-semibold leading-6 text-white shadow-sm "
                            >
                                Complete registration
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
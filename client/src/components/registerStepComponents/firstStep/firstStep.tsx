'use client'

import { useStatesContext } from "@/contexts/datasContexts/datasContexts";
import { getUserNumber } from "@/app/functions/functions";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { AsYouType } from 'libphonenumber-js'
import { Button } from "@nextui-org/react";
import Link from 'next/link'

export default function FirstStep() {
    const { state, setState } = useStatesContext()
    const { toast } = useToast()
    const formatterPhoneNumber = (value: string) => {
        const formatter = new AsYouType('UZ')
        return formatter.input(value)
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formattedNumber = formatterPhoneNumber(e.target.value)
        setState({ ...state, phoneNumber: formattedNumber })
    }



    const tryClickHandler = async () => {
        await getUserNumber(state.phoneNumber)
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            const response = await getUserNumber(state.phoneNumber)
            if (response?.status === 200) {
                setState({ ...state, currentStep: state.currentStep + 1 })
            } else if (response?.status === 409) {
                toast({
                    title: 'This number alredy used!',
                    description: '',
                })
            } else {
                toast({
                    title: 'Something went wrong!',
                    description: response?.data?.message || '',
                    action: (
                        <ToastAction altText="" onClick={tryClickHandler}>Try again</ToastAction>
                    )
                });
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
            toast({
                title: 'Error occurred',
                description: errorMessage,
                action: (
                    <ToastAction altText="" onClick={tryClickHandler}>Try again</ToastAction>
                )
            })
        }
    }

    return (
        <div>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-10 font-semibold  text-gray-900">
                        Enter your phone number
                    </h2>
                    <p className="text-xs my-2">We will send an SMS with a confirmation code</p>
                </div>
                <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-md">
                    <form method="POST" className="space-y-6" onSubmit={onSubmit}>
                        <div>
                            <label htmlFor="phoneNumber" className="block text-sm font-medium leading-6 text-gray-900">
                                Phone number
                            </label>
                            <div className="mt-2 flex items-center border rounded-md">
                                <label htmlFor="phoneNumber" className="border-r px-3">+998</label>
                                <input
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    placeholder="00 000 00 00"
                                    value={state?.phoneNumber}
                                    type="text"
                                    required
                                    autoComplete="phoneNumber"
                                    maxLength={12}
                                    onChange={onChange}
                                    className="block w-full rounded-md border-0 p-3 text-gray-900 ring-0 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 outline-none focus:ring-gray-300 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <Button
                                isLoading={state.loading}
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-[#0295a9] px-1.5 py-2 text-sm font-semibold leading-6 text-white shadow-sm "
                            >
                                {state.loading ? 'Getting...' : 'To get the code'}
                            </Button>
                        </div>
                    </form>

                    <p className="mt-4 w-80 mx-auto text-center text-xs text-gray-900">
                        By logging in, you agree to the
                        <Link href='' className="font-semibold m-0.5 leading-6 text-indigo-500 hover:opacity-85">
                            personal data processing policy
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
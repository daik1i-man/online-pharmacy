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
            <div className="flex flex-col justify-center flex-1 min-h-full px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-10 font-semibold text-gray-900">
                        Enter your phone number
                    </h2>
                    <p className="my-2 text-xs">We will send an SMS with a confirmation code</p>
                </div>
                <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-md">
                    <form method="POST" className="space-y-6" onSubmit={onSubmit}>
                        <div>
                            <label htmlFor="phoneNumber" className="block text-[13px] font-medium leading-6 text-gray-900">
                                Phone number
                            </label>
                            <div className="flex items-center mt-2 border rounded-md">
                                <label htmlFor="phoneNumber" className="px-3 border-r text-[13px]">+998</label>
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
                                    className="block w-full p-3 text-[13px] text-gray-900 border-0 rounded-md outline-none ring-0 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-gray-300"
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

                    <p className="mx-auto mt-4 text-xs text-center text-gray-900 w-80">
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
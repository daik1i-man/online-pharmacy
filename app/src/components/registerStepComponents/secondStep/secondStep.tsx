'use client'

import { useStatesContext } from '@/contexts/datasContexts/datasContexts';
import { verification, getUserNumber } from '@/app/functions/functions';
import { axiosInstance } from '@/configs/axios.config';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { Button } from '@nextui-org/react';
import OtpInput from 'react-otp-input';
import Cookies from 'js-cookie';
import React from 'react';

export default function SecondStep() {
    const { toast } = useToast()
    const { state, setState } = useStatesContext();
    const [timer, setTimer] = React.useState(59)
    const phoneNumber = Cookies.get('phone_number')

    const onChange = (otp: string) => {
        setState({ ...state, otp: otp });
    };

    React.useEffect(() => {
        const Timer = setInterval(() => {
            setTimer(prevTimer => {
                if (prevTimer === 0) {
                    setState({ ...state, otp: '' })
                    clearInterval(Timer)
                    return 0
                } else {
                    return prevTimer - 1
                }
            })
        }, 1000)

        return () => clearInterval(Timer)
    }, [timer])

    const tryClickHandler = async () => {
        if (phoneNumber) {
            const response = await axiosInstance.post('/auth/user/get-number', {
                phone_number: phoneNumber
            })

            if (response?.status === 200) {
                setTimer(59)
            } else {
                toast({
                    title: 'Something went wrong.',
                    description: '',
                    action: (
                        <ToastAction altText="Goto schedule to undo" onClick={tryClickHandler}>Try again</ToastAction>
                    ),
                })
            }
        }
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await verification(state.otp)
            if (response?.status === 200) {
                setState({ ...state, currentStep: state.currentStep + 1 })
            } else if (response?.status === 401) {
                toast({
                    title: response?.data?.message,
                    description: '',
                    action: (
                        <ToastAction altText="Goto schedule to undo" onClick={tryClickHandler}>Try again</ToastAction>
                    ),
                })
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

    };

    return (
        <div>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-10 font-semibold text-gray-900">
                        Enter a code
                    </h2>
                    <p className="text-xs my-2">To confirm your phone number, send a 4-digit code</p>
                </div>
                <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form method="POST" className="space-y-6" onSubmit={onSubmit}>
                        <div className="mt-2 max-w-80 mx-auto space-x-4">
                            <OtpInput
                                inputStyle={{
                                    border: "1px solid",
                                    width: "60px",
                                    height: "60px",
                                    borderRadius: "5px",
                                    margin: "0 auto",
                                    borderColor: "#0295a9",
                                    justifyContent: "center"
                                }}
                                value={state.otp}
                                onChange={onChange}
                                placeholder='0'
                                numInputs={4}
                                renderSeparator={<span></span>}
                                renderInput={(props) => <input {...props} />}
                            />
                        </div>
                        <div>
                            <Button
                                isLoading={state.loading}
                                type="submit"
                                className="flex w-full max-w-sm justify-center rounded-md bg-[#0295a9] px-1.5 py-2 text-sm font-semibold leading-6 text-white shadow-sm"
                            >
                                {state.loading ? 'Cheking...' : 'Check code'}
                            </Button>
                        </div>
                        {timer === 0 ? (
                            <p className='text-xs text-[#0295a9] text-end cursor-pointer' onClick={tryClickHandler}>Try again</p>
                        ) : (<p className='text-xs text-center w-64 mx-auto'>{`If you don't receive the code, you can get a new one via ${timer} sec`}</p>

                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}

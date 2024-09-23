'use client'

import { useStatesContext } from "@/contexts/datasContexts/datasContexts";
import Finish from "@/components/registerStepComponents/finish/finish";
import { StepDatas } from "@/data/stepDatas";
import '../../../response.css'
import Link from "next/link";

export default function RegisterPage() {
    const steps = StepDatas()
    const { state, setState } = useStatesContext()

    return (
        <>
            <div className="mx-auto my-24 relative main">
                <div className="flex items-center justify-center mb-4">
                    {steps.map((step, index) => (
                        <div key={index} className="flex-1 mx-auto">
                            <div
                                className={`text-center ${state.currentStep >= index ? 'bg-[#0295a9] text-gray-50' : 'bg-gray-50'}  w-10 p-2 mx-auto ${state.currentStep === index ? 'bg-[#0295a9] rounded-full text-gray-50' : 'rounded-full'}`}>
                                {state.currentStep <= index ? step.label : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                    </svg>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <hr className="max-w-[350px] mx-auto h-0.5 -z-10  w-full absolute top-5 right-0 left-0 bg-gray-100" />
                <div className={`w-8 h-8 rounded-full p-[7px] ${state.currentStep >= 3 ? 'hidden' : 'block'} absolute top-6 left-0 cursor-pointer ${(state.currentStep >= 1) ? 'block' : 'hidden'}`} onClick={() => setState({ ...state, currentStep: state.currentStep - 1 })}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                </div>
                <div className="p-4 rounded-md">
                    {state.currentStep === 3 ? (<Finish />) : (steps[state.currentStep]?.component)}
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
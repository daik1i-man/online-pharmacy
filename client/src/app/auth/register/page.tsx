'use client'

import { useStatesContext } from "@/contexts/datasContexts/datasContexts";
import Finish from "@/components/registerStepComponents/finish/finish";
import { StepDatas } from "@/data/stepDatas";
import '../../../responsive.css'
import Link from "next/link";

export default function RegisterPage() {
    const steps = StepDatas()
    const { state, setState } = useStatesContext()

    return (
        <>
            <div className="max-w-xl mx-auto p-4 my-12 relative main">
                <div className="flex justify-center items-center mb-4">
                    {steps.map((step, index) => (
                        <div key={index} className="flex-1 mx-auto">
                            <div
                                className={`text-center ${state.currentStep >= index ? 'bg-[#0295a9] text-gray-50' : 'bg-gray-50'}  w-10 p-2 mx-auto ${state.currentStep === index ? 'bg-[#0295a9] rounded-full text-gray-50' : 'border rounded-full'}`}>
                                {state.currentStep <= index ? step.label : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                    </svg>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <hr className="max-w-sm mx-auto h-0.5 -z-10  w-full absolute top-9 right-0 left-0 bg-gray-100" />
                <div className={`w-8 h-8 rounded-full border p-[7px] ${state.currentStep >= 3 ? 'hidden' : 'block'} absolute top-6 left-0 cursor-pointer ${(state.currentStep >= 1) ? 'block' : 'hidden'}`} onClick={() => setState({ ...state, currentStep: state.currentStep - 1 })}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                </div>
                <div className="p-4 border rounded-md shadow-sm">
                    {state.currentStep === 3 ? (<Finish />) : (steps[state.currentStep]?.component)}
                </div>
            </div>
            <div className='relative information_text mx-auto w-[400px]'>
                <div className='absolute top-0 bottom-0 left-0 right-0 flex flex-col w-full mx-auto space-y-4 text-center py-12 max-w-7xl'>
                    <img className='w-full mx-auto' src="https://i.pinimg.com/736x/99/95/db/9995dbe1be71739b7db982a9dcf37d0c.jpg" alt="" />
                    <p className='text-xl font-semibold'>Sorry!</p>
                    <p className='text-sm'>This platform is for desktop devices only. If you want to continue on the mobile version, you can visit our desktop platform!</p>
                    <Link href='https://www.app.opharm.uz' className='text-[14px] bg-gray-200 w-[250px] py-2.5 rounded-md mx-auto'>Visit to mobile platform</Link>
                </div>
            </div>
        </>
    );
}
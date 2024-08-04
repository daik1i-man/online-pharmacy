'use client'

import { useStatesContext } from "@/contexts/datasContexts/datasContexts";
import Finish from "@/components/registerStepComponents/finish/finish";
import { StepDatas } from "@/data/stepDatas";

export default function RegisterPage() {
    const steps = StepDatas()
    const { state, setState } = useStatesContext()

    return (
        <div className="max-w-xl mx-auto p-4 my-12 relative">
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
    );
}
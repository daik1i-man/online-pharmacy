import { Step } from "@/app/types";
import FirstStep from "@/components/registerStepComponents/firstStep/firstStep";
import SecondStep from "@/components/registerStepComponents/secondStep/secondStep";
import ThirdStep from "@/components/registerStepComponents/thirdStep/thirdStep";

export function StepDatas() {
    const steps: Step[] = [
        { label: '1', component: <FirstStep /> },
        { label: '2', component: <SecondStep /> },
        { label: '3', component: <ThirdStep /> },
    ];
    return steps
}
import { Card } from "flowbite-react";
import { Button } from "@nextui-org/react";

export default function SkeletoComponent() {
    return (
        <Card
            className="max-w-xl relative my-4 shadow-none"
        >
            <div
                className='h-64 bg-gray-300 animate-pulse'
            />
            <div className="absolute top-3 right-3 w-4 h-4 bg-gray-300 animate-pulse rounded-md">
               
            </div>
            <div className="flex items-center h-4 bg-gray-300 animate-pulse w-24 ml-2.5 rounded-full">
                
            </div>
            <h5 className="text-sm w-64 rounded-full mx-auto h-4 bg-gray-300 animate-pulse font-normal text-gray-900">
            </h5>
            <Button
                className="rounded-lg bg-gray-300 animate-pulse px-5 py-3"
            >
            </Button>
        </Card>
    );
}
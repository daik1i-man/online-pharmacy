import { paramsProps } from "@/app/types";

export default function CreditCardInput({ onChange, value }: paramsProps) {
    return (
        <div className="px-3 my-8">
            <div className="flex items-center gap-2 my-4 text-orange-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                </svg>
                <p className="text-sm">We will not withdraw any funds from your bank card</p>
            </div>
            <label htmlFor="firstName" className="text-xs mt-2 font-light">Credit card:</label>
            <div className="mt-2">
                <input
                    className="block w-full rounded-xl border-0 outline-none py-2.5 px-3 text-gray-900 ring-gray-200 ring-1 placeholder:text-gray-400 focus:ring-1 focus:ring-gray-300 sm:text-xs sm:leading-6"
                    placeholder="xxxx xxxx xxxx xxxx"
                    autoComplete="cc-number"
                    onChange={onChange}
                    name="creditCard"
                    maxLength={19}
                    value={value}
                    type="text"
                    required
                />
            </div>
        </div>
    );
}
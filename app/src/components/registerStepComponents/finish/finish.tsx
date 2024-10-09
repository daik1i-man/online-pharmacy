import Link from 'next/link'

export default function Finish() {
    return (
        <div>
            <div className={`flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8`}>
                <div className="sm:mx-auto sm:w-full sm:max-w-xs">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-28 mx-auto text-[#0295a9]">
                        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                    </svg>
                    <h2 className="text-2xl font-semibold  text-gray-900 text-center">
                        Successfully
                    </h2>
                    <p className="text-xs my-2 text-center">You have successfully registered on our platform, now you can log into your account</p>
                </div>
                <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-xs">
                    <Link href='/'>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-[#0295a9] px-1.5 py-2 text-sm font-semibold leading-6 text-white shadow-sm "
                        >
                            Go to main page
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
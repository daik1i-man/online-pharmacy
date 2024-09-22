import { FaTelegram, FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa"
import { Button } from "@nextui-org/react"
import { Textarea } from "flowbite-react";
import Link from "next/link";
import '../../response.css'

export default function Footer() {
    return (
        <div className="mx-auto bg-[#fcf7f7] p-4 rounded-t-md footer w-[600px]">
            <div className="">
                <div className="flex flex-col border-b border-gray-400">
                    <div>
                        <div>
                            <h1 className="text-[16px] w-60">We are in social networks:</h1>
                            <p className="my-2 text-[11px] font-light w-[300px]">We publish news daily on social networks, so as not to miss news, subscribe to us</p>
                        </div>
                        <div className="flex items-center gap-3 mx-2 my-8">
                            <FaTelegram className="text-[25px]" />
                            <FaInstagram className="text-[25px]" />
                            <FaFacebookF className="text-[25px]" />
                            <FaYoutube className="text-[25px]" />
                        </div>
                    </div>
                    <div>
                        <div className="">
                            <h1 className="text-[16px] w-60">Send us your complaints or suggestions</h1>
                            <form action="" method="post" className="my-3">
                                <div>
                                    <label htmlFor="email" className="block text-xs font-light leading-6 text-gray-900">
                                        Email address
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            className="block w-full ring-1 ring-gray-200 rounded-md border-0 focus:ring-gray-300 outline-none py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400  sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <label htmlFor="comment" className="block mb-2 text-xs font-light leading-6 text-gray-900">
                                        Your complaint or suggestion
                                    </label>
                                    <Textarea id="comment" autoComplete="comment" required rows={4} className="block w-full ring-1 ring-gray-200 rounded-md border-0 focus:ring-gray-300 outline-none py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400  sm:text-sm sm:leading-6" />
                                </div>
                                <Button type="submit" className="bg-[#0295a9] text-gray-50 my-4 py-2.5 rounded-md px-12 text-end">
                                    Send
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="py-1.5">
                    <p className="mx-auto text-xs font-light text-center">© 2024 Online shop <Link href='/' className="text-[#0295a9]">opharm.uz</Link> : All rights reserved.</p>
                </div>
            </div>
        </div>
    );
}
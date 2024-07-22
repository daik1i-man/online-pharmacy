import Link from "next/link";
import { FaTelegram, FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa"
import { Textarea } from "flowbite-react";
import { Button } from "@nextui-org/react";

export default function Footer() {
    return (
        <div className="w-full h-[412px] bg-[#fcf7f7] mt-12">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center border-b border-gray-400">
                    <div>
                        <div>
                            <h1 className="text-3xl ">We are in social networks:</h1>
                            <p className="text-xs font-light mx-2 my-2 w-80">We publish news daily on social networks, so as not to miss news, subscribe to us</p>
                        </div>
                        <div className="flex items-center gap-3 mx-2 my-8">
                            <FaTelegram className="text-2xl" />
                            <FaInstagram className="text-2xl" />
                            <FaFacebookF className="text-2xl" />
                            <FaYoutube className="text-2xl" />
                        </div>
                    </div>
                    <div>
                        <div className="pt-8">
                            <h1 className="text-lg">Send us your complaints or suggestions</h1>
                            <form action="" method="post" className="my-4">
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
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-[#0295a9] sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className="max-w-md mt-4">
                                    <label htmlFor="comment" className="block text-xs mb-2 font-light leading-6 text-gray-900">
                                        Your complaint or suggestion
                                    </label>
                                    <Textarea id="comment" autoComplete="comment" required rows={4} className="focus:ring-1 focus:ring-inset focus:ring-[#0295a9]" />
                                </div>
                                <Button type="submit" className="bg-[#0295a9] text-gray-50 my-4 rounded-md px-8">
                                    Send
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
                <div>
                    <p className="mx-auto text-center my-2 mb-4 text-xs font-light">© 2024 Online shop <Link href='/' className="text-[#0295a9]">opharm.uz</Link> : All rights reserved.</p>
                </div>
            </div>
        </div>
    );
}
'use client'

import { getUser, getCart, getFavourites, updateProfile } from "../functions/functions";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import CancelOrderModal from "@/components/modal-dialogs/cancelOrderModal";
import { uploadBytes, getDownloadURL, ref } from 'firebase/storage'
import { childrenProps, updatePrifleDatasProps } from "../types";
import { usePathname, useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { logout } from "../functions/functions";
import { storage } from "@/services/firebase";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { useCookies } from "react-cookie";
import { statesProps } from '@/app/types'
import Link from 'next/link'

export default function layout({ children }: childrenProps) {
    const [cookie, setCookie, removeCookie] = useCookies(['user'])
    const [active, setActive] = useState(false)
    const queryClient = useQueryClient()
    const pathname = usePathname()
    const { toast } = useToast()
    const router = useRouter()

    const { data: user, isLoading: userLoading } = useQuery({
        queryKey: ['user'],
        queryFn: () => getUser()
    })

    const [state, setState] = useState<statesProps>({
        firstName: user?.first_name,
        lastName: user?.last_name,
        phoneNumber: user?.number,
        imgUrl: user?.img_url,
        file: undefined,
        loading: false
    })

    useEffect(() => {
        setState({
            firstName: user?.first_name,
            lastName: user?.last_name,
            phoneNumber: user?.number,
            imgUrl: user?.img_url,
            file: undefined,
            loading: false
        });
    }, [user]);

    const { data: cart } = useQuery({
        queryKey: ['cart'],
        queryFn: () => getCart()
    })

    const { data: favourites } = useQuery({
        queryKey: ['favourites'],
        queryFn: () => getFavourites()
    })

    const mutate = useMutation({
        mutationKey: ['user'],
        mutationFn: () => logout(),
        onSuccess: () => {
            removeCookie('user', { path: '/' })
            router.push('/')
            queryClient.removeQueries({ queryKey: ['user'] })
        }
    })

    const updateUserAvatar = useMutation({
        mutationKey: ['user'],
        mutationFn: ({ phoneNumber, firstName, lastName, imgUrl }: updatePrifleDatasProps) => updateProfile({ phoneNumber, firstName, lastName, imgUrl }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] })
            toast({
                title: 'Successfully!',
                description: 'Your profile image updated successfully!'
            })
        }
    })


    const onClick = () => {
        router.push('/')
    }

    const uploadFile = async (file: File | undefined) => {
        if (!file) {
            return undefined;
        }
        try {
            const filesRef = ref(storage, 'users-profile-images/' + file.name);
            await uploadBytes(filesRef, file);
            return await getDownloadURL(filesRef);
        } catch (error) {
            console.error('Error uploading file:', error);
            return undefined;
        }
    }


    const fileChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setState({ ...state, file: e.target.files[0] });
            setActive(true);
        }
    };

    const updateData = async () => {
        const url = await uploadFile(state.file);
        updateUserAvatar.mutate({
            phoneNumber: state.phoneNumber,
            firstName: state.firstName,
            lastName: state.lastName,
            imgUrl: url,
        });
    };

    useEffect(() => {
        if (active) {
            updateData();
            setActive(false);
        }
    }, [active]);

    return (
        <>
            <div className="relative w-full">
                <div className="flex items-center justify-between px-4 mt-16">
                    <div className='w-8 h-8 px-[7px] py-[8px] my-2 bg-gray-100 rounded-full cursor-pointer' onClick={onClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-[16px]">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>
                    </div>
                    <Button className="rounded-md text-[11px] h-8 w-20" onClick={() => mutate.mutate()}>
                        Sign Out
                    </Button>
                </div>
                <div className="relative w-full px-4">
                    <div className="relative flex flex-col items-center mb-8">
                        <div className="gap-8 leading-snug tracking-normal text-blue-gray-900">
                            <div className={`w-36 ${userLoading && 'bg-gray-300 animate-pulse'} h-36 border rounded-full relative`}>
                                {userLoading ? '' : (
                                    <div className="flex items-center justify-between w-full space-x-4">
                                        <img className="rounded-full" src={`${user?.img_url ? user?.img_url : 'https://i.pinimg.com/564x/76/f3/f3/76f3f3007969fd3b6db21c744e1ef289.jpg'}`} alt="" />
                                    </div>
                                )}
                                <label htmlFor="dropzone-file" className={`absolute bottom-0 right-8 bg-white shadow-md p-1.5 rounded-md cursor-pointer ${pathname === '/user/settings' ? 'block' : 'hidden'}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-[14px]">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                    </svg>
                                    <input name='file' type='file' onChange={fileChanges} id="dropzone-file" className="hidden" />
                                </label>
                            </div>
                        </div>
                        <div>
                            <div className="text-center">
                                {userLoading ? (
                                    <div className="w-48 h-4 mx-auto mt-2 mb-3 bg-gray-200 rounded-full animate-pulse" />
                                ) : (
                                    (user?.last_name || user?.first_name) && <h1 className="m-2 text-[14px]">{`${user?.last_name} ${user?.first_name}`}</h1>
                                )}
                            </div>
                            <div className="text-center">
                                {userLoading ? (
                                    <div className="w-40 h-4 mx-auto mb-3 bg-gray-200 rounded-full animate-pulse" />
                                ) : (
                                    <p className="mb-4 text-[10px]">{`+998 ${user?.number}`}</p>
                                )}
                            </div>
                            <div className="flex items-center gap-2">
                                {userLoading ? (
                                    <div className="bg-gray-200 p-2.5 rounded-md animate-pulse w-40 h-[38px]" />
                                ) : (
                                    <div className="border p-2.5 rounded-md">
                                        <p className="text-[11px]">{`Products in cart: ${cart?.length}`}</p>
                                    </div>
                                )}
                                {userLoading ? (
                                    <div className="bg-gray-200 p-2.5 rounded-md animate-pulse w-40 h-[38px]" />
                                ) : (
                                    <div className="border p-2.5 rounded-md">
                                        <p className="text-[11px]">{`Favourite products: ${favourites?.length}`}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <ul className="relative flex items-center justify-center text-sm font-normal text-center gap-x-8">
                        <Link href='/user/orders'>
                            <li className={`flex items-center gap-2 py-4 text-[14px] ${pathname === '/user/orders' && 'text-[#0295a9] border-b border-[#0295a9]'}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
                                </svg>
                                My orders
                            </li>
                        </Link>
                        <Link href='/user/settings'>
                            <li className={`flex items-center gap-2 py-4 text-[14px] ${pathname === '/user/settings' && 'text-[#0295a9] border-b border-[#0295a9]'}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                                Settings
                            </li>
                        </Link>
                    </ul>
                </div>
                <CancelOrderModal />
                <div className="">
                    {children}
                </div>
            </div>
            {/* <div className='relative information_text'>
                <div className='absolute top-0 bottom-0 left-0 right-0 flex flex-col w-full mx-auto space-y-4 text-center py-44 max-w-7xl'>
                    <img className='w-[300px] mx-auto' src="https://i.pinimg.com/564x/b5/79/d2/b579d2c58e40859f67db0127965b8a96.jpg" alt="" />
                    <p className='text-xl font-semibold'>Sorry!</p>
                    <p className='text-sm w-[400px] mx-auto'>This platform is for mobile devices only. If you want to continue on the desktop version, you can visit our desktop platform!</p>
                    <Link href='https://www.opharm.uz' className='text-[14px] bg-gray-200 w-[250px] py-2.5 rounded-md mx-auto'>Visit to desktop platform</Link>
                </div>
            </div> */}
        </>
    );
}
'use client'

import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query'
import { uploadBytes, getDownloadURL, ref } from 'firebase/storage'
import React, { ChangeEvent, FormEvent, useEffect } from 'react'
import { updateProfile } from '@/app/functions/functions'
import { storage } from '../../../services/firebase'
import { useToast } from '@/components/ui/use-toast'
import { updatePrifleDatasProps } from '@/app/types'
import { getUser } from '@/app/functions/functions'
import { AsYouType } from 'libphonenumber-js'
import { Button } from '@nextui-org/react'

interface statesProps {
    firstName?: string,
    lastName?: string,
    phoneNumber?: string,
    imgUrl?: string,
    file?: File | undefined,
    loading: boolean
}

export default function Page() {
    const queryClient = useQueryClient()
    const { toast } = useToast()
    const [change, setChange] = React.useState(false)
    const { data: user } = useQuery({
        queryKey: ['user'],
        queryFn: () => getUser()
    })

    const [state, setState] = React.useState<statesProps>({
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

    useEffect(() => {
        const isChanged = state.firstName !== user?.first_name ||
            state.lastName !== user?.last_name ||
            state.phoneNumber !== user?.number ||
            state.imgUrl !== user?.img_url ||
            state.file !== undefined;

        setChange(isChanged);
    }, [user, state]);

    const uploadFile = async (file: File | undefined) => {
        if (!file) {
            return undefined;
        }

        const filesRef = ref(storage, 'users-profile-images/' + file.name);
        await uploadBytes(filesRef, file);
        return await getDownloadURL(filesRef);
    }

    const phoneNumberFormatter = (number: string) => {
        const formatted = new AsYouType('UZ');
        return formatted.input(number);
    }

    const fileChanges = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setState({ ...state, file: e.target.files[0] });
        }
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        switch (name) {
            case 'firstName':
                setState({ ...state, firstName: value });
                break;
            case 'lastName':
                setState({ ...state, lastName: value });
                break;
            case 'phoneNumber':
                const formattedNumber = phoneNumberFormatter(value);
                setState({ ...state, phoneNumber: formattedNumber });
                break;
        }
    }

    const handleCancel = () => {
        setState({
            firstName: user?.firstName,
            lastName: user?.lastName,
            phoneNumber: user?.number,
            imgUrl: user?.img_url,
            file: undefined,
            loading: false
        });
    }

    const mutation = useMutation({
        mutationKey: ['user'],
        mutationFn: (datas: updatePrifleDatasProps) => updateProfile(datas),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] })
            toast({
                title: 'Your profile updated successfully!',
                description: `${new Date().toLocaleString()}`
            })
        },
        onError: (error) => {
            toast({
                title: 'Something went wrong!',
                description: `${(error as Error).message}`
            })
        }
    })

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setState({ ...state, loading: true })

        const url = (state?.file === undefined) ? user?.img_url : await uploadFile(state?.file)

        const datas: updatePrifleDatasProps = {
            phoneNumber: state?.phoneNumber,
            firstName: state?.firstName,
            lastName: state?.lastName,
            imgUrl: url
        }

        mutation.mutate(datas);

        setState({ ...state, loading: false })
    }

    return (
        <>
            <form method='POST' className="w-full h-full mb-12 border rounded-md" onSubmit={onSubmit}>
                <div className="py-3.5 px-5 border-b ">
                    <h1 className='text-base'>Basic information</h1>
                </div>
                <div className="flex items-center justify-between gap-12 my-12">
                    <div className="mx-4 w-60">
                        <div className='relative w-full border rounded-md'>
                            {state.file === undefined ? (
                                <img className="rounded-md" src='https://i.pinimg.com/564x/76/f3/f3/76f3f3007969fd3b6db21c744e1ef289.jpg' alt="" />
                            ) : (
                                <img className="rounded-md" src={URL.createObjectURL(state?.file)} alt="" />
                            )}
                            {state?.file === undefined ? (
                                <label htmlFor="dropzone-file" className={`absolute -top-3 -right-3 ${state?.file === undefined ? 'bg-gray-100' : 'bg-transparent'} p-1.5 rounded-md cursor-pointer`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                    </svg>
                                    <input name='file' type='file' onChange={fileChanges} id="dropzone-file" className="hidden" />
                                </label>
                            ) : (
                                <div className={`absolute -top-3 -right-3 ${state?.file === undefined ? 'bg-transparent' : 'bg-gray-100'} p-1.5 rounded-md cursor-pointer`}>
                                    <svg onClick={() => setState({ ...state, file: undefined })} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col w-full space-y-5">
                        <div className="flex items-center space-x-8">
                            <div className="w-2/6">
                                <label htmlFor="firstName" className="mt-2 text-xs font-light">First name:</label>
                                <div className="relative mt-2">
                                    <input
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        value={state?.firstName || ''}
                                        onChange={onChange}
                                        autoComplete="firstName"
                                        required
                                        className="block w-full rounded-xl border-0 outline-none py-2.5 px-3 text-gray-900 ring-gray-200 ring-1 placeholder:text-gray-400 focus:ring-1 focus:ring-gray-300 sm:text-xs sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="w-2/6">
                                <label htmlFor="lastName" className="text-xs font-light">Last name:</label>
                                <div className="relative mt-2">
                                    <input
                                        id="lastName"
                                        name="lastName"
                                        value={state?.lastName || ''}
                                        onChange={onChange}
                                        type="text"
                                        autoComplete="lastName"
                                        required
                                        className="block w-full rounded-xl border-0 outline-none py-2.5 px-3 text-gray-900 ring-gray-200 ring-1 placeholder:text-gray-400 focus:ring-1 focus:ring-gray-300 sm:text-xs sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="w-[70%]">
                            <label htmlFor="phoneNumber" className="text-xs font-light">Phone number:</label>
                            <div className="relative flex items-center py-3 mt-2 border-0 ring-1 ring-gray-200 focus:ring-1 rounded-xl focus:ring-gray-300">
                                <span className="px-2 py-1 text-xs font-light border-r">+998</span>
                                <input
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={state?.phoneNumber || ''}
                                    onChange={onChange}
                                    type="text"
                                    required
                                    autoComplete="phoneNumber"
                                    className="block w-full px-3 text-gray-900 border-0 outline-none rounded-xl placeholder:text-gray-400 sm:text-xs sm:leading-6"
                                    maxLength={12}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${!change ? 'hidden' : 'block'} border-t flex items-center justify-end space-x-4 py-3 px-4 text-end`}>
                    <button
                        type="button"
                        className="rounded-md bg-gray-200 px-5 py-2.5 text-sm leading-6 shadow-sm"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                    <Button
                        isLoading={state?.loading}
                        type="submit"
                        className="rounded-md bg-[#0295a9] px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm"
                    >
                        {state?.loading ? 'Saving...' : 'Save changes'}
                    </Button>
                </div>
            </form>
        </>
    );
}

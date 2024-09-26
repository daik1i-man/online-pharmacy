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
import { statesProps } from '@/app/types'


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

    const phoneNumberFormatter = (number: string) => {
        const formatted = new AsYouType('UZ');
        return formatted.input(number);
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

        const datas: updatePrifleDatasProps = {
            phoneNumber: state?.phoneNumber,
            firstName: state?.firstName,
            lastName: state?.lastName,
            imgUrl: user?.img_url
        }

        mutation.mutate(datas);

        setState({ ...state, loading: false })
    }

    return (
        <>
            <form method='POST' className="w-full h-full mb-12 rounded-md" onSubmit={onSubmit}>
                <div className="py-3.5 px-5 border">
                    <h1 className='text-[14px]'>Basic information</h1>
                </div>
                <div className="flex flex-col items-center justify-between gap-12 my-12">
                    <div className="w-full">
                        <div className="flex flex-col items-center w-full space-y-4">
                            <div className="w-full px-4">
                                <label htmlFor="firstName" className="mt-2 text-[11px] font-light">First name:</label>
                                <div className="relative mt-2">
                                    <input
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        value={state?.firstName || ''}
                                        onChange={onChange}
                                        autoComplete="firstName"
                                        required
                                        className="block w-full rounded-xl border-0 text-[11px] outline-none py-4 px-3 text-gray-900 ring-gray-200 ring-1 placeholder:text-gray-400 focus:ring-1 focus:ring-gray-300"
                                    />
                                </div>
                            </div>
                            <div className="w-full px-4">
                                <label htmlFor="lastName" className="text-[11px] font-light">Last name:</label>
                                <div className="relative mt-2">
                                    <input
                                        id="lastName"
                                        name="lastName"
                                        value={state?.lastName || ''}
                                        onChange={onChange}
                                        type="text"
                                        autoComplete="lastName"
                                        required
                                        className="block w-full rounded-xl text-[11px] border-0 outline-none py-4 px-3 text-gray-900 ring-gray-200 ring-1 placeholder:text-gray-400 focus:ring-1 focus:ring-gray-300"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="w-full px-4 mt-2.5">
                            <label htmlFor="phoneNumber" className="text-[11px] font-light">Phone number:</label>
                            <div className="relative flex items-center py-3 mt-2 border-0 ring-1 ring-gray-200 focus:ring-1 rounded-xl focus:ring-gray-300">
                                <span className="px-2 py-1 text-[11px] font-normal border-r">+998</span>
                                <input
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={state?.phoneNumber || ''}
                                    onChange={onChange}
                                    type="text"
                                    required
                                    autoComplete="phoneNumber"
                                    className="block w-full px-3 text-[11px] text-gray-900 border-0 outline-none rounded-xl placeholder:text-gray-400"
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

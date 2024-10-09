'use client'

import { useCancelOrderModalContext } from "@/contexts/actionsContext/actionContexts"
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query"
import CreditCardInput from "@/components/creditCardInput/creditCardInput"
import { getCart, checkout } from "../functions/functions"
import { useToast } from "@/components/ui/use-toast"
import { AsYouType } from "libphonenumber-js"
import { useRouter } from "next/navigation"
import { Button } from "@nextui-org/react"
import React, { FormEvent } from 'react'
import { stateProps } from "../types"
import Link from "next/link"
import '../../response.css'

export default function Page() {
    const { setOpenSuccessfullyOrderModal } = useCancelOrderModalContext()
    const queryClient = useQueryClient()
    const { toast } = useToast()
    const router = useRouter()

    const { data: cart, isLoading: cartLoading } = useQuery({
        queryKey: ['cart'],
        queryFn: () => getCart()
    })

    const formatterTotalPrice = (num: number) => num?.toLocaleString('ru-RU')

    const totalPrice = cart?.reduce((previos: any, current: any) => {
        const quantity = Number(current?.quantity)
        const price = Number(current?.price.replace(/\s+/g, ''))
        return previos + (quantity * price)
    }, 0)

    const formattedTotalPrice = formatterTotalPrice(totalPrice)

    const muatation = useMutation({
        mutationKey: ['orders'],
        mutationFn: ({ ...state }: stateProps) => checkout(state),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] })
            setOpenSuccessfullyOrderModal(true)
        },
        onError: (error) => {
            toast({
                title: "Something went wrong!",
                description: `${(error as Error).message}`,
            })
        }
    })

    const [state, setState] = React.useState<stateProps>({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        paymentType: '',
        cardNumber: '',
        active: false,
        totalPrice: formattedTotalPrice
    })

    React.useEffect(() => {
        setState({
            ...state,
            active: false,
            totalPrice: formattedTotalPrice
        })
    }, [cart])

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        switch (name) {
            case 'firstName':
                setState({ ...state, firstName: value })
                break
            case 'lastName':
                setState({ ...state, lastName: value })
                break
            case 'phoneNumber':
                const asYouType = new AsYouType('UZ')
                setState({ ...state, phoneNumber: asYouType.input(value) })
                break
            case 'paymentType':
                setState({ ...state, paymentType: value })
                if (value === 'Online card') {
                    setState({ ...state, active: true })
                } else {
                    setState({ ...state, active: false })
                }
                break
            case 'creditCard':
                let input = value.replace(/\s+/g, '')

                if (input.length > 16) {
                    input = input.substring(0, 16)
                }
                const formatted = input.match(/.{1,4}/g)?.join(' ') || ''
                setState({ ...state, cardNumber: formatted })
                break
        }
    }

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        muatation.mutate({ ...state })
    }

    const backHandler = () => {
        router.back()
    }

    return (
        <div className="w-full h-full">
            <div className="mx-auto my-12 main">
                <div className='w-8 h-8 px-[7px] py-[8px] my-2 bg-gray-100 rounded-full cursor-pointer' onClick={backHandler}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-[16px]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                </div>
                <h1>Placing an order</h1>
                <form className='relative flex items-start justify-between mx-auto my-8 max-w-7xl' method="POST" onSubmit={onSubmit}>
                    {cartLoading ? (
                        <div className="p-4 border rounded-md">
                            <div className="flex items-center gap-4 my-4">
                                <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
                                <div className="h-3 bg-gray-200 rounded-md w-36 animate-pulse" />
                            </div>
                            <div className="w-full my-8">
                                <div className="flex flex-col px-3 space-y-5">
                                    <div className="flex items-center space-x-8">
                                        <div className="w-1/2">
                                            <div className="w-20 h-3 bg-gray-200 rounded-md animate-pulse" />
                                            <div className="relative mt-2">
                                                <div
                                                    className="block h-12 bg-gray-200 rounded-md w-80 animate-pulse"
                                                />
                                            </div>
                                        </div>
                                        <div className="w-1/2">
                                            <div className="w-20 h-3 bg-gray-200 rounded-md animate-pulse"></div>
                                            <div className="relative mt-2">
                                                <div
                                                    className="block h-12 bg-gray-200 rounded-md w-80 animate-pulse"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full">
                                        <div className="w-20 h-3 bg-gray-200 rounded-md animate-pulse"></div>
                                        <div className="relative mt-2">
                                            <div
                                                className="block w-full h-12 bg-gray-200 rounded-md animate-pulse"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 my-4">
                                <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
                                <div className="h-3 bg-gray-200 rounded-md w-36 animate-pulse" />
                            </div>
                            <div className="flex flex-col items-center gap-4 px-3 mt-9">
                                <div
                                    className="block w-full h-12 bg-gray-200 rounded-md animate-pulse"
                                />
                                <div
                                    className="block w-full h-12 bg-gray-200 rounded-md animate-pulse"
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="p-4">
                            <div className="flex items-center gap-4 my-12">
                                <div className="w-8 h-8 px-[11px] py-[4px] bg-[#0295a9] text-gray-50 rounded-full">1</div>
                                <p>Personal information</p>
                            </div>
                            <div className="w-full my-8">
                                <div className="flex flex-col px-3 space-y-5">
                                    <div className="">
                                        <label htmlFor="firstName" className="mt-2 text-xs font-light">First name:</label>
                                        <div className="relative mt-2">
                                            <input
                                                className="block w-full rounded-md border-0 text-[14px] outline-none py-2.5 px-3 text-gray-900 ring-gray-200 ring-1 placeholder:text-gray-400 focus:ring-1 focus:ring-gray-300 sm:text-xs sm:leading-6"
                                                placeholder="first name"
                                                autoComplete="firstName"
                                                value={state.firstName}
                                                onChange={onChange}
                                                name="firstName"
                                                id="firstName"
                                                type="text"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="">
                                        <label htmlFor="lastName" className="text-xs font-light">Last name:</label>
                                        <div className="relative mt-2">
                                            <input
                                                className="block w-full rounded-md text-[14px] border-0 outline-none py-2.5 px-3 text-gray-900 ring-gray-200 ring-1 placeholder:text-gray-400 focus:ring-1 focus:ring-gray-300 sm:text-xs sm:leading-6"
                                                autoComplete="lastName"
                                                placeholder="last name"
                                                value={state.lastName}
                                                onChange={onChange}
                                                name="lastName"
                                                id="lastName"
                                                type="text"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full">
                                        <label htmlFor="phoneNumber" className="text-xs font-light">Phone number:</label>
                                        <div className="relative flex items-center py-3 mt-2 border-0 rounded-md ring-1 ring-gray-200 focus:ring-1 focus:ring-gray-300">
                                            <span className="text-[13px] font-light border-r px-2 py-1">+998</span>
                                            <input
                                                className="block w-full border-0 text-[14px] outline-none px-3 text-gray-900 placeholder:text-gray-400 sm:text-xs sm:leading-6"
                                                autoComplete="phoneNumber"
                                                placeholder="00 000 00 00"
                                                value={state.phoneNumber}
                                                onChange={onChange}
                                                name="phoneNumber"
                                                id="phoneNumber"
                                                maxLength={12}
                                                type="text"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 my-4">
                                <div className="w-8 h-8 px-[11px] py-[4px] bg-[#0295a9] text-gray-50 rounded-full">2</div>
                                <p>Payment type</p>
                            </div>
                            <div className="flex flex-col items-center gap-4 px-3 mt-9">
                                <label htmlFor="card" className="flex items-center w-full gap-3 p-4 bg-gray-100 rounded-md cursor-pointer">
                                    <input
                                        onChange={onChange}
                                        value='Online card'
                                        name="paymentType"
                                        type="radio"
                                        id="card"
                                        required
                                    />
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                                    </svg>
                                    <p className="text-xs">
                                        Online card (UzCard, Humo, Visa, MasterCard)
                                    </p>
                                </label>
                                <label htmlFor="cash" className="flex items-center w-full gap-4 p-4 bg-gray-100 rounded-md cursor-pointer">
                                    <input
                                        onChange={onChange}
                                        value='Upon receipt'
                                        name="paymentType"
                                        type="radio"
                                        id="cash"
                                        required
                                    />
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" />
                                    </svg>
                                    <p className="text-xs">Upon receipt (Cash)</p>
                                </label>
                            </div>
                            {state.active && <CreditCardInput onChange={onChange} value={state.cardNumber} />}
                        </div>)
                    }
                    {cartLoading ? (
                        <div className='fixed top-[52px] z-40 w-[600px] right-0 left-0 p-4 bg-white border-y'>
                            <div className=''>
                                <div className='flex items-center justify-between'>
                                    <div className='flex flex-col space-y-4'>
                                        <div className='h-3 bg-gray-200 rounded-full w-44 animate-pulse' />
                                        <div className="flex items-center space-x-4">
                                            <div className='w-12 h-3 bg-gray-200 rounded-full animate-pulse' />
                                            <div className='h-3 bg-gray-200 rounded-full w-28 animate-pulse' />
                                        </div>
                                    </div>
                                    <div className='w-32 h-10 bg-gray-200 rounded-md animate-pulse' />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className='fixed top-[50px] z-10 right-0 left-0 p-4 bg-white border-y'>
                            <div className=''>
                                <div className='flex items-center justify-between'>
                                    <div className='flex flex-col space-y-4'>
                                        <p className='text-sm'>{`Your orders: (${cart?.length})`}</p>
                                        <div className="flex items-center space-x-4">
                                            <p className='text-sm'>Total:</p>
                                            <h1 className='text-sm'>{`${formattedTotalPrice} UZS`}</h1>
                                        </div>
                                    </div>
                                    <Button type="submit" className='rounded-md bg-[#0295a9] text-gray-50 text-xs py-1.5 px-8 my-2 text-end'>Checkout</Button>
                                </div>
                            </div>
                        </div>
                    )}
                </form>
            </div>
            <div className='relative information_text'>
                <div className='absolute top-0 bottom-0 left-0 right-0 flex flex-col w-full mx-auto space-y-4 text-center py-36 max-w-7xl'>
                    <img className='w-[300px] mx-auto' src="https://i.pinimg.com/564x/b5/79/d2/b579d2c58e40859f67db0127965b8a96.jpg" alt="" />
                    <p className='text-xl font-semibold'>Sorry!</p>
                    <p className='text-sm w-[400px] mx-auto'>This platform is for mobile devices only. If you want to continue on the desktop version, you can visit our desktop platform!</p>
                    <Link href='https://www.opharm.uz' className='text-[14px] bg-gray-200 w-[250px] py-2.5 rounded-md mx-auto'>Visit to desktop platform</Link>
                </div>
            </div>
        </div>
    );
}
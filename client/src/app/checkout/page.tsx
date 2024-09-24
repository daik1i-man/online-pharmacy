'use client'

import { useCancelOrderModalContext } from "@/contexts/actionsContext/actionContexts"
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query"
import CreditCardInput from "@/components/creditCardInput/creditCardInput"
import { getCart, checkout } from "../functions/functions"
import { useToast } from "@/components/ui/use-toast"
import { AsYouType } from "libphonenumber-js"
import { Button } from "@nextui-org/react"
import React, { FormEvent } from 'react'
import { stateProps } from "../types"
import '../../responsive.css'
import Link from "next/link"

export default function Page() {
    const { setOpenSuccessfullyOrderModal } = useCancelOrderModalContext()
    const queryClient = useQueryClient()
    const { toast } = useToast()

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

    return (
        <div className="w-full h-full">
            <div className="max-w-7xl mx-auto my-12 main">
                <h1>Placing an order</h1>

                <form className='flex my-8 max-w-7xl mx-auto items-start justify-between relative' method="POST" onSubmit={onSubmit}>
                    {cartLoading ? (
                        <div className="border rounded-md p-4 w-[890px]">
                            <div className="flex items-center my-4 gap-4">
                                <div className="w-8 h-8 bg-gray-200 animate-pulse rounded-full" />
                                <div className="w-36 h-3 bg-gray-200 animate-pulse rounded-md" />
                            </div>
                            <div className="my-8 w-full">
                                <div className="flex flex-col space-y-5 px-3">
                                    <div className="flex items-center space-x-8">
                                        <div className="w-1/2">
                                            <div className="w-20 rounded-md h-3 bg-gray-200 animate-pulse" />
                                            <div className="mt-2 relative">
                                                <div
                                                    className="block w-80 h-12 rounded-md bg-gray-200 animate-pulse"
                                                />
                                            </div>
                                        </div>
                                        <div className="w-1/2">
                                            <div className="w-20 rounded-md h-3 bg-gray-200 animate-pulse"></div>
                                            <div className="mt-2 relative">
                                                <div
                                                    className="block w-80 h-12 rounded-md bg-gray-200 animate-pulse"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full">
                                        <div className="w-20 rounded-md h-3 bg-gray-200 animate-pulse"></div>
                                        <div className="mt-2 relative">
                                            <div
                                                className="block w-full h-12 rounded-md bg-gray-200 animate-pulse"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center my-4 gap-4">
                                <div className="w-8 h-8 bg-gray-200 animate-pulse rounded-full" />
                                <div className="w-36 h-3 bg-gray-200 animate-pulse rounded-md" />
                            </div>
                            <div className="flex flex-col items-center gap-4 mt-9 px-3">
                                <div
                                    className="block w-full h-12 rounded-md bg-gray-200 animate-pulse"
                                />
                                <div
                                    className="block w-full h-12 rounded-md bg-gray-200 animate-pulse"
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="border rounded-md p-4 xl:w-[890px]">
                            <div className="flex items-center my-4 gap-4">
                                <div className="w-8 h-8 px-[11px] py-[4px] bg-[#0295a9] text-gray-50 rounded-full">1</div>
                                <p>Personal information</p>
                            </div>
                            <div className="my-8 w-full">
                                <div className="flex flex-col space-y-5 px-3">
                                    <div className="flex items-center space-x-8">
                                        <div className="w-1/2">
                                            <label htmlFor="firstName" className="text-xs mt-2 font-light">First name:</label>
                                            <div className="mt-2 relative">
                                                <input
                                                    className="block w-full rounded-xl border-0 outline-none py-2.5 px-3 text-gray-900 ring-gray-200 ring-1 placeholder:text-gray-400 focus:ring-1 focus:ring-gray-300 sm:text-xs sm:leading-6"
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
                                        <div className="w-1/2">
                                            <label htmlFor="lastName" className="text-xs font-light">Last name:</label>
                                            <div className="mt-2 relative">
                                                <input
                                                    className="block w-full rounded-xl border-0 outline-none py-2.5 px-3 text-gray-900 ring-gray-200 ring-1 placeholder:text-gray-400 focus:ring-1 focus:ring-gray-300 sm:text-xs sm:leading-6"
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
                                    </div>
                                    <div className="w-full">
                                        <label htmlFor="phoneNumber" className="text-xs font-light">Phone number:</label>
                                        <div className="mt-2 flex items-center border-0 ring-1 ring-gray-200 py-3 focus:ring-1 rounded-xl focus:ring-gray-300 relative">
                                            <span className="text-xs font-light border-r px-2 py-1">+998</span>
                                            <input
                                                className="block w-full rounded-xl border-0 outline-none px-3 text-gray-900 placeholder:text-gray-400 sm:text-xs sm:leading-6"
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
                            <div className="flex items-center my-4 gap-4">
                                <div className="w-8 h-8 px-[11px] py-[4px] bg-[#0295a9] text-gray-50 rounded-full">2</div>
                                <p>Payment type</p>
                            </div>
                            <div className="flex flex-col items-center gap-4 mt-9 px-3">
                                <label htmlFor="card" className="bg-gray-100 flex items-center gap-3 p-4 rounded-md cursor-pointer w-full">
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
                                <label htmlFor="cash" className="bg-gray-100 p-4 rounded-md cursor-pointer flex items-center gap-4 w-full">
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
                        <div className='absolute top-0 right-0'>
                            <div className='right-[120px] w-80 border rounded-md p-4 px-4  '>
                                <div>
                                    <div className="flex items-center justify-between">
                                        <div className='w-36 h-3 bg-gray-200 animate-pulse rounded-full justify-start' />
                                        <div className="w-24 h-3 bg-gray-200 animate-pulse rounded-full" />
                                    </div>
                                    <div className='flex items-center justify-between my-12'>
                                        <div className='w-24 h-5 bg-gray-200 animate-pulse rounded-full' />
                                        <div className='w-24 h-5 bg-gray-200 animate-pulse rounded-full' />
                                    </div>
                                    <div className="my-4 flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-md bg-gray-200 animate-pulse" />
                                        <div className="w-72 h-3 rounded-md bg-gray-200 animate-pulse" />
                                    </div>
                                </div>
                                <div className='w-full h-9 bg-gray-200 animate-pulse rounded-md' />
                            </div>
                        </div>
                    ) : (
                        <div className='absolute top-0 right-0'>
                            <div className='right-[120px] w-80 border rounded-md p-4 px-4'>
                                <div>
                                    <div className="flex items-center justify-between text-xs">
                                        <p className='text-sm'>{`Your orders: (${cart?.length})`}</p>
                                        <Link className="underline text-indigo-600" href='/cart'>Go to cart</Link>
                                    </div>
                                    <div className='flex items-center justify-between my-12'>
                                        <p className='text-sm'>Total:</p>
                                        <h1 className='text-xl'>{`${formattedTotalPrice} UZS`}</h1>
                                    </div>
                                    <div className="flex items-center gap-2 my-4">
                                        <input type="checkbox" required />
                                        <p className="text-xs">I agree with rules <Link className="text-indigo-600" href=''>purchasing goods</Link></p>
                                    </div>
                                </div>
                                <Button
                                    className='w-full rounded-md bg-[#0295a9] text-gray-50'
                                    type="submit"
                                >
                                    Checkout
                                </Button>
                            </div>
                        </div>
                    )}
                </form>
            </div>
            <div className='relative information_text mx-auto w-[400px]'>
                <div className='absolute top-0 bottom-0 left-0 right-0 flex flex-col w-full mx-auto space-y-4 text-center py-12 max-w-7xl'>
                    <img className='w-full mx-auto' src="https://i.pinimg.com/736x/99/95/db/9995dbe1be71739b7db982a9dcf37d0c.jpg" alt="" />
                    <p className='text-xl font-semibold'>Sorry!</p>
                    <p className='text-sm'>This platform is for desktop devices only. If you want to continue on the mobile version, you can visit our desktop platform!</p>
                    <Link href='https://www.app.opharm.uz' className='text-[14px] bg-gray-200 w-[250px] py-2.5 rounded-md mx-auto'>Visit to mobile platform</Link>
                </div>
            </div>
        </div>
    );
}
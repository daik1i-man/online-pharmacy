'use client'

import { loginRequest } from '@/requestFunctions/login.request';
import { useRouter, usePathname } from "next/navigation";
import { AsYouType } from 'libphonenumber-js'
import { Button } from "@nextui-org/react";
import { useTranslations } from 'next-intl';
import { useCookies } from 'react-cookie'
import React from "react";

export default function LocalePage() {
  const t = useTranslations('Pages');
  const [cookies, setCookie] = useCookies(['admin'])
  const pathname = usePathname()
  const router = useRouter()
  const [state, setState] = React.useState({
    phoneNumber: '',
    password: '',
    show: false,
    loading: false,
    errorMessage: ''
  })

  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null
  };

  const formatPhoneNumber = (value: string) => {
    const asYouType = new AsYouType('UZ')
    return asYouType.input(value);
  }

  const onClick = () => setState(prevState => ({ ...prevState, show: !prevState.show }))

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    switch (name) {
      case 'phoneNumber':
        const formattedNumber = formatPhoneNumber(value)
        setState({ ...state, phoneNumber: formattedNumber })
        break;
      case 'password':
        setState({ ...state, password: value })
        break;
    }
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setState(prevState => ({
      ...prevState,
      loading: true,
      errorMessage: '',
    }))

    const datas = {
      phoneNumber: state.phoneNumber,
      password: state.password
    }

    try {
      const response = await loginRequest(datas)

      if (response.status === 404) {
        setState(prevState => ({
          ...prevState,
          loading: false,
          errorMessage: t('Login.errorMessages.adminNotFound')
        }))
      } else if (response.status === 409) {
        setState(prevState => ({
          ...prevState,
          loading: false,
          errorMessage: t('Login.errorMessages.invalidPassword')
        }))
      } else if (response.status === 200) {
        setState(prevState => ({
          ...prevState,
          loading: false,
          errorMessage: '',
        }))
        setCookie('admin', response.data?.admin.id)
        const locale = pathname.split('/')[1];
        router.push(`/${locale}/dashboard/categories`)
        if (pathname === '/dashboard/categories') {
          setState({ ...state, loading: false })
        } else {
          setState({ ...state, loading: true })
        }
      }
    } catch (err) {
      setState(prevState => ({
        ...prevState,
        loading: false,
        errorMessage: t('Login.errorMessages.networkError')
      }))
    }
  }

  return (
    <div className="mt-64">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-2xl font-bold text-gray-900">
          {t('Login.title')}
        </h2>
      </div>
      <div className="mt-10 sm:max-w-sm xl:max-w-md mx-auto focus:ring-1">
        <form className="space-y-6" onSubmit={onSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              {t('Login.inputsLabel.phoneNumber')}
            </label>
            <div className="mt-2">
              <div className="relative items-center flex w-full rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400">
                <label htmlFor="phoneNumber" className="font-semibold border-r pr-4 pl-2">+998 </label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="text"
                  placeholder="00 000 00 00"
                  value={state.phoneNumber}
                  onChange={onChange}
                  autoComplete='new-password'
                  required
                  className="w-full rounded-md border-0 py-2 px-3 focus:outline-none text-gray-900 shadow-sm focus:ring-0 focus:border-none placeholder:text-gray-400"
                  maxLength={12}
                />
              </div>
            </div>
          </div>
          <p className='text-red-500 font-semibold'>{state.errorMessage}</p>
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                {t('Login.inputsLabel.password')}
              </label>
            </div>
            <div className="mt-2 relative">
              <input
                id="password"
                name="password"
                type={state.show ? 'text' : 'password'}
                placeholder="*******"
                value={state.password}
                onChange={onChange}
                required
                className="block w-full focus:outline-none rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-gray-400 placeholder:text-gray-400"
              />
              <div onClick={onClick}>
                {state.show ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 cursor-pointer absolute top-2.5 right-5 w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>

                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 cursor-pointer absolute top-2.5 right-5 w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                )}
              </div>
            </div>
          </div>

          <div>
            <Button
              isLoading={state.loading}
              type="submit"
              className="flex w-full uppercase justify-center rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800"
            >
              {state.loading ? t('Login.inputsLabel.loadingButton') : t('Login.inputsLabel.buttonText')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
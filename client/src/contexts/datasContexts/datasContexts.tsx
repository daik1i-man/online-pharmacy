'use client'

import { stateContextProps, statesProps } from '../contextsType';
import { useQuery } from '@tanstack/react-query';
import { createContext, useContext, useState } from 'react'
import { getUser } from '@/app/functions/functions';
import { childrenProps } from '@/app/types';

export const statesContext = createContext<stateContextProps | undefined>(undefined)

export const useStatesContext = () => {
    const context = useContext(statesContext)

    if (context === undefined) {
        throw new Error('useStatesContext must be used within a StatesContextProvider');
    }

    return context
}

export default function StateDatasContext({ children }: childrenProps) {
    const [state, setState] = useState<statesProps>({
        phoneNumber: '',
        otp: '',
        password: '',
        currentStep: 0,
        error: '',
        loading: false,
        show: false
    })

    return (
        <statesContext.Provider value={{ state, setState }}>
            {children}
        </statesContext.Provider>
    );
}
export interface statesProps {
    phoneNumber: string,
    otp: string,
    password: string,
    currentStep: number,
    error: string
    loading: boolean,
    show: boolean
}

export interface stateContextProps {
    state: statesProps,
    setState: (state: statesProps) => void,
}

export interface cancelOrderModalContextProps {
    open: boolean,
    setOpen: (open: boolean) => void,
    orderId?: string,
    setOrderId: (orderId?: string) => void,
    openSuccessfullyOrderModal: boolean,
    setOpenSuccessfullyOrderModal: (openSuccessfullyOrderModal: boolean) => void
}

export interface childrenProps {
    children: React.ReactNode
}

export interface MainPageCategoriesProps {
    name: string,
    img_url: string,
    created_date: string,
    id: string
}

export interface MainPageProductsProps {
    category: string,
    price: string,
    quantity: string,
    id: string,
    img_url: string,
    name: string,
    description: string,
    cart: boolean,
    favourites: boolean
}

export interface basketProductsProps {
    productId: string,
    userId: string,
    imageUrl: string,
    name: string,
    quantity: string,
    price: string,
    cart: boolean
}

export interface productCardDatasProps {
    name: string,
    id: string,
    img_url: string,
    price: string,
    cart: boolean,
    favourites: boolean,
    quantity: number
}

export interface Step {
    label: string;
    component: React.ReactNode;
}

export interface updatePrifleDatasProps {
    phoneNumber?: string,
    firstName?: string,
    lastName?: string,
    imgUrl?: string
}

export interface paramsProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    value: string
}

export interface stateProps {
    firstName: string,
    lastName: string,
    phoneNumber: string,
    paymentType: string,
    cardNumber: string,
    totalPrice: string,
    active: boolean
}

export interface statesProps {
    firstName?: string,
    lastName?: string,
    phoneNumber?: string,
    imgUrl?: string,
    file?: File | undefined,
    loading: boolean
}

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
    description: string
}

export interface basketProductsProps {
    productId: string,
    userId: string,
    imageUrl: string,
    name: string,
    quantity: string,
    price: string
}
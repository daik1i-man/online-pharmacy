import { basketProductsProps } from "@/app/types"

export interface basketDatasContextProps {
    basketDatas: basketProductsProps | null,
    setBasketDatas: (basketDatas: basketProductsProps | null) => void
}
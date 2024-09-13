import { ReactNode } from "react"

export interface loginReuestFunctionProps {
    phoneNumber: string,
    password: string
}

export interface childrenProps {
    children: ReactNode
}

export interface statesProps {
    categoryName?: string,
    error: string,
    file: File | null,
    loading: boolean,
    url?: string,
    active: boolean
}

export interface addCategoryProps {
    categoryName?: string,
    url: string | null,
    formattedDate: string
}

export interface editCategoryProps {
    id?: string,
    categoryName?: string,
    url: string | undefined | null,
    formattedDate?: string
}


export interface MyContextProps {
    openLogoutModal: boolean,
    setOpenLogoutModal: (openLogoutModal: boolean) => void
}

export interface notificationContextProps {
    showToast: boolean,
    setShowToast: (showToast: boolean) => void
}

export interface productsProps {
    file: File | null,
    loading: boolean,
    selectedCategory: string | null,
    price: string,
    name: string,
    quantity: string,
    description: string,
    active: boolean
}

export interface addProductProps {
    img_url: string | null,
    category: string | null,
    price: string,
    quantity: string,
    name: string,
    description: string | null,
}

export interface editProductProps {
    img_url: string;
    category: string | null;
    price: string;
    quantity: string;
    id: string | string[];
    name: string;
    description: string;
}

export interface addEmployeeContextProps {
    openAddEmployeeModal: boolean,
    setOpenAddEmployeeModal: (openAddEmployeeModal: boolean) => void,
}

export interface deleteEmployeeContextProps {
    openDeleteEmployeeModal: boolean,
    setOpenDeleteEmployeeModal: (openDeleteEmployeeModal: boolean) => void,
    deleteCurrentEmployee: string | null,
    setDeleteCurrentEmployee: (deleteCurrentEmploye: string) => void
}
export interface addEmployeeProps {
    phoneNumber: string,
    name: string,
    role: string,
    salary: string
}

export interface editEmployeeProps {
    id: string | undefined,
    phone_number?: string,
    name?: string,
    role?: string,
    salary?: string
}

export interface editEmployeeContextProps {
    openEditEmployeeModal: boolean,
    setOpenEditEmployeeModal: (openAddEmployeeModal: boolean) => void,
    editCurrentEmployee: editEmployeeProps | undefined,
    setEditCurrentEmployee: (editCurrentEmployee: editEmployeeProps | undefined) => void
}


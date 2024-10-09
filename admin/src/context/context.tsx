import { ReactNode } from "react";
import ActionsContextComponent from "./actionsContext/actionsContext";
import CategoryActionsContext from "./categoryActionsContext/categoryActionsContext";
import OrdersContextProvider from "./orderActionsContext/provider";
import ProductContextsProvider from "./productActionsContext/provider";
import EmployeesContextProvider from "./employeeActionsContext/provider";

export default function ContextsProvider({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <CategoryActionsContext>
            <OrdersContextProvider>
                <ActionsContextComponent>
                    <ProductContextsProvider>
                        <EmployeesContextProvider>
                            {children}
                        </EmployeesContextProvider>
                    </ProductContextsProvider>
                </ActionsContextComponent>
            </OrdersContextProvider>
        </CategoryActionsContext>
    );
}
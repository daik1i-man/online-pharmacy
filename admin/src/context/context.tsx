import { ReactNode } from "react";
import ActionsContextComponent from "./actionsContext/actionsContext";
import CategoryActionsContext from "./categoryActionsContext/categoryActionsContext";
import OrdersContextProvider from "./orderActionsContext/provider";
import ProductContextsProvider from "./productActionsContext/provider";
import EmployeesContextProvider from "./employeeActionsContext/provider";
import NotificationContextComponent from "./actionsContext/notificationsContext/notificationContext";

export default function ContextsProvider({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <CategoryActionsContext>
            <OrdersContextProvider>
                <ActionsContextComponent>
                    <ProductContextsProvider>
                        <EmployeesContextProvider>
                            <NotificationContextComponent>
                                {children}
                            </NotificationContextComponent>
                        </EmployeesContextProvider>
                    </ProductContextsProvider>
                </ActionsContextComponent>
            </OrdersContextProvider>
        </CategoryActionsContext>
    );
}
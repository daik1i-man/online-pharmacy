import { childrenProps } from "../categoryActionsContext/addCategory/addCategoryTypes";
import TakeOrder from "./takeOrderContext";

export default function OrdersContextProvider({ children }: childrenProps) {
    return (
        <TakeOrder>
            {children}
        </TakeOrder>
    );
}
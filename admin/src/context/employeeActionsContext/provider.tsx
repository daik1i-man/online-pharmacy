import { childrenProps } from "../categoryActionsContext/addCategory/addCategoryTypes";
import AddEmployee from "./addEmployee/addEmployee";
import EditEmployee from "./editEmployee/editEmployee";
import DeleteEmployee from "./deleteEmployee/deleteEmployee";

export default function EmployeesContextProvider({ children }: childrenProps) {
    return (
        <AddEmployee>
            <EditEmployee>
                <DeleteEmployee>
                    {children}
                </DeleteEmployee>
            </EditEmployee>
        </AddEmployee>
    );
}
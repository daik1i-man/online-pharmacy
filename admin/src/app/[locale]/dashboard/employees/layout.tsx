import AddEmployeeModal from "@/components/modals/employeeModals/addEmployee/addEmployee";
import DeleteEmployeeModal from "@/components/modals/employeeModals/deleteEmployee/deleteEmployee";
import EditEmployeeModal from "@/components/modals/employeeModals/editEmployee/editEmployee";
import React from "react";

export default function layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <AddEmployeeModal />
            <DeleteEmployeeModal />
            <EditEmployeeModal />
            {children}
        </>
    );
}
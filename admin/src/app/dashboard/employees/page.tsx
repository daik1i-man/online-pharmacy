'use client'

import { useContext, useEffect, useState } from "react";
import { Table } from "flowbite-react";
import { Button, Image, Skeleton } from "@nextui-org/react";
import axios from "axios";
import { AddEmployeeContext } from "@/context/employeeActionsContext/addEmployee/addEmployee";
import { DeleteEmployeeContext } from '../../../context/employeeActionsContext/deleteEmployee/deleteEmployee';
import { EditEmployeeContext } from "@/context/employeeActionsContext/editEmployee/editEmployee";

interface EmployeesProps {
    id: string,
    phone_number: string,
    name: string,
    role: string,
    salary: string
}

export default function EmployeesPage() {
    const [employees, setEmployees] = useState<EmployeesProps[]>([])
    const addEmployeeTempContext = useContext(AddEmployeeContext)
    const deleteEmployeeTempContext = useContext(DeleteEmployeeContext)
    const editEmployeeTempContext = useContext(EditEmployeeContext)

    if (!addEmployeeTempContext || !deleteEmployeeTempContext || !editEmployeeTempContext) {
        throw new Error('SomeComponent must be used with an employees modal')
    }

    const { setOpenAddEmployeeModal } = addEmployeeTempContext
    const { setOpenDeleteEmployeeModal, setDeleteCurrentEmployee } = deleteEmployeeTempContext
    const { setOpenEditEmployeeModal, setEditCurrentEmployee } = editEmployeeTempContext

    async function getEmployees() {
        try {
            const response = await axios.get('http://localhost:5000/admin-controll/employees/get-all')
            setEmployees(response.data.allEmployees)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getEmployees()

        const id = setInterval(getEmployees, 1000)

        return () => {
            if (id) {
                clearInterval(id)
            }
        }

    }, [])

    const editEmployeeHandler = (value: string) => {
        setEditCurrentEmployee(value)
        setOpenEditEmployeeModal(true)
    }

    const deleteEmployeeHandler = (value: string) => {
        setDeleteCurrentEmployee(value)
        setOpenDeleteEmployeeModal(true)
    }

    return (
        <div className="w-full h-full m-0 p-0 justify-center">
            <div className="max-w-4xl mx-auto my-8">
                <h1 className="text-2xl font-regular">Employess</h1>
            </div>
            <div className="max-w-4xl mx-auto">
                {/* <Skeleton className="w-[1180px] h-5 rounded-lg" /> */}
                <div className="overflow-x-auto border w-[1180px] mx-auto">
                    <Table>
                        <Table.Head className="text-center">
                            <Table.HeadCell className="">#</Table.HeadCell>
                            <Table.HeadCell>Phone Number</Table.HeadCell>
                            <Table.HeadCell>Name</Table.HeadCell>
                            <Table.HeadCell>Role</Table.HeadCell>
                            <Table.HeadCell>Salary</Table.HeadCell>
                            <Table.HeadCell>Action</Table.HeadCell>
                            <Table.HeadCell className="w-12 h-4">
                                <Button
                                    onClick={() => setOpenAddEmployeeModal(true)}
                                    className="bg-gray-900 text-gray-50 rounded-md py-3"
                                >
                                    + Add employee
                                </Button>
                            </Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="text-center justify-center text-md font-semibold text-gray-900">
                            {employees && employees.map((employee, i) => (
                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell
                                        className="whitespace-nowrap font-medium text-gray-900 dark:text-white"
                                    >
                                        {i + 1}
                                    </Table.Cell>
                                    <Table.Cell className="">
                                        {employee.phone_number}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {employee.name}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {employee.role}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {`${employee.salary} so'm`}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Button
                                            onClick={() => editEmployeeHandler(employee.id)}
                                            className="bg-white outline-none -ml-2"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                            </svg>
                                        </Button>
                                    </Table.Cell>
                                    <Table.Cell className="text-center">
                                        <Button
                                            onClick={() => deleteEmployeeHandler(employee.id)}
                                            className="bg-white outline-none text-red-600 hover:text-red-500"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>
                                        </Button>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </div>
            </div>
        </div>
    );
}
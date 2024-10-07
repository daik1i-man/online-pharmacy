'use client'

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination } from "@nextui-org/react";
import { useDeleteEmployeeContext } from "@/context/employeeActionsContext/deleteEmployee/deleteEmployee";
import { useEditEmployeeContext } from "@/context/employeeActionsContext/editEmployee/editEmployee";
import { useAddEmployeeContext } from "@/context/employeeActionsContext/addEmployee/addEmployee";
import { getEmployeeById } from "@/requestFunctions/get.employee.by.id";
import { getEmployees } from "@/requestFunctions/get.employees";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@nextui-org/react";
import { useTranslations } from 'next-intl'
import React from "react";



export default function EmployyesPage() {
    const { setOpenDeleteEmployeeModal, setDeleteCurrentEmployee } = useDeleteEmployeeContext()
    const { setEditCurrentEmployee, setOpenEditEmployeeModal, editCurrentEmployee } = useEditEmployeeContext()
    const { setOpenAddEmployeeModal } = useAddEmployeeContext()
    const [isMounted, setIsMounted] = React.useState(false);
    const [page, setPage] = React.useState(1);
    const t = useTranslations('Pages');

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null
    };

    const { data: employees } = useQuery({
        queryKey: ['employees'],
        queryFn: getEmployees
    })

    const rowsPerPage = 10;

    const pages = employees ? Math.ceil(employees?.length / rowsPerPage) : 1;

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return employees?.slice(start, end);
    }, [page, employees])

    const editEmployeeMutation = useMutation({
        mutationKey: ['currentEmployee'],
        mutationFn: (id: string | null) => getEmployeeById(id),
        onSuccess: (res) => {
            setEditCurrentEmployee(res)
        }
    })


    const editModalHandler = (id: string | null) => {
        editEmployeeMutation.mutate(id)
        setOpenEditEmployeeModal(true)
    }

    const deleteModalHandler = (id: string) => {
        setDeleteCurrentEmployee(id)
        setOpenDeleteEmployeeModal(true)
    }

    return (
        <div className="px-6 h-screen overflow-y-scroll">
            <div className="">
                <div className="sm:max-w-6xl xl:max-w-screen-2xl mx-auto mt-24 mb-4">
                    <h1 className="text-2xl font-regular">{t('Emloyees.title')}</h1>
                </div>
                <Table
                    shadow="none"
                    border={1}
                    className="sm:max-w-6xl xl:max-w-screen-2xl mx-auto border rounded-lg mb-8"
                    aria-label="Example static collection table"
                    bottomContent={
                        <div className="flex w-full justify-center">
                            <Pagination
                                showControls
                                showShadow
                                color="default"
                                page={page}
                                total={pages}
                                onChange={(page) => setPage(page)}
                            />
                        </div>
                    }>
                    <TableHeader>
                        <TableColumn className="text-center">#</TableColumn>
                        <TableColumn className="px-12 w-80">{t('Emloyees.table.phoneNumber')}</TableColumn>
                        <TableColumn className="w-80 px-12">{t('Emloyees.table.fullname')}</TableColumn>
                        <TableColumn className="px-5 w-56">{t('Emloyees.table.role')}</TableColumn>
                        <TableColumn className="w-64 text-center">{t('Emloyees.table.salary')}</TableColumn>
                        <TableColumn className="text-center">
                            <Button
                                onClick={() => setOpenAddEmployeeModal(true)}
                                className="my-2 bg-foreground text-gray-50 rounded-md"
                            >
                                {t('Emloyees.table.addButton')}
                            </Button>
                        </TableColumn>
                    </TableHeader>
                    <TableBody emptyContent={t('Emloyees.table.emptyContent')} items={items}>
                        {items?.map((employee: any, i: number) => (
                            <TableRow key={employee.id} className="border-b">
                                <TableCell
                                    className="font-medium text-gray-900 dark:text-white w-20 text-center"
                                >
                                    {i + 1}
                                </TableCell>
                                <TableCell className="px-8">
                                    +998 {employee?.phone_number}
                                </TableCell>
                                <TableCell className="text-base text-gray-900">
                                    {employee?.name}
                                </TableCell>
                                <TableCell className="text-base text-gray-900">
                                    {employee?.role}
                                </TableCell>
                                <TableCell className="text-base text-center text-gray-900">
                                    {employee?.salary} UZS
                                </TableCell>
                                <TableCell className="w-28">
                                    <div className="flex items-center gap-x-8">
                                        <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => editModalHandler(employee?.id)}>
                                            <svg
                                                aria-hidden="true"
                                                fill="none"
                                                focusable="false"
                                                height="1em"
                                                role="presentation"
                                                viewBox="0 0 20 20"
                                                width="1em"
                                            >
                                                <path
                                                    d="M11.05 3.00002L4.20835 10.2417C3.95002 10.5167 3.70002 11.0584 3.65002 11.4334L3.34169 14.1334C3.23335 15.1084 3.93335 15.775 4.90002 15.6084L7.58335 15.15C7.95835 15.0834 8.48335 14.8084 8.74168 14.525L15.5834 7.28335C16.7667 6.03335 17.3 4.60835 15.4583 2.86668C13.625 1.14168 12.2334 1.75002 11.05 3.00002Z"
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeMiterlimit={10}
                                                    strokeWidth={1.5}
                                                />
                                                <path
                                                    d="M9.90833 4.20831C10.2667 6.50831 12.1333 8.26665 14.45 8.49998"
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeMiterlimit={10}
                                                    strokeWidth={1.5}
                                                />
                                                <path
                                                    d="M2.5 18.3333H17.5"
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeMiterlimit={10}
                                                    strokeWidth={1.5}
                                                />
                                            </svg>
                                        </span>
                                        <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => deleteModalHandler(employee?.id)}>
                                            <svg
                                                aria-hidden="true"
                                                fill="none"
                                                focusable="false"
                                                height="1em"
                                                role="presentation"
                                                viewBox="0 0 20 20"
                                                width="1em"
                                            >
                                                <path
                                                    d="M17.5 4.98332C14.725 4.70832 11.9333 4.56665 9.15 4.56665C7.5 4.56665 5.85 4.64998 4.2 4.81665L2.5 4.98332"
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={1.5}
                                                />
                                                <path
                                                    d="M7.08331 4.14169L7.26665 3.05002C7.39998 2.25835 7.49998 1.66669 8.90831 1.66669H11.0916C12.5 1.66669 12.6083 2.29169 12.7333 3.05835L12.9166 4.14169"
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={1.5}
                                                />
                                                <path
                                                    d="M15.7084 7.61664L15.1667 16.0083C15.075 17.3166 15 18.3333 12.675 18.3333H7.32502C5.00002 18.3333 4.92502 17.3166 4.83335 16.0083L4.29169 7.61664"
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={1.5}
                                                />
                                                <path
                                                    d="M8.60834 13.75H11.3833"
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={1.5}
                                                />
                                                <path
                                                    d="M7.91669 10.4167H12.0834"
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={1.5}
                                                />
                                            </svg>
                                        </span>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
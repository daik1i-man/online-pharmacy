const express = require('express')
const employeesRouter = express.Router()
const { getAllEmployees, addEmployee, updateEmployee, deleteEmployee, getEmployeeById } = require('../../../Controllers/AdminControllers/Employees/Employees')

employeesRouter.get('/get-all', getAllEmployees)
employeesRouter.post('/add', addEmployee)
employeesRouter.post('/update', updateEmployee)
employeesRouter.get('/delete', deleteEmployee)
employeesRouter.get('/employee', getEmployeeById)


module.exports = employeesRouter;
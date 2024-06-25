const express = require('express')
const employeesRouter = express.Router()
const { getAllEmployees, addEmployee, updateEmployee, deleteEmployee } = require('../../../Controllers/AdminControllers/Employees/Employees')

employeesRouter.get('/get-all', getAllEmployees)
employeesRouter.post('/add', addEmployee)
employeesRouter.post('/update', updateEmployee)
employeesRouter.post('/delete', deleteEmployee)


module.exports = employeesRouter;
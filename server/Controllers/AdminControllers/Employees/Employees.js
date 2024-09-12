const db = require('../../../Database/config')
const { v4: uuidv4 } = require('uuid')

async function getAllEmployees(req, res) {
    try {
        const allEmployees = await db.query('SELECT * FROM employees')
        if (allEmployees.rows.length > 0) {
            res.status(200).json({
                message: "Employees retrived successfully",
                allEmployees: allEmployees.rows
            })
        } else {
            res.status(200).json({
                message: "The employees list is empty"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong"
        })
    }
}

async function addEmployee(req, res) {
    const { phoneNumber, name, role, salary } = req.body
    const id = uuidv4()

    try {
        const newEmployee = await db.query('INSERT INTO employees (phone_number, name, role, salary, id) VALUES ($1, $2, $3, $4, $5) RETURNING *', [phoneNumber, name, role, salary, id])
        res.status(200).json({
            message: "Employee added successully",
            employee: newEmployee.rows[0]
        })
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        })
    }
}

async function updateEmployee(req, res) {
    const { id, phoneNumber, name, role, salary } = req.body

    try {
        const updatedEmployee = await db.query('UPDATE employees SET phone_number = $1, name = $2, role = $3, salary = $4 WHERE id = $5 RETURNING *', [phoneNumber, name, role, salary, id])
        res.status(200).json({
            message: "Phone number updated successfully",
            updatedEmployee: updatedEmployee.rows[0]
        })
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        })
    }
}

async function deleteEmployee(req, res) {
    const { id } = req.query

    try {
        await db.query('DELETE FROM employees WHERE id = $1', [id])
        res.status(200).json({
            message: "Employee deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        })
    }
}

async function getEmployeeById(req, res) {
    const { id } = req.query

    try {
        const response = await db.query('SELECT * FROM employees WHERE id = $1', [id])

        if (response.rows.length < 0) {
            return res.status(404).send('Employee not found!')
        }

        return res.status(200).json({
            message: 'Employee datas fetched successfully!',
            employee: response.rows[0]
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

module.exports = {
    getAllEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployeeById
}
// app.js (trong ~/microservices/employee)
const express = require('express');
const app = express();
const port = 8080; // Cổng lắng nghe bên trong container vẫn là 8080

app.use(express.json());

let employees = [ // Thay đổi tên biến từ customers thành employees
    { id: 101, name: 'Charlie', department: 'HR' },
    { id: 102, name: 'Diana', department: 'IT' }
];

// Thay đổi các endpoint và logic từ /customers sang /employees
app.get('/employees', (req, res) => {
    res.json(employees);
});

app.get('/employees/:id', (req, res) => {
    const employee = employees.find(e => e.id === parseInt(req.params.id));
    if (!employee) return res.status(404).send('Employee not found'); // Thay đổi thông báo
    res.json(employee);
});

app.post('/employees', (req, res) => {
    const newEmployee = { id: employees.length + 101, ...req.body }; // Điều chỉnh ID hoặc logic thêm mới
    employees.push(newEmployee);
    res.status(201).json(newEmployee);
});

app.listen(port, () => {
    console.log(`Employee Service listening on port ${port}`); // Thay đổi thông báo
});

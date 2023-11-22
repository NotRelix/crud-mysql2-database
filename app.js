const express = require('express')
const app = express()
const port = 3000
const sql = require('mysql2')
app.use(express.json())

const conn = sql.createConnection({
    host: 'localhost',
    password: '',
    user: 'root',
    database: 'students'
})

app.get('/showStudents', (req, res) => {
    conn.query("SELECT * FROM student", (err, data) => {
        res.send(data)
    })
})

app.get('/showStudents/:id', (req, res) => {
    conn.query("SELECT * FROM student WHERE `id` = ?", [req.params.id], (err, data) => {
        res.send(data)
    })
})

app.post('/addStudent', (req, res) => {
    conn.query("INSERT INTO `student` (`name`, `age`) VALUES (?, ?)", [req.body.name, req.body.age], (err, data) => {
        res.send({message: "inserted successfully"})
    })
})

app.put('/updateStudent/:id', (req, res) =>{
    conn.query("UPDATE student SET name = ?, age = ? WHERE id = ?", [req.body.name, req.body.age, req.params.id], (err, data) => {
        res.send({message: "updated successfully"})
    })
})

app.delete('/deleteStudent/:id', (req, res) => {
    conn.query("DELETE FROM student WHERE id = ?", [req.params.id], (err, data) => {
        console.log(data)
        res.send({message: "deleted successfully"})
    })
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
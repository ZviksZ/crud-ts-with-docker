import express from 'express'
import db from './config/database.config'
import TodoValidator from './validator'
import Middleware from "./middleware";
import TodoController from "./controller";

db.sync().then(() => {
   console.log('connect to db')
})

const app = express()
const port = 9000

app.use(express.json())

app.post('/create',
   TodoValidator.checkCreateTodo(),
   Middleware.handleValidationError,
   TodoController.create
)

app.get('/read',
   TodoValidator.checkReadTodo(),
   Middleware.handleValidationError,
   TodoController.readPagination)

app.get('/read/:id',
   TodoValidator.checkIdParam(),
   Middleware.handleValidationError,
   TodoController.readById)

app.put('/update/:id',
   TodoValidator.checkIdParam(),
   Middleware.handleValidationError,
   TodoController.update)

app.delete('/delete/:id',
   TodoValidator.checkIdParam(),
   Middleware.handleValidationError,
   TodoController.delete)

app.listen(port, () => {
   console.log('Server is running on port ' + port)
})



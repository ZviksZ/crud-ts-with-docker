import express, {Request, Response} from 'express'
import db from './config/database.config'
import {v4 as uuidv4} from 'uuid'
import {TodoInstance} from "./model";
import TodoValidator from './validator'
import Middleware from "./middleware";

db.sync().then(() => {
   console.log('connect to db')
})

const app = express()
const port = 9000

app.use(express.json())

app.post('/create',
   TodoValidator.checkCreateTodo(),
   Middleware.handleValidationError,
   async (req: Request, res: Response) => {
      const id = uuidv4()
      
      try {
         const record = await TodoInstance.create({
            ...req.body, id
         })
         
         return res.json({record, msg: "Successfully create todo"})
      } catch (e) {
         return res.json({msg: "Fail to create", status: 500, route: "/create"})
      }
      
      
   })

app.get('/read', async (req: Request, res: Response) => {
   try {
      const records = await TodoInstance.findAll({where: {}})
      
      return res.json(records)
   } catch (e) {
      return res.json({msg: "Fail to read", status: 500, route: "/read"})
   }
})

app.listen(port, () => {
   console.log('Server is running on port ' + port)
})



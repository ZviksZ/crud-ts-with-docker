import {body, param, query} from 'express-validator'

class TodoValidator {
   checkCreateTodo() {
      return [
         body("id")
            .optional()
            .isUUID(4)
            .withMessage("The value should be UUID v4"),
         body("title")
            .notEmpty()
            .withMessage("The title value should not be empty"),
         body("completed")
            .optional()
            .isBoolean()
            .withMessage("The completed value should be boolean")
            .isIn([0, false])
            .withMessage("The value should be 0 or false")
      ]
   }
   
   checkReadTodo() {
      return [
         query("limit")
            .notEmpty()
            .withMessage("The query limit shouldn't be empty")
            .isInt({min: 1, max: 10})
            .withMessage("Value should be number and between 1-10"),
         query("offset")
            .optional()
            .isNumeric()
            .withMessage("Value should be a number")
      ]
   }
   
   checkIdParam() {
      return [
         param("id")
            .notEmpty()
            .withMessage("The value should be not empty")
            .isUUID(4)
            .withMessage("The value should be UUID v4"),
      ]
   }
}

export default new TodoValidator()

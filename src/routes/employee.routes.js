import express from "express";
import employeeController from "../controllers/employee.controller.js";

const router = express.Router();

router.post("/create", employeeController.createEmployee);
router.put("/update", employeeController.updateEmployee);
router.delete("/delete/:id", employeeController.deleteEmployee)
router.get("/details", employeeController.getEmployeeDetails)

export default router;

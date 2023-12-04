import express, { query } from "express";
import fs from "fs";
import PaymentController from "../controller/payment.controller.js";
const paymentController = new PaymentController()
const paymentRouter = express.Router();
paymentRouter.get("/", paymentController.getAllPayment);

paymentRouter.get("/user-payments",paymentController.getPaymentWhereCondition);

paymentRouter.get("/:id",paymentController.getPaymentById);

paymentRouter.post("/", paymentController.createPayment);

paymentRouter.put("/:id",paymentController.editPayment);

paymentRouter.delete("/:id",paymentController.deletePayment);

export default paymentRouter;

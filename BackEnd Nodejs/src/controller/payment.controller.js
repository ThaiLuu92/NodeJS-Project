import PaymentService from "../service/payment.service.js";
import { MSG_COMMON } from "../messages/index.js";
const paymentService = new PaymentService();

export default class PaymentController {
  async getAllPayment(req, res, next) {
    try {
      const ret = await paymentService.getPayment();
      res.status(200).json({message: MSG_COMMON.MSG_SUCCESS.read("Payment"),data: ret});
    } catch (error) {
      next(error);
    }
  }

  async getPaymentById(req, res, next) {
    try {
      const paymentId = req.params.id;
      const paymentData = await paymentService.getPaymentById(paymentId);
      if (paymentData) {
        res.status(200).json({message: MSG_COMMON.MSG_SUCCESS.read("Payment"),data: paymentData});
      } else {
        res
          .status(404)
          .json({ message: MSG_COMMON.MSG_ERROR.NotFoundException });
      }
    } catch (error) {
      next(error);
    }
  }

  async getPaymentWhereCondition(req, res, next) {
    try {
      const conditionData = req.query;
      const paymentData = await paymentService.getPaymentWhereCondition(conditionData);
      if (paymentData) {
        res.status(200).json({message: MSG_COMMON.MSG_SUCCESS.read("Payment"),data: paymentData});
      } else {
        res
          .status(404)
          .json({ message: MSG_COMMON.MSG_ERROR.NotFoundException });
      }
    } catch (error) {
      next(error);
    }
  }

  async createPayment(req, res, next) {
    const paymentData = req.body;
    try {
      const ret = await paymentService.createPayment(paymentData);
      res
        .status(201)
        .json({ message: MSG_COMMON.MSG_SUCCESS.create("Payment"),data: ret });
    } catch (error) {
      next(error);
    }
  }

  async deletePayment(req, res, next) {
    try {
      const paymentId = req.params.id;
      const deletedPayment = await paymentService.deletePayment(paymentId);
      if (deletedPayment) {
        res
          .status(200)
          .json({ message: MSG_COMMON.MSG_SUCCESS.delete("Payment"),data: deletedPayment});
      } else {
        res
          .status(404)
          .json({ message: MSG_COMMON.MSG_ERROR.NotFoundException });
      }
    } catch (error) {
      next(error);
    }
  }

  async editPayment(req, res, next) {
    const paymentId = req.params.id;
    const updatedData = req.body;
    try {
      const ret = await paymentService.editPayment(paymentId, updatedData);
      res
        .status(200)
        .json({ message: MSG_COMMON.MSG_SUCCESS.update("Payment"),data:ret});
    } catch (error) {
      next(error);
    }
  }
}
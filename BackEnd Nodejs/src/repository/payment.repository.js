import { getData, insertData, deleteData, editData, getDataById, getDataWhereCondition} from "../../utils/data.util.js";
import Payment from "../models/payment.mode.js";
import PaymentView from "../models/paymentView.mode.js";


export default class PaymentRepository {
    async getPayment() {
      try {
        const paymentData = await getData(PaymentView);
        return paymentData;
      } catch (error) {
        throw error;
      }
    }

    async getDataWherePaymentView(conditions) {
      try {
        const paymentData = await getDataWhereCondition(PaymentView,conditions);
        return paymentData;
      } catch (error) {
        throw error;
      }
    }

    async getDataWhereCondition(conditions) {
      try {
        const paymentData = await getDataWhereCondition(Payment,conditions);
        return paymentData;
      } catch (error) {
        throw error;
      }
    }

    async getPaymentById(id) {
      try {
        const paymentById = await getDataById(PaymentView, id);
        return paymentById;
      } catch (error) {
        throw error;
      }
    }



    async createPayment(data) {
      try {
        const newPayment = await insertData(Payment, data);
        return newPayment;
      } catch (error) {
        throw error;
      }
    }
  
    async deletePayment(id) {
      try {
        const deletePayment = await deleteData(Payment, id);
        return deletePayment;
      } catch (error) {
        throw error;
      }
    }
    async editPayment(id, item) {
     try {
      const editPayment = await editData(Payment, id, item);
      return editPayment;
     } catch (error) {
      throw error;
     }
    }
  }
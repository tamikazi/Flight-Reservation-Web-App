class PaymentModel {
    paymentId: number;
    userId: number;
    date: string;
    amount: number;

    constructor(paymentId: number, userId: number, date: string, amount: number) {
        this.paymentId = paymentId;
        this.userId = userId;
        this.date = date;
        this.amount = amount;
    }
}

export default PaymentModel;
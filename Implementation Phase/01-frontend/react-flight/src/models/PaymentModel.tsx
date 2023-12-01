class PaymentModel {
    paymentID?: number;
    userID: number;
    payDate: string;
    amount: number;

    constructor(paymentID: number, userID: number, payDate: string, amount: number) {
        this.paymentID = paymentID;
        this.userID = userID;
        this.payDate = payDate;
        this.amount = amount;
    }
}

export default PaymentModel;
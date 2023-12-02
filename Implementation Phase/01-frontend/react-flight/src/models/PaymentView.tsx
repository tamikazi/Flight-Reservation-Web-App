class PaymentView {
    paymentID?: number;
    userID: number;
    payDate: string;
    amount: number;

    constructor(userID: number, payDate: string, amount: number) {
        this.userID = userID;
        this.payDate = payDate;
        this.amount = amount;
    }
}

export default PaymentView;
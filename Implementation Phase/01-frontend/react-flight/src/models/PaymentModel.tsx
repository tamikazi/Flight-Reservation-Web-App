class PaymentModel {
    userId: number;
    date: string;
    amount: number;

    constructor(userId: number, date: string, amount: number) {
        this.userId = userId;
        this.date = date;
        this.amount = amount;
    }
}

export default PaymentModel;
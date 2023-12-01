class CheckoutSeatModel {
    seatId: number;
    seatNumber: string;
    name: string;
    price: number;

    constructor(seatId: number, seatNumber: string, price: number) {
        this.seatId = seatId;
        this.seatNumber = seatNumber;
        this.name = '';
        this.price = price;
    }
}

export default CheckoutSeatModel;
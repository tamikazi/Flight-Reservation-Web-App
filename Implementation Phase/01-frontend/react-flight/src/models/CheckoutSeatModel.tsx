class CheckoutSeatModel {
    seatId: number;
    seatNumber: string;
    name?: string;

    constructor(seatId: number, seatNumber: string) {
        this.seatId = seatId;
        this.seatNumber = seatNumber;
    }
}

export default CheckoutSeatModel;
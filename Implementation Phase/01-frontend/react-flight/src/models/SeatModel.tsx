class SeatModel {
    seatId: number;
    seatNumber: string;
    seatClass: string;
    available: boolean;
    price: number;

    constructor(seatId: number, seatNumber: string, seatClass: string, available: boolean, price: number) {
        this.seatId = seatId;
        this.seatNumber = seatNumber;
        this.seatClass = seatClass;
        this.available = available;
        this.price = price;
    }
}

export default SeatModel;
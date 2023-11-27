class SeatModel {
    seatId: number;
    seatNumber: string;
    seatClass: string;
    available: boolean;

    constructor(seatId: number, seatNumber: string, seatClass: string, available: boolean) {
        this.seatId = seatId;
        this.seatNumber = seatNumber;
        this.seatClass = seatClass;
        this.available = available;
    }
}

export default SeatModel;
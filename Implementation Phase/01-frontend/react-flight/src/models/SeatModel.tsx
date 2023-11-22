class SeatModel {
    seatId: number;
    code: string;
    passenger: string;

    constructor(seatId: number, code: string, available: boolean, passenger: string) {
        this.seatId = seatId;
        this.code = code;
        this.passenger = passenger;
    }
}

export default SeatModel;
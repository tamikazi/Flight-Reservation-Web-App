class SeatModel {
    seatId: number;
    code: string;
    available: boolean;
    flightId: number;

    constructor(seatId: number, code: string, available: boolean, flightId: number) {
        this.seatId = seatId;
        this.code = code;
        this.available = available;
        this.flightId = flightId;
    }
}

export default SeatModel;
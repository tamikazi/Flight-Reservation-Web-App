class SeatModel {
    seatId: number;
    code: string;
    available: boolean;
    aircraftId: number;

    constructor(seatId: number, code: string, available: boolean, aircraftId: number) {
        this.seatId = seatId;
        this.code = code;
        this.available = available;
        this.aircraftId = aircraftId;
    }
}

export default SeatModel;
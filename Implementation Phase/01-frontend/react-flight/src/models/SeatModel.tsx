class SeatModel {
    seatId: number;
    code: string;
    available: boolean;
    aircraftId: string;

    constructor(seatId: number, code: string, available: boolean, aircraftId: string) {
        this.seatId = seatId;
        this.code = code;
        this.available = available;
        this.aircraftId = aircraftId;
    }
}

export default SeatModel;
class SeatModel {
    seatId: number;
    aircraftID: number;
    seatNumber: string;
    seatClass: string;

    constructor(seatId: number, aircraftID: number, seatNumber: string, seatClass: string) {
        this.seatId = seatId;
        this.aircraftID = aircraftID;
        this.seatNumber = seatNumber;
        this.seatClass = seatClass;
    }
}

export default SeatModel;
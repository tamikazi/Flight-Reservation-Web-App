class BookingModel {
    ticketId: number;
    code: string;
    origin: string;
    destination: string;
    date: string;
    seatName: string;
    passengerName: string;
    insurance: boolean;

    constructor(ticketId: number, code: string, origin: string, destination: string, date: string, seatName: string, passengerName: string, insurance: boolean) {
        this.ticketId = ticketId;
        this.code = code;
        this.origin = origin;
        this.destination = destination;
        this.date = date;
        this.seatName = seatName;
        this.passengerName = passengerName;
        this.insurance = insurance;
    }
}

export default BookingModel;
class BookingView {
    ticketId: number;
    code: string;
    origin: string;
    destination: string;
    date: string;
    seatNumber: string;
    name: string;
    insurance: boolean;

    constructor(ticketId: number, code: string, origin: string, destination: string, date: string, seatNumber: string, name: string, insurance: boolean) {
        this.ticketId = ticketId;
        this.code = code;
        this.origin = origin;
        this.destination = destination;
        this.date = date;
        this.seatNumber = seatNumber;
        this.name = name;
        this.insurance = insurance;
    }
}

export default BookingView;
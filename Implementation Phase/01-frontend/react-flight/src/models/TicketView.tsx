class TicketView {
    ticketId: number;
    seatID: number;
    flightID: number;
    userID: number;
    insurance: boolean;
    name: string;
    price: number;

    constructor(ticketID: number, seatID: number, flightID: number, userID: number, insurance: boolean,
                name: string, price: number) {
        this.ticketId = ticketID;
        this.seatID = seatID;
        this.flightID = flightID;
        this.userID = userID;
        this.insurance = insurance;
        this.name = name;
        this.price = price;
    }
}

export default TicketView;
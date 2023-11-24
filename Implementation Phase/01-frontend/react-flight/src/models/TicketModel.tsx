class TicketModel {
    ticketId: number;
    seatID: number;
    flightID: number;
    userID: number;
    insurance: boolean;

    constructor(ticketID: number, seatID: number, flightID: number, userID: number, insurance: boolean) {
        this.ticketId = ticketID;
        this.seatID = seatID;
        this.flightID = flightID;
        this.userID = userID;
        this.insurance = insurance;
    }
}

export default TicketModel;
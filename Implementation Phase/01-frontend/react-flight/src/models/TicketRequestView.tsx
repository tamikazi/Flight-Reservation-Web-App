class TicketRequestView {
    seatID: number;
    flightID: string;
    userID: number;
    name: string;
    price: number;
    insurance: boolean;

    constructor(seatID: number, flightID: string, userID: number, name: string, price: number, insurance: boolean) {
        this.seatID = seatID;
        this.flightID = flightID;
        this.userID = userID;
        this.name = name;
        this.price = price;
        this.insurance = insurance;
    }
}

export default TicketRequestView;
class TicketRequestView {
    seatID: number;
    flightID: string;
    userID: number;
    name: string;
    price: number;
    insurance: boolean;
    email: string;

    constructor(seatID: number, flightID: string, userID: number, name: string, price: number, insurance: boolean,
                email: string) {
        this.seatID = seatID;
        this.flightID = flightID;
        this.userID = userID;
        this.name = name;
        this.price = price;
        this.insurance = insurance;
        this.email = email;
    }
}

export default TicketRequestView;
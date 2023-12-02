class FlightRequestView {
    code: string;
    origin: string;
    destination: string;
    date: string;
    time: string;
    aircraft: string;
    price: number;

    constructor(code: string, origin: string, destination: string,
                date: string, time: string, aircraft: string, price: number) {
        this.code = code;
        this.origin = origin;
        this.destination = destination;
        this.date = date;
        this.time = time;
        this.aircraft = aircraft;
        this.price = price;
    }
}

export default FlightRequestView;
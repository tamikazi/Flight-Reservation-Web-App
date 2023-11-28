class FlightModel {
    flightId: string;
    code: string;
    origin: string;
    destination: string;
    date: string;
    time: string;
    aircraft: string;
    price: number;
  
    constructor(flightId: string, code: string, origin: string, destination: string,
                date: string, time: string, aircraft: string, price: number) {
        this.flightId = flightId;
        this.code = code;
        this.origin = origin;
        this.destination = destination;
        this.date = date;
        this.time = time;
        this.aircraft = aircraft;
        this.price = price;
    }
}

export default FlightModel;
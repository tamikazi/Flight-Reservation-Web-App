class FlightModel {
    flightId: number;
    code: string;
    origin: string;
    destination: string;
    date: string;
    aircraft: string;

    constructor(flightId: number, code: string, origin: string, destination: string, date: string, aircraft: string) {
        this.flightId = flightId;
        this.code = code;
        this.origin = origin;
        this.destination = destination;
        this.date = date;
        this.aircraft = aircraft;
    }
}

export default FlightModel;
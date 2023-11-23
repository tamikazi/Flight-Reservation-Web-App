class FlightModel {
    flightID: number;
    code: string;
    origin: string;
    destination: string;
    date: string;
    time: string;
    aircraft: number;


    constructor(flightID: number, code: string, origin: string, destination: string,
                date: string, time: string, aircraft: number) {
        this.flightID = flightID;
        this.code = code;
        this.origin = origin;
        this.destination = destination;
        this.date = date;
        this.time = time;
        this.aircraft = aircraft;
    }
}

export default FlightModel;
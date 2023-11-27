class FlightModel {
    flightId: string;
    code: string;
    origin: string;
    destination: string;
    date: string;
    time: string;
    aircraft: string;

  
    constructor(flightId: string, code: string, origin: string, destination: string,
                date: string, time: string, aircraft: string) {
        this.flightId = flightId;
        this.code = code;
        this.origin = origin;
        this.destination = destination;
        this.date = date;
        this.time = time;
        this.aircraft = aircraft;
    }
}

export default FlightModel;
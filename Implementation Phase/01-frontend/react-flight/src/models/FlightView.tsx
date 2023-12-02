class FlightView {
    flightID: string;
    code: string;
    origin: string;
    destination: string;
    date: string;
    time: string;
    aircraftID: string;
    basePrice: number;
  
    constructor(flightID: string, code: string, origin: string, destination: string,
                date: string, time: string, aircraftID: string, basePrice: number) {
        this.flightID = flightID;
        this.code = code;
        this.origin = origin;
        this.destination = destination;
        this.date = date;
        this.time = time;
        this.aircraftID = aircraftID;
        this.basePrice = basePrice;
    }
}

export default FlightView;
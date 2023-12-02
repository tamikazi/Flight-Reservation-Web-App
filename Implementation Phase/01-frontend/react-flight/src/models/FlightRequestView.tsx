class FlightRequestView {
    code: string;
    origin: string;
    destination: string;
    date: string;
    time: string;
    aircraftID: string;
    basePrice: number;

    constructor(code: string, origin: string, destination: string,
                date: string, time: string, aircraftID: string, basePrice: number) {
        this.code = code;
        this.origin = origin;
        this.destination = destination;
        this.date = date;
        this.time = time;
        this.aircraftID = aircraftID;
        this.basePrice = basePrice;
    }
}

export default FlightRequestView;
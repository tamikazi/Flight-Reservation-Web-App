class SearchModel {
    origin: string;
    destination: string;
    date: string;
    guests: string;

    constructor(origin: string, destination: string, date: string, guests: string) {
        this.origin = origin;
        this.destination = destination;
        this.date = date;
        this.guests = guests;
    }
}

export default SearchModel;
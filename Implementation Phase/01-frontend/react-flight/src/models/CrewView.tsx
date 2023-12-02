class CrewView {
    userID: number;
    flightID: number;
    name: string;

    constructor(userID: number, flightID: number, name: string) {
        this.userID = userID;
        this.flightID = flightID;
        this.name = name;
    }
}
export default CrewView;
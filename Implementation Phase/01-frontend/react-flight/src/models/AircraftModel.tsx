class AircraftModel {
    aircraftID: number;
    model: string;
    numCols: number;
    numRows: number;

    constructor(aircraftID: number, model: string, numCols: number, numRows: number) {
        this.aircraftID = aircraftID;
        this.model = model;
        this.numCols = numCols;
        this.numRows = numRows;
    }
}

export default AircraftModel;
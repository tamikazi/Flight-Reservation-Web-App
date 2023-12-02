class AircraftRequestView {
    model: string;
    numCols: number;
    numRows: number;

    constructor(model: string, numCols: number, numRows: number) {
        this.model = model;
        this.numCols = numCols;
        this.numRows = numRows;
    }
}

export default AircraftRequestView;
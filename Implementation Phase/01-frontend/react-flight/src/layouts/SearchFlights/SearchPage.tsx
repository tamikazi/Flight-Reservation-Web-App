export const SearchPage = () => {
    return (
        <div className='container mt-5 mb-5'>
                <div className=''>
                    <form>
                        <div className='row g-3'>
                            <div className='col-12'>
                                <label htmlFor='code' className='form-label'>From</label>
                                <input type='text' className='form-control' id='from'/>
                            </div>
                            <div className='col-12'>
                                <label htmlFor='code' className='form-label'>Going to</label>
                                <input type='text' className='form-control' id='to'/>
                            </div>
                            <div className='col-12'>
                                <label htmlFor='date' className='form-label'>Departure Date</label>
                                <input type='date' className='form-control' id='date'/>
                            </div>
                            <div className='col-12'>
                                <label htmlFor='origin' className='form-label'>Number of Guests</label>
                                <input type='number' className='form-control' id='guests'/>
                            </div>
                            <button className='btn btn-primary mx-5' type='button'>
                                Search Flights
                            </button>
                            {/*<div className='col d-flex'>*/}
                            {/*    <button className='btn btn-primary flex-fill mx-5' type='button'>*/}
                            {/*        Add*/}
                            {/*    </button>*/}
                            {/*    <button className='btn btn-primary flex-fill mx-5' type='button'>*/}
                            {/*        Update*/}
                            {/*    </button>*/}
                            {/*    <button className='btn btn-primary flex-fill mx-5' type='button'>*/}
                            {/*        Delete Flight*/}
                            {/*    </button>*/}
                            {/*</div>*/}
                        </div>
                    </form>
                </div>
        </div>
    );
};
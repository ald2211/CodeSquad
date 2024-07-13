import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const FilterBox = ({ setSearch }) => {
    const { currentUser } = useSelector((state) => state.user);
    const [showHourlyInputs, setShowHourlyInputs] = useState(false);
    const [showFixedInputs, setShowFixedInputs] = useState(false);
    const [hourlyFrom, setHourlyFrom] = useState('');
    const [hourlyTo, setHourlyTo] = useState('');
    const [fixedFrom, setFixedFrom] = useState('');
    const [fixedTo, setFixedTo] = useState('');

    const handleHourlyCheckboxChange = () => {
        setShowHourlyInputs(!showHourlyInputs);
        setShowFixedInputs(false); // Ensure only one type of input is shown
    };

    const handleFixedCheckboxChange = () => {
        setShowFixedInputs(!showFixedInputs);
        setShowHourlyInputs(false); // Ensure only one type of input is shown
    };

    const handleSearch = () => {
        // Prepare search criteria based on inputs
        let searchCriteria = '';

        if (showHourlyInputs) {
            searchCriteria += `hourly--${hourlyFrom}--${hourlyTo}`;
        }

        if (showFixedInputs) {
            searchCriteria += `fixed--${fixedFrom}--${fixedTo}`;
        }

        // Trim the trailing '&' if any
        searchCriteria = searchCriteria.replace(/&$/, '');

        // Pass search criteria to parent component
        setSearch(searchCriteria);
    };

    return (
        <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Filter</h2>
            <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">{currentUser.data.role === 'developer' ? 'Project' : 'Payment'} Type</h3>
                <div className="flex items-center mb-2">
                    <input
                        type="checkbox"
                        id="hourly"
                        className="mr-2"
                        onChange={handleHourlyCheckboxChange}
                        checked={showHourlyInputs}
                    />
                    <label htmlFor="hourly">Hourly Rate</label>
                </div>
                {showHourlyInputs && (
                    <div className="flex items-center">
                        <input
                            type="number"
                            placeholder="From"
                            className="w-1/2 p-2 border rounded"
                            value={hourlyFrom}
                            onChange={(e) => setHourlyFrom(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="To"
                            className="w-1/2 ml-2 p-2 border rounded"
                            value={hourlyTo}
                            onChange={(e) => setHourlyTo(e.target.value)}
                        />
                    </div>
                )}
                <div className="flex items-center mt-2 mb-2">
                    <input
                        type="checkbox"
                        id="fixed"
                        className="mr-2"
                        onChange={handleFixedCheckboxChange}
                        checked={showFixedInputs}
                    />
                    <label htmlFor="fixed">Fixed Rate</label>
                </div>
                {showFixedInputs && (
                    <div className="flex items-center">
                        <input
                            type="number"
                            placeholder="From"
                            className="w-1/2 p-2 border rounded"
                            value={fixedFrom}
                            onChange={(e) => setFixedFrom(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="To"
                            className="w-1/2 ml-2 p-2 border rounded"
                            value={fixedTo}
                            onChange={(e) => setFixedTo(e.target.value)}
                        />
                    </div>
                )}
                <button
                    onClick={handleSearch}
                    className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                >
                    Apply Filters
                </button>
            </div>
        </div>
    );
};

export default FilterBox;

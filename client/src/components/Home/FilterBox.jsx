import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FaFilter } from "react-icons/fa6";

const FilterBox = ({ setSearch, setSort }) => {
    const { currentUser } = useSelector((state) => state.user);
    const [showHourlyInputs, setShowHourlyInputs] = useState(false);
    const [showFixedInputs, setShowFixedInputs] = useState(false);
    const [hourlyFrom, setHourlyFrom] = useState('');
    const [hourlyTo, setHourlyTo] = useState('');
    const [fixedFrom, setFixedFrom] = useState('');
    const [fixedTo, setFixedTo] = useState('');

    const [sortByPrice, setSortByPrice] = useState(false);
    const [sortByRecent, setSortByRecent] = useState(false);

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
            searchCriteria += `hourly--${hourlyFrom}--${hourlyTo}&`;
        }

        if (showFixedInputs) {
            searchCriteria += `fixed--${fixedFrom}--${fixedTo}&`;
        }
        searchCriteria = searchCriteria.replace(/&$/, '');

        setSearch(searchCriteria);
    };

    const handleSort = () => {
        let sortCriteria = '';

        if (sortByPrice) {
            sortCriteria += 'price--';
        }

        if (sortByRecent) {
            sortCriteria += 'recent--';
        }

        // Trim the trailing '--' if any
        sortCriteria = sortCriteria.replace(/--$/, '');

        setSort(sortCriteria);
    };

    useEffect(() => {
        handleSort();
    }, [sortByPrice, sortByRecent]);

    return (
        <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-bold mb-4 flex"><FaFilter className='w-5 h-5 mt-[5px] mr-2' />Filters</h2>
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

            <h3 className="text-lg font-semibold mb-2">Sort by</h3>
            <div className="mb-4">
                <div className="flex items-center mb-2">
                    <input
                        type="checkbox"
                        id="sortByPrice"
                        className="mr-2"
                        onChange={() => setSortByPrice(!sortByPrice)}
                        checked={sortByPrice}
                    />
                    <label htmlFor="sortByPrice">Price (Higher to Lower)</label>
                </div>
                <div className="flex items-center mb-2">
                    <input
                        type="checkbox"
                        id="sortByRecent"
                        className="mr-2"
                        onChange={() => setSortByRecent(!sortByRecent)}
                        checked={sortByRecent}
                    />
                    <label htmlFor="sortByRecent">Recent</label>
                </div>
            </div>
        </div>
    );
};

export default FilterBox;

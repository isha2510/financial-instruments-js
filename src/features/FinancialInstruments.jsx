import { useEffect, useMemo, useState } from 'react';
import { priceColor, setBackgroundColor, sortByAssetClass, sortData } from '../utils/utility';
import './financialInstruments.css';
import { getData } from '../services/DataService';
import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-balham.css"; // Optional Theme applied to the grid


const ShowFinancialInstruments = () => {
    const [rowData, setRowData] = useState([]);
    const [colDefs, setColDefs] = useState([
        { field: "ticker", flex: 1, sortingOrder: ['asc', null] },
        { field: "price", flex: 1, sortingOrder: ['desc', null], cellStyle: priceColor },
        { field: "assetClass", flex: 1, comparator: sortByAssetClass }
    ]);

    const gridOptions = {
        getRowClass: setBackgroundColor,
        suppressRowHoverHighlight: true
    }

    useEffect(() => {
        let data = getData();
        setRowData(data);
    }, []);



    return (
        // wrapping container with theme & size
        <div className='container'>
            <div
                className="ag-theme-balham default-grid-size" // applying the grid theme
            // the grid will fill the size of the parent container
            >
                <AgGridReact
                    rowData={rowData}
                    columnDefs={colDefs}
                    gridOptions={gridOptions}
                />
            </div>
        </div>
    )
}

export default ShowFinancialInstruments;
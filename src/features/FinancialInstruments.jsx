import { useCallback, useEffect, useMemo, useState } from 'react';
import { priceColor, setBackgroundColor, sortByAssetClass, sortData } from '../utils/utility';
import './financialInstruments.css';
import { getData } from '../services/DataService';
import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-balham.css"; // Optional Theme applied to the grid


const ShowFinancialInstruments = () => {
    const [rowData, setRowData] = useState([]);
    const [colDefs, setColDefs] = useState([
        { field: "ticker", sortingOrder: ['asc', null] },
        { field: "price", sortingOrder: ['desc', null], cellStyle: priceColor },
        { field: "assetClass", comparator: sortByAssetClass }
    ]);

    const defaultColDef = useMemo(() => {
        return {
            flex: 1
        }
    }, [])

    const onGridReady = useCallback(() => {
        let data = getData();
        setRowData(data);
    }, []);

    const paginationPageSizeSelector = useMemo(() => {
        return [10, 15, 20];
    }, []);



    return (
        // wrapping container with theme & size
        <div className='container'>
            <div className="ag-theme-balham default-grid-size">
                <AgGridReact
                    rowData={rowData}
                    columnDefs={colDefs}
                    defaultColDef={defaultColDef}
                    pagination={true}
                    onGridReady={onGridReady}
                    getRowClass={setBackgroundColor}
                    suppressRowHoverHighlight={true}
                    paginationPageSize={10}
                    paginationPageSizeSelector={paginationPageSizeSelector}
                />
            </div>

        </div >
    )
}

export default ShowFinancialInstruments;
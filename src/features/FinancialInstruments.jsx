import { useEffect, useState } from 'react';
import { sortData } from '../utils/utility';
import { Button } from '../components/Button/Button';
import './financialInstruments.css';
import { getData } from '../services/DataService';
import { Pagination } from '../components/Pagination/Pagination';

const ShowFinancialInstruments = () => {
    const [financialInstrumentsData, setFinancialInstrumentsData] = useState([]);
    const [currentPage, setCurrentpage] = useState(1);
    let recordsPerPage = 5;
    let filteredData = [];
    const endIndex = recordsPerPage * currentPage;
    const startIndex = endIndex - recordsPerPage;
    const headers = [{ key: 'ticker', lable: 'Ticker' },
    { key: 'price', lable: 'Price' },
    { key: 'assetClass', lable: 'Asset Class' }]
    

    useEffect(() => {
        let data = getData();
        setFinancialInstrumentsData(data);
    }, []);

    
    
    if (financialInstrumentsData.length > 0) {
        filteredData = financialInstrumentsData.slice(startIndex, endIndex);
    }

    const handleClick = (key) => {
        setFinancialInstrumentsData(sortData(key, financialInstrumentsData));
    }

    const handlePageChange = (pageNumber) => {
        setCurrentpage(pageNumber);

    }

    return (
        <>
            {(financialInstrumentsData && financialInstrumentsData.length > 0) ?
                <div className='instruments'>
                    <table>
                        <thead>
                            <tr>
                                {headers.map((row) => {
                                    return <th key={row.key}>{row.lable}
                                        <Button
                                            onClick={() => handleClick(row.key)}
                                            icon={'▲'}
                                            className='sort'
                                        /></th>
                                })}
                            </tr>
                        </thead>
                        <tbody>

                            {filteredData.map((row) => {
                                return (
                                    <tr key={row.ticker} className={row.assetClass.toLowerCase()}>
                                        <td data-testid="ticker">{row.ticker}</td>
                                        <td className={row.price > 0 ? 'positivePrice' : 'negativePrice'} data-testid="price">{row.price}</td>
                                        <td data-testid="assetClass">{row.assetClass}</td>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </table>
                    <Pagination currentPage={currentPage}
                        totalRecords={financialInstrumentsData.length}
                        handlePageChange={handlePageChange}
                        recordsPerPage={recordsPerPage} />
                </div>
                : <div>
                    <span data-testid="noData">No Instruments available</span></div>
            }
        </>
    )

}

export default ShowFinancialInstruments;
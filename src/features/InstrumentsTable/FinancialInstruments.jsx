import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '../../components/Button/Button';
import { Pagination } from '../../components/Pagination/Pagination';
import { Search } from '../../components/Search/Search';
import { sortData } from '../../utils/utility';
import './financialInstruments.css';

const ShowFinancialInstruments = () => {
    const data = useSelector((state) => state.instruments.instruments);
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
        setFinancialInstrumentsData(data);
    }, [data]);


    if (financialInstrumentsData.length > 0) {
        filteredData = financialInstrumentsData.slice(startIndex, endIndex);
    }

    const handleClick = (key) => {
        setFinancialInstrumentsData(sortData(key, financialInstrumentsData));
    }

    const handlePageChange = (pageNumber) => {
        setCurrentpage(pageNumber);

    }

    const handleSearchText = (searchText) => {
        if (searchText.length === 0) {
            setFinancialInstrumentsData(data);
        } else {
            searchText = searchText.toLowerCase();
            const filtteredArray = financialInstrumentsData.filter((val) => {
                const value = Object.values(val).join(",");
                return value.toLowerCase().includes(searchText);
            });
            //const filtteredArray = financialInstrumentsData.filter((val) => val.assetClass.toLowerCase().includes(searchText) || val.price.toString().includes(searchText) || val.ticker.toLowerCase().includes(searchText));
            setFinancialInstrumentsData(filtteredArray);
        }
    }

    return (
        <>
            {(financialInstrumentsData && financialInstrumentsData.length > 0) ?
                <div className='instruments'>
                    <Search searchText={handleSearchText} />
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
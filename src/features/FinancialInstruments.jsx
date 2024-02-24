import { useEffect, useState } from 'react';
import { sortData } from '../utils/utility';
import { SortButton } from '../components/Button';
import './financialInstruments.css';
import { getData } from '../services/DataService';

const ShowFinancialInstruments = () => {
    const [financialInstrumentsData, setFinancialInstrumentsData] = useState([]);
    const headers = [{ key: 'ticker', lable: 'Ticker' },
    { key: 'price', lable: 'Price' },
    { key: 'assetClass', lable: 'Asset Class' }]
    useEffect(() => {
        let data=getData();
        setFinancialInstrumentsData(data)
    }, []);

    const handleClick = (key) => {
        setFinancialInstrumentsData(sortData(key, financialInstrumentsData));
    }

    return (
        <>
            {(financialInstrumentsData && financialInstrumentsData.length > 0) ?
                <table>
                    <thead>
                        <tr>
                            {headers.map((row) => {
                                return <th key={row.key}>{row.lable}
                                    <SortButton
                                        onClick={() => handleClick(row.key)}
                                    /></th>
                            })}
                        </tr>
                    </thead>
                    <tbody>

                        {financialInstrumentsData.map((row) => {
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
                : <div>
                    <span data-testid="noData">No Instruments available</span></div>}
        </>
    )

}

export default ShowFinancialInstruments;
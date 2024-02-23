import { useEffect, useState } from 'react';
import data from '../utils/data.json';
import { sortData } from '../utils/utility';
import { SortButton } from '../components/Button';
import './financialInstruments.css';

const ShowFinancialInstruments = () => {
    const [financialInstrumentsData, setFinancialInstrumentsData] = useState([]);
    const headers = [{ key: 'ticker', lable: 'Ticker' },
    { key: 'price', lable: 'Price' },
    { key: 'assetClass', lable: 'Asset Class' }]
    useEffect(() => {
        setFinancialInstrumentsData(data)
    }, []);

    const handleClick=(key)=>{
        setFinancialInstrumentsData(sortData(key,financialInstrumentsData));
    }

    return (
        <table>
            <thead>
                <tr>
                    {headers.map((row) => {
                        return <th key={row.key}>{row.lable} 
                        <SortButton
                        key={row.key}
                        onClick={() => handleClick(row.key)}
                      /></th>
                    })}
                </tr>
            </thead>
            <tbody>

                {financialInstrumentsData.map((row) => {
                    return (
                        <tr key={row.ticker} className={row.assetClass}>
                            <td>{row.ticker}</td>
                            <td className={row.price>0?'positivePrice':'negativePrice'}>{row.price}</td>
                            <td>{row.assetClass}</td>
                        </tr>
                    )
                })}

            </tbody>
        </table>
    )

}

export default ShowFinancialInstruments;
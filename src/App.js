import { useEffect } from 'react';
import './App.css';
import ShowFinancialInstruments from './features/InstrumentsTable/FinancialInstruments';
import { useDispatch } from 'react-redux';
import { fetchInstruments } from './features/InstrumentsTable/FinancialInstrumentsSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchInstruments());
  }, [dispatch]);

  return (
    <div className="App">
      <div className="header"><h3>Financial Instruments</h3></div>
      <ShowFinancialInstruments />
    </div>
  );
}

export default App;

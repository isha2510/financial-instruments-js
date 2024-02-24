import { fireEvent, render, screen, within } from "@testing-library/react"
import ShowFinancialInstruments from "../features/FinancialInstruments"
import * as dataservice from "../services/DataService";


describe('Test FinancialInstrument component', () => {
    const setup = () => {
        render(<ShowFinancialInstruments />);
        const ticker = screen.getByRole('columnheader', { name: /ticker/i });
        const price = screen.getByRole('columnheader', { name: /price/i });
        const assetClass = screen.getByRole('columnheader', { name: /asset class/i });
        return { ticker, price, assetClass };
    };
    test('the table has 3 column headers', () => {
        const { ticker, price, assetClass } = setup();
        expect(ticker).toBeInTheDocument();
        expect(price).toBeInTheDocument();
        expect(assetClass).toBeInTheDocument();
        //screen.logTestingPlaygroundURL();
    });

    test('the price column is sorted in descending order', () => {
        const { price } = setup();
        const sortButton = within(price).getByRole('button', {
            name: /▲/i
        });
        fireEvent.click(sortButton);
        const priceCells = screen.getAllByTestId(/price/i);
        const priceValues = priceCells.map((cell) => cell.textContent);
        expect(priceValues).toEqual(['3791.37', '3150.67', '-3591.47']);
    });

    test('the ticker column is sorted in alphabetical order', () => {
        const { ticker } = setup();
        const sortButton = within(ticker).getByRole('button', {
            name: /▲/i
        });
        fireEvent.click(sortButton);
        const tickerCells = screen.getAllByTestId(/ticker/i);
        const tickerValues = tickerCells.map((cell) => cell.textContent);
        expect(tickerValues).toEqual(['ALPHA', 'BETA', 'GAMA']);
    });

    test('the assetclass column is sorted', () => {
        const { assetClass } = setup();
        const sortButton = within(assetClass).getByRole('button', {
            name: /▲/i
        });
        fireEvent.click(sortButton);
        const assetCells = screen.getAllByTestId(/assetclass/i);
        const assetValues = assetCells.map((cell) => cell.textContent);
        expect(assetValues).toEqual(['Commodities', 'Equities', 'Credit']);
    });

    test('renders "No Instruments available" message when the data is empty', () => {
        const mock = jest.spyOn(dataservice, 'getData');
        mock.mockReturnValue([]);
        render(<ShowFinancialInstruments />)
        // screen.logTestingPlaygroundURL();
        const message = screen.getByText(/no instruments available/i)
        expect(message).toBeInTheDocument();
    });

    test('renders price class "negativePrice" when price is negative', () => {
        jest.spyOn(dataservice, 'getData').mockReturnValue([
            { ticker: 'ABC', price: -100, assetClass: 'Equities' }
        ]);
        render(<ShowFinancialInstruments />);
        const priceElement = screen.getByRole('cell', {
            name: /\-100/i
        })
        expect(priceElement).toHaveClass('negativePrice');

    });

    test('renders price class "positivePrice" when price is positive', () => {
        jest.spyOn(dataservice, 'getData').mockReturnValue([
            { ticker: 'ABC', price: 100, assetClass: 'Equities' }
        ]);
        render(<ShowFinancialInstruments />);
        const priceElement = screen.getByRole('cell', {
            name: /100/i
        })
        expect(priceElement).toHaveClass('positivePrice');

    });
})
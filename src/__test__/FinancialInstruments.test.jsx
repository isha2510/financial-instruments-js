import { act, fireEvent, render, screen, within } from "@testing-library/react"
import ShowFinancialInstruments from "../features/FinancialInstruments"
import * as dataService from "../services/DataService";
import mockData from './mockData.json';
import userEvent from "@testing-library/user-event";

describe('Test FinancialInstrument component', () => {
    beforeEach(() => {
        jest.resetAllMocks();
        const defaultData = [
            { ticker: 'ABC', price: -100, assetClass: 'Equities' },
            { ticker: 'DEF', price: 100, assetClass: 'Commodities' },
            { ticker: 'GHI', price: 200, assetClass: 'Credit' }
        ]
        jest.spyOn(dataService, 'getData').mockReturnValue(defaultData);
        render(<ShowFinancialInstruments />);
    });
    const setup = () => {
        const ticker = screen.getByRole('columnheader', { name: /ticker/i });
        const price = screen.getByRole('columnheader', { name: /price/i });
        const assetClass = screen.getByRole('columnheader', { name: /asset class/i });
        return { ticker, price, assetClass };
    }

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
        expect(priceValues).toEqual(['200', '100', '-100']);
    });

    test('the ticker column is sorted in alphabetical order', () => {
        const { ticker } = setup();
        const sortButton = within(ticker).getByRole('button', {
            name: /▲/i
        });
        fireEvent.click(sortButton);
        const tickerCells = screen.getAllByTestId(/ticker/i);
        const tickerValues = tickerCells.map((cell) => cell.textContent);
        expect(tickerValues).toEqual(['ABC', 'DEF', 'GHI']);
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
        dataService.getData.mockReturnValue([]);
        render(<ShowFinancialInstruments />)
        // screen.logTestingPlaygroundURL();
        const message = screen.getByText(/no instruments available/i)
        expect(message).toBeInTheDocument();
    });

    test('renders price class "negativePrice" when price is negative', () => {
        const priceElement = screen.getByRole('cell', {
            name: "-100"
        })
        expect(priceElement).toHaveClass('negativePrice');

    });

    test('renders price class "positivePrice" when price is positive', () => {
        const priceElement = screen.getByRole('cell', {
            name: "100"
        })
        expect(priceElement).toHaveClass('positivePrice');
    });
});

describe('pagination', () => {
    beforeEach(() => {
        jest.spyOn(dataService, 'getData').mockReturnValue(mockData);
        render(<ShowFinancialInstruments />)
    });
    test('renders pagination', () => {
        //screen.logTestingPlaygroundURL();
        expect(screen.getByRole('button', { name: /</i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: />/i })).toBeInTheDocument();
    });
    test('renders next page records when clicked on next page button', () => {
        const nextButton = screen.getByRole('button', { name: />/i });
        act(() => { userEvent.click(nextButton)});
        expect(screen.getByRole('cell', { name: /test6/i })).toBeInTheDocument();
        expect(screen.getByRole('cell', { name: /test10/i })).toBeInTheDocument();
    })

})


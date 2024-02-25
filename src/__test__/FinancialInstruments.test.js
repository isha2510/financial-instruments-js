import { act, fireEvent, render, screen, waitFor, within, configure } from "@testing-library/react"
import ShowFinancialInstruments from "../features/FinancialInstruments"
import * as dataservice from "../services/DataService";



describe('Test FinancialInstrument component', () => {
    let comp = null;
    beforeEach(() => {
        jest.spyOn(dataservice, 'getData').mockReturnValue([
            { ticker: 'ABC', price: -100, assetClass: 'Equities' },
            { ticker: 'DEF', price: 100, assetClass: 'Commodities' },
            { ticker: 'GHI', price: 200, assetClass: 'Credit' }
        ]);
        comp = render(<ShowFinancialInstruments />);
    })

    test('the price column is sorted in descending order', async () => {
        configure({ testIdAttribute: "col-id" });
        const rows = screen
            .getAllByRole("row")
        // role row is also used for the header row so we need to filter those out
        // .filter((row) => row.getAttribute("row-index") !== null);
        const row = rows[0];
        within(row).getAllByTestId("price")[0].click();


        const priceCellValue = await waitFor(async () => {
            const priceCells = screen.getAllByRole('gridcell');
            return priceCells
                .filter(cell => "price" === cell.getAttribute("col-id"))
                .map(cell => cell.textContent);
        });

        console.log(priceCellValue)
    });


    test('renders "No Instruments available" message when the data is empty', () => {
        const mock = jest.spyOn(dataservice, 'getData');
        mock.mockReturnValue([]);
        render(<ShowFinancialInstruments />);
        // screen.logTestingPlaygroundURL();
        const message = screen.getByText(/no instruments available/i)
        expect(message).toBeInTheDocument();
    });

    test('renders price color as red when price is negative', () => {

        const priceElement = screen.getByText(/-100/i)
        expect(priceElement).toHaveStyle({ color: 'red' });

    });

    test('renders price color as blue when price is positive', () => {
        const priceElement = screen.getByText("100")
        expect(priceElement).toHaveStyle({ color: 'blue' });

    });
})
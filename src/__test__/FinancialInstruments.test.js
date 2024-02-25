import { act, fireEvent, render, screen, waitFor, within } from "@testing-library/react"
import ShowFinancialInstruments from "../features/FinancialInstruments"
import * as dataservice from "../services/DataService";
import * as AgGridTest from "./AgGridTestUtils"
import userEvent from "@testing-library/user-event";
import mockData from './mockData.json';


describe('Test FinancialInstrument component', () => {
    beforeEach(() => {
        jest.resetAllMocks()
        jest.spyOn(dataservice, 'getData').mockReturnValue([
            { ticker: 'ABC', price: -100, assetClass: 'Equities' },
            { ticker: 'DEF', price: 100, assetClass: 'Commodities' },
            { ticker: 'GHI', price: 200, assetClass: 'Credit' }
        ]);
        render(<ShowFinancialInstruments />);
    })

    test('renders the price column sorted in descending order', async () => {
        const priceElement = screen.getByText(/price/i)
        act(() => priceElement.click());
        const priceCellValues = await waitFor(async () => {
            const priceCells = screen.getAllByRole('gridcell');
            return priceCells
                .filter(cell => "price" === cell.getAttribute("col-id"))
                .map(cell => cell.textContent);
        });
        expect(priceCellValues).toEqual(['200', '100', '-100']);
    });

    test('renders assect class in given order', async () => {
        const priceElement = screen.getByText(/asset class/i)
        act(() => priceElement.click());
        const priceCellValues = await waitFor(async () => {
            const priceCells = screen.getAllByRole('gridcell');
            return priceCells
                .filter(cell => "assetClass" === cell.getAttribute("col-id"))
                .map(cell => cell.textContent);
        });
        expect(priceCellValues).toEqual(['Commodities', 'Equities', 'Credit']);
    });

    test('renders ticker in alphabetical order', async () => {
        const priceElement = screen.getByText(/ticker/i)
        act(() => priceElement.click());
        const priceCellValues = await waitFor(async () => {
            const priceCells = screen.getAllByRole('gridcell');
            return priceCells
                .filter(cell => "ticker" === cell.getAttribute("col-id"))
                .map(cell => cell.textContent);
        });
        expect(priceCellValues).toEqual(['ABC', 'DEF', 'GHI']);
    });

    test('renders commodities row with commodities class', async () => {
        await AgGridTest.waitForDataToHaveLoaded();
        const commoditiesRows = screen.getAllByRole("row", { name: /Commodities/i })
        commoditiesRows.map((row, index) => {
            expect(row.getAttribute("class")).toContain("commodities");
        });
    });

    test('renders credit row with credit class', async () => {
        await AgGridTest.waitForDataToHaveLoaded();
        const creditRows = screen.getAllByRole("row", { name: /credit/i })
        creditRows.map((row, index) => {
            expect(row.getAttribute("class")).toContain("credit");
        });
    });
    test('renders equities row with equities class', async () => {
        await AgGridTest.waitForDataToHaveLoaded();
        const equitiesRows = screen.getAllByRole("row", { name: /equities/i })
        equitiesRows.map((row, index) => {
            expect(row.getAttribute("class")).toContain("equities");
        });
    });


    test('renders "No Rows To Show" message when the data is empty', async () => {
        const mock = jest.spyOn(dataservice, 'getData');
        mock.mockReturnValue([]);
        render(<ShowFinancialInstruments />);
        await waitFor(() => {
            expect(document.querySelector(".ag-overlay-no-rows-center")).toHaveTextContent('No Rows To Show');
        })

    });

    test('renders price color as red when price is negative', async () => {
        waitFor(() => {
            const priceElement = screen.getByText(/-100/i)
            expect(priceElement).toHaveStyle({ color: 'red' });
        })
    });

    test('renders price color as blue when price is positive', async () => {
        waitFor(() => {
            const priceElement = screen.getByText("100")
            expect(priceElement).toHaveStyle({ color: 'blue' });
        });
    });

    test('renders grid with pagination and validate the default page size', async () => {
        jest.spyOn(dataservice, 'getData').mockReturnValue(mockData);
        render(<ShowFinancialInstruments />)
        await AgGridTest.waitForGridToBeInTheDOM();
        await AgGridTest.waitForDataToHaveLoaded();
        await waitFor(async () => {
            const pg = await AgGridTest.waitForPagination();
            expect(pg.rowCount).toEqual('15')
            expect(pg.lastRow).toEqual('10');
            expect(pg.firstRow).toEqual('1');
        })
    })
    test('renders next page records when clicked on next page', async () => {
        jest.spyOn(dataservice, 'getData').mockReturnValue(mockData);
        render(<ShowFinancialInstruments />)
        await AgGridTest.waitForGridToBeInTheDOM();
        await AgGridTest.waitForDataToHaveLoaded();
        const allBtns = screen.getAllByRole('button');
        const nextPageBtn = allBtns.filter(btnE => btnE.getAttribute('aria-label') === 'Next Page')[0];
        act(() => nextPageBtn.click());
        await waitFor(async () => {
            const pg = await AgGridTest.waitForPagination();
            expect(pg.firstRow).toEqual('11');
            expect(pg.lastRow).toEqual('15');
        })
    })
})
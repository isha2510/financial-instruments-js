import { render, screen } from "@testing-library/react"
import { Pagination } from "../components/Pagination/Pagination"
import { act } from "react-dom/test-utils"
import userEvent from "@testing-library/user-event"

describe('Pagination', () => {
    const mockHandlePageChange = jest.fn();
    const setup = () => {
        render(<Pagination currentPage={1} totalRecords={11} handlePageChange={mockHandlePageChange} recordsPerPage={5} />)
    }
    test('callback function is called with current page number', () => {
        setup();
        const nextButton = screen.getByRole('button', { name: />/i });
        act(() => userEvent.click(nextButton));
        expect(mockHandlePageChange).toHaveBeenCalledWith(2)
    });
    test('callback function is not called when current page is 1 and "Previous Page" button is clicked', () => {
        setup();
        const prevButton = screen.getByRole('button', { name: /</i });
        act(() => userEvent.click(prevButton));
        expect(mockHandlePageChange).toHaveBeenCalledTimes(0);
    });
    test('callback function is not called when current page is last page and "Next Page" button is clicked', () => {
        const mockHandlePageChange = jest.fn();
        render(<Pagination currentPage={3} totalRecords={11} handlePageChange={mockHandlePageChange} recordsPerPage={5} />)
        const nextButton = screen.getByRole('button', { name: />/i });
        act(() => userEvent.click(nextButton));
        expect(mockHandlePageChange).toHaveBeenCalledTimes(0);
    });

})
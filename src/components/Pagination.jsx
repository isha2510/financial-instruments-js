import { Button } from "./Button";
import './pagination.css';

export const Pagination = ({ currentPage, totalRecords, handlePageChange, recordsPerPage }) => {
    const totalPages = totalRecords > recordsPerPage ? Math.ceil(totalRecords / recordsPerPage) : 1;

    const prevPage = () => {
        if (currentPage !== 1) {
            handlePageChange(currentPage - 1);
        }
    }
    const nextPage = () => {
        if (currentPage !== totalPages) {
            handlePageChange(currentPage + 1);
        }

    }

    return (
        <div className="pagination">
            <Button onClick={prevPage} icon={"<"} className='arrow' />
            <span>{` Prev | Page ${currentPage} of ${totalPages} | Next`} </span>
            <Button onClick={nextPage} icon={">"} className='arrow' />
        </div>
    )
}
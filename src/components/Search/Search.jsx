export const Search = ({ searchText }) => {

    const debounce = (fn, delay) => {
        let timer;
        return function (...args) {
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                fn(...args);
            }, delay);
        }
    }

    const handleChange = debounce((e) => {
        searchText(e.target.value);
    }, 1000);



    return (
        <div className="search">
            <span>Search : </span>
            <input type="text" onChange={handleChange} />
        </div>
    )
}


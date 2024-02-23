import './button.css'
export const SortButton=({key,onClick})=> {
    return (
      <button className="sort"
        onClick={onClick}
      >
        ▲
      </button>
    );
  }
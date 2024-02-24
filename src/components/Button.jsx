import './button.css'
export const SortButton=({onClick})=> {
    return (
      <button className="sort"
        onClick={onClick}
      >
        ▲
      </button>
    );
  }
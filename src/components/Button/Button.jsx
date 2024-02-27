import './button.css'
export const Button = ({ onClick, icon, className }) => {
  return (
    <button className={className}
      onClick={onClick}
    >
      {icon}
    </button>
  );
}
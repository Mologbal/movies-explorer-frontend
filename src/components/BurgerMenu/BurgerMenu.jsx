import './BurgerMenu.css';

function BurgerMenu({
    type = "button",
    isActive,
    onClick
}) {
    return (
        <button
            className={`burgerMenu ${isActive && 'burgerMenu_active'}`}
            onClick={onClick}
            type={type}>
            <span/>
        </button>
    );
};

export default BurgerMenu;

import s from "./Button.module.scss";

const Button = ({text, onClick, isLoading}) => {
    return (
        <button className={s.root} onClick={onClick}>
            {isLoading ? "Загрузка..." : text}
        </button>
    )
}

export default Button;

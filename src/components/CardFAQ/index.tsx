import icone from "../../assets/icon.svg";
import './styles.css';

export function CardFAQ({servico}){
    return(
        <>
            <a href="/tutorial">
            <img src={icone} alt="" className="icone"/>
                {servico}
            </a>
        </>
    )
}

// @ts-ignore
import './style.css';
import { useLocation } from 'preact-iso';
import { Header } from '../../components/Header1/Header';

export function Home() {
	const { route } = useLocation();

	const comunidadeId = "comunidade"
	const handleLike = "podeDarLike"

	const irParaServicos = (comunidadeValue) => {
		route('/servicos')
		localStorage.setItem(comunidadeId, comunidadeValue)
		localStorage.setItem(handleLike, "true")
	}

	return (
		<div class="home">
			<Header />
			<main>
				<h2>BEM VINDOS</h2>
				<p>É um prazer tê-lo(a) conosco. Para oferecer o melhor atendimento, conte-nos de qual região você está acessando?</p>
				
				<div className="botoes">
					<button className="botao-outline" onClick={() => irParaServicos("tukano")}>
						Tukano
					</button>
					
					<button className="botao-outline" onClick={() => irParaServicos("kayapó")}>
						Kayapó
					</button>
				</div>
			</main>
				
		</div>
	);
}

function Resource(props) {
	return (
		<a href={props.href} target="_blank" class="resource">
			<h2>{props.title}</h2>
			<p>{props.description}</p>
		</a>
	);
}

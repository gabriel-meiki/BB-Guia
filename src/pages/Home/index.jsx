
// @ts-ignore
import './style.css';
import { Header } from '../../components/Header1/Header';

export function Home() {
	return (
		<div class="home">
			<Header />
			<main>
				<h2>BEM VINDOS</h2>
				<p>É um prazer tê-lo(a) conosco. Para oferecer o melhor atendimento, conte-nos de qual região você está acessando?</p>
				
				<div className="botoes">
					<a href="/servicos" className="botao-entrar">Kayapó</a>
					<a href="/servicos" className="botao-entrar">Suruí</a>
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

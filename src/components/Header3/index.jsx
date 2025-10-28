import { useLocation } from 'preact-iso';
import logo from "../../assets/image 2.svg";
import seta from "../../assets/seta-esquerda.svg";
import './styles.css';

export function HeaderTerceiro({titulo}) {
	const { url } = useLocation();

	return (
		<header className="header-video">
			<nav>
				<div>
					<a href="/servicos" className="seta">
						<img src={seta} alt="" />
					</a>
				</div>
				<h2>{titulo}</h2>
				<img src={logo} alt="" id="logo-terceiro"/>

			</nav>
		</header>
	);
}

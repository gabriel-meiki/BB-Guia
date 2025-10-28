import { useLocation } from 'preact-iso';
import logo from "../../assets/image 2.svg";
import './styles.css';

export function HeaderDiferente({titulo}) {
	const { url } = useLocation();

	return (
		<header>
			<nav className="header-diferente">
				<img src={logo} alt="" />
				<h2>{titulo}</h2>
			</nav>
		</header>
	);
}

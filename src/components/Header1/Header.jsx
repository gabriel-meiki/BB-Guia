import { useLocation } from 'preact-iso';
import logo from "../../assets/image 2.svg";
import './styles.css';

export function Header() {
	const { url } = useLocation();

	return (
		<header>
			<nav>
				<img src={logo} alt="" />
				
			</nav>
		</header>
	);
}

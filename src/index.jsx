import { LocationProvider, Router, Route, hydrate, prerender as ssr } from 'preact-iso';

import { Header } from './components/Header1/Header.jsx';
import { Home } from './pages/Home/index.jsx';
import { Servicos } from './pages/Servicos/index.jsx';
import { NotFound } from './pages/_404.jsx';
import { Tutorial } from './pages/Tutorial/index.js';
import './style.css';

export function App() {
	return (
		<LocationProvider>
			<main>
				<Router>
					<Route path="/" component={Home} />
					<Route path="/servicos" component={Servicos} />
					<Route path="/tutorial" component={Tutorial} />
					<Route default component={NotFound} />
				</Router>
			</main>
		</LocationProvider>
	);
}

if (typeof window !== 'undefined') {
	hydrate(<App />, document.getElementById('app'));
}

export async function prerender(data) {
	return await ssr(<App {...data} />);
}

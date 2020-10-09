import React from "react";
import ReactGA from 'react-ga';
import { Provider } from 'react-redux';
/*import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';*/
import { hot } from "react-hot-loader";
import { PersistGate } from "redux-persist/integration/react";
import { Router } from 'react-router-dom';
import { createMemoryHistory } from "history";

import reduxStore from './store';
//import theme from 'theme'
//import GlobalMessage from './components/GlobalMessage'

const { store, persistor } = reduxStore();
const history = createMemoryHistory();

/*ReactGA.initialize(GA_KEY, {
	debug: false,
	titleCase: false,
});*/

const App = () => {
	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>
{/*				<ThemeProvider theme={theme}>
					<CssBaseline/>
					<Router history={history}>
						<GlobalMessage/>
					</Router>
				</ThemeProvider>*/}
				Hello world!
			</PersistGate>
		</Provider>
	)
};

export default hot(module)(App)

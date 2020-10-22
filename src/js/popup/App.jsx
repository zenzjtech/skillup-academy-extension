import React from "react";
import ReactGA from 'react-ga';
import { Provider } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { hot } from "react-hot-loader";
import { PersistGate } from "redux-persist/integration/react";
import { SnackbarProvider } from 'notistack';

import reduxStore from './store';
import View from "./view";
import Button from "@material-ui/core/Button";

const { store, persistor } = reduxStore();

/*ReactGA.initialize(GA_KEY, {
	debug: false,
	titleCase: false,
});*/

const notistackRef = React.createRef();
const onClickDismiss = key => () => {
	notistackRef.current.closeSnackbar(key);
}

const App = () => {
	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<SnackbarProvider
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'center',
					}}
					maxSnack={3}
					dense
					ref={notistackRef}
					action={(key) => (
						<Button onClick={onClickDismiss(key)}>
							'Dismiss'
						</Button>
					)}
				>
					<CssBaseline/>
					<View/>
				</SnackbarProvider>
			</PersistGate>
		</Provider>
	)
};

export default hot(module)(App)

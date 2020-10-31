import React, { useEffect, useState } from "react";
import ReactGA from 'react-ga';
import { Provider } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { hot } from "react-hot-loader";
import { PersistGate } from "redux-persist/integration/react";
import { SnackbarProvider } from 'notistack';
import Button from "@material-ui/core/Button";

import reduxStore from './store';
import View from "./view";
import { GA_KEY } from './config';

const { store, persistor } = reduxStore();


const notistackRef = React.createRef();
const onClickDismiss = key => () => {
	notistackRef.current.closeSnackbar(key);
}

ReactGA.initialize(GA_KEY, {
	debug: false,
	titleCase: false
});

ReactGA.ga('set', 'checkProtocolTask', null);

ReactGA.pageview('/popup');

const App = () => {
	const [userInfo, setUserInfo] = useState({});
	
	useEffect(() => {
		(async () => {
			try {
				const response = await chrome.identity.getProfileUserInfo();
				setUserInfo(response);
				ReactGA.set({ clientId: response.email })
			} catch (e) {
				if (chrome.runtime.lastError)
					console.log(e);
				console.log(e);
			}
		})();
	}, []);
	
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
							Dismiss
						</Button>
					)}
				>
					<CssBaseline/>
					<View useInfo={userInfo}/>
				</SnackbarProvider>
			</PersistGate>
		</Provider>
	)
};

export default hot(module)(App)

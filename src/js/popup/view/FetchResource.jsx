import React, {useEffect, useState} from "react"
import TextField from '@material-ui/core/TextField'
import SubmitButton from 'js/popup/components/SubmitButton'
import Box from '@material-ui/core/Box'
import { resource } from '../services'
import Typography from "@material-ui/core/Typography";
import { useSnackbar } from 'notistack';
import Tooltip from "@material-ui/core/Tooltip";
import Link from "@material-ui/core/Link";
import makeStyles from "@material-ui/core/styles/makeStyles";
import ReactGA from 'react-ga';
import cst from "../constants";

const useStyles = makeStyles((theme) => ({
	copyright: {
		marginTop: theme.spacing(3)
	},
	result: {
		marginBottom: theme.spacing(2)
	}
}));
function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			<Link color="inherit" href="#">
				ZenzjTech
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}
const FetchResource = (props) => {
	const classes = useStyles();
	const { userInfo } = props;
	
	const [currentUrl, setCurrentUrl] = useState('');
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState('');
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	
	useEffect(() => {
		(async () => {
			try {
				const result = await chrome.tabs.executeScript({
					code: 'document.URL;'
				});
				if (result && result.length) {
					const [url] = result;
					setCurrentUrl(url);
				}
			} catch (e) {
				if (chrome.runtime.lastError)
					console.log(e);
				enqueueSnackbar('Either hostname isn\'t facebook.com, or something else', { variant: 'error'})
			}
		})();
	}, []);
	
	
	const handleFetchResource = async (e) => {
		e.preventDefault();
		ReactGA.event({
			category: cst.GA_CATEGORY_CLICK,
			action: cst.GA_ACTION_GET_ID
		});
		if (currentUrl && !currentUrl.includes('facebook.com')) {
			enqueueSnackbar('Hostname must be facebook.com!', { variant: 'warning' })
			return;
		}
		try {
			setLoading(true);
			const response = await resource.getFbId({
				query: currentUrl
			});
			if (response && response.id)
				setResult(response.id);
			else
				enqueueSnackbar('Unable to find the id for the given URL' , { variant: 'warning' })
		} catch (error) {
			console.log(error);
			enqueueSnackbar('There is some errors, please try again later' , { variant: 'warning' })
		} finally {
			setLoading(false);
		}
	};
	
	function handleCopy() {
		navigator.clipboard.writeText(result);
		enqueueSnackbar("Copied", {variant: "info"})
	}
	
	return (
		<Box
			component={'form'} onSubmit={handleFetchResource}
			alignItems="center"
			display={"flex"}
			flexDirection={"column"}
			m={4}
			mt={9}
		>
			<TextField
				id="outlined-helperText"
				label="Facebook page, profile or group URL"
				value={currentUrl}
				onChange={(e) => setCurrentUrl(e.target.value)}
				helperText="Click at the button or press Enter to extract the page information"
				type="url"
				required
				fullWidth
			/>
			<SubmitButton loading={loading} btnText={"Get ID"}/>
			{result &&
			<Tooltip title="click to copy" placement="right">
				<Typography
					variant="h6" onClick={handleCopy}
					className={classes.result}
				>
					Id: {result}
				</Typography>
			</Tooltip>
			}
			<Copyright className={classes.copyright}/>
		</Box>
	)
}


export default FetchResource

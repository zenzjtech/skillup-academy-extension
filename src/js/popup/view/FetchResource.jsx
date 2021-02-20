import React, {useEffect, useState} from "react"
import TextField from '@material-ui/core/TextField'
import SubmitButton from 'js/popup/components/SubmitButton'
import Box from '@material-ui/core/Box'
import { resource } from '../services'
import Typography from "@material-ui/core/Typography";
import { useSnackbar } from 'notistack';
import Tooltip from "@material-ui/core/Tooltip";
import makeStyles from "@material-ui/core/styles/makeStyles";
import ReactGA from 'react-ga';
import cst from "../constants";

const useStyles = makeStyles((theme) => ({
	result: {
		marginBottom: theme.spacing(2)
	}
}));

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
				// enqueueSnackbar('Either hostname isn\'t facebook.com, or something else', { variant: 'error'})
			}
		})();
	}, []);
	
	
	const handleFetchResource = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			const response = await chrome.runtime.sendMessage({
				url: currentUrl
			})
			if (response.type === cst.FETCH_FAIL)
				throw { message: response.payload }
			
			if (result === null) {
				enqueueSnackbar('Unable to find the id for the given URL' , { variant: 'warning' })
			} else
				setResult(response.payload)
			
		} catch (error) {
			console.log(error);
			enqueueSnackbar(error && error.message || 'There is some errors, please try again later' , { variant: 'warning' })
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
			mx={4}
			mt={9}
			mb={1}
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
				>
					Id: {result}
				</Typography>
			</Tooltip>
			}
		</Box>
	)
}


export default FetchResource

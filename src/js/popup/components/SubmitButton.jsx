import React from "react";
import Button from '@material-ui/core/Button'
import {makeStyles} from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles((theme) => ({
	root: {
		margin: theme.spacing(3, 0, 2)
	}
}))

const SubmitButton = (props) => {
	
	const classes = useStyles();
	const { loading, btnText, fullWidth=false } = props;
	
	return (
		<Button
			variant="contained"
			type="submit"
			fullWidth={fullWidth}
			disabled={!!loading}
			color="primary"
			className={classes.root}
		>
			{
				loading ? <CircularProgress size={25}/> : btnText
			}
		</Button>
	)
}

export default SubmitButton;

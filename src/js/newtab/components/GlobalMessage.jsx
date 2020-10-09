import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import Snackbar from '@material-ui/core/Snackbar'
const PropTypes = require('prop-types')
import MuiAlert from '@material-ui/lab/Alert';

import {appAction} from '../actions'

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ErrorMessage = props => {
	const { message, open, style, clearError, ...otherProps } = props
	useEffect(() => {
		if (message === '')
			return;
		setTimeout(function() {
			clearError()
		}, 6000)
	}, [message])
	if (!message) {
		return null
	}
	return (
		<Snackbar
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'center',
			}}
			data-test-id={'error-message'}
			autoHideDuration={6000}
			{...otherProps}
			open={!!message}
			message={message}
		>
		</Snackbar>
	)
}

ErrorMessage.propTypes = {
	message: PropTypes.string,
	open: PropTypes.bool.isRequired,
	style: PropTypes.object,
}

ErrorMessage.defaultProps = {
	message: null,
	open: true,
	style: {},
}

const mapStateToProps = (state) => {
	return {
		message: state.app.errorMessage
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		clearError: () => dispatch(appAction.clearError())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorMessage)

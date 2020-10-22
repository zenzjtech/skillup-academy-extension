import cst from '../constants';

function showError(errorMessage) {
	return { type: cst.ACTION_ERROR_OCCURS, payload: errorMessage };
}

function clearError() {
	return { type: cst.ACTION_CLEAR_ERRORS }
}

export const appAction = {
	showError,
	clearError
};

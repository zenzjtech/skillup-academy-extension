import cst from '../constants';

const initialState = { errorMessage: '', loading: false };

export const app = (state = initialState, action) => {
	switch (action.type) {
		case cst.ACTION_ERROR_OCCURS:
			return {
				...state,
				errorMessage: action.payload
			};
		case cst.ACTION_CLEAR_ERRORS:
			return {
				...state,
				errorMessage: ''
			};
		case cst.ACTION_LOADING:
			return {
				...state,
				loading: true
			};
		case cst.ACTION_LOADED:
			return {
				...state,
				loading: false
			}
		default:
			return state
	}
};


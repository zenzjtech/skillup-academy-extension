import { handleResponse} from './helper'
import { URL } from '../config';

async function getFbId(data) {
	const requestOptions = {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json",
		},
	};
	return fetch(URL, requestOptions)
		.then(handleResponse);
}


const resource = {
	getFbId,
}

export default resource;

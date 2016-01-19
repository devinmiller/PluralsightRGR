import {get} from 'jquery';
import ServerActions from './actions/server-actions';

let API = {
	fetchLinks() {
		console.log('1. In API.');
		get('/data/links').done(res => {
			ServerActions.receiveLinks(res);
		})
	}
};

export default API;
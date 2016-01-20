import {post} from 'jquery';
import ServerActions from './actions/server-actions';

let API = {
	fetchLinks() {
		console.log('1. In API.');
		post('/graphql', {
            query: `{
                links {
                    _id,
                    title,
                    url
                }
            }`
        }).done(res => {
			ServerActions.receiveLinks(res.data.links);
		})
	}
};

export default API;
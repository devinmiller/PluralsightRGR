import AppDispatcher from '../app-dispatcher';
import {ActionTypes} from '../constants';

let ServerActions = {
	receiveLinks(links) {
		console.log('2. In ServerActions');
		AppDispatcher.dispatch({
			actionType: ActionTypes.RECEIVE_LINKS,
			links
		});
	}
};

export default ServerActions;
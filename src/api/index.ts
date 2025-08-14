import * as users from './users';
import * as transaction from './transaction';

class API {
	users: typeof users;
	transaction: typeof transaction;

	constructor() {
		this .users = users;
		this.transaction = transaction;
	}
}

const api = new API();

export default api;
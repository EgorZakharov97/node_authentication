const google = require('googleapis').google;
const logger = require('./logger');
const axios = require('axios');

const googleConfig = {
	clientID: process.env.AUTH_GOOGLE_CLIENT,
	clientSecret: process.env.AUTH_GOOGLE_SECRET,
	redirect: process.env.AUTH_GOOGLE_REDIRECT
};

const defaultScope = [
	'https://www.googleapis.com/auth/userinfo.email',
	'https://www.googleapis.com/auth/userinfo.profile'
];

function createConnection() {
	return new google.auth.OAuth2(
		googleConfig.clientID,
		googleConfig.clientSecret,
		googleConfig.redirect
	)
}

function getConnectionUrl(auth) {
	return auth.generateAuthUrl({
		access_type: 'offline',
		prompt: 'consent', // access type and approval prompt will force a new refresh token to be made each time signs in
		scope: defaultScope
	});
}

function getGooglePlusApi(auth) {
	return google.plus({version: 'v1', auth});
}

function getUserUrl() {
	const auth = createConnection();
	return getConnectionUrl(auth);
}

async function getUserFromCode(code) {

	let auth = createConnection();
	let processedCode = await auth.getToken(code);
	const tokens = processedCode.tokens;

	const { data } = await axios({
		url: 'https://www.googleapis.com/oauth2/v2/userinfo',
		method: 'get',
		headers: {
			Authorization: `Bearer ${tokens.access_token}`,
		},
	});

	return data
}

module.exports = {
	getUserUrl: getUserUrl,
	getUserFromCode: getUserFromCode
};
'use strict';

const fetch = require('node-fetch');

const API_KEY = 'oenodlive_default_secret';
const OENODLIVE_URL = 'https://oenod.live/api/v1/meeting';
// const OENODLIVE_URL = 'http://localhost:3010/api/v1/join';

function getResponse() {
    return fetch(OENODLIVE_URL, {
        method: 'POST',
        headers: {
            authorization: API_KEY,
            'Content-Type': 'application/json',
        },
    });
}

getResponse().then(async (res) => {
    console.log('Status code:', res.status);
    const data = await res.json();
    console.log('meeting:', data.meeting);
});

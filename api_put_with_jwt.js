// To run this test, you would execute the following command:
// On Mac OS X, you can install k6 with Homebrew by running the following command:
// brew install k6
// k6 run api_put_with_jwt.js --out web-dashboard


import http from 'k6/http';
import {check} from 'k6';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

const config = require('./config.js');

const api_login = config.api.url + '/login';
const api_put_with_jwt = config.api.url + '/profiles';

// Simulation options
export const options = config.simulation;

export default () => {
    /////////////////////////////////////////////////////////////////
    // LOGIN REQUEST WITH USERNAME AND PASSWORD AND OBTAINING A TOKEN
    /////////////////////////////////////////////////////////////////

    let data = {
        username: config.user.username,
        password: config.user.password,
    };

    // Using a JSON string as body
    let res = http.post(api_login, JSON.stringify(data), {
        headers: {'Content-Type': 'application/json'},
    });

    check(res, {
        'status is 200': (r) => r.status === 200,
        'token is present': (r) => r.json('data.token') !== '',
    });

    // Extracting the token from the response
    let token = res.json('data.token');

    //////////////////////////////////////
    // UPDATING THE PROFILE WITH THE TOKEN
    //////////////////////////////////////

    let data2 = {
        display_name: 'random_' + randomIntBetween(1, 1000),
    };

    // Using JSON object as body
    let res2 = http.put(api_put_with_jwt, JSON.stringify(data2), {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },

    });

    check(res2, {
        'status is 200': (r) => r.status === 200,
    });
}

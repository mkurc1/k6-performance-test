import encoding from 'k6/encoding';
import http from 'k6/http';
import {check} from 'k6';

const config = require('../config.js');

// Simulation options
export const options = config.simulation;

export default () => {
    const credentials = `${config.basic_auth.username}:${config.basic_auth.password}`;

    // using HTTP Basic Auth
    const encodedCredentials = encoding.b64encode(credentials);
    const options = {
        headers: {
            Authorization: `Basic ${encodedCredentials}`,
        },
    };

    let res = http.get(config.homepage.url, options);
    check(res, {
        'status is 200': (r) => r.status === 200,
        'body is present': (r) => r.body.length > 0,
        'body contains "Hello"': (r) => r.body.indexOf('Hello') !== -1,
    });
}

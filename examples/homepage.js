import http from 'k6/http';
import {check} from 'k6';

const config = require('../config.js');

// Simulation options
export const options = config.simulation;

export default () => {
    let res = http.get(config.homepage.url);
    check(res, {
        'status is 200': (r) => r.status === 200,
        'body is present': (r) => r.body.length > 0,
    });
}

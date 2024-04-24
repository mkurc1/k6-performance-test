const config = {
    basic_auth: {
        username: 'change-me',
        password: 'change-me'
    },
    user: {
        username: 'change-me',
        password: 'change-me'
    },
    api: {
        url: 'https://change-me',
    },
    homepage: {
        url: 'https://change-me'
    },
    simulation: {
        stages: [
            { target: 100, duration: '5m' }, // simulate ramp-up of traffic from 1 to 100 users over 5 minutes
            { target: 10, duration: '30s' }, // stay at 10 users for 30 seconds
            { target: 1000, duration: '5m' }, // ramp-up to 1000 users over 5 minutes (peak hour starts)
            { target: 200, duration: '10s' }, // scale down to 200 users
            { target: 4000, duration: '5m' }, // ramp-up to 4000 users over 5 minutes (crash hour starts)
        ]
    }
}

module.exports = config;

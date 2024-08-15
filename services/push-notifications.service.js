const { ONE_SIGNAL_CONFIG } = require('../config/app.config');
const https = require('https');

async function sendNotification(data, callback) {
    const headers = {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": `Basic YTI3Y2M0Y2UtNjFlNC00ZTEzLTg5MjktNzU0MDFjMWI1N2Zk`
    };

    const options = {
        host: "onesignal.com",
        port: 443,
        path: '/api/v1/notifications',
        method: "POST",
        headers: headers
    };

    const req = https.request(options, (res) => {
        let responseData = '';

        res.on('data', (chunk) => {
            responseData += chunk;
        });

        res.on('end', () => {
            try {
                const contentType = res.headers['content-type'];
                if (contentType && contentType.includes('application/json')) {
                    const parsedData = JSON.parse(responseData);
                    return callback(null, parsedData);
                } else {
                    throw new Error(`Unexpected content type: ${contentType}`);
                }
            } catch (e) {
                console.error("Failed to parse response:", e);
                console.error("Response data:", responseData);
                return callback(e, null);
            }
        });
    });

    req.on('error', (e) => {
        console.error("Request error:", e);
        return callback(e, null);
    });

    req.write(JSON.stringify(data));
    req.end();
}

module.exports = {
    sendNotification
};

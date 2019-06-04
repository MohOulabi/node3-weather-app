const request = require('request');
const gecode = (address, callback) => {
    const token = 'pk.eyJ1IjoibW9oYW1tYWRvdTEiLCJhIjoiY2p3NjRpZzY4MHE5OTRhbXNqYzhnbGxucCJ9.BqaAl38Xqt0D9j5nXUqvFQ';
    const gecodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${token}&limit=1`;
    request({ url: gecodeUrl, json: true }, (error, response) => {
        if (error) {
            callback(error, undefined);
        } else if (response.body.features && response.body.features.length <= 0) {
            callback('Unable to find location.', undefined);
        } else if (response.body.features) {
            callback(undefined, {
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name,
            });
        }else{
            callback('Unable to find location.', undefined);
        }
    });
}

module.exports = gecode;

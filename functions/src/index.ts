import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
const HttpStatus = require('http-status-codes');
"use strict";

admin.initializeApp();

const APP_NAME = "FriendlyEats!";
const VERSION = "1.0.4"

/**
 * Returns a simple "hello world"-type greeting.
 *
 * Example:
 *   https://us-central1-com-tyhurst-friendlyeats.cloudfunctions.net/helloFriend
 */
export const helloFriend = functions.https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", {structuredData: true});
    response.status(HttpStatus.OK).send({
        message: "Hello from " + APP_NAME,
        function: "helloFriend",
        version: VERSION,
    });
});


/**
 * Returns restaurants with a `valueIndex` greater than or equal to
 * the given `minValueIndex`. The data is retrieved from a Firestore
 * repository.
 *
 * Query Parameters:
 *   minValueIndex : integer minimum value of `valueIndex` to be returned.
 *     Defaults to `1`.
 * Output:
 *   Array of `restaurant` objects, whose `valueIndex` >= `minValueIndex`.
 * Example:
 *   https://us-central1-com-tyhurst-friendlyeats.cloudfunctions.net/getHighValues?minValueIndex=12
 */
export const getHighValues = functions.https.onRequest((request, response) => {
    const FUNCTION_NAME = "getHighValues";

    let minValue = 1; // default
    if (request.query.minValueIndex) {
        // Query parameters are always represented as strings.
        minValue = Number(request.query.minValueIndex);
    }
    ;

    admin.firestore()
        .collection('restaurants')
        .where("valueIndex", ">=", minValue)
        .get()
        .then(
        function(snapshot) {
        response.setHeader("version", VERSION);
        response.status(HttpStatus.OK)
            .send({
                function: FUNCTION_NAME,
                version: VERSION,
                data: snapshot.docs,
            });
        })
        .catch(function(error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .send({
                    function: FUNCTION_NAME,
                    version: VERSION,
                    error: {
                        message: "Error getting high value restaurants for minValueIndex=" + minValue,
                        data: error,
                    },
                });
        });
});

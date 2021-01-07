import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
const HttpStatus = require('http-status-codes');
"use strict";

admin.initializeApp();

const APP_NAME = "FriendlyEats!";
const VERSION = "1.0.3"


export const helloFriend = functions.https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", {structuredData: true});
    response.status(HttpStatus.OK).send({
        message: "Hello from " + APP_NAME,
        function: "helloWorld",
        version: VERSION,
    });
});


export const getHighValues = functions.https.onRequest((request, response) => {
    const FUNCTION_NAME = "getHighValues";
    admin.firestore()
        .collection('restaurants')
        .where("valueIndex", ">", 1)
        .get()
        .then(function(snapshot) {
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
                        message: "Error getting high value restaurants.",
                        data: error,
                    },
                });
        });
});

const request = require("request");

// Handles messages events
export function handleMessage(sender_psid, received_message) {
  let response;

  // check if the message contains text
  if (received_message.text) {
    // create the payload for a basic text message
    response = {
      text: `You sent the message ${received_message.text}. Now send me an image!`,
    };
  }

  callSendAPI(sender_psid, response);
}

// Handles messaging_postbacks events
export function handlePostback(sender_psid, received_postback) {}

// Sends response messages via the Send API
export function callSendAPI(sender_psid, response) {
  // construct the message body
  let request_body = {
    recipient: {
      id: sender_psid,
    },
    message: response,
  };

  // send http request to the messenger platform
  request(
    {
      uri: "https://graph.facebook.com/v2.6/me/messages",
      qs: {
        access_token: process.env.PAGE_ACCESS_TOKEN,
      },
      method: "POST",
      json: request_body,
    },
    (err, res, body) => {
      if (!err) {
        console.log("message sent!");
      } else {
        console.error("Unable to send message " + err);
      }
    }
  );
}

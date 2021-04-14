const request = require("request");

function firstTrait(nlp, name) {
  return nlp && nlp.entities && nlp.traits[name] && nlp.traits[name][0];
}

// // Handles messages events
// function handleMessage(sender_psid, received_message) {
//   let response;

//   // check if the message contains text
//   if (received_message.text) {
//     // create the payload for a basic text message
//     response = {
//       text: `You sent the message ${received_message.text}. Now send me an image!`,
//     };
//   } else if (received_message.attachments) {
//     let attachment_url = received_message.attachments[0].payload.url;
//     response = {
//       attachment: {
//         type: "template",
//         payload: {
//           template_type: "generic",
//           elements: [
//             {
//               title: "Is this the right picture?",
//               subtitle: "Tap a button to answer.",
//               image_url: attachment_url,
//               buttons: [
//                 {
//                   type: "postback",
//                   title: "Yes!",
//                   payload: "yes",
//                 },
//                 {
//                   type: "postback",
//                   title: "No!",
//                   payload: "no",
//                 },
//               ],
//             },
//           ],
//         },
//       },
//     };
//   }

//   // Send the response message
//   callSendAPI(sender_psid, response);
// }

function handleMessage(sender_psid, message) {
  // check greeting is here and is confident
  const greeting = firstTrait(message.nlp, "wit$greetings");
  if (greeting && greeting.confidence > 0.8) {
    callSendAPI(sender_psid, "Hi there!");
  } else {
    callSendAPI(sender_psid, "default");
  }
}

// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {
  let response;

  // get the payload for the postback
  let payload = received_postback.payload;

  // set the response based on the postback payload
  if (payload === "yes") {
    response = {
      text: "Thanks!",
    };
  } else if (payload === "no") {
    response = {
      text: "Oops, try sending another image.",
    };
  }

  callSendAPI(sender_psid, response);
}

// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {
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

module.exports = {
  handleMessage,
  callSendAPI,
  handlePostback,
};

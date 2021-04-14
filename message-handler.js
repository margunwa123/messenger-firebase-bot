const request = require("request");
const User = require("./models/user");

const CONFIDENCE_THRESHOLD =  0.7;

function firstTrait(nlp, name) {
  return nlp && nlp.entities && nlp.traits[name] && nlp.traits[name][0];
}

function handleMessage(sender_psid, message) {      
  const user = new User(sender_psid);
  const userData = await user.getUser();
  if(!userData) await user.saveUser();

  // check greeting is here and is confident
  const greeting = firstTrait(message.nlp, "wit$greetings");
  const datetime = firstTrait(message.nlp, "wit$datetime:$datetime");
  let response;
  console.log(JSON.stringify(message.nlp));
  if (greeting && greeting.confidence > CONFIDENCE_THRESHOLD) {
    response = {
      text: "Hello there! Can I have your name?",
    };
  } else {
    response = {
      text: "Hello there! Can I have your name?",
    };
  }
  if(datetime && datetime.confidence > CONFIDENCE_THRESHOLD) {
    response = {
      text: "what a wonderful date!"
    }
  }
  callSendAPI(sender_psid, response);
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

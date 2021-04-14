const request = require("request");
const User = require("./models/user");
const extractName = require("./nlp/extractName");
const { getHowManyDaysUntilBirthday } = require("./util/birthday");
const _ = require("lodash");

const CONFIDENCE_THRESHOLD = 0.7;

function firstTrait(nlp, name) {
  return nlp && nlp.entities && nlp.traits[name] && nlp.traits[name][0];
}

function getEntityValue(nlp, name) {
  return (
    nlp && nlp.entities && nlp.entities[name] && nlp.entities[name][0].value
  );
}

async function handleMessage(sender_psid, message) {
  const user = new User(sender_psid);
  const userData = await user.getUser();
  if (!userData) await user.saveUser();

  user.addMessage(message.text, "self");
  let response;

  // check greeting is here and is confident
  const greeting = firstTrait(message.nlp, "wit$greetings");

  switch (user.context) {
    case "get-name":
      const name = extractName(message.text);
      if (name) {
        response = {
          text: `Hello ${name}, nice to meet you! can I have your birthday?`,
        };
        user.setName(_.capitalize(name));
        user.setContext("get-birthdate");
      } else if (greeting && greeting.confidence > CONFIDENCE_THRESHOLD) {
        response = {
          text: "Hello there! Can i have your name?",
        };
      } else {
        response = {
          text: "Sorry i did not quite get that, can i have your name?",
        };
      }
      break;
    case "get-birthdate":
      console.log(JSON.stringify(message.nlp));
      const datetime = getEntityValue(message.nlp, "wit$datetime:datetime");
      if (datetime) {
        response = {
          text: `What a beautiful date, ${user.name}! Do you want to get how many days are left until your birthday?`,
        };
        user.setBirthdate(new Date(datetime));
        user.setContext("get-days-until-birthday");
      } else {
        response = {
          text: `Sorry i did not quite get that, ${user.name}, can you repeat it for me? (try using day-monthname-year format)`,
        };
      }
      break;
    case "get-days-until-birthday":
      if (message.text === "yes") {
        console.log(user.birthdate);
        response = {
          text: `There are ${getHowManyDaysUntilBirthday(
            user.birthdate
          )} days until your next birthday`,
        };
        user.setContext("user-complete");
      } else if (message.text === "no") {
        response = {
          text: "Goodbye 👋",
        };
        user.setContext("user-complete");
      } else {
        response = {
          text:
            "Sorry i did not quite get that, do you want to get how many days are left until your birthday?",
        };
      }
      break;
    case "user-complete":
      response = {
        text: `Welcome back ${user.name}!, do you want to know how many days are left until your birthday?`,
      };
      user.setContext("get-days-until-birthday");
      break;
    default:
      response = {
        text:
          "There is quite bit of a problem, please try sending another message",
      };
      const data = await user.getUser();
      if (!data.name) {
        user.setContext("get-name");
      } else if (!data.birthdate) {
        user.setContext("get-birthdate");
      } else {
        user.setContext("get-days-until-birthday");
      }
  }
  user.addMessage(response.text, "bot");

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

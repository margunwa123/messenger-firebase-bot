function createBirthdayAttachment() {
  return {
    type: "template",
    payload: {
      template_type: "generic",
      elements: [
        {
          title:
            "Do you want to know how many days are left until your birthday?",
          subtitle: "Tap a button to answer.",
          image_url:
            "https://thumbs.dreamstime.com/b/birthday-cake-decorated-colorful-sprinkles-ten-candles-colorful-birthday-cake-sprinkles-ten-candles-blue-142412983.jpg",
          buttons: [
            {
              type: "postback",
              title: "Yes!",
              payload: "yes",
            },
            {
              type: "postback",
              title: "No!",
              payload: "no",
            },
          ],
        },
      ],
    },
  };
}

module.exports = {
  createBirthdayAttachment,
};

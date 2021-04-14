const User = require("../models/user");

const router = require("express").Router();

router.get("/", async (req, res) => {
  const sender_psid = req.query.userId;
  console.log(sender_psid);
  const user = new User(sender_psid);

  try {
    const messages = await user.getAllMessages();
    res.send(messages);
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500).send("sorry there is an error");
  }
});

router.delete("/:messageId", async (req, res) => {
  const sender_psid = req.query.userId;
  const { messageId } = req.params;
  try {
    const user = new User(sender_psid);
    await user.deleteMessageById(messageId);

    res.send(`Deleted the message with id ${messageId}`);
  } catch (err) {
    console.log(err.message);
    res.sendStatus(400).send(`message with id ${messageId} does not exist`);
  }
});

router.get("/:messageId", async (req, res) => {
  const sender_psid = req.query.userId;
  const { messageId } = req.params;
  try {
    const user = new User(sender_psid);
    const message = await user.getMessageById(messageId);

    res.send(message);
  } catch (err) {
    console.log(err.message);

    res.statusCode(400).send(`message with id ${messageId} does not exist`);
  }
});

module.exports = router;

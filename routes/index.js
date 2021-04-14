const messageRouter = require("./messages");

export default function initiateRouter(app) {
  app.use("/messages", messageRouter);
}

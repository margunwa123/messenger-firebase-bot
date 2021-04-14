const messageRouter = require("./messages");
function initiateRouter(app) {
  app.use("/messages", messageRouter);
}

module.exports = initiateRouter;

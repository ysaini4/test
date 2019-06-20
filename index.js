const express = require("express");
const app = express();
app.use(express.json());
require("./startup/connectDB")();
require("./startup/connectRoutes")(app);
const port = process.env.PORT || 3001;
const server = app.listen(port, () => {
  console.log(`server is listening at ${port}`);
});

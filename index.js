const Server = require("./models/server");
require("dotenv").config();
const app = new Server();

app.execute();

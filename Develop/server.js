const express = require("express");
const htmlRoutes = require("./routes/htmlRoutes");
const apiRoutes = require("./routes/apiRoutes");

//create an express server
const PORT = process.env.PORT || 8080;
const app = express();

// Sets up the Express app to handle data parsing - makes it possible for us to access the parameters and body inside the routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

app.listen(PORT, function () {
  console.log("App listening on http://localhost:" + PORT);
});

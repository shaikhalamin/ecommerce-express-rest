//var http = require("http");

//create a server object:
//http
// .createServer(function(req, res) {
//   res.write("Hello World!"); //write a response to the client
// res.end(); //end the response
//})
//.listen(8080); //the server object listens on port 8080

const app = require("./app");

const port = process.env.PORT || 8080;
app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});

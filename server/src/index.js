const express = require("express");
const path = require("path");
const http = require("http");

const app = express();

const setHeaders = (response) => {
  // Set headers to prevent XS-Leaks and enable more timing precision
  // See: https://developer.mozilla.org/en-US/docs/Web/API/Performance/now#Reduced_time_precision
  response.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  response.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
};

const staticRoot = path.join(__dirname, "../../client/");
app.use(express.static(staticRoot, { setHeaders }));

const server = http.createServer(app);

server.listen(8080, function () {
  console.log("Listening on http://localhost:8080");
});
import express, { Response } from "express";
import { join } from "path";
import { createServer } from "http";

const app = express();

const setHeaders = (response: Response<any>) => {
  // Set headers to enable more timing precision
  // See: https://developer.mozilla.org/en-US/docs/Web/API/Performance/now#Reduced_time_precision
  response.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  response.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
};

const staticRoot = join(__dirname, "../../client/");
app.use(express.static(staticRoot, { setHeaders }));

const server = createServer(app);

server.listen(8080, function () {
  console.log("Listening on http://localhost:8080");
});

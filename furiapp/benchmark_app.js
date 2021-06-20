/**
 * FURI - Fast Uniform Resource Identifier
 * The Fast and Furious Node Router
 *
 * Copyright(c) 2016 Rajinder Yadav
 *
 * Labs DevMentor.org Corp. <info@devmentor.org>
 * This code is released as-is without warranty under the "GNU GENERAL PUBLIC LICENSE".
 */

const Furi = require("furi").Furi;
const furi = Furi.create();
const USER_AGENT = "FURI Node Server (v0.1)";

/*
furi.get("/", (req, res) => {

  res.writeHead(200, {
    "Content-Type": "text/html",
    "User-Agent": USER_AGENT
  });

  res.write("<h1>FURI</h1>\n");
  res.write("<p>Welcome to Node FURI, the fast and furiour Node Router!</p>\n");
  res.end();

});

furi.get("/about", (req, res) => {

  res.writeHead(200, {
    "Content-Type": "text/html",
    "User-Agent": USER_AGENT
  });

  res.write("<h1>About FURI</h1>\n");
  res.write("<p>FURI is a high-performance Node router for realtime Web-Apps.\n");
  res.end();

});
*/

furi.get("/benchmark1", (req, res) => {
  res.end("<h1>Benchmark</h1><p>Hello from the benchmark page!</p>\n");
});

// Test with input: http://localhost:3000/benchmark2/profile/bench/post/post1242
furi.get("/benchmark2/profile/:user/post/:post_id", (req, res) => {
  res.end(`<h1>Benchmark</h1><p>User: ${req.params.user} post id: ${req.params.post_id}`);
});

const server = furi.listen(3000);

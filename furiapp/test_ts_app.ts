/**
 * FURI - Fast Uniform Resource Identifier
 * The Fast and Furious Node Router
 *
 * Copyright(c) 2016 Rajinder Yadav
 *
 * Labs DevMentor.org Corp. <info@devmentor.org>
 * This code is released as-is without warranty under the "GNU GENERAL PUBLIC LICENSE".
 */

import {Furi} from "furi";

const furi = Furi.create();

const USER_AGENT: string = "FURI Node Server (v0.1)";

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

const server = furi.listen(3000);

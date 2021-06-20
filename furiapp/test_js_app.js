/**
 * FURI - Fast Uniform Resource Identifier
 * The Fast and Furious Node Router
 *
 * Copyright(c) 2016 Rajinder Yadav
 *
 * Labs DevMentor.org Corp. <info@devmentor.org>
 * This code is released as-is without warranty under the "GNU GENERAL PUBLIC LICENSE".
 */
"use strict";
var http = require("http");
var furi_1 = require("furi");
var furi = furi_1.Furi.create();
var USER_AGENT = "FURI Node Server (v0.1)";
furi.get("/", function (req, res) {
    res.writeHead(200, {
        "Content-Type": "text/html",
        "User-Agent": USER_AGENT
    });
    res.write("<h1>FURI</h1>\n");
    res.write("<p>Welcome to Node FURI, the fast and furiour Node Router!</p>\n");
    res.end();
});
furi.get("/about", function (req, res) {
    res.writeHead(200, {
        "Content-Type": "text/html",
        "User-Agent": USER_AGENT
    });
    res.write("<h1>About FURI</h1>\n");
    res.write("<p>FURI is a high-performance Node router for realtime Web-Apps.\n");
    res.end();
});
var server = http.createServer(furi.handler()).listen(3000);

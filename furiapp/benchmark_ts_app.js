"use strict";
/**
 * FURI - Fast Uniform Resource Identifier
 * The Fast and Furious Node Router
 *
 * Copyright(c) 2016 Rajinder Yadav
 *
 * Labs DevMentor.org Corp. <info@devmentor.org>
 * This code is released as-is without warranty under the "GNU GENERAL PUBLIC LICENSE".
 */
exports.__esModule = true;
var furi_1 = require("furi");
var furi = furi_1.Furi.create();
var USER_AGENT = "FURI Node Server (v0.1)";
furi.get("/benchmark1", function (req, res) {
    res.end("<h1>Benchmark</h1><p>Hello from the benchmark page!</p>\n");
});
// Test with input: http://localhost:3000/benchmark2/profile/bench/post/post1242
furi.get("/benchmark2/profile/:user/post/:post_id", function (req, res) {
    res.end("<h1>Benchmark</h1><p>User: " + req.params.user + " post id: " + req.params.post_id);
});
var server = furi.listen(3000);

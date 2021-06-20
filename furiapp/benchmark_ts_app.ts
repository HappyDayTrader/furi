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

furi.get("/benchmark1", (req, res) => {

  res.end("<h1>Benchmark</h1><p>Hello from the benchmark page!</p>\n");

});

// Test with input: http://localhost:3000/benchmark2/profile/bench/post/post1242
furi.get("/benchmark2/profile/:user/post/:post_id", (req, res) => {

  res.end(`<h1>Benchmark</h1><p>User: ${req.params.user} post id: ${req.params.post_id}`);

});

const server = furi.listen(3000);

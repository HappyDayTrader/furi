var express = require('express');
var app = express();

app.get('/benchmark1', function (req, res) {
  res.end("<h1>Benchmark</h1><p>Hello from the benchmark page!</p>\n");
});

app.get('/benchmark2/profile/:user/post/:post_id', function (req, res) {
  res.end(`<h1>Benchmark</h1><p>User: ${req.params.user} post id: ${req.params.post_id}`);
});

app.listen(3000, function () {
  console.log('Benchmark app listening on port 3000!');
});


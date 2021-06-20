/**
 * FURI - Fast Uniform Resource Identifier
 *
 * The Fast and Furious Node Router
 * Copyright(c) 2016 Rajinder Yadav
 *
 * Labs DevMentor.org Corp. <info@devmentor.org>
 * This code is releases as-is without warranty under the "GNU GENERAL PUBLIC LICENSE".
 */

// 1) Compile in watch mode: tsc --watch test.ts
// 2) Run test with verbose errors: mocha --reporter spec


/* Sample response JSON
{
   "req":{
      "method":"GET",
      "url":"localhost:3000",
      "headers":{
         "user-agent":"node-superagent/3.4.1"
      }
   },
   "header":{
      "content-type":"text/html",
      "user-agent":"FURI Node Server (v0.1)",
      "date":"Mon, 06 Feb 2017 04:30:12 GMT",
      "connection":"close",
      "transfer-encoding":"chunked"
   },
   "status":200,
   "text":"<h1>FURI</h1>\n<p>Welcome to Node FURI, the fast and furiour Node Router!</p>\n"
}
*/

const test = require("tape");
const axios = require("axios");

test("Root path without end slash", t => {
const s = "<h1>FURI</h1>\n<p>Welcome to Node FURI, the fast and furiour Node Router!</p>\n";
axios
  .get("http://localhost:3000")
  .then(res => {
    t.equal(res.data, s);
    t.equal(res.status, 200);
    t.end();
  })
  .catch(err => {
    console.log("ERROR: GET");
  });
});

test("Root path with end slash", t => {
const s = "<h1>FURI</h1>\n<p>Welcome to Node FURI, the fast and furiour Node Router!</p>\n";
axios
  .get("http://localhost:3000/")
  .then(res => {
    t.equal(res.data, s);
    t.equal(res.status, 200);
    t.end();
  })
  .catch(err => {
    console.log("ERROR: GET");
  });
});

test("Root path with query string", t => {
const s = "<h1>FURI</h1>\n<p>Welcome to Node FURI, the fast and furiour Node Router!</p>\n";
axios
  .get("http://localhost:3000?q=dfjriour")
  .then(res => {
    t.equal(res.data, s);
    t.equal(res.status, 200);
    t.end();
  })
  .catch(err => {
    console.log("ERROR: GET");
  });
});

test("Root path with end slash and query string", t => {
const s = "<h1>FURI</h1>\n<p>Welcome to Node FURI, the fast and furiour Node Router!</p>\n";
axios
  .get("http://localhost:3000/?q=dfjriour")
  .then(res => {
    t.equal(res.data, s);
    t.equal(res.status, 200);
    t.end();
  })
  .catch(err => {
    console.log("ERROR: GET");
  });
});

test("About without end slash", t => {
const s = "<h1>About FURI</h1>\nThis is the about page.\n";
axios
  .get("http://localhost:3000/about")
  .then(res => {
    t.equal(res.data, s);
    t.equal(res.status, 200);
    t.end();
  })
  .catch(err => {
    console.log("ERROR: GET");
  });
});

// test("About with end slash", t => {
// const s = "<h1>About FURI</h1>\nThis is the about page.\n";
// axios
//   .get("http://localhost:3000/about/")
//   .then(res => {
//     t.equal(res.data, s);
//     t.equal(res.status, 200);
//     t.end();
//   })
//   .catch(err => {
//     console.log("ERROR: GET");
//   });
// });

// test("About with query string", t => {
// const s = "<h1>About FURI</h1>\nThis is the about page.\n";
// axios
//   .get("http://localhost:3000/about?s=45bnj34")
//   .then(res => {
//     t.equal(res.data, s);
//     t.equal(res.status, 200);
//     t.end();
//   })
//   .catch(err => {
//     console.log("ERROR: GET");
//   });
// });

// test("About with end slash and query string", t => {
// const s = "<h1>About FURI</h1>\nThis is the about page.\n";
// axios
//   .get("http://localhost:3000/about/?we=394845hjh")
//   .then(res => {
//     t.equal(res.data, s);
//     t.equal(res.status, 200);
//     t.end();
//   })
//   .catch(err => {
//     console.log("ERROR: GET");
//   });
// });

test("/about/raj12", t => {
const user_id = "raj12";
const s = `<h1>About User Page!</h1>\nUser page for: ${user_id}\n`;
axios
  .get(`http://localhost:3000/about/${user_id}`)
  .then(res => {
    t.equal(res.data, s);
    t.equal(res.status, 200);
    t.end();
  })
  .catch(err => {
    console.log("ERROR: GET");
  });
});

// test("/about/raj12/", t => {
// const user_id = "raj12";
// const s = `<h1>About User Page!</h1>\nUser page for: ${user_id}\n`;
// axios
//   .get(`http://localhost:3000/about/${user_id}/`)
//   .then(res => {
//     t.equal(res.data, s);
//     t.equal(res.status, 200);
//     t.end();
//   })
//   .catch(err => {
//     console.log("ERROR: GET");
//   });
// });

// test("/about/raj12?er=345o85", t => {
// const user_id = "raj12";
// const s = `<h1>About User Page!</h1>\nUser page for: ${user_id}\n`;
// axios
//   .get(`http://localhost:3000/about/${user_id}?er=345o85`)
//   .then(res => {
//     t.equal(res.data, s);
//     t.equal(res.status, 200);
//     t.end();
//   })
//   .catch(err => {
//     console.log("ERROR: GET");
//   });
// });

// test("/about/raj12/?er=345o85", t => {
// const user_id = "raj12";
// const s = `<h1>About User Page!</h1>\nUser page for: ${user_id}\n`;
// axios
//   .get(`http://localhost:3000/about/${user_id}/?er=345o85`)
//   .then(res => {
//     t.equal(res.data, s);
//     t.equal(res.status, 200);
//     t.end();
//   })
//   .catch(err => {
//     console.log("ERROR: GET");
//   });
// });

test("/about/5612", t => {
const user_id = "5612";
const s = `<h1>About User Page!</h1>\nUser page for: ${user_id}\n`;
axios
  .get(`http://localhost:3000/about/${user_id}`)
  .then(res => {
    t.equal(res.data, s);
    t.equal(res.status, 200)
    t.end();
  })
  .catch(err => {
    console.log("ERROR: GET");
  });
});

test("User id and photo id route segments", t => {
const user_id = "5612";
const photo_id = "drjr3494nd";
const s = `<h1>User Photo Page!</h1>\nUser ${user_id} photo ${photo_id}\n`;
axios
  .get(`http://localhost:3000/user/${user_id}/photo/${photo_id}`)
  .then(res => {
    t.equal(res.data, s);
    t.equal(res.status, 200)
    t.end();
  })
  .catch(err => {
    console.log("ERROR: GET");
  });
});

test("Toronto Regex segmented path 1", t => {
const code = "fd034j";
const s = `<h1>Toronto Canada</h1>\nCode is ${code}\n`;
const path=`/toronto/${code}/can`;
axios
  .get(`http://localhost:3000${path}`)
  .then(res => {
    t.equal(res.data, s);
    t.equal(res.status, 200)
    t.end();
  })
  .catch(err => {
    console.log("ERROR: GET");
  });
});

test("Toronto Regex segmented path 2", t => {
const code = "fd034j";
const s = `<h1>Toronto Canada</h1>\nCode is ${code}\n`;
const path=`/toronto/${code}/ca233n`;
axios
  .get(`http://localhost:3000${path}`)
  .then(res => {
    t.equal(res.data, s);
    t.equal(res.status, 200)
    t.end();
  })
  .catch(err => {
    console.log("ERROR: GET");
  });
});

test("Toronto Regex segmented path 3", t => {
const code = "fd034j";
const s = `<h1>Toronto Canada</h1>\nCode is ${code}\n`;
const path=`/torrronto/${code}/can`;
axios
  .get(`http://localhost:3000${path}`)
  .then(res => {
    t.equal(res.data, s);
    t.equal(res.status, 200)
    t.end();
  })
  .catch(err => {
    console.log("ERROR: GET");
  });
});

test("Toronto Regex segmented path 4", t => {
const code = "fd034j";
const s = `<h1>Toronto Canada</h1>\nCode is ${code}\n`;
const path=`/torrronto/${code}/ca1233n`;
axios
  .get(`http://localhost:3000${path}`)
  .then(res => {
    t.equal(res.data, s);
    t.equal(res.status, 200)
    t.end();
  })
  .catch(err => {
    console.log("ERROR: GET");
  });
});

test("Chaining handlers", t => {
const s = "<h1>Chained Handlers</h1>\n<p>This paragraph is form handler 1</p>\n<p>This paragraph is form handler 2</p>\n";
axios
  .get("http://localhost:3000/chain")
  .then(res => {
    t.equal(res.data, s);
    t.equal(res.status, 200);
    t.end();
  })
  .catch(err => {
    console.log("ERROR: GET");
  });
});

test("Chaining handlers halting", t => {
  const s = "<h1>Chained Handlers</h1>\n<p>This paragraph is form handler 1</p>\n";
  axios
    .get("http://localhost:3000/chainhalt")
    .then(res => {
      t.equal(res.data, s);
      t.equal(res.status, 200);
      t.end();
    })
    .catch(err => {
      console.log("ERROR: GET");
    });
  });

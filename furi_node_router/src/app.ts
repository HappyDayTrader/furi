/**
 * FURI - Fast Uniform Resource Identifier
 * The Fast and Furious Node Router
 *
 * Copyright(c) 2016 Rajinder Yadav
 *
 * Labs DevMentor.org Corp. <info@devmentor.org>
 * This code is released as-is without warranty under the "GNU GENERAL PUBLIC LICENSE".
 */

import { Furi } from "./furi";

const furi = Furi.create();

const USER_AGENT: string = "FURI Node Server (v0.1)";

// HTTP GET

furi.get( "/", ( req, res ) => {

  res.writeHead( 200, {
    "Content-Type": "text/html",
    "User-Agent": USER_AGENT
  } );

  res.write( "<h1>FURI</h1>\n" );
  res.write( "<p>Welcome to Node FURI, the fast and furiour Node Router!</p>\n" );
  res.end();

} );

furi.get( "/about", ( req, res ) => {

  res.writeHead( 200, {
    "Content-Type": "text/html",
    "User-Agent": USER_AGENT
  } );

  res.end( "<h1>About FURI</h1>\nThis is the about page.\n" );

} );

furi.get( "/about/:user_id", ( req, res ) => {

  res.writeHead( 200, {
    "Content-Type": "text/html",
    "User-Agent": USER_AGENT
  } );

  res.end( `<h1>About User Page!</h1>\nUser page for: ${ req.params.user_id }\n` );

} );

furi.get( "/user/:user_id/photo/:photo_id", ( req, res ) => {

  res.writeHead( 200, {
    "Content-Type": "text/html",
    "User-Agent": USER_AGENT
  } );

  res.end( `<h1>User Photo Page!</h1>\nUser ${ req.params.user_id } photo ${ req.params.photo_id }\n` );

} );


furi.get( "/tor+onto/:code/ca\\d*n$", ( req, res ) => {

  res.writeHead( 200, {
    "Content-Type": "text/html",
    "User-Agent": USER_AGENT
  } );

  res.end( `<h1>Toronto Canada</h1>\nCode is ${ req.params.code }\n` );

} );


// Handlers can be chained
// call res.end() and return false to terminate the call chain at any point.
furi.get( "/chain", ( req, res ) => {

  // Header can only be set once!
  res.writeHead( 200, {
    "Content-Type": "text/html",
    "User-Agent": USER_AGENT
  } );

  res.write( "<h1>Chained Handlers</h1>\n<p>This paragraph is form handler 1</p>\n" );
  // Uncomment next 2 lines to stop here!
  // res.end();
  // return false;

}, ( req, res ) => {

  res.end( "<p>This paragraph is form handler 2</p>\n" );

} );

// Handlers can be chained
// call res.end() and return false to terminate the call chain at any point.
furi.get( "/chainhalt", ( req, res ) => {

  // Header can only be set once!
  res.writeHead( 200, {
    "Content-Type": "text/html",
    "User-Agent": USER_AGENT
  } );

  res.write( "<h1>Chained Handlers</h1>\n<p>This paragraph is form handler 1</p>\n" );
  // Uncomment next 2 lines to stop here!
  res.end();
  return false;

}, ( req, res ) => {

  res.end( "<p>This paragraph is form handler 2</p>\n" );

} );

// HTTP PATCH
furi.patch( "/comment", ( req, res ) => {

  // Header can only be set once!
  res.writeHead( 200, {
    "Content-Type": "text/html",
    "User-Agent": USER_AGENT
  } );

  res.end( "PATCH a fresh comment." );

} );

furi.patch( "/comment/how-to", ( req, res ) => {

  // Header can only be set once!
  res.writeHead( 200, {
    "Content-Type": "text/html",
    "User-Agent": USER_AGENT
  } );

  res.end( "PATCH How to post a comment page." );

} );

furi.patch( "/comment/:id", ( req, res ) => {

  // Header can only be set once!
  res.writeHead( 200, {
    "Content-Type": "application/json",
    "User-Agent": USER_AGENT
  } );

  let body = [];
  let text: string;

  req.on("data", chunk => {
    body.push(chunk);
  }).
  on("end", () => {
    text = Buffer.concat(body).toString();
    res.end( `PATCH comment with id: ${ req.params.id }\n${text}` );
  });

} );

// HTTP POST
furi.post( "/comment", ( req, res ) => {

  // Header can only be set once!
  res.writeHead( 200, {
    "Content-Type": "text/html",
    "User-Agent": USER_AGENT
  } );

  res.end( "POST a fresh comment." );

} );

furi.post( "/comment/how-to", ( req, res ) => {

  // Header can only be set once!
  res.writeHead( 200, {
    "Content-Type": "text/html",
    "User-Agent": USER_AGENT
  } );

  res.end( "POST How to post a comment page." );

} );

furi.post( "/comment/:id", ( req, res ) => {

  // Header can only be set once!
  res.writeHead( 200, {
    "Content-Type": "application/json",
    "User-Agent": USER_AGENT
  } );

  let body = [];
  let text: string;

  req.on("data", chunk => {
    body.push(chunk);
  }).
  on("end", () => {
    text = Buffer.concat(body).toString();
    res.end( `POST comment with id: ${ req.params.id }\n${text}` );
  });

} );

// HTTP PUT
furi.put( "/comment", ( req, res ) => {

  // Header can only be set once!
  res.writeHead( 200, {
    "Content-Type": "text/html",
    "User-Agent": USER_AGENT
  } )

  res.end( "PUT a fresh comment." );

} );

furi.put( "/comment/how-to", ( req, res ) => {

  // Header can only be set once!
  res.writeHead( 200, {
    "Content-Type": "text/html",
    "User-Agent": USER_AGENT
  } );

  res.end( "PUT How to post a comment page." );

} );

furi.put( "/comment/:id", ( req, res ) => {

  // Header can only be set once!
  res.writeHead( 200, {
    "Content-Type": "text/html",
    "User-Agent": USER_AGENT
  } );

  res.end( `PUT comment with id: ${ req.params.id }` );

} );

// HTTP DELETE
furi.delete( "/comment", ( req, res ) => {

  // Header can only be set once!
  res.writeHead( 200, {
    "Content-Type": "text/html",
    "User-Agent": USER_AGENT
  } );

  res.end( "DELETE a comment." );

} );

furi.delete( "/comment/how-to", ( req, res ) => {

  // Header can only be set once!
  res.writeHead( 200, {
    "Content-Type": "text/html",
    "User-Agent": USER_AGENT
  } );

  res.end( "DELETE How to post a comment page." );

} );

furi.delete( "/comment/:id", ( req, res ) => {

  // Header can only be set once!
  res.writeHead( 200, {
    "Content-Type": "text/html",
    "User-Agent": USER_AGENT
  } );

  res.end( `DELETE comment with id: ${ req.params.id }` );

} );

// const server = http.createServer(furi.handler()).listen(3000);
const server = furi.listen( 3000 );

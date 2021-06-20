/**
 * FURI - Fast Uniform Resource Identifier
 *
 * The Fast and Furious Node Router
 * Copyright(c) 2016 Rajinder Yadav
 *
 * Labs DevMentor.org Corp. <info@devmentor.org>
 * This code is released as-is without warranty under the "GNU GENERAL PUBLIC LICENSE".
 */
import * as http from "http";
import { IncomingMessage, ServerResponse, Server } from "http";

// Debug logging - comment our for production builds.
// const LOG_DEBUG = ( ...s: any[] ) => console.log( ...s );
const LOG_WARN = ( ...s: any[] ) => console.log( "WARNING!", ...s );
/**
 * API Version.
 */
const API_VERSION: string = "0.1.0";

/**
 * HTTP method constants
 */
enum HTTP {
  GET,
  PATCH,
  POST,
  PUT,
  DELETE
}

/**
 * Function prototype for Request Handler
 *
 * This is pretty much the same function signature as http.Server, that is returned by http.createServer()
 *
 * @param request: IncomingMessage
 * @param response: ServerResponse
 *
 * @return boolean | void - return false to cancel remaining handlers.
 *
 * When multiple request handlers are passed in as an array,
 * any one may return false to prevent the remaining handlers from getting executed.
 */
export interface RequestHandlerFunc {
  ( request: any, response: any ): boolean | void;
}

/**
 * Named segments and the handler callback function for associated URI.
 */
interface UriMapHandler {
  callback: RequestHandlerFunc[];
}

/**
 * Place holder: Route attributes, uri, list of named params, handler callback.
 * key is a regex string of path with named segments.
 */
interface NamedParam {
  key: string;        // RegEx URI string
  param: string[];    // URI named segments
  callback: RequestHandlerFunc[];
}

/**
 * Maps URI to named params and handler callback function.
 * For URI with named segments, the callback will be found under named_param.
 * For URI direct matches, the callbacks will be found in uri_map.
 */
interface UriMap {
  named_param?: any[];      // NamedParam
  uri_map: UriMapHandler[];
}

/**
 * Router Class, matches URI for fast dispatch to handler.
 */
export class Furi {

  private _self: Furi = null;

  private _method: UriMap[] = [
    { uri_map: [] },  // GET
    { uri_map: [] },  // PATCH
    { uri_map: [] },  // POST
    { uri_map: [] },  // PUT
    { uri_map: [] }   // DELETE
  ];

  /**
   * Class static method. Create instance of Router object.
   * @returns Instance of class Furi.
   */
  static create(): Furi {
    // LOG_DEBUG(Furi.getApiVersion());
    const furi = new Furi();
    return furi.setSelf( furi );
  }

  /**
   * Get Router API version.
   * @returns API version as a string.
   */
  static getApiVersion(): string {
    return `FURI (v${ API_VERSION })`;
  }

  /**
   * Internal helper method, saves reference to self for binding methods.
   * @param self  Instance of class Furi.
   * @returns     Reference to self.
   */
  setSelf( self: Furi ): Furi {
    this._self = self;
    return self;
  }

  listen( port: number ): Server {
    const server: Server = http.createServer( this.handler() );
    server.listen( port );
    return server;
  }
  /**
   * Node requires a handler function for incoming HTTP request.
   * This handler function is usually passed to createServer().
   * @returns Reference to request handler function.
   */
  handler(): any {
    return this.dispatch.bind( this._self );
  }

  /**
   * Convert URI with Named Segments into a RegEx string to be matched against
   * and collect segement names.
   *
   * @param  uri URI with segment names.
   * @return Object with regex key and array with segment names.
   */
  createPathRegExKeyWithSegments( uri: string ): { segments: string[], key: string } {

    let tokens: string[] = uri.split( "/" );
    let segments: string[] = [];
    let key: string = "";

    tokens.forEach( tok => {

      if ( tok.startsWith( ":" ) ) {
        segments.push( tok.substr( 1 ) );
        key = `${ key }/(\\w+)`;
      } else {
        key = `${ key }/${ tok }`;
      }

    } ); // forEach

    return { segments: segments, key: key.substr( 1 ) };
  }

  /**
   * Match URI with named segments and return param object containing
   * the property of each named segment and its value.
   *
   * @param uri: string The URI to be matched.
   * @param {segments: string[], key: string} Path object with RegEx key and segments.
   *
   * @return null If URI doesn't match Path Object.
   * @return param Object containing property and its value for each segment from Path object.
   */
  getURIParams( uri: string, pk: { param: string[], key: string }, request: any ): boolean {

    let pat = RegExp( pk.key );
    let match = pat.exec( uri );

    if ( match ) {
      // LOG_DEBUG( "URI with segment(s) matched: " + JSON.stringify( pk ) );
      pk.param.forEach( ( segment, i ) => {
        // LOG_DEBUG( "segment: " + segment );
        request.params[ segment ] = match[ i + 1 ];
      } );
      // LOG_DEBUG( `params: ${ JSON.stringify( request.params ) }` );
      return true;
    }
    return false;
  }

  /**
   * Assign a HTTP GET handler to the provided URI.
   * @param uri  String value of URI.
   * @param fn   Reference to callback function of type RequestHandlerFunc.
   * @returns    Reference to self, allows method chaining.
   */
  get( uri: string, ...fn: RequestHandlerFunc[] ): Furi {
    return this.assignRoute( this._method[HTTP.GET], uri, fn);
  }

  /**
   * Assign a HTTP PATCH handler to the provided URI.
   * @param uri  String value of URI.
   * @param fn   Reference to callback function of type RequestHandlerFunc.
   * @returns    Reference to self, allows method chaining.
   */
  patch( uri: string, ...fn: RequestHandlerFunc[] ): Furi {
    return this.assignRoute( this._method[HTTP.PATCH], uri, fn);
  }

  /**
   * Assign a HTTP POST handler to the provided URI.
   * @param uri  String value of URI.
   * @param fn   Reference to callback function of type RequestHandlerFunc.
   * @returns    Reference to self, allows method chaining.
   */
  post( uri: string, ...fn: RequestHandlerFunc[] ): Furi {
    return this.assignRoute( this._method[HTTP.POST], uri, fn);
  }

  /**
   * Assign a HTTP PUT handler to the provided URI.
   * @param uri  String value of URI.
   * @param fn   Reference to callback function of type RequestHandlerFunc.
   * @returns    Reference to self, allows method chaining.
   */
  put( uri: string, ...fn: RequestHandlerFunc[] ): Furi {
    return this.assignRoute( this._method[HTTP.PUT], uri, fn);
  }

  /**
   * Assign a HTTP DELETE handler to the provided URI.
   * @param uri  String value of URI.
   * @param fn   Reference to callback function of type RequestHandlerFunc.
   * @returns    Reference to self, allows method chaining.
   */
  delete( uri: string, ...fn: RequestHandlerFunc[] ): Furi {
    return this.assignRoute( this._method[HTTP.DELETE], uri, fn);
  }

  /**
   * Assign a HTTP GET handler to the provided URI.
   * @param method  The URI Map used to look up callback
   * @param uri     String value of URI.
   * @param fn      Reference to callback function of type RequestHandlerFunc.
   * @returns    Reference to self, allows method chaining.
   */
  assignRoute( method: UriMap,
               uri: string,
               fn: RequestHandlerFunc[]): Furi {

    // LOG_DEBUG(uri);

    // https://tools.ietf.org/html/rfc3986
    let re = /^\/?[a-zA-z]+([a-zA-Z0-9/.+\-_]*\w+)?$/;

    // Ignore query string and fragment, path
    // const i = uri.search( /[;?]/ );
    // if ( i !== -1 ) { uri = uri.substr( 0, i ); }
    // if ( uri.endsWith( "/" ) ) { uri = uri.substr( 0, uri.length - 1 ); }

    if ( re.test( uri ) ) {
      method.uri_map[ uri ] = { callback: fn };
    } else {
      let bucket = 0;
      for ( let i = 0; i < uri.length; ++i ) {
        if ( uri[ i ] === "/" ) { ++bucket; }
      }

      if ( !method.hasOwnProperty( "named_param" ) ) {
        method[ "named_param" ] = [];
      }

      let rv = this.createPathRegExKeyWithSegments( uri );
      if ( !method.named_param[ bucket ] ) {
        method.named_param[ bucket ] = [ { key: rv.key, param: rv.segments, callback: fn }];
      } else {
        method.named_param[ bucket ].push( { key: rv.key, param: rv.segments, callback: fn } );
      }
      // LOG_DEBUG("rv: "+JSON.stringify(method.named_param[bucket]));
    }
    return this;
  }

  /**
   * This method routes HTTP request to an assigned handler.
   * If one does not exist a HTTP status error code is returned.
   * @param request   Reference to Node request object (IncomingMessage).
   * @param response  Reference to Node response object (ServerResponse).
   */
  dispatch( request: IncomingMessage, response: ServerResponse ): void {

    // LOG_DEBUG( request.method, request.url );

    switch ( request.method ) {
      case "GET":
        this.processHTTPMethod( this._method[HTTP.GET], request, response );
        break;

      case "PATCH":
        this.processHTTPMethod( this._method[HTTP.PATCH], request, response );
        break;

      case "POST":
        this.processHTTPMethod( this._method[HTTP.POST], request, response );
        break;

      case "PUT":
        this.processHTTPMethod( this._method[HTTP.PUT], request, response );
        break;

      case "DELETE":
        this.processHTTPMethod( this._method[HTTP.DELETE], request, response );
        break;

      default:
        response.writeHead( 501, "Not Implemented", {
          "Content-Type": "text/plain",
          "User-Agent": Furi.getApiVersion()
        } );
        console.error( "HTTP method is not supported." );
        response.end();
    } // switch
  }

  /**
   * This method calls the callback for the mapped URL if it exists.
   * If one does not exist a HTTP status error code is returned.
   * @param method    The URI Map used to look up callback
   * @param request   Reference to Node request object (IncomingMessage).
   * @param response  Reference to Node response object (ServerResponse).
   */
  processHTTPMethod( method: UriMap,
                     request: IncomingMessage,
                     response: ServerResponse ) {

    let URL = request.url;
    // Ignore query string and fragment, path
    // const i = URL.search( /[;?]|\/$/ );
    // if ( i !== -1 ) { URL = URL.substr( 0, i ); }
    // if ( URL.endsWith( "/" ) ) { URL = URL.substr( 0, URL.length - 1 ); }

    try {
      if ( method.uri_map[ URL ] ) {
        let callback_chain = method.uri_map[ URL ].callback;
        for ( let callback of callback_chain ) {
          let rv = callback( request, response );
          if ( rv === false ) { break; }
        }
      } else {
        if ( method.hasOwnProperty( "named_param" ) ) {
          let bucket = 0;
          for ( let i = 0; i < URL.length; ++i ) {
            if ( URL[ i ] === "/" ) { ++bucket; }
          }

          if ( method.named_param[ bucket ] ) {
            if ( !request.hasOwnProperty( "params" ) ) { request[ "params" ] = {}; }

            for ( let segment of method.named_param[ bucket ] ) {
              if ( this.getURIParams( URL, segment, request ) ) {
                // LOG_DEBUG(`params: ${JSON.stringify(request.params)}`);
                let callback_chain = segment.callback;
                for ( let callback of callback_chain ) {
                  let rv = callback( request, response );
                  if ( rv === false ) { break; }
                }
                return;
              }
            } // for
          }
        }
        throw "URI Not Found!";
      }
    } catch ( ex ) {
      LOG_WARN( "URI Not Found." );
      response.writeHead( 404, "Not Found", {
        "Content-Type": "text/plain",
        "User-Agent": Furi.getApiVersion()
      } );
      response.end();
    }
  }
}


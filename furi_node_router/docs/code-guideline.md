# Coding Guideline

```
FURI - Fast Uniform Resource Identifier
Copyright(c) 2016 Rajinder Yadav
Labs DevMentor.org Crop. `<info@devmentor.org>`
```

## Table of content

* [Introduction](#introduction)
* [No magic numbers](#no-magic-numbers)
* [No hoisting](#no-hoisting)
* [Null and undefined](#null-and-undefined)
* [Semicolon](#semicolon)
* [Indentation](#indentation)
* [Braces](#braces)
* [Quotes](#quotes)
* [Commas](#commas)
* [Equality operators](#equality-operators)
* [Not operator](#not-operator)
* [Naming convention](#naming-convention)
* [Constant](#constant)
* [Naming File](#naming-file)
* [Naming Variable](#naming-variable)
* [Examples](#examples)
* [Naming Class and Object property](#naming-class-and-object-property)
* [Naming Class](#naming-class)
* [Naming Function](#naming-function)
* [Naming Interface](#naming-interface)
* [Typing](#typing)
* [Typing Function parameter](#typing-function-parameter)
* [Typing Function return](#typing-function-return)
* [Logging The first line of defence!](#logging-the-first-line-of-defence)
* [Loops](#loops)
* [What to log](#what-to-log)
* [Error levels](#error-levels)
* [Comment](#comment)
* [Formatting and style](#formatting-and-style)
* [Style](#style)
* [Arrow function](#arrow-function)
* [Testing](#testing)
* [Code abstraction](#code-abstraction)

## Introduction

The purpose of this code guideline is to insure code is easy to read and maintain. That code looks consistent such that the style is the same throughout, as if written by one author. The principle being, "No one owns the code and everyone owns the code".

Written code must be self documenting. It must be clear from the name, what the purpose is for a:

* Variable
* Function
* Object
* Class
* Interface

Do not fall into the trap that the "code is the document". It is a poor choice for a document. If someone writes an incorrect rule, flawed logic, implements a broken algorithm or data structure how will anyone else know what the true purpose of the code is. One will only learn (incorrectly) from the flawed implementation, and without proper documentation there will be no other way to know its true purpose.

A document serves to define:

* Functional logic (business rules)
* Usage contract (Interface, API)
* Valid input
* Expect output
* Error codes

Do not assume code is obvious to others because it is obvious to you.

As soon as code is written, it instantly becomes an _Ancient artifact_. You must communicate to the _future_ civilization it purpose effectively.

## No magic numbers

Make use of `const` values or `enums`, do not hard-code numbers or string literals.

## No hoisting

Avoid hoisting, _always_ declare before use. Never use clever tricks to hoist functions inside function or code blocks.

## Null and undefined

_Never_ use `null` in the code, always use `undefined` to declare something has no value.

As a result you can always make use of `===` over `==` for checking an `undefined` value. Using `===` is much faster and also avoid type coercion.

## Semicolon

Always terminate a line of code with a semicolon.

## Indentation

Use two spaces for indenting code, do not use tabs.

## Braces

Always use braces, even for single line statement.

```js
if(condition) { a = -a; }

or

if(condition) {
  a = -a;
}
```

## Quotes

When using quotes, use double quotes before single quotes. The only time it is valid to use single quotes is when there is a string that must have a quoted word(s). This avoids the need to use a backslash "\" to escape a quote.

```js
let msg: string = "It is 'important' to use quotes correctly";
```

## Commas

No trailing commas on last line. For multiple lines, comma _must_ trail.

```js
const DAYS: string[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  ...
];
```

## Equality operators

Always use `===` or `!==` before `==` or `!=`.

## Not operator

Always add a space after the not operator.

```js
if( ! ready ) { ... }
```

## Naming Convention

Use long descriptive names. Reserve short or single letter names for loops or utility functions such as a swap function.

### Constant

Variable name must be all uppercase.

### Naming File

A Filename _must_ be lowercase and use Kebab-case. Each word is separated with a hyphen "-". A filename _must_ use the proper extension or mime-type.

`hello-word.ts`

### Naming Variable

A variable name _must_ be lowercase and use snake_casing. Words are separated with an underscore "_".

_Never_ prefix a variable name with special characters like '$' (example, $event).

A variable _must_ be declared using one of the following keywords:

1. let
1. const

A variables _must_ be declared with _explicit_ types.

Variable _must_ be assigned a (default) value when declared.

Do not use commas to declare multiple variables. Each variable _must_ be declared separately on its own line.

### Examples

```js
let msg: string = "";

let name: string = "Shivaji";

let obj: {type: string, action: string} = {};

let status_code: number = -1;
```

Variable declared using `const` must be in uppercase;

```js
const API_VERSIONS: string = "v0.1.0";
```

## Naming Class and Object property

Object variable name follow the same naming convention defined earlier.

A class property _must_ be prefixed with an underscore '_'.

A class property _must_ have one of the following access modifiers:

1. protected
1. private

The only time the `public` access modified should be used is when the class acts more like a regular "data" object used to pass a group of related properties together.

For class variable access, use a method to control or restrict access. If you insist on having a property style access over method access, then make use of _getter_ and _setter_.

## Naming Class

A Class name _must_ use PascalCase. Each word in the name is capitalized.

```js
class HelloWorld {
}
```

## Naming Function

A Function name _must_ be camelCase, name starts lowercase and each word thereafter is capitalized.

```js
function loadData() {
}
```

## Naming Interface

A type Interface name _must_ be prefixed with an "I" and use Pascal-case.

```js
interface IDatabase {
}
```

A function type interface _must_ also have a postfix of "Func" in the name.

```js
interface ICallbackFunc {
}
```

## Typing

In TypeScript code, all types _must_ explicitly declare their type.

## Typing Function parameter

Each function parameter _must_ have an explicit type.

```js
function copyBuffer(src: number[],
                    dest: number[],
                    index: number): number
```

Argument that is an objects type, is better defined as an Interface to keep the code concise.


```js
function insertUser( data: {name: string,
                            surname: string,
                            uid: string,
                            password: string} ): boolean

```

Below we added and optional "index" property.

```js
Interface IUserModel {
  index?:   any,
  name:     string,
  surname:  string,
  uid:      string,
  password: string
}

function insertUser( data: IUserModel )
```

## Typing Function return

A function _must_ declare and explicit return type. For a function not returning a value, use the type "void".

```js
function negate(val: number): void
```

Avoid making use of the the type "any", when possible use the correct type.

## Logging The first line of defence!

Put considerable thought into logging, allow support to identify cause of issue and correct it without having to call you at 3AM! Also you want to be able to get up and running ASAP after an error, specially critical ones.

Domains for logging

* Development
* Production
* Monitoring
* Journaling (Audit trail)

Follow these rules when logging to avoid performance penalties.

1. Always log to a file, never to console.
1. Never log inside a loop.
1. Avoid logging inside a heavily used function.
1. Use separate logging for production and development.
1. In production release, comment out development logging.

All console logging should be commented out in production release.

Write log on a separate line so they can easily be found and commented out using a script.

## Loops

Do not use the `for` loop. Instead, use of one of the following:

* `forEach`
* `for of`
* `for in`
* `map`
* `filter`
* `reduce`

## What to Log

Never log sensitive data like: User name, account, passwords.

A log should have the following format:

    DD-MM-YY HH:MM:SS:MS PID LEVEL EID TEST

1. Date & Time stamp UTC.
1. PID
1. Error Level
1. Error code, well defined.
1. Location of error (file, function) to find point of error in code.
1. Description that is clear, concise and understandable by admin.

Each log statement **must** end with a period.

For all major errors, dump the stack to file!

## Error levels

```js
Debug    - For development, never should see in production logs.    l
Info     - An action was performed, useful for auditing.
Warn     - A alert such as memory low, request timing out, etc.
Error    - A error that is recoverable without crashing, need to be looked at.
Critical - Unrecoverable error. Stops the world, requires a reboot.
```

## Comment

The comment style followed is JSDoc. Make sure to comment:

* File
* Function
* Class or Object
* Interface
* Enums
* Blocks of code

For _ALL_ blocks of code, comment what the code block does, not have it does something.

## Formatting and style

You can ignore formatting for the most part and just type the code, it will be run through a code formatter to make the source code uniform. Fix any error that is generated by the code linter.

### Style

```js
if ( condition ) {

} else if ( condition ) {

} else {

}

try {

} catch( ex ) {

}

// Parameter alignment
function Fn( arg1: type,
             arg2: type,
             arg3: type ): type {
}
```

### Arrow function

For single argument, do not use parenthesis.

```js
const size = buf => buf.size;

const max = (x, y) => x > y ? x : y;
```

## Testing

All code _must_ have a set of unit tests.

* For _Node_ based code, use _Tape_ to testing.
* Do not use BBD for writing test, _must_ be assert based methods.

## Code abstraction

Keep the code as simple and easy to read from a single place. Do not abstract design, this overloads the mind and causes context-switching.

Abstract code only when it is _absolutely_ necessary, re-think of an alternative simpler design first. Do not over engineer code for the future, extra code, API, functions that do not get used as _dead-code_.

The best thing a programmer can do is delete code!

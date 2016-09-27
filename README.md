# nullable
plain implementation of Maybe (Optional, Nullable) monad

[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
 [![Build Status](https://travis-ci.org/jsdnxx/nullable.svg?branch=master)](https://travis-ci.org/jsdnxx/nullable)

## example usage & motivation
Can you spot the error?
```js
const userA = {name: 'Basha', pet: null}
const userB = {name: 'Cheyenne', pet: {name: 'Adonis', species: 'cat'}}
const users = [userA, userB]

users.forEach(user => {
  console.log(`Hi ${user.name} and ${user.pet.name} the ${user.pet.species}!`)
})
// * this will give us a null reference error!
// TypeError: Cannot read property 'name' of null
```

Instead, we could enclose the assumption that the user has a pet using Nullable:

```js
const Nullable = require('nullable')

users.forEach(user => {
  console.log(`Hi ${user.name}${
  Nullable(user.pet)
    .map({name, species} => ` and ${name} the ${species}`)
    .orDefault('')
  }!`)
})
// => 'Hi Basha!'
// => 'Hi Cheyenne and Adonis the cat!'
```

We can do some other things with Nullables, too:

```js
const foo = Nullable({a: {b: c: 5}, bar: () => 23})
console.log(
foo.get('a').get('b').get('c').map((x) => x + 5)
  .orDefault('??')
)
// => 10

foo.get('c').orDefault('??')
// => '??'

foo.call('bar').orDefault('??')
// => 23
```

Depending on your background, you may also know this as `Maybe` or `Option` or `Nullable Struct`s.

`Nullable` works similar to `Promise`s, in that it is a container datatype which wraps a value which *may be null, or else have a value*.

The idea is that all operations and transformations that are done on this value should only happen once and if the value is *not null* - and if it is, we can avoid explicit and error-prone manual null checking.

If you're sick of seeing errors like `Uncaught TypeError: Cannot read property 'name' of null` in your programs, I encourage you to use `Nullable`s.

You may use Nullables as a functional utility library, like you might `lodash`, or you can model your objects with nullables so you may call methods directly.

The general pattern is:
1. enclose the part of your program that depends on certain data always being there
2. do any operations or transformations using `Nullable#map()`. Calling this always returns another Nullalbe, like how `Promise#then()` always returns another Promise.
3. When you're done, get at the value by calling `orDefault(val)`, providing a default value.

This follows the same general pattern as Promises: **wrap** - **map** - ** unwrap**


## api

### `Nullable : (T) => Nullable<T>`
Constructor, may be called with or without `new`

** also aliased as Nullable.of and Nullable#of (both static and instance methods) ** 

### `Nullable<T>#map : (fn: (T)=>T2) => Nullable<T2>`
Map a function `fn` to the value if available. Returns a Nullable of the return type of `fn`. Analogous to `Array#map`

### `Nullable<T>#call : (String, ...Any) => Nullable<T2>`
Call a method on the underlying value if available. Returns a Nullable of the return type of the method. Additional parameters are optional and work like `Function#call`

### `Nullable<T>#orDefault : (Any) => T | Any`
Returns the underlying value if available, or the default argument specified.

** this method is also aliased as `Nullable<T>#orElse`, which may feel more intuitive to you **

## additional exposed properties
It is preferable to interact with Nullable via the `map`, `call`, and `orDefault` methods, but the following properties are exposed. Using them, and especially changing them, can make your programs more error-prone and harder to understand and reason about. Caveat utilitor.

### `Nullable<T>#value : T?`
Access the underlying value, if available. May be `null` or `undefined`

### `Nullable<T>#hasValue : Boolean`

### `Nullable<T>#isNull : Boolean`

### `Nullable<T>#isUndefined : Boolean`


## installation

    $ npm install nullable


## running the tests

From package root:

    $ npm install
    $ npm test


## contributors

- jason@denizac.org


## license

ISC. (c) MMXVI jason@denizac.org. See LICENSE.md

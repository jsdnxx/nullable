# nullable
plow bravely ahead!

## usage
```js
var Nullable = require('nullable')

var foo = Nullable(null)

console.log(
foo.map(function (x) { return x + 5 })
  .call('toString', 16)
  .orDefault('b33f')
)
// => 'b33f'
```


## api

### `Nullable : (T) => Nullable<T>`
Constructor, may be called with or without `new`

### `Nullable<T>#map : (fn: (T)=>T2) => Nullable<T2>`
Map a function `fn` to the value if available. Returns a Nullable of the return type of `fn`. Analogous to `Array#map`

### `Nullable<T>#call : (String, ...Any) => Nullable<T2>`
Call a method on the underlying value if available. Returns a Nullable of the return type of the method. Additional parameters are optional and work like `Function#call`

### `Nullable<T>#orDefault : (Any) => T | Any`
Returns the underlying value if available, or the default argument specified.

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

- jden <jason@denizac.org>


## license

MIT. (c) MMXIII AgileMD <hello@agilemd.com> See LICENSE.md

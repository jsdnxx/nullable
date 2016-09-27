// (T) => Nullable<T>
function Nullable (val) {
  if (!(this instanceof Nullable)) { return new Nullable(val) }
  if (val instanceof Nullable) { return val }
  this.value = val
  this.type = typeof val
  this.isNull = val === null
  this.isUndefined = val === void 0
  this.hasValue = !(this.isNull || this.isUndefined)
  Object.freeze(this)
}

// (T) => Nullable<T>
Nullable.of = function (x) {
  return new Nullable(x)
}
// (T) => Nullable<T>
Nullable.prototype.of = Nullable.of


Nullable.EMPTY = Object.freeze(Nullable.of(null))
Nullable.empty = function () { return Nullable.EMPTY }

// ((T)=>T2) => Nullable<T2>
Nullable.prototype.map = function (fn) {
  if (!this.hasValue) { return this }
  return new Nullable(fn(this.value))
}

Nullable.prototype.get = function (propName) {
  if (!this.hasValue) { return Nullable.EMPTY }
  return this.map(function (val) {
    return val[propName]
  })
}


// (String) => Nullable<T2>
Nullable.prototype.call = function (methodName) {
  if (!this.hasValue) { return this }

  if (typeof this.value[methodName] === 'function') {
    return new Nullable(this.value[methodName].apply(this.value, [].slice.call(arguments,1)))
  }
  return this
}

// (Any) => T | Any
Nullable.prototype.orDefault = function (defaultValue) {
  if (!this.hasValue) { return defaultValue }
  return this.value
}
// (Any) => T | Any
Nullable.prototype.orElse = Nullable.prototype.orDefault


Nullable.prototype.eq = function (other) {
  return other instanceof Nullable &&
    other.hasValue === this.hasValue &&
    (!this.hasValue || other.value === this.value)
}


// () => T?
Nullable.prototype.valueOf = function () {
  return this.value
}

// () => String
Nullable.prototype.toString = function () {
  return '<' + this.value + '>?'
}


module.exports = Nullable
// (T) => Nullable<T>
function Nullable (val) {
  if (!(this instanceof Nullable)) { return new Nullable(val) }
  this.value = val
  this.type = typeof val
  this.isNull = val === null
  this.isUndefined = val === void 0
  this.hasValue = !(this.isNull || this.isUndefined)
}

// (String) => Nullable<T2>
Nullable.prototype.call = function (methodName) {
  if (!this.hasValue) { return this }

  if (typeof this.value[methodName] === 'function') {
    return new Nullable(this.value[methodName].apply(this.value, [].slice.call(arguments,1)))
  }
  return this
}

// ((T)=>T2) => Nullable<T2>
Nullable.prototype.map = function (fn) {
  if (!this.hasValue) { return this }
  return new Nullable(fn(this.value))
}

// (Any) => T | Any
Nullable.prototype.orDefault = function (defaultValue) {
  if (!this.hasValue) { return defaultValue }
  return this.value
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
/* globals describe, it */
var chai = require('chai')
chai.should()
chai.use(require('chai-interface'))

describe('Nullable', function () {
  var Nullable = require('../')

  it('callable with or without new', function () {
    Nullable(null).should.be.instanceof(Nullable)
    new Nullable(null).should.be.instanceof(Nullable)
  })

  it('newable with static of', function () {
    Nullable.of(null).should.be.instanceof(Nullable)
  })

  it('newable with instance of', function () {
    const a = Nullable.of('a')
    const b = a.of('b')
    b.should.be.instanceof(Nullable)
  })

  it('has interface', function () {
    Nullable.empty().should.be.instanceof(Nullable)

    var x = Nullable(null)
    x.should.have.interface({
      call: Function,
      map: Function,
      get: Function,
      toString: Function,
      valueOf: Function,
      orDefault: Function,
      // and props
      hasValue: Boolean,
      isNull: Boolean,
      isUndefined: Boolean,
      type: String,
      // and aliases:
      orElse: Function,
      of: Function
    })

    x.should.have.ownProperty('value')
  })

  it('sets properties', function () {
    var x = Nullable(null)
    chai.expect(x.value).to.equal(null)
    x.hasValue.should.equal(false)
    x.isNull.should.equal(true)
    x.isUndefined.should.equal(false)
    x.type.should.equal('object')

    var x2 = Nullable(undefined)
    x2.hasValue.should.equal(false)
    x2.isNull.should.equal(false)
    x2.isUndefined.should.equal(true)

    var y = Nullable('brontosaurus')
    y.value.should.equal('brontosaurus')
    y.hasValue.should.equal(true)
    y.isNull.should.equal(false)
    y.isUndefined.should.equal(false)
    y.type.should.equal('string')
  })

  describe('.call', function () {
    it('calls methods', function () {
      var x = Nullable(null)
      chai.expect(x.call('toString').value).to.equal(null)

      var y = Nullable(123)
      y.call('toString').value.should.equal('123')

      y.call('toString', 16).value.should.equal('7b')
    })
  })

  describe('.map', function () {
    it('calls another function if there is a value', function () {
      function double (x) { return x * 2 }
      var x = Nullable(null)
      chai.expect(x.map(double).value).to.equal(null)

      var y = Nullable(2)
      y.map(double).value.should.equal(4)
    })
  })

  describe('.get', function () {
    describe('when there is a value', () => {
      const x = Nullable({a: 1})
      describe('when there is a property', () => {
        it('returns a nullable with that value', () => {
          var a = x.get('a')
          a.value.should.equal(1)
        })
      })
      describe('when there is no property', () => {
        it('returns a nullable of undefined', () => {
          var b = x.get('b')
          b.should.be.instanceof(Nullable)
          chai.expect(b.value).to.equal(undefined)
        })
      })
    })
    describe('when there is not a value', () => {
      const x = Nullable()
      it('returns an empty nullable', () => {
        var b = x.get('b')
        b.should.be.instanceof(Nullable)
        b.hasValue.should.equal(false)
      })
    })
  })

  describe('.orDefault', function () {
    it('returns default argument if not hasValue', function () {
      var x = Nullable(null)
      x.orDefault(108).should.equal(108)
    })
    it('returns the value if hasValue', function () {
      var y = Nullable(23)
      y.orDefault(108).should.equal(23)
    })
  })

  describe('.valueOf', function () {
    it('returns the same as .value', function () {
      chai.expect(Nullable(null).valueOf()).to.equal(null)
      Nullable(12).valueOf().should.equal(12)
    })
  })

  describe('.toString', function () {
    it('is custom', function () {
      Nullable(null).toString().should.equal('<null>?')
      Nullable(12).toString().should.equal('<12>?')
      Nullable({}).toString().should.equal('<[object Object]>?')
    })
  })

  describe('properties', () => {
    const a = Nullable.of('a')

    describe('empty', () => {
      it('empty', () => {
        Nullable.empty().should.be.instanceof(Nullable)
        Nullable().eq(Nullable.empty()).should.equal(true)
      })
    })

    describe('eq', () => {
      it('undef eq null', () => {
        Nullable.of(undefined).eq(Nullable.of(null)).should.equal(true)
      })
    })

    it('identity', () => {
      const a2 = a.map(x => x)
      a2.eq(a).should.equal(true)
    })

    it('composition', () => {
      const a = Nullable.of('a')
      const b = Nullable.of(a)
      a.eq(b).should.equal(true)
    })
  })
})

var chai = require('chai')
chai.should()
chai.use(require('chai-interface'))

describe('Nullable', function () {
  var Nullable = require('../')

  it('callable with or without new', function () {

    Nullable(null).should.be.instanceof(Nullable)
    new Nullable(null).should.be.instanceof(Nullable)

  })

  it('has interface', function () {
    var x = Nullable(null)
    x.should.have.interface({
      call: Function,
      map: Function,
      toString: Function,
      valueOf: Function,
      orDefault: Function,
      hasValue: Boolean,
      isNull: Boolean,
      isUndefined: Boolean,
      type: String
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

})
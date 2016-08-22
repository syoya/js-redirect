var should = require('chai').should()
var redirect = require('../redirect')

var userAgents = {
  sp: [
    // Galaxy S5
    'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.23 Mobile Safari/537.36',
    // Nexus 5X
    'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.23 Mobile Safari/537.36',
    // Nexus 6P
    'Mozilla/5.0 (Linux; Android 5.1.1; Nexus 6 Build/LYZ28E) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.23 Mobile Safari/537.36',
    // iPhone
    'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',
    // iPod
    'Mozilla/5.0 (iPod; CPU iPhone OS 5_0_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A405 Safari/7534.48.3'
  ],
  noSp: [
    // iPad
    'Mozilla/5.0 (iPad; CPU OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',
    // Google Chrome
    'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36',
    'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/28.0.1500.63 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36',
    'Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.112 Safari/537.36',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36',
    // IE11
    'Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; Touch; rv:11.0) like Gecko',
    'Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; Touch; rv:11.0) like Gecko',
    // Edge
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.79 Safari/537.36 Edge/14.14393',
    'Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.79 Safari/537.36 Edge/14.14393',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.10240',
    // Firefox
    'Mozilla/5.0 (Windows NT 10.0; rv:48.0) Gecko/20100101 Firefox/48.0',
    'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:48.0) Gecko/20100101 Firefox/48.0',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:48.0) Gecko/20100101 Firefox/48.0',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.11; rv:48.0) Gecko/20100101 Firefox/48.0',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:48.0) Gecko/20100101 Firefox/48.0',
    // Safari
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/601.7.7 (KHTML, like Gecko) Version/9.1.2 Safari/601.7.7',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/601.7.7 (KHTML, like Gecko) Version/9.1.2 Safari/601.7.7',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/601.7.7 (KHTML, like Gecko) Version/9.1.2 Safari/537.86.7',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/600.8.9 (KHTML, like Gecko) Version/6.2.8 Safari/537.85.17',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.78.2 (KHTML, like Gecko) Version/6.1.6 Safari/537.78.2',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/534.59.10 (KHTML, like Gecko) Version/5.1.9 Safari/534.59.10'
  ]
}

describe('redirect', function () {
  describe('isSmartPhone', function () {
    it('should be true with smart phone user agent', function () {
      userAgents.sp.forEach(function (ua) {
        redirect.isSmartPhone(ua).should.be.true
      })
    })

    it('should be false with no smart phone user agent', function () {
      userAgents.noSp.forEach(function (ua) {
        redirect.isSmartPhone(ua).should.be.false
      })
    })
  })

  describe('isHostForSmartPhone', function () {
    it('should be true with host starting with sp.', function () {
      redirect.isHostForSmartPhone('sp.example.com').should.be.true
      redirect.isHostForSmartPhone('sp.foo.example.com').should.be.true
    })

    it('should be false with host starting without sp.', function () {
      redirect.isHostForSmartPhone('example.com').should.be.false
      redirect.isHostForSmartPhone('foo.example.com').should.be.false
    })
  })

  describe('createURLWithNewHost', function () {
    it('should create valid URL', function () {
      redirect.createURLWithNewHost('bar.example.com', {
        hash: '#baz',
        search: '?qux=0',
        pathname: '/posts/12345',
        port: '',
        hostname: 'foo.example.com',
        host: 'foo.example.com',
        protocol: 'http:',
        origin: 'http://foo.example.com',
        href: 'http://foo.example.com/posts/12345?qux=0#baz'
      }).should.be.equal('http://bar.example.com/posts/12345?qux=0#baz')
    })
  })

  describe('getRedirectURL', function () {
    it("with smart phone user agent and no smart phone location should create URL starting with 'sp.'", function () {
      userAgents.sp.forEach(function (userAgent) {
        redirect.getRedirectURL(userAgent, {
          hash: '#baz',
          search: '?qux=0',
          pathname: '/posts/12345',
          port: '',
          hostname: 'foo.example.com',
          host: 'foo.example.com',
          protocol: 'http:',
          origin: 'http://foo.example.com',
          href: 'http://foo.example.com/posts/12345?qux=0#baz'
        }).should.be.equal('http://sp.foo.example.com/posts/12345?qux=0#baz')
      })
    })

    it("with smart phone user agent and smart phone location shouldn't create URL", function () {
      userAgents.sp.forEach(function (userAgent) {
        should.not.exist(redirect.getRedirectURL(userAgent, {
          hash: '#baz',
          search: '?qux=0',
          pathname: '/posts/12345',
          port: '',
          hostname: 'sp.foo.example.com',
          host: 'sp.foo.example.com',
          protocol: 'http:',
          origin: 'http://sp.foo.example.com',
          href: 'http://sp.foo.example.com/posts/12345?qux=0#baz'
        }))
      })
    })

    it("with no smart phone user agent and smart phone location should create URL starting without 'sp.'", function () {
      userAgents.noSp.forEach(function (userAgent) {
        redirect.getRedirectURL(userAgent, {
          hash: '#baz',
          search: '?qux=0',
          pathname: '/posts/12345',
          port: '',
          hostname: 'sp.foo.example.com',
          host: 'sp.foo.example.com',
          protocol: 'http:',
          origin: 'http://sp.foo.example.com',
          href: 'http://sp.foo.example.com/posts/12345?qux=0#baz'
        }).should.be.equal('http://foo.example.com/posts/12345?qux=0#baz')
      })
    })

    it("with no smart phone user agent and no smart phone location shouldn't create URL", function () {
      userAgents.noSp.forEach(function (userAgent) {
        should.not.exist(redirect.getRedirectURL(userAgent, {
          hash: '#baz',
          search: '?qux=0',
          pathname: '/posts/12345',
          port: '',
          hostname: 'foo.example.com',
          host: 'foo.example.com',
          protocol: 'http:',
          origin: 'http://foo.example.com',
          href: 'http://foo.example.com/posts/12345?qux=0#baz'
        }))
      })
    })
  })
})

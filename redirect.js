;(function () {
  var rSP = /^sp\./

  function redirect (userAgent, location) {
    var newURL = getRedirectURL(userAgent, location)
    if (newURL == null) return
    location.replace(newURL)
  }

  function getRedirectURL (userAgent, location) {
    var isSP = isSmartPhone(userAgent)
    var isHostForSP = isHostForSmartPhone(location.host)
    if (isSP) {
      if (isHostForSP) {
        return
      }
      return createURLWithNewHost('sp.' + location.host, location)
    }
    if (!isHostForSP) {
      return
    }
    return createURLWithNewHost(location.host.replace(rSP, ''), location)
  }

  function createURLWithNewHost (newHost, location) {
    return location.protocol + '//' + newHost + location.pathname + location.search + location.hash
  }

  function isSmartPhone (userAgent) {
    var ua = userAgent.toLowerCase()
    return (
      ua.indexOf('iphone') >= 0 ||
      ua.indexOf('ipod') >= 0 ||
      ua.indexOf('android') >= 0
    )
  }

  function isHostForSmartPhone (host) {
    return rSP.test(host)
  }

  if (typeof window !== 'undefined') {
    redirect(window.navigator.userAgent, window.document.location)
  }

  if (typeof module !== 'undefined') {
    module.exports = {
      redirect: redirect,
      getRedirectURL: getRedirectURL,
      createURLWithNewHost, createURLWithNewHost,
      isSmartPhone: isSmartPhone,
      isHostForSmartPhone: isHostForSmartPhone
    }
  }
})()

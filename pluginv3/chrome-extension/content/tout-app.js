console.log('ToutApp Content Script > Running')

/**************************************************************************************
 *
 *  This module contains all of the functionality needed for loading external scripts
 *  on ToutApp.
 *
 *  @Author Brian Fisher
 *
 *  @namespace
 *
 **************************************************************************************/

var URL_PATH = 'm3-dev',
  TOUT_APP = 'https://marketolive.com/' + URL_PATH + '/pluginv3/tout-app.min.js',
  APP = APP || {}

/**************************************************************************************
 *
 *  This function loads the given script source.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 *  @param {String} scriptSrc - The URL of the desired script.
 *
 **************************************************************************************/

APP.loadScript = function (scriptSrc) {
  console.log('Loading: Script: ' + scriptSrc)

  var scriptElement = document.createElement('script')
  scriptElement.async = true
  scriptElement.src = scriptSrc
  document.getElementsByTagName('head')[0].appendChild(scriptElement)
}

/**************************************************************************************
 *
 *  Main
 *
 **************************************************************************************/

window.addEventListener('load', function () {
  APP.loadScript(TOUT_APP)
})

chrome.runtime.onMessage.addListener(function (msg, sender, response) {
  if (msg.from === 'popup') {
    var runScript = document.createElement('script')
    var innerScript
    if (msg.subject === 'all') {
      innerScript = document.createTextNode(
        "console.log('Starting comp then add '" +
          compperc +
          ' : ' +
          msg.addperc +
          ');TOUT.waitForCsrfToken(TOUT.addPeopleToCampaigns(' +
          msg.addperc +
          ').then(TOUT.completeTasks(' +
          compperc +
          ")));console.log('Finished');"
      )
    } else if (msg.subject === 'add') {
      innerScript = document.createTextNode(
        "console.log('Starting ' + " +
          msg.addperc +
          ');TOUT.waitForCsrfToken(TOUT.addPeopleToCampaigns(' +
          msg.addperc +
          "));console.log('Finished');"
      )
    } else if (msg.subject === 'camp') {
      innerScript = document.createTextNode(
        "console.log('Starting ' + " +
          msg.compperc +
          ');TOUT.waitForCsrfToken(TOUT.completeTasks(' +
          msg.compperc +
          "));console.log('Finished');"
      )
    }
    runScript.appendChild(innerScript)
    ;(document.head || document.documentElement).appendChild(runScript)
    runScript.parentNode.removeChild(runScript)
  }
})

console.log("OKTA > Running");

/**************************************************************************************
 *
 *  This script contains all of the functionality needed for retrieving the current
 *  user's name and email address from OKTA.
 *
 **************************************************************************************/

var devExtensionId = "dokkjhbgengdlccldgjnbilajdbjlnhm",
prodExtensionId = "onibnnoghllldiecboelbpcaeggfiohl",
extensionId = prodExtensionId,
ME_URL = 'https://adobe.okta.com/api/internal/enduser/home',

OKTA = OKTA || {};

OKTA.webRequest = function (url, params, headers, method) {
  if (!url) {
    throw new Error('Missing required argument: url');
  }

  return new Promise(function (resolve, reject) {
    let req = new XMLHttpRequest(),
    data = '';

    params = (typeof(params) === 'object') ? params : '';
    headers = (typeof(headers) === 'object') ? headers : '';
    method = (typeof(method) === 'string') ? method : 'GET';

    try {
      for (let i = 0; i < Object.entries(params).length; i++) {
        let param = Object.entries(params)[i];

        if (data.length > 0) {
          data += '&';
        }

        data += encodeURIComponent(param[0].toString()) + '=' + encodeURIComponent(param[1].toString());
      }
    } catch (e) {
      console.error(e);
    }

    req.open(method, url);

    if (headers) {
      try {
        for (let i = 0; i < Object.entries(headers); i++) {
          let header = Object.entries(headers)[i];

          req.setRequestHeader(header[0].toString(), header[1].toString());
        }
      } catch (e) {
        console.error(e);
      }
    }

    req.onload = function () {
      if (req.status == 200) {
        resolve(req.response);
      } else {
        reject(Error(req.statusText));
      }
    };

    req.onerror = function () {
      reject(Error('Network Error'));
    };

    req.withCredentials = true;
    req.send(data);
  });
};

/**************************************************************************************
 *
 *  This function retrieves the username, first name, last name, and email address of
 *  the current OneLogin user.
 *
 **************************************************************************************/

OKTA.getOktaUser = function () {
  return OKTA.webRequest(ME_URL).then(function (response) {
    try {
      response = JSON.parse(response);
      oktaUser = {
        action: 'setOktaUser',
        username: response.email.split('@')[0],
        firstName: response.firstName,
        lastName: response.lastName,
        email: response.email
      };

      chrome.runtime.sendMessage(extensionId, oktaUser, function (response) {
        console.log("OKTA > Receiving: Message Response from Background: " + response);

        return response;
      });
    } catch (e) {
      console.error(e);
    }

    return response;
  }, function (e) {
    console.error(e);
  });
};

/**************************************************************************************
 *
 *  Main
 *
 **************************************************************************************/

OKTA.getOktaUser();
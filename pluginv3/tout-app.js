console.log("ToutApp > Running");

/**************************************************************************************
 *
 *  This module contains all of the functionality needed for preventing unwanted
 *  manipulation of the ToutApp.
 *
 *  @Author Brian Fisher
 *
 *  @namespace
 *
 **************************************************************************************/

var TOUT = TOUT || {};

TOUT.webRequest = function (url, params, data, headers, method) {
  if (!url) {
    throw new Error('Missing required argument: url');
  }
  
  return new Promise(function (resolve, reject) {
    let req = new XMLHttpRequest(),
    queryString = '',
    payload = '';
    
    params = (typeof(params) === 'object') ? params : '';
    data = (typeof(data) === 'string') ? data : '';
    headers = (typeof(headers) === 'object') ? headers : '';
    method = (typeof(method) === 'string') ? method : 'GET';
    
    req.open(method, url);
    req.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr("content"));
    req.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    
    if (!headers) {
      req.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    } else {
      try {
        for (let header of Object.entries(headers)) {
          req.setRequestHeader(header[0].toString(), header[1].toString());
        }
      } catch (e) {
        console.error(e);
      }
    }
    
    if (headers
       && headers['Content-Type'].search(/form/i) != -1) {
      try {
        for (let param of Object.entries(params)) {
          if (payload.length > 0) {
            payload += '&';
          }
          
          payload += encodeURIComponent(param[0].toString()) + '=' + encodeURIComponent(param[1].toString());
        }
        
        data = payload;
      } catch (e) {
        console.error(e);
      }
    } else {
      try {
        for (let param of Object.entries(params)) {
          if (queryString.length > 0) {
            queryString += '&';
          }
          
          queryString += encodeURIComponent(param[0].toString()) + '=' + encodeURIComponent(param[1].toString());
        }
        
        url += '?' + queryString;
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
    
    req.secure = true;
    req.send(data);
  });
};

TOUT.dateOffsetInDays = function (d, offset) {
  var _MS_PER_DAY = 1000 * 60 * 60 * 24,
  utc = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
  
  return new Date(utc + (offset * _MS_PER_DAY));
};

TOUT.getCampaigns = function () {
  let url = '/workflows.json',
  params = {
    'all': true
  };
  
  console.log('ToutApp > Getting Campaigns');
  return TOUT.webRequest(url, params).then(function (response) {
    try {
      response = JSON.parse(response);
    } catch (e) {
      console.error(e);
    }
    
    return response;
  }, function (e) {
    console.error(e);
  });
};

TOUT.getActiveCampaigns = function () {
  let url = '/workflows/active';
  
  console.log('ToutApp > Getting Active Campaigns');
  return TOUT.webRequest(url).then(function (response) {
    try {
      response = JSON.parse(response);
    } catch (e) {
      console.error(e);
    }
    
    return response;
  }, function (e) {
    console.error(e);
  });
};

TOUT.getPeopleInActiveCampaign = function (params) {
  let url = '/workflows/' + params.campaignId + '/workflow_instances';
  
  console.log('ToutApp > Getting People In Active Campaign: ' + params.campaignId);
  return TOUT.webRequest(url).then(function (response) {
    try {
      response = JSON.parse(response);
    } catch (e) {
      console.error(e);
    }
    
    return response;
  }, function (e) {
    console.error(e);
  });
};

TOUT.getPeople = function () {
  let url = '/search.json',
  headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  params = {
    'obj': 'Person',
    'page': 1,
    'fallback_type': 'paged',
    'es_query': '{"query":{"filtered":{"query":{"match_all":{}},"filter":{"and":[{"or":[{"term":{"user_id":218495}},{"terms":{"team_ids":[242222]}}]}]}}},"size":500,"from":0,"sort":{"created_at":{"order":"desc"}},"fields":["id"]}'
  };
  
  console.log('ToutApp > Getting People');
  return TOUT.webRequest(url, params, '', headers, 'POST').then(function (response) {
    try {
      response = JSON.parse(response);
    } catch (e) {
      console.error(e);
    }
    
    return response;
  }, function (e) {
    console.error(e);
  });
};

TOUT.addPeopleToCampaign = function (params) {
  let url = '/workflows/' + params.campaignId + '/workflow_instances';
  data = {
    'person_ids': params.person_ids,
    'options': {
      'dont_start': false,
      'identity_id': 241031,
      'trigger_alerts': true
    }
  }
  
  console.log('ToutApp > Adding People to Campaign: ' + params.campaignId);
  return TOUT.webRequest(url, '', data, '', 'POST').then(function (response) {
    try {
      response = JSON.parse(response);
    } catch (e) {
      console.error(e);
    }
    
    return response;
  }, function (e) {
    console.error(e);
  });
};

TOUT.makeCall = function (params) {
  let url = '/twilio_bridge/initiate/' + '5615551106' + '/' + params.phoneToCall,
  headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  };
  params = {
    'person_id': params.person_id,
    'reminder_id': params.reminder_id
  };
  
  console.log('ToutApp > Making a Call: ' + params.person_id + ' @ ' + params.phoneToCall);
  return TOUT.webRequest(url, params, '', headers, 'POST').then(function (response) {
    try {
      response = JSON.parse(response);
    } catch (e) {
      console.error(e);
    }
    
    return response;
  }, function (e) {
    console.error(e);
  });
};

TOUT.getUncompletedTasks = function () {
  let url = '/reminders/uncompleted.json',
  params = {
    'from': '',
    'to': ''
  };
  
  console.log('ToutApp > Getting Uncompleted Tasks');
  return TOUT.webRequest(url).then(function (response) {
    try {
      response = JSON.parse(response);
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
 *  This function removes harmful toolbar buttons in ToutApp
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

TOUT.removeToolbarButtons = function () {
  var startTime = new Date(),
  isToolbar = window.setInterval(function () {
      var currTime = new Date();
      
      if (document.getElementById("nav-win")) {
        console.log("ToutApp > Removing: Harmful Toolbar Buttons");
        
        window.clearInterval(isToolbar);
        
        document.getElementById("nav-win").remove();
      } else if (parseInt((currTime - startTime) / 1000) > 5) {
        console.log("ToutApp > NOT Removing: Harmful Toolbar Buttons");
        
        window.clearInterval(isToolbar);
      }
    });
};

/**************************************************************************************
 *
 *  Main
 *
 **************************************************************************************/

TOUT.removeToolbarButtons();
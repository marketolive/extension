console.log('ToutApp > Running');

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

/**************************************************************************************
 *
 *  This function issues an XmlHttp web request (XHR) using the given parameters
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 *  @param {string} url - URL of the request
 *  @param {object} params - key/value pairs used as a query string or form parameters
 *  @param {object} data - key/value pairs used as body payload
 *  @param {object} headers - key/value pairs used as request headers
 *  @param {method} url - HTTP request method (e.g. GET, POST, PUT ...)
 *
 **************************************************************************************/

TOUT.webRequest = function (url, params, data, headers, method) {
  if (!url) {
    throw new Error('Missing required argument: url');
  }
  
  return new Promise(function (resolve, reject) {
    let req = new XMLHttpRequest(),
    queryString = '',
    payload = '';
    
    params = (typeof(params) === 'object') ? params : '';
    data = (typeof(data) === 'object') ? JSON.stringify(data) : (typeof(data) === 'string') ? data : '';
    headers = (typeof(headers) === 'object') ? headers : '';
    method = (typeof(method) === 'string') ? method : 'GET';
    
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
        
        if (queryString) {
          url += '?' + queryString;
        }
      } catch (e) {
        console.error(e);
      }
    }
    
    req.open(method, url);
    req.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'));
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
    
    req.onload = function () {
      if (req.status == 200
         || req.status == 201) {
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

/**************************************************************************************
 *
 *  This function returns the given date offset by the given number of days
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 *  @param {date} d - Base date
 *  @param {integer} offset - number of days to use as offset (+/-)
 *
 **************************************************************************************/

TOUT.dateOffsetInDays = function (d, offset) {
  var _MS_PER_DAY = 1000 * 60 * 60 * 24,
  utc = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
  
  return new Date(utc + (offset * _MS_PER_DAY));
};

/**************************************************************************************
 *
 *  This function gets a single mock person from mockaroo and is only used when there
 *  are no more inactive people to add to a campaign
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

TOUT.getMockPerson = function () {
  let url = 'https://api.mockaroo.com/api/b96020f0',
  params = {
    'count': 1,
    'key': '0dcaeca0'
  };
  
  console.log('ToutApp > Getting Mock Person');
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

/**************************************************************************************
 *
 *  This function gets a given person's details
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 *  @param {object} params:
 *    {integer} person_id - ID of the person to get
 *
 **************************************************************************************/

TOUT.getPerson = function (params) {
  let url = '/people/' + params.person_id + '.json',
  query = {
    'no_pitches': true
  };
  
  console.log('ToutApp > Getting Person: ' + params.person_id);
  return TOUT.webRequest(url, query).then(function (response) {
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
 *  This function gets all people (max of 1000)
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

TOUT.getPeople = function () {
  let url = '/search.json',
  headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  params = {
    'obj': 'Person',
    'page': 1,
    'fallback_type': 'paged',
    'es_query': '{"query":{"filtered":{"query":{"match_all":{}},"filter":{"and":[{"or":[{"term":{"user_id":218495}},{"terms":{"team_ids":[242222]}}]}]}}},"size":1000,"from":0,"sort":{"created_at":{"order":"desc"}},"fields":["id"]}'
  },
  method = 'POST';
  
  console.log('ToutApp > Getting People');
  return TOUT.webRequest(url, params, '', headers, method).then(function (response) {
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
 *  This function gets all campaigns
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

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

/**************************************************************************************
 *
 *  This function gets all active campaigns (aka campaigns that have active people)
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

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

/**************************************************************************************
 *
 *  This function gets all the active people in a campaign
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 *  @param {object} params:
 *    {integer} campaignId - ID of the campaign to get active people from
 *
 **************************************************************************************/

TOUT.getPeopleInCampaign = function (params) {
  let url = '/workflows/' + params.campaignId + '/workflow_instances';
  
  console.log('ToutApp > Getting People In Campaign: ' + params.campaignId);
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
 *  This function gets all uncompleted tasks within the last 14 days
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

TOUT.getUncompletedTasks = function () {
  let url = '/reminders/uncompleted.json',
  params = {
    'from': TOUT.dateOffsetInDays(new Date(), -14).toISOString(),
    'to': TOUT.dateOffsetInDays(new Date(), 1).toISOString()
  };
  
  console.log('ToutApp > Getting Uncompleted Tasks');
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

/**************************************************************************************
 *
 *  This function adds a person to the address book
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 *  @param {object} params:
 *    {string} first_name
 *    {string} last_name
 *    {string} email
 *    {string} phone
 *    {string} title
 *
 **************************************************************************************/

TOUT.addPerson = function (params) {
  let url = '/people',
  data = {
    'person': {
      'first_name': params.first_name,
      'last_name': params.last_name,
      'addresses': [{
          'address': params.email,
          'address_type': 'email',
          'is_primary': true,
          'location': 'work'
        }, {
          'address': params.phone,
          'address_type': 'phone',
          'is_primary': false,
          'location': 'work'
        }
      ],
      'title': params.title
    }
  },
  method = 'POST';
  
  console.log('ToutApp > Adding Person: ' + params.first_name + ' ' + params.last_name);
  return TOUT.webRequest(url, '', data, '', method).then(function (response) {
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
 *  This function updates the given person with the given company name
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 *  @param {object} params:
 *    {string} company
 *
 **************************************************************************************/

TOUT.updatePerson = function (params) {
  let url = '/people/' + params.id,
  data = {
    'person': {
      'company': {
        'name': params.company
      },
      'id': params.id
    }
  },
  method = 'PUT';
  
  console.log('ToutApp > Updating Person: ' + params.id + ' w/ ' + params.company);
  return TOUT.webRequest(url, '', data, '', method).then(function (response) {
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
 *  This function adds a person to the Mock People group
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 *  @param {object} params:
 *    {integer} address_id
 *
 **************************************************************************************/

TOUT.addPersonToMockGroup = function (params) {
  let url = '/groups/3900413/group_members',
  data = {
    'group_member': {
      'group_id': 3900413,
      'address_id': params.address_id,
      'active': true
    }
  },
  method = 'POST';
  
  console.log('ToutApp > Adding Person to Mock People Group: ' + params.address_id);
  return TOUT.webRequest(url, '', data, '', method).then(function (response) {
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
 *  This function adds inactive people to the given campaign
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 *  @param {object} params:
 *    {integer} campaignId - ID of the campaign to add people to
 *    {array} person_ids - IDs of the people to add
 *
 **************************************************************************************/

TOUT.addPeopleToCampaign = function (params) {
  let url = '/workflows/' + params.campaignId + '/workflow_instances',
  data = {
    'person_ids': params.person_ids,
    'options': {
      'dont_start': false,
      'identity_id': 241031,
      'trigger_alerts': true
    }
  },
  method = 'POST';
  
  console.log('ToutApp > Adding People to Campaign: ' + params.campaignId);
  return TOUT.webRequest(url, '', data, '', method).then(function (response) {
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
 *  This function logs a made call to complete a call task
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 *  @param {object} params:
 *    {integer} person_id - ID of the person to call
 *    {integer} reminder_id - ID of the call task to complete
 *
 **************************************************************************************/

TOUT.makeCall = function (params) {
  let url = '/twilio_bridge/initiate/' + '5555555555' + '/5615551234',
  headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  method = 'POST';
  params = {
    'person_id': params.person_id,
    'reminder_id': params.reminder_id
  };
  
  console.log('ToutApp > Making a Call: ' + params.person_id);
  return TOUT.webRequest(url, params, '', headers, method).then(function (response) {
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
 *  This function skips the given task
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 *  @param {object} params:
 *    {integer} taskId - ID of the task to skip
 *
 **************************************************************************************/

TOUT.skipTask = function (params) {
  let url = '/reminders/' + params.taskId,
  data = {
    'reminder': {
      'id': params.taskId,
      'skipped': true
    }
  },
  method = 'PUT';
  
  console.log('ToutApp > Skipping Task: ' + params.taskId);
  return TOUT.webRequest(url, '', data, '', method).then(function (response) {
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
 *  This function waits up to 5s for the CSRF-Token element to exist which is used to
 *  authorize all succeeding requests
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 *  @param {function} callback - Function to call if token exists
 *
 **************************************************************************************/

TOUT.waitForCsrfToken = function (callback) {
  var startTime = new Date(),
  isCsrfToken = window.setInterval(function () {
      var currTime = new Date();
      
      if (typeof(document.querySelector('meta[name="csrf-token"]')) === 'object'
         && document.querySelector('meta[name="csrf-token"]').content) {
        console.log('ToutApp > CSRF-Token Exists');
        window.clearInterval(isCsrfToken);
        
        if (typeof(callback) === 'function') {
          callback();
        }
      } else if (parseInt((currTime - startTime) / 1000) > 5) {
        console.log('ToutApp > CSRF-Token Does NOT Exist');
        window.clearInterval(isCsrfToken);
      }
    });
};

/**************************************************************************************
 *
 *  This function adds inactive people to campaigns
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 *  @param {float} pct - Percentage of people to add to campaigns
 *
 **************************************************************************************/

TOUT.addPeopleToCampaigns = function (pct) {
  console.log('ToutApp > Adding Inactive People to Campaigns');
  return TOUT.getPeople().then(function (getPeople) {
    return TOUT.getCampaigns().then(function (getCampaigns) {
      let allCampaigns = [],
      chosenCampaigns = [],
      chosenPeople = [],
      params;
      try {
        for (let campaign of getCampaigns) {
          if (!campaign.currently_active_count) {
            chosenCampaigns.push(campaign.id);
          }
          allCampaigns.push(campaign.id);
        }
        if (chosenCampaigns.length == 0) {
          chosenCampaigns = allCampaigns;
        }
        
        for (let person of getPeople.people.results) {
          if (!person.active_workflow_instance
             && Math.random() < pct) {
            chosenPeople.push(person.id);
          }
        }
        if (chosenPeople.length == 0) {
          TOUT.getMockPerson().then(function (getMockPerson) {
            TOUT.addPerson(getMockPerson).then(function (addPerson) {
              let updatePerson = {
                'company': getMockPerson.company,
                'id': addPerson.id
              };
              chosenPeople.push(addPerson.id);
              addPerson = {
                'address_id': addPerson.addresses[0].id
              };
              TOUT.updatePerson(updatePerson);
              TOUT.addPersonToMockGroup(addPerson);
              
              params = {
                'campaignId': chosenCampaigns[Math.floor(Math.random() * chosenCampaigns.length)],
                'person_ids': chosenPeople
              };
              return TOUT.addPeopleToCampaign(params);
            });
          });
        } else {
          params = {
            'campaignId': chosenCampaigns[Math.floor(Math.random() * chosenCampaigns.length)],
            'person_ids': chosenPeople
          };
          return TOUT.addPeopleToCampaign(params);
        }
      } catch (e) {
        console.error(e);
      }
    });
  });
};

/**************************************************************************************
 *
 *  This function completes the given percentage of uncompleted tasks
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 *  @param {float} pct - Percentage of tasks to complete
 *
 **************************************************************************************/

TOUT.completeTasks = function (pct) {
  console.log('ToutApp > Completing Tasks');
  return TOUT.getUncompletedTasks().then(function (response) {
    try {
      for (let task of response) {
        if (Math.random() < pct) {
          let params;
          
          switch (task.remind_type) {
          case 'call':
            params = {
              'person_id': task.person_id,
              'reminder_id': task.id
            };
            TOUT.makeCall(params);
            break;
            
          case 'inmail':
          case 'other':
            params = {
              'taskId': task.id,
            };
            TOUT.skipTask(params);
            break;
          }
        }
      }
    } catch (e) {
      console.error(e);
    }
  });
};

/**************************************************************************************
 *
 *  This function removes harmful delete and save buttons in ToutApp
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

TOUT.removeHarmfulButtons = function () {
  if (document.location.hash.search('^#settings/') != -1
     || document.location.hash.search('^#identities') != -1) {
    console.log('ToutApp > Executing: removeHarmfulButtons');
    let startTime = new Date(),
    isHarmful = window.setInterval(function () {
        let currTime = new Date();
        
        if (document.getElementsByClassName('btn btn-danger').length > 0) {
          console.log('ToutApp > Removing: Delete Buttons');
          window.clearInterval(isHarmful);
          for (let button of document.getElementsByClassName('btn btn-danger')) {
            button.remove();
          }
        } else if (document.getElementsByClassName('save btn btn-success').length > 0) {
          console.log('ToutApp > Removing: Save Buttons (Green)');
          window.clearInterval(isHarmful);
          for (let button of document.getElementsByClassName('save btn btn-success')) {
            button.remove();
          }
        } else if (document.getElementsByClassName('btn btn-primary save').length > 0) {
          console.log('ToutApp > Removing: Save Buttons (Blue)');
          window.clearInterval(isHarmful);
          for (let button of document.getElementsByClassName('btn btn-primary save')) {
            button.remove();
          }
        } else if (document.location.hash == '#settings/marketo-admin'
           && document.getElementsByClassName('tout-action setup-connect red standard').length > 0) {
          console.log('ToutApp > Removing: Marketo Disconnect Button');
          window.clearInterval(isHarmful);
          for (let button of document.getElementsByClassName('tout-action setup-connect red standard')) {
            button.remove();
          }
        } else if (document.location.hash == '#identities'
           && document.getElementById('update-identity')) {
          console.log('ToutApp > Removing: Identity Save Button');
          window.clearInterval(isHarmful);
          document.getElementById('update-identity').remove();
        }
        
        if (parseInt((currTime - startTime) / 1000) > 10) {
          console.log('ToutApp > NOT Removing: Harmful Buttons');
          window.clearInterval(isHarmful);
        }
      }, 500);
  }
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
  let startTime = new Date(),
  isToolbar = window.setInterval(function () {
      let currTime = new Date();
      
      if (document.getElementById('nav-win')) {
        console.log('ToutApp > Removing: Harmful Toolbar Buttons');
        window.clearInterval(isToolbar);
        document.getElementById('nav-win').remove();
      } else if (parseInt((currTime - startTime) / 1000) > 5) {
        console.log('ToutApp > NOT Removing: Harmful Toolbar Buttons');
        window.clearInterval(isToolbar);
      }
    });
};

/**************************************************************************************
 *
 *  Main
 *
 **************************************************************************************/

window.addEventListener('hashchange', TOUT.removeHarmfulButtons);
TOUT.removeToolbarButtons();
TOUT.waitForCsrfToken(TOUT.addPeopleToCampaigns(0.2).then(TOUT.completeTasks(0.5)));
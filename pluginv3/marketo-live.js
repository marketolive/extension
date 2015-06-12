
/**
    This module contains all of the functionality needed for the 
    manipulation of the marketolive.com website. It handles the deep
    linking of the tiles, manipulation of the UI, cookie checking etc.
    It is loaded onto the page by the Marketo Live plugin. It largely uses
    jQuery to interact with DOM elements and inject new bahavior.
    
    @namespace
*/
var LIVE = function () {
    
        /**
            This function injects the deep links onto the homepage based
            on which pod that the user is in.
            
            @param pod {PODS.Pod} - The pod object that stores all of the
                                    user's links for that subscription.s
        */
        var insertDeepLinks = function(pod) {
            $(".marketo-live-option").click(function (e) {
                e.preventDefault();
                window.open(pod[$(this).context.id]);
            });
        }

        /**
            This function inserts the login credentials for 250ok. Since
            we only have one account for the whole team, everyone needs
            to use the same set of credentials.
        */
        var emailDeliverabilityLogin = function() {
            $(document).ready(function () {
                $.getJSON("deliverability-login.json", function (login) {
                    $("#email").value = login.username;
                    $("#password").value = login.password;
                });
            });
        }
        
        var getCookie = function(cname) {
            return "app-sjp";
//            var name = cname + "=";
//            var ca = document.cookie.split(';');
//            for (var i = 0; i < ca.length; i++) {
//                var c = ca[i].trim();
//                if (c.indexOf(name) == 0)
//                    return c.substring(name.length, c.length);
//            }
//            return "";
        }
        
        pod = new Pod(getCookie("userPod"));
        console.log(pod);

        $(document).ready(function() { 
            console.log("Document Ready");
            insertDeepLinks(pod);
            /*
            this whole object won't exist. Mix with Andy's code. Not putting comments...
            except the fact that this will be an array with an object inside of it that
            sits within Andy's object. We then push the part of the switch statement
            into the existing switch statement that Andy has.

          */
        
          var URL = function(podVal){
            this.valueSet = [
              {position: 'modeler',
              url : ''},
              {position: 'success-path-analyzer',
              url : '#AR1682A1!'},
              {position : 'opportunity-influence-analyzer',
              url : '#AR1559A1!'},
              {position: 'program-analyzer',
              url : '#AR1544A1!'}
            ];
            //add this to the switch statement that already exists
            switch (podVal){
              case 'app-sjp':
                this.valueSet[2].url = '#?preview=true&approved=true/#RCM39A1!';
                break;
              case 'app-ab07':
                this.valueSet[2].url = '#RCM5A1!';
                break;
              case 'app-ab08':
                this.valueSet[2].url = '?preview=true&approved=true/#RCM5A1!';
                break;
              default:
                break;
            }
          }



        /**************************************************************************************
        *  
        *  This will run inside the updateCSS function and will see if what analyzer the user is on
        *  which will aid in setting the CSS around the selected analyzer
        *  
        *
        *  @Author Arrash
        *
        *  @function
        *
        *  @namespace location
        *  @namespace urlCompare
        *
        **************************************************************************************/
          
          var urlCheck = function(){
            var location = window.location.href,
                urlCompare = new URL();
            for(var y = 0; y < urlCompare.valueSet.length; y++){
              if(location.indexOf(urlCompare.valueSet[y].url) != -1)
                return urlCompare.valueSet[y].position;
            }
          }

        /**************************************************************************************
        *  
        *  This will update all the CSS around the div that is selected in the container
        *  It does this using Jquery functions to get the parent and the siblings related
        *  to the current position and the parent
        *
        *  @Author Arrash
        *
        *  @function
        *
        *  @namespace currentPosition
        *
        **************************************************************************************/

          var updateCSS = function(){
            var currentPosition = urlCheck();
            currentPosition = '#'+currentPosition;
            $(currentPosition).parent().css('display', 'block');
            $(currentPosition).parent().siblings().css('display', 'none');
            $(currentPosition).removeClass('analyzer-button').addClass('analyzer-title');
            $(currentPosition).siblings().removeClass('analyzer-title').addClass('analyzer-button');
          }

        /**************************************************************************************
        *  
        *  main object that will pass the variables for which analyzer should be present using
        *  currPosition as the current position in the object array.   
        *
        *  @Author Arrash
        *
        *  @class
        *
        *  @namespace Analyzer.currPosition
        *  @namespace Analyzer.url
        *
        **************************************************************************************/

          var Analyzer = function(){
            this.currPosition = 0;
            this.url = new URL('app-sjp');
          }

        /**************************************************************************************
        *  
        *  this method will insert an HTML template and a CSS sheet inside the template directly
        *  into the header of the Marketo page. It accomplishes this using "Import" and runs
        *  asynchronously. It will then bind the 'prev' and 'next' elements with a click function
        *  so that whenever theyre clicked it will call chooseAnalyzer and pass the element clicked
        *
        *  @Author Arrash
        *
        *  @function
        *
        *  @namespace link
        *  @namespace importedDoc
        *  @namespace el
        *
        **************************************************************************************/

          Analyzer.prototype.showAnalyzer = function() {
            var jscript_lib = document.createElement('link');
            jscript_lib.setAttribute('rel', 'import');
            jscript_lib.setAttribute('href', 'http://localhost:8888/plug-in/test.html');
            document.getElementsByTagName('head')[0].appendChild(jscript_lib);
            var link = document.querySelector('link[rel="import"]');
            link.addEventListener('load', function(e) {
              var importedDoc = link.import,
                  el = importedDoc.querySelector('.analyzer-container');
              document.body.appendChild(el.cloneNode(true));
              $("#modeler,#success-path-analyzer,#opportunity-influence-analyzer,#program-analyzer").bind("click", function(e){
                this.chooseAnalyzer(e.target);
              }.bind(this));
              updateCSS();
            }.bind(this));
          }

        //we're going to create an instance of the analyzer
        //and then call showAnalyzer to actually build out the template and CSS onto the page


        /**************************************************************************************
        *  
        *  this method will listen for the user clicking on a specific div in the
        *  template. We are then going to direct them to the correct URL.  
        *
        *  @Author Arrash
        *
        *  @function
        *
        *  @namespace id
        *
        *  @param {ele} passes in the element that was clicked from the 
        *
        **************************************************************************************/

          Analyzer.prototype.chooseAnalyzer = function(ele){
            var id = ele.id;  
            //updates the currPosition based on the div selected
            for(var x = 0; x < this.url.valueSet.length; x++){
              if(id == this.url.valueSet[x].position)
                this.currPosition = x;
            }
            window.location = 'https://'+currentPod+'.marketo.com/'+this.url.valueSet[this.currPosition];
          }

        /**************************************************************************************
        *  
        *  this method will insert an HTML template and a CSS sheet inside the template directly
        *  into the header of the Turner Technologies page. This will add a button to return the user
        *  directly back to the campaign page within RTP for Turner Technologies.
        *
        *  @Author Arrash
        *
        *  @function
        *
        *  @namespace link
        *  @namespace importedDoc
        *  @namespace el
        *
        **************************************************************************************/
          
          var rtpToMarketo = function() {
            var jscript_lib = document.createElement('link');
            jscript_lib.setAttribute('rel', 'import');
            jscript_lib.setAttribute('href', 'http://localhost:8888/plug-in/turner-rtp.html');
            document.getElementsByTagName('head')[0].appendChild(jscript_lib);
            var link = document.querySelector('link[rel="import"]');
            link.addEventListener('load', function(e) {
              var importedDoc = link.import,
                  el = importedDoc.querySelector('#marketo-return-button-container');
                  console.log(el);
              document.body.appendChild(el.cloneNode(true));
              $("#marketo-return-button-inner-container").bind("click", function(e){
                location.href = 'https://sjrtp6.marketo.com/app/editReaction.do?reactionId=750';
              });
            });
          }
          
        //we're going to create an instance of the analyzer
        //and then call showAnalyzer to actually build out the template and CSS onto the page
          
        });
}();
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
<?php
  header( 'Location: https://marketolive.com/m2/home.html' ) ;
?>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
	<meta http-equiv="Pragma" content="no-cache" />
	<meta http-equiv="Expires" content="0" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Marketo | Demonstration</title>

    <!-- Bootstrap core CSS -->
    <link href="assets/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <!-- Bootstrap theme -->
    <link href="assets/bootstrap/css/bootstrap-theme.min.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="assets/css/styles.css" rel="stylesheet">
    <link href="//marketolive.com/m/b2b/wp-content/themes/Nimble-child/jquery-ui-1.10.3.custom.css?ver=3.9.2" rel="stylesheet">
    
    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
    <![endif]-->
    
    <link rel="shortcut icon" href="//marketolive.com/m/favicon.ico" />
    <!--<script type='text/javascript'>	
    	function deleteCookie(c_name) {
    		document.cookie = encodeURIComponent(c_name) + "=deleted; expires=01-Jan-1970 00:00:00 GMT";
			}
		deleteCookie('_mkto_trk');
    </script>-->
    <style>
		.employee {
			height: 110px;
		}	
    </style>   
  </head>

  <body>
    <div class="background-image-overlay"></div>

    <div id="outer-background-container" data-default-background-img="assets/images/other_images/bg5.jpg" style="background-image:url(assets/images/other_images/bg5.jpg);"></div>
    <!-- end: #outer-background-container -->    

    <!-- Outer Container -->
    <div id="outer-container">

      <!-- Left Sidebar -->
      <section id="left-sidebar">
        
        <div class="logo">
          <a href="#intro" class="link-scroll"><img src="assets/images/other_images/marketocircle.png" alt="Twilli Air"></a>
        </div><!-- .logo -->

        <!-- Menu Icon for smaller viewports -->
        <div id="mobile-menu-icon" class="visible-xs" onClick="toggle_main_menu();"><span class="glyphicon glyphicon-th"></span></div>

      </section><!-- #left-sidebar -->
      <!-- end: Left Sidebar -->

      <section id="main-content" class="clearfix">
        
        <article id="intro" class="section-wrapper clearfix" data-custom-background-img="assets/images/other_images/bg5.jpg">
          <div class="content-wrapper clearfix">
            <div class="col-sm-10 col-md-9 pull-right">

                <section class="feature-text">
                  <h1>Welcome to MarketoLive</h1>
                  <p>Marketo helps marketers master the art and science of digital marketing. Come inside to see Marketo in action and learn how we can help you drive more awareness, engage your customers, align with sales and measure your success.</p>
                  <p id="action0" class="home-action-button" style="float:right;"><a id="get-started" href="//marketolive.com/m/b2b/" class="link-scroll btn btn-outline-inverse btn-lg">get started</a></p>
                </section>

            </div><!-- .col-sm-10 -->
          </div><!-- .content-wrapper -->
        </article><!-- .section-wrapper -->

      </section><!-- #main-content -->

      <!-- Footer -->
      <section id="footer">

        <!-- Go to Top -->
        <div id="go-to-top" onclick="scroll_to_top();"><span class="icon glyphicon glyphicon-chevron-up"></span></div>
		<div class="employee"><a href="https://resource.marketo.com/confluence/display/SC/MarketoLive+and+Marketo+Demonstrations" onclick="window.open(this.href); return false;" onkeypress="window.open(this.href); return false;">Marketo Employee?</a></div>
        <ul class="social-icons">
          <li><a href="//www.facebook.com/marketo" target="_blank" title="Facebook"><img src="assets/images/theme_images/social_icons/facebook.png" alt="Facebook"></a></li>
          <li><a href="//www.twitter.com/marketo" target="_blank" title="Twitter"><img src="assets/images/theme_images/social_icons/twitter.png" alt="Twitter"></a></li>
          <li><a href="//plus.google.com/+marketo/posts" target="_blank" title="Google+"><img src="assets/images/theme_images/social_icons/googleplus.png" alt="Google+"></a></li>
        </ul>

        <!-- copyright text -->
        <div class="footer-text-line">&copy; 2014 Marketo | Demo</div>
      </section>
      <!-- end: Footer -->      

    </div><!-- #outer-container -->
    <!-- end: Outer Container -->

    <!-- Modal -->
    <!-- DO NOT MOVE, EDIT OR REMOVE - this is needed in order for popup content to be populated in it -->
    <div class="modal fade" id="common-modal" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          <div class="modal-body">
          </div><!-- .modal-body -->
        </div><!-- .modal-content -->
      </div><!-- .modal-dialog -->
    </div><!-- .modal -->    

    <!-- Javascripts
    ================================================== -->

    <!-- Jquery and Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-1.10.2.min.js"></script>
    <script src="assets/bootstrap/js/bootstrap.min.js"></script>
    <script src="assets/js/jquery-ui-1.10.3.custom.min.js"></script>

    <!-- Easing - for transitions and effects -->
    <script src="assets/js/jquery.easing.1.3.js"></script>

    <!-- background image strech script -->
    <script src="assets/js/jquery.backstretch.min.js"></script>
    <!-- background image fix for IE 9 or less
       - use same background as set above to <body> -->
    <!--[if lt IE 9]>
    <script type="text/javascript">
    $(document).ready(function(){
      jQuery("#outer-background-container").backstretch("assets/images/other_images/bg5.jpg");
    });
    </script> 
    <![endif]-->  

    <!-- detect mobile browsers -->
    <script src="assets/js/detectmobilebrowser.js"></script>

    <!-- Marketo Munchkin -->
    <script type="text/javascript">
    	document.write(unescape("%3Cscript src='//munchkin.marketo.net/munchkin.js' type='text/javascript'%3E%3C/script%3E"));
    </script>
    <script>Munchkin.init('226-FBL-320');</script>
	
	<!-- Marketo Forms -->
	<script src="//app-sj08.marketo.com/js/forms2/js/forms2.min.js"></script>
	
	<!-- Google Analytics -->
	<script>
		(function(i, s, o, g, r, a, m) {
			i['GoogleAnalyticsObject'] = r;
			i[r] = i[r] ||
			function() {
				(i[r].q = i[r].q || []).push(arguments)
			}, i[r].l = 1 * new Date();
			a = s.createElement(o),
			m = s.getElementsByTagName(o)[0];
			a.async = 1;
			a.src = g;
			m.parentNode.insertBefore(a, m)
		})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

		ga('create', 'UA-57886764-1', 'auto');
		ga('send', 'pageview');

	</script>
	<script>
		$('#get-started').click(function() {
			ga('send', 'event', first+ ' ' +last, 'Get Started');
		});
	</script>
    <!-- Custom functions for this theme -->
    <script src="assets/js/functions.min.js"></script>
    <script src="assets/js/initialise-functions.js"></script>

    <!-- IE9 form fields placeholder fix -->
    <!--[if lt IE 9]>
    <script>contact_form_IE9_placeholder_fix();</script>
    <![endif]-->  
	<!--
	<script type="text/javascript">
		window.addEventListener('message', function(event) {
			if (event.data.type && event.data.type == 'PluginMsg') {
				var pagePluginStatus = event.data.text;
				console.log('PAGE : Receive Plugin Status = '+pagePluginStatus+' <--- *** Provide this variable for the Marketo application ***');
			}	
		}, false);

		window.postMessage({
			type : 'PageMsg',
			text : 'true'
		}, '//marketolive.com');
			
 	</script>
 	-->
  </body>
</html>
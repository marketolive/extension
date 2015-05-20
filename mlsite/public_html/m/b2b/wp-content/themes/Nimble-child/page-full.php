<?php
/*
Template Name: Full Width Page
*/
?>
<?php get_header(); ?>
<div id="main-area" class="fullwidth">
	<div class="container">
		<?php $url = '//' . $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI']; 
		if (false !== strpos($url,'nurture') && false == strpos($url,'confirmation')) { ?>
		<div id="content-area" class="clearfix">
			<div id="left-area">
				<article class="page type-page hentry clearfix">	
					<div class="post_content">
						<p>
							<strong>What is lead nurturing? How does it work?</strong>
							<br>
							Marketo provides the best solution for marketers who want to build relationships with their customers.
						</p>
						<div id="fp_everythingelse">
							<div class="more-faq">
								<ul id="hide-bullet">
									<li>
										Nurturing is the process of <b>building relationships</b> with your customers across various channels. The goal 
										of nurturing is to <b>provide the right content</b> to compel your prospect to move through the customer journey. 
										95% of the prospects visiting your website today are there to research and as many as 70% of them will eventually 
										buy from you or from your competitor. Because today’s buyers prefer not to engage with sales until the last third 
										of the purchasing process, marketing and sales must collaborate throughout every stage in the revenue cycle to 
										provide customers with high quality content that is <b>timely, relevant and responsive</b> to their situation.
									</li>
									<br/>
									<li>
										<b>Only Marketo provides you with a solution that delivers this kind of power in a simple and easy way.</b>
									</li>
									<br/>
									<li>
										<a id="nurture-more" style="cursor:pointer; text-decoration:none;">Read More...</a>
										<br/>
										<br/>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</article>		
			</div
		</div>
		<div class='outernurturegame'>
			<div class='nurturetext'>
				Choose A Program. Get Nurtured.
			</div>
			<div id='instructions'>
				<p>
					In the examples below, you will be able to choose a nurture program and Marketo will nurture you with relevant content.
				</p>
			</div>
			<div class='products'>
				<div id='producta' class='pick1'>
					<span id='titlea' class='pick2'>
						Persona
					</span>
				</div>
				<div id='productb' class='pick1'>
					<span id='titleb' class='pick2'>
						Stage
					</span>
				</div>
				<div id='productc' class='pick1'>
					<span id='titlec' class='pick2'>
						Product
					</span>
				</div>
			</div>
		</div>
		<div id='nurturetracks'>
			<div id='stream1' class='streams'>
				<div id='s1' class='ntitle'>
				</div>
				<div id='nimage1'>
					<div id='offgray' class='emailcont'>
						<div class='nurturecheck'>
						</div>
						<p id='t1'></p>
					</div>
					<div id='white' class='emailcont'>
						<div class='nurturecheck'>
						</div>
						<p id='t2'></p>
					</div>
					<div id='offgray' class='emailcont'>
						<div class='nurturecheck'>
						</div>
						<p id='t3'></p>
					</div>
					<div id='white' class='emailcont'>
						<div class='nurturecheck'>
						</div>
						<p id='t4'></p>
					</div>					
				</div>
			</div>
			<div id='stream2' class='streams'>
				<div id='s2' class='ntitle'>
				</div>
				<div id='nimage2'>
					<div id='offgray' class='emailcont'>
						<div class='nurturecheck'>
						</div>
						<p id='t5'></p>
					</div>
					<div id='white' class='emailcont'>
						<div class='nurturecheck'>
						</div>
						<p id='t6'></p>
					</div>
					<div id='offgray' class='emailcont'>
						<div class='nurturecheck'>
						</div>
						<p id='t7'></p>
					</div>
					<div id='white' class='emailcont'>
						<div class='nurturecheck'>
						</div>
						<p id='t8'></p>
					</div>					
				</div>
			</div>
			<div id='stream3' class='streams'>
				<div id='s3' class='ntitle'>
				</div>
				<div id='nimage3'>
					<div id='offgray' class='emailcont'>
						<div class='nurturecheck'>
						</div>
						<p id='t9'></p>
					</div>
					<div id='white' class='emailcont'>
						<div class='nurturecheck'>
						</div>
						<p id='t10'></p>
					</div>
					<div id='offgray' class='emailcont'>
						<div class='nurturecheck'>
						</div>
						<p id='t11'></p>
					</div>
					<div id='white' class='emailcont'>
						<div class='nurturecheck'>
						</div>
						<p id='t12'></p>
					</div>					
				</div>
			</div>
		</div>
		<div id='mktformposA'>
			<script src="//app-sj08.marketo.com/js/forms2/js/forms2.js"></script>
			<form id="mktoForm_1031"></form>
			<script>
				MktoForms2.loadForm("//app-sj08.marketo.com", "226-FBL-320", 1031, function(form){
				    //Add an onSuccess handler
				    form.onSuccess(function(values, followUpUrl){				    	
					    //get the form's jQuery element and hide it
					    var formclass = form.getFormElem();
					    formclass.hide();
					    $('#mktformpos').css('padding-left',0);
					    $('#mktformpos').append("<div class='scoreitnurture'>Start Nurture.</div>");
					    //return false to prevent the submission handler from taking the lead to the follow up url.
					    return false;
		    		});
		    	});
			</script>
		</div>
		<div id='mktformposB'>
			<script src="//app-sj08.marketo.com/js/forms2/js/forms2.js"></script>
			<form id="mktoForm_1154"></form>
			<script>
				MktoForms2.loadForm("//app-sj08.marketo.com", "226-FBL-320", 1154, function(form){
				    //Add an onSuccess handler
				    form.onSuccess(function(values, followUpUrl){
					    //get the form's jQuery element and hide it
					    var formclass = form.getFormElem();
					    formclass.hide();
					    $('#mktformpos').css('padding-left',0);
					    $('#mktformpos').append("<div class='scoreitnurture'>Start Nurture.</div>");
					    //return false to prevent the submission handler from taking the lead to the follow up url.
					    return false;
			    	});
			    });
			</script>
		</div>
		<div id='mktformposC'>
			<script src="//app-sj08.marketo.com/js/forms2/js/forms2.js"></script>
			<form id="mktoForm_1155"></form>
			<script>
				MktoForms2.loadForm("//app-sj08.marketo.com", "226-FBL-320", 1155, function(form){
				    //Add an onSuccess handler
				    form.onSuccess(function(values, followUpUrl){
					    //get the form's jQuery element and hide it
					    var formclass = form.getFormElem();
					    formclass.hide();
					    $('#mktformpos').css('padding-left',0);
					    $('#mktformpos').append("<div class='scoreitnurture'>Start Nurture.</div>");
					    //return false to prevent the submission handler from taking the lead to the follow up url.
					    return false;
			    	});
			    });
			</script>
		</div>
	</div>
	<div id="form_modal" class="formModal" style="display: none;">
		<div class="formModalMask"></div>
		<div class="formModalContent">
			<div class="formModalClose">
				X
			</div>
			<div class="formModalMain">
				<div class="formTemplateBox">
					<p style="text-align: center;">
						<span style="font-size: 20px; color: #000000; font-family: 'Open Sans',Helvetica,Arial,Lucida,sans-serif;">You Got Mail!</span>
					</p>
				</div>
			</div>
		</div>
	</div>	
</div>

<?php } elseif(false !== strpos($url, 'agile')) { ?>
	<div id="target" class="loading"></div>
	<div id="home-section-email" class="home-section">
		<div class="container">
			<script type="text/javascript">
				$(function() {
					var owl = $('.owl-demo');
					owl.owlCarousel({
						afterInit : function(elem) {
							var that = this;
							that.owlControls.prependTo(elem);
						},
					items : 3, //10 items above 1000px browser width				
					});
				});
			</script>			
			<div class="section-title-white" style='-moz-user-select: none; -webkit-user-select: none; -ms-user-select:none; user-select:none;' unselectable='on' onselectstart='return false;' onmousedown='return false;'>
			</div>
		<?php
			if ( 'on' == et_get_option( 'nimble_display_services', 'on' ) ){
				$l = 1;
				$blurbs_number = (int) apply_filters( 'et_blurbs_number', 3 );
				$paddingleft = array();
				$paddingleft[1] = 'padding-left:57px;';
				$paddingleft[2] = 'padding-left:57px;';
				$paddingleft[3] = 'padding-left:57px;';
				echo '<div id="agile-services-a" class="clearfix services owl-demo" style="display: block;">';
				for ($j = 1; $j < 5; $j++){
					if ($j == 1){
						$pageid[1] = 1374; //DIY Design
						$pageid[2] = 1743; //Actionable Insight
						$pageid[3] = 1377; //Powerful Automation
						$i = 1;
					}
					if ($j == 2){
						$pageid[1] = 1390; //Marketing ROI
						$pageid[2] = 1384; //Customer Engagement
						$pageid[3] = 1410; //Replicate Success
						$i = 1;
					}
					if ($j == 3){
						$pageid[1] = 1597; //Search Optimization
						$pageid[2] = 1764; //Funnel Analysis
						$pageid[3] = 1593; //Personalization
						$i = 1;
					}
					if ($j == 4){
						$pageid[1] = 1766; //Email Deliverability
						$pageid[2] = 1591; //Calendar
						$pageid[3] = 1768; //Flexible Reporting
						$i = 1;
					}
					for ( $i = 1; $i <= $blurbs_number; $i++ ){
						if (($j==1&&$i==1)||($j==1&&$i==3)||($j==2&&$i==2)||($j==3&&$i==1)||($j==3&&$i==3)||($j==4&&$i==2)){
							echo '<div id=block_' . ($l - 1) . '>';
							$l = $l + 1;
						}
						$service_query = new WP_Query( apply_filters( 'et_service_query_args', 'page_id=' . $pageid[$i], $i ) );
						while ( $service_query->have_posts() ) : $service_query->the_post();
							global $more;
							$more = 0;
							$page_title = ( $blurb_custom_title = get_post_meta( get_the_ID(), 'Blurbtitle', true ) ) && '' != $blurb_custom_title ? $blurb_custom_title : get_the_title();
							$page_permalink = ( $blurb_custom_permalink = get_post_meta( get_the_ID(), 'Blurblink', true ) ) && '' != $blurb_custom_permalink ? $blurb_custom_permalink : get_permalink();
							echo '<a style="display:block;text-decoration:none;color:#636b66;' . $paddingleft[$i] . '" href="' . esc_url( $page_permalink ) . '" >';
							echo '<div class="service-white' . ( 1 == $i ? ' first' : '' ) . ( $blurbs_number == $i ? ' last' : '' ) . '"' . (  ($j==7&&$i==7)||($j==7&&$i==7)||($j==7&&$i==7) ? 'style=display:none': '' ). '>';
								if ( ( $page_icon = get_post_meta( get_the_ID(), 'Icon', true ) ) && '' != $page_icon )
									printf( '<img src="../%1$s" alt="%2$s" class="et_page_icon" />', esc_attr( $page_icon ), esc_attr( $page_title ) );

								echo '<h3>' . $page_title . '</h3>';

								if ( has_excerpt() ) the_excerpt();
								else the_content( '' );
								echo '</a>';
							echo '</div> <!-- end .service -->';
						endwhile;
						wp_reset_postdata();
						if (($j==1&&$i==2)||($j==2&&$i==1)||($j==2&&$i==3)||($j==3&&$i==2)||($j==4&&$i==1)||($j==4&&$i==3)){
							echo '</div>';
						}
					}
				}
				echo '</div> <!-- end #services -->';
				echo '<div id="spacer" class="clearfix" style="display: block; height: 300px;">';
				echo '</div> <!-- end #spacer -->';
				}
		?>

			</div> <!-- end .container -->
		</div> <!-- end #home-section-info -->		
<?php }
	elseif (false !== strpos($url,'score')) { ?>
		<div id="content-area" class="clearfix">
			<div id="left-area">
				<article class="page type-page hentry clearfix">	
					<div class="post_content">
						<p>
							<strong>What is lead scoring? How does it work?</strong>
							<br>
							Marketo provides the most flexible solution for marketers who want to better qualify their leads.
						</p>
						<div id="fp_everythingelse">
							<div class="more-faq">
								<ul id="hide-bullet">
									<li>
										Lead scoring is a <b>shared sales and marketing methodology</b> for ranking leads in order to determine their sales-readiness. 
										You score leads based on the interest they show in your business, their <b>current stage</b> in the buying cycle and their 
										<b>fit</b> in regards to your business. Companies can score leads by assigning points, implementing rankings like A, B, C, D, 
										or using terms like ‘hot’, ‘warm’ or ‘cold’. The key point is that <b>marketing and sales increase their combined efficiency 
										and productivity</b> based on the clarity of a sales-ready lead.
									</li>
									<br/>
									<li>
										<b>With Marketo, you can use scoring models to ensure you are engaging your customers with the right content and at the right time.</b>
									</li>
									<br/>									
									<li>
										<a id="score-more" style="cursor:pointer; text-decoration:none;">Read More...</a>
										<br/>
										<br/>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</article>		
			</div
		</div>
		<div class='outerscoregame'>
			<div id="howto">
				<h1>Play the Game:</h1>
				<ul id="hide-bullet">
					<li>
						In this game, you will select a demographic profile and three corresponding behavioral activities that best represents a target
						buyer profile. The object of the game is to figure out the best combination of demographic and behavioral criteria to generate 
						the highest lead score. A marketing qualified lead must have a combined score of greater than 70 points.
						<br/>
						<br/>
						<b>Can you figure out the combination of demographic and behavioral criteria to generate the most qualified lead?</b>
					</li>
				</ul>
			</div>
			<div class='innerleft'>
				<div class='gameheader'>
					<h1>Choose a Profile:</h1>
				</div>
				<div id='avatar1'>
					<div class='avcontent'>
						<p> <strong>Job Function:</strong> Practitioner </p>
						<p> <strong>Industry:</strong> Financial Services </p>
						<p> <strong>Employee Count:</strong> < 100 </p>
					</div>
				</div><br />
				<div id='avatar2'>
					<div class='avcontent'>
						<p> <strong>Job Function:</strong> Executive </p>
						<p> <strong>Industry:</strong> Healthcare </p>
						<p> <strong>Employee Count:</strong> < 500 </p>
					</div>
				</div><br />
				<div id='avatar3'>
					<div class='avcontent'>
						<p> <strong>Job Function:</strong> Technologist </p>
						<p> <strong>Industry:</strong> Software </p>
						<p> <strong>Employee Count:</strong> < 1000 </p>
					</div>
				</div>
			</div>
			<div class='innerright'>
				<div id='choosebehavior' class='gameheader'>
					<h1>Choose 3 Behaviors:</h1>
				</div>
				<div class='innerupperright'>
					<div id='cont1' class='pick3' title="Attend a Webinar"></div>
					<div id='cont2' class='pick3' title="Unsubscribe"></div>
					<div id='cont3' class='pick3' title="Complete Contact Me Form"></div>
					<div id='cont4' class='pick3' title="Visit Career Page"></div>					
					<div id='cont5' class='pick3' title="Visit 10 Pages in 1 hour"></div>
					<div id='cont6' class='pick3' title="Visit Pricing Page"></div>
				</div>
				<div class='innerlowerright'>
					<div class="scoreit">Score it!</div>
				</div>
			</div>
		</div>
	</div>
</div>
<?php }
	elseif (false !== strpos($url,'subscriptioncenter') && false == strpos($url,'confirmation')) {
		//get the bearer token
		 $response = file_get_contents('https://226-FBL-320.mktorest.com/identity/oauth/token?grant_type=client_credentials&client_id=a9fa6570-f0de-4f4e-a85a-c67c40586df8&client_secret=3DZbLaTAYmMjGRAwy8F7ZoXcpHUUItPr');
	     //echo $response;
	     $response = json_decode($response);
		 //grab the access_token value
		 $at = $response->access_token;
		 $cook =  $_COOKIE['_mkto_trk'];
		 $cook = substr($cook, strpos($cook, 'token:') + 6, strlen($cook));
		 $subscriptionvalues = file_get_contents('https://226-FBL-320.mktorest.com/rest/v1/leads.json?access_token='.$at.'&filterType=cookie&filterValues='.$cook.'&fields=email,firstName,lastName,unsubscribeAutomate,unsubscribeBatch,unsubscribeDrip,unsubscribeScore,unsubscribeNurture,unsubscribeEvents,unsubscribeExecutiveDashboards,unsubscribeContentAnalysis,unsubscribeTacticalReporting,unsubscribeAllContent');
		 $subscriptionvalues = json_decode($subscriptionvalues, TRUE);
		 if ($subscriptionvalues['result'][0]['unsubscribeAutomate']){?> 
		 	<script type='text/javascript'>
		 	$(function(){
		 		$("#mcb").prop('checked', true);
		 	});
		 	</script>
		 	<?php
		 }
		 if ($subscriptionvalues['result'][0]['unsubscribeBatch']){?> 
		 	<script type='text/javascript'>
		 	$(function(){
		 		$("#scb").prop('checked', true);
		 	});
		 	</script>
		 	<?php
		 }
		 if ($subscriptionvalues['result'][0]['unsubscribeDrip']){?> 
		 	<script type='text/javascript'>
		 	$(function(){
		 		$("#ecb").prop('checked', true);
		 	});
		 	</script>
		 	<?php
		 }
		 if ($subscriptionvalues['result'][0]['unsubscribeScore']){?> 
		 	<script type='text/javascript'>
		 	$(function(){
		 		$("#sacb").prop('checked', true);
		 	});
		 	</script>
		 	<?php
		 }
		 if ($subscriptionvalues['result'][0]['email']){?> 
		 	<script type='text/javascript'>
		 	$(function(){
		 		$("#emails").val("<?php echo $subscriptionvalues['result'][0]['email']; ?>");
		 	});
		 	</script>
		 	<?php
		 }
		 if ($subscriptionvalues['result'][0]['unsubscribeNurture']){?> 
		 	<script type='text/javascript'>
		 	$(function(){
		 		$("#emailss").prop('checked', true);
		 	});
		 	</script>
		 	<?php
		 }
		 if ($subscriptionvalues['result'][0]['unsubscribeEvents']){?> 
		 	<script type='text/javascript'>
		 	$(function(){
		 		$("#acb").prop('checked', true);
		 	});
		 	</script>
		 	<?php
		 }
		 if ($subscriptionvalues['result'][0]['unsubscribeExecutiveDashboards']){?> 
		 	<script type='text/javascript'>
		 	$(function(){
		 		$("#evcb").prop('checked', true);
		 	});
		 	</script>
		 	<?php
		 }
		 if ($subscriptionvalues['result'][0]['unsubscribeAllContent']){?> 
		 	<script type='text/javascript'>
		 	$(function(){
		 		$("#ally").prop('checked', true);
		 	});
		 	</script>
		 	<?php
		 }
		 if ($subscriptionvalues['result'][0]['unsubscribeContentAnalysis']){?> 
		 	<script type='text/javascript'>
		 	$(function(){
		 		$("#tracb").prop('checked', true);
		 	});
		 	</script>
		 	<?php
		 }
		 if ($subscriptionvalues['result'][0]['unsubscribeTacticalReporting']){?> 
		 	<script type='text/javascript'>
		 	$(function(){
		 		$("#wcb").prop('checked', true);
		 	});
		 	</script>
		 	<?php
		 }
		 ?>
		 <script>
		 	$(function(){
		 		$("#meme").toggle(function(){
					$("#meme").empty();
					$("#meme").html('resubscribe');
		 			$("#mcb").prop('checked', true);
		 			$("#scb").prop('checked', true);
		 			$("#ecb").prop('checked', true);
		 		}, function(){
					$("#meme").empty();
					$("#meme").html('unsubscribe');
		 			$("#mcb").prop('checked', false);
		 			$("#scb").prop('checked', false);
		 			$("#ecb").prop('checked', false);		 			
		 		});
		 		$("#cece").toggle(function(){
					$("#cece").empty();
					$("#cece").html('resubscribe');
		 			$("#sacb").prop('checked', true);
		 			$("#emailss").prop('checked', true);
		 			$("#acb").prop('checked', true);
		 		}, function(){
					$("#cece").empty();
					$("#cece").html('unsubscribe');
		 			$("#sacb").prop('checked', false);
		 			$("#emailss").prop('checked', false);
		 			$("#acb").prop('checked', false);	 			
		 		});
		 		$("#sese").toggle(function(){
					$("#sese").empty();
					$("#sese").html('resubscribe');
		 			$("#evcb").prop('checked', true);
		 			$("#tracb").prop('checked', true);
		 			$("#wcb").prop('checked', true);
		 		}, function(){
					$("#sese").empty();
					$("#sese").html('unsubscribe');
		 			$("#evcb").prop('checked', false);
		 			$("#tracb").prop('checked', false);
		 			$("#wcb").prop('checked', false);		 			
		 		});
		 	});
		 </script>
	<div id="fp_everythingelse-subscriptioncenter">
		<div class="form-wrapper">Click to unsubscribe:<br /><br />
		<div class="form-container"><form action="http://marketolive.com/m/b2b/subscriptioncenter/confirmation" method="POST">
		<div class="form-title">Email Address:
		<input id='emails' class='form-field' type="email" name="email" required readonly></div>
		<div class='form-title-s'>Done receiving content?</div><br />
		<div class="form-title-s">
		<input id='ally' type="checkbox" name="unsuball" value="unsuball">Unsubscribe from everything</div>
		<br />
		<div class='form-title-s'>Make Email Easy: <a href="#" id='meme' class="rerere">unsubscribe</a></div>
		<br />
		<div class="form-title-s">
		<input id='mcb' type="checkbox" name="unsubautomate" value="unsubautomate">Automate</div>
		<div class="form-title-s">
		<input id='scb' type="checkbox" name="unsubbatch" value="unsubbatch">Batch</div>
		<div class="form-title-s">
		<input id='ecb' type="checkbox" name="unsubdrip" value="unsubdrip">Drip</div>
		<br />
		<div class='form-title-s'>Engage Your Customers: <a href="#" id='cece' class="rerere">unsubscribe</a></div>
		<br />	
		<div class="form-title-s">
		<input id='sacb' type="checkbox" name="unsubscore" value="unsubscore">Score</div>
		<div class="form-title-s">
		<input id='emailss' type="checkbox" name="unsubnurture" value="unsubnurture">Nurture</div>
		<div class="form-title-s">
		<input id='acb' type="checkbox" name="unsubevents" value="unsubevents">Events</div>
		<br />
		<div class='form-title-s'>Measure Your Success: <a href="#" id='sese' class="rerere">unsubscribe</a></div>
		<br />
		<div class="form-title-s">
		<input id='evcb' type="checkbox" name="unsubexecdash" value="unsubexecdash">Executive Dashboards</div>
		<div class="form-title-s">
		<input id='tracb' type="checkbox" name="unsubcontentanalysis" value="unsubcontentanalysis">Content Analysis</div>
		<div class="form-title-s">
		<input id='wcb' type="checkbox" name="unsubtactics" value="unsubtactics">Tactical Reporting</div>
		<input type="hidden" name="fid" value="1148" />
		<div class="submit-container"><input class="submit-button" style="cursor: pointer;" type="submit" value="Update my Preferences" /></div>
		</form></div>
		</div>
		<strong>How this subscription center works</strong><br /><br />
		<ul id="hide-bullet">
			<li>It's pretty simple.  When you visit this page from an email or from coming to the page by browsing to it, a web service call is made to Marketo based on any number of parameters</li>
			<li>We usually use your unique cookie id to retrieve your up to date subscription settings.  Then you can update your preferences and be on your merry way.</li>
		</ul>
		<strong>Try it out!</strong><br /><br />
		<ol>
			<li>Click the purple Marketo symbol on the left to see what your profile looks like.</li>
			<li>Fill out the form on the right to initiate the web service to Marketo and update your subscription center</li>
			<li>Click submit.</li>
		</ol>
	</div>
	</div>
		<div id="subscriptioncenterwidth">
		</div>
	<?php }elseif (false !== strpos($url,'use-case')) { ?>
		<div id="home-section-projects" class="home-section">
				<div class="container">
					<div class="section-title">
						<p class="section-subtitle">All your use-cases are belong to us.</p>
					</div>
				<?php
				if ( 'on' == et_get_option( 'nimble_display_services', 'on' ) ){
					$blurbs_number = (int) apply_filters( 'et_blurbs_number', 3 );
					$paddingleft = array();
					$paddingleft[1] = 'padding-left:28px;';
					$paddingleft[2] = 'padding-left:49px;';
					$paddingleft[3] = 'padding-left:60px;';
					$pageid = array();
					for ($j = 1; $j < 4; $j++){
						if ($j == 1){
							$pageid[1] = 37; //email use case
							$pageid[2] = 39; //score use case
							$pageid[3] = 41; //nuture use case
							$i = 1;
						}
						if ($j == 2){
							$pageid[1] = 264; //video's root page
							$pageid[2] = 266; //sms text root page
							$pageid[3] = 268; //webinar root page
							$i = 1;
						}
						if ($j == 3){
							$pageid[1] = 156; //sales alert root page
							$pageid[2] = 362; //polls root page
							$pageid[3] = 161; //blog root page
							$i = 1;
						}
						echo '<div id="services" class="clearfix">';
						//echo '<div id="dialog" title="Not quite ready yet, Sorry!">Coming Soon</div>';
							for ( $i = 1; $i <= $blurbs_number; $i++ ){
								//echo $pageid[$i];
								$service_query = new WP_Query( apply_filters( 'et_service_query_args', 'page_id=' . $pageid[$i], $i ) );
								while ( $service_query->have_posts() ) : $service_query->the_post();
									global $more;
									$more = 0;
									$page_title = ( $blurb_custom_title = get_post_meta( get_the_ID(), 'Blurbtitle', true ) ) && '' != $blurb_custom_title ? $blurb_custom_title : get_the_title();
									$page_permalink = ( $blurb_custom_permalink = get_post_meta( get_the_ID(), 'Blurblink', true ) ) && '' != $blurb_custom_permalink ? $blurb_custom_permalink : get_permalink();
									//custom code for coming soon pages
									//first if block is for setting dead links
									//second if block is for setting the jquery id's that will pop the modal
										echo '<a style="display:block;text-decoration:none;color:black;' . $paddingleft[$i] . '" href="' . esc_url( $page_permalink ) . '" >';
										echo '<div class="service' . ( 1 == $i ? ' alignment' : '' ) . ( $blurbs_number == $i ? ' last' : '' ) . '">';
										if ( ( $page_icon = get_post_meta( get_the_ID(), 'Icon', true ) ) && '' != $page_icon )
											printf( '<img src="../%1$s" alt="%2$s" class="et_page_icon" />', esc_attr( $page_icon ), esc_attr( $page_title ) );
		
										echo '<h3>' . $page_title . '</h3>';
		
										if ( has_excerpt() ) the_excerpt();
										else the_content( '' );
										echo '</a>';
									echo '</div> <!-- end .service -->';
								endwhile;
								wp_reset_postdata();
							}
						echo '</div> <!-- end #services -->';
					}
				}
			?>
				</div> <!-- end .container -->
			</div> <!-- end #home-section-projects -->
	<?php }else{?>
			<!--this is the entry point to the fpw container-->
			<div id="content-area" class="clearfix">
				<div id="left-area">
					<?php get_template_part('loop', 'page'); ?>
					<?php if ( 'on' == et_get_option( 'nimble_show_pagescomments', 'false' ) ) comments_template( '', true ); ?>
				</div> <!-- end #left-area -->
			</div> <!-- end #content-area -->
			<?php } ?>
	</div> <!-- end .container -->
	</div>
</div> <!-- end #main-area -->

<?php get_footer(); ?>
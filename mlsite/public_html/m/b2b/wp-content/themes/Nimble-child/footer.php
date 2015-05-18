	<footer id="main-footer">
	<?php get_sidebar( 'footer' ); ?>
		<div id="footer-bottom">
			<div class="container">
				<p id="copyright"><?php printf( __( 'Designed by %1$s | Powered by %2$s', 'Nimble' ), '<a href="//marketolive.com/m/b2b/contact" title="Marketo Solutions Consulting LinkedIn">Marketo Solutions Consulting</a>', '<a href="//www.marketo.com">Marketo</a>' ); ?></p>
			</div> <!-- end .container -->
		</div> <!-- end #footer-bottom -->
	</footer> <!-- end #main-footer -->
<?php wp_footer(); ?>


<!-- RTP tag --> 
<!-- RTP tag --> <script type='text/javascript'>(function(c,h,a,f,i){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)}; c[a].a=i;var g=h.createElement("script");g.async=true;g.type="text/javascript"; g.src=f+'?rh='+c.location.hostname+'&aid='+i;var b=h.getElementsByTagName("script")[0];b.parentNode.insertBefore(g,b); })(window,document,"rtp","//sjrtp-cdn.marketo.com/rtp-api/v1/rtp.js","mktosolutions"); rtp('send','view');rtp('get', 'campaign',true);</script><!-- End of RTP tag -->
<!-- End of RTP tag -->
<!-- Marketo Munchkin -->
<script type="text/javascript">
	document.write(unescape("%3Cscript src='//munchkin.marketo.net/munchkin.js' type='text/javascript'%3E%3C/script%3E"));
</script>
<script>
	Munchkin.init('226-FBL-320');
</script>
<!-- Marketo Munchkin -->
<!-- Google Analytics -->
<script>
	//Google Analytics
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
<!-- Google Analytics -->


<!-- Mixpanel -->
<script type="text/javascript">
	(function(e,b){if(!b.__SV){var a,f,i,g;window.mixpanel=b;a=e.createElement("script");a.type="text/javascript";a.async=!0;a.src=("https:"===e.location.protocol?"https:":"http:")+'//cdn.mxpnl.com/libs/mixpanel-2.2.min.js';f=e.getElementsByTagName("script")[0];f.parentNode.insertBefore(a,f);b._i=[];b.init=function(a,e,d){function f(b,h){var a=h.split(".");2==a.length&&(b=b[a[0]],h=a[1]);b[h]=function(){b.push([h].concat(Array.prototype.slice.call(arguments,0)))}}var c=b;"undefined"!==
	typeof d?c=b[d]=[]:d="mixpanel";c.people=c.people||[];c.toString=function(b){var a="mixpanel";"mixpanel"!==d&&(a+="."+d);b||(a+=" (stub)");return a};c.people.toString=function(){return c.toString(1)+".people (stub)"};i="disable track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config people.set people.set_once people.increment people.append people.track_charge people.clear_charges people.delete_user".split(" ");for(g=0;g<i.length;g++)f(c,i[g]);
	b._i.push([a,e,d])};b.__SV=1.2}})(document,window.mixpanel||[]);
	mixpanel.init("d933495584b3899ab8205128167ce19d");
</script>
<!-- Mixpanel -->


</body>
</html>
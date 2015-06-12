function get_dashboard_config() {
	var current_url = location.href;
	var url_cnt = current_url.split('/');
	var url_len = url_cnt.length;
	var domain = url_cnt[2];
	
	var url_cnt_s = current_url.split('#');
	var url_len_s = url_cnt_s.length;
	var domain_s_1 = url_cnt_s[0];
	var domain_s_2 = url_cnt_s[1];
	
	var subdomain_s1 = domain_s_1.split('/');
	var subdomain_s2 = subdomain_s1[2].split('.');
	var subdomainMatch = /([([a-z0-9][a-z0-9-]+[a-z0-9]\.marketo\.com)/;
	var patt = new RegExp(subdomainMatch);
	var res = patt.test(current_url);

	if (res == true) {

		var scripts = document.getElementsByTagName('script');
		var count = scripts.length;
		for (var i = 0; i < scripts.length; i++) {
			var allScripts = scripts[i];
			var myScript = allScripts.src;
			var scScript = myScript.indexOf('https://marketolive.com/plugin/remote_data.js');
			if (scScript == 0) {

				var cee_head = document.getElementsByTagName('head')[0];
				var cee_script = document.createElement('script');
				cee_script.type = 'text/javascript';
				cee_script.async = true;
				cee_script.onload = function() {
					load_cee_data();
				};
				cee_script.src = 'https://marketolive.com/plugin/cee_data.js';
				cee_head.appendChild(cee_script);

				var social_head = document.getElementsByTagName('head')[0];
				var social_script = document.createElement('script');
				social_script.type = 'text/javascript';
				social_script.async = true;
				social_script.onload = function() {
					load_social_data();
				};
				social_script.src = 'https://marketolive.com/plugin/social_data.js';
				social_head.appendChild(social_script);

				var program_head = document.getElementsByTagName('head')[0];
				var program_script = document.createElement('script');
				program_script.type = 'text/javascript';
				program_script.async = true;
				program_script.onload = function() {
					load_program_data();
				};
				program_script.src = 'https://marketolive.com/plugin/program_data.js';
				program_head.appendChild(program_script);

				/*
				var success_head = document.getElementsByTagName('head')[0];
				var success_script = document.createElement('script');
				success_script.type = 'text/javascript';
				success_script.async = true;
				success_script.onload = function() {
					load_success_data();
				};
				success_script.src = 'https://marketolive.com/plugin/success_data.js';
				success_head.appendChild(success_script); 
				*/

				var emaildashboard_head = document.getElementsByTagName('head')[0];
				var emaildashboard_script = document.createElement('script');
				emaildashboard_script.type = 'text/javascript';
				emaildashboard_script.async = true;
				emaildashboard_script.onload = function() {
					load_emaildashboard_data();
				};
				emaildashboard_script.src = 'https://marketolive.com/plugin/email_dashboard_data.js';
				emaildashboard_head.appendChild(emaildashboard_script);

				var emailasset_head = document.getElementsByTagName('head')[0];
				var emailasset_script = document.createElement('script');
				emailasset_script.type = 'text/javascript';
				emailasset_script.async = true;
				emailasset_script.onload = function() {
					load_emailasset_data();
				};
				emailasset_script.src = 'https://marketolive.com/plugin/email_asset_data.js';
				emailasset_head.appendChild(emailasset_script);
			}
		}
	}
}
get_dashboard_config();

<?php get_header(); ?>

<?php if ( 'false' == et_get_option( 'nimble_blog_style', 'false' ) ){ ?>
	<?php if ( 'on' == et_get_option( 'nimble_display_services', 'on' ) || 'on' == et_get_option( 'nimble_display_quote', 'on' ) ){ ?>
		<div id="home-section-email" class="home-section">
			<div class="container">
				<div class="section-title-white" style='-moz-user-select: none; -webkit-user-select: none; -ms-user-select:none; user-select:none;' unselectable='on' onselectstart='return false;' onmousedown='return false;'>
					<h2><a id="mem" class="track-category">Drive More Awareness</a></h2>
				</div>
		<?php
			if ( 'on' == et_get_option( 'nimble_display_services', 'on' ) ){
				$blurbs_number = (int) apply_filters( 'et_blurbs_number', 3 );
				$paddingleft = array();
				$paddingleft[1] = 'padding-left:57px;';
				$paddingleft[2] = 'padding-left:57px;';
				$paddingleft[3] = 'padding-left:57px;';
				echo '<div id="mem-services" class="clearfix services" style="display: block;">';
					for ( $i = 1; $i <= $blurbs_number; $i++ ){
						$service_query = new WP_Query( apply_filters( 'et_service_query_args', 'page_id=' . get_pageId( html_entity_decode( et_get_option( 'nimble_home_page_' . $i ) ) ), $i ) );
						while ( $service_query->have_posts() ) : $service_query->the_post();
							global $more;
							$more = 0;
							$page_title = ( $blurb_custom_title = get_post_meta( get_the_ID(), 'Blurbtitle', true ) ) && '' != $blurb_custom_title ? $blurb_custom_title : get_the_title();
							$page_permalink = ( $blurb_custom_permalink = get_post_meta( get_the_ID(), 'Blurblink', true ) ) && '' != $blurb_custom_permalink ? $blurb_custom_permalink : get_permalink();
							echo '<a style="display:block;text-decoration:none;color:#636b66;' . $paddingleft[$i] . '" href="' . esc_url( $page_permalink ) . '" >';
							echo '<div class="service-white' . ( 1 == $i ? ' first' : '' ) . ( $blurbs_number == $i ? ' last' : '' ) . '">';
								if ( ( $page_icon = get_post_meta( get_the_ID(), 'Icon', true ) ) && '' != $page_icon )
									printf( '<img src="%1$s" alt="%2$s" class="et_page_icon" />', esc_attr( $page_icon ), esc_attr( $page_title ) );
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
		?>

		<?php
			if ( 'on' == et_get_option( 'nimble_display_quote', 'on' ) ){
				echo '<div id="quote">';
					if ( ( $quote_first_line = et_get_option( 'nimble_quote_first_line' ) ) && '' != $quote_first_line )
						echo '<h3>' . wp_kses_post( $quote_first_line ) . '</h3>';
					if ( ( $quote_second_line = et_get_option( 'nimble_quote_second_line' ) ) && '' != $quote_second_line )
						echo '<p>' . wp_kses_post( $quote_second_line ) . '</p>';
				echo '</div> <!-- end #quote -->';
			}
		?>
			</div> <!-- end .container -->
		</div> <!-- end #home-section-info -->
	<?php } ?>
	<?php if ( 'on' == et_get_option( 'nimble_display_fromblog_section', 'on' ) ){ ?>
		<div id="home-section-news" class="home-section">
			<div class="container">
				<div class="section-title">
					<h2><?php echo et_get_option( 'nimble_news_text', 'News &amp; Updates' ); ?></h2>
					<p class="section-subtitle"><?php echo esc_html( et_get_option( 'nimble_news_description_text', 'This Is a Description For The Homepage' ) ); ?></p>
				</div>

			<?php
				$i = 1;
				$blog_posts_per_row = (int) apply_filters( 'et_blog_posts_per_row', 3 );
			?>

				<div id="blog-posts" class="clearfix">
				<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
					<div class="blog-post<?php if ( $i % $blog_posts_per_row == 0 ) echo ' last'; ?>">
					<?php
						$thumb = '';
						$width = apply_filters( 'et_blog_image_width', 80 );
						$height = apply_filters( 'et_blog_image_height', 80 );
						$classtext = '';
						$titletext = get_the_title();
						$thumbnail = get_thumbnail( $width, $height, $classtext, $titletext, $titletext, false, 'Blogimage' );
						$thumb = $thumbnail["thumb"];

						if ( '' != $thumb ) {
							echo '<div class="blog-post-image">';
								echo '<a href="' . esc_url( get_permalink() ) . '">';
									print_thumbnail( $thumb, $thumbnail["use_timthumb"], $titletext, $width, $height, $classtext );
									echo '<span class="overlay"></span>';
								echo '</a>';
							echo '</div> <!-- end .blog-post-image -->';
						}
					?>

						<h3><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
					<?php
						printf ( __( '<p class="meta-info">Posted by <a href="%1$s">%2$s</a> on %3$s</p>', 'Nimble' ),
							esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ),
							get_the_author(),
							esc_html( get_the_time( et_get_option( 'nimble_date_format', 'M j, Y' ) ) )
						);
					?>
						<p><?php the_excerpt(); ?></p>
						<a href="<?php the_permalink(); ?>" class="learn-more"><?php esc_html_e( 'Teleport', 'Nimble' ); ?></a>
					</div> <!-- end .blog-post -->
			<?php
					$i++;
					endwhile;
				endif;
			?>
				</div> <!-- end #blog-posts -->
			<?php
				if ( ( $news_url = et_get_option( 'nimble_news_url' ) ) && '' != $news_url )
					echo '<a href="' . esc_url( $news_url ) . '" class="more-info">' . esc_html__( 'View More Blog Posts', 'Nimble' ) . '</a>';
			?>
			</div> <!-- end .container -->
		</div> <!-- end #home-section-news -->
	<?php } ?>
	<?php /* if ( 'on' == et_get_option( 'nimble_display_recentwork_section', 'on' ) ){ ?>
		<div id="home-section-engage" class="home-section">
			<div class="container">
				<div class="section-title-purple" style='-moz-user-select: none; -webkit-user-select: none; -ms-user-select:none; user-select:none;' unselectable='on' onselectstart='return false;' onmousedown='return false;'>
					<h2><a id="eyc">Engage Your Customers</a></h2>
				</div>
						<?php
			if ( 'on' == et_get_option( 'nimble_display_services', 'on' ) ){
				$blurbs_number = (int) apply_filters( 'et_blurbs_number', 3 );
				$paddingleft = array();
				$paddingleft[1] = 'padding-left:57px;';
				$paddingleft[2] = 'padding-left:57px;';
				$paddingleft[3] = 'padding-left:57px;';
				$pageid = array();
				for ($j = 1; $j < 2; $j++){
					if ($j == 1){
						$pageid[1] = 693; //Batch
						$pageid[2] = 41; //Nurture
						$pageid[3] = 268; //Webinar
						$i = 1;
					}
					echo '<div id="eyc-services" class="clearfix services" style="display: none;">';
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
								echo '<a style="display:block;text-decoration:none;color:#ffffff;' . $paddingleft[$i] . '" href="' . esc_url( $page_permalink ) . '" >';
								echo '<div class="service-purple' . ( 1 == $i ? ' first' : '' ) . ( $blurbs_number == $i ? ' last' : '' ) . '">';
									if ( ( $page_icon = get_post_meta( get_the_ID(), 'Icon', true ) ) && '' != $page_icon )
										printf( '<img src="%1$s" alt="%2$s" class="et_page_icon" />', esc_attr( $page_icon ), esc_attr( $page_title ) );
	
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
	<?php } */?>
	<?php if ( 'on' == et_get_option( 'nimble_display_recentwork_section', 'on' ) ){ ?>
		<div id="home-section-engage" class="home-section">
			<div class="container">
				<div class="section-title-purple" style='-moz-user-select: none; -webkit-user-select: none; -ms-user-select:none; user-select:none;' unselectable='on'onselectstart='return false;' onmousedown='return false;'>
					<h2><a id="eyc" class="track-category">Engage Your Customers<a></h2>
				</div>
						<?php
			if ( 'on' == et_get_option( 'nimble_display_services', 'on' ) ){
				$blurbs_number = (int) apply_filters( 'et_blurbs_number', 3 );
				$paddingleft = array();
				$paddingleft[1] = 'padding-left:57px;';
				$paddingleft[2] = 'padding-left:57px;';
				$paddingleft[3] = 'padding-left:57px;';
				$pageid = array();
				for ($j = 1; $j < 3; $j++){
					if ($j == 1){
						$pageid[1] = 37; //Automate
						$pageid[2] = 693; //Batch
						$pageid[3] = 695; //Drip
						$i = 1;
					}
					if ($j == 2){
						$pageid[1] = 41; //Nurture
						$pageid[2] = 268; //Webinar
						$pageid[3] = 1465; //Calendar
						$i = 1;
					}
					echo '<div id="eyc-services-'.($j-1).'" class="clearfix services" style="display: none;">';
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
								echo '<a style="display:block;text-decoration:none;color:#ffffff;' . $paddingleft[$i] . '" href="' . esc_url( $page_permalink ) . '" >';
								echo '<div class="service-purple' . ( 1 == $i ? ' first' : '' ) . ( $blurbs_number == $i ? ' last' : '' ) . '">';
									if ( ( $page_icon = get_post_meta( get_the_ID(), 'Icon', true ) ) && '' != $page_icon )
										printf( '<img src="%1$s" alt="%2$s" class="et_page_icon" />', esc_attr( $page_icon ), esc_attr( $page_title ) );
	
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
	<?php } ?>	
	<?php if ( 'on' == et_get_option( 'nimble_display_recentwork_section', 'on' ) ){ ?>
		<div id="home-section-align" class="home-section">
			<div class="container">
				<div class="section-title-white" style='-moz-user-select: none; -webkit-user-select: none; -ms-user-select:none; user-select:none;' unselectable='on' onselectstart='return false;' onmousedown='return false;'>
					<h2><a id="aws" class="track-category">Align With Sales</a></h2>
				</div>
						<?php
			if ( 'on' == et_get_option( 'nimble_display_services', 'on' ) ){
				$blurbs_number = (int) apply_filters( 'et_blurbs_number', 3 );
				$paddingleft = array();
				$paddingleft[1] = 'padding-left:57px;';
				$paddingleft[2] = 'padding-left:57px;';
				$paddingleft[3] = 'padding-left:57px;';
				$pageid = array();
				for ($j = 1; $j < 2; $j++){
					if ($j == 1){
						$pageid[1] = 39; //Executive Dashboards
						$pageid[2] = 156; //Content Analysis
						$pageid[3] = 1388; //webinar root page
						$i = 1;
					}
					echo '<div id="aws-services" class="clearfix services" style="display: none;">';
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
								echo '<a style="display:block;text-decoration:none;color:#636b66;' . $paddingleft[$i] . '" href="' . esc_url( $page_permalink ) . '" >';
								echo '<div class="service-white' . ( 1 == $i ? ' first' : '' ) . ( $blurbs_number == $i ? ' last' : '' ) . '">';
									if ( ( $page_icon = get_post_meta( get_the_ID(), 'Icon', true ) ) && '' != $page_icon )
										printf( '<img src="%1$s" alt="%2$s" class="et_page_icon" />', esc_attr( $page_icon ), esc_attr( $page_title ) );
	
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
	<?php } ?>	
	<?php if ( 'on' == et_get_option( 'nimble_display_recentwork_section', 'on' ) ){ ?>
		<div id="home-section-success" class="home-section">
			<div class="container">
				<div class="section-title-purple" style='-moz-user-select: none; -webkit-user-select: none; -ms-user-select:none; user-select:none;' unselectable='on' onselectstart='return false;' onmousedown='return false;'>
					<h2><a id="mys" class="track-category">Measure Your Success</a></h2>
				</div>
						<?php
			if ( 'on' == et_get_option( 'nimble_display_services', 'on' ) ){
				$blurbs_number = (int) apply_filters( 'et_blurbs_number', 3 );
				$paddingleft = array();
				$paddingleft[1] = 'padding-left:57px;';
				$paddingleft[2] = 'padding-left:57px;';
				$paddingleft[3] = 'padding-left:57px;';
				$pageid = array();
				for ($j = 1; $j < 2; $j++){
					if ($j == 1){
						$pageid[1] = 711; //Executive Dashboards
						$pageid[2] = 713; //Content Analysis
						$pageid[3] = 715; //webinar root page
						$i = 1;
					}
					echo '<div id="mys-services" class="clearfix services" style="display: none;">';
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
								echo '<a style="display:block;text-decoration:none;color:#ffffff;' . $paddingleft[$i] . '" href="' . esc_url( $page_permalink ) . '" >';
								echo '<div class="service-purple' . ( 1 == $i ? ' first' : '' ) . ( $blurbs_number == $i ? ' last' : '' ) . '">';
									if ( ( $page_icon = get_post_meta( get_the_ID(), 'Icon', true ) ) && '' != $page_icon )
										printf( '<img src="%1$s" alt="%2$s" class="et_page_icon" />', esc_attr( $page_icon ), esc_attr( $page_title ) );
	
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
	<?php } ?>
	<?php /* if ( 'on' == et_get_option( 'nimble_display_recentwork_section', 'on' ) ){ ?>
		<div id="home-section-plan" class="home-section">
			<div class="container">
				<div class="section-title-white" style='-moz-user-select: none; -webkit-user-select: none; -ms-user-select:none; user-select:none;' unselectable='on' onselectstart='return false;' onmousedown='return false;'>
					<h2><a id="pme">Plan More Effectively</a></h2>
				</div>
						<?php
			if ( 'on' == et_get_option( 'nimble_display_services', 'on' ) ){
				$blurbs_number = (int) apply_filters( 'et_blurbs_number', 3 );
				$paddingleft = array();
				$paddingleft[1] = 'padding-left:57px;';
				$paddingleft[2] = 'padding-left:57px;';
				$paddingleft[3] = 'padding-left:57px;';
				$pageid = array();
				for ($j = 1; $j < 2; $j++){
					if ($j == 1){
						$pageid[1] = 1447; //Unified
						$pageid[2] = 1449; //Specialized
						$pageid[3] = 1451; //Actionable
						$i = 1;
					}
					echo '<div id="pme-services" class="clearfix services" style="display: none;">';
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
								echo '<a style="display:block;text-decoration:none;color:#636b66;' . $paddingleft[$i] . '" href="' . esc_url( $page_permalink ) . '" >';
								echo '<div class="service-white' . ( 1 == $i ? ' first' : '' ) . ( $blurbs_number == $i ? ' last' : '' ) . '">';
									if ( ( $page_icon = get_post_meta( get_the_ID(), 'Icon', true ) ) && '' != $page_icon )
										printf( '<img src="%1$s" alt="%2$s" class="et_page_icon" />', esc_attr( $page_icon ), esc_attr( $page_title ) );
	
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
	<?php } */?>
	<?php /*if ( 'on' == et_get_option( 'nimble_display_recentwork_section', 'on' ) ){ ?>
		<div id="home-section-join" class="home-section">
			<div class="container">
				<div class="section-title-purple" style='-moz-user-select: none; -webkit-user-select: none; -ms-user-select:none; user-select:none;' unselectable='on' onselectstart='return false;' onmousedown='return false;'>
					<h2><a id="jtn">Join The Nation</a></h2>
				</div>
						<?php
			if ( 'on' == et_get_option( 'nimble_display_services', 'on' ) ){
				$blurbs_number = (int) apply_filters( 'et_blurbs_number', 3 );
				$paddingleft = array();
				$paddingleft[1] = 'padding-left:57px;';
				$paddingleft[2] = 'padding-left:51px;';
				$paddingleft[3] = 'padding-left:57px;';
				$pageid = array();
				for ($j = 1; $j < 2; $j++){
					if ($j == 1){
						$pageid[1] = 1453; //Marketing First
						$pageid[2] = 1455; //Launchpoint Ecosystem
						$pageid[3] = 1457; //Passionate Community
						$i = 1;
					}
					echo '<div id="jtn-services" class="clearfix services" style="display: none;">';
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
								echo '<a style="display:block;text-decoration:none;color:#ffffff;' . $paddingleft[$i] . '" href="' . esc_url( $page_permalink ) . '" >';
								echo '<div class="service-purple' . ( 1 == $i ? ' first' : '' ) . ( $blurbs_number == $i ? ' last' : '' ) . '">';
									if ( ( $page_icon = get_post_meta( get_the_ID(), 'Icon', true ) ) && '' != $page_icon )
										printf( '<img src="%1$s" alt="%2$s" class="et_page_icon" />', esc_attr( $page_icon ), esc_attr( $page_title ) );
	
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
	<?php } */?>	
	<?php /*if ( 'on' == et_get_option( 'nimble_display_recentwork_section', 'on' ) ){ ?>
		<div id="home-section-channels" class="home-section">
			<div class="container">
				<div class="section-title-purple" style='-moz-user-select: none; -webkit-user-select: none; -ms-user-select:none; user-select:none;' unselectable='on'onselectstart='return false;' onmousedown='return false;'>
					<h2><a id="emc">Explore More Channels<a></h2>
				</div>
						<?php
			if ( 'on' == et_get_option( 'nimble_display_services', 'on' ) ){
				$blurbs_number = (int) apply_filters( 'et_blurbs_number', 3 );
				$paddingleft = array();
				$paddingleft[1] = 'padding-left:57px;';
				$paddingleft[2] = 'padding-left:57px;';
				$paddingleft[3] = 'padding-left:57px;';
				$pageid = array();
				for ($j = 1; $j < 3; $j++){
					if ($j == 1){
						$pageid[1] = 264; //Video
						$pageid[2] = 266; //SMS
						$pageid[3] = 703; //Social 
						$i = 1;
					}
					if ($j == 2){
						$pageid[1] = 156; //Sales Alert 
						$pageid[2] = 362; //Polls
						$pageid[3] = 161; //Blog 
						$i = 1;
					}
					echo '<div id="emc-services-'.($j-1).'" class="clearfix services" style="display: none;">';
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
								echo '<a style="display:block;text-decoration:none;color:#ffffff;' . $paddingleft[$i] . '" href="' . esc_url( $page_permalink ) . '" >';
								echo '<div class="service-purple' . ( 1 == $i ? ' first' : '' ) . ( $blurbs_number == $i ? ' last' : '' ) . '">';
									if ( ( $page_icon = get_post_meta( get_the_ID(), 'Icon', true ) ) && '' != $page_icon )
										printf( '<img src="%1$s" alt="%2$s" class="et_page_icon" />', esc_attr( $page_icon ), esc_attr( $page_title ) );
	
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
	<?php } */?>

	<?php if ( 'on' == et_get_option( 'nimble_display_pricing', 'on' ) ){ ?>
		<div id="home-section-pricing" class="home-section">
			<div class="container">
				<div class="section-title">
					<h2><?php echo et_get_option( 'nimble_plans_text', 'Plans <span>&amp;</span> Pricing' ); ?></h2>
					<p class="section-subtitle"><?php echo esc_html( et_get_option( 'nimble_plans_description_text', 'Plans &amp; Pricing section description' ) ); ?></p>
				</div>
			<?php
				$pricing_query = new WP_Query( apply_filters( 'et_pricing_query_args', 'page_id=' . get_pageId( html_entity_decode( et_get_option( 'nimble_home_page_pricing' ) ) ) ) );
				if ( $pricing_query->have_posts() ) :
					while ( $pricing_query->have_posts() ) : $pricing_query->the_post();
						$pricing_page_url = ( $custom_pricing_url = get_post_meta( get_the_ID(), 'Homelink' , true ) ) && '' != $custom_pricing_url ? $custom_pricing_url : get_permalink();

						if ( has_excerpt() ) the_excerpt();
						else the_content( '' );

						echo '<a href="' . esc_url( $pricing_page_url ) . '" class="more-info">' . esc_html__( 'View Plans and Pricing', 'Nimble' ) . '</a>';
					endwhile;
				endif;
			?>
			</div> <!-- end .container -->
		</div> <!-- end #home-section-pricing -->
	<?php } ?>
<?php } else { ?>
	<div id="main-area">
		<div class="container">
			<div id="content-area" class="clearfix">
				<div id="left-area">
					<?php get_template_part( 'includes/entry', 'index' ); ?>
				</div> <!-- end #left-area -->
				<?php get_sidebar(); ?>
			</div> <!-- end #content-area -->
		</div> <!-- end .container -->
	</div> <!-- end #main-area -->
<?php } ?>

<?php get_footer(); ?>
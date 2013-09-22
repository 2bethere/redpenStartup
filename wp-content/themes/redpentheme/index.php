<?php
/**
 * The main template file.
 *
 * This is the most generic template file in a WordPress theme and one of the
 * two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * For example, it puts together the home page when no home.php file exists.
 *
 * Learn more: http://codex.wordpress.org/Template_Hierarchy
 *
 * @package WordPress
 * @subpackage Twenty_Thirteen
 * @since Twenty Thirteen 1.0
 */
wp_enqueue_script('jquery-ui-core');
wp_enqueue_script('jquery-ui-dialog');

wp_enqueue_style('jquery-style-dialog'); 
wp_enqueue_style('jquery-style-ui', 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.1/themes/smoothness/jquery-ui.css'); 

get_header(); ?>

	<div id="primary" class="content-area">
		<div id="content" class="site-content" role="main">
		<div id="titlebanner"></div>
		<div id="homeeditor">
		    <div id="homeeditleft">
			<div id="homeeditorarea">
			<form id="homeeditform" action="wp-admin/post-new.php" method="post">
			<div id="homeintro">
			Submit posts for editing
			</div>
			<textarea name="content" id="hometexteditor"></textarea>
			<div id="homewordcount">wordcount</div>
			<div id="homepublish">
			    <span class="spinner"></span>
			    <input id="original_publish" type="hidden" value="Publish" name="original_publish"></input>

			    <input id="publishpub" class="button button-primary button-large" type="submit" accesskey="p" value="Submit to public forum" name="publishpub"></input>
			    <input id="publishexp" class="button button-primary button-large" type="submit" accesskey="p" value="Work with an expert" name="publishexp"></input>
			    </form>
			</div>
			</div>
		    </div>
		    <div id="homeeditright">
		    Why work with an expert 
		    <ul>
		    <li>Set deadlines and get your work edited faster</li>
		    <li>Work with a highly rated editor</li>
		    <li>No limit on document length</li>
		    </ul>
		    </div>
		</div>
		<!-----------below is the tab area ---------->
		<div id="homefeedtitle">Edit post from other members</div>
		<div id="hometabcontainer">
		    <div id="hometabtitle">
			<div id="hometabrecent" class="hometabbutton">Recent</div>
			<div id="hometabtrending" class="hometabbutton">Trending</div>
			<div id="hometabyourfeed" class="hometabbutton">Your feed</div>
		    </div>
		    <div id="hometabcontent">
		    	<?php if ( have_posts() ) : ?>

			<?php /* The loop */ ?>
			<?php while ( have_posts() ) : the_post(); ?>
				<?php
				get_template_part( 'content-home', get_post_format() ); ?>
			<?php endwhile; ?>

			<?php twentythirteen_paging_nav(); ?>
			<?php else : ?>
			    <?php get_template_part( 'content-home', 'none' ); ?>
			<?php endif; ?>


		    </div>
		</div>
			<!-- #scripts for home page -->
		<script>
		<?php if ( !is_user_logged_in() ) : ?>
		    $( "#homeeditform" ).submit(function( event ) {
			  $( "#dialog-confirm" ).dialog({
			      resizable: false,
			      dragable:false,
			      modal: false
			    });
			    //$(".ui-dialog-titlebar").hide();
			    //alert(    $( "#dialog-confirm" ).dialog("option","height"));
			  event.preventDefault();
			    
			  });

		<?php endif; ?>
		</script>
		</div><!-- #content -->
	</div><!-- #primary -->
<div id="dialog-confirm">
You need to login to do that
</div>

<?php get_sidebar(); ?>
<?php get_footer(); ?>

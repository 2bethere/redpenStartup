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
			<textarea id="content fixed">
			</textarea>
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
		<?php
if ( is_user_logged_in() ) {
    echo 'Welcome, registered user!';
} else {
    echo 'Welcome, visitor!';
}
?>
		<?php if ( have_posts() ) : ?>

			<?php /* The loop */ ?>
			<?php while ( have_posts() ) : the_post(); ?>
				<?php get_template_part( 'content', get_post_format() ); ?>
			<?php endwhile; ?>

			<?php twentythirteen_paging_nav(); ?>

		<?php else : ?>
			<?php get_template_part( 'content', 'none' ); ?>
		<?php endif; ?>

<div id="dialog-confirm" title="Empty the recycle bin?">
  <p><span class="ui-icon ui-icon-alert" style="float: left; margin: 0 7px 20px 0;"></span>These items will be permanently deleted and cannot be recovered. Are you sure?</p>
</div>
		<!-- #scripts for home page -->
		<script>
		<?php if ( !is_user_logged_in() ) : ?>
		    $( "#homeeditform" ).submit(function( event ) {
			  event.preventDefault();
    $( "#dialog-confirm" ).dialog({
      resizable: false,
      height:140,
      modal: true,
      buttons: {
        "Delete all items": function() {
          $( this ).dialog( "close" );
        },
        Cancel: function() {
          $( this ).dialog( "close" );
        }
      }
  });    
	    });
		<?php endif; ?>
		
		</script>
		</div><!-- #content -->
	</div><!-- #primary -->

<?php get_sidebar(); ?>
<?php get_footer(); ?>

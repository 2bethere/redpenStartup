<?php
/**
 * The Template for displaying all single posts.
 *
 * @package WordPress
 * @subpackage Twenty_Thirteen
 * @since Twenty Thirteen 1.0
 */

get_header(); ?>

	<div id="primary" class="content-area">
		<div id="content" class="site-content" role="main">
		<div id="reviewbox">
		<?php /* The loop */ ?>
		<?php while ( have_posts() ) : the_post(); ?>
		<div id="reviewleftcol">
		
				<?php get_template_part( 'content', get_post_format() ); ?>
				<?php //twentythirteen_post_nav(); ?>
			    <div>
			    <!--
			    <h2>Edit</h2>
			    <p class="edit"></p>
			    <textarea class="update"></textarea>
			    <input id="goedit" type="submit" value="Edit" />
			    <input id="godone" type="submit" value="Done" />
			    -->
			    </div>
		</div>
		<div id="reviewrightcol">
		<h3 id="editorcomments">Editor comments:</h3>
		        <?php comments_template(); ?>
		</div>
			<?php endwhile; ?>
		</div><!--reviewbox-->
		</div><!-- #content -->
	</div><!-- #primary -->

<?php get_sidebar(); ?>
<?php get_footer(); ?>

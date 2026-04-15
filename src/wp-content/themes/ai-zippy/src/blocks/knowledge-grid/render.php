<?php
$posts_per_page = $attributes['postsPerPage'] ?? 3;
$category       = $attributes['category'] ?? 0;

$args = array(
	'post_type'      => 'post',
	'posts_per_page' => $posts_per_page,
	'post_status'    => 'publish',
);

if ( $category > 0 ) {
	$args['cat'] = $category;
}

$query = new WP_Query( $args );

$wrapper_attributes = get_block_wrapper_attributes( [
	'class' => 'knowledge-grid section',
] );
?>

<div <?php echo $wrapper_attributes; ?>>
	<div class="section-inner">
		<div class="knowledge-grid-header">
			<div class="section-label">TCM Wisdom</div>
			<h2 class="section-title">Knowledge Base</h2>
		</div>

		<div class="posts-grid">
			<?php if ( $query->have_posts() ) : ?>
				<?php while ( $query->have_posts() ) : $query->the_post(); ?>
					<article class="post-card">
						<a href="<?php the_permalink(); ?>" class="post-card-img">
							<?php if ( has_post_thumbnail() ) : ?>
								<?php the_post_thumbnail( 'large' ); ?>
							<?php else : ?>
								<img src="https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?w=600&q=70" alt="Post placeholder">
							<?php endif; ?>
							<span class="post-date"><?php echo get_the_date( 'M d, Y' ); ?></span>
						</a>
						<div class="post-card-body">
							<h3><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
							<p><?php echo wp_trim_words( get_the_excerpt(), 15 ); ?></p>
							<a href="<?php the_permalink(); ?>" class="read-more">Read Wisdom →</a>
						</div>
					</article>
				<?php endwhile; wp_reset_postdata(); ?>
			<?php else : ?>
				<p>No posts found.</p>
			<?php endif; ?>
		</div>
	</div>
</div>

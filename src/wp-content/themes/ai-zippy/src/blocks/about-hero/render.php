<?php
$title    = $attributes['title'] ?? '';
$subtitle = $attributes['subtitle'] ?? '';
$image    = $attributes['imageUrl'] ?? '';

$wrapper_attributes = get_block_wrapper_attributes( [
	'class' => 'about-hero',
    'style' => $image ? "background-image: linear-gradient(to bottom, rgba(28, 20, 16, 0.4), rgba(28, 20, 16, 0.8)), url('{$image}')" : ''
] );
?>

<section <?php echo $wrapper_attributes; ?>>
	<div class="about-hero-content">
		<?php if ( $title ) : ?>
			<h1><?php echo esc_html( $title ); ?></h1>
		<?php endif; ?>
		
		<?php if ( $subtitle ) : ?>
			<p><?php echo esc_html( $subtitle ); ?></p>
		<?php endif; ?>
        
        <div class="hero-scroll-indicator">
            <span class="mouse"></span>
            <span class="label">Our Story</span>
        </div>
	</div>
</section>

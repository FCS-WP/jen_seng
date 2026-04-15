<?php
$label       = $attributes['label'] ?? '';
$title       = $attributes['title'] ?? '';
$description = $attributes['description'] ?? '';

$wrapper_attributes = get_block_wrapper_attributes( [
	'class' => 'contact-hero',
] );
?>

<section <?php echo $wrapper_attributes; ?>>
	<div class="contact-hero-inner">
		<?php if ( $label ) : ?>
			<div class="section-label"><?php echo esc_html( $label ); ?></div>
		<?php endif; ?>
		
		<?php if ( $title ) : ?>
			<h1><?php echo esc_html( $title ); ?></h1>
		<?php endif; ?>
		
		<?php if ( $description ) : ?>
			<p><?php echo esc_html( $description ); ?></p>
		<?php endif; ?>
	</div>
</section>

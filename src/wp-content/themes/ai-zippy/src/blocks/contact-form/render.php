<?php
$title    = $attributes['title'] ?? '';
$subtitle = $attributes['subtitle'] ?? '';
$shortcode = $attributes['formShortcode'] ?? '';

$wrapper_attributes = get_block_wrapper_attributes( [
	'class' => 'contact-form-section',
] );
?>

<div <?php echo $wrapper_attributes; ?>>
	<div class="form-section">
		<?php if ( $title ) : ?>
			<h2><?php echo esc_html( $title ); ?></h2>
		<?php endif; ?>
		
		<?php if ( $subtitle ) : ?>
			<p class="form-sub"><?php echo esc_html( $subtitle ); ?></p>
		<?php endif; ?>

		<?php if ( $shortcode ) : ?>
			<div class="form-plugin-wrap">
				<?php echo do_shortcode( $shortcode ); ?>
			</div>
		<?php else : ?>
			<div class="form-grid">
				<div class="form-group">
					<label>Your Name *</label>
					<input type="text" placeholder="e.g. Tan Wei Ming">
				</div>
				<div class="form-group">
					<label>Email Address *</label>
					<input type="email" placeholder="e.g. weiming@email.com">
				</div>
				<div class="form-group full">
					<label>Subject</label>
					<input type="text" placeholder="e.g. Enquiry about confinement packages">
				</div>
				<div class="form-group full">
					<label>Message *</label>
					<textarea placeholder="Tell us how we can help you…"></textarea>
				</div>
				<div class="form-footer">
					<p class="form-privacy">🔒 Your information is kept private and used only to respond to your enquiry.</p>
					<button class="btn-primary">Send Message →</button>
				</div>
			</div>
		<?php endif; ?>
	</div>
</div>

<?php
$title       = $attributes['title'] ?? '';
$description = $attributes['description'] ?? '';
$phone       = $attributes['phoneNumber'] ?? '';

$wrapper_attributes = get_block_wrapper_attributes( [
	'class' => 'whatsapp-banner-section',
] );

$wa_link = $phone ? 'https://wa.me/' . preg_replace('/[^0-9]/', '', $phone) : '#';
?>

<div <?php echo $wrapper_attributes; ?>>
	<div class="wa-banner">
		<div class="wa-banner-icon">💬</div>
		<div class="wa-banner-text">
			<?php if ( $title ) : ?>
				<h3><?php echo esc_html( $title ); ?></h3>
			<?php endif; ?>
			<?php if ( $description ) : ?>
				<p><?php echo esc_html( $description ); ?></p>
			<?php endif; ?>
		</div>
		<a href="<?php echo esc_url( $wa_link ); ?>" target="_blank" class="btn-wa">
			💬 Chat on WhatsApp
		</a>
	</div>
</div>

<?php
$address = $attributes['address'] ?? '';
$hours   = $attributes['hours'] ?? '';
$email   = $attributes['email'] ?? '';
$phone   = $attributes['phone'] ?? '';
$map_img = $attributes['mapImageUrl'] ?? '';

$wrapper_attributes = get_block_wrapper_attributes( [
	'class' => 'contact-info-map section',
] );
?>

<section <?php echo $wrapper_attributes; ?>>
	<div class="contact-info-map-inner">
		<div class="contact-top-grid">
			<div class="contact-info-card">
				<div class="contact-info-card-header">
					Contact Information
					<span>Visit us or send us a message</span>
				</div>
				<div class="contact-info-body">
					<div class="contact-detail">
						<div class="c-icon">📍</div>
						<div>
							<h4>Store Address</h4>
							<p><?php echo nl2br( esc_html( $address ) ); ?></p>
						</div>
					</div>
					<div class="contact-divider"></div>
					<div class="contact-detail">
						<div class="c-icon">🕐</div>
						<div>
							<h4>Opening Hours</h4>
							<p><?php echo nl2br( esc_html( $hours ) ); ?></p>
						</div>
					</div>
					<div class="contact-divider"></div>
					<div class="contact-detail">
						<div class="c-icon">✉️</div>
						<div>
							<h4>Email & Phone</h4>
							<p><?php echo esc_html( $email ); ?><br><?php echo esc_html( $phone ); ?></p>
						</div>
					</div>
					<div class="contact-divider"></div>
					<a href="https://maps.google.com" target="_blank" class="btn-primary btn-full">
						📍 Get Directions
					</a>
				</div>
			</div>

			<div class="map-container">
				<?php if ( $map_img ) : ?>
					<img src="<?php echo esc_url( $map_img ); ?>" alt="Map location">
				<?php endif; ?>
				<div class="map-pin-overlay">
					<div class="map-pin"><div class="map-pin-inner">📍</div></div>
					<div class="map-label">
						Jen Seng Medical Hall
						<span><?php echo esc_html( str_replace("\n", " ", $address) ); ?></span>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

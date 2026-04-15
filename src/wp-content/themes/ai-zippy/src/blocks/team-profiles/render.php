<?php
$members = $attributes['members'] ?? [];

$wrapper_attributes = get_block_wrapper_attributes( [
	'class' => 'team-profiles section',
] );
?>

<section <?php echo $wrapper_attributes; ?>>
	<div class="section-inner">
		<div class="text-center">
			<div class="section-label">Our Heart</div>
			<h2 class="section-title">The Faces Behind Jen Seng</h2>
		</div>

		<div class="team-grid">
			<?php foreach ( $members as $member ) : ?>
				<div class="team-card">
					<div class="team-img">
						<?php if ( $member['imageUrl'] ) : ?>
							<img src="<?php echo esc_url( $member['imageUrl'] ); ?>" alt="<?php echo esc_attr( $member['name'] ); ?>">
						<?php else : ?>
							<div class="img-placeholder"></div>
						<?php endif; ?>
					</div>
					<div class="team-info">
						<h3><?php echo esc_html( $member['name'] ); ?></h3>
						<span class="role"><?php echo esc_html( $member['role'] ); ?></span>
						<p><?php echo esc_html( $member['bio'] ); ?></p>
					</div>
				</div>
			<?php endforeach; ?>
		</div>
	</div>
</section>

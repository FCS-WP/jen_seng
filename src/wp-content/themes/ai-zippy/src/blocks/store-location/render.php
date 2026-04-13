<?php
$map_image = $attributes['mapImage'] ?? '';
$label = $attributes['label'] ?? '';
$title = $attributes['title'] ?? '';
$address = $attributes['address'] ?? '';
$hours = $attributes['hours'] ?? '';
$email = $attributes['email'] ?? '';
$dir_text = $attributes['dirText'] ?? '';
$dir_url = $attributes['dirUrl'] ?? '#';
$contact_text = $attributes['contactText'] ?? '';
$contact_url = $attributes['contactUrl'] ?? '#';

$wrapper_attributes = get_block_wrapper_attributes(['class' => 'location-section']);
?>
<section <?php echo $wrapper_attributes; ?>>
    <div class="location-grid">
        <div class="location-map">
            <?php if ($map_image) : ?><img src="<?php echo esc_url($map_image); ?>" alt="Serangoon Central"><?php endif; ?>
            <div class="location-map-overlay"></div>
        </div>
        <div class="location-info">
            <?php if ($label) : ?><div class="section-label"><?php echo esc_html($label); ?></div><?php endif; ?>
            <?php if ($title) : ?><h2 class="section-title"><?php echo wp_kses_post($title); ?></h2><?php endif; ?>
            
            <div class="location-detail">
                <span class="loc-icon">📍</span>
                <p><strong>Address</strong><?php echo esc_html($address); ?></p>
            </div>
            <div class="location-detail">
                <span class="loc-icon">🕐</span>
                <p><strong>Opening Hours</strong><?php echo esc_html($hours); ?></p>
            </div>
            <div class="location-detail">
                <span class="loc-icon">✉️</span>
                <p><strong>Email</strong><?php echo esc_html($email); ?></p>
            </div>

            <div class="location-ctas">
                <?php if ($dir_text) : ?>
                    <a href="<?php echo esc_url($dir_url); ?>" class="btn-yellow"><?php echo esc_html($dir_text); ?></a>
                <?php endif; ?>
                <?php if ($contact_text) : ?>
                    <a href="<?php echo esc_url($contact_url); ?>" class="btn-outline-white"><?php echo esc_html($contact_text); ?></a>
                <?php endif; ?>
            </div>
        </div>
    </div>
</section>

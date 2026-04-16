<?php
$map_image = $attributes['mapImage'] ?? '';
$map_embed = $attributes['mapEmbed'] ?? '';
$label = $attributes['label'] ?? '';
$title = $attributes['title'] ?? '';
$address = $attributes['address'] ?? '';
$hours = $attributes['hours'] ?? '';
$dir_text = $attributes['dirText'] ?? '';
$dir_url = $attributes['dirUrl'] ?? '#';
$address_icon = $attributes['addressIconUrl'] ?? '';
$hours_icon = $attributes['hoursIconUrl'] ?? '';
$section_bg = $attributes['sectionBackgroundColor'] ?? '';

$style = '';
if ($section_bg) {
    $style .= "background-color: $section_bg;";
}

$wrapper_attributes = get_block_wrapper_attributes([
    'class' => 'location-section',
    'style' => $style
]);
?>
<section <?php echo $wrapper_attributes; ?>>
    <div class="location-container">
        <div class="location-grid">
            <div class="location-map">
                <div class="map-frame">
                    <?php if ($map_embed) : ?>
                        <div class="map-embed-container">
                            <?php echo $map_embed; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped 
                            ?>
                        </div>
                    <?php elseif ($map_image) : ?>
                        <img src="<?php echo esc_url($map_image); ?>" alt="<?php echo esc_attr($title); ?>">
                    <?php endif; ?>
                </div>
            </div>
            <div class="location-info">
                <?php if ($label) : ?><div class="section-label"><?php echo esc_html($label); ?></div><?php endif; ?>
                <?php if ($title) : ?><h2 class="section-title"><?php echo wp_kses_post($title); ?></h2><?php endif; ?>

                <div class="details-list">
                    <div class="location-detail">
                        <div class="loc-icon">
                            <?php if ($address_icon) : ?>
                                <img src="<?php echo esc_url($address_icon); ?>" alt="">
                            <?php else : ?>
                                📍
                            <?php endif; ?>
                        </div>
                        <p><?php echo esc_html($address); ?></p>
                    </div>
                    <div class="location-detail">
                        <div class="loc-icon">
                            <?php if ($hours_icon) : ?>
                                <img src="<?php echo esc_url($hours_icon); ?>" alt="">
                            <?php else : ?>
                                🕐
                            <?php endif; ?>
                        </div>
                        <p><?php echo esc_html($hours); ?></p>
                    </div>
                </div>

                <div class="location-ctas">
                    <?php if ($dir_text) : ?>
                        <a href="<?php echo esc_url($dir_url); ?>" class="btn-primary">
                            <span><?php echo esc_html($dir_text); ?></span>
                            <span class="arrow">→</span>
                        </a>
                    <?php endif; ?>
                </div>
            </div>
        </div>
    </div>
</section>
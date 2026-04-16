<?php
$usps = $attributes['usps'] ?? [];
$label = $attributes['label'] ?? '';
$title = $attributes['title'] ?? '';
$sectionBg = $attributes['sectionBackgroundColor'] ?? '';
$cardBg = $attributes['cardBackgroundColor'] ?? '';

$style = '';
if ($sectionBg) {
    $style .= "background-color: $sectionBg;";
}

$wrapper_attributes = get_block_wrapper_attributes([
    'class' => 'usp-section',
    'style' => $style
]);

$card_style = '';
if ($cardBg) {
    $card_style = "style=\"background-color: $cardBg;\"";
}
?>
<section <?php echo $wrapper_attributes; ?>>
    <div class="section-inner">
        <div class="text-center">
            <?php if ($label) : ?><div class="section-label"><?php echo esc_html($label); ?></div><?php endif; ?>
            <?php if ($title) : ?><h2 class="section-title"><?php echo wp_kses_post($title); ?></h2><?php endif; ?>
        </div>
        <div class="usp-grid">
            <?php foreach ($usps as $usp) : ?>
                <div class="usp-card" <?php echo $card_style; ?>>
                    <div class="usp-icon">
                        <?php if (!empty($usp['iconUrl'])) : ?>
                            <img src="<?php echo esc_url($usp['iconUrl']); ?>" alt="<?php echo esc_attr($usp['title']); ?>">
                        <?php endif; ?>
                    </div>
                    <h3><?php echo esc_html($usp['title']); ?></h3>
                    <p><?php echo esc_html($usp['desc']); ?></p>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>
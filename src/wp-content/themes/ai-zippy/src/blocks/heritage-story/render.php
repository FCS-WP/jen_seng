<?php
$image = $attributes['image'] ?? '';
$year = $attributes['badgeYear'] ?? '';
$label = $attributes['label'] ?? '';
$title = $attributes['title'] ?? '';
$content = $attributes['content'] ?? '';
$quote = $attributes['quote'] ?? '';
$cta_text = $attributes['ctaText'] ?? '';
$cta_url = $attributes['ctaUrl'] ?? '#';
$bg_color = $attributes['backgroundColor'] ?? '';

$style = '';
if ($bg_color) {
    $style .= "background-color: $bg_color;";
}

$wrapper_attributes = get_block_wrapper_attributes([
    'class' => 'story-section',
    'style' => $style
]);
?>
<section <?php echo $wrapper_attributes; ?>>
    <div class="section-inner">
        <div class="story-grid">
            <div class="story-img">
                <?php if ($image) : ?><img src="<?php echo esc_url($image); ?>" alt="<?php echo esc_attr($title); ?>"><?php endif; ?>
            </div>
            <div class="story-text">
                <?php if ($label) : ?><div class="section-label"><?php echo esc_html($label); ?></div><?php endif; ?>
                <?php if ($title) : ?><h2 class="section-title"><?php echo esc_html($title); ?></h2><?php endif; ?>
                <?php if ($content) : ?><p class="section-sub"><?php echo esc_html($content); ?></p><?php endif; ?>

                <?php if ($cta_text) : ?>
                    <div class="story-cta">
                        <a href="<?php echo esc_url($cta_url); ?>" class="btn-primary"><?php echo esc_html($cta_text); ?></a>
                    </div>
                <?php endif; ?>
            </div>
        </div>
    </div>
</section>
<?php
$usps = $attributes['usps'] ?? [];
$label = $attributes['label'] ?? '';
$title = $attributes['title'] ?? '';

$wrapper_attributes = get_block_wrapper_attributes(['class' => 'usp-section']);
?>
<section <?php echo $wrapper_attributes; ?>>
    <div class="section-inner">
        <div class="text-center">
            <?php if ($label) : ?><div class="section-label"><?php echo esc_html($label); ?></div><?php endif; ?>
            <?php if ($title) : ?><h2 class="section-title"><?php echo wp_kses_post($title); ?></h2><?php endif; ?>
        </div>
        <div class="usp-grid">
            <?php foreach ($usps as $usp) : ?>
                <div class="usp-card">
                    <div class="usp-icon"><?php echo esc_html($usp['icon']); ?></div>
                    <h3><?php echo esc_html($usp['title']); ?></h3>
                    <p><?php echo esc_html($usp['desc']); ?></p>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

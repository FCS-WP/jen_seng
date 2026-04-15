<?php
$items = $attributes['items'] ?? [];
$wrapper_attributes = get_block_wrapper_attributes(['class' => 'trust-strip']);
?>
<div <?php echo $wrapper_attributes; ?>>
    <div class="trust-strip-inner">
        <?php foreach ($items as $item) : ?>
            <div class="trust-item">
                <div class="trust-icon"><?php echo esc_html($item['icon']); ?></div>
                <div class="trust-text">
                    <strong><?php echo esc_html($item['title']); ?></strong>
                    <span><?php echo esc_html($item['sub']); ?></span>
                </div>
            </div>
        <?php endforeach; ?>
    </div>
</div>

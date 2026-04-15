<?php
$items = $attributes['items'] ?? [];
$background_color = $attributes['backgroundColor'] ?? '#f5f0e8';
$wrapper_attributes = get_block_wrapper_attributes([
    'class' => 'trust-strip',
    'style' => 'background-color: ' . esc_attr($background_color) . ';'
]);
?>
<div <?php echo $wrapper_attributes; ?>>
    <div class="trust-strip-inner">
        <?php foreach ($items as $item) : ?>
            <div class="trust-item">
                <div class="trust-icon">
                    <?php if (!empty($item['imgUrl'])) : ?>
                        <img src="<?php echo esc_url($item['imgUrl']); ?>" alt="<?php echo esc_attr($item['title']); ?>">
                    <?php endif; ?>
                </div>
                <div class="trust-text">
                    <strong><?php echo esc_html($item['title']); ?></strong>
                    <span><?php echo esc_html($item['sub']); ?></span>
                </div>
            </div>
        <?php endforeach; ?>
    </div>
</div>

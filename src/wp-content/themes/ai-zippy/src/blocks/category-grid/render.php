<?php
$categories = $attributes['categories'] ?? [];
$label = $attributes['label'] ?? '';
$title = $attributes['title'] ?? '';
$subtitle = $attributes['subtitle'] ?? '';
$background_color = $attributes['backgroundColor'] ?? '#FFFDF8';

$wrapper_attributes = get_block_wrapper_attributes([
    'class' => 'category-grid-section',
    'style' => 'background-color: ' . esc_attr($background_color) . ';'
]);
?>
<section <?php echo $wrapper_attributes; ?>>
    <div class="section-inner">
        <div class="text-center">
            <?php if ($label) : ?><div class="section-label"><?php echo esc_html($label); ?></div><?php endif; ?>
            <?php if ($title) : ?><h2 class="section-title"><?php echo wp_kses_post($title); ?></h2><?php endif; ?>
            <?php if ($subtitle) : ?><p class="section-sub"><?php echo esc_html($subtitle); ?></p><?php endif; ?>
        </div>
        <div class="offer-grid">
            <?php foreach ($categories as $cat) : ?>
                <a href="<?php echo esc_url($cat['link']); ?>" class="offer-card">
                    <div class="offer-card-img">
                        <?php if (!empty($cat['imgUrl'])) : ?>
                            <img src="<?php echo esc_url($cat['imgUrl']); ?>" alt="<?php echo esc_attr($cat['title']); ?>" loading="lazy">
                        <?php endif; ?>
                    </div>
                    <div class="offer-card-body">
                        <h3><?php echo esc_html($cat['title']); ?></h3>
                        <p><?php echo esc_html($cat['subtitle']); ?></p>
                        <div class="offer-card-arrow">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                        </div>
                    </div>
                </a>
            <?php endforeach; ?>
        </div>
    </div>
</section>

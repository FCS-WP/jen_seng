<?php
$categories = $attributes['categories'] ?? [];
$label = $attributes['label'] ?? '';
$title = $attributes['title'] ?? '';
$subtitle = $attributes['subtitle'] ?? '';

$wrapper_attributes = get_block_wrapper_attributes(['class' => 'category-grid-section']);
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
                        <img src="<?php echo esc_url($cat['img']); ?>" alt="<?php echo esc_attr($cat['title']); ?>" loading="lazy">
                        <?php if (!empty($cat['tag'])) : ?><span class="offer-card-tag"><?php echo esc_html($cat['tag']); ?></span><?php endif; ?>
                    </div>
                    <div class="offer-card-body">
                        <h3><?php echo esc_html($cat['title']); ?></h3>
                        <p><?php echo esc_html($cat['desc']); ?></p>
                        <div class="offer-card-link">Shop Now</div>
                    </div>
                </a>
            <?php endforeach; ?>
        </div>
    </div>
</section>

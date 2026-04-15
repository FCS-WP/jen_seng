<?php
/**
 * Server-side render for Home Hero block.
 */

$eyebrow           = $attributes['eyebrow'] ?? '';
$title             = $attributes['title'] ?? '';
$subtitle          = $attributes['subtitle'] ?? '';
$primary_btn_text  = $attributes['primaryBtnText'] ?? '';
$primary_btn_url   = $attributes['primaryBtnUrl'] ?? '#';
$secondary_btn_text = $attributes['secondaryBtnText'] ?? '';
$secondary_btn_url  = $attributes['secondaryBtnUrl'] ?? '#';
$trust_items       = $attributes['trustItems'] ?? [];
$media_url         = $attributes['mediaUrl'] ?? '';
$bg_media_url      = $attributes['bgMediaUrl'] ?? '';
$badge_title       = $attributes['badgeTitle'] ?? '';
$badge_text        = $attributes['badgeText'] ?? '';

$style = '';
if ($bg_media_url) {
    $style = 'style="background-image: url(' . esc_url($bg_media_url) . ');"';
}

$wrapper_attributes = get_block_wrapper_attributes(['class' => 'home-hero']);
?>

<section <?php echo $wrapper_attributes; ?> <?php echo $style; ?>>
    <div class="home-hero__inner">
        <div class="home-hero__content">
        <?php if ($eyebrow) : ?>
            <div class="home-hero__eyebrow"><?php echo esc_html($eyebrow); ?></div>
        <?php endif; ?>

        <?php if ($title) : ?>
            <h1 class="home-hero__title">
                <?php 
                // Allow some manual emphasis if needed, or just output
                echo wp_kses_post($title); 
                ?>
            </h1>
        <?php endif; ?>

        <?php if ($subtitle) : ?>
            <p class="home-hero__subtitle"><?php echo esc_html($subtitle); ?></p>
        <?php endif; ?>

        <div class="home-hero__ctas">
            <?php if ($primary_btn_text) : ?>
                <a href="<?php echo esc_url($primary_btn_url); ?>" class="btn-primary"><?php echo esc_html($primary_btn_text); ?></a>
            <?php endif; ?>
            <?php if ($secondary_btn_text) : ?>
                <a href="<?php echo esc_url($secondary_btn_url); ?>" class="btn-outline"><?php echo esc_html($secondary_btn_text); ?></a>
            <?php endif; ?>
        </div>

        <?php if (!empty($trust_items)) : ?>
            <div class="home-hero__trust">
                <?php foreach ($trust_items as $item) : ?>
                    <div class="home-hero__trust-item">
                        <div class="icon"><?php echo esc_html($item['icon']); ?></div>
                        <?php echo esc_html($item['text']); ?>
                    </div>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>
    </div>

    <div class="home-hero__img">
        <?php if ($media_url) : ?>
            <img src="<?php echo esc_url($media_url); ?>" alt="<?php echo esc_attr($title); ?>">
        <?php endif; ?>
        
        <?php if ($badge_title || $badge_text) : ?>
            <div class="home-hero__img-badge">
                <div>
                    <?php if ($badge_title) : ?>
                        <div class="big"><?php echo esc_html($badge_title); ?></div>
                    <?php endif; ?>
                    <?php if ($badge_text) : ?>
                        <div class="small"><?php echo nl2br(esc_html($badge_text)); ?></div>
                    <?php endif; ?>
                </div>
            </div>
        <?php endif; ?>
    </div>
    </div>
</section>

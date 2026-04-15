<?php
$milestones = $attributes['milestones'] ?? [];

$wrapper_attributes = get_block_wrapper_attributes( [
	'class' => 'heritage-timeline section',
] );
?>

<section <?php echo $wrapper_attributes; ?>>
	<div class="section-inner">
        <div class="text-center">
            <div class="section-label">Our Journey</div>
            <h2 class="section-title">Milestones of Resilience</h2>
        </div>
        
        <div class="timeline-container">
            <?php foreach ( $milestones as $index => $item ) : ?>
                <div class="timeline-item <?php echo $index % 2 === 0 ? 'left' : 'right'; ?>">
                    <div class="timeline-dot"></div>
                    <div class="timeline-content">
                        <span class="year"><?php echo esc_html( $item['year'] ); ?></span>
                        <h3><?php echo esc_html( $item['title'] ); ?></h3>
                        <p><?php echo esc_html( $item['text'] ); ?></p>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
	</div>
</section>

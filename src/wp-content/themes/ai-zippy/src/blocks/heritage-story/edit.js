import { __ } from "@wordpress/i18n";
import { useBlockProps, RichText, InspectorControls, MediaUpload, MediaUploadCheck } from "@wordpress/block-editor";
import { PanelBody, TextControl, Button } from "@wordpress/components";

export default function Edit({ attributes, setAttributes }) {
    const { label, title, content, quote, image, badgeYear, ctaText, ctaUrl } = attributes;

    return (
        <>
            <InspectorControls>
                <PanelBody title={__("Story Media", "ai-zippy")}>
                    <MediaUploadCheck>
                        <MediaUpload
                            onSelect={(media) => setAttributes({ image: media.url })}
                            allowedTypes={["image"]}
                            value={image}
                            render={({ open }) => (
                                <Button onClick={open} variant="secondary">
                                    {__("Change Image", "ai-zippy")}
                                </Button>
                            )}
                        />
                    </MediaUploadCheck>
                    <TextControl
                        label={__("Badge Year", "ai-zippy")}
                        value={badgeYear}
                        onChange={(val) => setAttributes({ badgeYear: val })}
                    />
                </PanelBody>
                <PanelBody title={__("CTA", "ai-zippy")}>
                    <TextControl
                        label={__("Button Text", "ai-zippy")}
                        value={ctaText}
                        onChange={(val) => setAttributes({ ctaText: val })}
                    />
                    <TextControl
                        label={__("Button URL", "ai-zippy")}
                        value={ctaUrl}
                        onChange={(val) => setAttributes({ ctaUrl: val })}
                    />
                </PanelBody>
            </InspectorControls>
            <div {...useBlockProps({ className: "heritage-story" })}>
                <div className="section-inner">
                    <div className="story-grid">
                        <div className="story-img">
                            <img src={image} alt="" />
                            <div className="story-img-badge">
                                <div className="num">{badgeYear}</div>
                                <div className="txt">Est. in<br/>Serangoon</div>
                            </div>
                        </div>
                        <div className="story-text">
                            <RichText tagName="div" className="section-label" value={label} onChange={(val) => setAttributes({ label: val })} />
                            <RichText tagName="h2" className="section-title" value={title} onChange={(val) => setAttributes({ title: val })} />
                            <RichText tagName="p" className="section-sub" value={content} onChange={(val) => setAttributes({ content: val })} />
                            <RichText tagName="div" className="story-quote" value={quote} onChange={(val) => setAttributes({ quote: val })} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

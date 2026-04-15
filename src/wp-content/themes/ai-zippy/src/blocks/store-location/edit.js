import { __ } from "@wordpress/i18n";
import { useBlockProps, RichText, InspectorControls, MediaUpload, MediaUploadCheck } from "@wordpress/block-editor";
import { PanelBody, TextControl, Button } from "@wordpress/components";

export default function Edit({ attributes, setAttributes }) {
    const { label, title, address, hours, email, mapImage, dirText, dirUrl, contactText, contactUrl } = attributes;

    return (
        <>
            <InspectorControls>
                <PanelBody title={__("Map Media", "ai-zippy")}>
                    <MediaUploadCheck>
                        <MediaUpload
                            onSelect={(media) => setAttributes({ mapImage: media.url })}
                            allowedTypes={["image"]}
                            value={mapImage}
                            render={({ open }) => (
                                <Button onClick={open} variant="secondary">
                                    {__("Change Map/Store Image", "ai-zippy")}
                                </Button>
                            )}
                        />
                    </MediaUploadCheck>
                </PanelBody>
                <PanelBody title={__("Contact Details", "ai-zippy")}>
                    <TextControl label={__("Address", "ai-zippy")} value={address} onChange={(val) => setAttributes({ address: val })} />
                    <TextControl label={__("Opening Hours", "ai-zippy")} value={hours} onChange={(val) => setAttributes({ hours: val })} />
                    <TextControl label={__("Email", "ai-zippy")} value={email} onChange={(val) => setAttributes({ email: val })} />
                </PanelBody>
                <PanelBody title={__("CTAs", "ai-zippy")}>
                    <TextControl label={__("Direction Text", "ai-zippy")} value={dirText} onChange={(val) => setAttributes({ dirText: val })} />
                    <TextControl label={__("Direction URL", "ai-zippy")} value={dirUrl} onChange={(val) => setAttributes({ dirUrl: val })} />
                </PanelBody>
            </InspectorControls>
            <div {...useBlockProps({ className: "store-location" })}>
                <div className="location-grid">
                    <div className="location-map">
                        <img src={mapImage} alt="" />
                        <div className="location-map-overlay"></div>
                    </div>
                    <div className="location-info">
                        <RichText tagName="div" className="section-label" value={label} onChange={(val) => setAttributes({ label: val })} />
                        <RichText tagName="h2" className="section-title" value={title} onChange={(val) => setAttributes({ title: val })} />
                        <div className="location-detail">
                            <span className="loc-icon">📍</span>
                            <RichText tagName="p" value={address} onChange={(val) => setAttributes({ address: val })} />
                        </div>
                        <div className="location-detail">
                            <span className="loc-icon">🕐</span>
                            <RichText tagName="p" value={hours} onChange={(val) => setAttributes({ hours: val })} />
                        </div>
                        <div className="location-detail">
                            <span className="loc-icon">✉️</span>
                            <RichText tagName="p" value={email} onChange={(val) => setAttributes({ email: val })} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

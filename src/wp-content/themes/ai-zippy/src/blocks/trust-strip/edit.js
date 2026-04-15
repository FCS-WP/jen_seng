import { __ } from "@wordpress/i18n";
import { useBlockProps, RichText, InspectorControls, ColorPalette, MediaUpload, MediaUploadCheck } from "@wordpress/block-editor";
import { PanelBody, TextControl, Button } from "@wordpress/components";

export default function Edit({ attributes, setAttributes }) {
    const { items, backgroundColor } = attributes;

    const updateItem = (index, data) => {
        const newItems = items.map((item, i) => {
            if (i === index) {
                return { ...item, ...data };
            }
            return item;
        });
        setAttributes({ items: newItems });
    };

    const blockProps = useBlockProps({
        className: "trust-strip",
        style: { backgroundColor: backgroundColor }
    });

    return (
        <>
            <InspectorControls>
                <PanelBody title={__("Background Color", "ai-zippy")}>
                    <ColorPalette
                        value={backgroundColor}
                        onChange={(val) => setAttributes({ backgroundColor: val })}
                    />
                </PanelBody>
                <PanelBody title={__("Items", "ai-zippy")}>
                    {items.map((item, index) => (
                        <div key={index} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #eee' }}>
                            <div style={{ marginBottom: '10px' }}>
                                <label style={{ display: 'block', marginBottom: '5px' }}>{__(`Icon Image ${index + 1}`, "ai-zippy")}</label>
                                <MediaUploadCheck>
                                    <MediaUpload
                                        onSelect={(media) => {
                                            updateItem(index, { imgUrl: media.url, imgId: media.id });
                                        }}
                                        allowedTypes={["image"]}
                                        value={item.imgId}
                                        render={({ open }) => (
                                            <Button onClick={open} variant="secondary">
                                                {!item.imgUrl ? __("Select Image", "ai-zippy") : __("Replace Image", "ai-zippy")}
                                            </Button>
                                        )}
                                    />
                                </MediaUploadCheck>
                            </div>
                            <TextControl
                                label={__(`Title ${index + 1}`, "ai-zippy")}
                                value={item.title}
                                onChange={(val) => updateItem(index, { title: val })}
                            />
                            <TextControl
                                label={__(`Subtitle ${index + 1}`, "ai-zippy")}
                                value={item.sub}
                                onChange={(val) => updateItem(index, { sub: val })}
                            />
                        </div>
                    ))}
                </PanelBody>
            </InspectorControls>
            <div {...blockProps}>
                <div className="trust-strip-inner">
                    {items.map((item, index) => (
                        <div key={index} className="trust-item">
                            <div className="trust-icon">
                                {item.imgUrl ? (
                                    <img src={item.imgUrl} alt="" />
                                ) : (
                                    <div className="trust-icon-placeholder" />
                                )}
                            </div>
                            <div className="trust-text">
                                <RichText
                                    tagName="strong"
                                    value={item.title}
                                    onChange={(val) => updateItem(index, { title: val })}
                                    placeholder={__("Title...", "ai-zippy")}
                                />
                                <RichText
                                    tagName="span"
                                    value={item.sub}
                                    onChange={(val) => updateItem(index, { sub: val })}
                                    placeholder={__("Subtitle...", "ai-zippy")}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

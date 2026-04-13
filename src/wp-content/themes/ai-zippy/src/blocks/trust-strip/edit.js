import { __ } from "@wordpress/i18n";
import { useBlockProps, RichText, InspectorControls } from "@wordpress/block-editor";
import { PanelBody, TextControl } from "@wordpress/components";

export default function Edit({ attributes, setAttributes }) {
    const { items } = attributes;

    const updateItem = (index, key, value) => {
        const newItems = [...items];
        newItems[index][key] = value;
        setAttributes({ items: newItems });
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title={__("Items", "ai-zippy")}>
                    {items.map((item, index) => (
                        <div key={index} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #eee' }}>
                            <TextControl
                                label={__(`Icon ${index + 1}`, "ai-zippy")}
                                value={item.icon}
                                onChange={(val) => updateItem(index, 'icon', val)}
                            />
                            <TextControl
                                label={__(`Title ${index + 1}`, "ai-zippy")}
                                value={item.title}
                                onChange={(val) => updateItem(index, 'title', val)}
                            />
                            <TextControl
                                label={__(`Subtitle ${index + 1}`, "ai-zippy")}
                                value={item.sub}
                                onChange={(val) => updateItem(index, 'sub', val)}
                            />
                        </div>
                    ))}
                </PanelBody>
            </InspectorControls>
            <div {...useBlockProps({ className: "trust-strip" })}>
                <div className="trust-strip-inner">
                    {items.map((item, index) => (
                        <div key={index} className="trust-item">
                            <div className="trust-icon">{item.icon}</div>
                            <div className="trust-text">
                                <strong>{item.title}</strong>
                                <span>{item.sub}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

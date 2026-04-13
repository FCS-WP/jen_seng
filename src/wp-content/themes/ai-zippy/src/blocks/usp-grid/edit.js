import { __ } from "@wordpress/i18n";
import { useBlockProps, RichText, InspectorControls } from "@wordpress/block-editor";
import { PanelBody, TextControl } from "@wordpress/components";

export default function Edit({ attributes, setAttributes }) {
    const { label, title, usps } = attributes;

    const updateUSP = (index, key, value) => {
        const newUsps = [...usps];
        newUsps[index][key] = value;
        setAttributes({ usps: newUsps });
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title={__("USPs", "ai-zippy")}>
                    {usps.map((usp, index) => (
                        <div key={index} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #eee' }}>
                            <TextControl
                                label={__(`Icon ${index + 1}`, "ai-zippy")}
                                value={usp.icon}
                                onChange={(val) => updateUSP(index, 'icon', val)}
                            />
                            <TextControl
                                label={__(`Title ${index + 1}`, "ai-zippy")}
                                value={usp.title}
                                onChange={(val) => updateUSP(index, 'title', val)}
                            />
                            <TextControl
                                label={__(`Description ${index + 1}`, "ai-zippy")}
                                value={usp.desc}
                                onChange={(val) => updateUSP(index, 'desc', val)}
                            />
                        </div>
                    ))}
                </PanelBody>
            </InspectorControls>
            <div {...useBlockProps({ className: "usp-grid" })}>
                <div className="section-inner">
                    <div className="text-center">
                        <RichText tagName="div" className="section-label" value={label} onChange={(val) => setAttributes({ label: val })} />
                        <RichText tagName="h2" className="section-title" value={title} onChange={(val) => setAttributes({ title: val })} />
                    </div>
                    <div className="usp-grid">
                        {usps.map((usp, index) => (
                            <div key={index} className="usp-card">
                                <div className="usp-icon">{usp.icon}</div>
                                <h3>{usp.title}</h3>
                                <p>{usp.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

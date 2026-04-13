import { __ } from "@wordpress/i18n";
import { useBlockProps, RichText, InspectorControls, MediaUpload, MediaUploadCheck } from "@wordpress/block-editor";
import { PanelBody, TextControl, Button } from "@wordpress/components";

export default function Edit({ attributes, setAttributes }) {
    const { label, title, subtitle, categories } = attributes;

    const updateCategory = (index, key, value) => {
        const newCats = [...categories];
        newCats[index][key] = value;
        setAttributes({ categories: newCats });
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title={__("Categories", "ai-zippy")}>
                    {categories.map((cat, index) => (
                        <div key={index} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #eee' }}>
                            <TextControl
                                label={__(`Title ${index + 1}`, "ai-zippy")}
                                value={cat.title}
                                onChange={(val) => updateCategory(index, 'title', val)}
                            />
                            <TextControl
                                label={__(`Tag ${index + 1}`, "ai-zippy")}
                                value={cat.tag}
                                onChange={(val) => updateCategory(index, 'tag', val)}
                            />
                             <TextControl
                                label={__(`Link ${index + 1}`, "ai-zippy")}
                                value={cat.link}
                                onChange={(val) => updateCategory(index, 'link', val)}
                            />
                        </div>
                    ))}
                </PanelBody>
            </InspectorControls>
            <div {...useBlockProps({ className: "category-grid" })}>
                <div className="section-inner">
                    <div className="text-center">
                        <RichText tagName="div" className="section-label" value={label} onChange={(val) => setAttributes({ label: val })} />
                        <RichText tagName="h2" className="section-title" value={title} onChange={(val) => setAttributes({ title: val })} />
                        <RichText tagName="p" className="section-sub" value={subtitle} onChange={(val) => setAttributes({ subtitle: val })} />
                    </div>
                    <div className="offer-grid">
                        {categories.map((cat, index) => (
                            <div key={index} className="offer-card">
                                <div className="offer-card-img">
                                    <img src={cat.img} alt="" />
                                    {cat.tag && <span className="offer-card-tag">{cat.tag}</span>}
                                </div>
                                <div className="offer-card-body">
                                    <h3>{cat.title}</h3>
                                    <p>{cat.desc}</p>
                                    <div className="offer-card-link">Shop Now</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

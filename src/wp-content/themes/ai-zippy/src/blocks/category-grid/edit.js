import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  RichText,
  InspectorControls,
  MediaUpload,
  MediaUploadCheck,
  ColorPalette,
} from "@wordpress/block-editor";
import { PanelBody, TextControl, Button } from "@wordpress/components";

export default function Edit({ attributes, setAttributes }) {
  const { label, title, subtitle, categories, backgroundColor } = attributes;

  const updateCategory = (index, data) => {
    const newCats = categories.map((cat, i) => {
      if (i === index) {
        return { ...cat, ...data };
      }
      return cat;
    });
    setAttributes({ categories: newCats });
  };

  const blockProps = useBlockProps({
    className: "category-grid",
    style: { backgroundColor: backgroundColor }
  });

  return (
    <>
      <InspectorControls>
        <PanelBody title={__("Background", "ai-zippy")}>
            <ColorPalette
                value={backgroundColor}
                onChange={(val) => setAttributes({ backgroundColor: val })}
            />
        </PanelBody>
        <PanelBody title={__("Categories", "ai-zippy")}>
          {categories.map((cat, index) => (
            <div
              key={index}
              style={{
                marginBottom: "20px",
                padding: "10px",
                border: "1px solid #eee",
              }}
            >
              <MediaUploadCheck>
                <MediaUpload
                  onSelect={(media) => updateCategory(index, { imgUrl: media.url, imgId: media.id })}
                  allowedTypes={["image"]}
                  value={cat.imgId}
                  render={({ open }) => (
                    <div style={{ marginBottom: "10px" }}>
                      {cat.imgUrl && (
                        <img
                          src={cat.imgUrl}
                          style={{
                            width: "100%",
                            height: "auto",
                            borderRadius: "4px",
                            marginBottom: "8px",
                            display: "block",
                          }}
                          alt=""
                        />
                      )}
                      <Button isSecondary onClick={open}>
                        {cat.imgUrl
                          ? __("Replace Image", "ai-zippy")
                          : __("Select Image", "ai-zippy")}
                      </Button>
                    </div>
                  )}
                />
              </MediaUploadCheck>
              <TextControl
                label={__(`Title ${index + 1}`, "ai-zippy")}
                value={cat.title}
                onChange={(val) => updateCategory(index, { title: val })}
              />
              <TextControl
                label={__(`Subtitle ${index + 1}`, "ai-zippy")}
                value={cat.subtitle}
                onChange={(val) => updateCategory(index, { subtitle: val })}
              />
              <TextControl
                label={__(`Link ${index + 1}`, "ai-zippy")}
                value={cat.link}
                onChange={(val) => updateCategory(index, { link: val })}
              />
            </div>
          ))}
        </PanelBody>
      </InspectorControls>
      <div {...blockProps}>
        <div className="section-inner">
          <div className="text-center">
            <RichText
              tagName="div"
              className="section-label"
              value={label}
              onChange={(val) => setAttributes({ label: val })}
              placeholder={__("Label...", "ai-zippy")}
            />
            <RichText
              tagName="h2"
              className="section-title"
              value={title}
              onChange={(val) => setAttributes({ title: val })}
              placeholder={__("Title...", "ai-zippy")}
            />
            <RichText
              tagName="p"
              className="section-sub"
              value={subtitle}
              onChange={(val) => setAttributes({ subtitle: val })}
              placeholder={__("Subtitle text...", "ai-zippy")}
            />
          </div>
          <div className="offer-grid">
            {categories.map((cat, index) => (
              <div key={index} className="offer-card">
                <div className="offer-card-img">
                  {cat.imgUrl ? (
                    <img src={cat.imgUrl} alt="" />
                  ) : (
                    <div className="placeholder-img" style={{ height: '200px', background: '#eee' }} />
                  )}
                </div>
                <div className="offer-card-body">
                  <RichText
                    tagName="h3"
                    value={cat.title}
                    onChange={(val) => updateCategory(index, { title: val })}
                    placeholder={__("Category Title...", "ai-zippy")}
                  />
                  <RichText
                    tagName="p"
                    value={cat.subtitle}
                    onChange={(val) => updateCategory(index, { subtitle: val })}
                    placeholder={__("Category Subtitle...", "ai-zippy")}
                  />
                  <div className="offer-card-arrow">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

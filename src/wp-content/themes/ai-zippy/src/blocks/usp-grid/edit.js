import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  RichText,
  InspectorControls,
  MediaUpload,
  MediaUploadCheck,
} from "@wordpress/block-editor";
import {
  PanelBody,
  TextControl,
  Button,
  ColorPalette,
} from "@wordpress/components";

export default function Edit({ attributes, setAttributes }) {
  const { label, title, usps, sectionBackgroundColor, cardBackgroundColor } =
    attributes;

  const updateUSP = (index, key, value) => {
    const newUsps = usps.map((item, i) =>
      i === index ? { ...item, [key]: value } : item,
    );
    setAttributes({ usps: newUsps });
  };

  const removeIcon = (index) => {
    const newUsps = usps.map((item, i) =>
      i === index ? { ...item, iconUrl: "", iconId: 0 } : item,
    );
    setAttributes({ usps: newUsps });
  };

  return (
    <>
      <InspectorControls>
        <PanelBody title={__("Background Settings", "ai-zippy")}>
          <p>{__("Section Background", "ai-zippy")}</p>
          <ColorPalette
            value={sectionBackgroundColor}
            onChange={(val) => setAttributes({ sectionBackgroundColor: val })}
          />
          <p>{__("Card Background", "ai-zippy")}</p>
          <ColorPalette
            value={cardBackgroundColor}
            onChange={(val) => setAttributes({ cardBackgroundColor: val })}
          />
        </PanelBody>
        <PanelBody title={__("USPs", "ai-zippy")} initialOpen={false}>
          {usps.map((usp, index) => (
            <div
              key={index}
              style={{
                marginBottom: "20px",
                padding: "15px",
                border: "1px solid #ddd",
                borderRadius: "8px",
              }}
            >
              <p>
                <strong>{__(`USP ${index + 1}`, "ai-zippy")}</strong>
              </p>
              <div style={{ marginBottom: "10px" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>
                  {__("Icon Image", "ai-zippy")}
                </label>
                <MediaUploadCheck>
                  <MediaUpload
                    onSelect={(media) => {
                      const newUsps = usps.map((item, i) =>
                        i === index
                          ? { ...item, iconUrl: media.url, iconId: media.id }
                          : item,
                      );
                      setAttributes({ usps: newUsps });
                    }}
                    allowedTypes={["image"]}
                    value={usp.iconId}
                    render={({ open }) => (
                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          alignItems: "center",
                        }}
                      >
                        {usp.iconUrl ? (
                          <img
                            src={usp.iconUrl}
                            style={{
                              width: "40px",
                              height: "40px",
                              objectFit: "contain",
                            }}
                            alt=""
                          />
                        ) : (
                          <div
                            style={{
                              width: "40px",
                              height: "40px",
                              background: "#eee",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <span className="dashicons dashicons-format-image" />
                          </div>
                        )}
                        <Button isSecondary onClick={open}>
                          {usp.iconUrl
                            ? __("Change Image", "ai-zippy")
                            : __("Upload Image", "ai-zippy")}
                        </Button>
                        {usp.iconUrl && (
                          <Button
                            isDestructive
                            onClick={() => removeIcon(index)}
                          >
                            {__("Remove", "ai-zippy")}
                          </Button>
                        )}
                      </div>
                    )}
                  />
                </MediaUploadCheck>
              </div>
              <TextControl
                label={__("Title", "ai-zippy")}
                value={usp.title}
                onChange={(val) => updateUSP(index, "title", val)}
              />
              <TextControl
                label={__("Description", "ai-zippy")}
                value={usp.desc}
                onChange={(val) => updateUSP(index, "desc", val)}
              />
            </div>
          ))}
        </PanelBody>
      </InspectorControls>
      <div
        {...useBlockProps({
          className: "usp-section",
          style: { backgroundColor: sectionBackgroundColor },
        })}
      >
        <div className="section-inner">
          <div className="text-center">
            {label && (
              <RichText
                tagName="div"
                className="section-label"
                value={label}
                onChange={(val) => setAttributes({ label: val })}
                placeholder={__("Label...", "ai-zippy")}
              />
            )}
            <RichText
              tagName="h2"
              className="section-title"
              value={title}
              onChange={(val) => setAttributes({ title: val })}
              placeholder={__("Title...", "ai-zippy")}
            />
          </div>
          <div className="usp-grid">
            {usps.map((usp, index) => (
              <div
                key={index}
                className="usp-card"
                style={{ backgroundColor: cardBackgroundColor }}
              >
                <div className="usp-icon">
                  {usp.iconUrl && <img src={usp.iconUrl} alt={usp.title} />}
                </div>
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

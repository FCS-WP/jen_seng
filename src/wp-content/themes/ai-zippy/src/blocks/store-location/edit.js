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
  TextareaControl,
  Button,
  ColorPalette,
} from "@wordpress/components";

export default function Edit({ attributes, setAttributes }) {
  const {
    label,
    title,
    address,
    hours,
    mapImage,
    mapEmbed,
    dirText,
    dirUrl,
    sectionBackgroundColor,
    addressIconUrl,
    hoursIconUrl,
  } = attributes;

  return (
    <>
      <InspectorControls>
        <PanelBody title={__("Background Settings", "ai-zippy")}>
          <p>{__("Section Background", "ai-zippy")}</p>
          <ColorPalette
            value={sectionBackgroundColor}
            onChange={(val) => setAttributes({ sectionBackgroundColor: val })}
          />
        </PanelBody>
        <PanelBody title={__("Map Media", "ai-zippy")}>
          <TextareaControl
            label={__("Google Maps Embed Code", "ai-zippy")}
            value={mapEmbed}
            onChange={(val) => setAttributes({ mapEmbed: val })}
            help={__(
              "Paste the <iframe> code from Google Maps share options.",
              "ai-zippy",
            )}
          />
          <MediaUploadCheck>
            <MediaUpload
              onSelect={(media) => setAttributes({ mapImage: media.url })}
              allowedTypes={["image"]}
              value={mapImage}
              render={({ open }) => (
                <Button
                  onClick={open}
                  variant="secondary"
                  style={{ marginTop: "10px" }}
                >
                  {__("Fallback Map Image", "ai-zippy")}
                </Button>
              )}
            />
          </MediaUploadCheck>
        </PanelBody>
        <PanelBody title={__("Icons", "ai-zippy")}>
          <p>{__("Address Icon", "ai-zippy")}</p>
          <MediaUploadCheck>
            <MediaUpload
              onSelect={(media) => setAttributes({ addressIconUrl: media.url })}
              allowedTypes={["image"]}
              value={addressIconUrl}
              render={({ open }) => (
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  {addressIconUrl && (
                    <img
                      src={addressIconUrl}
                      style={{ width: "40px" }}
                      alt=""
                    />
                  )}
                  <Button onClick={open} variant="secondary">
                    {__("Choose Icon", "ai-zippy")}
                  </Button>
                </div>
              )}
            />
          </MediaUploadCheck>
          <p>{__("Hours Icon", "ai-zippy")}</p>
          <MediaUploadCheck>
            <MediaUpload
              onSelect={(media) => setAttributes({ hoursIconUrl: media.url })}
              allowedTypes={["image"]}
              value={hoursIconUrl}
              render={({ open }) => (
                <div
                  style={{ display: "flex", gap: "10px", alignItems: "center" }}
                >
                  {hoursIconUrl && (
                    <img src={hoursIconUrl} style={{ width: "40px" }} alt="" />
                  )}
                  <Button onClick={open} variant="secondary">
                    {__("Choose Icon", "ai-zippy")}
                  </Button>
                </div>
              )}
            />
          </MediaUploadCheck>
        </PanelBody>
        <PanelBody title={__("Contact Details", "ai-zippy")}>
          <TextControl
            label={__("Address", "ai-zippy")}
            value={address}
            onChange={(val) => setAttributes({ address: val })}
          />
          <TextControl
            label={__("Opening Hours", "ai-zippy")}
            value={hours}
            onChange={(val) => setAttributes({ hours: val })}
          />
        </PanelBody>
        <PanelBody title={__("CTAs", "ai-zippy")}>
          <TextControl
            label={__("Direction Text", "ai-zippy")}
            value={dirText}
            onChange={(val) => setAttributes({ dirText: val })}
          />
          <TextControl
            label={__("Direction URL", "ai-zippy")}
            value={dirUrl}
            onChange={(val) => setAttributes({ dirUrl: val })}
          />
        </PanelBody>
      </InspectorControls>
      <div
        {...useBlockProps({
          className: "location-section",
          style: { backgroundColor: sectionBackgroundColor },
        })}
      >
        <div className="location-container">
          <div className="location-grid">
            <div className="location-map">
              <div className="map-frame">
                {mapEmbed ? (
                  <div
                    className="map-embed-wrapper"
                    dangerouslySetInnerHTML={{ __html: mapEmbed }}
                  />
                ) : mapImage ? (
                  <img src={mapImage} alt="" />
                ) : (
                  <div className="placeholder">
                    {__("No Map Data", "ai-zippy")}
                  </div>
                )}
              </div>
            </div>
            <div className="location-info">
              {label && (
                <RichText
                  tagName="div"
                  className="section-label"
                  value={label}
                  onChange={(val) => setAttributes({ label: val })}
                />
              )}
              <RichText
                tagName="h2"
                className="section-title"
                value={title}
                onChange={(val) => setAttributes({ title: val })}
              />

              <div className="details-list">
                <div className="location-detail">
                  <div className="loc-icon">
                    {addressIconUrl ? (
                      <img src={addressIconUrl} alt="" />
                    ) : (
                      "📍"
                    )}
                  </div>
                  <RichText
                    tagName="p"
                    value={address}
                    onChange={(val) => setAttributes({ address: val })}
                  />
                </div>
                <div className="location-detail">
                  <div className="loc-icon">
                    {hoursIconUrl ? <img src={hoursIconUrl} alt="" /> : "🕐"}
                  </div>
                  <RichText
                    tagName="p"
                    value={hours}
                    onChange={(val) => setAttributes({ hours: val })}
                  />
                </div>
              </div>

              <div className="location-ctas">
                <div className="btn-primary">
                  <RichText
                    tagName="span"
                    value={dirText}
                    onChange={(val) => setAttributes({ dirText: val })}
                  />
                  <span className="arrow">→</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import { __ } from "@wordpress/i18n";
import { useBlockProps, RichText, InspectorControls, MediaUpload, MediaUploadCheck } from "@wordpress/block-editor";
import { PanelBody, Button } from "@wordpress/components";
import "./editor.scss";

export default function Edit({ attributes, setAttributes }) {
	const { address, hours, email, phone, mapImageUrl } = attributes;

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Map Settings", "ai-zippy")}>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={(media) => setAttributes({ mapImageUrl: media.url })}
							allowedTypes={["image"]}
							value={mapImageUrl}
							render={({ open }) => (
								<Button isPrimary onClick={open}>
									{mapImageUrl ? __("Change Map Image", "ai-zippy") : __("Upload Map Image", "ai-zippy")}
								</Button>
							)}
						/>
					</MediaUploadCheck>
				</PanelBody>
			</InspectorControls>

			<section {...useBlockProps({ className: "contact-info-map" })}>
				<div className="contact-info-map-inner">
					<div className="contact-top-grid">
						<div className="contact-info-card">
							<div className="contact-info-card-header">
								{__("Contact Information", "ai-zippy")}
								<span>{__("Visit us or send us a message", "ai-zippy")}</span>
							</div>
							<div className="contact-info-body">
								<div className="contact-detail">
									<div className="c-icon">📍</div>
									<div>
										<h4>{__("Store Address", "ai-zippy")}</h4>
										<RichText
											tagName="p"
											value={address}
											onChange={(val) => setAttributes({ address: val })}
											placeholder={__("Enter address...", "ai-zippy")}
										/>
									</div>
								</div>
								<div className="contact-divider"></div>
								<div className="contact-detail">
									<div className="c-icon">🕐</div>
									<div>
										<h4>{__("Opening Hours", "ai-zippy")}</h4>
										<RichText
											tagName="p"
											value={hours}
											onChange={(val) => setAttributes({ hours: val })}
											placeholder={__("Enter hours...", "ai-zippy")}
										/>
									</div>
								</div>
								<div className="contact-divider"></div>
								<div className="contact-detail">
									<div className="c-icon">✉️</div>
									<div>
										<h4>{__("Email & Phone", "ai-zippy")}</h4>
										<RichText
											tagName="p"
											value={email}
											onChange={(val) => setAttributes({ email: val })}
											placeholder={__("Enter email...", "ai-zippy")}
										/>
										<RichText
											tagName="p"
											value={phone}
											onChange={(val) => setAttributes({ phone: val })}
											placeholder={__("Enter phone...", "ai-zippy")}
										/>
									</div>
								</div>
							</div>
						</div>

						<div className="map-container">
							{mapImageUrl ? (
								<img src={mapImageUrl} alt="Map" />
							) : (
								<div className="placeholder">{__("Select Map Image in Sidebar", "ai-zippy")}</div>
							)}
							<div className="map-pin-overlay">
								<div className="map-pin"><div className="map-pin-inner">📍</div></div>
								<div className="map-label">
									Jen Seng Medical Hall
									<span>{address.replace(/\n/g, " ")}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

import { __ } from "@wordpress/i18n";
import { useBlockProps, RichText, InspectorControls } from "@wordpress/block-editor";
import { PanelBody, TextControl } from "@wordpress/components";

export default function Edit({ attributes, setAttributes }) {
	const { title, description, phoneNumber } = attributes;

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("WhatsApp Settings", "ai-zippy")}>
					<TextControl
						label={__("WhatsApp Phone Number", "ai-zippy")}
						value={phoneNumber}
						onChange={(val) => setAttributes({ phoneNumber: val })}
						placeholder={__("e.g. 6588889999", "ai-zippy")}
						help={__("Include country code, no spaces or plus signs.", "ai-zippy")}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...useBlockProps({ className: "whatsapp-banner-section" })}>
				<div className="wa-banner">
					<div className="wa-banner-icon">💬</div>
					<div className="wa-banner-text">
						<RichText
							tagName="h3"
							value={title}
							onChange={(val) => setAttributes({ title: val })}
							placeholder={__("Title...", "ai-zippy")}
						/>
						<RichText
							tagName="p"
							value={description}
							onChange={(val) => setAttributes({ description: val })}
							placeholder={__("Description...", "ai-zippy")}
						/>
					</div>
					<div className="btn-wa">💬 Chat on WhatsApp</div>
				</div>
			</div>
		</>
	);
}

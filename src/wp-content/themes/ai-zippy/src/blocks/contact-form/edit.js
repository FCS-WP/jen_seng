import { __ } from "@wordpress/i18n";
import { useBlockProps, RichText, InspectorControls } from "@wordpress/block-editor";
import { PanelBody, TextControl } from "@wordpress/components";

export default function Edit({ attributes, setAttributes }) {
	const { title, subtitle, formShortcode } = attributes;

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Form Settings", "ai-zippy")}>
					<TextControl
						label={__("Contact Form Shortcode", "ai-zippy")}
						value={formShortcode}
						onChange={(val) => setAttributes({ formShortcode: val })}
						help={__("Paste the shortcode from your form plugin (e.g. [contact-form-7 id='...'])", "ai-zippy")}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...useBlockProps({ className: "contact-form-section" })}>
				<div className="form-section">
					<RichText
						tagName="h2"
						value={title}
						onChange={(val) => setAttributes({ title: val })}
						placeholder={__("Form Title...", "ai-zippy")}
					/>
					<RichText
						tagName="p"
						className="form-sub"
						value={subtitle}
						onChange={(val) => setAttributes({ subtitle: val })}
						placeholder={__("Form Subtitle...", "ai-zippy")}
					/>
					{formShortcode ? (
						<div className="shortcode-placeholder">
							{__("Form will render here using shortcode: ", "ai-zippy")}
							<code>{formShortcode}</code>
						</div>
					) : (
						<div className="form-grid" style={{ opacity: 0.5, pointerEvents: "none" }}>
							<div className="form-group">
								<label>Your Name *</label>
								<input type="text" placeholder="e.g. Tan Wei Ming" />
							</div>
							<div className="form-group">
								<label>Email Address *</label>
								<input type="email" placeholder="e.g. weiming@email.com" />
							</div>
							<div className="form-group full">
								<label>Subject</label>
								<input type="text" placeholder="e.g. Enquiry about confinement packages" />
							</div>
							<div className="form-group full">
								<label>Message *</label>
								<textarea placeholder="Tell us how we can help you…"></textarea>
							</div>
							<div className="form-footer">
								<p className="form-privacy">🔒 Your information is kept private...</p>
								<button className="btn-primary">Send Message →</button>
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
}

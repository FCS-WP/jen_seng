import { __ } from "@wordpress/i18n";
import { useBlockProps, RichText } from "@wordpress/block-editor";
import "./editor.scss";

export default function Edit({ attributes, setAttributes }) {
	const { label, title, description } = attributes;

	return (
		<section {...useBlockProps({ className: "contact-hero" })}>
			<div className="contact-hero-inner">
				<RichText
					tagName="div"
					className="section-label"
					value={label}
					onChange={(val) => setAttributes({ label: val })}
					placeholder={__("Eyebrow Label...", "ai-zippy")}
				/>
				<RichText
					tagName="h1"
					value={title}
					onChange={(val) => setAttributes({ title: val })}
					placeholder={__("Hero Title...", "ai-zippy")}
				/>
				<RichText
					tagName="p"
					value={description}
					onChange={(val) => setAttributes({ description: val })}
					placeholder={__("Hero Description...", "ai-zippy")}
				/>
			</div>
		</section>
	);
}

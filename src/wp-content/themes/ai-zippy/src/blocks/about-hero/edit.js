import { __ } from "@wordpress/i18n";
import { useBlockProps, RichText, InspectorControls, MediaUpload, MediaUploadCheck } from "@wordpress/block-editor";
import { PanelBody, Button } from "@wordpress/components";

export default function Edit({ attributes, setAttributes }) {
	const { title, subtitle, imageUrl } = attributes;

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Hero Image", "ai-zippy")}>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={(media) => setAttributes({ imageUrl: media.url })}
							allowedTypes={["image"]}
							value={imageUrl}
							render={({ open }) => (
								<Button isPrimary onClick={open}>
									{imageUrl ? __("Change Background", "ai-zippy") : __("Upload Background", "ai-zippy")}
								</Button>
							)}
						/>
					</MediaUploadCheck>
				</PanelBody>
			</InspectorControls>

			<section {...useBlockProps({ 
				className: "about-hero",
				style: { backgroundImage: `linear-gradient(to bottom, rgba(28, 20, 16, 0.4), rgba(28, 20, 16, 0.8)), url('${imageUrl}')` } 
			})}>
				<div className="about-hero-content">
					<RichText
						tagName="h1"
						value={title}
						onChange={(val) => setAttributes({ title: val })}
						placeholder={__("Enter title...", "ai-zippy")}
					/>
					<RichText
						tagName="p"
						value={subtitle}
						onChange={(val) => setAttributes({ subtitle: val })}
						placeholder={__("Enter subtitle...", "ai-zippy")}
					/>
				</div>
			</section>
		</>
	);
}

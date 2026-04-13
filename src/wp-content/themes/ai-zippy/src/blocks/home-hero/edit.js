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
	ResponsiveControl,
} from "@wordpress/components";

export default function Edit({ attributes, setAttributes }) {
	const {
		eyebrow,
		title,
		subtitle,
		primaryBtnText,
		primaryBtnUrl,
		secondaryBtnText,
		secondaryBtnUrl,
		mediaUrl,
		mediaId,
		badgeTitle,
		badgeText,
	} = attributes;

	const onSelectImage = (media) => {
		setAttributes({
			mediaId: media.id,
			mediaUrl: media.url,
		});
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Hero Content", "ai-zippy")}>
					<TextControl
						label={__("Eyebrow", "ai-zippy")}
						value={eyebrow}
						onChange={(val) => setAttributes({ eyebrow: val })}
					/>
					<TextControl
						label={__("Title", "ai-zippy")}
						value={title}
						onChange={(val) => setAttributes({ title: val })}
					/>
					<TextareaControl
						label={__("Subtitle", "ai-zippy")}
						value={subtitle}
						onChange={(val) => setAttributes({ subtitle: val })}
					/>
				</PanelBody>

				<PanelBody title={__("Buttons", "ai-zippy")} initialOpen={false}>
					<TextControl
						label={__("Primary Button Text", "ai-zippy")}
						value={primaryBtnText}
						onChange={(val) => setAttributes({ primaryBtnText: val })}
					/>
					<TextControl
						label={__("Primary Button URL", "ai-zippy")}
						value={primaryBtnUrl}
						onChange={(val) => setAttributes({ primaryBtnUrl: val })}
					/>
					<TextControl
						label={__("Secondary Button Text", "ai-zippy")}
						value={secondaryBtnText}
						onChange={(val) => setAttributes({ secondaryBtnText: val })}
					/>
					<TextControl
						label={__("Secondary Button URL", "ai-zippy")}
						value={secondaryBtnUrl}
						onChange={(val) => setAttributes({ secondaryBtnUrl: val })}
					/>
				</PanelBody>

				<PanelBody title={__("Media", "ai-zippy")} initialOpen={false}>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={onSelectImage}
							allowedTypes={["image"]}
							value={mediaId}
							render={({ open }) => (
								<Button
									onClick={open}
									variant="secondary"
									className={!mediaId ? "is-primary" : ""}
								>
									{!mediaId ? __("Select Image", "ai-zippy") : __("Replace Image", "ai-zippy")}
								</Button>
							)}
						/>
					</MediaUploadCheck>
				</PanelBody>

				<PanelBody title={__("Badge", "ai-zippy")} initialOpen={false}>
					<TextControl
						label={__("Badge Title (e.g. 30+)", "ai-zippy")}
						value={badgeTitle}
						onChange={(val) => setAttributes({ badgeTitle: val })}
					/>
					<TextareaControl
						label={__("Badge Text", "ai-zippy")}
						value={badgeText}
						onChange={(val) => setAttributes({ badgeText: val })}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...useBlockProps({ className: "home-hero" })}>
				<div className="home-hero__content">
					<RichText
						tagName="div"
						className="home-hero__eyebrow"
						value={eyebrow}
						onChange={(val) => setAttributes({ eyebrow: val })}
						placeholder={__("Eyebrow text...", "ai-zippy")}
					/>
					<RichText
						tagName="h1"
						className="home-hero__title"
						value={title}
						onChange={(val) => setAttributes({ title: val })}
						placeholder={__("Hero Title...", "ai-zippy")}
					/>
					<RichText
						tagName="p"
						className="home-hero__subtitle"
						value={subtitle}
						onChange={(val) => setAttributes({ subtitle: val })}
						placeholder={__("Subtitle text...", "ai-zippy")}
					/>
					<div className="home-hero__ctas">
						<span className="btn-primary">{primaryBtnText || __("Button", "ai-zippy")}</span>
						<span className="btn-outline">{secondaryBtnText || __("Button", "ai-zippy")}</span>
					</div>
					<div className="home-hero__trust">
						{attributes.trustItems.map((item, index) => (
							<div key={index} className="home-hero__trust-item">
								<span className="icon">{item.icon}</span>
								<span>{item.text}</span>
							</div>
						))}
					</div>
				</div>
				<div className="home-hero__img">
					{mediaUrl ? (
						<img src={mediaUrl} alt="" />
					) : (
						<div className="placeholder">{__("No image selected", "ai-zippy")}</div>
					)}
					<div className="home-hero__img-badge">
						<div>
							<div className="big">{badgeTitle}</div>
							<div className="small">{badgeText}</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

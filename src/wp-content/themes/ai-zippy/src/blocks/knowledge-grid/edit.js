import { __ } from "@wordpress/i18n";
import { useBlockProps, InspectorControls } from "@wordpress/block-editor";
import { PanelBody, RangeControl, Placeholder } from "@wordpress/components";

export default function Edit({ attributes, setAttributes }) {
	const { postsPerPage } = attributes;

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Grid Settings", "ai-zippy")}>
					<RangeControl
						label={__("Posts per page", "ai-zippy")}
						value={postsPerPage}
						onChange={(val) => setAttributes({ postsPerPage: val })}
						min={1}
						max={12}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...useBlockProps({ className: "knowledge-grid" })}>
				<Placeholder
					icon="welcome-learn-more"
					label={__("Knowledge Grid", "ai-zippy")}
					instructions={__("Fetches the latest blog posts dynamically. Viewing in Editor may differ from front-end.", "ai-zippy")}
				/>
			</div>
		</>
	);
}

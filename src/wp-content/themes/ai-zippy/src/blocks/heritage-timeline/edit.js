import { __ } from "@wordpress/i18n";
import { useBlockProps, RichText } from "@wordpress/block-editor";
import { Button } from "@wordpress/components";

export default function Edit({ attributes, setAttributes }) {
	const { milestones } = attributes;

	const updateMilestone = (index, key, val) => {
		const newMilestones = [...milestones];
		newMilestones[index][key] = val;
		setAttributes({ milestones: newMilestones });
	};

	const addMilestone = () => {
		setAttributes({ milestones: [...milestones, { year: "20xx", title: "New Event", text: "" }] });
	};

	return (
		<section {...useBlockProps({ className: "heritage-timeline" })}>
			<div className="section-inner">
				<div className="text-center">
					<div className="section-label">Our Journey</div>
					<h2 className="section-title">Milestones of Resilience</h2>
				</div>
				
				<div className="timeline-container">
					{milestones.map((item, index) => (
						<div key={index} className={`timeline-item ${index % 2 === 0 ? "left" : "right"}`}>
							<div className="timeline-dot"></div>
							<div className="timeline-content">
								<RichText
									tagName="span"
									className="year"
									value={item.year}
									onChange={(val) => updateMilestone(index, "year", val)}
								/>
								<RichText
									tagName="h3"
									value={item.title}
									onChange={(val) => updateMilestone(index, "title", val)}
								/>
								<RichText
									tagName="p"
									value={item.text}
									onChange={(val) => updateMilestone(index, "text", val)}
									placeholder={__("Describe the event...", "ai-zippy")}
								/>
							</div>
						</div>
					))}
				</div>
				<div style={{ textAlign: "center", marginTop: "20px" }}>
					<Button isSecondary onClick={addMilestone}>{__("Add Milestone", "ai-zippy")}</Button>
				</div>
			</div>
		</section>
	);
}

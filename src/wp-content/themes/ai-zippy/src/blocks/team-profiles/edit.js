import { __ } from "@wordpress/i18n";
import { useBlockProps, RichText, MediaUpload, MediaUploadCheck } from "@wordpress/block-editor";
import { Button } from "@wordpress/components";

export default function Edit({ attributes, setAttributes }) {
	const { members } = attributes;

	const updateMember = (index, key, val) => {
		const newMembers = [...members];
		newMembers[index][key] = val;
		setAttributes({ members: newMembers });
	};

	const addMember = () => {
		setAttributes({ members: [...members, { name: "Name", role: "Role", bio: "", imageUrl: "" }] });
	};

	return (
		<section {...useBlockProps({ className: "team-profiles" })}>
			<div className="section-inner">
				<div className="text-center">
					<div className="section-label">Our Heart</div>
					<h2 className="section-title">The Faces Behind Jen Seng</h2>
				</div>

				<div className="team-grid">
					{members.map((member, index) => (
						<div key={index} className="team-card">
							<div className="team-img">
								<MediaUploadCheck>
									<MediaUpload
										onSelect={(media) => updateMember(index, "imageUrl", media.url)}
										allowedTypes={["image"]}
										value={member.imageUrl}
										render={({ open }) => (
											<div onClick={open} style={{ cursor: "pointer", height: "100%" }}>
												{member.imageUrl ? (
													<img src={member.imageUrl} alt={member.name} />
												) : (
													<div className="img-placeholder" style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
														{__("Add Photo", "ai-zippy")}
													</div>
												)}
											</div>
										)}
									/>
								</MediaUploadCheck>
							</div>
							<div className="team-info">
								<RichText
									tagName="h3"
									value={member.name}
									onChange={(val) => updateMember(index, "name", val)}
								/>
								<RichText
									tagName="span"
									className="role"
									value={member.role}
									onChange={(val) => updateMember(index, "role", val)}
								/>
								<RichText
									tagName="p"
									value={member.bio}
									onChange={(val) => updateMember(index, "bio", val)}
									placeholder={__("Short bio...", "ai-zippy")}
								/>
							</div>
						</div>
					))}
				</div>
				<div style={{ textAlign: "center", marginTop: "40px" }}>
					<Button isSecondary onClick={addMember}>{__("Add Member", "ai-zippy")}</Button>
				</div>
			</div>
		</section>
	);
}

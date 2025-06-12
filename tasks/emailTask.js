export const emailTask = {
	name: "Email",
	cost: 3,

	spawn(onClose) {
		const $screen = $("#screen");

		const top = Math.random() * ($screen.height() - 200);
		const left = Math.random() * ($screen.width() - 400);
		const good = Math.random() < 0.7; // 70% chance of good email

		const $popup = $(`
			<div class="popup-container">
				<div class="popup email" style="top: ${top}px; left: ${left}px;">
					<div class="popup-header">
						<p>New Email</p>
					</div>
					<div class="popup-content" style="padding: 20px;">
						${generateContent()}
					</div>
				</div>
			</div>
		`);

		$popup.draggable({ handle: ".popup-header" });
		$screen.append($popup);

		$popup.find(".spam-btn").on("click", () => {
			clickHander(!good);
		});

		$popup.find(".read-btn").on("click", () => {
			clickHander(good);
		});

		function clickHander(correct) {
			if (correct) {
				if (onClose) onClose();
				$popup.remove();
			} else {
				const newTop = Math.random() * ($screen.height() - 200);
				const newLeft = Math.random() * ($screen.width() - 400);
				$popup.find(".popup").css({ top: newTop + "px", left: newLeft + "px" });
			}
		}
	
		function generateContent() {
			const goodEmailAddresses = [
				"emily@company.com",
				"sirius@company.com",
				"davan@company.com",
				"wendy@company.com",
				"jovone@company.com",
				"wilson@company.com",
			];
			const badEmailAddresses = [
				"bounce23.ccn@ssrha.com",
				"dontlookatthis@mail.com",
				"youknowme@mail.com",
				"bryan@compnay.com",
			];
			const subjects = [
				"Important",
				"Meeting Reminder",
				"Please Read",
				"Hello",
				"Re: Re: Re: Re: Re: Forgot to Send",
				"Last Week",
			];
			const bodies = [
				"Hello, this is a test email. Please ignore. Got a new email address. Oh yeah about that, I forgot to send you the last email, I will get it to you next week or something. Currently moving, schedule is a mess.",
				"Reminder: You have a meeting scheduled for tomorrow at 10 AM. Please be prepared. You will need to bring your laptop. We should be going over the new project details. I will send you the agenda later today. Lunch on me so stay after!",
				"Hey do you know about the new project? We need to discuss it in detail. Please let me know your availability.",
				"Did you hear about the Office Party? It's going to be great! Don't forget to bring your favorite dish. I'm bringing potato salad. Oh and I heard Sarah from the other deparment is allergic to peanuts, so it'd be best to avoid them.",
				"Are you available for a quick chat? I have some updates to share with you. Let me know when you're free.",
				"Please review the attached document and provide your feedback. Davan and I drafted it up last week and I just got to update it this weekend. It's important for the upcoming meeting; we need the finalized version to the manager soon.",
				"Just a friendly reminder about the deadline for the project submission. It's due next week, so please make sure to complete it on time. Best would be a coupld days before incase something goes awry. I'm almost done with my part, I can meet you next week if you have any issues that you get stuck on.",
				"Thank you for your prompt response. I appreciate your cooperation. Looking forward to hearing from you soon.",
			];

			const subject = subjects[Math.floor(Math.random() * subjects.length)];
			const body = bodies[Math.floor(Math.random() * bodies.length)];
			const sender = good
				? goodEmailAddresses[Math.floor(Math.random() * goodEmailAddresses.length)]
				: badEmailAddresses[Math.floor(Math.random() * badEmailAddresses.length)];

			return `
				<h3>${subject}</h3>
				<p>mailed by: ${sender}</p>
				<p>${body}</p>
				<div class="controls">
					<button class="read-btn">Mark as Read</button>
					<button class="spam-btn">Report Spam</button>
				</div>
			`;
		}
	}
}

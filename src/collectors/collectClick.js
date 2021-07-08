const collectClick = async ({ buttoned_msg }) => {
    try {
        const collector = await buttoned_msg.awaitButtons(() => true, {
            time: 3 * 60 * 1000,
            max: 1,
        });
        const clicked_button = collector.first();

        if (!clicked_button) {
            buttoned_msg.edit({
                embed: buttoned_msg.embeds[0],
            });
            return {
                timed_out: true,
                error: "Looks like you didn't confirm in time. Restart the interview process in the server when you're ready.",
            };
        }

        if (clicked_button.message.id == buttoned_msg.id) {
            clicked_button.defer();
            if (clicked_button.id.includes('confirm')) {
                return { confirmed: true };
            } else if (clicked_button.id.includes('neutral')) {
                return { neutral: true };
            } else {
                return { rejected: true };
            }
        }
    } catch (e) {
        console.log(e);
    }
};

export default collectClick;

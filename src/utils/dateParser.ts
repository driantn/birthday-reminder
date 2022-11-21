export const dateParser = (date?: string) => {
	const newDate = date ? new Date(date) : new Date();
	return newDate
		.toLocaleDateString()
		.replaceAll("/", "-")
		.split("-")
		.reverse()
		.concat()
		.join("-");
};

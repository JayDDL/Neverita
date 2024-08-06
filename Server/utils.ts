export const getEndDate = (startDate: Date) => {
	const endDate = new Date();
	endDate.setDate(startDate.getDate() + 7);
	return endDate;
};

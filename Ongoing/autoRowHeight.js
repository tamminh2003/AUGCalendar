let autoRowHeight = () => {
	let monthView = AUG.Calendar.calendar.getView("month");

	let entriesPerDay = monthView.days.map(c => c.entries.list.length);
	let maxEntriesPerDay = Math.max(...entriesPerDay);
	console.log(`maxEntriesPerDay = ${maxEntriesPerDay}`);

	monthView.rowHeight = monthView.slotHeight * maxEntriesPerDay
		+ monthView.slotHeight - 1 + monthView.eventHolderTopOffset;

	monthView.slotsCount = Math.floor((this.rowHeight - this.eventHolderTopOffset) / this.slotHeight);

	monthView.show();
}

autoRowHeight();
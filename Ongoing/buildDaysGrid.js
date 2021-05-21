window.monthViewRowHeight = 500;
window.monthViewSlotHeight = 40;

let monthView = BXEventCalendar.instances[Object.keys(BXEventCalendar.instances)[0]].getView("month");

monthView.slotHeight = window.monthViewSlotHeight; // * <== There will be a variable to control this

// MODIFIED buildDaysGrid method

monthView.buildDaysGrid = function(params)
{
    if (!params)
        params = {};

    var
        i, dayOffset,
        grid = params.grid || this.grid,
        viewRangeDate = this.calendar.getViewRangeDate(),
        year = viewRangeDate.getFullYear(),
        month = viewRangeDate.getMonth(),
        height = this.util.getViewHeight(),
        displayedRange = BX.clone(this.getViewRange(), true),
        date = new Date();

    BX.cleanNode(grid);
    date.setFullYear(year, month, 1);

    this.dayIndex = {};
    this.days = [];
    this.entryHolders = [];

    this.currentMonthRow = false;
    this.monthRows = [];

    if (this.util.getWeekStart() != this.util.getWeekDayByInd(date.getDay()))
    {
        dayOffset = this.util.getWeekDayOffset(this.util.getWeekDayByInd(date.getDay()));
        date.setDate(date.getDate() - dayOffset);

        displayedRange.start = new Date(date.getTime());
        displayedRange.start.setHours(0, 0, 0, 0);

        for (i = 0; i < dayOffset; i++)
        {
            this.buildDayCell({date: date, month: 'previous', grid: grid});
            date.setDate(date.getDate() + 1);
        }
    }

    date.setFullYear(year, month, 1);
    while(date.getMonth() == month)
    {
        this.buildDayCell({date: date, grid: grid});
        date.setDate(date.getDate() + 1);
    }

    if (this.util.getWeekStart() != this.util.getWeekDayByInd(date.getDay()))
    {
        dayOffset = this.util.getWeekDayOffset(this.util.getWeekDayByInd(date.getDay()));
        date.setFullYear(year, month + 1, 1);
        for (i = dayOffset; i < 7; i++)
        {
            this.buildDayCell({date: date, month: 'next', grid: grid});
            date.setDate(date.getDate() + 1);
        }

        displayedRange.end = new Date(date.getTime());
        displayedRange.end.setHours(23, 59, 59, 59);
    }

    this.calendar.setDisplayedViewRange(displayedRange);

    // Adjusting rows height to the height of the view
    if (this.monthRows.length > 0)
    {
        this.rowHeight = window.monthViewRowHeight;
        this.slotsCount = Math.floor((this.rowHeight - this.eventHolderTopOffset) / this.slotHeight);
        for (i = 0; i < this.monthRows.length; i++)
        {
            this.monthRows[i].style.height = this.rowHeight + 'px';
        }
    }
};
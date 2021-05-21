BXEventCalendar.instances[Object.keys(BXEventCalendar.instances)[0]].getView("month").show = 

function()
{
    View.prototype.show.apply(this, arguments);

    this.buildDaysTitle();
    this.buildDaysGrid();

    if (this.calendar.navCalendar)
        this.calendar.navCalendar.hide();

    this.displayEntries();
    this.calendar.initialViewShow = false;
    this.gridWrap.style.height = '';
    this.gridwrap.style.overflow = '';
};
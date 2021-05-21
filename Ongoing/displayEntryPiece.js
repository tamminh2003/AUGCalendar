
BXEventCalendar.instances[Object.keys(BXEventCalendar.instances)[0]].getView("month").displayEntryPiece = 

function(params)
{
    var
        res = false,
        entry = params.entry,
        from = params.part.from,
        daysCount = params.part.daysCount,
        partWrap, dotNode, innerNode, nameNode, timeNode, endTimeNode, innerContainer,
        entryClassName = 'calendar-event-line-wrap',
        deltaPartWidth = 0,
        startArrow, endArrow,
        holder = params.holder || this.entryHolders[from.holderIndex];

    if (holder)
    {
        if (entry.isFullDay())
        {
            entryClassName += ' calendar-event-line-fill';
        }
        else if (entry.isLongWithTime())
        {
            entryClassName += ' calendar-event-line-border';
        }

        // if (entry.hasEmailAttendees())
        // {
        // 	entryClassName += ' calendar-event-line-intranet';
        // }

        if (entry.isExpired())
        {
            entryClassName += ' calendar-event-line-past';
        }

        if (!params.popupMode && this.util.getDayCode(entry.from) !== this.util.getDayCode(from.date))
        {
            entryClassName += ' calendar-event-line-start-yesterday';
            deltaPartWidth += 8;
            startArrow = this.getArrow('left', entry.color, entry.isFullDay());
        }

        if (!params.popupMode && this.util.getDayCode(entry.to) !== this.util.getDayCode(params.part.to.date))
        {
            entryClassName += ' calendar-event-line-finish-tomorrow';
            endArrow = this.getArrow('right', entry.color, entry.isFullDay());
            deltaPartWidth += 12;
        }

        if (startArrow && !endArrow)
        {
            deltaPartWidth += 4;
        }

        if (deltaPartWidth == 0)
        {
            deltaPartWidth = 5;
        }

        partWrap = BX.create('DIV', {
            attrs: {'data-bx-calendar-entry': entry.uid},
            props: {className: entryClassName}, style: {
                top: 0,
                left: 'calc((100% / ' + this.dayCount + ') * (' + (from.dayOffset + 1) + ' - 1) + 2px)',
                width: 'calc(' + daysCount + ' * 100% / ' + this.dayCount + ' - ' + deltaPartWidth + 'px)'
            }
        });


        if (startArrow)
        {
            partWrap.appendChild(startArrow);
            partWrap.style.left = '9px';
        }

        if (endArrow)
        {
            partWrap.appendChild(endArrow);
        }

        innerContainer = partWrap.appendChild(BX.create('DIV', {props: {className: 'calendar-event-line-inner-container'}}));
        innerNode = innerContainer.appendChild(BX.create('DIV', {props: {className: 'calendar-event-line-inner'}}));
        dotNode = innerNode.appendChild(BX.create('DIV', {props: {className: 'calendar-event-line-dot aug-calendar-event-line-dot'}}));

        if (entry.isFullDay())
        {
            innerNode.style.maxWidth = 'calc(200% / ' + daysCount + ' - 3px)';
        }
        else if (entry.isLongWithTime())
        {
            partWrap.style.borderColor = entry.color;
            innerNode.style.maxWidth = 'calc(200% / ' + daysCount + ' - 3px)';

            // first part
            if (params.part.partIndex == 0)
            {
                if (this.util.getDayCode(entry.from) !== this.util.getDayCode(from.date))
                {
                    timeNode = innerNode.appendChild(
                        BX.create('SPAN', {
                            props: {className: 'calendar-event-line-time'},
                            text: this.calendar.util.formatTime(entry.to.getHours(), entry.to.getMinutes())
                        }));
                }
                else
                {
                    timeNode = innerNode.appendChild(
                        BX.create('SPAN', {
                            props: {className: 'calendar-event-line-time'},
                            text: this.calendar.util.formatTime(entry.from.getHours(), entry.from.getMinutes())
                        }));
                }
                innerNode.style.width = 'calc(100% / ' + daysCount + ' - 3px)';
            }

            // Last part
            if (params.part.partIndex == entry.parts.length - 1)
            {
                if (daysCount > 1 && entry.parts.length > 1)
                {
                    innerNode.style.width = 'calc(' + (daysCount - 1) + '00% / ' + daysCount + ' - 3px)';
                }

                if (!params.popupMode && daysCount > 1)
                {
                    endTimeNode = innerNode.appendChild(BX.create('SPAN', {
                        props: {className: (entry.parts.length > 1 && daysCount == 1)
                                ? 'calendar-event-line-time'
                                : 'calendar-event-line-expired-time'},
                        text: this.calendar.util.formatTime(entry.to.getHours(), entry.to.getMinutes())
                    }));
                }
            }
        }
        else
        {
            timeNode = innerNode.appendChild(BX.create('SPAN', {props: {className: 'calendar-event-line-time'}, text: this.calendar.util.formatTime(entry.from.getHours(), entry.from.getMinutes())}));
        }
        nameNode = innerNode
            .appendChild(BX.create('SPAN', {props: {className: 'calendar-event-line-text aug-calendar-event-line-text'}}))
            .appendChild(BX.create('SPAN', {text: params.entry.name}));

        if (entry.isFullDay())
        {
            innerContainer.style.backgroundColor = this.calendar.util.hexToRgba(entry.color, 0.3);
            innerContainer.style.borderColor = this.calendar.util.hexToRgba(entry.color, 0.3);
        }
        else
        {
            if (entry.isLongWithTime())
            {
                innerContainer.style.borderColor = this.calendar.util.hexToRgba(entry.color, 0.5);
            }
            dotNode.style.backgroundColor = entry.color;
        }

        holder.appendChild(partWrap);

        if (entry.opacity !== undefined)
        {
            partWrap.style.opacity = entry.opacity;
        }

        res = {
            wrapNode: partWrap,
            nameNode: nameNode,
            innerContainer: innerContainer,
            innerNode: innerNode,
            timeNode: timeNode || false,
            endTimeNode: endTimeNode || false,
            dotNode: dotNode
        };

        if (!params.popupMode)
        {
            params.entry.registerPartNode(params.part, res);
        }

        this.calendar.dragDrop.registerEntry(partWrap, params);
    }

    return res;
};
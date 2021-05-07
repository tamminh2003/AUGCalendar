class CalendarLayer {
    constructor(name, childCalendar, parentCalendar, id) {
        this.name = name;
        this.childCalendar = childCalendar;
        this.parentCalendar = parentCalendar;

        this.id = id;   // id will link the CalendarLayer to correct Calendar Section
                        // null if does not link to Calendar Section
        
        this.calendar = placeholder; // LINK this to BX calendar instance
    }

    getName() {
        return this.name;
    }
    
    getChildCalendar() {
        return this.childCalendar;
    }

    getParentCalendar() {
        return this.parentCalendar;
    }

    getId() {
        return this.id;
    }


}

const CalendarTree = [];

// Total 28 company calendars

CalendarTree.push(new CalendarLayer("Adelaide", [], ["Australia"], placeholder));
CalendarTree.push(new CalendarLayer("Brisbane", [], ["Australia"], placeholder));
CalendarTree.push(new CalendarLayer("Melbourne", [], ["Australia"], placeholder));
CalendarTree.push(new CalendarLayer("Perth", [], ["Australia"], placeholder));
CalendarTree.push(new CalendarLayer("Sydney", [], ["Australia"], placeholder));

CalendarTree.push(new CalendarLayer("Australia", ["Adelaide", "Brisbane", "Melbourne", "Perth", "Sydney"], ["Global"], placeholder));

CalendarTree.push(new CalendarLayer("Beijing", [], ["China"], placeholder));
CalendarTree.push(new CalendarLayer("Hong Kong", [], ["China"], placeholder));

CalendarTree.push(new CalendarLayer("China", ["Beijing", "Hong Kong"], ["Global"], placeholder));

CalendarTree.push(new CalendarLayer("Bandung", [], ["Indonesia"], placeholder));
CalendarTree.push(new CalendarLayer("Jakarta", [], ["Indonesia"], placeholder));
CalendarTree.push(new CalendarLayer("Surabaya", [], ["Indonesia"], placeholder));

CalendarTree.push(new CalendarLayer("Indonesia", ["Bandung", "Jakarta", "Surabaya"], ["Global"], placeholder));

CalendarTree.push(new CalendarLayer("Ipoh", [], ["Malaysia"], placeholder));
CalendarTree.push(new CalendarLayer("Johor Bahru", [], ["Malaysia"], placeholder));
CalendarTree.push(new CalendarLayer("Kota Kinabalu", [], ["Malaysia"], placeholder));
CalendarTree.push(new CalendarLayer("Kuala Lumpur", [], ["Malaysia"], placeholder));
CalendarTree.push(new CalendarLayer("Kuantan", [], ["Malaysia"], placeholder));
CalendarTree.push(new CalendarLayer("Kuching", [], ["Malaysia"], placeholder));
CalendarTree.push(new CalendarLayer("Melaka", [], ["Malaysia"], placeholder));
CalendarTree.push(new CalendarLayer("Nilai", [], ["Malaysia"], placeholder));
CalendarTree.push(new CalendarLayer("Penang", [], ["Malaysia"], placeholder));

CalendarTree.push(new CalendarLayer("Malaysia", ["Ipoh", "Johor Bahru", "Kota Kinabalu", "Kuala Lumpur", 
                                                "Kuantan", "Kuching", "Melaka", "Nilai", "Penang"], ["Global"], placeholder));

CalendarTree.push(new CalendarLayer("Manila", [], ["Philipines"], placeholder));

CalendarTree.push(new CalendarLayer("Philipines", ["Manila"], ["Global"], placeholder));

CalendarTree.push(new CalendarLayer("Singapore", [], ["Singapore"], placeholder));

CalendarTree.push(new CalendarLayer("Singapore", ["Singapore"], ["Global"], placeholder));

CalendarTree.push(new CalendarLayer("Global", ["Australia","China","Indonesia","Malaysia","Philipines","Singapore"], [], placeholder));


let CalendarLevel = {
    Global: {
        childCalendar: [Australia,
                        China,
                        Indonesia,
                        Malaysia,
                        Philipines,
                        Singapore],
        parentCalendar: []
    },
    Australia: {
        childCalendar: [Adelaide,
                        Brisbane,
                        Melbourne,
                        Perth,
                        Sydney],
        parentCalendar: [Global]
    },
    China: {
        childCalendar: [Beijing,
                        HongKong],
        parentCalendar: [Global]
    },
    Indonesia: {
        childCalendar: [Bandung,
                        Jakarta,
                        Surabaya],
        parentCalendar: [Global]
    },
    Malaysia: {
        childCalendar: [Ipoh,
                        Johor,
                        Kota,
                        Kuala,
                        Kuching,
                        Melaka,
                        Nilai,
                        Penang],
        parentCalendar: [Global]
    },
    Philipines: {
        childCalendar: [Manila],
        parentCalendar: [Global]
    },
    Singapore: {
        childCalendar: [],
        parentCalendar: [Global]
    },
    Melbourne: {
        childCalendar: [],
        parentCalendar: [Australia]
    },
    Sydney: {
        childCalendar: [],
        parentCalendar: [Australia]
    },
    Perth: {
        childCalendar: [],
        parentCalendar: [Australia]
    },
    Adelaide: {
        childCalendar: [],
        parentCalendar: [Australia]
    },
    Brisbane: {
        childCalendar: [],
        parentCalendar: [Australia]
    },
    BeiJing: {
        childCalendar: [],
        parentCalendar: [China]
    },
    HongKong: {
        childCalendar: [],
        parentCalendar: [China]
    },
    Bandung: {
        childCalendar: [],
        parentCalendar: [Indonesia]
    },
    Jakarta: {
        childCalendar: [],
        parentCalendar: [Indonesia]
    },
    Surabaya: {
        childCalendar: [],
        parentCalendar: [Indonesia]
    },
    Ipoh: {
        childCalendar: [],
        parentCalendar: [Malaysia]
    },
    Kota: {
        childCalendar: [],
        parentCalendar: [Malaysia]
    },
    Kuala: {
        childCalendar: [],
        parentCalendar: [Malaysia]
    },
    Kuantan: {
        childCalendar: [],
        parentCalendar: [Malaysia]
    },
    Kuching: {
        childCalendar: [],
        parentCalendar: [Malaysia]
    },
    Melaka: {
        childCalendar: [],
        parentCalendar: [Malaysia]
    },
    Nilai: {
        childCalendar: [],
        parentCalendar: [Malaysia]
    },
    Penang: {
        childCalendar: [],
        parentCalendar: [Malaysia]
    },
    Johor: {
        childCalendar: [],
        parentCalendar: [Malaysia]
    },
    Manila: {
        childCalendar: [],
        parentCalendar: [Philipines]
    }
}
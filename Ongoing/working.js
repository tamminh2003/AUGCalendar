(function augBuildBranchSelectField_Report() {
    let augBranchSelect = {};

    /**
     * Function to build select options based on authentication and department this will affect augBranchSelect variable declared above
     * @function augBuildBranchSelectObject
     * @param {String} crmRole - crm Role
     * @param {Array} crmDepartment - crm Department this is array of String
     */
    function augBuildBranchSelectObject(crmRole, crmDepartment) {
        const augBranchSelectTemplate = {
            "Australia": ["AUG Adelaide", "AUG Brisbane", "AUG Melbourne", "AUG Perth", "AUG Sydney"],
            "Malaysia": ["AUG Ipoh", "AUG Johor Bahru", "AUG Kota Bharu", "AUG Kuala Lumpur", "AUG Kuantan", "AUG Kuching", "AUG Melaka", "AUG Nilai", "AUG Penang", "AUG Segamat", "AUG Subang Jaya"],
            "Indonesia": ["AUG Bandung", "AUG Jakarta", "AUG Surabaya"],
            "Singapore": ["AUG Singapore"],
            "China": ["AUG Beijing"],
            "Hong Kong SAR": ["AUG Hong Kong"],
            "Philippines": ["AUG Manila"]
        };

        if (crmRole == "Administrator") {
            augBranchSelect = augBranchSelectTemplate;
            return;
        }

        for (let [country, offices] of Object.entries(augBranchSelectTemplate)) {
            for (let [id, department] of Object.entries(crmDepartment)) {
                if (offices.includes(department)) {
                    if (!augBranchSelect[country]) augBranchSelect[country] = [];
                    augBranchSelect[country].push(department);
                }
            }
        }
    }

    if (userDepartments && userCrmRoleName) augBuildBranchSelectObject(userCrmRoleName, userDepartments);

    let selectBranchCountry, selectBranchOffice;

    let templateSelectField = document.querySelector("#report-chfilter-examples > div.filter-field.filter-field-crm.chfilter-field-enum");
    let filterContainer = document.querySelector("#report-filter-chfilter");

    // Select the Branch Country and Branch Office Select Fields
    document.querySelectorAll(".filter-field.filter-field-crm.chfilter-field-enum").forEach((item) => {
        item.querySelector("label").innerHTML == 'Lead: Branch Country "is equal to"' && (selectBranchCountry = item);
        item.querySelector("label").innerHTML == 'Lead: Branch "is equal to"' && (selectBranchOffice = item);
    });

    // Hide these two fields
    selectBranchCountry.style.display = "none";
    selectBranchOffice.style.display = "none";

    // Add new select field
    let newSelectFieldContainer = filterContainer.appendChild(templateSelectField.cloneNode(true));
    newSelectFieldContainer.querySelector("label").innerHTML = "Branch Office";
    let newSelectDiv = newSelectFieldContainer.appendChild(BX.create("span", { "attrs": { "class": "report-filter-vcc" }, "style": { "position": "relative" } }));
    let textField = newSelectDiv.appendChild(BX.create("input", { "attrs": { "type": "text" } }));

    // Build dropdown
    let dropdownContainer = BX.create("div", { "attrs": { "class": "dropdown-container" }, "style": { "visibility": "hidden", "position": "absolute", "height": "10em", "overflowY": "scroll", "backgroundColor": "white" } });

    Object.keys(augBranchSelect).forEach(country => {
        let countryContainer = dropdownContainer.appendChild(BX.create("div", { "attrs": { "class": "country-container" } }));
        let countrySelect = countryContainer.appendChild(BX.create("a", { "attrs": { "class": "countrySelect", "href": "#" }, "style": { "display": "block" }, "text": country }));

        let countrySelectHandler = function (e) {
            this.value = country;
            augSetBranchCountry(country);
            dropdownContainer.style.visibility = "hidden";
            e.preventDefault();
        }
        countrySelect.addEventListener("click", countrySelectHandler.bind(textField));

        let officeContainer = countryContainer.appendChild(BX.create("div", { "attrs": { "class": "office-container" } }));

        augBranchSelect[country].forEach(office => {
            let officeSelect = officeContainer.appendChild(BX.create("a", { "attrs": { "class": "officeSelect", "href": "#" }, "style": { "display": "block" }, "text": office }));

            let officeSelectHandler = function (e) {
                this.value = office;
                augSetOfficeBranch(office);
                dropdownContainer.style.visibility = "hidden";
                e.preventDefault();
            }
            officeSelect.addEventListener("click", officeSelectHandler.bind(textField));
        });
    });
    newSelectDiv.appendChild(dropdownContainer); //<== Add dropdown menu to new select span

    // Auxilary Functions
    let dropdownContainerMouse;

    textField.addEventListener("focus", (e) => {
        dropdownContainer.style.visibility = "visible";
    });

    textField.addEventListener("blur", (e) => {
        if (!dropdownContainerMouse) {
            dropdownContainer.style.visibility = "hidden";
        }
    });

    dropdownContainer.addEventListener("mouseenter", (e) => {
        dropdownContainerMouse = true;
    });

    dropdownContainer.addEventListener("mouseleave", (e) => {
        dropdownContainerMouse = false;
    });

    /**
     * Local function for handling textField event
     * @function textFieldHandler
     * @param {Event} e - Event passed in by EventListener
     * @returns nothing
     */
    function textFieldHandler(e) {
        let searchText = e.target.value.toUpperCase();
        let countryContainerArray = this.querySelectorAll(".country-container");
        let officeContainerArray = this.querySelectorAll(".office-container");

        if (!searchText) {
            this.querySelectorAll("a").forEach(option => option.style.display = "block"); // <== Set all the option visible if text field empty.
            countryContainerArray.forEach(countryContainer => countryContainer.style.display = "block");
            return;
        }

        this.querySelectorAll("a").forEach(option => option.style.display = "none");
        countryContainerArray.forEach(countryContainer => countryContainer.style.display = "none");

        let matchingCountry = Object.keys(augBranchSelect)
            .map(country => country.toUpperCase())
            .reduce((accu, curr) => accu || (curr.includes(searchText)), false);

        if (matchingCountry) { // <== Matching country
            countryContainerArray.forEach(countryContainer => {
                if (countryContainer.querySelector("a").innerText.toUpperCase().includes(searchText)) {
                    countryContainer.style.display = "block";
                    countryContainer.querySelectorAll("a").forEach(option => option.style.display = "block");
                    return;
                }
            });
            return;
        }

        officeContainerArray.forEach(officeContainer => {
            let optionArray = officeContainer.querySelectorAll("a");
            optionArray.forEach(option => {
                if (option.innerText.toUpperCase().includes(searchText)) {
                    option.style.display = "block";
                    officeContainer.style.display = "block";
                    officeContainer.parentElement.style.display = "block";
                    officeContainer.parentElement.querySelector("a").style.display = "block";
                }
            });
        })
    }
    textField.addEventListener("keyup", textFieldHandler.bind(dropdownContainer));


    /**
     * Local function that handling setting value of the original Country filter field
     * @function augSetBranchCountry
     * @param {Srting} country - Name of selected country
     */
    function augSetBranchCountry(country) {
        const selectTable = {
            "Australia": 110,
            "China": 111,
            "Hong Kong": 112,
            "Indonesia": 113,
            "Malaysia": 114,
            "Philippines": 115,
            "Singapore": 116
        }
        selectBranchCountry.querySelector("select").value = selectTable[country];
        selectBranchOffice.querySelector("select").value = "";
    }

    /**
     * Local function that handling setting value of the original Office filter field
     * @function augSetOfficeBranch
     * @param {String} office - Name of selected office
     */
    function augSetOfficeBranch(office) {
        const selectTable = {
            "AUG Adelaide": 63807,
            "AUG Brisbane": 63808,
            "AUG Melbourne": 63809,
            "AUG Perth": 63810,
            "AUG Sydney": 63811,
            "AUG Beijing": 63812,
            "AUG Hong Kong": 63813,
            "AUG Bandung": 63814,
            "AUG Jakarta": 63815,
            "AUG Surabaya": 63816,
            "AUG Ipoh": 63817,
            "AUG Johor Bahru": 63818,
            "AUG Kota Bharu": 63819,
            "AUG Kota Kinabalu": 63820,
            "AUG Kuala Lumpur": 63821,
            "AUG Kuantan": 63822,
            "AUG Kuching": 63823,
            "AUG Melaka": 63824,
            "AUG Nilai": 63825,
            "AUG Penang": 63826,
            "AUG Segamat": 63827,
            "AUG Subang Jaya": 63828,
            "AUG Manila": 63829,
            "AUG Singapore": 63830
        }
        selectBranchCountry.querySelector("select").value = "";
        selectBranchOffice.querySelector("select").value = selectTable[office];
    }

})()
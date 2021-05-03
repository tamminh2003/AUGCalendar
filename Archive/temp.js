(function (window) {

  let Observer = {

    Utility: window.AUG.Utility,

    startColorChangeObserver: function startColorChangeObserver() {
      // placeholder for colorChangeObserver.observe( ... ) ;
    },

    startMutationObserver: function startMutationObserver() {
      this.mutationObserver.observe(document.querySelector('body'), { childList: true });
    },

    getColorChangeObserver: function getColorChangeObserver() {

      let colorChangeObserver = new MutationObserver(

        (function (m) {

          console.log("-----------------------------");
          console.log("colorChangeObserver activated");

          for (const eachM of m) {

            console.log(eachM);
            if (eachM.target.className.includes("calendar-field-select-icon")) {

              console.log("color / event type of Event");
              console.log(eachM.target.style.backgroundColor)

              console.log("check if color in defaultColors");
              if (!this.Utility.defaultColors.includes(this.Utility.rgbToHex(eachM.target.style.backgroundColor).toUpperCase())) { // <-- Check if current color matches with defaultColors
                console.log("color not in defaultColors - set returnPreviousFlag");
                this.returnPreviousFlag = true;

                console.log('"click" to open color selector');
                document.querySelector('.calendar-field.calendar-field-select.calendar-field-tiny').click();
              }

              else {
                console.log("color in defaultColors - set previousColor to new current color");

                console.log("get previousColor from current color on color selector icon");
                this.previousColor = this.Utility.defaultColors.filter(

                  (function (currentValue) { // <-- filter defaultColors for previousColor
                    return currentValue == this.Utility.rgbToHex(document.querySelector('div.calendar-field-select-icon').style.backgroundColor).toUpperCase()
                  }).bind(this)

                )[0]

                console.log(`Observer.previousColor = ${this.previousColor}`); // <-- check value of previousColor

                if (!this.previousColor) {
                  console.log("current color selector icon not in defaultColors");

                  console.log("set previousColor to default General");
                  this.previousColor = "#092CC"; // <-- set previousColor to General
                }

                console.log('set clickTarget based on previousColor');
                this.clickTarget = this.Utility.defaultColors.indexOf(this.previousColor) + 1;
                console.log(`Observer.clickTarget = ${this.clickTarget}`);
              }
            }
          }
        }).bind(this)

      )

      this.colorChangeObserver = colorChangeObserver;

    }, // <-- End of getColorChangeObserver method

    getMutationObserver: function getMutationObserver() {

      let mutationObserver = new MutationObserver(

        (function (m) {

          console.log("--------------------------");
          console.log("mutationObserver activated");
          console.log(m);

          for (const eachM of m) {

            // Adding Nodes Handlers
            if (eachM.addedNodes.length > 0) {

              // Main popup added handler
              if (eachM.addedNodes[0].className.includes('popup-window calendar-simple-view-popup')) {

                console.log("simple event editor popup added");
                console.log(eachM);

                console.log("set initPopupFlag");
                this.initPopupFlag = true;
                console.log('"click" to open color selector');
                eachM.addedNodes[0].querySelector('.calendar-field.calendar-field-select.calendar-field-tiny').click();
              }

              // Color Selector popup added handler
              if (eachM.addedNodes[0].id.includes('menu-popup-color-select')) {

                console.log("color selector popup added");
                console.log(eachM);

                // Add label to color
                console.log("add color label");
                for (const eachElem of eachM.addedNodes[0].querySelectorAll('.menu-popup-item-text')) {
                  eachElem.style.display = 'inline';
                  switch (eachElem.innerHTML) {
                    case "#86B100":
                      eachElem.innerHTML = "AUG Travel";
                      break;
                    case "#0092CC":
                      eachElem.innerHTML = "General";
                      break;
                    case "#00AFC7":
                      eachElem.innerHTML = "Marketing Promotions";
                      break;
                    case "#DA9100":
                      eachElem.innerHTML = "Meeting";
                      break;
                    case "#00B38C":
                      eachElem.innerHTML = "Personal";
                      break;
                    case "#DE2B24":
                      eachElem.innerHTML = "Visits/PR";
                      break;
                    case "#BD7AC9":
                      eachElem.innerHTML = "Social Media";
                      break;
                    case "#838FA0":
                      eachElem.innerHTML = "Others";
                      break;
                    default:
                      eachElem.parentElement.remove();
                      break;
                  };
                }
                // <-- End of add label to color

                console.log("hide color selector");
                eachM.addedNodes[0].style.visibility = "hidden";

                console.log("extend color selector");
                eachM.addedNodes[0].style.width = '190px';

                // Initiate new simple event editor popup
                if (this.initPopupFlag) {
                  console.log("<<--init new simple event editor popup-->");

                  console.log("clear initPopupFlag flag");
                  this.initPopupFlag = false;

                  console.log("get previousColor from current color on color selector icon");
                  this.previousColor = this.Utility.defaultColors.filter(

                    (function (currentValue) { // <-- filter defaultColors for previousColor
                      return currentValue == this.Utility.rgbToHex(document.querySelector('div.calendar-field-select-icon').style.backgroundColor).toUpperCase()
                    }).bind(this)

                  )[0]

                  console.log(`Observer.previousColor = ${this.previousColor}`); // <-- check value of previousColor

                  if (!this.previousColor) {
                    console.log("current color selector icon not in defaultColors");

                    console.log("set previousColor to default General");
                    this.previousColor = "#092CC"; // <-- set previousColor to General
                  }

                  console.log('set clickTarget based on previousColor');
                  this.clickTarget = this.Utility.defaultColors.indexOf(this.previousColor) + 1;
                  console.log(`Observer.clickTarget = ${this.clickTarget}`);

                  console.log('"click" color selector');
                  eachM.addedNodes[0].querySelector(`span.menu-popup-item:nth-child(${this.clickTarget})`).click(); // <-- Closing of color selector Popup

                  // Setup colorChangeObserver
                  console.log("Setup colorChangeObserver");
                  this.colorChangeObserver.observe(document.querySelector('.calendar-field-select-icon'), { attributeFilter: ["style"] });
                  // <-- End of setting up colorChangeObserver

                  // <-- Check if color selector popup close at every branch
                }

                else if (this.returnPreviousFlag) {
                  console.log("clear returnPreviousFlag");
                  this.returnPreviousFlag = false;

                  console.log('"click" color selector');
                  eachM.addedNodes[0].querySelector(`span.menu-popup-item:nth-child(${this.clickTarget})`).click(); // <-- Closing of color selector Popup 
                }

                else {
                  // Show popup <-- Last possible case
                  console.log("show color selector popup - last possible case");
                  eachM.addedNodes[0].style.visibility = "visible";
                }

              }

              // Section Selector Popup Handler
              if (eachM.addedNodes[0].id.includes('menu-popup-section-select')) {
                this.sectionSelectorFlag = true; // <-- currently unused
              }

            }
            // <------------------------------

            // Removing Nodes Handlers
            if (eachM.removedNodes.length > 0) {

              // Main popup removed handler
              if (eachM.removedNodes[0].className.includes('popup-window calendar-simple-view-popup')) {
                console.log("popup removed");
                console.log(eachM);

                this.colorChangeObserver.disconnect();
                // disconnect Observer.colorChangeObserver;
              }

            }
            // <------------------------------

          }


        }).bind(this)

      )

      this.mutationObserver = mutationObserver;

    }, // <-- End of getMutationObserver method


  } // <-- End of Obsever Object Definition --------

  window.AUG.Observer = Observer;

})(window);
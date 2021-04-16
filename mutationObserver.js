
// SECTION colorPopupObserver
// Set the type of the event matching with the color
(function () {
    if (window.colorPopupObserver) {
      delete window.colorPopupObserver
    }
  
    window.colorPopupObserver = new MutationObserver(function (m) {
      regexPattern = /.*popup-window-content-menu-popup-color-select.*/g
      for (const eachM of m) {
        if (regexPattern.test(eachM.target.id)) {
          for (const eachElem of eachM.target.querySelectorAll('.menu-popup-item-text')) {
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
              case "#AB7917":
                eachElem.parentElement.remove();
                break;
              case "#E97090":
                eachElem.parentElement.remove();
                break;
              default:
                console.log("uncaught case");
                break;
            };
          }
        }
      }
    });
  
    window.colorPopupObserver.observe(document.querySelector('body'), { subtree: true, childList: true });
  })();
            // <-- End of setting event type matching with color
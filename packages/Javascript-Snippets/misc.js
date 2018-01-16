/* Stop a keyboard shortcut from finishing */

document.addEventListener("keydown", function(e) {
    if (e.keyCode == 80 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
         e.preventDefault();
         alert('caught you');
    }
}, false);

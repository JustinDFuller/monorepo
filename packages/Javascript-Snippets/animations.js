/*********************************************
* Keep an element scrolled into a given area *
**********************************************/

$(window).scroll(function() {
    var scrollDelay = 150; // delay after scrolling before item moves
    var scrollTime = 200; // amount of time animation takes

    var element = $('.element'); // element that will be scrolled
    var elementHeight = element.height();

    var containingElement = $('.containingElement').height(); // container

    var beginScrolling = 200; // where to begin scrolling

    var pageHeight = $('body').height();
    var windowPosition = $(window).scrollTop();
    var bottomItemPosition = $("#footer").position().top;
    var distanceToBottomItem = bottomItemPosition - windowPosition;


    clearTimeout($.data(this, 'scrollTimer'));
    $.data(this, 'scrollTimer', setTimeout(function() {

        if (windowPosition > beginScrolling) {
            if (containingElement > pageHeight - distanceToBottomItem) {
                element.animate({
                    "top": pageHeight - distanceToBottomItem - elementHeight + "px"
                }, scrollTime);
            } else { // fixed position near bottom of area
                element.animate({
                    "top": containingElement - elementHeight + "px"
                }, scrollTime);
            }
        } else {
            element.animate({
                "top": "0"
            }, scrollTime);
        }

    }, scrollDelay));
  });
}

/**
 * Created by Jerome on 17/10/2015.
 */
(function($) {
    $.fn.centered = function(options) {
        var settings = $.extend({

            //Element to center (can contain anything)
            //Find way to refer to element without using hard string
            elem: $('.loading')

            //Element to target
            //TODO: Make multi-selector possible
            //targetelem: 'a',
        }, options);

        //We use this instead of .position() and .offset() as they are browser dependent
        //TODO: Research more
        //We get the Prototype of Jquery selector with [0]
        var coords = this[0].getBoundingClientRect(); //Returns Prototype

        //Co-ord Manipulation Here
        //TODO: Foreach adding to each co-ord spiner elem halfed
        //TODO: Wrap function in $.each to allow for multiple instances of plugin call

        //We use this to centerally position var elem onto var targetelem
        return settings.elem.css({
            position: 'absolute',
            top: coords.top,
            left: coords.right,
            right: coords.left,
            bottom: coords.bottom
        });
    };
}(jQuery));

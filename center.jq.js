/**
 * Created by Jerome on 17/10/2015.
 */
//TODO: Look into stopping plugin from running until page is loaded
//TODO: (use attribute to allow/disallow)
(function($) {
    $.fn.centered = function(options) {

        var settings,coords,posalign,getpos,finalpos,elemdim;

        settings = $.extend({

            //Element to center (can contain anything)
            //Find way to refer to element without using hard string
            elem: $('.loading'),
            position: 'topLeft',
            offset: '',
            offset2: '',
            callback: ''
        }, options);

        //Positioning Alignment Array
        //TODO: use existing js positioning properties if exist
        posalign = ['top','topLeft','topRight','topCenter','center','centerLeft','centerRight','centerCenter','bottom','bottomLeft','bottomRight','bottomCenter'];

        //We get the Prototype of Jquery selector with [0]
        //NOTE: Unless this is put in document.ready() will return error
        coords = $(this)[0].getBoundingClientRect(); //Returns Prototype

       // console.log(coords);

        elemdim = settings.elem[0].getBoundingClientRect();

        //Get key (array position) for position setting
        getpos = posalign.lastIndexOf(settings.position);

        finalpos = [coords.top,coords.bottom,coords.left,coords.right];


        //TODO: Group attributes better to remove DRY violation
        //TODO: (maybe use case's: multiple times in switch statement) - TRIED (WORKS IN CHROME BUT NOT VALID)
        if(!isNaN(getpos)) {
            switch(settings.position) {

                //Take top and topCenter
                case posalign[0]:
                case posalign[3]:
                default:

                    //left px formula
                    finalpos[2] = (coords.width/2 - elemdim.width/2);

                    //Top px formula
                    finalpos[0] = coords.top-elemdim.top;

                    //Remove right positioning
                    finalpos[3] = 'auto';

                    break;

                //Takes topLeft
                case posalign[1]:
                    //Remove right positioning
                    finalpos[3] = 'auto';
                    break;

                //Takes topRight
                case posalign[2]:

                    finalpos[2] = finalpos[3] - (elemdim.width);
                    finalpos[3] = 'auto';
                    break;

                //Takes center
                case posalign[5]:



                    break;

            }
        }



        //We use this to centerally position var elem onto var targetelem
        return settings.elem.css({
            position: 'absolute',
            top: finalpos[0],
            left: finalpos[2],
            right: finalpos[3],
            bottom: finalpos[1]
        });
    };
}(jQuery));

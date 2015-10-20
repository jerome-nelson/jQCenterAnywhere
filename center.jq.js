/**
 * Created by Jerome on 17/10/2015.
 */
//TODO: Look into stopping plugin from running until page is loaded
//TODO: (use attribute to allow/disallow)
(function($) {
    $.fn.centered = function(options) {

        var settings,coords,posalign,getpos,finalpos,elemcoords,totwidth,totheight;

        settings = $.extend({

            //Element to center (can contain anything)
            //Find way to refer to element without using hard string
            elem: $('.loading'),
            position: 'bottom',
            offsetX: '', //horizontal movement
            offsetY: '', //Vertical Movement
            offsetScope: $(this),//Default is targeted element but will take any other selector
            callback: ''
        }, options);


        //Positioning Alignment Array
        //TODO: use existing js positioning properties if exist
        posalign = ['top','topLeft','topRight','topCenter','center','centerLeft','centerRight','bottom','bottomLeft','bottomRight','bottomCenter'];

        //We get the Prototype of Jquery selector and elem with [0]
        coords = $(this)[0].getBoundingClientRect();
        elemcoords = settings.elem[0].getBoundingClientRect();

        //Array containing all positioning co-ords for selector. We manipulate to get final results
        finalpos = [coords.top,coords.bottom,coords.left,coords.right];

        //If outerHeight matches current height and width then there is no extra padding,borders,margins to worry about
        if(parseInt(coords.height,10) !== $(this).outerHeight(true)) {totheight = ($(this).outerHeight(true) - parseInt(coords.height,10))/2;}
        else { totheight = '0';}

        //Now same for outerWidth
        if(parseInt(coords.width,10) !== $(this).outerWidth(true)) { totwidth = ($(this).outerWidth(true) - parseInt(coords.width,10))/2;}
        else { totwidth = '0';}

        //TODO: Group attributes better to remove DRY violation
        //TODO: (maybe use case's: multiple times in switch statement) - TRIED (WORKS IN CHROME BUT NOT VALID)

        //Get key (array position) for position setting (we use for switch)
        getpos = posalign.lastIndexOf(settings.position);

        if(!isNaN(getpos)) {
            switch(settings.position) {

                //Take top, topCenter
                case posalign[0]:
                case posalign[3]:
                default:

                    //left px formula
                    finalpos[2] = (coords.width/2 - elemcoords.width/2);
                    //Top px formula
                    finalpos[0] = coords.top;
                    //Remove right positioning
                    finalpos[3] = 'auto';
                    break;

                //Takes center
                case posalign[4]:
                    finalpos[0] = (totheight+(coords.height-elemcoords.height)/2);
                    //left px formula
                    finalpos[2] = (coords.width/2 - elemcoords.width/2);
                    break;

                //Takes topLeft
                case posalign[1]:

                    //Remove right positioning
                    finalpos[3] = 'auto';
                    break;

                //Takes topRight
                case posalign[2]:

                    finalpos[2] = finalpos[3] - (elemcoords.width);
                    finalpos[3] = 'auto';
                    break;

                //Takes centerLeft (center is at top)
                case posalign[5]:

                    //Top px formula
                    finalpos[0] = (totheight+(coords.height-elemcoords.height)/2);
                    //Remove right positioning
                    finalpos[3] = 'auto';
                    break;

                //Takes centerRight
                case posalign[6]:

                    //Top px formula
                    finalpos[0] = (totheight+(coords.height-elemcoords.height)/2);
                    finalpos[2] = finalpos[3] - (elemcoords.width);
                    finalpos[3] = 'auto';
                    break;

                //Takes bottom
                case posalign[7]:

                    //left px formula
                    finalpos[2] = (coords.width/2 - elemcoords.width/2);
                    finalpos[0] = coords.bottom-elemcoords.height;
                    finalpos[3] = 'auto';
                    finalpos[1] = 'auto';
                    break;

                //Takes bottomLeft
                case posalign[8]:

                    finalpos[0] = coords.bottom-elemcoords.height;
                    finalpos[3] = 'auto';
                    finalpos[1] = 'auto';
                    break;

                //Takes bottomRight
                case posalign[9]:
                    //Top px formula
                    finalpos[0] = coords.bottom-elemcoords.height;
                    finalpos[2] = finalpos[3] - (elemcoords.width);
                    break;

                //Takes bottomCenter
                case posalign[10]:

                    //Top px formula
                    finalpos[0] = coords.bottom-elemcoords.height;
                    //left px formula
                    finalpos[2] = (coords.width/2 - elemcoords.width/2);
                    finalpos[3] = 'auto';
                    break;
            }
        }



        //We use this to centerally position var elem onto var targetelem
        return this.each(function() {
            settings.elem.css({
                position: 'absolute',
                top: finalpos[0],
                left: finalpos[2],
                right: finalpos[3],
                bottom: finalpos[1]
            });
        });
    };
}(jQuery));

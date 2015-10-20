/**
 * Created by Jerome on 17/10/2015.
 */
//TODO: Look into stopping plugin from running until page is loaded (use attribute to allow/disallow)
(function($) {
    $.fn.centered = function(options) {

        var settings,coords,posalign,getpos,finalpos,elemcoords,totwidth,totheight,num;
        settings = $.extend({}, $.fn.centered.defaults, options);

        //TODO: Remove dependency on this (find assoc js function or native CS attribute names)
        posalign = ['top','topLeft','topRight','topCenter','center','centerLeft','centerRight','bottom','bottomLeft','bottomRight','bottomCenter'];

        //We get the Prototype of Jquery selector and elem with [0]
        coords = $(this)[0].getBoundingClientRect();
        elemcoords = settings.elem[0].getBoundingClientRect();

        //Array containing all positioning co-ords for selector. We manipulate to get final results
        //If outerHeight matches current height and width then there is no extra padding,borders,margins to worry about
        finalpos = [coords.top,coords.bottom,coords.left,coords.right];
        totheight = $.fn.centered.checkdimension(parseInt(coords.height,10), $(this).outerHeight(true));
        totwidth = $.fn.centered.checkdimension(parseInt(coords.width,10), $(this).outerWidth(true));


        //TODO: Group attributes better to remove DRY violation
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
                top:   $.fn.centered.offsetCalc(settings.offsetX,finalpos[0]),
                left: $.fn.centered.offsetCalc(settings.offsetY,finalpos[2]),
                right: finalpos[3],
                bottom: finalpos[1]
            });
        });
    };

    //Allows users to access options as needed (probably not needed just testing)
    $.fn.centered.defaults = {
        elem: $('.loading'), //Element to move
        position: 'bottom', //Position to give
        offsetX: '', //horizontal movement
        offsetY: '', //Vertical Movement
        //TODO: Once code is tidier (offsetScope - allowing person to pick element to base offset calcs off).
        triggerOn: function() {}, //When to trigger movement
        callback: function() {} //What to trigger when movement is done

    };


    $.fn.centered.checkdimension = function(ladimension,laelem) {

        var result;

        if(ladimension !== laelem) {
                result = (laelem - ladimension)/2;
        }
        else {
            result = '0';
        }

        return result;

    };
    
    
    $.fn.centered.offsetCalc = function(offsetType,compareType) {

        var calc;

        if(offsetType.indexOf('px') >= 0 || offsetType.indexOf('%') >= 0){
            num = parseInt(offsetType);

            //indexOf will return -1 if result is false
            if(num < 0) {
                num *= -1;
                if(offsetType.indexOf('%') >= 0) {
                    calc = compareType - (compareType/100*num);
                }
                else {
                    calc = (parseInt(compareType) + parseInt(offsetType)+'px');
                }
            }
            else {
                if (offsetType.indexOf('%') >= 0) {
                    calc = compareType + (compareType / 100 * num);
                }
                else {
                    calc = (parseInt(compareType) + parseInt(offsetType)+'px');
                }

            }
        }
        else {
            return compareType;
        }
        
        return calc;
    }
}(jQuery));

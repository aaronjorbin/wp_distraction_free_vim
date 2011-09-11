(function($){
    var visualMode = false,
        commands = {
            ':w' : function(){ fullscreen.save(); },
            ':q': function(){ fullscreen.off(); },
            'i': function(){ enterInputMode();  }
        };

   
    // cross browser listeners
    function addEvent(object, event, method) {
        if (object.addEventListener)
            object.addEventListener(event, method, false);
        else if(object.attachEvent)
            object.attachEvent('on'+event, function(){ method(window.event) });
    };
     
    function removeEvent(object, event, method) {
        if (object.removeEventListener)
            object.removeEventListener(event, method, false);
        else if(object.detachEvent)
            object.detachEvent('on'+event, function(){ method(window.event) });
    };

    /**
     * The steps we take when we enter Input Mode
     */
     function enterInputMode(){
        // focus on the input areat
        addEvent(document, 'keydown', listenForEscape);
        removeEvent(document, 'keydown', listenForCommands); 
        $('#dfvInput').detach();
        $('#wp_mce_fullscreen').focus();
        visualMode = false;
     }
     
    /**
     * The stesp we take when we enter Visual Mode
     */
    function enterVisualMode(){
        visualMode = true;
        addEvent(document, 'keydown', listenForCommands); 
        removeEvent(document, 'keydown', listenForEscape);
        $('#wp_mce_fullscreen').trigger('blur');
        $('#wp-fullscreen-count').append('<input id="dfvInput" style="background:black;color:white;border:none;"  />');
        $('#dfvInput').focus();

    }
 
    function listenForEscape(event){
        key = event.keyCode;
        if ( fullscreen.settings.visible && key == 27) 
            enterVisualMode();
    }

    function listenForCommands(event){
        key = event.keyCode;
        if (  fullscreen.settings.visible && key == 13)
            processCommand();
    }

    function processCommand(){
        var cb;
        if ( commands.hasOwnProperty( $('#dfvInput').val() ) ){
             cb = commands[ $('#dfvInput').val() ];
             cb();
        }
    }

    // Instead of closing DFW, escape should show the menubar and enter visual mode
    jQuery(document).bind( 'wp_CloseOnEscape', function(e, data){ 
        data.cb = function(e) { 
            fullscreen.bounder( 'showToolbar', 'hideToolbar', 10000, e );  
            if (visualMode == false)
                enterVisualMode();  
            else
                $('#dfvInput').focus();
        };   
    });

    jQuery('#wp_mce_fullscreen').focus('enterInputMode');

})(jQuery);

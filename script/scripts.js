    

;(function($){
    $.extend( $.ui.tabs.prototype, {
        rotation: null,
        rotationDelay: null,
        continuing: null,
        rotate: function( ms, continuing ) {
            var self = this,
                o = this.options;

            if((ms > 1 || self.rotationDelay === null) && ms !== undefined){//only set rotationDelay if this is the first time through or if not immediately moving on from an unpause
                self.rotationDelay = ms;
            }

            if(continuing !== undefined){
                self.continuing = continuing;
            }

            var rotate = self._rotate || ( self._rotate = function( e ) {
                clearTimeout( self.rotation );
                self.rotation = setTimeout(function() {
                    var t = o.selected;
                    self.select( ++t < self.anchors.length ? t : 0 );
                }, ms );

                if ( e ) {
                    e.stopPropagation();
                }
            });

            var stop = self._unrotate || ( self._unrotate = !continuing
                ? function(e) {
                    if (e.clientX) { // in case of a true click
                        self.rotate(null);
                    }
                }
                : function( e ) {
                    t = o.selected;
                    rotate();
                });

            // start rotation
            if ( ms ) {
                this.element.bind( "tabsshow", rotate );
                this.anchors.bind( o.event + ".tabs", stop );
                rotate();
            // stop rotation
            } else {
                clearTimeout( self.rotation );
                this.element.unbind( "tabsshow", rotate );
                this.anchors.unbind( o.event + ".tabs", stop );
                delete this._rotate;
                delete this._unrotate;
            }

            //rotate immediately and then have normal rotation delay
            if(ms === 1){
                //set ms back to what it was originally set to
                ms = self.rotationDelay;
            }

            return this;
        },
        pause: function() {
            var self = this,
                o = this.options;

            self.rotate(0);
        },
        unpause: function(){
            var self = this,
                o = this.options;

            self.rotate(1, self.continuing);
        }
    });
})(jQuery);

    (function($) {
        "use strict";
        $(window).scroll(function () {
            if ($(document).scrollTop() <= 40) {
                $('#header-full').removeClass('small');
                $('.tabs-blur').removeClass('no-blur');
                $('#main-header').removeClass('small');
            } else {
                $('#header-full').addClass('small');
                $('.tabs-blur').addClass('no-blur');
                $('#main-header').addClass('small');
            }
        });
        $('#tabs-content-bottom').tabs({ show: { effect: "fade", duration: 200 }, hide: { effect: "fade", duration: 300 } });
        $('.slider-tabs.flexslider').flexslider({
            animation: "slide",
            pauseOnAction: true,
        });
        $('.slider-partners.flexslider').flexslider({
            animation: "slide",
            pauseOnAction: true,
            itemWidth: 163,
            itemMargin: 0
        });
        $('#slider-news.flexslider').flexslider({
            animation: "slide",
            pauseOnAction: true
        });
        $('#slider-event.flexslider').flexslider({
            animation: "slide",
            pauseOnAction: true
        });
        $( ".accordion" ).accordion({
            active: false,collapsible: true,heightStyle: "content",
        });
        $(".accordion").bind("accordionactivate", function(event, ui) {
            if ($(ui.newHeader).offset() != null) {
              ui.newHeader, // $ object, activated header
              $("html, body").animate({scrollTop: ($(ui.newHeader).offset().top)-100}, 500);
            }
        });
        $('.side-title .flexslider').flexslider({
            animation: "slide",
            pauseOnAction: true,
        });
        $("#content-side-title").show();
        setTimeout(function() { $("#content-side-title").animate({width: 'toggle'}); },100);
        $('.link-side-title').click(function() {
            $(this).next("#content-side-title").animate({width: 'toggle'});
        });
        $('a[data-rel]').each(function() {
            $(this).attr('rel', $(this).data('rel'));
        });
        $(".open-menu").click(function(){
            $("body").addClass("no-move");
        });
        $(".close-menu, .close-menu-big").click(function(){
            $("body").removeClass("no-move");
        });
    })(jQuery);
/******** Fancy Light Box*********/
$(document).ready(function() {
    /*
     * Simple image gallery. Uses default settings
     */

    $('.fancybox').fancybox();

    /*
     * Media helper. Group items, disable animations, hide arrows, enable media and button helpers.
     */
    $('.fancybox-media')
        .attr('rel', 'media-gallery')
        .fancybox({
            openEffect : 'none',
            closeEffect : 'none',
            prevEffect : 'none',
            nextEffect : 'none',

            arrows : false,
            helpers : {
                media : {},
                buttons : {}
            }
        });
});

/******** MixItUp plugin *****/
// http://mixitup.io
$(function () {

    var filterList = {

        init: function () {

            $('#portfoliolist').mixitup({
                targetSelector: '.b-portfolio__item',
                filterSelector: '.filter',
                effects: ['fade'],
                easing: 'snap',
                // call the hover effect
                onMixEnd: filterList.hoverEffect()
            });

        },

        hoverEffect: function () {

        }
    };

    // Run the show!
    filterList.init();

});
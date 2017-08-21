;(function($, Setrun){
    "use strict";

    /**
     *
     */
    Setrun.setPlugin('noty', (function ($) {
        var pub = {
            defaults: {
                layout: 'bottomLeft',
                type: 'success',
                timeout: 3000
            },
            init: function () {
            },
            success: function (msg, type, layout, timeout) {
                return pub.alert(msg, 'success', layout, timeout);
            },
            error: function (msg, type, layout, timeout) {
                return pub.alert(msg, 'error', layout, timeout);
            },
            alert: function (msg, type, layout, timeout) {
                if (typeof msg === 'undefined' || msg === null || msg === false) {
                    return false;
                }
                msg = $.trim(msg);
                if (msg === '') {
                    return false;
                }
                if (typeof window.Noty === 'undefined') {
                    alert(msg);
                } else {
                    type = type || pub.defaults.type;
                    layout = layout || pub.defaults.layout;
                    timeout = timeout || pub.defaults.timeout;
                    new Noty({
                        text: msg,
                        type: type,
                        layout: layout,
                        timeout: timeout
                    }).show();
                }
            }
        };

        return pub;
    }(jQuery)));

    /**
     *
     */
    Setrun.setPlugin('helper', {
        clearFilter : function () {
            var href = document.location.href.split('?')[0];
            history.pushState({}, '', href);
            this.pjaxReload();
        },

        /**
         *
         */
        pjaxReload : function () {
            $.pjax.reload({container: '#'+ $('[data-pjax-container]').attr('id'), 'timeout' : 3000});
        },

        /**
         *
         * @param slug
         * @param url
         * @param fn
         */
        slugify : function (slug, url, fn) {
            if (slug && url) {
                Setrun.fn.request({slug:slug}, function (res) {
                    if (typeof res.slug !== 'undefined' && typeof fn === 'function') {
                        fn(res.slug);
                    }
                }, url);
            }
        },

        /**
         *
         * @param object
         */
        notyErrors : function (object, fn) {
            var timeout = 50;
            if (typeof object.errors !== 'undefined') {
                if (typeof Noty !== 'undefined') {
                    Noty.closeAll();
                    $.each(object.errors, function (key, value) {
                        if (typeof fn === 'function') {
                            fn(key, value);
                        }
                        setTimeout(function () {
                            Setrun.plugin('noty').error(value);
                        }, timeout);
                        timeout = timeout + 50;
                    });
                }
            }
        }
    });


})(jQuery, Setrun);
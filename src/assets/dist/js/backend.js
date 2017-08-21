;(function($, Setrun){
    "use strict";

    var Component = {};

    Component.autoload = true;

    /**
     * Event handlers
     * @type {object}
     */
    Component.handlers = {
        clearFilterHandle : {
            el: '#clear-filter',
            ev: 'click'
        },
        ajaxCompleteHandle : {
            ev: 'ajaxComplete'
        },
        afterValidateHandle : {
            el : '.form',
            ev : 'afterValidate'
        },
        ajaxSubmitFormHandle : {
            ev : 'beforeSubmit'
        },
        ajaxDeleteItemHandle : {
            el : '.ajax-delete-item',
            ev : 'click'
        }
    };

    /**
     * Init function
     * @return {void}
     */
    Component.init = function()
    {
        $('body').tooltip({
            selector: '[title]'
        });
        $('[data-toggle="popover"]').popover({
            placement : 'top'
        });
        if (this.checkEmptyRow()){
            $.pjax.disable();
        }
    };



    /**
     * Create a handler for the clear filters
     * @param {object} e Event object
     */
    Component.clearFilterHandle = function (e)
    {
        Setrun.plugin('helper').clearFilter();
    };


    /**
     *
     * @param e
     * @param xhr
     * @param settings
     */
    Component.ajaxCompleteHandle = function (e, xhr, settings) {
        if (typeof settings.url !== 'undefined' && settings.url.indexOf('sorting') > 0) {
            Setrun.plugin('helper').pjaxReload();
        }
    };

    /**
     *
     * @param e
     * @param messages
     */
    Component.afterValidateHandle = function (e, messages) {
        var timeout = 50;
        Noty.closeAll();
        $.map(messages, function (value, key) {
            if (typeof value[0] !== 'undefined') {
                setTimeout(function () {
                    Setrun.plugin('noty').error(value[0]);
                }, timeout);
                timeout = timeout + 50;
            }
        });
    };

    /**
     *
     * @param e
     * @returns {boolean}
     */
    Component.ajaxSubmitFormHandle = function (e) {
        var $form   = $(e.target),
            $btn    = $form.find('button'),
            data    = [],
            options = {};

        if (!$btn.hasClass('ajax-submit-button')) {
            return true;
        }

        $form.trigger($.Event('form:before'));
        data = $form.serialize();

        options.onBefore = function(){
            $btn.attr('disabled', true);
            $form.trigger($.Event('form-request:before'));

        };
        options.onComplete = function(){
            setTimeout(function () {
                $btn.removeAttr('disabled');
            }, 500);
            $form.trigger($.Event('form-request:complete'));
        };
        options.onSuccess = function(res){
            var message = null;
            $form.trigger($.Event('form-request:success'), [res]);
            if (Setrun.fn.lang('formSuccess')) {
                message = Setrun.fn.lang('formSuccess');
            }
            if (message) {
                Setrun.plugin('noty').success(message);
            }
        };
        options.onError = function(res){
            var timeout = 50;
            setTimeout(function () {
                $btn.removeAttr('disabled');
            }, 500);
            $form.trigger($.Event('form-request:error'), [res]);
            Setrun.plugin('helper').notyErrors(res, function (key, value) {
                $form.yiiActiveForm('updateAttribute', key, [value]);
            });
        };
        Setrun.fn.request(data, options);
        return false;
    };

    /**
     *
     * @param e
     * @returns {boolean}
     */
    Component.ajaxDeleteItemHandle = function (e) {
        var $el        = $(e.target).closest('.ajax-delete-item'),
            $doc       = $(document),
            url        = ($el.is('a') ? $el.attr('href') : $el.data('href')) || false,
            message    = $el.data('confirm-message'),
            redirect   = $el.data('redirect-url') || false,
            grid       = $el.data('grid-view') || false,
            pjaxReload = $el.data('pjax-reload') || false,
            options  = {};

        $doc.trigger($.Event('item-delete:before'));

        options.onSuccess = function (res) {
            $doc.trigger($.Event('item-delete-request:success'), [res]);
            if (!redirect && grid) {
                $el.parents('tr').remove();
                Setrun.plugin('helper').pjaxReload();
            }
            if (redirect) {
                location.href = redirect;
            }

        };
        options.onError = function (res) {
            $doc.trigger($.Event('item-delete-request:error'), [res]);
            Setrun.plugin('helper').notyErrors(res);
        };

        if (url) {
            if (confirm(message)) {
                Setrun.fn.request({}, options, url);
            }
        }
        return false;
    };

    /**
     *
     * @returns {boolean}
     */
    Component.checkEmptyRow = function () {
        return $('[data-pjax-container] td .empty').length === 1;
    };

    Setrun.component('backend', Component);
    Component = null;
})(jQuery, Setrun);
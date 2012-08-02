$(function() {
    function loadHash() {
        var id = window.location.pathname.split('/')[2];
        if (id) {
            var $container = $("#container");
            var $ampersand = $("#ampersand").removeClass('hidden');
            
            var windowHeight = Math.max($(window).height(), self.innerHeight);
            $container.css({height: windowHeight, width: $(window).width() });
            
            
            $.getJSON('/animation/' + id, function (data) { new Cratify(data, $container, $ampersand); });
        }
    }
    loadHash();
    $(window).bind('hashchange', loadHash);
});
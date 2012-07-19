function cratify(animations) {

    var IMG_URL = "http://images.crateandbarrel.com/is/image/Crate/CBBold?fmt=png-alpha&$t=%5Cfs52%5Cexpnd-8+";
    var winHeight = $(window).height();
    var winWidth = $(window).width();
    
    $("body").css({"overflow": "hidden", fontFamily:"helvetica", fontWeight: "bold", fontSize: 120});
    var $container = $("<div />").css({"overflow": "hidden"}).appendTo("body");
    
    var $ampersand = $("<span />").html("&").css({position:"absolute"}).appendTo($container);
    
    
    $ampersand.position({
        my: "center",
        at: "center",
        of: $(window),
        collision: "fit",
        using: positionEverything
    });
    
    function positionEverything(windowPos) {
        $ampersand.css(windowPos); 
        for (i=0; i<animations.length; i++)
        {
            var animation = animations[i];
            animation.left.element = $("<span />").html(animation.left.text).css({ position:"absolute",padding:0,overflow:"hidden",visibility:"hidden"}).appendTo($container);
            animation.right.element = $("<span />").html(animation.right.text).css({ position:"absolute",padding:0,overflow:"hidden",visibility:"hidden"}).appendTo($container);
            animation.left.element.position({
                my: "right center",
                at: "left center",
                of: $ampersand,
                collision: "fit",
                using: function(pos) {animation.left.pos= pos;}
            })
            animation.right.element.position({
                my: "left center",
                at: "right center",
                of: $ampersand,
                collision: "fit",
                using: function(pos) {animation.right.pos= pos;}
            })
        }
    }
    
    var left = 0;
    var right = 0;
    for (i=0; i<animations.length; i++)
    {
           
        $('body')
        // left side
        .delay(1000, 'leftChain')
        .queue('leftChain', function(next){
            runAnimation(animations[left].left, 'in', next);
        })
        .delay(1000, 'leftChain')
        .queue('leftChain', function(next){  
            runAnimation(animations[left].left, 'out', next);
            left++;
        })
        // right side
        .delay(1000, 'rightChain')
        .queue('rightChain', function(next){
            runAnimation(animations[right].right, 'in', next);
        })
        .delay(1000, 'rightChain')
        .queue('rightChain', function(next){  
            runAnimation(animations[right].right, 'out', next);
            right++;
        });
    }
    $('body').queue('leftChain');
    $('body').queue('rightChain');
    
    $('body').dequeue('leftChain');
    $('body').dequeue('rightChain');
    
    /********************************************************************
    
        Define Animations
    
    ********************************************************************/
    function runAnimation(animation, inOut, next) {
        if (inOut == 'out') {
            switch(animation.animationOut)
            {
            case "fadeOut": fadeOut(animation, next); break;
            case "flyOutUp": flyOutUp(animation, next); break;
            case "flyOutLeft": flyOutLeft(animation, next); break;
            case "flyOutRight": flyOutRight(animation, next); break;
            default: case "flyOutDown": flyOutDown(animation, next); break;               
            }
        } else {
            switch(animation.animationIn)
            {
            case "revealDown": revealDown(animation, next); break;
            case "revealDownHalf": revealDownHalf(animation, next); break;
            case "revealUp": revealUp(animation, next); break;
            case "revealUpHalf": revealUpHalf(animation, next); break;
            case "fadeIn": fadeIn(animation, next); break;
            case "flyInUp": flyInUp(animation, next); break;
            case "flyInLeft": flyInLeft(animation, next); break;
            case "flyInRight": flyInRight(animation, next); break;
            case "flyInSlot": flyInSlot(animation, next); break;
            default: case "flyInDown": flyInDown(animation, next); break;
            }
        }
    }
    
    function flyInUp(animation, next) {
        var pos = animation.pos;
        var element = animation.element;
        element.css({visibility:"visible", left: pos.left, top: winHeight})
        .animate({top: pos.top}, {duration:1000, queue:false, complete: next});
    }
    
    function flyInDown(animation, next) {
        var pos = animation.pos;
        var element = animation.element;
        element.css({visibility:"visible", left: pos.left, top: element.height() * 2 * -1})
        .animate({top: pos.top}, {duration:1000, queue:false, complete: next});
    }
    
    function flyInLeft(animation, next) {
        var pos = animation.pos;
        var element = animation.element;
        element.css({visibility:"visible", left: element.width() * 2 * -1, top: pos.top})
        .animate({left: pos.left}, {duration:1000, queue:false, complete: next});
    }
    
    function flyInRight(animation, next) {
        var pos = animation.pos;
        var element = animation.element;
        element
        .css({visibility:"visible", left: element.width() * 2 * -1, top: pos.top})
        .animate({left: pos.left}, {duration:1000, queue:false, complete: next});
    }
    
    function flyInSlot(animation, next) {
        var pos = animation.pos;
        var element = animation.element;
        var beginningTop = element.height() * 2 * -1;
        element
            .css({visibility:"visible", left: pos.left, top: beginningTop })
        .animate({left: pos.left}
           , {
               duration:200
               , queue:false
               , complete: function() {
               element.css({top: beginningTop })
                   .animate({top: winHeight}
               , {
               duration:200
               , queue:false
               , complete: function() {
                   element.css({top: beginningTop })
               .animate({top: winHeight}
               , {
               duration:200
               , queue:false
               , complete: function() {
                   element.css({top: beginningTop })
                       .animate({top: pos.top}
               , {
               duration:200
               , queue:false
               , complete: function() {
                   next();
                       
               }})
               }})
               }})
               }});
    }
                   
    function fadeIn(animation, next) {
        var pos = animation.pos;
        var element = animation.element;
        element.hide().css({visibility:"visible",left: pos.left, top: pos.top}).fadeIn(1000, next);
    }
                   
    function revealDownHalf(animation, next) {
        var pos = animation.pos;
        var element = animation.element;
        var height = element.height();
        var halfHeight = height / 2;
        element.css({visibility:"visible",left: pos.left, top: pos.top, height:1})
        .animate({height: halfHeight}, {duration:1000, queue:false, complete: next})
    }
                   
    function revealDown(animation, next) {
        var pos = animation.pos;
        var element = animation.element;
        var height = element.height();
        element.css({visibility:"visible",left: pos.left, top: pos.top, height:1})
        .animate({height: height}, {duration:1000, queue:false, complete: next})
    }
                   
    function revealUp(animation, next) {
        var pos = animation.pos;
        var element = animation.element;
        var height = element.height() - 10;
        element.css({visibility:"visible",left: pos.left, top: pos.top + (height-1), height:1})
            .animate({height: height, top: pos.top}, {duration:1000, queue:false, complete: next})
    }
            
    function revealUpHalf(animation, next) {
        var pos = animation.pos;
        var element = animation.element;
        var height = element.height() - 10;
        var halfHeight = height / 2;
        element.css({visibility:"visible",left: pos.left, top: pos.top + (height-1), height:1})
            .animate({height: halfHeight, top: (pos.top+halfHeight)}, {duration:1000, queue:false, complete: next})
    }
    
    function flyOutUp(animation, next) {
        var pos = animation.pos;
        var element = animation.element;
        element.animate({top: element.height() * 2 * -1}, {duration:1000, queue:false, complete: next});
    }
    
    function flyOutDown(animation, next) {    
        var pos = animation.pos;
        var element = animation.element;
        element.animate({top: winHeight}, {duration:1000, queue:false, complete: next });
    }
    
    function flyOutLeft(animation, next) {    
        var pos = animation.pos;
        var element = animation.element;
        element.animate({left: element.width() * 2 * -1}, {duration:1000, queue:false, complete: next });
    }
    
    function flyOutRight(animation, next) {    
        var pos = animation.pos;
        var element = animation.element;
        element.animate({left: winWidth}, {duration:1000, queue:false, complete: next });
    }
        
    function fadeOut(animation, next) {
        var pos = animation.pos;
        var element = animation.element;
        element.fadeOut(1000, next);
    }

}
var winWidth;
var $container, $ampersand;

function cratify(animations, container, ampersand) {

    $container = container ? container : $("<div />").css({"overflow": "hidden", width: $(window).width(), height: $(window).height() }).appendTo("body");
    $ampersand = ampersand ? ampersand : $("<span />").html("&").css({position:"relative"}).appendTo($container);
    //winHeight = $container.height();
    winWidth = $container.width();
    $container.css({"overflow": "hidden", fontFamily:"helvetica", fontWeight: "bold", fontSize: 120});
    $ampersand.css("position", "absolute");
    $ampersand.position({
        my: "center",
        at: "center",
        of: $container
    });
    
    var left = 0;
    var right = 0;
    for (var i=0; i<animations.length; i++)
    {
        $('body')
        // left side
        .delay(1000, 'leftChain')
        .queue('leftChain', queueLeftIn)
        .delay(1000, 'leftChain')
        .queue('leftChain', queueLeftOut)
        // right side
        .delay(1000, 'rightChain')
        .queue('rightChain', queueRightIn)
        .delay(1000, 'rightChain')
        .queue('rightChain', queueRightOut);
    }
    
    // These functions are defined as such, so that we don't define
    // anonymous functions in a for loop
    function queueLeftIn(next){
        var animation = animations[left].left;
        animation.inOut = 'in';
        animation.leftRight = 'left';
        Animations.runAnimation(animation, next);
    }
    function queueLeftOut(next){  
        var animation = animations[left].left;
        animation.inOut = 'out';
        animation.leftRight = 'left';
        Animations.runAnimation(animation, next);
        left++;
    }
    function queueRightIn(next){
        var animation = animations[right].right;
        animation.inOut = 'in';
        animation.leftRight = 'right';
        Animations.runAnimation(animation, next);
    }    
    function queueRightOut(next) { 
        var animation = animations[right].right;
        animation.inOut = 'out';
        animation.leftRight = 'right';
        Animations.runAnimation(animation, next);
        right++;
    }
    
    $('body').queue('leftChain');
    $('body').dequeue('leftChain');
    
    $('body').queue('rightChain');
    $('body').dequeue('rightChain');
    
    

}


/********************************************************************

    Define Animations

********************************************************************/
var Animations = {
    runAnimation : function(animation, next) {
        var animateIn = Animations['in'];
        var animateOut = Animations.out;
        if (animation.inOut == 'out') {
            var fx = animateOut[animation.animationOut];
            if (fx) {
                fx(animation, next);
            } else {
                animateOut.flyOutDown(animation, next);
            }
        } else {
            var fx = animateIn[animation.animationIn];
            if (fx) {
                fx(animation, next);
            } else {
                animateOut.flyInDown(animation, next);
            }
        }
    },
    'in' : {

        flyInUp : function(animation, next) {
            var endPos;
            var element = animation.element = $("<span />").html(animation.text).css({position:"relative"}).appendTo($container);
            element.position({
                my: "top",
                at: "bottom",
                of: $container,
                using: function (pos) { element.css({top: pos.top}); }
            })
            // end position
            .position({
                my: animation.leftRight==='right'?"left center":"right center",
                at: animation.leftRight==='right'?"right center":"left center",
                of: $ampersand,
                using: function (pos) { endPos = pos; element.css({left: pos.left}); }
            })
            //.css({visibility:"visible"})
            .animate({top: endPos.top}, {duration:1000, queue:false, complete: next});
        },
        
        flyInDown : function(animation, next) {
            var endPos;
            var element = animation.element = $("<span />").html(animation.text).css({position:"relative"}).appendTo($container)
            // start position
            .position({
                my: "bottom",
                at: "top",
                of: $container,
                using: function (pos) { element.css({top: pos.top}); }
            })
            // end position
            .position({
                my: animation.leftRight==='right'?"left center":"right center",
                at: animation.leftRight==='right'?"right center":"left center",
                of: $ampersand,
                using: function (pos) { endPos = pos; element.css({left: pos.left}); }
            })
            //.css({visibility:"visible"}) //, left: pos.left, top: element.height() * 2 * -1})
            .animate({top: endPos.top}, {duration:1000, queue:false, complete: next});
        },
        
        flyInLeft : function(animation, next) {
            var endPos;
            var element = animation.element = $("<span />").html(animation.text).css({position:"relative"}).appendTo($container);          
            element
            // start position
            .position({
                my: "right center",
                at: "left center",
                of: $container
            })
            // end position
            .position({
                my: animation.leftRight==='right'?"left center":"right center",
                at: animation.leftRight==='right'?"right center":"left center",
                of: $ampersand,
                using: function (pos) { endPos = pos; }
            })
            //.css({visibility:"visible"}) //, left: element.width() * 2 * -1, top: pos.top})
            .animate({left: endPos.left}, {duration:1000, queue:false, complete: next});
        },
        
        flyInRight : function(animation, next) {
            var endPos;
            var element = animation.element = $("<span />").html(animation.text).css({position:"relative"}).appendTo($container);            
            element
            // start position
            .position({
                my: "left center",
                at: "right center",
                of: $container,
                using: function (startPos) { 
                    // I am not sure why the positioning math always put the element on the right side during
                    // testing, but I compensated for it with this little winWidth and element.width() addition
                    startPos.left = startPos.left + winWidth + element.width();
                    element.css(startPos); }
            })
            // end position
            .position({
                my: animation.leftRight==='right'?"left center":"right center",
                at: animation.leftRight==='right'?"right center":"left center",
                of: $ampersand,
                using: function (pos) { endPos = pos; }
            })
            //.css({visibility:"visible"}) //, left: (element.width() * 2) + winWidth, top: pos.top})
            .animate({left: endPos.left}, {duration:1000, queue:false, complete: next});
        },
        
        flyInSlot : function(animation, next) {
            var endPos, bottomPos, topPos;
            var element = animation.element = $("<span />").html(animation.text).css({visibility:"hidden",position:"relative"}).appendTo($container);
            element
            .position({
                my: animation.leftRight==='right'?"left center":"right center",
                at: animation.leftRight==='right'?"right center":"left center",
                of: $ampersand,
                using: function (pos) { endPos = pos; }
            })
            // bottom of the container position
            .position({
                my: "bottom",
                at: "top",
                of: $container,
                using: function (pos) { bottomPos = pos; }
            })
            // top of the container position
            .position({
                my: "top",
                at: "bottom",
                of: $container,
                using: function (pos) { topPos = pos; }
            })
            .css({visibility:"visible", left: endPos.left, top: topPos.top })
                .animate({left: endPos.left},
                   {duration:200, queue:false, complete: function() {
                       element.css({top: topPos.top })
                       .animate({top: bottomPos.top},
                            {duration:200, queue:false, complete: function() {
                                element.css({top: topPos.top })
                                .animate({top: bottomPos.top},
                                    {duration:200, queue:false, complete: function() {
                                        element.css({top: topPos.top })
                                        .animate({top: endPos.top},
                                            {duration:200, queue:false, complete: function() {
                                                next();
                                        }});
                                }});
                       }});
                }});
        },
                       
        fadeIn : function(animation, next) {
            animation.element = $("<span />").html(animation.text).css({position:"relative"}).appendTo($container)
            .position({
                my: animation.leftRight==='right'?"left center":"right center",
                at: animation.leftRight==='right'?"right center":"left center",
                of: $ampersand
            }).hide().fadeIn(1000, next);
        }

    },
    out : {

        flyOutUp : function(animation, next) {
            var element = animation.element;
            element.position({
                my: "top",
                at: "bottom",
                of: $container,
                using: function (pos) {
                    console.log(pos);
                    element.animate({top: pos.top}, {duration:1000, queue:false, complete: function () {
                        
                        delete animation.element;
                        $container[0].removeChild(element[0]);
                        next();
                    }});
                }
            });
        },

        flyOutDown : function(animation, next) {    
            var element = animation.element;
            element.position({
                my: "bottom",
                at: "top",
                of: $container,
                using: function (pos) {
                    console.log(pos);
                    element.animate({top: pos.top}, {duration:1000, queue:false, complete: function () {
                        
                        delete animation.element;
                        $container[0].removeChild(element[0]);
                        next();
                    }});
                }
            });
        },

        flyOutLeft : function(animation, next) {   
            var endPos;
            var element = animation.element;
            element.position({
                my: "left",
                at: "right",
                of: $container,
                using: function (pos) { endPos = pos; }
            }).animate({left: endPos.left}, {duration:1000, queue:false, complete: function () {
                delete animation.element;
                $container[0].removeChild(element[0]);
                next();
            } });
        },
        
        flyOutRight : function(animation, next) {  
            var endPos;
            var element = animation.element;
            element.position({
                my: "right",
                at: "left",
                of: $container,
                using: function (pos) { endPos = pos; }
            }).animate({left: endPos.left}, {duration:1000, queue:false, complete: function () {
                delete animation.element;
                $container[0].removeChild(element[0]);
                next();
            } });
        },
            
        fadeOut : function(animation, next) {
            var element = animation.element;
            element.fadeOut(1000, function () {
                delete animation.element;
                $container[0].removeChild(element[0]);
                next();
            });
        }
    }
};
function Cratify(data, container, ampersand, autoRun, animationsObj) {
    this.data = data;
    this.$container = container ? container : $("<div />").css({"overflow": "hidden", width: $(window).width(), height: $(window).height() }).appendTo("body");
    this.$ampersand = ampersand ? ampersand : $("<span />").html("&").css({position:"relative"}).appendTo(this.$container);
    //winHeight = $container.height();
    this.$container.css({"overflow": "hidden", fontFamily:"helvetica", fontWeight: "bold", fontSize: 64});
    this.$ampersand.css("position", "absolute");
    this.$ampersand.position({
        my: "center",
        at: "center",
        of: this.$container
    });
    
    this.Animations = animationsObj || Animations;
    
    if (autoRun !== false)
    {
        this.queueAnimations();
        this.runAnimations();
    }
}

Cratify.prototype.queueAnimations = function() {
    var left = 0;
    var right = 0;
    for (var i=0; i<this.data.length; i++)
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

    var data = this.data;
    var Animations = new this.Animations(this.$container, this.$ampersand);

    // These functions are defined as such, so that we don't define
    // anonymous functions in a for loop
    function queueLeftIn(next){
        var animation = data[left].left;
        animation.inOut = 'in';
        animation.leftRight = 'left';
        Animations.runAnimation(animation, next);
    }
    function queueLeftOut(next){
        var animation = data[left].left;
        animation.inOut = 'out';
        animation.leftRight = 'left';
        Animations.runAnimation(animation, next);
        left++;
    }
    function queueRightIn(next){
        var rightInAnimation = data[right].right;
        rightInAnimation.inOut = 'in';
        rightInAnimation.leftRight = 'right';
        Animations.runAnimation(rightInAnimation, next);
    }
    function queueRightOut(next) {
        var rightOutAnimation = data[right].right;
        rightOutAnimation.inOut = 'out';
        rightOutAnimation.leftRight = 'right';
        Animations.runAnimation(rightOutAnimation, next);
        right++;
    }
}

Cratify.prototype.runAnimations = function() {
    $('body').queue('leftChain');
    $('body').dequeue('leftChain');

    $('body').queue('rightChain');
    $('body').dequeue('rightChain');
}


/********************************************************************

    Define Animations

********************************************************************/
function Animations($container, $ampersand) {
    this.$container = $container;
    this.$ampersand = $ampersand;
}

Animations.prototype = {
    runAnimation : function(animation, next) {
        var animateIn = this['in'];
        var animateOut = this.out;
        var $container = this.$container;
        var $ampersand = this.$ampersand;
        
        if (animation.inOut == 'out') {
            var fxOut = animateOut[animation.animationOut];
            if (fxOut) {
                fxOut(animation, $container, $ampersand, next);
            } else {
                animateOut.flyOutDown(animation, $container, $ampersand, next);
            }
        } else {
            var fxIn = animateIn[animation.animationIn];
            if (fxIn) {
                fxIn(animation, $container, $ampersand, next);
            } else {
                animateOut.flyInDown(animation, $container, $ampersand, next);
            }
        }
    },
    'in' : {

        flyInUp : function(animation, $container, $ampersand, next) {
            var endPos;
            animation.element = $("<span />").html(animation.text).css({position:"relative"}).appendTo($container)
            .position({
                my: "top",
                at: "bottom",
                of: $container
            })
            // end position
            .position({
                my: animation.leftRight==='right'?"left center":"right center",
                at: animation.leftRight==='right'?"right center":"left center",
                of: $ampersand,
                using: function (pos) { endPos = pos }
            })
            .css({left:endPos.left})
            .animate({top: endPos.top}, {duration:1000, queue:false, complete: next});
        },

        flyInDown : function(animation, $container, $ampersand, next) {
            var endPos;
            animation.element = $("<span />").html(animation.text).css({position:"relative"}).appendTo($container)
            // start position
            .position({
                my: "bottom",
                at: "top",
                of: $container
            })
            // end position
            .position({
                my: animation.leftRight==='right'?"left center":"right center",
                at: animation.leftRight==='right'?"right center":"left center",
                of: $ampersand,
                using: function (pos) { endPos = pos; }
            })
            .css({left:endPos.left})
            .animate({top: endPos.top}, {duration:1000, queue:false, complete: next});
        },

        flyInLeft : function(animation, $container, $ampersand, next) {
            var endPos;
            var element = animation.element = $("<span />").html(animation.text).css({position:"relative"}).appendTo($container);
            // start position
            element.position({
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

        flyInRight : function(animation, $container, $ampersand, next) {
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
                    //startPos.left = startPos.left + $container.width() + element.width();
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

        flyInSlot : function(animation, $container, $ampersand, next) {
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

        fadeIn : function(animation, $container, $ampersand, next) {
            animation.element = $("<span />").html(animation.text).css({position:"relative"}).appendTo($container)
            .position({
                my: animation.leftRight==='right'?"left center":"right center",
                at: animation.leftRight==='right'?"right center":"left center",
                of: $ampersand
            }).hide().fadeIn(1000, next);
        }

    },
    out : {

        flyOutUp : function(animation, $container, $ampersand, next) {
            function flyOutUpCompleteAnimate () {
                var targetElement = animation.element[0];
                delete animation.element;
                $container[0].removeChild(targetElement);
                next(); 
            }
            function flyOutUpAnimate (pos) {
                animation.element.animate({top: pos.top}, {duration:1000, queue:false, complete: flyOutUpCompleteAnimate});
            }
            animation.element.position({
                my: "bottom",
                at: "top",
                of: $container,
                using: flyOutUpAnimate
            });
        },

        flyOutDown : function(animation, $container, $ampersand, next) {
            function flyOutDownCompleteAnimate () {
                var targetElement = animation.element[0];
                delete animation.element;
                $container[0].removeChild(targetElement);
                next(); 
            }
            function flyOutDownAnimate (pos) {
                animation.element.animate({top: pos.top}, {duration:1000, queue:false, complete: flyOutDownCompleteAnimate});
            }
            animation.element.position({
                my: "top",
                at: "bottom",
                of: $container,
                using: flyOutDownAnimate
            });
        },

        flyOutLeft : function(animation, $container, $ampersand, next) {
            function completeAnimate () {
                var targetElement = animation.element[0];
                delete animation.element;
                $container[0].removeChild(targetElement);
                next(); 
            }
            function animate (pos) {
                animation.element.animate({left: pos.left}, {duration:1000, queue:false, complete: completeAnimate});
            }
            animation.element.position({
                my: "left",
                at: "right",
                of: $container,
                using: animate
            });
        },

        flyOutRight : function(animation, $container, $ampersand, next) {
            function completeAnimate () {
                var targetElement = animation.element[0];
                delete animation.element;
                $container[0].removeChild(targetElement);
                next(); 
            }
            function animate (pos) {
                animation.element.animate({left: pos.left}, {duration:1000, queue:false, complete: completeAnimate});
            }
            animation.element.position({
                my: "right",
                at: "left",
                of: $container,
                using: animate
            });
        },

        fadeOut : function(animation, $container, $ampersand, next) {
            var element = animation.element;
            element.fadeOut(1000, function () {
                delete animation.element;
                $container[0].removeChild(element[0]);
                next();
            });
        }
    }
};
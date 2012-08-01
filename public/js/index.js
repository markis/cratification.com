$(function() {
    AddNewRow();
    $("<button />").html("Test").appendTo($("#entry-form")).click(TestData);
    $("<button />").html("Save").appendTo($("#entry-form")).click(SaveData);
    var $container = $("#test-container");
    var $ampersand = $("#ampersand");
    var data = [
      {
        "left": {
          "text": "Markis",
          "animationIn": "flyInLeft",
          "animationOut": "flyOutUp"
        },
        "right": {
          "text": "Taylor",
          "animationIn": "flyInRight",
          "animationOut": "flyOutDown"
        }
      }
    ];
    new Cratify(data, $container, $ampersand);
});

function AddNewRow(event) {
    var row = $("<div />").addClass("frame");   
    if (event) {
        row.after($(event.target));
    } else {
        row.append($("#entry"));
    }
    
    $("<input />").attr({type:"text",placeholder:"left text"}).addClass("left").appendTo(row);
    CreateInDropDown().addClass("left").appendTo(row);
    CreateOutDropDown().addClass("left").appendTo(row);
    
    $("<input />").attr({type:"text",placeholder:"right text"}).addClass("right").appendTo(row);
    CreateInDropDown().addClass("right").appendTo(row);
    CreateOutDropDown().addClass("right").appendTo(row);
    
    $("<button />").html("New Frame").click(AddNewRow).appendTo(row);
}

function AddNewRowByButton(event) {
    $(event.target).parent()[0].removeChild(event.target);
    AddNewRow();
}

function CreateInDropDown() {
    var $dropDown = $("<select />").addClass("animationIn");
    for (animation in Animations.prototype["in"])
    {
        $dropDown.append(new Option(animation, animation, false, false));
    }
    return $dropDown;
}
function CreateOutDropDown() {
    var $dropDown = $("<select />").addClass("animationOut");
    for (animation in Animations.prototype["out"])
    {
        $dropDown.append(new Option(animation, animation, false, false));
    }
    return $dropDown;
}

function GetData() {
    var data = [];
    $("#entry > div").each(function (idx, elem) { 
        var $elem = $(elem); 
        var leftText = $elem.find("input.left").val();
        var leftAnimationIn = $elem.find("select.animationIn.left").val();
        var leftAnimationOut = $elem.find("select.animationOut.left").val();
        
        var rightText = $elem.find("input.right").val();
        var rightAnimationIn = $elem.find("select.animationIn.right").val();
        var rightAnimationOut = $elem.find("select.animationOut.right").val();
        
        data.push({
            "left": {
              "text": leftText,
              "animationIn": leftAnimationIn,
              "animationOut": leftAnimationOut
            },
            "right": {
              "text": rightText,
              "animationIn": rightAnimationIn,
              "animationOut": rightAnimationOut
            }  
        });
    });
    return data;
}

function loadHash() {
    if (window.location.hash) {
        var $container = $("#container");
        var $ampersand = $("#ampersand");
        
        var windowHeight = Math.max($(window).height(), self.innerHeight);
        $container.css({height: windowHeight, width: $(window).width() });
        
        var id = window.location.hash.replace('#', '');
        $.getJSON('/animation/' + id, function (data) { new Cratify(data, $container, $ampersand); });
    }
}

function SaveData() {
    var data = GetData();
    $.ajax({
        type: 'POST'
        , url:'/animation'
        , data: {animations:data}
        , dataType:'json'
        , success: function (data) { 
            
        }
    });
    return false;
}

function SaveDataComplete(data) {
   if (data.success)  
        window.location='/view#'+data.id;  
}

function TestData() {
    var data = GetData();
    var $container = $("#test-container");
    var $ampersand = $("#ampersand");
    new Cratify(data, $container, $ampersand);
    return false;
}
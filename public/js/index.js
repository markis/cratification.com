$(function() {
    AddNewRow();
    $("<button />").html("Test").appendTo($("#entry-form")).click(TestData);
    $("<button />").html("Save").appendTo($("#entry-form")).click(SaveData);
    var $container = $("#test-container");
    var $ampersand = $("#ampersand");
    var data = [
      {
        "left": {
          "text": "Create",
          "animationIn": "flyInUp",
          "animationOut": "flyOutUp"
        },
        "right": {
          "text": "your",
          "animationIn": "flyInLeft",
          "animationOut": "flyOutDown"
        }
      },
      {
        "left": {
          "text": "own",
          "animationIn": "flyInDown",
          "animationOut": "flyOutUp"
        },
        "right": {
          "text": "design",
          "animationIn": "flyInLeft",
          "animationOut": "flyOutDown"
        }
      }
    ];
    new Cratify(data, $container, $ampersand);
});

function AddNewRow(event) {
    var row = $("<div />").addClass("frame");   
    if (event) {
        row.insertAfter($(event.target).closest(".frame"));
    } else {
        row.appendTo($("#entry"));
    }
    
    var leftSide = $("<div />").addClass("left").addClass("side").appendTo(row);
    $("<input />").attr({type:"text",placeholder:"left text"}).addClass("left").appendTo(leftSide);
    CreateInDropDown().addClass("left").css({display:"none"}).appendTo(leftSide);
    CreateOutDropDown().addClass("left").css({display:"none"}).appendTo(leftSide);
    
    $("<span />").html("&amp;").appendTo(row);
    
    var rightSide = $("<div />").addClass("right").addClass("side").appendTo(row);
    $("<input />").attr({type:"text",placeholder:"right text"}).addClass("right").appendTo(rightSide);
    CreateInDropDown().addClass("right").css({display:"none"}).appendTo(rightSide);
    CreateOutDropDown().addClass("right").css({display:"none"}).appendTo(rightSide);
    
    
    $("<button />").html("New Frame").addClass("addRow").click(AddNewRow).appendTo(row);
    if (event) {
        $("<button />").html("Remove Frame").addClass("removeRow").click(RemoveRow).appendTo(row);
    }
    return false;
}

function AddNewRowByButton(event) {
    $(event.target).parent()[0].removeChild(event.target);
    AddNewRow();
}

function RemoveRow(event) {
    var row = $(event.target).closest(".frame");
    row.parent()[0].removeChild(row[0]);
    return false;
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
        type: 'POST',
        url:'/animation',
        data: {animations:data},
        dataType:'json',
        success: SaveDataComplete
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
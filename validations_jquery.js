var row_id = 1;
$("#save").click(function(){
    var inputs = $("input");

    var person = {name : inputs[0].value, eng : inputs[1].value, maths : inputs[2].value, guj : inputs[3].value}

    var nm_err = $("#nm_err");
    var eng_err = $("#eng_err");
    var math_err = $("#math_err");
    var guj_err = $("#guj_err");

    var invalid_name = /[0-9\~\!\`\@\#\$\%\^\&\*\(\)\-\+\=\[\]\{\}\'\"\:\;\<\>\?\,\.\/]/;

    nm_err.html((person.name) ? ((person.name.match(invalid_name)) ? "Name should contain alphabets only" : "") : 
        "Name is Required");
    eng_err.html((person.eng) ? ((person.eng > 100 || person.eng < 0) ? "Invalid Marks" : "" ) : "Marks can't be empty");
    math_err.html((person.maths) ? ((person.maths > 100 || person.maths < 0) ? "Invalid Marks" : "" ) : "Marks can't be empty");
    guj_err.html((person.guj) ? ((person.guj > 100 || person.guj < 0) ? "Invalid Marks" : "" ) : "Marks can't be empty");
    

    if(!(nm_err.html() || eng_err.html() || math_err.html() || guj_err.html())){
        var avg = (parseFloat(person.eng) + parseFloat(person.maths) + parseFloat(person.guj) ) / 3;
        if($("#save").val() == "Save"){
            var data = "<td>"+ person.name +"</td><td>"+ person.eng +"</td><td>"+ person.maths +"</td><td>"+ 
            + person.guj +"</td><td>"+parseFloat(avg).toFixed(2)+"</td><td class='edit'> <button> &#9808; </button></td><td class='del'> <button> &#9940; </button></td>";

            var record = $("<tr id="+row_id+"></tr>").append(data);
            $("#data").append(record);
            row_id +=1 ; 
        } 
        else {
            var u_record = $("[id="+r_id+"]");
            var u_data = u_record.children("td");
            for (var i = 0; i < (u_data.length-2); i++) {
                $(u_data[i]).text($(inputs[i]).val());
            }
            $(u_data[4]).text(parseFloat(avg).toFixed(2));
            $("#save").val("Save");
        }
        $("#cancel").click();
    }
    });

$("#cancel").click(function (){
    $("#marks_form")[0].reset();
});

$("#records").on("click", ".del", function (e) {
    if (confirm("Are you sure to delete a record...!")){
        $(this).parent()[0].remove();
    }
});

$("#records").on("click", ".edit", function (e) {
    var record = $(this).parent();
    window.r_id = record.prop("id");

    var data = record.children("td");
    var inputs = $("input");
    for (var i = 0; i < inputs.length-2; i++) {
        $(inputs[i]).val($(data[i]).text());
    }
    $("#save").val("Update");
    return false;
});

 $(".search").on("change textInput input", function() {
    var name = $(this).val().toLowerCase();
    $("#data tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(name) == 0);
    });
  });

$(".sorting").click(function (){
    var id = $(this).prop("id");
    var records = $('#records tr');
    var swapped = 0;
    for (var i = 1; i < records.length; i++) {
        if(swapped){
            records = $('#records tr');
            i = 1; 
            swapped = 0;           
        }
        for(var j = i+1; j < records.length; j++){
            var col_i = $($(records[i])[0]).children("td");
            var col_j = $($(records[j])[0]).children("td");
            var m1 = $($(col_i[id])[0]).text();
            var m2 = $($(col_j[id])[0]).text();
            if(($(this).html()) ==  "\u2207"){
                if(parseFloat(m1) > parseFloat(m2)){
                    swap = 1;
                    break;
                }
            }
            else{
                if(parseFloat(m1) < parseFloat(m2)){
                    swap = 1;
                    break;
                }
            }
        }
        if(swap){
            records[i].parentNode.insertBefore(records[j], records[i]);
            swap = 0;
            swapped = 1;       
        }
    }

    $(this).html(($(this).html() == "\u2207") ? "\u2206" : "\u2207");
});

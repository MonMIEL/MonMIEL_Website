$(function(){  
    var val = $('#slider').val();  
        output  = $('#output');  
  
    output.html(val);  
  
    $('#slider').change(function(){  
        output.html(this.value);  
    });  
  
});
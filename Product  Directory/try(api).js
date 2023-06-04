var b = "no";                           //for oninput check on and off
var file_val;                             //image   
var sto;                                 //table start stop
var end_page,start_page,counter =0,q;   //pagination
var duplicate=[];                         //duplicates than sets the value of dump array again
var tempo=[];                           //duplicate for searcch bar elements
var count = 0;           ///for making dropdown data work once
var unique_depr=[];      //empty array for adding dyanmic deparments
var def=[];              //get the search array to department filter
var awz;                 //for getting image values(image to check if theere is image or not)

$(document).ready(function main()
{
  read_data(); 
});

//events
$('#btn_submit_id').click(function(){                      ///form submit

  validate("yes");                                         ///normal validate(that does submit form)
  toggle_input(b);
   
});
$('#btn_update_id').click(function(){     
  
  // var z = document.getElementById("photo_group");
  // if(z == null){add_file()};
  // add_file();
  validate("update");                       
  toggle_input(b);
});
$('#btn_toggle_id').click(function(){     

  // $("#form_id :input[name = id]").prop("disabled",true);

  $("#photo_group").show();

  $("#btn_update_id").hide();
  $("#main_label").html("Emp_No");   
  $("#btn_submit_id").show();
  $("#modalLabel_id").html("Register User Here");
  $("#modalLabel_id").css("color","#198754");
  reset_form();
  var z = document.getElementById("photo_id");
  if(z == null){add_file()};

});
// reset button
$("#res_id").click(function(){
  read_data(); 
  $("#search_id").val("");
  $("#try_department_id").val("");


});
// search button
$("#btn_id").on('click',function(){
  dump = [...duplicate];
  $("#table_add_id tr").remove();
  $("#try_department_id").val("");
  search_bar();     
});
// on input filter
$("#try_div").on('input',function(){

  dump = [...duplicate];
  $("#table_add_id tr").remove();
  deparment_fun();
});


// search bar
function search_bar()
  {
      
      
    $("#error_box").hide();
    tempo.length=0;
    
    
    for(var i=0;i<dump.length;i++)
    {
      // dump[i].employeeName.toLowerCase() == $("#search_id").val().toLowerCase() || dump[i].gender.toLowerCase() == $("#search_id").val().toLowerCase() || dump[i].department.toLowerCase() == $("#search_id").val().toLowerCase()
      if((dump[i].employeeName.toLowerCase().includes($("#search_id").val().toLowerCase()) || dump[i].gender.toLowerCase().includes($("#search_id").val().toLowerCase()) || dump[i].department.toLowerCase().includes($("#search_id").val().toLowerCase())))
      {
        tempo.push(dump[i]);
      }
      
    }
    
    dump.length =0;
    if(tempo.length == 0)
    {
     $("#error_box").show();
    }

  for(var j=0;j<tempo.length;j++)
  {
    dump.push(tempo[j]);
    // dump=[...tempo];
  }
  if($("#search_id").val() == "")
  {
    $("#error_box").hide();
    read_data();
  }
  
  table_data(0);
}


//making dropdown
function dynamic_department()
{
   count = count+1;
  for(var j=0;j<duplicate.length;j++)
  {
    unique_depr[j] = duplicate[j].department 
  }
  unique_depr = unique_depr.filter((item,index) => unique_depr.indexOf(item) === index);   //filter to get unique values

  hij =  `<select name ="department" id="try_department_id" class="form-select rounded-pill"  aria-label="Default select example">
  <option value="" disabled  selected>Select Department</option>`
  for(var i=0;i<unique_depr.length;i++)
  {
    hij +=`<option value="`+unique_depr[i]+`">`+unique_depr[i]+`</option>`; 
  }
  hij = hij + `</select>`;
  
  $("#try_div").append(hij);
}


// filter department
function deparment_fun()
{
  def.length=0
  $("#table_add_id tr").remove();
  if( tempo.length == 0)
  {
    tempo = [...duplicate];
  }
  
  for(var i=0;i<tempo.length;i++)
    {
      if(tempo[i].department == $("#try_department_id").val())
      {
        def.push(tempo[i]);
      }
      
    }
    dump.length =0;
    
    
   for(var j=0;j<def.length;j++)
    {
     dump.push(def[j]);
    }

    if(def.length == 0)
    {
       $("#error_box").show();
    }
    else
    {
      $("#error_box").hide();
    }

   if($("#try_department_id").val() == "")
    {
      $("#error_box").hide();
      read_data();
    }
  
  table_data(0);
}

///add and remove on input
function toggle_input(b)
{

  $("#form_id").on("input",function ()                 ///turning on input type(these does not submitt form)
  {
    validate("false");
      
  });
  if(b == "yes")                                      ///condition for turning off input type
  {
    $("#form_id").off();
    b ="no";
  }
  
}

//create data
function create_data(e)
{
  var aei = document.getElementById("form_id");
  var myFormData = new FormData(aei);
  var formDataObj = {};
  // $("#form_id :input[name = id]").prop("disabled",true);

  myFormData.forEach(function(value, key){
    if(!(key == "avatar"))
    {
      (formDataObj[key] = value)
    }
    else
    {
      (formDataObj[key] = "images\\" +value.name)
    }
  });

  // var r = JSON.stringify(formDataObj);
  // var r =formDataObj;
  $.ajax({
    
    url:'https://647cb714c0bae2880ad11999.mockapi.io/employe',
    method :"POST",
    data : formDataObj,
    success : function()
    {
      alert('Data submitted successfully');
      read_data();
      reset_form();
      // $("b").hide();
      // // $("#success_id").hide();
      // $("#form_id")[0].reset();
    } 
  });
}

///read values Json File
function read_data()
{
  $("#error_box").hide();

  $.ajax({
    
    url:'https://647cb714c0bae2880ad11999.mockapi.io/employe',
    method :"GET",
    success : function(data)
    {
      dump = data.reverse();
      duplicate = [...dump];
      // if(count == 0)                 // pagination should be called only once at the start of program
      // {
        // pagination();
      // }

      // pagination();
      table_data(0);   //pass same data becouse then it will remanine same for whole program. else it will change at differnt scopee and needs to be passed
      if(count == 0)                 // pagination should be called only once at the start of program
      {
        dynamic_department();
      }
    } 
  }); 
}

///set values to table
function set_data(s_id)
{
  $("#form_id :input[name = id]").prop("disabled",true);

  $.ajax({
    
    url:'https://647cb714c0bae2880ad11999.mockapi.io/employe/'+s_id,
    method :"GET",
    success : function(data)
    {
      
      $("#main_label").html("Emp_Id");          //change no to id bec =id not assign at time of creating
      $("#btn_submit_id").hide();
      $("#btn_update_id").show();
      $("#modalLabel_id").html("Update User Data Here");  
      $("#modalLabel_id").css("color","#ffc107");
      
      $("#img_holder").html(`<img  src="`+data.avatar+`" alt="Girl" id="new_img" width="90" height="90" ></img>`);

      // set values      
      $("#main_id").val(data.id);
      $("#employee_id").val(data.employeeName);
      $("#company_id").val(data.companyName);
      $("#department_id").val(data.department);     
      $("input[name=gender]").val([data.gender]);
      $("#phone_id").val(data.phoneNumber);
      $("#email_id").val(data.email);
      // $("#photo_group").hide();
      // if(data.avatar="")
      // {
      //   $("#photo_group").show();  
      // }
      // else
      // {
        // $("#photo_group").remove();  
      // }
      awz = data.avatar;
      $("#btn_submit_id").hide();             
      $("#modal_id").modal("show");           //show pop up box
    } 
  });
  
  
}

//update values in json
function update_data()
{
  // $("#form_id :input[name = id]").prop("disabled",true);
  $("#form_id :input[name = id]").prop("disabled",true);

  var aei = document.getElementById("form_id");
  var myFormData = new FormData(aei);
  var uformDataObj = {};


  myFormData.forEach(function(value, key){                    
    if(!(key == "avatar"))
    {
      (uformDataObj[key] = value)
    }
    else                                                         ///u can not also send and get the avatar.name in table. beaccuse that way server images will not get load
    {
      (uformDataObj[key] = "images\\" +value.name)            ///becuse u can not get the values of path directly       
    }
  });

  var u_id = document.getElementById("main_id").value;
 
  $.ajax(
  {  
    url:'https://647cb714c0bae2880ad11999.mockapi.io/employe/'+(u_id),
    method: 'PUT', 
    data: uformDataObj,
    success : function(data)
    { 
      alert("Successfully updated data form database");
      $("#table_of_items tr").remove(); 
      read_data();
      reset_form();
      // add_file();

    },
  });
 

}

//delets values json file
function delete_data(d_id)
{
  
  var a =confirm('Do u want to permenatly delete Employe_id = ' + d_id +' data from database');    
  
  if(a == true)  ///true
  {
    $.ajax({
      
      url:'https://647cb714c0bae2880ad11999.mockapi.io/employe/'+(d_id),
      method: 'DELETE',  
      success : function(data)
      {
        alert("Successfully deleted data form database");
        $("#table_of_items tr").remove(); 
        read_data();
      }
      
    });
  }
  else// false
  {

  }
}

// show data
function show_data(sh_id)
{
  $.ajax({
    
    url:'https://647cb714c0bae2880ad11999.mockapi.io/employe/'+sh_id,
    method :"GET",
    success : function(data)
    {
      $("#main_label").html("Emp_Id");          //change no to id bec =id not assign at time of creating
      $("#btn_submit_id").hide();
      $("#btn_update_id").hide();
      $("#modalLabel_id").html("Show User Data Here");  
      $("#modalLabel_id").css("color","#1068fe");
      
      $("#img_holder").html(`<img src="`+data.avatar+`" alt="Girl" id="new_img" width="90" height="90" ></img>`);
      
      // $("#form_id").css("disabled",true);
      $("#form_id :input").prop("disabled", true);

      // set values      
      $("#main_id").val(data.id);
      $("#employee_id").val(data.employeeName);
      $("#company_id").val(data.companyName);
      $("#department_id").val(data.department);     
      $("input[name=gender]").val([data.gender]);
      $("#phone_id").val(data.phoneNumber);
      $("#email_id").val(data.email);
      $("#photo_group").hide();
      // $("#btn_submit_id").hide();             
      $("#modal_id").modal("show");           //show pop up box
    } 
  });
}

///set the values form json file to table formate
function table_data(sta)
{ 
  $("a").css("background-color","");                    // on click pagination clear all css bacckground
  $("a").css("color","");
  
  counter = sta;  
  $("#table_add_id tr").remove();
  var adder="";                 
  sto= sta+10;                                           //set data of end values
  pagination();  

  $("#page_"+sta).css("background-color","#198754");     // on click pagination add css bacckground
  $("#page_"+sta).css("color","white");
  if(sta == 0)                                           //start page shoul not have backward arow
  {
    $(".back").hide();
  }
  else
  {
    $(".back").show();
  }
  
  if(((q*10)) <= sto )                          //work when data is not 10,20,30,40
  {
    sto= dump.length;
    $(".front").hide();                           //start page should not have forward arow
    
  }
  else
  {
    $(".front").show();
  }
  

  for(var j=sta;j<sto;j++)
  {
      adder += `<tr>
      
      <td scope="col">`+dump[j].id+`</td>
      <td scope="col">
      <img src="`+dump[j].avatar+`"  width="40" height="40" alt="Error loading img">      
      </td>
      
      <td scope="col">`+dump[j].employeeName+`</td>
      <td scope="col">`+dump[j].companyName+`</td>
      <td scope="col">`+dump[j].department+`</td>
      <td scope="col">`+dump[j].gender+`</td>
      <td scope="col">`+dump[j].phoneNumber+`</td>
      <td scope="col">`+dump[j].email+`</td>

      <td scope="col"><button  class="icon" onclick="show_data(`+dump[j].id+`)"><i class="fas fa-light fa-eye" style="color: #1068fe;"></i></button></td>
      <td scope="col"><button  class="icon" onclick="set_data(`+dump[j].id+`)"><i  class="fas fa-light fa-pen-to-square text-warning"></i></button></td>
      <td scope="col"><button  class="icon" onclick="delete_data(`+dump[j].id+`)"><i class="fas fa-trash text-danger" aria-hidden="true"></i></button></td>
      </tr>`;
  }

    $("#table_add_id").append(adder);
    $("#main_id").val(dump.length);


   
}
  
//validates new created entery
function validate(a)
{

    var validator = true;
    $("#form_id").find('input[type=text],input[type=file],input[type=number],input[name= gender]:checked,input[type=email],select').each(function (index,element) 
    {

      if(a == "update" && element.id == "photo_id" && this.value == "")
      {
        if(awz == "images\\")
        {
          $(element).next().show();
          validator = false;
        }
        else
        {
           $("#photo_group").remove();  
        }

      }
      if(!(element.id =="photo_id"))        //have to remove file becuse can not set it values in js
      {
        this.value = $.trim(this.value);   //trim values
      }
//for update remove image form here we will check above

      if(!(a == "update" && element.id == "photo_id"))
      {
       //Blank Values
       if(this.value == "")
       {
         $(element).next().show();
         validator = false;
       }  
       else
       {
         $(element).next().hide();
       }
      }
      // employee name, company name   
      if(element.id == "employee_id" ||  element.id == "company_id" )
      {
        
        if(containsNum(this.value))
        {
          $(element).next().show();
          validator = false;
        }
      }
      // email
      if(element.id == "email_id")
      {
        if(!(validEmail(this.value)))
        {
          $(element).next().show();
          validator = false;
        }
      }

      

      //phone no        
      if(element.id == "phone_id")
            {
              if(containsAlphabet(this.value) || this.value.length >10 || this.value.length <10 || !(this.value.charAt(0) == 6 || this.value.charAt(0) == 7 || this.value.charAt(0) ==8 || this.value.charAt(0)==9))
              {
                $(element).next().show();
                validator = false;
              }
            }
          });
          
          //send to table
          if(validator == true && a == 'yes')
          {
            create_data();
            b ="yes";  
          }

          if(validator == true && a == "update")
          {
             update_data();
          }
          
}

// validates phone no
function containsAlphabet(str)
        {
          return /[a-z A-Z]/.test(str)
}

/////validate emp-name & comp-name
function containsNum(num)
        {
      return /[0-9]/.test(num)
}

///validate email
function validEmail(strM)
{
  return /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(strM);
}

//add image
function add_file()
{
  var add = `<div id="photo_group" class="row form-group">
  <div class="col">
      <label for="photo_id">Profile Pic</label>
  </div>
  <div class="col">
      <input type="file" name ="avatar" id="photo_id" class="form-control rounded-pill" name="img" accept="image/*" >
      <span><b>***Error Photo RE-ENTER***</b></span>
  </div>
  </div>`;
  $("#form_id").append(add);

}

//reset form
function reset_form()
{
  var z = document.getElementById("photo_group");
      if(z == null){add_file()};

  $("span").hide();
  $("#form_id")[0].reset();
  var close = document.getElementById('close');
  close.click();
  toggle_input("yes");  
  $("#main_id").val(dump.length);
  $("#new_img").remove();
  $('#form_id :input').removeAttr('disabled');
  $("#photo_group").show();
  $("#form_id :input[name = id]").prop("disabled",true);


  
  
}
var q;                               
//pagination
function pagination()
{
  $("li").remove();

  q = Math.ceil(dump.length/10);
 
  if(counter>=30 )
  {
     start_page=(counter/10)-2;
      end_page = (counter/10)+3;
  }
  else
  {
    start_page=0;
    end_page=(5);
  }

  // count = count+1;                      ///pagination shold be called only once
  
  var emp=`<li title="START" class=""  onclick="table_data(0)"><a  class="back page-link"><i class="fa fa-caret-left"></i><i class="fa fa-caret-left"></i>  </a></li>
  <li class="page-item"  onclick="page_sub(counter)" title="Previsus"><a  class="back page-link"><i class="fa-solid fa-arrow-right fa-rotate-180"></i></a></li>`;
  for( k= start_page;k<end_page;k++)
  {
    if(k>=q)
    {
        break;
    }
    
    emp = emp+`<li class="page-item"  onclick="table_data(`+(k*10)+`)"><a id="page_`+ (k*10)+`"class="page-link" style="">`+(k+1)+`</a></li>`;
  }
  emp = emp+ `<li class="page-item" onclick="page_plus(counter)"><a  class="front page-link" title="Next"><i class="fa-solid fa-arrow-right"></i></a></li>
  <li title="END" class=""  onclick="table_data((q-1)*10)"><a  class="front page-link"><i class="fa fa-caret-right"></i><i class="fa fa-caret-right"></i></a></li>`;
  
  $("#pager").append(emp);
  $("a").css("color","black");          
}
//pagination backword
function page_sub(counter)
{
   table_data(counter-10);
}

//pagination forword
function page_plus(counter)
{
  table_data(counter+10);
}




var password_input_elements = document.querySelectorAll('input[type="password"]');



if(document.location.protocol=="https:"){


            if(password_input_elements.length>0){


              alert("The site is loaded over HTTPS and There is a password field");
              //need to check with api
              var xhr = new XMLHttpRequest();
              xhr.open("GET", "http://localhost:3000/api/getstatus/www.google.com", true);
              xhr.onreadystatechange = function() {
              if (xhr.readyState == 4) {
                console.log(xhr.responseText);
                resp = xhr.responseText;
                alert(resp);
              }
            }
            xhr.send();


            }

}

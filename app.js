const express = require('express')
const app = express()
const path    = require("path");

app.get('/',function(req,res){

res.send('home page here');

});


app.get('/livesearch',function(req,res){

 res.sendFile(path.join(__dirname+'/livesearch.html'));

});


app.get('/api/getstatus/:domain', function (req, res) {
  var domain = req.params.domain;
  console.log("Initial Request Receieved: " +domain);


    if(domain.length<3 || domain.length > 75){

      console.log("Invalid Domain: "+ domain);
res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-  With, Content-Type, Accept");

      res.json({error:true,issuer_letsencrypt:'unknown'});

    }else{

            if (/^[a-zA-Z0-9][a-zA-Z0-9-_]{0,61}[a-zA-Z0-9]{0,1}\.([a-zA-Z]{1,6}|[a-zA-Z0-9-]{1,30}\.[a-zA-Z]{2,3})$/.test(domain)) {
                //check if last  char is -
              console.log("Valid Domain: "+ domain);


                    const exec = require('child_process').exec;
                    const testscript = exec('timeout 3 sh counter.sh '+domain);


                    testscript.stdout.on('data', function(data){
                    console.log('data received: '+data);

                    script_response = data;
                    data = parseInt(data);
                    function isNumber (value) {return typeof value === 'number' && isFinite(value);};

                    if(isNumber(data)){
                      console.log("number detected");
                      
			if(parseInt(data)>0){
			console.log(data);
res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-  With, Content-Type, Accept");
                      
  res.json({error:false,issuer_letsencrypt:true});
                      }else{
res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-  With, Content-Type, Accept");
                        
res.json({error:false,issuer_letsencrypt:false});
                      }
                    }

                    });

                    testscript.stderr.on('data', function(data){
                      console.log('error received:')
                      console.log(data);
res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-  With, Content-Type, Accept");
                      
res.json({error:true,issuer_letsencrypt:'unknown'});
                    });




            }else{

              console.log("[!]Invalid Domain "+ domain);
              res.json({error:true,issuer_letsencrypt:'unknown'});
            }
    }









});


app.get('/example',function(req,res){
  res.sendFile(path.join(__dirname+'/example.html'));
  //__dirname : It will resolve to your project folder.
});


app.get('/api/poststatus/:domain', function (req, res) {
  console.log(req.params.domain);
  // check for valid domain
  //send success response
  // wget the page
  //grep for the keywords
  //if found then add to local list
  //if output > 0 send letsencrypt:true
  //else false
  res.send(req.params.domain);
})
app.all('*',function(req,res){

res.redirect('/');

});

app.listen(3000, function () {
  console.log("Let's Phish Backend! listening on port 3000!");
})

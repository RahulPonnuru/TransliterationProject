const http = require("https");
const express=require("express");
const bodyParser=require('body-parser');
const _=require('lodash');
require('dotenv').config();

const app=express();
app.set('view engine',"ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.render("index",{tex:""});
})

app.post("/",function(req,res){
	var text1=req.body.inputData;
	var lang=req.body.language;
	var languageAc="hi";
	var fromSc="Deva";
	if(lang=="Hindi"){
		languageAc="hi";
		fromSc="Deva";
	}else if(lang=="Telugu"){
		languageAc="te";
		fromSc="Telu";
	}else if(lang=="Marathi"){
		languageAc="mr";
		fromSc="Deva";
	}else if(lang=="Tamil"){
		languageAc="ta";
		fromSc="Taml"; 
	}else if(lang=="Kannada"){
		languageAc="kn";
		fromSc="Knda";
	}else if(lang=="Gujrati"){
		languageAc="gu";
		fromSc="Gujr";
	}else if(lang=="Punjabi"){
		languageAc="pa";
		fromSc="Guru";
	}else if(lang=="Odia"){
		languageAc="or";
		fromSc="Orya";
	}else if(lang=="Malayalam"){
		languageAc="ml";
		fromSc="Mlym";
	}else if(lang=="Bengali"){
		languageAc="bn";
		fromSc="Beng";
	}
	const options = {
		"method": "POST",
		"hostname": "microsoft-translator-text.p.rapidapi.com",
		"port": null,
		"path": "/transliterate?api-version=3.0&toScript=Latn&fromScript="+fromSc+"&language="+languageAc,
		"headers": {
			"content-type": "application/json",
			"X-RapidAPI-Key": "8b7a77aaa9msh4ba0e7b98b3e262p1ed70bjsn7e33d1eed9bf",
			"X-RapidAPI-Host": "microsoft-translator-text.p.rapidapi.com",
			"useQueryString": true
		}
	};
	
	const requ = http.request(options, function (response) {
		const chunks = [];
	
		response.on("data", function (chunk) {
			chunks.push(chunk);
		});
	
		response.on("end", function () {
			const body = Buffer.concat(chunks);
			const val=body.toString();
			var finalVal=JSON.parse(val);
			var finalValue=_.capitalize(finalVal[0].text);
			// console.log(finalValue);
			res.render("index",{tex:finalValue});
		});
	});
	
	requ.write(JSON.stringify([{Text: text1}]));
	requ.end();
})

app.listen(3000,function(){
    console.log("Server has started on port 3000");
})

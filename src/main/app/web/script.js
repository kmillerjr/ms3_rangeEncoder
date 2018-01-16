function requestEncodedRange() {

	// clear-out the previous results
	clearResultDiv();
	
	if (Validated()){		
		// extract form values
		var startValue = document.getElementById("startValue").value;
		var endValue = document.getElementById("endValue").value;
		var reversed = document.getElementById("reversed").checked;
	
		// determine API path with parameters
		var encoderURL = "api/EncodedRange?startValue=" + startValue + "&endValue="
				+ endValue + "&reversed=" + reversed;
	
		console.info("calling: " + encoderURL);
		fetch(encoderURL)
			.then(function(response) {
			 
			response.json()
			.then(function(json) {
				 // HTML - print out of JSON response
				jsonTextCreate(JSON.stringify(json, null, 4));
				
				//HTML - print Range in Table	
				tableCreate(json);
			})
			
		})
		.catch(function(error) {
			// If there is any error they are caught here
			console.log("Error: "+ error);
		});
	}
	else{ 
		alert("The Start and End values must be numeric and must be at least 1 but not over 200");
	}
}

function Validated(){
	var valid = true;
	try{
		var startValue = document.getElementById("startValue").value;
		var endValue = document.getElementById("endValue").value;
		
		if ((startValue < 1 ) ||(startValue > 200)){
			valid = false;
		}else if ((endValue < 1 ) ||(endValue > 200)){
			valid = false;
		}
	}
	catch(e){
		 valid = false;
	}
	return valid;
}

function clearResultDiv(){
	document.getElementById("results").innerHTML = "";
}

function jsonTextCreate(jsonText){
	var resultDiv = document.getElementById("results");
    var x = document.createElement("PRE");
    var t = document.createTextNode(jsonText);
    x.appendChild(t);
    x.style ="word-wrap: break-word; white-space: pre-wrap;";
    resultDiv.appendChild(x);
}

function tableCreate(json){

	var resultDiv = document.getElementById("results");
    var tbl = document.createElement('table');
    tbl.style.width = '25%';
    tbl.setAttribute('border', '1');
    var tbdy = document.createElement('tbody');

    //Header Row
    var tr = document.createElement('tr');
    var th = document.createElement('th');
    th.appendChild(document.createTextNode('value'));
    tr.appendChild(th);
    var encodedTh = document.createElement('th');
    encodedTh.appendChild(document.createTextNode('encoded'));
    tr.appendChild(encodedTh);
    tbdy.appendChild(tr)

	//each item in the range array from json
    for(var item in json.range) {
    	console.log(json.range[item]);
    	var tr = document.createElement('tr');
    	var valuetd = document.createElement('td');
    	valuetd.appendChild(document.createTextNode(json.range[item].value));
		tr.appendChild(valuetd);
		var encodetd = document.createElement('td');
		encodetd.appendChild(document.createTextNode(json.range[item].encoded));
		tr.appendChild(encodetd);
		tbdy.appendChild(tr)
    }
    tbl.appendChild(tbdy);
    resultDiv.appendChild(tbl)
}

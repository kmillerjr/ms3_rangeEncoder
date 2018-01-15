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
			 
			 // HTML - print out of JSON response
			response.text()
			.then(function(text) {
				jsonTextCreate(text);
				 
				console.info("JSON: " + text);
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

function jsonTextCreate(json){
	var resultDiv = document.getElementById("results");
    var x = document.createElement("PRE");
    // var t = document.createTextNode(JSON.stringify(json, undefined, 2));
    var t = document.createTextNode(json);
    x.appendChild(t);
    x.style ="word-wrap: break-word; white-space: pre-wrap;";
    resultDiv.appendChild(x);
}

function tableCreate(){
	var body = document.getElementsByTagName('body')[0];
    var tbl = document.createElement('table');
    tbl.style.width = '100%';
    tbl.setAttribute('border', '1');
    var tbdy = document.createElement('tbody');
    for (var i = 0; i < 3; i++) {
        var tr = document.createElement('tr');
        for (var j = 0; j < 2; j++) {
            if (i == 2 && j == 1) {
                break
            } else {
                var td = document.createElement('td');
                td.appendChild(document.createTextNode('\u0020'))
                i == 1 && j == 1 ? td.setAttribute('rowSpan', '2') : null;
                tr.appendChild(td)
            }
        }
        tbdy.appendChild(tr);
    }
    tbl.appendChild(tbdy);
    body.appendChild(tbl)
}

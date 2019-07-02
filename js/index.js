// Load saved data
var x = JSON.stringify(localStorage.getItem("x_values"));
//var y = JSON.stringify(localStorage.getItem("y_values"));
var y =[2,4,6,8,10]

// User input
$("#x_input").click(function(){
	x = [1,2,3,4,5]
	complete_analysis();
});

// basic linReg
// taken from: https://stackoverflow.com/questions/6195335/linear-regression-in-javascript
function linReg(y,x){
        var lr = {};
        var n = y.length;
        var sum_x = 0;
        var sum_y = 0;
        var sum_xy = 0;
        var sum_xx = 0;
        var sum_yy = 0;

        for (var i = 0; i < y.length; i++) {
            sum_x += x[i];
            sum_y += y[i];
            sum_xy += (x[i]*y[i]);
            sum_xx += (x[i]*x[i]);
            sum_yy += (y[i]*y[i]);
        }

        lr['slope'] = (n * sum_xy - sum_x * sum_y) / (n*sum_xx - sum_x * sum_x);
        lr['intercept'] = (sum_y - lr.slope * sum_x)/n;
        lr['r2'] = Math.pow((n*sum_xy - sum_x*sum_y)/Math.sqrt((n*sum_xx-sum_x*sum_x)*(n*sum_yy-sum_y*sum_y)),2);

        return lr;
}

// bool used to track plot's existence
var graph_exists = false; // needed to know when to purge before recreation

var complete_analysis = function(){

	// prevents multiple insances of plotly from existing
	if(graph_exists){
		Plotly.purge(TESTER);
	};

	// Display data thru plotly
	TESTER = document.getElementById('tester');
	Plotly.plot( TESTER, [{x , y}], {margin: { t: 0} } );
	graph_exists = true;

	// linreg analysis
	var results = linReg(y,x);
	$("#equation").html('y = ' + results.slope + 'x +' + results.intercept);
};

complete_analysis();

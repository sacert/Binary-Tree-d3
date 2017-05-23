var height = 300;
var width = 400;

var seed = {i: 0, x: width/2, y: height, a: 0, l: 60, d: 0}; // i = incrementer a = angle, l = length, d = depth 
var randVal = 0.6;
var da = 0.6; // delta angle
var dl = 0.8; // delta length
var maxDepth = 8;

function branchCreation(branch) {
	
	var end = endPoint(branch); // new end point
	var ang; // angle
	var nBranch; // new branch
	
	branches.push(branch);
	
	// check if end
	if (branch.d == maxDepth)
		return;
	
	// left branch
	ang = randVal * Math.random() - randVal * 0.5; // -0.3 to +0.3
	nBranch = {
		i: branches.length,
		x: end.x,
		y: end.y,
		a: branch.a - da + ang,
		l: branch.l * dl,
		d: branch.d + 1
	};
	
	// insert left branch
	branchCreation(nBranch);
	
	// right branch
	ang = randVal * Math.random() - randVal * 0.5; // -0.3 to +0.3
	nBranch = {
		i: branches.length,
		x: end.x,
		y: end.y,
		a: branch.a + da + ang,
		l: branch.l * dl,
		d: branch.d + 1
	};
	
	// right branch
	branchCreation(nBranch);
}

// determine the end point by from the angle
function endPoint(branch) {
	var x = branch.x + branch.l * Math.sin(branch.a);
	var y = branch.y - branch.l * Math.cos(branch.a);
	return {x: x, y: y};
}

function x1(d) {return d.x;} // start x
function y1(d) {return d.y;} // start y
function x2(d) {return endPoint(d).x;} // end x 
function y2(d) {return endPoint(d).y;} // end y

function create() {
	
	branches = [];
	branchCreation(seed);
	
	d3.select('svg')
		.selectAll('line')
		.data(branches)
		.enter()
		.append('line')
		.attr('x1', x1)
		.attr('y1', y1)
		.attr('x2', x2)
		.attr('y2', y2)
		.style('stroke-width', function(d) {return parseInt(maxDepth + 1 - d.d) + 'px';})
}

create();
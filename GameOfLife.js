let grid = new Set();
let cellWidth = 8;
let cellHeight = 6;

function setup(){
	createCanvas(800, 600);
	grid.add("9,10");
	grid.add("10,9");
	grid.add("10,10");
	grid.add("10,11");
	grid.add("11,9");

	frameRate(15);
	
}

function updateGrid(){

	function considerReducer(acc, curr, index, src){
		return(union(acc, neighbors(curr)));
	}

	considerGrid = Array.from(grid).reduce(considerReducer, grid);
	newGrid = new Set();

	for(let c of considerGrid){
		if(intersection(neighbors(c), grid).size == 3){
			newGrid.add(c);
		}
		if(intersection(neighbors(c), grid).size == 2 && grid.has(c)){
			newGrid.add(c);
		}
	}
	console.log(newGrid.size)
	grid = newGrid;
}

function union(setA, setB) {
    let _union = new Set(setA);
    for (let elem of setB) {
        _union.add(elem);
    }
    return _union
}

function intersection(setA, setB) {
    let _intersection = new Set();
    for (let elem of setB) {
        if (setA.has(elem)) {
            _intersection.add(elem);
        }
    }
    return _intersection
}

function draw(){
	background(0);
	for (let c of grid){
		x = parseInt(c.split(",")[0]);
		y = parseInt(c.split(",")[1]);
		rect(x * cellWidth, y * cellHeight, cellWidth, cellHeight);
	}
	
	updateGrid()
}

function neighbors(c){
	x = parseInt(c.split(",")[0]);
	y = parseInt(c.split(",")[1]);

	let nbhd = new Set();

	nbhd.add("x,y".replace("x",x-1).replace("y", y-1));
	nbhd.add("x,y".replace("x",x-1).replace("y", y));
	nbhd.add("x,y".replace("x",x-1).replace("y", y+1));
	nbhd.add("x,y".replace("x",x).replace("y", y-1));
	nbhd.add("x,y".replace("x",x).replace("y", y+1));
	nbhd.add("x,y".replace("x",x+1).replace("y", y-1));
	nbhd.add("x,y".replace("x",x+1).replace("y", y));
	nbhd.add("x,y".replace("x",x+1).replace("y", y+1));
	return nbhd
}
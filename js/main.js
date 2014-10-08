var dataGraph = [ 1, 2, 3, 4, 5, 4, 3, 4, 3, 2];

var dataGraphLoss = [  4, 3, 4, 3, 2, 1 , 1, 2, 3, 4];
var x = d3.scale.linear().domain([0,dataGraph.length+1]).range([0,80*(dataGraph.length+1)]);


var scl = d3.scale.linear()
			.domain([0,d3.max([d3.max(dataGraph),d3.max(dataGraphLoss)])])
			.range([0,500]);
var y = d3.scale.linear()
			.domain([0,d3.max([d3.max(dataGraph),d3.max(dataGraphLoss)])])
			.range([500,0]);
var graphDiv = d3.select('body').append('div')
				.attr('class','graph');
var svgDiv = graphDiv.append('svg')
				.attr('width',1000)
				.attr('height',520)

// svgDiv.selectAll("line.x")
//   .data(x.ticks(dataGraph.length+1))
//   .enter().append("line")
//   .attr("class", "x")
//   .attr("x1", x)
//   .attr("x2", x)
//   .attr("y1", 0)
//   .attr("y2", 500)
//   .style("stroke", "#ccc");
// svgDiv.selectAll("line.y")
//   .data(y.ticks(dataGraph.length+1))
//   .enter().append("line")
//   .attr("class", "y")
//   .attr("x1", 0)
//   .attr("x2", 80*(dataGraph.length+1))
//   .attr("y1", y)
//   .attr("y2", y)
//   .style("stroke", "#ccc");
var xAxis = d3.svg.axis().scale(x).orient('bottom');
var yAxis = d3.svg.axis().scale(y).orient('left');
 
svgDiv.append('g')
  .attr("class", "axis")
  .call(xAxis)
  .attr("transform", "translate(50,500)");;
svgDiv.append('text')
		.attr('class','x-label')
		.attr('x',60)
		.attr('y',15)
		.style('font-family','sans-serif')
		.text("Profit/Loss")
svgDiv.append('g')
  .attr("class", "axis")
  .call(yAxis)
  .attr("transform", "translate(50,0)");

svgDiv.append('text')
		.attr('class','x-label')
		.attr('x',950)
		.attr('y',520)
		.style('font-family','sans-serif')
		.text("Year")



var rectangles = svgDiv.selectAll('rect')
					.data(dataGraph).enter()
					.append('rect');
var profitShown = false;
var rectAttr = rectangles.attr('x',function(d,i){
					return 50+40*(i+1)*2;	
				}).attr('y',500)
				.attr('width',35)
				.attr('height',0)
				.attr('class','top')
				.on('click',function(d,i){
						if(!profitShown){
							var sumProf = dataGraph.slice(0,i+1).reduce(function(prev,curr){
								return prev+curr;
							},0);
							var avg = sumProf/(i+1);
							svgDiv.append('rect')
							.on('click',function(){
								svgDiv.selectAll('#profRect')
								.transition().delay(100)
								.attr('height',0)
								.attr('y',500)
								.remove();
								profitShown = false;
							})
							.attr('x',50)
							.attr('y',500)
							.attr('id','profRect')
							.attr('width',2*40*dataGraph.length)
							.style('fill','#1E90FF')
							.style('z-index',-1)
							.attr('height',0)
							.transition().delay(100)
							.attr('height',scl(avg))
							.attr('y',500-scl(avg))
							.attr('opacity',0.5);

							profitShown = true;
						}else{
							svgDiv.selectAll('#profRect')
								.transition().delay(100)
								.attr('height',0)
								.attr('y',500)
								.remove();
							profitShown = false;
						}
				})
				.style('fill','#27ae60')
				.transition()
				.delay(function(d,i){return i*100+d})
				.attr('y',function(d){
					return 500-scl(d);
				}).transition().attr('height',function(d){
					return scl(d);
				})

var rectAttr1 = svgDiv.selectAll('.new').data(dataGraphLoss	).enter().append('rect')
				.attr('x',function(d,i){
					return 85+40*(i+1)*2;	
				}).attr('y',500)
				.attr('width',35)
				.attr('height',0)
				.style('fill','#e62020')
				.transition()
				.delay(function(d,i){return 1000+i*100+d})
				.attr('y',function(d){
					return 500-scl(d);
				}).transition().attr('height',function(d){
					return scl(d);
				})


$(document).ready();
//Create the SVG
var svg = d3.select("body").append("svg")
		.attr("width", 400)
		.attr("height", 120);

//Create an SVG path
svg.append("path")
	.attr("id", "wavy") //very important to give the path element a unique ID to reference later
	.attr("d", "M 10,90 Q 100,15 200,70 Q 340,140 400,30") //Notation for an SVG path, from bl.ocks.org/mbostock/2565344
	.style("fill", "none")
	.style("stroke", "#AAAAAA");

//Create an SVG text element and append a textPath element
svg.append("text")
   .append("textPath") //append a textPath to the text element
	.attr("xlink:href", "#wavy") //place the ID of the path here
	.style("text-anchor","middle") //place the text halfway on the arc
	.attr("startOffset", "50%")
	.text("Yay, my text is on a wavy path");

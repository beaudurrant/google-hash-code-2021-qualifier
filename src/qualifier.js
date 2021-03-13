// Google Hash Code 2021 Qualifier - Traffic signaling
// @team: Beau Durrant & Phương Anh Tran

const fs = require('fs');

let inputFiles = [
  'input/a.txt',
  'input/b.txt',
  'input/c.txt',
  'input/d.txt',
  'input/e.txt',
  'input/f.txt',
];
let outputFiles = [
  'output/a.out',
  'output/b.out',
  'output/c.out',
  'output/d.out',
  'output/e.out',
  'output/f.out',
];

let edges = [];
function Edge (start, end, street, time) {
  
  this.start = start;
  this.end = end;
  this.street = street;
  this.time = time;

}

let verticies = [];
function Vertex (id) {
  
  this.id = id;
  this.streets = [];
  
  // find our how many paths use this intersection to set light cycle
  this.intersectingPaths = 0;
  
  // find our how many paths per edge (street) are using this intersection
  this.intersectingStreets = [];
  
}

let paths = [];
function Path (numberOfStreets) {
  
  this.numberOfStreets = numberOfStreets;
  this.streets = [];
  this.intersections = [];
  this.travelTime = 0;
  
}

const main = () => {
  
  // loop through our input files to make our submissions
  for (let f = 0; f < inputFiles.length; f++) {
  
    let submission = [];
    let score = 0;
    
    console.log('\n--- Input File: ' + inputFiles[f] + ' ---\n');
    
    // read the data from the text file
    const data = fs.readFileSync(inputFiles[f], 'utf8');
    let lines = data.split(/\r?\n/);
   
    let header = lines.shift().split(' ');

    // get simulation information
    let simulationDuration = parseInt(header[0]);
    let numberOfIntersections = parseInt(header[1]);
    let numberOfStreets = parseInt(header[2]);
    let numberOfCars = parseInt(header[3]);
    let bonusPoints = parseInt(header[4]);
    
    // get intersections
    edges = [];
    verticies = [];
    for (let i = 0; i < numberOfStreets; i++) {
      let info = lines.shift().split(' ');
      let edge = new Edge(info[0], info[1], info[2], info[3]);
      verticies[edge.end] = new Vertex(edge.end);
      edges[info[2]] = edge;
    }
    //console.log(edges);
    
    // get paths
    paths = [];
    for (let i = 0; i < numberOfCars; i++) {
      let info = lines.shift().split(' ');
      let path = new Path(info[0]);
      for (j = 1; j < info[0]; j++) {
        let street = info[j];
        path.streets.push(street);
        let edge = edges[street];
        // add our intersections for street and path
        if (verticies[edge.end].intersectingStreets[street] === undefined) {
          verticies[edge.end].intersectingStreets[street] = 0;
          verticies[edge.end].streets.push(street);
        }
        verticies[edge.end].intersectingStreets[street]++;
        verticies[edge.end].intersectingPaths++;
        // only include travel time if we are not stopped at the first light
        if (path.intersections.length > 0) {
          path.travelTime += parseInt(edge.time);
        }
        // don't add an intersection to go through if we end on this street
        if (j < info[0] - 1) {
          path.intersections.push(edge.end);
        }
      }
      paths.push(path);
    }
    //console.log(paths);
    //console.log(verticies);
    
    let totalIntersections = 0;
    // create our submission
    for (var key in verticies) {
      // traffic passes through this intersection, if none then we don't need it in the submission
      let trafficThroughIntersection = verticies[key].intersectingPaths;
      if (trafficThroughIntersection == 0) continue;
      // add this intersection to our total
      totalIntersections++;
      // intersection number
      submission.push(parseInt(key));
      // number of streets
      let streets = verticies[key].streets;
      submission.push(streets.length);
      // loop though streets and find cycle time based on traffic in intersection and street
      for (let j = 0; j < streets.length; j++) {
        let trafficThroughStreet = verticies[key].intersectingStreets[streets[j]];
        let cycle = Math.floor(trafficThroughIntersection / Math.max(1, trafficThroughIntersection - trafficThroughStreet));
        submission.push(streets[j] + ' ' + cycle);
      }
    }
    // number of intersections used in paths
    submission.unshift(totalIntersections);
    
    // show our submission file
    console.log('\n--- Submission ---\n');
    console.log(submission);
    
    // write our submission file
    fs.writeFileSync(outputFiles[f], submission.join('\r\n'));
    
  }
  
}

main();
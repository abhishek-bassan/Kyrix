// libraries
const Project = require("../../src/index").Project;
const Canvas = require("../../src/Canvas").Canvas;
const Jump = require("../../src/Jump").Jump;
const Layer = require("../../src/Layer").Layer;
const View = require("../../src/View").View;

// project components
const renderers = require("./renderers");
const transforms = require("./transforms");
const placements = require("./placements");

// construct a project
var p = new Project("ipdata", "../../../config.txt")//, 1500, 1000);
p.addRenderingParams(renderers.renderingParams);

// ================== Canvas IpByCountry ===================
var IpByCountryCanvas = new Canvas("IpByCountry", 1500, 1000);
p.addCanvas(IpByCountryCanvas);

// logo layer
var byCountryLayer = new Layer(transforms.byCountryTransform_1, true);
IpByCountryCanvas.addLayer(byCountryLayer);
//byCountryLayer.addPlacement(placements.worldMapPlacement);
byCountryLayer.addRenderingFunc(renderers.byCountryRendering_1);

// ================== Canvas IpByCountry_size ===================
var IpByCountryCanvasSize = new Canvas("IpByCountry_size", 1500, 1000);
p.addCanvas(IpByCountryCanvasSize);

// logo layer
var byCountryLayerSize = new Layer(transforms.byCountryTransform_2, true);
IpByCountryCanvasSize.addLayer(byCountryLayerSize);
//byCountryLayer.addPlacement(placements.worldMapPlacement);
byCountryLayerSize.addRenderingFunc(renderers.byCountryRendering_2);

// ================== Canvas IpByCompany ===================
var IpByCompanyCanvas = new Canvas("IpByCompany", 1000, 20000);
p.addCanvas(IpByCompanyCanvas);

// logo layer
var byCompanyLayer = new Layer(transforms.byCompanyTransform, false);
IpByCompanyCanvas.addLayer(byCompanyLayer);
byCompanyLayer.addPlacement(placements.boxscorePlacement);
byCompanyLayer.addRenderingFunc(renderers.byCompanyRendering_1);


// var statsLayer = new Layer(transforms.byCompanyTransform, false);
// IpByCompanyCanvas.addLayer(statsLayer);
// statsLayer.addPlacement(placements.boxscorePlacement);
// statsLayer.addRenderingFunc(renderers.byCompanyRendering_2);
// ================== Canvas IpByIP ===================
var IpByIPCanvas = new Canvas("IpByIPCanvas", 1000, 10000);
p.addCanvas(IpByIPCanvas);

// logo layer
var byIPLayer = new Layer(transforms.byIPTransform, false);
IpByIPCanvas.addLayer(byIPLayer);
byIPLayer.addPlacement(placements.boxscorePlacement);
byIPLayer.addRenderingFunc(renderers.byIPRendering_1);

// ================== Canvas byElement ===================
var IpbyElementCanvas = new Canvas("IpbyElementCanvas", 1000, 1000);
p.addCanvas(IpbyElementCanvas);

// logo layer
var byElementLayer = new Layer(transforms.byElementTransform, true);
IpbyElementCanvas.addLayer(byElementLayer);
byElementLayer.addRenderingFunc(renderers.byElementRendering);




// setting up initial states
var view = new View("ipdata", 0, 0, 1000, 1000);
p.addView(view);
p.setInitialStates(view, IpByCountryCanvas, 0, 0);


// ================== Average -> Size ===================

var selector = function () {
    return true;
};

var newViewport = function () {
    return {"constant" : [0, 0]};
};

var newPredicate = function (row) {
    var pred = {} ;
        
return {"layer0" : pred};
};

var jumpName = function (row) {
    return "Switch to Country Size" ;
};

p.addJump(new Jump(IpByCountryCanvas, IpByCountryCanvasSize, "semantic_zoom", {selector : selector,
    viewport : newViewport, predicates : newPredicate, name : jumpName}));


// ================== Average -> Company ===================

var selector = function () {
    return true;
};

var newViewport = function () {
    return {"constant" : [0, 0]};
};

var newPredicate = function (row) {
    var pred = {"==" :["countryCode", row.countryCode] };
        
return {"layer0" : pred};
};

var jumpName = function (row) {
    return "IP data for  " + row.country ;
};

p.addJump(new Jump(IpByCountryCanvas, IpByCompanyCanvas, "semantic_zoom", {selector : selector,
    viewport : newViewport, predicates : newPredicate, name : jumpName}));


// ================== Size -> Average ===================

var selector = function () {
    return true;
};

var newViewport = function () {
    return {"constant" : [0, 0]};
};

var newPredicate = function (row) {
    var pred = {} ;
        
return {"layer0" : pred};
};

var jumpName = function (row) {
    return "Switch to Average Size" ;
};

p.addJump(new Jump(IpByCountryCanvasSize,IpByCountryCanvas, "semantic_zoom", {selector : selector,
    viewport : newViewport, predicates : newPredicate, name : jumpName}));


// ================== Size -> Company ===================

var selector = function () {
    return true;
};

var newViewport = function () {
    return {"constant" : [0, 0]};
};

var newPredicate = function (row) {
    var pred = {"==" :["countryCode", row.countryCode] };
        
return {"layer0" : pred};
};

var jumpName = function (row) {
    return "IP data for  " + row.country ;
};

p.addJump(new Jump(IpByCountryCanvasSize, IpByCompanyCanvas, "semantic_zoom", {selector : selector,
    viewport : newViewport, predicates : newPredicate, name : jumpName}));


// ================== Company -> Ips ===================

 selector = function () {
    return true;
};

 newViewport = function () {
    return {"constant" : [0, 0]};
};

 newPredicate = function (row) {
    var pred = {"AND" : [
        {"==" : ["countryCode", row.countryCode]},
        {"==" : ["org", row.org]}
    ]};
        
return {"layer0" : pred};
};

 jumpName = function (row) {
    return "IP data for  " + row.org ;
};

p.addJump(new Jump(IpByCompanyCanvas, IpByIPCanvas, "semantic_zoom", {selector : selector,
    viewport : newViewport, predicates : newPredicate, name : jumpName}));

    

// ================== Ips -> Ip ===================

 selector = function () {
    return true;
};

 newViewport = function () {
    return {"constant" : [0, 0]};
};

 newPredicate = function (row) {
    var pred = {"==" :["ip", row.ip] };
        
return {"layer0" : pred};
};

var jumpName = function (row) {
    return "IP data for  " + row.ip ;
};

p.addJump(new Jump(IpByIPCanvas, IpbyElementCanvas, "semantic_zoom", {selector : selector,
    viewport : newViewport, predicates : newPredicate, name : jumpName}));





// save to db
p.saveProject();

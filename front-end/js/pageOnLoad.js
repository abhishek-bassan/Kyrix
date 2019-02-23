// get from backend the current canvas object assuming curCanvasId is already correctly set
function getCurCanvas(viewId) {

    // get a reference for current globalvar dict
    var globalVarDict = globalVar.views[viewId];

    // check if cache has it
    var postData = "id=" + globalVarDict.curCanvasId;
    for (var i = 0; i < globalVarDict.predicates.length; i ++)
        postData += "&predicate" + i + "=" + globalVarDict.predicates[i];
    if (postData in globalVar.cachedCanvases)
        return new Promise(function (resolve) {
            globalVarDict.curCanvas = globalVar.cachedCanvases[postData].canvasObj;
            globalVarDict.curJump = globalVar.cachedCanvases[postData].jumps;
            globalVarDict.curStaticData = globalVar.cachedCanvases[postData].staticData;
            setupLayerLayouts(viewId);
            resolve();
        });

    // otherwise make a non-blocked http request to the server
    return $.ajax({
        type : "POST",
        url : "canvas",
        data : postData,
        success : function (data) {
            globalVarDict.curCanvas = JSON.parse(data).canvas;
            globalVarDict.curJump = JSON.parse(data).jump;
            globalVarDict.curStaticData = JSON.parse(data).staticData;
            setupLayerLayouts(viewId);

            // insert into cache
            if (! (postData in globalVar.cachedCanvases)) {
                globalVar.cachedCanvases[postData] = {};
                globalVar.cachedCanvases[postData].canvasObj = globalVarDict.curCanvas;
                globalVar.cachedCanvases[postData].jumps = globalVarDict.curJump;
                globalVar.cachedCanvases[postData].staticData = globalVarDict.curStaticData;
            }
        }
    });
}

// setup <g>s and <svg>s for each layer
function setupLayerLayouts(viewId) {

    // get a reference for current globalvar dict
    var globalVarDict = globalVar.views[viewId];

    // number of layers
    var numLayers = globalVarDict.curCanvas.layers.length;

    // remove existing layers
    d3.selectAll(".view" + viewId + ".layerg").remove();

    // reset dynamic boxes
    globalVarDict.boxX = [-1e5];
    globalVarDict.boxY = [-1e5];
    globalVarDict.boxH = [-1e5];
    globalVarDict.boxW = [-1e5];

    // set render data
    globalVarDict.renderData = [];
    for (var i = numLayers - 1; i >= 0; i --)
        globalVarDict.renderData.push([]);

    // hardcoding: keyboard events
    if (globalVarDict.curCanvas.id == "eeg") {
        globalVarDict.eegMagnitude = 3;
        globalVarDict.montage = 1;
        d3.select("body")
            .on("keydown", function () {

                if (event.key == "ArrowLeft" || event.key == "ArrowRight") {
                    if (param.labelingMode == "list")
                        return ;
                    event.preventDefault();
                    event.stopImmediatePropagation();
                    // calculate new transform
                    var delta = (event.key == "ArrowRight" ? -1 : 1);
                    var pixelPerSeg = 250;
                    var numPannedSeg = 5;
                    d3.transition()
                        .duration(1000)
                        .tween("panTween", function () {
                            var i = d3.interpolateNumber(1, pixelPerSeg * numPannedSeg);
                            var initialTransform = d3.zoomTransform(d3.select(".view2.maing").node());
                            return function (t) {
                                var curDelta = i(t) * delta;
                                d3.select(".view2.maing").call(globalVarDict.zoom.transform,
                                    initialTransform.translate(curDelta, 0));
                            };
                        });
                }
                else if (event.key == "ArrowUp" || event.key == "ArrowDown") {
                    event.preventDefault();
                    event.stopImmediatePropagation();
                    if (event.key == "ArrowUp")
                        globalVarDict.eegMagnitude += param.gainIncrease;
                    else
                        globalVarDict.eegMagnitude -= param.gainIncrease;
                    var dboxSvg = d3.select(".layerg.layer1.view2")
                        .select(".mainsvg");

                    dboxSvg.selectAll("*").remove();
                    globalVarDict.curCanvas.layers[1].rendering.parseFunction()(
                        dboxSvg,
                        globalVarDict.renderData[1],
                        globalVarDict.curCanvas.w,
                        globalVarDict.curCanvas.h,
                        globalVarDict.renderingParams,
                        globalVarDict.eegMagnitude,
                        globalVarDict.montage
                    );
                    markMedianSegment();
                }
                else if (event.key == "m") {
                    event.preventDefault();
                    event.stopImmediatePropagation();
                    globalVarDict.montage = globalVarDict.montage % 3 + 1;
                    var dboxSvg = d3.select(".layerg.layer0.view2")
                        .select(".mainsvg");
                    dboxSvg.selectAll("*").remove();
                    globalVarDict.curCanvas.layers[0].rendering.parseFunction()(
                        dboxSvg, globalVarDict.curStaticData[i],
                        globalVarDict.viewportWidth,
                        globalVarDict.viewportHeight,
                        globalVarDict.montage);
                    var dboxSvg = d3.select(".layerg.layer1.view2")
                        .select(".mainsvg");
                    dboxSvg.selectAll("*").remove();
                    globalVarDict.curCanvas.layers[1].rendering.parseFunction()(
                        dboxSvg,
                        globalVarDict.renderData[1],
                        globalVarDict.curCanvas.w,
                        globalVarDict.curCanvas.h,
                        globalVarDict.renderingParams,
                        globalVarDict.eegMagnitude,
                        globalVarDict.montage
                    );
                    markMedianSegment();
                }
            });
    }

    // create mainsvgs
    for (var i = numLayers - 1; i >= 0; i --) {
        var isStatic = globalVarDict.curCanvas.layers[i].isStatic;
        d3.select(".view" + viewId + ".maing")
            .append("g")
            .classed("view" + viewId + " layerg layer" + i, true)
            .append("svg")
            .classed("view" + viewId + " mainsvg", true)
            .classed("static", isStatic)
            .attr("width", globalVarDict.viewportWidth)
            .attr("height", globalVarDict.viewportHeight)
            .attr("preserveAspectRatio", "none")
            .attr("x", 0)
            .attr("y", 0)
            .attr("viewBox", (isStatic ? "0 0"
                + " " + globalVarDict.viewportWidth
                + " " + globalVarDict.viewportHeight
                : globalVarDict.initialViewportX
                + " " + globalVarDict.initialViewportY
                + " " +  globalVarDict.viewportWidth
                + " " + globalVarDict.viewportHeight));
    }
}

// set up page
function pageOnLoad() {

    // reminder to input passcode
    alert("Reminder: please input pre-assigned passcode before making any labels.");

    // set up a svg container
    d3.select("body")
        .append("svg")
        .attr("id", "containerSvg")
        .attr("width", 3100)
        .attr("height", 1800);

    // hardcoded view info - should get from /first
    var viewportWidths = [1000, 1000, 2000];
    var viewportHeights = [1000, 600, 1700];
    var canvasIds = ["clusterlevel0", "", ""];
    var predicates = [[""], [], []];
    var viewSvgX = [0, 0, 1050];
    var viewSvgY = [0, 1100, 0];
    globalVar.Editor.hide();

    // loop over all views, create containerSvgs
    for (var i = 0; i < globalVar.numViews; i ++) {

        // get a reference for current globalvar dict
        var globalVarDict = globalVar.views[i];

        // initialize global variables
        globalVarDict.initialViewportX = 0;
        globalVarDict.initialViewportY = 0;
        globalVarDict.viewportWidth = viewportWidths[i];
        globalVarDict.viewportHeight = viewportHeights[i];
        globalVarDict.predicates = predicates[i];
        globalVarDict.curCanvasId = canvasIds[i];

        // set up view svgs
        d3.select("#containerSvg")
            .append("svg")
            .classed("view" + i + " viewsvg", true)
            .attr("width", globalVarDict.viewportWidth + param.viewPadding * 2)
            .attr("height", globalVarDict.viewportHeight + param.viewPadding * 2)
            .attr("x", viewSvgX[i])
            .attr("y", viewSvgY[i])
            .append("g")
            .classed("view" + i + " maing", true)
            .attr("transform", "translate("
                + param.viewPadding
                + ","
                + param.viewPadding
                + ")")
            .append("rect") // a transparent rect to receive pointer events
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", globalVarDict.viewportWidth)
            .attr("height", globalVarDict.viewportHeight)
            .style("opacity", 0);

        // set up axes group
        d3.select(".view" + i + ".viewsvg")
            .append("g")
            .classed("view" + i + " axesg", true)
            .attr("transform", "translate("
                + param.viewPadding
                + ","
                + param.viewPadding
                + ")");

        if (globalVarDict.curCanvasId != "") {
            var gotCanvas = getCurCanvas(i);
            gotCanvas.then((function (i) {
                return function () {
                    // render static trims
                    renderStaticLayers(i);

                    // set up zoom
                    setupZoom(i, 1);

                    // list labeling
                    if (param.labelingMode == "list")
                        displayNext();
                };
            })(i));
        }
    }
}

$(document).ready(pageOnLoad);

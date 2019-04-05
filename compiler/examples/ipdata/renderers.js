var renderingParams = {
    "timelineUpperY" : 510,
    "timelineLowerY" : 740,
    "cellHeight" : 55,
    "playerNameCellWidth" : 250,
    "statsCellMaxWidth" : 200,
    "headerHeight" : 50,
    "headerbkgcolor" : "#444",
    "oddrowcolor" : "#eaf0f7",
    "evenrowcolor" : "#FFF",
    "headerfontsize" : 18,
    "headerfontcolor" : "#FFF",
    "bodyfontsize" : 19,
    "bodyfontcolor" : "#111",
    "playernamefontsize" : 18   ,
    "playerphotoleftmargin" : 20,
    "playerphotoradius" : 24,
    "teamlogoradius" : 24,
    "avgcharwidth" : 20,
    "shadowrectwidth" : 5,
    "textwrap" : function textwrap(text, width) {
        text.each(function() {
            var text = d3.select(this),
                words = text.text().split(/\s+/).reverse(),
                word,
                line = [],
                lineNumber = 0,
                lineHeight = 1.3, // ems
                x = text.attr("x"),
                y = text.attr("y"),
                dy = parseFloat(text.attr("dy")),
                tspan = text.text(null).append("tspan").attr("x", x).attr("y", y);

            while (word = words.pop()) {
                line.push(word);
                tspan.text(line.join(" "));
                if (tspan.node().getComputedTextLength() > width) {
                    line.pop();
                    tspan.text(line.join(" "));
                    line = [word];
                    tspan = text.append("tspan").attr("x", x).attr("y", y).text(word);
                }
            }
            var tspans = text.selectAll("tspan"), num_tspans = tspans.size();
            var firstY;
            if (num_tspans % 2 == 0)
                firstY = - (num_tspans / 2 - 0.5) * lineHeight;
            else
                firstY = - Math.floor(num_tspans / 2) * lineHeight;
            tspans.attr("dy", function (d, i) {
                return (firstY + lineHeight * i) + 0.35 + "em";
            });
        });
    }
};
// var byCountryRendering = function(svg,data) {
//     g = svg.append("g");
//     elem = g.selectAll("circle")
//             .data(data)
//             .enter();
//     cnt = []
//     avg = []
//     var i;
//     for (i = 0; i < data.length; i++)
//     {
//         cnt.push(data[i].count);
//         avg.push(data[i].average);
//     }
//     var cnt_min = d3.min(cnt);
//     var cnt_max = d3.max(cnt);
//     var avg_min = d3.min(avg);
//     var avg_max = d3.max(avg);
//     var sc = d3.scaleLinear()
//                 .domain([cnt_min,cnt_max])
//                 .range([25,45]);
//     var color = d3.scaleQuantize()
//     .domain([1,99])
//     .range(d3.schemeRdYlBu[5].reverse());;

//     var i;
    
//     elem.append("circle")
//             .attr('cx', function(d) {return d.x})
//             .attr('cy', function(d) {return  d.y})
//             .attr('r',function(d) {return  d3.max([sc(d.count),25]);})
//             .attr('fill',function(d) {return  color(d.average)})
//             .attr("stroke","black")
//             .attr('d1',function(d) {return d.data; }); 
    
//     elem.append('text')
//         .text(function(d) {return d.countryCode;})
//         .attr('fill','black')
//         .attr("x", function(d) {return +d.x -10;})
//         .attr("y", function(d) {return +d.y + 2;});

// };
var byCountryRendering_1 = function(svg,data) {
    g = svg.append("g");
    var width = 1500;
    var height = 1000;
    var projection = d3.geoMercator()
        .scale(130)
        .translate( [width/3.7, height / 3]);
    var projection1 = d3.geoAlbersUsa()
    .scale(2000)
    .translate([1000, 500]);
    cnt = []
    avg = []
    for (i = 0; i < data.length; i++)
    {
        cnt.push(data[i].count);
        avg.push(data[i].average);
    }

    var cnt_min = Math.min.apply(Math,cnt); 
    var cnt_max =  Math.max.apply(Math,cnt);
    var path = d3.geoPath()
        .projection(projection);

        var color = d3.scaleQuantize()
        .domain([1,50])
        .range(d3.schemeRdYlBu[10].reverse());
    g.selectAll("path")
        .data(data)
        .enter()
        .append("path")
        //.attr('d1', function (d) {return d.geomstr;})
        .attr("d", function (d) {
            var geo = d.geomstr.replace("''",'"').replace("''",'"').replace("''",'"').replace("''",'"').replace("''",'"').replace("''",'"');
            var feature = JSON.parse(geo);
            return path(feature);
        })
        .style("stroke", "#fff")
        .style("stroke-width", "0.5")
        .style("fill", function (d) {
            return color(d.average);
        });

};

var byCountryRendering_2 = function(svg,data) {
    g = svg.append("g");
    var width = 1500;
    var height = 1000;
    var projection = d3.geoMercator()
    .scale(130)
    .translate( [width/3.7, height / 3]);
    var projection1 = d3.geoAlbersUsa()
    .scale(2000)
    .translate([1000, 500]);
    cnt = []
    avg = []
    for (i = 0; i < data.length; i++)
    {
        cnt.push(data[i].count);
        avg.push(data[i].average);
    }

    var cnt_min = Math.min.apply(Math,cnt); 
    var cnt_max =  Math.max.apply(Math,cnt);
    var path = d3.geoPath()
        .projection(projection);

        var color = d3.scaleQuantize()
        .domain([1,100])
        .range(d3.schemeRdYlBu[10].reverse());
    g.selectAll("path")
        .data(data)
        .enter()
        .append("path")
        //.attr('d1', function (d) {return d.geomstr;})
        .attr("d", function (d) {
            var geo = d.geomstr.replace("''",'"').replace("''",'"').replace("''",'"').replace("''",'"').replace("''",'"').replace("''",'"');
            var feature = JSON.parse(geo);
            return path(feature);
        })
        .style("stroke", "#fff")
        .style("stroke-width", "0.5")
        .style("fill", function (d) {
            return color(d.count);
        });

};

// var byCompanyRendering = function(svg,data) {
//     g = svg.append("g");
//     elem = g.selectAll("circle")
//             .data(data)
//             .enter();
    
//     cnt = []
//     avg = []
//     var i;

//     for (i = 0; i < data.length; i++)
//     {
//         cnt.push(data[i].count);
//         avg.push(data[i].average);
//     }

//     var cnt_min = Math.min.apply(Math,cnt); 
//     var cnt_max =  Math.max.apply(Math,cnt);
//     var avg_min =  Math.min.apply(Math,avg);
//     var avg_max =  Math.max.apply(Math,avg);
//     var sc = d3.scaleLinear()
//                 .domain([cnt_min,cnt_max])
//                 .range([25,60]);
//     var color = d3.scaleQuantize()
//     .domain([1,50])
//     .range(d3.schemeRdYlBu[10].reverse());

//     var l = data.length;
//     // for (i = 0; i < data.length; i++) { 
//     //     data[i]["x"] =  Math.floor(50 + 900*Math.random());
//     //     data[i]["y"] =  Math.floor(50 + 900*Math.random()); 
//     // }
//     elem.append("circle")
//             .attr('cx', function(d) {return d.x})
//             .attr('cy', function(d) {return  d.y})
//             .attr('r',function(d) {return  sc(d.count);})
//             .attr('fill',function(d) {return  color(d.average)})
//             .attr("stroke","black")
//             .attr('d1',function(d) {return [d.count,cnt_min,cnt_max]; }); 
    
//     // elem.append('text')
//     //     .text(function(d) {return d.org;})
//     //     .attr('fill','black')
//     //     .attr("x", function(d) {return +d.x -10;})
//     //     .attr("y", function(d) {return +d.y + 2;});

// };

var byCompanyRendering_1 = function (svg, data, args) {

    // create a new g
    var g = svg.append("g");
    var height = args.viewportH;
    var params = args.renderingParams;
    data.sort(function(a,b){return b.count - a.count;}) 
    // precompute some stuff
    var headerStartHeight = 5;
    var firstRowHeight = headerStartHeight + params.headerHeight;

    // shadow filter def


    // playername header bkg rect
    g.append("rect")
        .attr("width", params.playerNameCellWidth)
        .attr("height", params.headerHeight)
        .attr("x", 0)
        .attr("y", headerStartHeight)
        .style("fill", params.headerbkgcolor);

    // playername header text
    g.append("text")
        .text("Orgs")
        .attr("x", params.playerNameCellWidth / 2)
        .attr("y", headerStartHeight + params.headerHeight / 2)
        .attr("dy", ".35em")
        .attr("font-size", params.headerfontsize)
        .attr("text-anchor", "middle")
        .style("fill-opacity", 1)
        .style("fill", params.headerfontcolor);

    // player name bkg rect
    g.selectAll(".playernamerect")
        .data(data)
        .enter()
        .append("rect")
        .attr("width", params.playerNameCellWidth)
        .attr("height", params.cellHeight)
        .attr("x", 0)
        .attr("y", function (d, i) {
            return firstRowHeight + i * params.cellHeight;
        })
        .style("fill", function (d, i) {
            if (i % 2 == 0) return params.evenrowcolor;
            return params.oddrowcolor;
        });

    // player photos
    g.append("defs")
        .append("mask")
        .attr("id", "circlemask")
        .attr("maskUnits", "objectBoundingBox")
        .attr("maskContentUnits", "objectBoundingBox")
        .append("circle")
        .attr("cx", "0.5")
        .attr("cy", "0.5")
        .attr("r", "0.5")
        .attr("fill", "white");
    

    // playernames
    g.selectAll(".playername")
        .data(data)
        .enter()
        .append("text")
        .text(function(d) {return d.org;})
        .attr("x", function() {
            //console.log(d);
            var textLeft = params.playerphotoleftmargin + params.playerphotoradius * 2;
            //return (params.playerNameCellWidth - textLeft) / 2 + textLeft;
            return textLeft + 15;
        })
        .attr("y", function (d, i) {
            return firstRowHeight + (i + 0.5) * params.cellHeight;
        })
        .attr("dy", ".35em")
        .attr("font-size", params.playernamefontsize)
        .attr("text-anchor", "left")
        .style("fill-opacity", 1)
        .style("fill", params.bodyfontcolor)
        .call(params.textwrap, params.playerNameCellWidth - params.playerphotoradius * 2 - params.playerphotoleftmargin - 25);

    // team logo
    

    // shadow rect
    g.append("rect")
        .attr("width", params.shadowrectwidth )
        .attr("height", params.headerHeight + (data.length + 1) * params.cellHeight)
        .attr("x", params.playerNameCellWidth - params.shadowrectwidth)
        .attr("y", headerStartHeight)
        .style("fill", "white");
};

var byCompanyRendering_2 = function (svg, data, args) {

    // create a new g
    var g = svg.append("g");
    var height = args.canvasH;
    var params = args.renderingParams;

    // precompute some stuff
    //var headerStartHeight = height / 2 - ((data.length + 1) * params.cellHeight + params.headerHeight) / 2;
    var headerStartHeight = 5;
    var firstRowHeight = headerStartHeight + params.headerHeight;
    var avg_fields = ["FG_PCT", "FG3_PCT", "FT_PCT"];
    var fields = ["country","countryCode","count","average"];

    // loop over stats
    var curLeft = params.playerNameCellWidth;
    for (var i = 0; i < fields.length; i ++) {

        // get precision
        var precision = 0;
        if (avg_fields.indexOf(fields[i]) != -1)
            precision = 2;

        // display name of the current field
        var displayName = (fields[i] == 'turnover' ? 'TO' :
            (fields[i] == 'plus_minus' ? '+/-' :
                (fields[i] == "start_position" ? "POS" : fields[i].toUpperCase())));

        var curColumnWidth = Math.min(displayName.length * params.avgcharwidth, params.statsCellMaxWidth);
        // stats header bkg rect
        g.append("rect")
            .attr("width", curColumnWidth)
            .attr("height", params.headerHeight)
            .attr("x", curLeft)
            .attr("y", headerStartHeight)
            .style("fill", params.headerbkgcolor);

        // stats header text
        g.append("text")
            .text(displayName)
            .attr("x", curLeft + curColumnWidth / 2)
            .attr("y", headerStartHeight + params.headerHeight / 2)
            .attr("dy", ".35em")
            .attr("font-size", params.headerfontsize)
            .attr("text-anchor", "middle")
            .style("fill-opacity", 1)
            .style("fill", params.headerfontcolor);

        // player stats bkg rect
        g.selectAll(".playerstatsrect")
            .data(data)
            .enter()
            .append("rect")
            .attr("width", curColumnWidth)
            .attr("height", params.cellHeight)
            .attr("x", curLeft)
            .attr("y", function (d, i) {
                return firstRowHeight + i * params.cellHeight;
            })
            .style("fill", function (d, i) {
                if (i % 2 == 0) return params.evenrowcolor;
                return params.oddrowcolor;
            });

        // player stats text
        g.selectAll(".playerstatstext")
            .data(data)
            .enter()
            .append("text")
            .text(function (d) {
                return (fields[i] == 'start_position' ? d[fields[i]] : (+d[fields[i]]).toFixed(precision));
            })
            .attr("x", curLeft + curColumnWidth / 2)
            .attr("y", function (d, i) {
                return firstRowHeight + (i + 0.5) * params.cellHeight;
            })
            .attr("font-size", params.bodyfontsize)
            .attr("text-anchor", "middle")
            .attr("dy", ".35em")
            .style("fill-opacity", 1)
            .style("fill", params.bodyfontcolor);

        // team stats bkg rect
        var startHeight = height / 2
            - ((data.length + 1) * params.cellHeight + params.headerHeight) / 2
            + params.headerHeight + params.cellHeight * data.length;
        g.append("rect")
            .attr("width", curColumnWidth)
            .attr("height", params.cellHeight)
            .attr("x", curLeft)
            .attr("y", startHeight)
            .style("fill", (data.length % 2 == 0 ? params.evenrowcolor : params.oddrowcolor));

        // team stats text
        if (fields[i] != 'start_position') {
            var overall = 0;
            for (var j = 0; j < data.length; j ++)
                overall += +data[j][fields[i]];
            if (avg_fields.indexOf(fields[i]) != -1)
                overall = overall / data.length;
            else if (fields[i] == "PLUS_MINUS")
                overall = overall / 5;
            g.append("text")
                .text(overall.toFixed(precision))
                .attr("x", curLeft + curColumnWidth / 2)
                .attr("y", startHeight + params.cellHeight / 2)
                .attr("font-size", params.bodyfontsize)
                .attr("text-anchor", "middle")
                .attr("dy", ".35em")
                .style("fill-opacity", 1)
                .style("fill", params.bodyfontcolor);
        }
        curLeft += curColumnWidth;
    }
};



// var byIPRendering = function(svg,data) {
//     g = svg.append("g");
//     elem = g.selectAll("circle")
//             .data(data)
//             .enter();
//     var sc = d3.scaleLinear()
//             .domain([1,50])
//             .range([2,15]);
//     var color = d3.scaleQuantize()
//             .domain([1,50])
//             .range(d3.schemeRdYlBu[10].reverse());
//     var i;
//     var l = data.length;
//     for (i = 0; i < data.length; i++) { 
//         data[i]["x"] =  Math.floor(50 + 700*Math.random());
//         data[i]["y"] =  Math.floor(50 + 700*Math.random());
//     }
//     elem.append("circle")
//             .attr('cx', function(d) {return d.x})
//             .attr('cy', function(d) {return  d.y})
//             .attr('r',function(d) {return  sc(d.threat);})
//             .attr('fill',function(d) {return  color(d.threat)})
//             .attr("stroke","black") 
//             .attr('d1',function(d) {return d.data; }); 

// };

var byIPRendering_1 = function (svg, data, args) {

    // create a new g
    var g = svg.append("g");
    var height = args.viewportH;
    var params = args.renderingParams;
    data.sort(function(a,b){return b.threat - a.threat;}) 
    // precompute some stuff
    var headerStartHeight = 5;
    var firstRowHeight = headerStartHeight + params.headerHeight;

    // shadow filter def


    // playername header bkg rect
    g.append("rect")
        .attr("width", params.playerNameCellWidth)
        .attr("height", params.headerHeight)
        .attr("x", 0)
        .attr("y", headerStartHeight)
        .style("fill", params.headerbkgcolor);

    // playername header text
    g.append("text")
        .text("Ip")
        .attr("x", params.playerNameCellWidth / 2)
        .attr("y", headerStartHeight + params.headerHeight / 2)
        .attr("dy", ".35em")
        .attr("font-size", params.headerfontsize)
        .attr("text-anchor", "middle")
        .style("fill-opacity", 1)
        .style("fill", params.headerfontcolor);

    // player name bkg rect
    g.selectAll(".playernamerect")
        .data(data)
        .enter()
        .append("rect")
        .attr("width", params.playerNameCellWidth)
        .attr("height", params.cellHeight)
        .attr("x", 0)
        .attr("y", function (d, i) {
            return firstRowHeight + i * params.cellHeight;
        })
        .style("fill", function (d, i) {
            if (i % 2 == 0) return params.evenrowcolor;
            return params.oddrowcolor;
        });

    // player photos
    g.append("defs")
        .append("mask")
        .attr("id", "circlemask")
        .attr("maskUnits", "objectBoundingBox")
        .attr("maskContentUnits", "objectBoundingBox")
        .append("circle")
        .attr("cx", "0.5")
        .attr("cy", "0.5")
        .attr("r", "0.5")
        .attr("fill", "white");
    

    // playernames
    g.selectAll(".playername")
        .data(data)
        .enter()
        .append("text")
        .text(function(d) {return d.ip;})
        .attr("x", function() {
            //console.log(d);
            var textLeft = params.playerphotoleftmargin + params.playerphotoradius * 2;
            //return (params.playerNameCellWidth - textLeft) / 2 + textLeft;
            return textLeft + 15;
        })
        .attr("y", function (d, i) {
            return firstRowHeight + (i + 0.5) * params.cellHeight;
        })
        .attr("dy", ".35em")
        .attr("font-size", params.playernamefontsize)
        .attr("text-anchor", "left")
        .style("fill-opacity", 1)
        .style("fill", params.bodyfontcolor)
        .call(params.textwrap, params.playerNameCellWidth - params.playerphotoradius * 2 - params.playerphotoleftmargin - 25);

    // team logo
    

    // shadow rect
    g.append("rect")
        .attr("width", params.shadowrectwidth )
        .attr("height", params.headerHeight + (data.length + 1) * params.cellHeight)
        .attr("x", params.playerNameCellWidth - params.shadowrectwidth)
        .attr("y", headerStartHeight)
        .style("fill", "white");
};


var byElementRendering = function(svg,data) {
    g = svg.append("g");
    elem = g.selectAll("text")
            .data(data)
            .enter();
    

    elem.append("text")
        .text(function(d) {return ( 'IP: '+d.ip);})
        .attr("x","200")
        .attr("y"   ,"230")
    elem.append("text")
        .text(function(d) {return ( 'Threat: '+d.threat);})
        .attr("x","200")
        .attr("y"   ,"260")
    elem.append("text")
        .text(function(d) {return ( 'Country: '+d.country);})
        .attr("x","200")
        .attr("y"   ,"290")
    elem.append("text")
        .text(function(d) {return ( 'Org: '+d.org);})
        .attr("x","200")
        .attr("y"   ,"320")




 

};




module.exports = {
    renderingParams : renderingParams,
    //byCountryRendering : byCountryRendering,
     //byCompanyRendering : byCompanyRendering,
     //byIPRendering : byIPRendering,
     byElementRendering : byElementRendering,
     byCountryRendering_1 : byCountryRendering_1,
     byCompanyRendering_1 : byCompanyRendering_1,
     byCountryRendering_2 : byCountryRendering_2,
     byCompanyRendering_2 : byCompanyRendering_2,
     byIPRendering_1 : byIPRendering_1
};

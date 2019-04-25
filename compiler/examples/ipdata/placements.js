var teamTimelinePlacement = {
    "centroid_x" : "col:x",
    "centroid_y" : "col:y",
    "width" : "con:160",
    "height" : "con:130"
};

var playByPlayPlacement = {
    "centroid_x" : "con:500",
    "centroid_y" : "col:y",
    "width" : "con:1000",
    "height" : "con:100"
};

var boxscorePlacement = {
    "centroid_x" : "col:cent_x",
    "centroid_y" : "col:cent_y",
    "width" : "con:250",
    "height" : "con:55"
};

var worldMapPlacement = {
    "centroid_x" : "col:bbox_x",
    "centroid_y" : "col:bbox_y",
    "width" : "con:400",
    "height" : "con:400"
};
module.exports = {
    teamTimelinePlacement : teamTimelinePlacement,
    playByPlayPlacement : playByPlayPlacement,
    boxscorePlacement : boxscorePlacement,
    worldMapPlacement: worldMapPlacement
};

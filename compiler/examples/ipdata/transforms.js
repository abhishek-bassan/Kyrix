const Transform = require("../../src/Transform").Transform;


var byCountryTransform = new Transform("select * from IPCountryData;",
    "ipdata",
    function (row){
        var id = row[4] -1;
        var y = Math.floor(id / 6);
        var x = id - y * 6;
        var country = row[0];
        var countryCode = row[1];
        var count = row[2];
        var average = row[3]
        // var geomstr = row[5];
        var ret = [];
        ret.push(country);
        ret.push(countryCode);
        ret.push(count);
        ret.push(average);
        ret.push((x) * 50 + 80);
        ret.push((y) * 50 + 80);
        ret.push(row);
        return Java.to(ret ,"java.lang.String[]");
    },
    ["country","countryCode","count","average","x","y","data"],
    true);


var byCountryTransform_1 = new Transform("select * from IPCountryDataGeo;",
    "ipdata",
    function (row){
        var id = row[4] -1;
        var y = Math.floor(id / 6);
        var x = id - y * 6;
        var country = row[0];
        var countryCode = row[1];
        var count = row[2];
        var average = row[3]
        var geomstr = row[5];
        var ret = [];
        ret.push(country);
        ret.push(countryCode);
        ret.push(count);
        ret.push(average);
        ret.push((x) * 50 + 80);
        ret.push((y) * 50 + 80);
        ret.push(geomstr);
        ret.push(row);
        return Java.to(ret ,"java.lang.String[]");
    },
    ["country","countryCode","count","average","x","y","geomstr","data"],//,"data"],
    true);

    var byCountryTransform_2 = new Transform("select * from IPCountryDataGeo;",
    "ipdata",
    function (row){
        var id = row[4] -1;
        var y = Math.floor(id / 6);
        var x = id - y * 6;
        var country = row[0];
        var countryCode = row[1];
        var count = row[2];
        var average = row[3]
        var geomstr = row[5];
        var ret = [];
        ret.push(country);
        ret.push(countryCode);
        ret.push(count);
        ret.push(average);
        ret.push((x) * 50 + 80);
        ret.push((y) * 50 + 80);
        ret.push(geomstr);
        ret.push(row);
        return Java.to(ret ,"java.lang.String[]");
    },
    ["country","countryCode","count","average","x","y","geomstr","data"],//,"data"],
    true);



    var byCompanyTransform = new Transform("select * from IPCompanyDataMod;",
    "ipdata",
    function (row){
        var country = row[0];
        var countryCode = row[1]; 
        var org = row[2];
        var count = row[3];
        var average = row[4]
        var id = row[5] - 1;
        var total = row[6];
        var ret = [];
        var y = 55 + id*55;
        var x = 0;
        var cent_x = 250*3;
        var cent_y = (3/2)*55 + id*(55);
        ret.push(country);
        ret.push(countryCode);
        ret.push(org);
        ret.push(count);
        ret.push(average);
        ret.push(row);
        //ret.push(total);
        ret.push(x);
        ret.push(y);
        ret.push(cent_x)
        ret.push(cent_y)
        ret.push(id);
        return Java.to(ret ,"java.lang.String[]");
    },
    ["country","countryCode","org","count","average","data","x","y","cent_x","cent_y","id"],
    true);

    var byIPTransform = new Transform("select * from IPDataRank;",
    "ipdata",
    function (row){
        var ip = row[0];
        var threat = row[1];
        var country = row[3];
        var countryCode = row[4]; 
        var org = row[7];
        var ret = [];
        var id = row[8] - 1;
        var y = 55 + id*55;
        var x = 0;
        var cent_x = 250*3;
        var cent_y = 55 + id*(55/2); 
        ret.push(ip);
        ret.push(threat);
        ret.push(country);
        ret.push(countryCode);
        ret.push(org);
        ret.push(row);
        ret.push(id);
        ret.push(x);
        ret.push(y);
        ret.push(cent_x)
        ret.push(cent_y)
        return Java.to(ret ,"java.lang.String[]");
    },
    ["ip","threat","country","countryCode","org","data","id","x","y","cent_x","cent_y"],
    true);


    var byElementTransform = new Transform("select * from IPData;",
    "ipdata",
    function (row){
        var ip = row[0];
        var threat = row[1];
        var country = row[3];
        var countryCode = row[4]; 
        var org = row[7];
        var ret = [];
        ret.push(ip);
        ret.push(threat);
        ret.push(country);
        ret.push(countryCode);
        ret.push(org);
        ret.push(row);
        return Java.to(ret ,"java.lang.String[]");
    },
    ["ip","threat","country","countryCode","org","data"],
    true);





module.exports = {
    byCountryTransform : byCountryTransform,
    byCompanyTransform: byCompanyTransform,
    byIPTransform : byIPTransform,
    byElementTransform : byElementTransform,
    byCountryTransform_1 : byCountryTransform_1,
    byCountryTransform_2:  byCountryTransform_2
}

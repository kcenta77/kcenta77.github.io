$(function () {

    // Grab the data
    var data = [],
        axisx = [],
        axisy = [],
        axisy2 = [],
        table = $("#for-chart");
    $("tbody td", table).each(function (i) {
        data.push(parseFloat($(this).html(), 10));
        //alert($(this).html());
    });
    table.hide();
    $("tbody .score", table).each(function () {
        axisy.push(parseFloat($(this).html(),10));
    });
    $("tbody .pilot", table).each(function () {
        axisy2.push($(this).text());
    });
    $("tfoot th", table).each(function () {
        axisx.push($(this).text());
    });
    // Draw
    var width = 800,
        height = 300,
        leftgutter = 80,
        bottomgutter = 20,
        r = Raphael("chart", width, height),
        txt = {"font": '10px Fontin-Sans, Arial', stroke: "none", fill: "#ccc","text-anchor":"end"},
        X = (width - leftgutter) / axisx.length,
        Y = (height - bottomgutter ) / axisy.length,
        color = $("#chart").css("color");
        max = Math.round(X / 2)+ 6;
    // r.rect(0, 0, width, height, 5).attr({fill: "#000", stroke: "none"});
    for (var i = 0, ii = axisx.length; i < ii; i++) {
        r.text(leftgutter + X * (i + .5), 294, axisx[i]).attr(txt).transform("r-90,t10,0");
    }
    var t = 0;
    for (var i = 0, ii = axisy.length; i < ii; i++) {
        var score = r.text(60, Y * (i + .5), axisy[i]).attr(txt);
        //r.text(40, Y * (i + .5), axisy2[i]).attr(txt);
        score.attr({
            "fill":"#ff00ff"
        });
        var max2 = 22;
        var Rp = axisy[t] && Math.min(Math.round(Math.sqrt(axisy[t] / Math.PI) * 4), max2 );
        if (Rp) {
            (function (dx, dy, R, value) {
                var color2 = "hsb(" + [(2 - R / max) * .5, 1, .75] + ")";
                m = i + 1;
                var url2 =  "url(img/pilot" + m + ".png)";
                var url3 =  "img/pilot" + m + ".png";

                var dt2 = r.circle(dx + 60 + R, dy + 10, R).attr({stroke: "none", "fill": url2, opacity: 0.7, width: 40, height: 50});
                dt2.toBack();
                //if (R > 20) {
                    var bg2 = r.circle(dx + 60 + R, dy + 10, R + 16 ).attr({stroke: "none", fill: url2, opacity: .9}).hide();
                //}
                var lbl2 = r.text(dx + 60 + R, dy + 38, axisy2[t])
                    .attr({"font": '10px Fontin-Sans, Arial', stroke: "none", fill: "#fff"}).hide();
                var dot2 = r.circle(dx + 60 + R, dy + 10, R).attr({stroke: "none", fill: "#000", opacity: 0});
                dot2[0].onmouseover = function () {
                    if (bg2) {
                        bg2.show();
                    } else {
                       // var clr2 = Raphael.rgb2hsb(color);
                       // clr2.b = .5;
                       // dt2.attr("fill", Raphael.hsb2rgb(clr2).hex);
                    }
                    lbl2.show();
                };
                dot2[0].onmouseout = function () {
                    if (bg2) {
                        bg2.hide();
                    } else {
                        //dt2.attr("fill", color);
                    }
                    lbl2.hide();
                };

                var uuid = Raphael.createUUID();
                var pattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern");
                var backgroundImage = r.image(url3, 0, 0, 1, 1);
                pattern.setAttribute("id", uuid);
                pattern.setAttribute("x", 0);
                pattern.setAttribute("y", 0);
                pattern.setAttribute("height", 1);
                pattern.setAttribute("width", 1);
                pattern.setAttribute("patternContentUnits", "objectBoundingBox");
                $(backgroundImage.node).appendTo(pattern);
                $(pattern).appendTo(r.defs);
                $(dt2.node).attr("fill", "url(#" + pattern.id + ")");
                $(bg2.node).attr("fill", "url(#" + pattern.id + ")");

            })( X - Rp - 40 , Y * (i + .5) - 10, Rp, axisy[t])


        }
        t++;

    }
    var o = 0;
    for (var i = 0, ii = axisy.length; i < ii; i++) {
        for (var j = 0, jj = axisx.length; j < jj; j++) {
            var R = data[o] && Math.min(Math.round(Math.sqrt(data[o] / Math.PI) * 4), max);
            if (R) {
                (function (dx, dy, R, value) {
                    var color = "hsb(" + [(0.8 - R / max) * .3, 1, .8] + ")";
                    var dt = r.circle(dx + 60 + R, dy + 10, R).attr({stroke: "none", fill: color});
                    if (R < 3) {
                        var bg = r.circle(dx + 60 + R, dy + 10, 6).attr({stroke: "none", fill: "#ccc", opacity: .4}).hide();
                    }

                    var lbl = r.text(dx + 60 + R, dy + 10, data[o])
                            .attr({"font": '10px Fontin-Sans, Arial', stroke: "none", fill: "#fff"}).hide();
                    var dot = r.circle(dx + 60 + R, dy + 10, max).attr({stroke: "none", fill: "#000", opacity: 0});
                    dot[0].onmouseover = function () {
                        if (bg) {
                            bg.show();
                        } else {
                            var clr = Raphael.rgb2hsb(color);
                            clr.b = .5;
                            dt.attr("fill", Raphael.hsb2rgb(clr).hex);
                        }
                        lbl.show();
                    };
                    dot[0].onmouseout = function () {
                        if (bg) {
                            bg.hide();
                        } else {
                            dt.attr("fill", color);
                        }
                        lbl.hide();
                    };
                })(leftgutter + X * (j + .5) - 60 - R, Y * (i + .5) - 10, R, data[o]);
            }
            o++;
        }
    }
    var text = r.text(100,10,'Наибольшее количество побед за сезон').attr({
        "fill":"#ff0099",
        "font-size":18,
        "text-anchor":"start",
        "font-family":"century gothic"
    }) ;
    var text2 = r.text(5,150,'Всего побед').attr({
        "fill":"#ffff99",
        "font-size":10,
        "text-anchor":"middle",
        "font-family":"century gothic"
    }) ;
    text2.transform("r-90,t10,0");
    var text3 = r.text(690,260,'Все сезоны f1').attr({
        "fill":"#ff00ff",
        "font-size":10,
        "text-anchor":"start",
        "font-family":"century gothic"
    }) ;

});
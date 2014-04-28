$(function () {

    // Grab the data
    var data = [],
        axisx = [],
        axisy = [],
        axisy2 = [],
        table = $("#for-chart");
    $("tbody td", table).each(function (i) {
        data.push(parseFloat($(this).html(), 10));
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
    var width = 1000,
        height = 400,
        leftgutter = 80,
        bottomgutter = 30,
        r = Raphael("chart", width, height),
        txt = {"font": '10px Fontin-Sans, Arial', stroke: "none", fill: "#ccc","text-anchor":"end", "font-weight":"bold"},
        X = (width - leftgutter) / axisx.length,
        Y = (height - bottomgutter ) / axisy.length,
        color = $("#chart").css("color");
    var thWidthY = 60;
        max = Math.round(X / 2)+11;
    // r.rect(0, 0, width, height, 5).attr({fill: "#000", stroke: "none"});
    for (var i = 0, ii = axisx.length; i < ii; i++) {
        r.text(leftgutter + X * (i + .5), 394, axisx[i]).attr(txt).transform("r-90,t10,0");
    }
    var t = 0;
    for (var i = 0, ii = axisy.length; i < ii; i++) {

        var max2 = 26;
        var Rp = axisy[t] && Math.min(Math.round(Math.sqrt(axisy[t] / Math.PI) * 4), max2 );
        if (Rp) {

            (function (dx, dy, R, value) {

                var color2 = "hsb(" + [(1 - R / max2) * 1.4, 1, .8] + ")";

                var score = r.text(40, Y * (i + .5), axisy[i]).attr({"fill":color2,"font-weight":"bold"});
                //r.text(40, Y * (i + .5), axisy2[i]).attr(txt);
                m = i + 1;
                var url2 =  "url(img/pilot" + m + ".png)";
                var url3 =  "img/pilot" + m + ".png";

                var dt2 = r.circle(dx + 90 + R, dy + 10, R).attr({stroke: "none", "fill": url2, opacity: 0.7});
                dt2.toBack();
                //if (R > 20) {
                    var bg2 = r.circle(dx + 90 + R, dy + 10, R + 22).attr({stroke: "none", fill: url2, opacity: .9}).hide();
                //}
                var lbl2 = r.text(dx + 90 + R, dy + 36, axisy2[t])
                    .attr({"font": '10px Fontin-Sans, Arial', stroke: "none", fill: color2}).hide();
                var dot2 = r.circle(dx + 90 + R, dy + 10, R).attr({stroke: "none", fill: "#000", opacity: 0, cursor:"url(img/1.png),pointer"});
                dot2[0].onmouseover = function () {
                    if (bg2) {
                        bg2.show()
                        .animate({
                            transform:"t260,90s3",
                             hsb: [1, 0, 0.5]
                        },2000,"elastic");

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
                        /*dt2.animate({
                            transform:"t0,0"
                        },10);*/
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
                    var color = "hsb(" + [(1 - R / max) * 1.5, 1, .8] + ")";
                    //alert(dx+" "+dy);
                    var dt = r.circle(dx + 60 + R, dy + 10, R).attr({stroke: "none", fill: color});
                    var ldx =    dx + 60 + R;
                    var ldy =        dy + 10;
                    var lds =        height - dy - 30 ;
                    var linePath =  "M" + ldx +","+ ldy + "l" + "0," + lds;
                    var line = r.path(linePath).attr({fill: color, stroke: "#ff66ee","stroke-dasharray":"--"}).toBack().hide();

                    /*if (R < 7) {
                        var bg = r.circle(dx + 60 + R, dy + 10, 6).attr({stroke: "none", fill: "#ccc", opacity: .4}).hide();

                    }*/

                    var lbl = r.text(dx + 60 + R , dy + 10, data[o])
                            .attr({"font": '10px Fontin-Sans, Arial', stroke: "none", fill: "#fff"}).hide();
                    var dot = r.circle(dx + 60 + R, dy + 10, max).attr({stroke: "none", fill: "#000", opacity: 0});

                    dot[0].onmouseover = function () {
                        //if (bg) {
                            dt.show();
                        dt.attr("fill", color).animate({
                            transform:"t1,2s1.3",
                            hsb: [1, 0, 0.5]
                        },2000,"elastic");
                        line.show().toBack();

                        //} else {
                           // var clr = Raphael.rgb2hsb(color);
                           // clr.b = .5;
                            //line.show();
                            /*dt.show().animate({
                                transform:"t1,2s1.5",
                                hsb: [1, 0, 0.5]
                            },2000,"elastic").toFront();*/
                            //line.show();
                        //}
                        lbl.show().transform("t1,2s1.5")/*.attr({"font-weight":"bold"})*/;
                    };
                    dot[0].onmouseout = function () {
                        //if (bg) {
                           // bg.hide();
                           // line.hide();
                        //dt.attr("fill", color).toBack();
                        //} else {
                           dt.show().animate({
                                transform:"t0,0s1",
                                hsb: [1, 0, 0.5]
                            },2000,"elastic");
                            dt.attr("fill", color).toBack();
                            line.hide();
                       // }
                        lbl.hide();
                    };
                })(leftgutter + X * (j + .5) - 60 - R, Y * (i + .5) - 10, R+6, data[o]);
            }
            o++;
        }
    }
    var text = r.text(100,10,'Наибольшее количество побед за сезон').attr({
        "fill":"#cc00c3",
        "font-size":18,
        "text-anchor":"start",
        "font-family":"century gothic"
    }) ;
    var text2 = r.text(5,150,'Всего побед').attr({
        "fill":"#cc00c3",
        "font-size":18,
        "text-anchor":"middle",
        "font-family":"century gothic"
    }) ;
    text2.transform("r-90,t10,0");
    var text3 = r.text(690,260,'---').attr({
        "fill":"#cc00c3",
        "font-size":18,
        "text-anchor":"start",
        "font-family":"century gothic"
    }) ;

});
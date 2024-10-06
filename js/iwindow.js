//version 1.5
//parameter 字典类型 可含如下键与值：
//height  窗口高          正整数，大于或等于100  缺省值为100
//width   窗口宽          正整数，大于或等于150  缺省值为150
//title   窗口标题        字符串                缺省值为“窗口”+编号
//content 窗口内容        字符串                缺省值为null
//mode    窗口按钮样式     数字1,2,3,4,5,6          缺省值为1
//                        1   菜单、最小化、最大化、关闭 （若menu为null，则转向2）
//                        2   最小化、最大化、关闭
//                        3   关闭
//                        4   无按钮
//                        5   菜单、关闭（若menu为null，则转向3）
//                        6   菜单（若menu为null，则转向4）
//menu    菜单            二维数组Array，例如 [["关于", about], ["帮助", help], ["使用", use]] 缺省值为null
//size    窗口大小样式     数字1,2,3            缺省值为1
//                        1   普通
//                        2   最大化
//                        3   最小化
//color   窗口颜色         字符串，HEX或RGB或RGBA，决定标题栏、内容部分的背景颜色，以及文字颜色（自动调整明暗两色），缺省值为"#FFFFFF"
//x       窗口横坐标       数字                  缺省值为null
//y       窗口纵坐标       数字                  缺省值为null
//mask    是否生成屏障     布尔值（true或false），缺省值为false
//content_overflow 指定内容Overflow属性 字符串   缺省值为auto
function iwindow(parameter) {
    for (var i = 1; ; i++) {
        if (iwindow_attributes[i] == null) break;
    }
    window.iwindow_attributes[i] = new Array();
    if (parameter.width == null || parameter.width < 150) iwindow_attributes[i].width = 150;
    else iwindow_attributes[i].width = parameter.width;

    if (parameter.height == null || parameter.height < 100) iwindow_attributes[i].height = 100;
    else iwindow_attributes[i].height = parameter.height;

    if (parameter.title == null) iwindow_attributes[i].title = "窗口_" + i;
    else iwindow_attributes[i].title = parameter.title;

    if (parameter.content == null) iwindow_attributes[i].content = "窗口内容_" + i;
    else iwindow_attributes[i].content = parameter.content;

    if (parameter.mode != 1 && parameter.mode != 2 && parameter.mode != 3 && parameter.mode != 4 && parameter.mode != 5 && parameter.mode != 6) iwindow_attributes[i].mode = 1;
    else iwindow_attributes[i].mode = parameter.mode;
    if (iwindow_attributes[i].mode == 1 && parameter.menu == null) iwindow_attributes[i].mode = 2;
    else if (iwindow_attributes[i].mode == 5 && parameter.menu == null) iwindow_attributes[i].mode = 3;
    else if (iwindow_attributes[i].mode == 6 && parameter.menu == null) iwindow_attributes[i].mode = 4;

    if (parameter.size != 1 && parameter.size != 2 && parameter.size != 3) iwindow_attributes[i].size = 1;
    else iwindow_attributes[i].size = parameter.size;

    if (parameter.mask != true) iwindow_attributes[i].mask = false;
    else iwindow_attributes[i].mask = parameter.mask;

    if (parameter.color == null) iwindow_attributes[i].color = "#FFFFFF";
    else iwindow_attributes[i].color = parameter.color;

    if (parameter.content_overflow == null) iwindow_attributes[i].content_overflow = "auto";
    else iwindow_attributes[i].content_overflow = parameter.content_overflow;

    if (parameter.menu != null) iwindow_attributes[i].menu = parameter.menu;

    iwindow_attributes[i].x = parameter.x;
    iwindow_attributes[i].y = parameter.y;
    window.iwindow_top_zIndex = 10001;
    //框架
    var div = document.createElement("div");
    div.id = "iwindow_frame_" + i;
    div.setAttribute("iNumber", i);
    document.body.appendChild(div);

    //框架->窗口
    var div = document.createElement("div");
    div.id = "iwindow_window_" + i;
    div.style.transition = "all .3s ease";
    if (iwindow_attributes[i].mask) div.style.zIndex = "2000000002";
    else div.style.zIndex = "10001";
    div.style.color = "#000000";
    div.style.fontSize = "14px";
    div.style.lineHeight = "24px";
    div.style.position = "fixed";
    div.style.borderRadius = "5px";
    div.style.webkitBoxShadow = "2px 2px 10px #909090";
    div.style.boxShadow = "2px 2px 10px #909090";
    div.style.backgroundColor = "#FFFFFF";
    div.style.width = iwindow_attributes[i].width + "px";
    div.style.height = iwindow_attributes[i].height + "px";
    div.style.opacity = "0";
    iwindow_attributes[i]["display_mode"] = "normal";
    iwindow_attributes[i]["dafault_width"] = iwindow_attributes[i].width + "px";
    iwindow_attributes[i]["dafault_height"] = iwindow_attributes[i].height + "px";
    iwindow_attributes[i]["dafault_title_width"] = iwindow_attributes[i].width + "px";
    div.onmousedown = function () {
        iwindow_top(i);
    }
    div.ontouchstart = function () {
        iwindow_top(i);
    }
    if (iwindow_attributes[i].mode == 2) iwindow_attributes[i]["dafault_title_words_width"] = iwindow_attributes[i].width - 5 - 90 + "px";
    else if (iwindow_attributes[i].mode == 3) iwindow_attributes[i]["dafault_title_words_width"] = iwindow_attributes[i].width - 5 - 30 + "px";
    else if (iwindow_attributes[i].mode == 4) iwindow_attributes[i]["dafault_title_words_width"] = iwindow_attributes[i].width - 5 + "px";
    else if (iwindow_attributes[i].mode == 5) iwindow_attributes[i]["dafault_title_words_width"] = iwindow_attributes[i].width - 5 - 60 + "px";
    else if (iwindow_attributes[i].mode == 6) iwindow_attributes[i]["dafault_title_words_width"] = iwindow_attributes[i].width - 5 - 30 + "px";
    else iwindow_attributes[i]["dafault_title_words_width"] = iwindow_attributes[i].width - 5 - 120 + "px";
    document.getElementById("iwindow_frame_" + i).appendChild(div);
    var mx;
    if (iwindow_attributes[i].x == null) mx = document.documentElement.clientWidth - document.getElementById("iwindow_window_" + i).offsetWidth - 80 + "px";
    else mx = iwindow_attributes[i].x + 10 + "px";
    document.getElementById("iwindow_window_" + i).style.left = mx;
    var uy;
    if (iwindow_attributes[i].y == null) uy = document.documentElement.clientHeight - document.getElementById("iwindow_window_" + i).offsetHeight - 30 + "px";
    else uy = iwindow_attributes[i].y + "px";
    document.getElementById("iwindow_window_" + i).style.top = uy;

    //框架->窗口->标题
    var div = document.createElement("div");
    div.id = "iwindow_window_title_" + i;
    div.style.webkitUserSelect = "none";
    div.style.userSelect = "none";
    div.onselectstart = function () { return false; }
    div.style.borderRadius = "5px 5px 0 0";
    div.style.height = "30px";
    div.style.borderBottom = "solid 1px #F2F2F2";
    div.style.width = iwindow_attributes[i]["dafault_title_width"];
    document.getElementById("iwindow_window_" + i).appendChild(div);

    //框架->窗口->标题->标题文字
    var div = document.createElement("div");
    div.id = "iwindow_window_title_words_" + i;
    div.style.float = "left";
    div.style.fontSize = "14px";
    div.style.lineHeight = "30px";
    div.style.padding = "0 0 0 5px";
    div.style.overflow = "hidden";
    div.style.textOverflow = "ellipsis";
    div.style.whiteSpace = "nowrap";
    div.style.width = iwindow_attributes[i]["dafault_title_words_width"];
    div.innerHTML = iwindow_attributes[i].title;
    div.style.cursor = "move";
    div.onmousedown = function () {
        iwindow_window_start_move(i);
    }
    div.ontouchstart = function () {
        iwindow_window_start_move_touch(i);
    }
    div.ontouchmove = function () {
        iwindow_window_on_move_touch(i);
    }
    div.ontouchend = function () {
        iwindow_window_complete_move_touch(i);
    }
    div.ontouchcancel = function () {
        iwindow_window_complete_move_touch(i);
    }
    if (iwindow_attributes[i].mode == 1 || iwindow_attributes[i].mode == 2) {
        div.addEventListener("touchmove", (e) => {
            e.preventDefault();
        }, { passive: false });
    }
    document.getElementById("iwindow_window_title_" + i).appendChild(div);

    if (iwindow_attributes[i].mode == 1 || iwindow_attributes[i].mode == 5 || iwindow_attributes[i].mode == 6) {
        //框架->窗口->标题->菜单按钮
        var div = document.createElement("div");
        div.id = "iwindow_window_menu_button_" + i;
        div.style.fontFamily = "\"Fira Sans\",\"Noto Sans SC\",\"sans-serif\"";
        div.style.position = "absolute";
        if (iwindow_attributes[i].mode == 5) div.style.right = "30px";
        else if (iwindow_attributes[i].mode == 6) div.style.right = "0";
        else div.style.right = "90px";
        div.style.textAlign = "center";
        div.style.height = "30px";
        div.style.width = "30px";
        div.style.border = "none";
        div.style.transition = "all .3s ease";
        if (iwindow_attributes[i].mode == 6) div.style.borderRadius = "0 5px 0 0";
        div.onmouseover = function () {
            document.getElementById("iwindow_window_menu_button_" + i).style.backgroundColor = "#12B7F5";
            document.getElementById("iwindow_window_menu_button_svg_line1_" + i).style.stroke = "#FFFFFF";
            document.getElementById("iwindow_window_menu_button_svg_line2_" + i).style.stroke = "#FFFFFF";
            document.getElementById("iwindow_window_menu_button_svg_line3_" + i).style.stroke = "#FFFFFF";
        }
        div.onmouseleave = function () {
            document.getElementById("iwindow_window_menu_button_" + i).style.backgroundColor = "";
            var ncol;
            if (iwindow_attributes[i]["content_color"] != null) ncol = iwindow_attributes[i]["content_color"];
            else ncol = "#000000";
            document.getElementById("iwindow_window_menu_button_svg_line1_" + i).style.stroke = ncol;
            document.getElementById("iwindow_window_menu_button_svg_line2_" + i).style.stroke = ncol;
            document.getElementById("iwindow_window_menu_button_svg_line3_" + i).style.stroke = ncol;
        }
        div.onclick = function () {
            iwindow_create_menu(i, iwindow_attributes[i].menu);
        }
        div.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 640 640\"><defs><style>.cls-iwindow_window_menu_button_svg{fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:40px;transition:all .3s ease;}</style></defs><line id=\"iwindow_window_menu_button_svg_line1_" + i + "\" class=\"cls-iwindow_window_menu_button_svg\" x1=\"132.5\" y1=\"320\" x2=\"507.5\" y2=\"320\"/><line id=\"iwindow_window_menu_button_svg_line2_" + i + "\" class=\"cls-iwindow_window_menu_button_svg\" x1=\"132.5\" y1=\"180\" x2=\"507.5\" y2=\"180\"/><line id=\"iwindow_window_menu_button_svg_line3_" + i + "\" class=\"cls-iwindow_window_menu_button_svg\" x1=\"132.5\" y1=\"460\" x2=\"507.5\" y2=\"460\"/></svg>"
        document.getElementById("iwindow_window_title_" + i).appendChild(div);
    }
    if (iwindow_attributes[i].mode == 1 || iwindow_attributes[i].mode == 2) {
        //框架->窗口->标题->最小化按钮
        var div = document.createElement("div");
        div.id = "iwindow_window_minimize_button_" + i;
        div.style.fontFamily = "\"Fira Sans\",\"Noto Sans SC\",\"sans-serif\"";
        div.style.position = "absolute";
        div.style.right = "60px";
        div.style.textAlign = "center";
        div.style.height = "30px";
        div.style.width = "30px";
        div.style.border = "none";
        div.style.transition = "all .3s ease";
        div.onmouseover = function () {
            document.getElementById("iwindow_window_minimize_button_" + i).style.backgroundColor = "#12B7F5";
            if (document.getElementById("iwindow_window_minimize_button_svg1_line_" + i) != null) document.getElementById("iwindow_window_minimize_button_svg1_line_" + i).style.stroke = "#FFFFFF";
            if (document.getElementById("iwindow_window_minimize_button_svg2_rect_" + i) != null) document.getElementById("iwindow_window_minimize_button_svg2_rect_" + i).style.stroke = "#FFFFFF";
            if (document.getElementById("iwindow_window_minimize_button_svg2_polygon_" + i) != null) document.getElementById("iwindow_window_minimize_button_svg2_polygon_" + i).style.stroke = "#FFFFFF";
        }
        div.onmouseleave = function () {
            document.getElementById("iwindow_window_minimize_button_" + i).style.backgroundColor = "";
            var ncol;
            if (iwindow_attributes[i]["content_color"] != null) ncol = iwindow_attributes[i]["content_color"];
            else ncol = "#000000";
            if (document.getElementById("iwindow_window_minimize_button_svg1_line_" + i) != null) document.getElementById("iwindow_window_minimize_button_svg1_line_" + i).style.stroke = ncol;
            if (document.getElementById("iwindow_window_minimize_button_svg2_rect_" + i) != null) document.getElementById("iwindow_window_minimize_button_svg2_rect_" + i).style.stroke = ncol;
            if (document.getElementById("iwindow_window_minimize_button_svg2_polygon_" + i) != null) document.getElementById("iwindow_window_minimize_button_svg2_polygon_" + i).style.stroke = ncol;
        }
        div.onclick = function () {
            iwindow_minimize(i);
        }
        div.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 640 640\"><defs><style>.cls-iwindow_window_minimize_button_svg1{fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:40px;transition:all .3s ease;}</style></defs><line id=\"iwindow_window_minimize_button_svg1_line_" + i + "\" class=\"cls-iwindow_window_minimize_button_svg1\" x1=\"132.5\" y1=\"312.21\" x2=\"507.5\" y2=\"312.21\"/></svg>"
        document.getElementById("iwindow_window_title_" + i).appendChild(div);

        //框架->窗口->标题->最大化按钮
        var div = document.createElement("div");
        div.id = "iwindow_window_maximize_button_" + i;
        div.style.fontFamily = "\"Fira Sans\",\"Noto Sans SC\",\"sans-serif\"";
        div.style.position = "absolute";
        div.style.right = "30px";
        div.style.textAlign = "center";
        div.style.height = "30px";
        div.style.width = "30px";
        div.style.border = "none";
        div.style.transition = "all .3s ease";
        div.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 640 640\"><defs><style>.cls-iwindow_window_maximize_button_svg{fill:none;stroke:#000000;stroke-miterlimit:10;stroke-width:40px;transition:all .3s ease;}</style></defs><rect id=\"iwindow_window_maximize_button_svg_rect_" + i + "\" class=\"cls-iwindow_window_maximize_button_svg\" x=\"126.88\" y=\"161.84\" width=\"386.24\" height=\"316.33\"/></svg>";
        div.onmouseover = function () {
            document.getElementById("iwindow_window_maximize_button_" + i).style.backgroundColor = "#12B7F5";
            document.getElementById("iwindow_window_maximize_button_svg_rect_" + i).style.stroke = "#FFFFFF";
            if (document.getElementById("iwindow_window_maximize_button_svg_polygon_" + i) != null) document.getElementById("iwindow_window_maximize_button_svg_polygon_" + i).style.stroke = "#FFFFFF";
        }
        div.onmouseleave = function () {
            document.getElementById("iwindow_window_maximize_button_" + i).style.backgroundColor = "";
            var ncol;
            if (iwindow_attributes[i]["content_color"] != null) ncol = iwindow_attributes[i]["content_color"];
            else ncol = "#000000";
            document.getElementById("iwindow_window_maximize_button_svg_rect_" + i).style.stroke = ncol;
            if (document.getElementById("iwindow_window_maximize_button_svg_polygon_" + i) != null) document.getElementById("iwindow_window_maximize_button_svg_polygon_" + i).style.stroke = ncol;
        }
        div.onclick = function () {
            iwindow_maximize(i);
        }
        document.getElementById("iwindow_window_title_" + i).appendChild(div);
    }
    if (iwindow_attributes[i].mode == 1 || iwindow_attributes[i].mode == 2 || iwindow_attributes[i].mode == 3 || iwindow_attributes[i].mode == 5) {
        //框架->窗口->标题->关闭按钮
        var div = document.createElement("div");
        div.id = "iwindow_window_close_button_" + i;
        div.style.fontFamily = "\"Fira Sans\",\"Noto Sans SC\",\"sans-serif\"";
        div.style.position = "absolute";
        div.style.right = "0";
        div.style.textAlign = "center";
        div.style.height = "30px";
        div.style.width = "30px";
        div.style.border = "none";
        div.style.borderRadius = "0 5px 0 0";
        div.style.transition = "all .3s ease";
        div.onmouseover = function () {
            document.getElementById("iwindow_window_close_button_" + i).style.backgroundColor = "#FF0000";
            document.getElementById("iwindow_window_close_button_svg_line1_" + i).style.stroke = "#FFFFFF";
            document.getElementById("iwindow_window_close_button_svg_line2_" + i).style.stroke = "#FFFFFF";
        }
        div.onmouseleave = function () {
            document.getElementById("iwindow_window_close_button_" + i).style.backgroundColor = "";
            var ncol;
            if (iwindow_attributes[i]["content_color"] != null) ncol = iwindow_attributes[i]["content_color"];
            else ncol = "#000000";
            document.getElementById("iwindow_window_close_button_svg_line1_" + i).style.stroke = ncol;
            document.getElementById("iwindow_window_close_button_svg_line2_" + i).style.stroke = ncol;
        }
        div.onclick = function () {
            iwindow_close(i);
        }
        div.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 640 640\"><defs><style>.cls-iwindow_window_close_button_svg{fill:none;stroke:#000000;stroke-miterlimit:10;stroke-width:50px;transition:all .3s ease;}</style></defs><line id=\"iwindow_window_close_button_svg_line1_" + i + "\" class=\"cls-iwindow_window_close_button_svg\" x1=\"496.78\" y1=\"496.78\" x2=\"143.22\" y2=\"143.22\"/><line id=\"iwindow_window_close_button_svg_line2_" + i + "\" class=\"cls-iwindow_window_close_button_svg\" x1=\"143.22\" y1=\"496.78\" x2=\"496.78\" y2=\"143.22\"/></svg>"
        document.getElementById("iwindow_window_title_" + i).appendChild(div);
    }

    //框架->窗口->内容

    var div = document.createElement("div");
    div.id = "iwindow_window_content_" + i;
    div.style.width = "100%";
    div.style.height = document.getElementById("iwindow_window_" + i).offsetHeight - 30 + "px";
    div.style.borderRadius = "0 0 5px 5px";
    div.style.overflow = iwindow_attributes[i].content_overflow;
    div.innerHTML = iwindow_attributes[i].content;
    document.getElementById("iwindow_window_" + i).appendChild(div);

    //框架->屏障
    if (iwindow_attributes[i].mask) {
        var div = document.createElement("div");
        div.id = "iwindow_mask_x_" + i;
        div.style.position = "fixed";
        div.style.top = "0";
        div.style.right = "0";
        div.style.bottom = "0";
        div.style.left = "0";
        div.style.zIndex = "10000";
        div.style.backgroundColor = "#000000";
        div.style.opacity = "0.5";
        document.getElementById("iwindow_frame_" + i).appendChild(div);
    }

    document.getElementById("iwindow_window_" + i).style.opacity = "1";
    var ux;
    if (iwindow_attributes[i].x == null) ux = document.documentElement.clientWidth - document.getElementById("iwindow_window_" + i).offsetWidth - 90 + "px";
    else ux = iwindow_attributes[i].x + "px";
    iwindow_change_color(iwindow_attributes[i].color, i);
    document.getElementById("iwindow_window_" + i).style.left = ux;
    if (iwindow_attributes[i].size == 2) iwindow_maximize(i);
    if (iwindow_attributes[i].size == 3) iwindow_minimize(i);
    iwindow_attributes[i]["old_left"] = ux;
    iwindow_attributes[i]["old_top"] = uy;
    document.getElementById("iwindow_window_" + i).style.display = "";
    window.dispatchEvent(new CustomEvent("iwindow_create", { detail: { "i": i } }));

    return i;
}
function iwindow_dynamicColor(bg) {
    if (!bg || bg.search('gradient') != -1) {
        return '#000000';
    }
    var bgcolorArry;
    if (/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(bg)) bgcolorArry = iwindow_HexToRgb(bg);
    else if (/^(rgb|RGB|rgba|RGBA)/.test(bg)) bgcolorArry = bg.replace("rgb(", "").replace("rgba(", "").replace(")", "").split(",");
    return iwindow_isLight(bgcolorArry) ? '#000000' : 'rgb(255,255,255,0.7)';
}
function iwindow_isLight(rgb = [0, 0, 0]) {
    return (0.213 * rgb[0] + 0.715 * rgb[1] + 0.072 * rgb[2] > 255 / 2);
};
function iwindow_HexToRgb(str) {
    var reg = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/
    if (!reg.test(str)) { return; }
    let newStr = (str.toLowerCase()).replace(/\#/g, '')
    let len = newStr.length;
    if (len == 3) {
        let t = ''
        for (var i = 0; i < len; i++) {
            t += newStr.slice(i, i + 1).concat(newStr.slice(i, i + 1))
        }
        newStr = t
    }
    let arr = [];
    for (var i = 0; i < 6; i = i + 2) {
        let s = newStr.slice(i, i + 2)
        arr.push(parseInt("0x" + s))
    }
    return arr;
}
function iwindow_RgbToHex(str) {
    let reg = /^(rgb|RGB|rgba|RGBA)/;
    if (!reg.test(str)) { return; }
    var arr = str.slice(4, str.length - 1).split(",")
    let color = '#';
    for (var i = 0; i < arr.length; i++) {
        var t = Number(arr[i]).toString(16)
        if (t == "0") {
            t = t + "0"
        }
        color += t;
    }
    return color;
}
function iwindow_getDarkColor(color, level) {
    var r = /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/;
    var trgb = /^(rgb|RGB|rgba|RGBA)/;
    var rgbc;
    if (r.test(color)) rgbc = iwindow_HexToRgb(color);
    else if (trgb.test(color)) rgbc = color.replace("rgb(", "").replace("rgba(", "").replace(")", "").split(",");
    else rgbc = iwindow_HexToRgb("#FFFFFF");
    for (var i = 0; i < 3; i++) rgbc[i] = Math.floor(rgbc[i] * (1 - level));
    return iwindow_RgbToHex("rgb(" + rgbc.join(',') + ")");
}
function iwindow_getLightColor(color, level) {
    var r = /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/;
    var trgb = /^(rgb|RGB|rgba|RGBA)/;
    var rgbc;
    if (r.test(color)) rgbc = iwindow_HexToRgb(color);
    else if (trgb.test(color)) rgbc = color.replace("rgb(", "").replace("rgba(", "").replace(")", "").split(",");
    else rgbc = iwindow_HexToRgb("#FFFFFF");
    for (var i = 0; i < 3; i++) rgbc[i] = Math.floor((255 - rgbc[i]) * level + rgbc[i]);
    return iwindow_RgbToHex("rgb(" + rgbc.join(',') + ")");
}
function iwindow_window_create_menu(i, iwindow_menu, mx, my) {
    //框架
    var div = document.createElement("div");
    div.id = "iwindow_menu_frame_" + i;
    document.getElementById("iwindow_frame_" + i).appendChild(div);

    //框架->菜单
    var div = document.createElement("div");
    div.className = "iwindow_menu";
    div.id = "iwindow_menu_" + i;
    div.style.top = my + "px";
    div.style.left = mx + "px";
    div.style.zIndex = "2000000005";
    div.style.webkitUserSelect = "none";
    div.style.userSelect = "none";
    div.style.fontSize = "14px";
    div.style.position = "fixed";
    div.style.borderRadius = "5px";
    if (iwindow_attributes[i]["background_color"] == null) div.style.backgroundColor = "#FFFFFF";
    else div.style.backgroundColor = iwindow_attributes[i]["background_color"];
    if (iwindow_attributes[i]["content_color"] == null) div.style.color = "#000000";
    else div.style.color = iwindow_attributes[i]["content_color"];
    div.style.webkitBoxShadow = "2px 2px 10px #909090";
    div.style.boxShadow = "2px 2px 10px #909090";
    div.style.transition = "all .1s ease";
    div.style.padding = "5px 0";
    div.style.opacity = "0";
    div.style.lineHeight = "30px";
    document.getElementById("iwindow_menu_frame_" + i).appendChild(div);

    //框架->菜单->行
    iwindow_menu.forEach((value, index) => {
        iwindow_menu_create_line(i, index, iwindow_menu);
    })

    //框架->遮罩
    var div = document.createElement("div");
    div.id = "iwindow_menu_mask_" + i;
    div.style.position = "fixed";
    div.style.top = "0";
    div.style.right = "0";
    div.style.bottom = "0";
    div.style.left = "0";
    div.style.zIndex = "2000000004";
    div.style.opacity = "0";
    div.onclick = function () { iwindow_menu_close(i); };
    document.getElementById("iwindow_menu_frame_" + i).appendChild(div);

    if (document.getElementById("iwindow_menu_" + i).getBoundingClientRect().left < 0) document.getElementById("iwindow_menu_" + i).style.left = 10 + "px";
    if (document.getElementById("iwindow_menu_" + i).getBoundingClientRect().left > document.documentElement.clientWidth - 10 - document.getElementById("iwindow_menu_" + i).offsetWidth) document.getElementById("iwindow_menu_" + i).style.left = document.documentElement.clientWidth - 10 - document.getElementById("iwindow_menu_" + i).offsetWidth + "px";
    if (document.getElementById("iwindow_menu_" + i).getBoundingClientRect().top < 0) document.getElementById("iwindow_menu_" + i).style.top = 10 + "px";
    if (document.getElementById("iwindow_menu_" + i).getBoundingClientRect().top > document.documentElement.clientHeight - 10 - document.getElementById("iwindow_menu_" + i).offsetHeight) document.getElementById("iwindow_menu_" + i).style.top = document.documentElement.clientHeight - 10 - document.getElementById("iwindow_menu_" + i).offsetHeight + "px";
    setTimeout(() => {
        if (document.getElementById("iwindow_menu_" + i) != null) document.getElementById("iwindow_menu_" + i).style.opacity = "1";
        window.dispatchEvent(new CustomEvent("iwindow_create_menu", { detail: { "i": i } }));
    }, 100);
}

function iwindow_menu_create_line(i, x, iwindow_menu) {
    var div = document.createElement("div");
    div.id = "iwindow_menu_line_" + x + "_" + i;
    div.style.height = "30px";
    div.style.lineHeight = "30px";
    div.style.margin = "0";
    div.style.padding = "0 5px";
    div.style.whiteSpace = "nowrap";
    div.innerHTML = iwindow_menu[x][0];
    div.onclick = function () {
        iwindow_menu[x][1](i);
        iwindow_menu_close(i);
    }
    div.onmouseover = function () {
        document.getElementById("iwindow_menu_line_" + x + "_" + i).style.backgroundColor = "#F0F0F0";
        document.getElementById("iwindow_menu_line_" + x + "_" + i).style.color = "#000000";
    }
    div.onmouseleave = function () {
        document.getElementById("iwindow_menu_line_" + x + "_" + i).style.backgroundColor = "";
        document.getElementById("iwindow_menu_line_" + x + "_" + i).style.color = "";
    }
    document.getElementById("iwindow_menu_" + i).appendChild(div);
}
function iwindow_menu_close(i) {
    if (document.getElementById("iwindow_menu_frame_" + i) != null) document.getElementById("iwindow_menu_frame_" + i).parentNode.removeChild(document.getElementById("iwindow_menu_frame_" + i));
}
function iwindow_window_start_move(i) {
    var iwindow_delta_x = event.clientX - document.getElementById("iwindow_window_" + i).getBoundingClientRect().left;
    var iwindow_delta_y = event.clientY - document.getElementById("iwindow_window_" + i).getBoundingClientRect().top;
    var div = document.createElement("div");
    div.id = "iwindow_mask_" + i;
    div.style.position = "fixed";
    div.style.top = "0";
    div.style.right = "0";
    div.style.bottom = "0";
    div.style.left = "0";
    div.style.zIndex = "2000000003";
    div.style.opacity = "0";
    div.style.cursor = "move";
    document.getElementById("iwindow_frame_" + i).appendChild(div);
    document.getElementById("iwindow_window_" + i).style.transition = "";
    div.onmousemove = function () {
        iwindow_window_on_move(i, iwindow_delta_x, iwindow_delta_y);
    }
    div.onmouseup = function () {
        iwindow_window_complete_move(i);
    }
}
function iwindow_window_on_move(i, iwindow_delta_x, iwindow_delta_y) {
    iwindow_check_body_overflow();
    iwindow_min_array_remove(i);
    var z, w;
    if (iwindow_delta_x > document.getElementById("iwindow_window_" + i).offsetWidth)
        var z = event.clientX - document.getElementById("iwindow_window_" + i).offsetWidth / 2;
    else var z = event.clientX - iwindow_delta_x;
    var w = event.clientY - iwindow_delta_y;
    iwindow_window_move_step(i, w, z);

}
function iwindow_window_complete_move(i) {
    document.getElementById("iwindow_window_" + i).style.transition = "all .3s ease";
    document.getElementById("iwindow_mask_" + i).parentNode.removeChild(document.getElementById("iwindow_mask_" + i));
    window.dispatchEvent(new CustomEvent("iwindow_moved", { detail: { "i": i, "x": document.getElementById("iwindow_window_" + i).getBoundingClientRect().left, "y": document.getElementById("iwindow_window_" + i).getBoundingClientRect().top } }));
}
function iwindow_window_start_move_touch(i) {
    iwindow_attributes[i]["iwindow_delta_x"] = event.touches[0].pageX - document.getElementById("iwindow_window_" + i).getBoundingClientRect().left;
    iwindow_attributes[i]["iwindow_delta_y"] = event.touches[0].pageY - document.getElementById("iwindow_window_" + i).getBoundingClientRect().top;
    document.getElementById("iwindow_window_" + i).style.transition = "";
}
function iwindow_window_on_move_touch(i) {
    iwindow_check_body_overflow();
    iwindow_min_array_remove(i);
    var iwindow_delta_x = iwindow_attributes[i]["iwindow_delta_x"];
    var iwindow_delta_y = iwindow_attributes[i]["iwindow_delta_y"];
    var z, w;
    if (iwindow_delta_x > document.getElementById("iwindow_window_" + i).offsetWidth)
        var z = event.touches[0].pageX - document.getElementById("iwindow_window_" + i).offsetWidth / 2;
    else var z = event.touches[0].pageX - iwindow_delta_x;
    var w = event.touches[0].pageY - iwindow_delta_y;
    iwindow_window_move_step(i, w, z);
}
function iwindow_window_complete_move_touch(i) {
    document.getElementById("iwindow_window_" + i).style.transition = "all .3s ease";
    delete iwindow_attributes[i]["iwindow_delta_x"];
    delete iwindow_attributes[i]["iwindow_delta_y"];
    window.dispatchEvent(new CustomEvent("iwindow_moved", { detail: { "i": i, "x": document.getElementById("iwindow_window_" + i).getBoundingClientRect().left, "y": document.getElementById("iwindow_window_" + i).getBoundingClientRect().top } }));
}

function iwindow_window_move_step(i, w, z) {
    if (iwindow_attributes[i]["display_mode"] == "maximize" && !(iwindow_attributes[i].mode == 1 || iwindow_attributes[i].mode == 2)) return;
    if (iwindow_attributes[i]["display_mode"] == "minimize") {
        if (z < 110 - document.getElementById("iwindow_window_" + i).offsetWidth) z = 110 - document.getElementById("iwindow_window_" + i).offsetWidth;
    }
    else if (z < 140 - document.getElementById("iwindow_window_" + i).offsetWidth) z = 140 - document.getElementById("iwindow_window_" + i).offsetWidth;
    if (z > (document.documentElement.clientWidth - 20)) z = document.documentElement.clientWidth - 20;
    if (w < -10) w = -10;
    if (w > (document.documentElement.clientHeight - 20)) w = document.documentElement.clientHeight - 20;
    document.getElementById("iwindow_window_" + i).style.left = z + "px";
    document.getElementById("iwindow_window_" + i).style.top = w + "px";
    if (iwindow_attributes[i]["display_mode"] == "minimize") {
        iwindow_attributes[i]["minimize_top"] = w + "px";
        iwindow_attributes[i]["minimize_left"] = z + "px";
    }
    if (iwindow_attributes[i]["display_mode"] == "maximize") iwindow_normalize(i);
    window.dispatchEvent(new CustomEvent("iwindow_moving", { detail: { "i": i, "x": z, "y": w } }));
}
function iwindow_min_array_add(i) {
    if (!(iwindow_attributes[i]["minimize_top"] != null && iwindow_attributes[i]["minimize_left"] != null)) {
        iwindow_min_array.unshift(i);
        iwindow_min_sort();
    }
}
function iwindow_min_array_remove(i) {
    for (var mm = 0; mm + 1 <= iwindow_min_array.length; mm++) {
        if (iwindow_min_array[mm] == i) {
            iwindow_min_array.splice(mm, 1);
            break;
        }
    }
    iwindow_min_sort();
}
function iwindow_min_sort() {
    for (var mm = 0; mm + 1 <= iwindow_min_array.length; mm++) {
        if (!(iwindow_attributes[iwindow_min_array[mm]]["minimize_top"] != null && iwindow_attributes[iwindow_min_array[mm]]["minimize_left"] != null)) {
            document.getElementById("iwindow_window_" + iwindow_min_array[mm]).style.top = document.documentElement.clientHeight - document.getElementById("iwindow_window_title_" + iwindow_min_array[mm]).offsetHeight - 20 - Math.floor(mm / Math.floor((document.documentElement.clientWidth - 10) / 160)) * 35 + "px";
            document.getElementById("iwindow_window_" + iwindow_min_array[mm]).style.left = 10 + mm % Math.floor((document.documentElement.clientWidth - 10) / 160) * 160 + "px";
        }
    }
}
function iwindow_change_color(color, i) {
    if (i == null) for (var m = 1; ; m++) {
        if (document.getElementById("iwindow_window_" + m) != null) iwindow_change_color_execute(color, m);
        else break;
    }
    else iwindow_change_color_execute(color, i);
}
function iwindow_change_color_execute(color, i) {
    if (document.getElementById("iwindow_window_" + i) != null) {
        document.getElementById("iwindow_window_" + i).style.backgroundColor = color;
        document.getElementById("iwindow_window_title_" + i).style.borderBottomColor = iwindow_getDarkColor(color, 0.05);
        document.getElementById("iwindow_window_" + i).style.color = iwindow_dynamicColor(color);
        iwindow_attributes[i]["background_color"] = color;
        iwindow_attributes[i]["content_color"] = iwindow_dynamicColor(color);
        if (document.getElementById("iwindow_window_close_button_svg_line1_" + i) != null) document.getElementById("iwindow_window_close_button_svg_line1_" + i).style.stroke = iwindow_dynamicColor(color);
        if (document.getElementById("iwindow_window_close_button_svg_line2_" + i) != null) document.getElementById("iwindow_window_close_button_svg_line2_" + i).style.stroke = iwindow_dynamicColor(color);
        if (document.getElementById("iwindow_window_maximize_button_svg_rect_" + i) != null) document.getElementById("iwindow_window_maximize_button_svg_rect_" + i).style.stroke = iwindow_dynamicColor(color);
        if (document.getElementById("iwindow_window_maximize_button_svg_polygon_" + i) != null) document.getElementById("iwindow_window_maximize_button_svg_polygon_" + i).style.stroke = iwindow_dynamicColor(color);
        if (document.getElementById("iwindow_window_minimize_button_svg1_line_" + i) != null) document.getElementById("iwindow_window_minimize_button_svg1_line_" + i).style.stroke = iwindow_dynamicColor(color);
        if (document.getElementById("iwindow_window_minimize_button_svg2_rect_" + i) != null) document.getElementById("iwindow_window_minimize_button_svg2_rect_" + i).style.stroke = iwindow_dynamicColor(color);
        if (document.getElementById("iwindow_window_minimize_button_svg2_polygon_" + i) != null) document.getElementById("iwindow_window_minimize_button_svg2_polygon_" + i).style.stroke = iwindow_dynamicColor(color);
        if (document.getElementById("iwindow_window_menu_button_svg_line1_" + i) != null) document.getElementById("iwindow_window_menu_button_svg_line1_" + i).style.stroke = iwindow_dynamicColor(color);
        if (document.getElementById("iwindow_window_menu_button_svg_line2_" + i) != null) document.getElementById("iwindow_window_menu_button_svg_line2_" + i).style.stroke = iwindow_dynamicColor(color);
        if (document.getElementById("iwindow_window_menu_button_svg_line3_" + i) != null) document.getElementById("iwindow_window_menu_button_svg_line3_" + i).style.stroke = iwindow_dynamicColor(color);
        if (document.getElementById("iwindow_menu_" + i) != null) {
            document.getElementById("iwindow_menu_" + i).style.backgroundColor = color;
            document.getElementById("iwindow_menu_" + i).style.color = iwindow_dynamicColor(color);
        }
    }
}
function iwindow_top(i) {
    if (i == null || document.getElementById("iwindow_window_" + i) == null) return;
    for (var m = 1; ; m++) {
        if (document.getElementById("iwindow_window_" + m) != null) iwindow_top_execute(i, m);
        else break;
    }
}
function iwindow_top_execute(i, m) {
    if (document.getElementById("iwindow_window_" + m) != null && iwindow_attributes[m]["mask"] != "true") {
        if (iwindow_attributes[m]["topmost"] != "true" && m == i) {
            iwindow_attributes[m]["topmost"] = "true";
            iwindow_top_zIndex++;
            if (iwindow_top_zIndex >= 2000000000) iwindow_top_zIndex = 2000000000;
            document.getElementById("iwindow_window_" + m).style.zIndex = iwindow_top_zIndex;
            window.dispatchEvent(new CustomEvent("iwindow_top", { detail: { "i": i } }));
        }
        else if (iwindow_attributes[m]["topmost"] == "true" && m != i) delete iwindow_attributes[m]["topmost"];
    }
}
function iwindow_close(i) {
    if (i == null) for (var m = 1; ; m++) {
        if (document.getElementById("iwindow_window_" + m) != null) iwindow_close_execute(m);
        else break;
    }
    else iwindow_close_execute(i);
}
function iwindow_close_execute(i) {
    if (document.getElementById("iwindow_window_" + i) != null) {
        iwindow_attributes[i]["display_mode"] = "close";
        iwindow_min_array_remove(i);
        iwindow_check_body_overflow();
        document.getElementById("iwindow_window_" + i).style.transition = "all .1s ease";
        document.getElementById("iwindow_window_" + i).style.webkitTransform = "translate(2px, 2px)";
        document.getElementById("iwindow_window_" + i).style.transform = "translate(2px, 2px)";
        document.getElementById("iwindow_window_" + i).style.opacity = "0";
        setTimeout(function () {
            if (document.getElementById("iwindow_frame_" + i) != null) {
                document.getElementById("iwindow_frame_" + i).parentNode.removeChild(document.getElementById("iwindow_frame_" + i));
                window.dispatchEvent(new CustomEvent("iwindow_close", { detail: { "i": i } }));
                delete iwindow_attributes[i];
            }
        }, 100);
    }
}
function iwindow_maximize(i) {
    if (i == null) for (var m = 1; ; m++) {
        if (document.getElementById("iwindow_window_" + m) != null) iwindow_maximize_execute(m);
        else break;
    }
    else iwindow_maximize_execute(i);
}
function iwindow_maximize_execute(i) {
    if (document.getElementById("iwindow_window_" + i) != null) {
        iwindow_top(i);
        if (iwindow_attributes[i]["display_mode"] != "maximize") {
            iwindow_min_array_remove(i);
            if (iwindow_attributes[i]["display_mode"] == "normal") {
                iwindow_attributes[i]["old_top"] = document.getElementById("iwindow_window_" + i).getBoundingClientRect().top + "px";
                iwindow_attributes[i]["old_left"] = document.getElementById("iwindow_window_" + i).getBoundingClientRect().left + "px";
            }
            document.getElementById("iwindow_window_" + i).style.height = "";
            document.getElementById("iwindow_window_" + i).style.width = "";
            document.getElementById("iwindow_window_title_" + i).style.width = "100%";
            if (iwindow_attributes[i].mode == 2) document.getElementById("iwindow_window_title_words_" + i).style.width = document.documentElement.clientWidth - 5 - 90 + "px";
            else if (iwindow_attributes[i].mode == 3) document.getElementById("iwindow_window_title_words_" + i).style.width = document.documentElement.clientWidth - 5 - 30 + "px";
            else if (iwindow_attributes[i].mode == 4) document.getElementById("iwindow_window_title_words_" + i).style.width = document.documentElement.clientWidth - 5 + "px";
            else if (iwindow_attributes[i].mode == 5) document.getElementById("iwindow_window_title_words_" + i).style.width = document.documentElement.clientWidth - 5 - 60 + "px";
            else if (iwindow_attributes[i].mode == 6) document.getElementById("iwindow_window_title_words_" + i).style.width = document.documentElement.clientWidth - 5 - 30 + "px";
            else document.getElementById("iwindow_window_title_words_" + i).style.width = document.documentElement.clientWidth - 5 - 120 + "px";
            document.getElementById("iwindow_window_content_" + i).style.height = document.documentElement.clientHeight - 30 + "px";
            document.getElementById("iwindow_window_content_" + i).style.display = "";
            if (iwindow_attributes[i].mode == 1 || iwindow_attributes[i].mode == 5 || iwindow_attributes[i].mode == 6) document.getElementById("iwindow_window_menu_button_" + i).style.display = "";
            document.getElementById("iwindow_window_" + i).style.top = "0";
            document.getElementById("iwindow_window_" + i).style.left = "0";
            document.getElementById("iwindow_window_" + i).style.right = "0";
            document.getElementById("iwindow_window_" + i).style.bottom = "0";
            document.getElementById("iwindow_window_" + i).style.borderRadius = "0";
            document.getElementById("iwindow_window_title_" + i).style.borderRadius = "0";
            if (iwindow_attributes[i].mode != 4 && iwindow_attributes[i].mode != 6) document.getElementById("iwindow_window_close_button_" + i).style.borderRadius = "0";
            else if (iwindow_attributes[i].mode == 6) document.getElementById("iwindow_window_menu_button_" + i).style.borderRadius = "0";
            document.getElementById("iwindow_window_content_" + i).style.borderRadius = "0";
            if (iwindow_attributes[i].mode == 1 || iwindow_attributes[i].mode == 2) {
                document.getElementById("iwindow_window_minimize_button_" + i).innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 640 640\"><defs><style>.cls-iwindow_window_minimize_button_svg1{fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:40px;transition:all .3s ease;}</style></defs><line id=\"iwindow_window_minimize_button_svg1_line_" + i + "\" class=\"cls-iwindow_window_minimize_button_svg1\" x1=\"132.5\" y1=\"312.21\" x2=\"507.5\" y2=\"312.21\"/></svg>";
                document.getElementById("iwindow_window_maximize_button_" + i).innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 640 640\"><defs><style>.cls-iwindow_window_maximize_button_svg{fill:none;stroke:#000000;stroke-miterlimit:10;stroke-width:40px;transition:all .3s ease;}</style></defs><polygon id=\"iwindow_window_maximize_button_svg_polygon_" + i + "\" class=\"cls-iwindow_window_maximize_button_svg\" points=\"202.16 201.39 202.16 281.19 412.72 281.19 412.72 413.28 502.02 413.28 502.02 201.39 202.16 201.39\"/><rect id=\"iwindow_window_maximize_button_svg_rect_" + i + "\" class=\"cls-iwindow_window_maximize_button_svg\" x=\"112.87\" y=\"281.19\" width=\"299.86\" height=\"211.89\"/></svg>";
                document.getElementById("iwindow_window_minimize_button_" + i).onmouseleave();
                document.getElementById("iwindow_window_maximize_button_" + i).onmouseleave();
                document.getElementById("iwindow_window_minimize_button_" + i).onclick = function () {
                    iwindow_minimize(i);
                }
                document.getElementById("iwindow_window_maximize_button_" + i).onclick = function () {
                    iwindow_normalize(i);
                }
            }
            document.body.parentNode.style.overflow = "hidden";
            iwindow_attributes[i]["display_mode"] = "maximize";
            window.dispatchEvent(new CustomEvent("iwindow_maximize", { detail: { "i": i } }));
        }
    }
}
function iwindow_minimize(i) {
    if (i == null) for (var m = 1; ; m++) {
        if (document.getElementById("iwindow_window_" + m) != null) iwindow_minimize_execute(m);
        else break;
    }
    else iwindow_minimize_execute(i);
}
function iwindow_minimize_execute(i) {
    if (document.getElementById("iwindow_window_" + i) != null) {
        if (iwindow_attributes[i]["display_mode"] != "minimize") {
            if (iwindow_attributes[i]["display_mode"] == "normal") {
                iwindow_attributes[i]["old_top"] = document.getElementById("iwindow_window_" + i).getBoundingClientRect().top + "px";
                iwindow_attributes[i]["old_left"] = document.getElementById("iwindow_window_" + i).getBoundingClientRect().left + "px";
            }
            iwindow_attributes[i]["display_mode"] = "minimize";
            if (iwindow_attributes[i]["minimize_top"] != null && iwindow_attributes[i]["minimize_left"] != null) {
                document.getElementById("iwindow_window_" + i).style.top = iwindow_attributes[i]["minimize_top"];
                document.getElementById("iwindow_window_" + i).style.left = iwindow_attributes[i]["minimize_left"];
            }
            else {
                document.getElementById("iwindow_window_" + i).style.top = document.documentElement.clientHeight - document.getElementById("iwindow_window_title_" + i).offsetHeight - 20 + "px";
                document.getElementById("iwindow_window_" + i).style.left = 10 + "px";
            }
            document.getElementById("iwindow_window_" + i).style.right = "";
            document.getElementById("iwindow_window_" + i).style.bottom = "";
            document.getElementById("iwindow_window_" + i).style.borderRadius = "5px";
            document.getElementById("iwindow_window_title_" + i).style.borderRadius = "5px 5px 5px 5px";
            if (iwindow_attributes[i].mode != 4 && iwindow_attributes[i].mode != 6) document.getElementById("iwindow_window_close_button_" + i).style.borderRadius = "0 5px 0 0";
            else if (iwindow_attributes[i].mode == 6) document.getElementById("iwindow_window_menu_button_" + i).style.borderRadius = "0 5px 0 0";
            document.getElementById("iwindow_window_" + i).style.width = "150px";
            document.getElementById("iwindow_window_" + i).style.height = "";
            document.getElementById("iwindow_window_title_" + i).style.width = "150px";
            if (iwindow_attributes[i].mode == 1 || iwindow_attributes[i].mode == 2) document.getElementById("iwindow_window_title_words_" + i).style.width = "55px";
            else if (iwindow_attributes[i].mode == 3 || iwindow_attributes[i].mode == 5) document.getElementById("iwindow_window_title_words_" + i).style.width = "115px";
            else if (iwindow_attributes[i].mode == 4 || iwindow_attributes[i].mode == 6) document.getElementById("iwindow_window_title_words_" + i).style.width = "145px";
            if (iwindow_attributes[i].mode == 1 || iwindow_attributes[i].mode == 5 || iwindow_attributes[i].mode == 6) document.getElementById("iwindow_window_menu_button_" + i).style.display = "none";
            document.getElementById("iwindow_window_content_" + i).style.display = "none";
            if (iwindow_attributes[i].mode == 1 || iwindow_attributes[i].mode == 2) {
                document.getElementById("iwindow_window_minimize_button_" + i).innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 640 640\"><defs><style>.cls-iwindow_window_minimize_button_svg2{fill:none;stroke:#000000;stroke-miterlimit:10;stroke-width:40px;transition:all .3s ease;}</style></defs><polygon id=\"iwindow_window_minimize_button_svg2_polygon_" + i + "\" class=\"cls-iwindow_window_minimize_button_svg2\" points=\"202.16 201.39 202.16 281.19 412.72 281.19 412.72 413.28 502.02 413.28 502.02 201.39 202.16 201.39\"/><rect id=\"iwindow_window_minimize_button_svg2_rect_" + i + "\" class=\"cls-iwindow_window_minimize_button_svg2\" x=\"112.87\" y=\"281.19\" width=\"299.86\" height=\"211.89\"/></svg>";
                document.getElementById("iwindow_window_minimize_button_" + i).onclick = function () {
                    iwindow_normalize(i);
                }
                document.getElementById("iwindow_window_minimize_button_" + i).onmouseleave();
                document.getElementById("iwindow_window_maximize_button_" + i).innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 640 640\"><defs><style>.cls-iwindow_window_maximize_button_svg{fill:none;stroke:#000000;stroke-miterlimit:10;stroke-width:40px;transition:all .3s ease;}</style></defs><rect id=\"iwindow_window_maximize_button_svg_rect_" + i + "\" class=\"cls-iwindow_window_maximize_button_svg\" x=\"126.88\" y=\"161.84\" width=\"386.24\" height=\"316.33\"/></svg>";
                document.getElementById("iwindow_window_maximize_button_" + i).onclick = function () {
                    iwindow_maximize(i);
                }
                document.getElementById("iwindow_window_maximize_button_" + i).onmouseleave();
            }
            document.getElementById("iwindow_window_" + i).style.zIndex = 10001;
            iwindow_min_array_add(i);
            iwindow_check_body_overflow();
            window.dispatchEvent(new CustomEvent("iwindow_minimize", { detail: { "i": i } }));
        }
    }
}
function iwindow_normalize(i) {
    if (i == null) for (var m = 1; ; m++) {
        if (document.getElementById("iwindow_window_" + m) != null) iwindow_normalize_execute(m);
        else break;
    }
    else iwindow_normalize_execute(i);
}
function iwindow_normalize_execute(i) {
    if (document.getElementById("iwindow_window_" + i) != null) {
        if ((document.documentElement.clientWidth - 75) < parseFloat(iwindow_attributes[i]["old_left"])) {
            document.getElementById("iwindow_window_" + i).style.left = document.documentElement.clientWidth - 75 + "px";
        }
        else document.getElementById("iwindow_window_" + i).style.left = iwindow_attributes[i]["old_left"];
        if ((document.documentElement.clientHeight - 75) < parseFloat(iwindow_attributes[i]["old_top"])) {
            document.getElementById("iwindow_window_" + i).style.top = document.documentElement.clientHeight - 75 + "px";
        }
        else document.getElementById("iwindow_window_" + i).style.top = iwindow_attributes[i]["old_top"];
        document.getElementById("iwindow_window_" + i).style.bottom = "";
        document.getElementById("iwindow_window_" + i).style.right = "";
        document.getElementById("iwindow_window_" + i).style.borderRadius = "5px";
        document.getElementById("iwindow_window_title_" + i).style.borderRadius = "5px 5px 0 0";
        if (iwindow_attributes[i].mode != 4 && iwindow_attributes[i].mode != 6) document.getElementById("iwindow_window_close_button_" + i).style.borderRadius = "0 5px 0 0";
        else if (iwindow_attributes[i].mode == 6) document.getElementById("iwindow_window_menu_button_" + i).style.borderRadius = "0 5px 0 0";
        document.getElementById("iwindow_window_content_" + i).style.borderRadius = "0 0 5px 5px";
        document.getElementById("iwindow_window_" + i).style.height = iwindow_attributes[i]["dafault_height"];
        document.getElementById("iwindow_window_" + i).style.width = iwindow_attributes[i]["dafault_width"];
        document.getElementById("iwindow_window_title_" + i).style.width = iwindow_attributes[i]["dafault_title_width"];
        document.getElementById("iwindow_window_title_words_" + i).style.width = iwindow_attributes[i]["dafault_title_words_width"]
        document.getElementById("iwindow_window_content_" + i).style.height = document.getElementById("iwindow_window_" + i).offsetHeight - 30 + "px";
        document.getElementById("iwindow_window_content_" + i).style.display = "";
        if (iwindow_attributes[i].mode == 1 || iwindow_attributes[i].mode == 5 || iwindow_attributes[i].mode == 6) document.getElementById("iwindow_window_menu_button_" + i).style.display = "";
        if (iwindow_attributes[i].mode == 1 || iwindow_attributes[i].mode == 2) {
            document.getElementById("iwindow_window_maximize_button_" + i).innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 640 640\"><defs><style>.cls-iwindow_window_maximize_button_svg{fill:none;stroke:#000000;stroke-miterlimit:10;stroke-width:40px;transition:all .3s ease;}</style></defs><rect id=\"iwindow_window_maximize_button_svg_rect_" + i + "\" class=\"cls-iwindow_window_maximize_button_svg\" x=\"126.88\" y=\"161.84\" width=\"386.24\" height=\"316.33\"/></svg>";
            document.getElementById("iwindow_window_maximize_button_" + i).onclick = function () {
                iwindow_maximize(i);
            }
            document.getElementById("iwindow_window_maximize_button_" + i).onmouseleave();
            document.getElementById("iwindow_window_minimize_button_" + i).innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 640 640\"><defs><style>.cls-iwindow_window_minimize_button_svg1{fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:40px;transition:all .3s ease;}</style></defs><line id=\"iwindow_window_minimize_button_svg1_line_" + i + "\" class=\"cls-iwindow_window_minimize_button_svg1\" x1=\"132.5\" y1=\"312.21\" x2=\"507.5\" y2=\"312.21\"/></svg>";
            document.getElementById("iwindow_window_minimize_button_" + i).onclick = function () {
                iwindow_minimize(i);
            }
            document.getElementById("iwindow_window_minimize_button_" + i).onmouseleave();
        }
        if (iwindow_attributes[i]["display_mode"] == "maximize") window.dispatchEvent(new CustomEvent("iwindow_d_maximize", { detail: { "i": i } }));
        else if (iwindow_attributes[i]["display_mode"] == "minimize") window.dispatchEvent(new CustomEvent("iwindow_d_minimize", { detail: { "i": i } }));
        iwindow_attributes[i]["display_mode"] = "normal";
        window.dispatchEvent(new CustomEvent("iwindow_normalize", { detail: { "i": i } }));
        iwindow_min_array_remove(i);
        iwindow_check_body_overflow();
    }
}
function iwindow_create_menu(i, menu, cx, cy) {
    if (document.getElementById("iwindow_window_" + i) != null) {
        if (cx == null) {
            if (event != null) cx = event.clientX;
            else if (document.getElementById("iwindow_window_menu_button_" + i) != null && document.getElementById("iwindow_window_menu_button_" + i).style.display != "none") cx = document.getElementById("iwindow_window_menu_button_" + i).getBoundingClientRect().left + 15;
            else cx = document.getElementById("iwindow_window_" + i).getBoundingClientRect().left + 15;
        }
        if (cy == null) {
            if (event != null) cy = event.clientY;
            else if (document.getElementById("iwindow_window_menu_button_" + i) != null && document.getElementById("iwindow_window_menu_button_" + i).style.display != "none") cy = document.getElementById("iwindow_window_menu_button_" + i).getBoundingClientRect().top + 15;
            else cy = document.getElementById("iwindow_window_" + i).getBoundingClientRect().top + 15;
        }
        if (menu != null) iwindow_window_create_menu(i, menu, cx, cy);
        else if (iwindow_attributes[i].menu != null) iwindow_window_create_menu(i, iwindow_attributes[i].menu, cx, cy);
    }
}
function iwindow_check_body_overflow() {
    var ifmm = false;
    for (var m = 1; ; m++) {
        if (document.getElementById("iwindow_window_" + m) != null) {
            if (iwindow_attributes[m]["display_mode"] == "maximize") {
                ifmm = true;
                break;
            }
        }
        else break;
    }
    if (!ifmm) document.body.parentNode.style.overflow = "auto";
}
window.iwindow_min_array = new Array();
window.iwindow_attributes = new Array();
window.addEventListener("resize", () => {
    for (var i = 1; ; i++) {
        if (document.getElementById("iwindow_window_" + i) != null) {
            document.getElementById("iwindow_window_" + i).style.transition = "";
            if (iwindow_attributes[i]["display_mode"] == "maximize") {
                document.getElementById("iwindow_window_title_" + i).style.width = "100%";
                if (iwindow_attributes[i].mode == 2) document.getElementById("iwindow_window_title_words_" + i).style.width = document.documentElement.clientWidth - 5 - 90 + "px";
                else if (iwindow_attributes[i].mode == 3) document.getElementById("iwindow_window_title_words_" + i).style.width = document.documentElement.clientWidth - 5 - 30 + "px";
                else if (iwindow_attributes[i].mode == 4) document.getElementById("iwindow_window_title_words_" + i).style.width = document.documentElement.clientWidth - 5 + "px";
                else if (iwindow_attributes[i].mode == 5) document.getElementById("iwindow_window_title_words_" + i).style.width = document.documentElement.clientWidth - 5 - 60 + "px";
                else if (iwindow_attributes[i].mode == 6) document.getElementById("iwindow_window_title_words_" + i).style.width = document.documentElement.clientWidth - 5 - 30 + "px";
                else document.getElementById("iwindow_window_title_words_" + i).style.width = document.documentElement.clientWidth - 5 - 120 + "px";
                document.getElementById("iwindow_window_content_" + i).style.height = document.documentElement.clientHeight - 30 + "px";
            }
            else {
                if ((document.documentElement.clientWidth - 100) < document.getElementById("iwindow_window_" + i).getBoundingClientRect().left) {
                    document.getElementById("iwindow_window_" + i).style.left = document.documentElement.clientWidth - 100 + "px";
                }
                if ((document.documentElement.clientHeight - 100) < document.getElementById("iwindow_window_" + i).getBoundingClientRect().top) {
                    document.getElementById("iwindow_window_" + i).style.top = document.documentElement.clientHeight - 100 + "px";
                }
            }
            document.getElementById("iwindow_window_" + i).style.transition = "all .3s ease";
        }
        else break;
    }
});
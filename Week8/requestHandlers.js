var querystring = require('querystring');
var fs = require('fs');
var path = require('path');
var url = require('url');

function style(response, postData, _url, warning) {
    var file = fs.readFileSync('style.css', {'encoding' : 'utf8'});
    response.writeHead(200, {'Content-Type' : 'text/css'});
    response.write(file);
    response.end();
}

function start(response, postData, _url, warning) {
    console.log("Request handler 'start' was called.");
    var temp = pareseName(_url);
    console.log(_url);
    var find = false;
    var content;
    if (temp != undefined) {
        fs.readFile('UserInfo.txt', function(err, data) {
            if (err) throw err;
            content = data;
            var arrayOfStrings = content.toString().split("\n");
            for (var i = 0; i < arrayOfStrings.length; i++) {
                if (temp == querystring.parse(arrayOfStrings[i]).username) {
                    var input1 = '<input id="username" type="text" disabled="disabled" value='+
                        querystring.parse(arrayOfStrings[i]).username + ' />';
                    var input2 = '<input id="id" type="text" disabled="disabled" value='+
                        querystring.parse(arrayOfStrings[i]).id + ' />';
                    var input3 = '<input id="phone" type="text" disabled="disabled" value='+
                        querystring.parse(arrayOfStrings[i]).phone + ' />';
                    var input4 = '<input id="email" type="text" disabled="disabled" value='+
                        querystring.parse(arrayOfStrings[i]).email + ' />';
                    var body = '<html>'+
                        '<head>'+
                        '<meta http-equiv="Content-Type" content="text/html" charset=utf-8" />'+
                        '<link rel="stylesheet" href="style.css" />'+
                        '</head>'+
                        '<body>'+
                        '<div id="userBlock">'+
                        '<form action="" method="post">'+
                        '<div class="inputs">'+
                        '<label for="username">用户名 : </label>'+
                        input1 +
                        '<br />'+
                        '<label for="StudentId">学号 : </label>'+
                        input2 +
                        '<br />'+
                        '<label for="phone">电话 : </label>'+
                        input3 +
                        '<br />'+
                        '<label for="email">邮箱 : </label>'+
                        input4 +
                        '</div></form>'+
                        '</div>'+
                        '</body>'+
                        '</html>';
                    find = true;
                    break;
                }
            }
            if (find) {
                response.writeHead(200, {"Content-Type": "text/html"});
                response.write(body);
                response.end();
            } else {
                start(response, postData, '', "");
            }
        });
    } else {
        var body = '<html>'+
            '<head>'+
            '<meta http-equiv="Content-Type" content="text/html" charset=utf-8" />'+
            '<link type="text/css" rel="stylesheet" href="style.css" />'+
            '</head>'+
            '<body>'+
            '<div id="userBlock">'+
            '<form action="/upload" method="post">'+
            '<div class="header">'+
            '<h3>用户注册</h3>'+
            '</div>'+
            '<div class="sep">';
        if (warning != "") {
            body += '<p>';
            body += warning;
            body += '</p>';
        }
        body += '</div>'+
            '<div class="inputs">'+
            '<input id="username" type="text" name="username" placeholder="请输入用户名" />'+
            '<br />'+
            '<input id="id" type="text" name="id" placeholder="请输入学号" />'+
            '<br />'+
            '<input id="phone" type="text" name="phone" placeholder="请输入电话号码" />'+
            '<br />'+
            '<input id="email" type="text" name="email" placeholder="请输入邮箱地址" />'+
            '<br />'+
            '<input type="reset" value="重置" />'+
            '<input type="submit" value="提交" />'+   
            '</div></form>'+
            '</div>'+
            '</body>'+
            '</html>';
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(body);
        response.end();
    }
}

function pareseName(_url) {
    return querystring.parse(url.parse(_url).query).username;
}

function validation(postData) {
    var warning = "";
    if (/^[a-zA-Z0-9_\-]+@(([a-zA-Z0-9_\-])+\.)+[a-zA-Z]{2,4}$/.test(querystring.parse(postData).email) == false) {
        warning = "邮箱：请按照正确的邮箱格式输入\n";
    }
    if (/^[1-9]\d{10}$/.test(querystring.parse(postData).phone) == false) {
        warning = "电话：请输入11位数字，不能以0开头\n";
    }
    if (/^[1-9]\d{7,7}$/.test(querystring.parse(postData).id) == false) {
        warning = "学号：请输入8位数字，不能以0开头\n";
    }
    if (/^[a-z,A-Z]\w{5,15}$/.test(querystring.parse(postData).username) == false) {
        warning = "用户名：请输入6~18位英文字母、数字或下划线，必须以英文字母开头\n";
    }
    return warning; 
}

function duplication(postData) {
    var warning = "";
    var u = querystring.parse(postData).username;
    var i = querystring.parse(postData).id;
    var p = querystring.parse(postData).phone;
    var e = querystring.parse(postData).email;
    var _content = fs.readFileSync('UserInfo.txt', {'encoding' : 'utf8'});
    var array = _content.toString().split("\n");
    for (var i = 0; i < array.length; i++) {
        if (querystring.parse(array[i]).username == u) {
            warning = "用户名：输入的用户名已经存在\n";
            break;
        }
        else if (querystring.parse(array[i]).id == i) {
            warning = "学号：输入的学号已经存在\n";
            break;
        }
        else if (querystring.parse(array[i]).phone == p) {
            warning = "电话：输入的电话号码已经存在\n";
            break;
        }
        else if (querystring.parse(array[i]).email == e) {
            warning = "邮箱：输入的邮箱地址已经存在\n";
            break;
        }
    }
    return warning;
}

function upload(response, postData, _url, warning) {
    console.log("Request handler 'upload' was called.");
    if (duplication(postData) != "") {
        start(response, postData, '', duplication(postData));
    }
    else if (validation(postData) != "") {
        start(response, postData, '', validation(postData));
    } else {
        var input1 = '<input id="username" type="text" disabled="disabled" value='+
            querystring.parse(postData).username + ' />';
        var input2 = '<input id="id" type="text" disabled="disabled" value='+
            querystring.parse(postData).id + ' />';
        var input3 = '<input id="phone" type="text" disabled="disabled" value='+
            querystring.parse(postData).phone + ' />';
        var input4 = '<input id="email" type="text" disabled="disabled" value='+
            querystring.parse(postData).email + ' />';
        var body = '<html>'+
            '<head>'+
            '<meta http-equiv="Content-Type" content="text/html" charset=utf-8" />'+
            '<link rel="stylesheet" href="style.css" />'+
            '</head>'+
            '<body>'+
            '<div id="userBlock">'+
            '<form action="" method="post">'+
            '<div class="inputs">'+
            '<label for="username">用户名 : </label>'+
            input1 +
            '<br />'+
            '<label for="StudentId">学号 : </label>'+
            input2 +
            '<br />'+
            '<label for="phone">电话 : </label>'+
            input3 +
            '<br />'+
            '<label for="email">邮箱 : </label>'+
            input4 +
            '</div></form>'+
            '</div>'+
            '</body>'+
            '</html>';
        fs.appendFile('UserInfo.txt', postData + '\n', function(err) {
            if (err) throw err;
        });
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(body);
        console.log(postData);
    }
}

exports.start = start;
exports.upload = upload;
exports.style = style;

var $ = require("jquery");
var body = require("./body.jade")();
require("bundle!jade!./sources.jade")(function(sources) {
	$(function() {
		$("#choosen-sources").html(sources());
	});
});
$(function() {
	document.title = "modules-webpack-example";
	$("body").html(body);
	$(".button-home").click(loadHome);
	$(".button-test1").click(loadTest1);
	$(".button-test2").click(loadTest2);
	$(".button-test3").click(loadTest3);
});

var isLoading = false;
function loading(name) {
	if(isLoading) return true;
	if($(".button-"+name).parent().hasClass("active")) return true;
	isLoading = true;
	$(".buttons").parent().removeClass("active");
	$(".button-"+name).parent().addClass("active");
	$(".content").html(require("./loading.jade"));
}

function finished() {
	isLoading = false;
}

function loadHome() {
	if(loading("home")) return;
	require.ensure([], function(require) {
		finished();
		$(".content").html(require("./home.jade")());
	});
	return false;
}

function loadTest1() {
	if(loading("test1")) return;
	require.ensure([], function(require) {
		finished();
		var item = require("./test1");
		$(".content").html(item.render());
		item.start();
	});
	return false;
}

function loadTest2() {
	if(loading("test2")) return;
	require.ensure([], function(require) {
		finished();
		$(".content").html(require("./test2.jade")());
	});
	return false;
}

function loadTest3() {
	if(loading("test3")) return;
	require.ensure([], function(require) {
		finished();
		$(".content").html(require("./test3.jade")());
	});
	return false;
}

// HACK to get chunk loading info
var oldWebpackJsonp = window.webpackJsonp;
window.webpackJsonp = function(chunk, modules) {
	$(function() {
		var li = $("<li>")
			.html(require("./chunk.jade")
				({chunk: chunk}));
		$(".chunks").append(li);
	});
	oldWebpackJsonp.apply(null, arguments);
};
var $ = require("jquery");

var body = require("./body.jade")();
require("bundle!./sources.jade")(function(sources) {
	$(function() {
		$("#choosen-sources").html(sources());
	});
});
$(function() {
	document.title = "webpack example-app";
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
	require([], function() {
		finished();
		$(".content").html(require("./home.jade")());
	});
	return false;
}

function loadTest1() {
	if(loading("test1")) return;
	require(["./test1"], function(item) {
		finished();
		$(".content").html(item.render());
		item.start();
	});
	return false;
}

function loadTest2() {
	if(loading("test2")) return;
	require.ensure([], function() {
		finished();
		$(".content").html(require("./test2.jade")());
	}, "test2+3");
	return false;
}

function loadTest3() {
	if(loading("test3")) return;
	require.ensure([], function(require) {
		finished();
		$(".content").html(require("./test3.jade")());
	}, "test2+3");
	return false;
}

// HACK to get chunk loading info
var oldWebpackJsonp = window.webpackJsonp;
var list = [];
window.webpackJsonp = function(chunk, modules) {
	list.push(chunk);
	$(function() {
		append();
		function append() {
			if($(".chunks").length === 0) {
				return setTimeout(append, 100);
			}
			if(list.length === 0) return;
			var chunk = list.shift();
			var li = $("<li>")
				.html(require("./chunk.jade")
					({chunk: chunk}));
			$(".chunks").append(li);
			append();
		}
	});
	oldWebpackJsonp.apply(null, arguments);
};
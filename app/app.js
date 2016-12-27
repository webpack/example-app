var $ = require("jquery");

require("./style.css");
var body = require("./body.pug")();
require("bundle-loader!./sources.pug")(function(sources) {
	$(function() {
		$("#choosen-sources").html(sources());
	});
});
$(function() {
	document.title = "webpack example-app";
	$("body").html(body);
	$(".button-home").click(loadPage.bind(null, "home"));
	$(".button-test1").click(loadPage.bind(null, "test1"));
	$(".button-test2").click(loadPage.bind(null, "test2"));
	$(".button-test3").click(loadPage.bind(null, "test3"));
	if(module.hot) {
		module.hot.setApplyOnUpdate(false);
		var hotResult = $(".hot-result");
		$(".hot-check").click(function() {
			try {
				module.hot.check(function(err, updatedModules) {
					if(err) return hotResult.text(err.toString());
					if(updatedModules) hotResult.text("Updated modules: " + updatedModules.join(", "));
				});
			} catch(e) { hotResult.text(e.toString()); }
		});
		$(".hot-apply").click(function() {
			try {
				module.hot.apply(function(err, renewedModules) {
					if(err) return hotResult.text(err.toString());
					if(renewedModules) hotResult.text("Renewed modules: " + renewedModules.join(", "));
				});
			} catch(e) { hotResult.text(e.toString()); }
		});
		module.hot.status(function(newStatus, oldStatus) {
			$(".hot-status").text(newStatus);
		});
	}
});

var isLoading = false;
function loading(name) {
	if(isLoading) return true;
	if($(".button-"+name).parent().hasClass("active")) return true;
	isLoading = true;
	$(".buttons").parent().removeClass("active");
	$(".button-"+name).parent().addClass("active");
	$(".content").html(require("./loading.pug"));
}

function finished() {
	isLoading = false;
}

var pages = require("./pages");

var currentPage, currentPageName;
function loadPage(name) {
	if(loading(name)) return;
	pages.getPage(name, function(item) {
		currentPageName = name;
		currentPage = item;
		finished();
		if(typeof item === "function") {
			$(".content").html(item());
		} else {
			$(".content").html(item.render());
			item.start();
		}
	});
	return false;
}

if(module.hot) {
	module.hot.accept("./pages", function() {
		pages = require("./pages");
		if(!$(".hot-strategy").prop("checked")) return;
		pages.getPage(currentPageName, function(item) {
			if(currentPage !== item) {
				loading("");
				finished();
				loadPage(currentPageName);
			}
		});
	});
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
				.html(require("./chunk.pug")
					({chunk: chunk}));
			$(".chunks").append(li);
			append();
		}
	});
	oldWebpackJsonp.apply(null, arguments);
};
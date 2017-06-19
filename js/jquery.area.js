/**
 * jquery.area.js
 * 移动端省市区三级联动选择插件
 * author: 锐不可挡
 * date: 2016-06-17
 **/

/*定义三级省市区数据*/
var province = ["北京市", "上海市", ];
var city = [
	["市辖区"],
	["市辖区"],

];
var district = [
	/*北京市*/
	[
		["万科广场", "万达广场", "婴幼儿店", ]
	],

	/*上海市*/
	[
		["万科广场", "万达广场", "七宝", ]

	],

];
var expressArea, areaCont, areaList = $("#areaList");
var areaTop = areaList.offset().top;

/*初始化省份*/
function intProvince() {
	areaCont = "";
	for(var i = 0; i < province.length; i++) {
		areaCont += '<li onClick="selectP(' + i + ');">' + province[i] + '</li>';
	}
	areaList.html(areaCont);
	$("#areaBox").scrollTop(0);
	$("#backUp").removeAttr("onClick").hide();
}
intProvince();

/*选择省份*/
function selectP(p) {
	areaCont = "";
	areaList.html("");
	for(var j = 0; j < city[p].length; j++) {
		areaCont += '<li onClick="selectC(' + p + ',' + j + ');">' + city[p][j] + '</li>';
	}
	areaList.html(areaCont);
	$("#areaBox").scrollTop(0);
	expressArea = province[p];
	$('.area-list li').css({
		'font-size': '20px'
	});
//	$(this).css('background-color','red');
//	$('.area-list li').eq(p).css('background-color','#e9dc9f').siblings().css('background-color','white');
	$("#backUp").attr("onClick", "intProvince();").show();
}

/*选择城市*/
function selectC(p, c) {
	areaCont = "";
	for(var k = 0; k < district[p][c].length; k++) {
		areaCont += '<li onClick="selectD(' + p + ',' + c + ',' + k + ');">' + district[p][c][k] + '</li>';
	}
	areaList.html(areaCont);
	$("#areaBox").scrollTop(0);
	var sCity = city[p][c];
	if(sCity != "省直辖县级行政单位") {
		if(sCity == "东莞市" || sCity == "中山市" || sCity == "儋州市" || sCity == "嘉峪关市") {
			expressArea += sCity;
			$("#expressArea dl dd").html(expressArea);
			clockArea();
		} else if(sCity == "市辖区" || sCity == "市辖县" || sCity == "香港岛" || sCity == "九龙半岛" || sCity == "新界" || sCity == "澳门半岛" || sCity == "离岛" || sCity == "无堂区划分区域") {
			expressArea += "";
		} else {
			expressArea += sCity;


		}
	}
	$('.area-list li').css({
		'font-size': '20px'
	});
//	$('.area-list li').eq(c).css('background-color','#e9dc9f').siblings().css('background-color','white');
	$("#backUp").attr("onClick", "selectP(" + p + ");");
}

/*选择区县*/
function selectD(p, c, d) {
	clockArea();
	expressArea += district[p][c][d];
	$("#expressArea dl dd").html(expressArea);

	$('form .valText').val(expressArea);

//	当用户选择完场次,按钮变成黄色高亮状态
	$('.footer .btn img').attr('src', 'img/index/btn2.png');
	
//	当用户选择完场次后,绑定提交按钮,信息提交到后台
	$('.footer .btn label').attr('for', 'SubmitBtn');
}

/*关闭省市区选项*/
function clockArea() {
	$("#areaMask").fadeOut();
	$("#areaLayer").animate({ "bottom": "-100%" });

	//				$('.express-area-box').css('height','600px');

	$('.footer .btn').animate({ "z-index": "300" });
	
	intProvince();
}

$(function() {
	/*打开省市区选项*/
	$("#expressArea").click(function() {
		$("#areaMask").fadeIn();
		$("#areaLayer").animate({ "bottom": 0 });
		$('.footer .btn').css('z-index', '10');
		
		//									$('.express-area-box').css('height','266px');
	});
	/*关闭省市区选项*/
	$("#areaMask, #closeArea").click(function() {
		clockArea();
	});

});
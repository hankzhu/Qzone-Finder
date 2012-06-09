/**
 * 单个东东
 */
var Item = function(data) {
	/*
	this.id = data.id;
	this.link = data.link;
	this.icon = data.icon;
	this.type = data.type; //1日志 2相册 3
	this.parentId = data.parentId;
	*/
	this.dom = null; //dom引用
	this.data = data; //原始数据
	this.nextItem = null;
};
/**
 * 文件夹
 */
var Folder = function(data) {
	Item.call(this, data); //属性共享一下
	/** 作为基础属性
	this.type = -1;
	this.parentId = -1;
	*/
};
/*
 * 单个东东和文件夹的共同行为, 实例的存储用单向链表的结构
 */
var ActionBase = {
	render : function(){
		
	},
	setNextItem : function(item){
		this.nextItem = item;
	},
	
};
/**
 * 当前view的工厂
 */
var ItemFactory = {
	origData : null,
	curItems : [], //当前页面的对象
	
};
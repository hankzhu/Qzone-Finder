/**
 * 单个东东, 元素绝对定位
 */
var Item = function(data) {
	this.data = data; //原始数据id, link, icon, type, parentId
	
	this.dom = null; //dom引用
	this.nextItem = null;
	this.x = 0;  //渲染坐标
	this.y = 0;
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
var ItemBase = {
	template : '', //模板
	render : function(x, y){
		var div = document.createElement('div');
		div.innerHTML = QZFL.string.format(this.template, this.data);
		this.dom = div;
		//坐标计算
		
		return div;
	},
	setNextItem : function(item){
		this.nextItem = item;
	},
	//移动到指定的坐标
	moveTo : function(x , y){
		QZFL.effect.run(this.dom, {
			'top' : y,
			'left' : x
		});
	}
};

var FolderBase = {
	template : '',
};

QZFL.object.extend(Item.prototype, ItemBase);
QZFL.object.extend(Folder.prototype, ItemBase, FolderBase);


var dataList = [];
/**
 * 当前view的工厂
 */
var ItemFactory = {
	origData : null,
	curItems : [], //当前页面的对象
	Pager : {
		pageSize : 10,
		curPage : 1,
		totalPage : 1,
		init : function(){
			//初始化，将根节点的item提取出来
			openFolder(-1);
		},
		renderPage : function(){
			var p = ItemFactory.Pager;
			var map = [];
			for(var i=0; i<p.curItems.length; i++){
				var item = p.curItems[i];
				map[item.index] = item;
			}
			for(var i=p.pageSize*(p.curPage-1); i<p.pageSize*p.curPage; i++){
				map[i].render();
			}
		},
		toPage: function(pageId){
			var p = ItemFactory.Pager;
			p.curPage = pageId;
			p.renderPage();
		},
		openFolder(id){
			ItemFactory.curItems = [];
			for(var i=0; i<dataList.length; i++){
				var item = dataList[i];
				if(item.parentId == id){
					ItemFactory.curItems.push(item);
				}
			}
			var p = ItemFactory.Pager;
			var length = ItemFactory.curItems.length;
			p.totalPage = length / p.pageSize + (length % p.pageSize > 0 ? 1 : 0);
		}
	},
	//item添加到某个文件夹
	addToFolder : function(item, folder){
		//主要影响parentId
		
	},
	//item从给某个文件夹中移除
	removeFromFolder : function(item, folder){
		
	}
};
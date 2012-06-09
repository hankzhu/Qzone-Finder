/**
 * Created with JetBrains WebStorm.
 * User: sparks345
 * Date: 12-6-9
 * Time: 下午1:57
 * To change this template use File | Settings | File Templates.
 */
QZONE=window.QZONE||{};

QZONE.Finder=QZONE.Finder||{};

QZONE.Finder.Sniffer = function() {

	var Filter = function() {

	};
	Filter.property = {
		getContentWindow : function() {
			return $e(".app_canvas_frame").eq(0).contentWindow;
		},
		/**
		 * 过滤筛选
		 */
		find : function() {

		},
		/**
		 * 插入调用触发按钮
		 */
		process : function(nd) {
			var btn = document.createElement("span");
			btn.className = "finder_add";
			nd.appendChild(btn);

		}
	};


	var NoteFilter = new Filter();
	NoteFilter.find = function() {
		var me = this;
		var nodes = this.getContentWindow().$e("#listArea li .list_tit");
		QZFL.object.each(nodes, function(node, i) {
			me.process(node);
		});
	};


	///////////////////////////////////////



	return {

	}
}();

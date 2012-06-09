QZONE = window.QZONE || {};
QZONE.Finder = QZFL.Finder || {};

//Web Storage,dbname:finder_db
QZONE.Finder.db = {

	init : function(){
		var db = window.localStorage.getItem('finder_db');

		if(!db){
			window.localStorage.setItem('finder_db',{list:[],lastmodified:(new Date()),lastid:-1});
		}
	},

	getDB : function(){
		return window.localStorage.getItem('finder_db');
	},

	saveToDB : function(db){
		return window.localStorage.setItem('finder_db',db);
	},

	add : function(obj){
		var db = QZONE.Finder.db.getDB(),
			list = db.list;

		db.lastid+=1;
		obj.id = db.lastid;
		obj.parentId = obj.parentId || -1;
		obj.timestamp = new Date();

		list.push(obj);
		list.reverse();
		db.list = list;
		QZONE.Finder.db.saveToDB(db);
	},

	delete : function(id){
		var db = QZONE.Finder.db.getDB(),
			list = db.list;

		for(var i=0,len=list.length;i<len;i++){
			if(id==list[i].id){
				list.splice(i,1);
				break;
			}
		}
		db.list = list;
		QZONE.Finder.db.saveToDB(db);
	},

	getFullList : function(){
		var db = QZONE.Finder.db.getDB(),
			list = db.list;

		return list;
	},

	getListByPage : function(page){
		var list = QZONE.Finder.getFullList();

		return list.slice((page-1)*QZONE.Finder.PAGENUM,page*QZONE.Finder.PAGENUM);
	},

	changeFolder : function(id,fid){
		var db = QZONE.Finder.db.getDB(),
			list = db.list;

		for(var i=0,len=list.length;i<len;i++){
			if(id==list[i].id){
				list[i].parentId = fid;
				break;
			}
		}
		db.list = list;
		QZONE.Finder.db.saveToDB(db);
	}
};

QZONE.Finder.PAGENUM = 50;


//Desktop Drag-In (File API)
QZONE.Finder.file = {
	//dom is detect container,cb is the callback
	dragIn : function(dom,cb){
		document.querySelector(dom).addEventListener('drop', function(e) {
		  var reader = new FileReader();
		  reader.onload = function(evt) {
		    //document.querySelector('img').src = evt.target.result;
		    cb(evt.target.result);
		  };

		  reader.readAsDataURL(e.dataTransfer.files[0]);
		}, false);
	}
};


QZONE.Finder.tween = {
	flying : function(dom){
		QZFL.effect.run(dom, {
	    	left: '700'
	    }, {
	        duration : 700,
	        easing : 'ease-in',
	        complete : function(){

	        },
	        change : QZFL.emptyFn,
	        start : QZFL.emptyFn
	    });

	    QZFL.effect.run(dom, {
			top:'100'
	    }, {
	        duration : 700,
	        easing : 'ease-out',
	        complete : function(){

	        },
	        change : QZFL.emptyFn,
	        start : QZFL.emptyFn
	    });


	}
};
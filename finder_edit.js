/**
 * @author Hank
 * @version 2012/6/9 
 */
(function(_w){
	var QZONE = _w.QZONE = _w.QZONE || {};
	/**
	 * 单个东东
	 */
	var Item = function(id, ){
		this.id = id;
		this.link = link;
		this.type = 0;
		this.
	};
	/**
	 * 文件夹
	 */
	var Folder = function(){
		Item.apply(this);
		
	};
	/*
	 * 共同行为
	 */
	var ActionBase = function(){
		
	};
	/**
	 * 当前view的工厂
	 */
	var ItemFactory = {
		curItems : [], //当前页面的对象
		
	};
	
	var Drag = {
		isMousedown : 0,
		init : function(container, targetClass, dragStart, dragEnd, click){
			var me = this
			,mouseDownCb = function(evt){
				var uin,
		            deltaX,deltaY,startX,startY,
		            isMoved = false,
		            clearSelected = false, 
		            isMutiSelect = false,
		            mutiDiv,
		            moveCb,
		            startInArea,
		            E = QZFL.event,
		            target = E.getTarget(evt);
		        if(E.getButton(evt) != 0 || me.isMousedown)return false;
		        
		        var mouseUpCb = function(evt) {
		            var index, card;
		            if(isMoved){
		                //判断是否在某个容器上面
		                dragEnd && dragEnd.call(null, evt.clientX, evt.clientY);
		            }else{
		                if(clearSelected){
		                    if(isMutiSelect){
		                        mutiDiv && mutiDiv.parentNode && mutiDiv.parentNode.removeChild(mutiDiv);
		                        GroupackManager.getSelectedCards();
		                        sendPV('pull_to_select_the_card');
		                    }else{
		                        evt.clientY < (area.bottom + 10)
		                            && evt.clientY > (area.top - 50) 
		                            && CardFactory.clearAllSelect();
		                    }
		                }else if(startInArea){
		                    uin = target.getAttribute('uin');
		                    if(index = CardFactory.checkInList(uin)){
		                        card = CardFactory.removeCardByIdx(index);
		                        card.unselect();
		                        sendPV('Click_to_select_the_card');
		                    }else{
		                        card = GroupackManager.curShowGroup.getCardByUin(uin);
		                        CardFactory.addCard(card);
		                        card.select();
		                    }
		                }
		            }
		            E.removeEvent(document, 'mousemove', moveCb);
		            E.removeEvent(document, 'mouseup', mouseUpCb);
		            isMousedown = false;
		        };
		        
		        var mouseMoveCb = function(evt) {
		            var abs = Math.abs,
		                x = evt.clientX,
		                y = evt.clientY;
		            if(abs(startX - x) > 5 || abs(startY - y) > 5){
		                isMoved = true;
		                if(CardFactory.inited){
		                    //比较位置，是否进入区域
		                    CardFactory.setPosition(x - deltaX, y - deltaY);
		                    window.setTimeout(function(){GroupackManager.moveOn(x, y);},0);
		                }else{
		                    CardFactory.initMoveState(x - deltaX, y - deltaY);
		                }
		            }
		            E.preventDefault(evt);
		        };
		       
		        startX = evt.clientX;
		      	startY = evt.clientY;
		       	var pos = QZFL.dom.getXY(target),
		      	origX = pos[0],
		      	origY = pos[1];
		      	deltaX = startX - origX;
		     	deltaY = startY - origY;

		      	me.isMousedown = 1;	      
		        E.addEvent(document, 'mouseup', mouseUpCb);
		        E.addEvent(document, 'mousemove', moveCb);
		        E.preventDefault(evt);
			};
			QZFL.event.delegate(container, '.'+targetClass, 'mousedown', mouseDownCb);
		},
		destroy : function(container, targetClass){
			QZFL.event.undelegate(container, '.'+targetClass, 'mousedown');
		}
	}
	var DragMove = function(container, targetClass, itemList){ //具有placeholder
		
	};
})(window);

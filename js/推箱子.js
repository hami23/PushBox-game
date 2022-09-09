$(function () {
	// console.log(this);
	game.init($('#container'));
});
var game = {
	//地图数据
	n: 0,
	//关卡
	level: [
		//地图关卡1
		{
			map: [
				1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
				1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1,
				1, 2, 0, 0, 0, 2, 1, 1, 1, 1, 1,
				1, 2, 0, 0, 0, 2, 1, 2, 2, 2, 1,
				1, 2, 0, 0, 0, 2, 1, 2, 3, 2, 1,
				1, 2, 2, 2, 0, 2, 2, 2, 3, 2, 1,
				1, 1, 2, 2, 0, 0, 0, 0, 3, 2, 1,
				1, 1, 2, 0, 0, 0, 2, 0, 0, 2, 1,
				1, 1, 2, 0, 0, 0, 2, 2, 2, 2, 1,
				1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1,
				1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
			],
			box: [
				{ x: 3, y: 3 },
				{ x: 4, y: 3 },
				{ x: 3, y: 4 },
			],
			person: { x: 2, y: 2 }
		},
		//地图关卡2
		{
			map: [
				1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
				1, 1, 1, 2, 2, 2, 2, 1, 1, 1,
				1, 1, 1, 2, 3, 3, 2, 1, 1, 1,
				1, 1, 2, 2, 0, 3, 2, 2, 1, 1,
				1, 1, 2, 0, 0, 0, 3, 2, 1, 1,
				1, 2, 2, 0, 0, 0, 0, 2, 2, 1,
				1, 2, 0, 0, 2, 0, 0, 0, 2, 1,
				1, 2, 0, 0, 0, 0, 0, 0, 2, 1,
				1, 2, 2, 2, 2, 2, 2, 2, 2, 1,
				1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
			],
			box: [
				{ x: 5, y: 4 },
				{ x: 4, y: 5 },
				{ x: 5, y: 6 },
				{ x: 6, y: 6 }
			],
			person: { x: 4, y: 7 }
		},
		//地图关卡3
		{
			map: [
				1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
				1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1,
				1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1,
				1, 1, 2, 0, 0, 0, 0, 0, 2, 1, 1,
				1, 2, 2, 0, 0, 0, 0, 0, 0, 2, 1,
				1, 2, 2, 0, 0, 2, 2, 0, 0, 2, 1,
				1, 2, 2, 0, 0, 3, 2, 0, 0, 2, 1,
				1, 1, 2, 3, 3, 3, 0, 3, 2, 1, 1,
				1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1,
				1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1,
				1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
			],
			box: [
				{ x: 3, y: 5 },
				{ x: 4, y: 4 },
				{ x: 4, y: 5 },
				{ x: 4, y: 6 },
				{ x: 7, y: 5 },
			],
			person: { x: 6, y: 4 }
		}
	],
	//初始化方法 ===》开始执行游戏
	init: function (gameMap) {
		console.log(this);
		this.gameMap = gameMap;
		//选择关卡或重玩本关
		this.select();
		//执行绘制地图
		this.createMap(game.n++);
	},
	//(1)创建地图
	createMap: function (num) {
		// var that = this;
		this.gameMap.empty();
		document.title = '第' + game.n + '关';
		//地图由
		this.newMap = this.level[num];
		// console.log(this.newMap);
		this.gameMap.css('width', Math.sqrt(this.newMap.map.length) * 50);
		//遍历newMap.map，得到地图上该绘制哪个方块
		$.each(this.newMap.map, $.proxy(function (index, item) {
			// console.log(index, item);
			// that.gameMap.append('<div>111</div>');
			this.gameMap.append('<div class="pos' + item + '"></div>');
		}, this))
		//创建完地图后，创建箱子
		this.createBox();
		//创建完箱子后，创建推箱子的打工仔
		this.createPerson();
	},
	//(2)创建箱子
	createBox: function () {
		$.each(this.newMap.box, $.proxy(function (index, item) {
			var gmbox = $('<div class="box"></div>');
			gmbox.css('left', item.x * 50);
			gmbox.css('top', item.y * 50);
			this.gameMap.append(gmbox);
		}, this))
	},
	//(3)创建人物
	createPerson: function () {
		var gmPerson = $('<div class="person"></div>');
		gmPerson.css('left', this.newMap.person.x * 50);
		gmPerson.css('top', this.newMap.person.y * 50);
		//存储当前人物的位置
		gmPerson.data('x', this.newMap.person.x);
		gmPerson.data('y', this.newMap.person.y);
		console.log(gmPerson.data('x'));
		console.log(gmPerson.data('y'));
		this.gameMap.append(gmPerson);
		//打工仔创建完成后，设置人物旋转
		this.personBind(gmPerson);
	},
	//(4)人物旋转
	personBind: function (gmPerson) {
		$(document).keydown($.proxy(function (e) {
			var code = e.keyCode;
			// console.log(code);
			switch (code) {
				case 65:
				case 37: //左
					gmPerson.css('backgroundPosition', '-100px 0');
					this.personMove(gmPerson, { x: -1 });
					break;
				case 87:
				case 38: //上
					gmPerson.css('backgroundPosition', '-50px 0');
					this.personMove(gmPerson, { y: -1 });
					break;
				case 68:
				case 39: //右
					gmPerson.css('backgroundPosition', '-150px 0');
					this.personMove(gmPerson, { x: 1 });
					break;
				case 83:
				case 40: //下
					gmPerson.css('backgroundPosition', '0px 0');
					this.personMove(gmPerson, { y: 1 });
					break;
			}
		}, this))
	},
	//(5)人物移动函数
	personMove: function (gmPerson, obj) {
		//人物原坐标移动的x、y值
		var xValue = obj.x || 0;
		var yValue = obj.y || 0;
		// console.log(xValue);
		// console.log(yValue);
		//如果走的下一步不是墙，才移动
		if (this.newMap.map[(gmPerson.data('y') + yValue) * Math.sqrt(this.newMap.map.length) + (gmPerson.data('x') + xValue)] != 2) {
			//人物移动之后存储的位置
			gmPerson.data('x', gmPerson.data('x') + xValue);
			gmPerson.data('y', gmPerson.data('y') + yValue);
			//人物移动
			gmPerson.css('left', gmPerson.data('x') * 50);
			gmPerson.css('top', gmPerson.data('y') * 50);

			//箱子移动
			$('.box').each($.proxy(function (index, ele) {
				// console.log(gmPerson.data('x'));
				// console.log(gmPerson.data('y'));
				//检测箱子和人物的碰撞情况
				// console.log($(ele));
				if (this.collisionDetect(gmPerson, $(ele)) && this.newMap.map[(gmPerson.data('y') + yValue) * Math.sqrt(this.newMap.map.length) + (gmPerson.data('x') + xValue)] != 2) {
					// console.log(true);
					// console.log(gmPerson.data('x') + xValue);
					// console.log(gmPerson.data('y') + yValue);
					$(ele).css('left', (gmPerson.data('x') + xValue) * 50);
					$(ele).css('top', (gmPerson.data('y') + yValue) * 50);
					//检测箱子之间是否发生碰撞
					$('.box').each($.proxy(function (i, element) {
						if (this.collisionDetect($(ele), $(element)) && ele != element) {
							$(ele).css('left', gmPerson.data('x') * 50);
							$(ele).css('top', gmPerson.data('y') * 50);
							gmPerson.data('x', gmPerson.data('x') - xValue);
							gmPerson.data('y', gmPerson.data('y') - yValue);
							gmPerson.css('left', gmPerson.data('x') * 50);
							gmPerson.css('top', gmPerson.data('y') * 50);
						}
					}, this))
					//让人物回到该回的位置
				} else if (this.collisionDetect(gmPerson, $(ele))) {
					//进行这个条件判断的时候，人物的x、y的值为箱子的x、y值
					//将x、y分别减xValue、有Value恢复为人物所在的x、y的值
					gmPerson.data('x', gmPerson.data('x') - xValue);
					gmPerson.data('y', gmPerson.data('y') - yValue);
					// console.log(gmPerson.data('x'));
					// console.log(gmPerson.data('y'));
					gmPerson.css('left', gmPerson.data('x') * 50);
					gmPerson.css('top', gmPerson.data('y') * 50);
				}
			}, this));
			// console.log(gmPerson.data('x'));
			// console.log(gmPerson.data('y'));
		}
		//进入下一关
		this.nextLevel();
	},
	//检测碰撞
	collisionDetect: function (obj1, obj2) {
		//人物或箱子
		var L1 = obj1.offset().left;
		var LW1 = L1 + obj1.width();
		var T1 = obj1.offset().top;
		var TH1 = T1 + obj1.height();
		//箱子
		var L2 = obj2.offset().left;
		var LW2 = L2 + obj2.width();
		var T2 = obj2.offset().top;
		var TH2 = T2 + obj2.height();
		//检测(人物/箱子)与箱子是否发生碰撞
		if (L1 >= LW2 || LW1 <= L2 || T1 >= TH2 || TH1 <= T2) {
			return false;
		} else {
			return true;
		}
	},
	//进入到下一关
	nextLevel: function () {
		var num = 0;
		$('.box').each($.proxy(function (index, ele) {
			$('.pos3').each($.proxy(function (index, element) {
				if (this.collisionDetect($(ele), $(element))) {
					$(ele).css('background', 'url(images/redBox.png) no-repeat');
					num++;
				} else {
					//箱子和目标点没有发生碰撞之后，颜色恢复正常
					// $(ele).css('background', 'url(images/box.png) no-repeat');  该句不能实现效果
					//此效果未实现，待解决
				}
			}, this))
		}, this));
		if (num == this.newMap.box.length) {
			this.createMap(game.n++);
		}
	},
	select: function () {
		$('.level0').each($.proxy(function (i, ele) {
			console.log();
			$(ele).click($.proxy(function () {
				// if (i == 0) {
				// 	game.n = 0;
				// 	this.createMap(game.n++);
				// } else if (i == 1) {
				// 	game.n = 1;
				// 	this.createMap(game.n++);
				// } else if (i == 2) {
				// 	game.n = 2;
				// 	this.createMap(game.n++);
				// }
				game.n = i;
				this.createMap(game.n++);
			}, this))
		}, this));
		$('.again').click($.proxy(function () {
			this.createMap(game.n - 1);
			// console.log(game.n-1);
		}, this))
	}

}
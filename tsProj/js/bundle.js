var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require('./script/utils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var IntroPage = function () {
	function IntroPage(scene, agent, introData) {
		_classCallCheck(this, IntroPage);

		this.scene = scene;
		this.agent = agent;
		this.introData = introData;
		this.scale = Laya.Browser.width / 1920;

		this.infoImage = new Laya.Sprite();
		this.infoImage.loadImage(this.introData.sz_bg_model);
		switch (agent) {
			case 'android':
			case 'ios':
				this.infoImage.width = 1323 * this.scale;
				this.infoImage.height = 866 * this.scale;
				break;
			default:
				this.infoImage.width = 1100 * this.scale;
				this.infoImage.height = 700 * this.scale;
		}
		var left = (Laya.stage.width - this.infoImage.width) / 2;
		var top = (Laya.stage.height - this.infoImage.height) / 2;
		this.infoImage.pos(left, top);
		Laya.stage.addChild(this.infoImage);

		this.createText(this.infoImage);

		this.createAudio();
	}

	_createClass(IntroPage, [{
		key: 'createText',
		value: function createText(parent) {
			var data = this.introData;
			var txt_caption = new Laya.Text();
			txt_caption.text = data.sz_caption;

			//设置文本水平居中
			txt_caption.size(280 * this.scale, 90 * this.scale);
			txt_caption.align = "center";
			txt_caption.valign = 'middle';
			parent.addChild(txt_caption);

			var txt_details = new Laya.Text();
			txt_details.text = data.tx_content;

			//设置宽高以后的自动裁剪会按照这个区域裁剪
			txt_details.size(370 * this.scale, 380 * this.scale);
			// if (this.agent === 'alva big') {
			txt_caption.font = "方正粗凯简体";
			txt_details.font = "方正大标宋简体";
			// }
			if (this.introData.mainname === 'CHE') {
				txt_details.color = txt_caption.color = "#000";
			} else {
				txt_details.color = txt_caption.color = "#fff";
			}
			parent.addChild(txt_details);
			txt_details.overflow = Laya.Text.SCROLL;;
			//设置自动换行
			txt_details.wordWrap = true;
			//设置文本水平居中
			txt_details.align = "left";

			switch (this.agent) {
				case 'alva small':
					txt_caption.fontSize = 40 * this.scale;
					txt_caption.leading = 0;

					txt_details.fontSize = 30 * this.scale;
					txt_caption.pos(650 * this.scale, 60 * this.scale);
					txt_details.leading = 5;
					txt_details.pos(600 * this.scale, 150 * this.scale);
					break;
				case 'android':
				case 'ios':
					txt_caption.fontSize = 40 * this.scale;
					txt_caption.leading = 0;

					txt_details.fontSize = 35 * this.scale;

					txt_caption.pos(770 * this.scale, 80 * this.scale);
					txt_details.leading = 15;
					txt_details.size(420 * this.scale, 550 * this.scale);
					txt_details.pos(730 * this.scale, 170 * this.scale);
					break;
				default:
					txt_caption.fontSize = 35 * this.scale;
					txt_caption.leading = 15 * this.scale;
					txt_caption.pos(650 * this.scale, 60 * this.scale);

					txt_details.fontSize = 20 * this.scale;
					txt_details.leading = 10;
					txt_details.pos(610 * this.scale, 150 * this.scale);
					break;
			}

			var position = {
				left: this.infoImage.width - 100 * this.scale,
				top: txt_details.y
			};
			var scrollSlider = (0, _utils.createScrollBar)(this.infoImage, txt_details, position);
			txt_details.on(Laya.Event.MOUSE_DOWN, this, _utils.scrollText, [txt_details, scrollSlider]);
		}

		/*介绍页文本处理结束*/

		/*创建介绍页面的audio*/

	}, {
		key: 'createAudio',
		value: function createAudio() {
			var data = this.introData;
			var audioUrl = 'http://192.168.199.251/' + this.introData.audioname;
			switch (this.agent) {
				case 'alva big':
					window.QWebScale = this.scale;
					var self = this;
					new QWebChannel(qt.webChannelTransport, function (channel) {
						window.libQt5JSObject = channel.objects.libQt5JSObject;
						window.libQt5JSObject.CreateAudioWidget(self.introData.audioname, 990 * window.QWebScale, 750 * window.QWebScale, 400 * window.QWebScale, 130 * window.QWebScale);
					});
					break;
				case 'android':
					if (AndroidTool.playBakMusic) {
						var x = this.infoImage.x + 645 * this.scale;
						var y = this.infoImage.y + 480 * this.scale;
						AndroidTool.getWH(Laya.Browser.width, Laya.Browser.height, x, y);
						AndroidTool.playBakMusic(audioUrl);
					};
					break;
				case 'ios':
					if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.showAudio) {
						window.webkit.messageHandlers.showAudio.postMessage(audioUrl);
					}
					break;
				default:
					break;
			}
		}

		// 销毁介绍页面的audio

	}, {
		key: 'destroyAudio',
		value: function destroyAudio() {
			switch (this.agent) {
				case 'alva big':
					new QWebChannel(qt.webChannelTransport, function (channel) {
						window.libQt5JSObject = channel.objects.libQt5JSObject;
						window.libQt5JSObject.CloseAudioWidget();
					});
					break;
				case 'ios':
					if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.removeAudio) {
						window.webkit.messageHandlers.removeAudio.postMessage('');
					}
					// if(window.webkit &&  window.webkit.messageHandlers && window.webkit.messageHandlers.back){
					//     window.webkit.messageHandlers.back.postMessage("");
					// }
					break;
				case 'android':
					if (typeof AndroidTool != "undefined") {
						if (AndroidTool.pauseBakMusic) {
							AndroidTool.pauseBakMusic();
						}
					}
					break;
				default:
					break;
			}
		}
	}, {
		key: 'back',
		value: function back() {
			this.infoImage.graphics.clear();
			Laya.stage.removeChild(this.infoImage);
			this.destroyAudio();
		}
	}]);

	return IntroPage;
}();

exports.default = IntroPage;

},{"./script/utils":8}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require('./script/utils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JoyStick = function () {
    function JoyStick(mod) {
        _classCallCheck(this, JoyStick);

        this.model = mod; // 模型
        this.scale = Laya.Browser.width / 1920;
        this.introData = JSON.parse(localStorage.getItem('currBookInfo'));
        this.rockerBtnOrigin = new Laya.Point(100 * this.scale, 100 * this.scale);
        // Laya.loader.load("res/atlas/res.atlas", Laya.Handler.create(this, ));
        this.initView();
        this.originPoint = new Laya.Point(this.rockerView.width / 2, this.rockerView.height / 2);
        this.firstPostion = new Laya.Point(0, 0); // 遥杆内部按钮的初始位置
        /***摇杆的角度****/
        this.angle = -1;
        /***摇杆的弧度****/
        this.radians = -1;
        this.deltaX = 0;
        this.deltaY = 0;
        Laya.timer.loop(30, this, this.onUpdate);
    }

    _createClass(JoyStick, [{
        key: 'initView',
        value: function initView() {
            this.rockerView = new Laya.Sprite();
            this.rockerView.size(400 * this.scale, 400 * this.scale);
            this.rockerView.pos(40 * this.scale, Laya.Browser.height - 420 * this.scale);
            this.rockerBg = new Laya.Sprite();
            this.rockerBg.loadImage('./res/rocker-bg.png');
            this.rockerBg.visible = false;
            this.rockerBg.size(400 * this.scale, 400 * this.scale);

            this.rockerBtn = new Laya.Button('./res/rocker-btn.png');
            this.rockerBtn.size(200 * this.scale, 200 * this.scale);
            this.rockerBtn.stateNum = 2;
            this.rockerBtn.pos(this.rockerBtnOrigin.x, this.rockerBtnOrigin.y);
            this.rockerBtn.on(Laya.Event.MOUSE_DOWN, this, this.onRockerDown);
            this.rockerView.addChild(this.rockerBg);
            this.rockerView.addChild(this.rockerBtn);
            Laya.stage.addChild(this.rockerView);
            Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onRockekrUp);
            Laya.stage.on(Laya.Event.MOUSE_OUT, this, this.onRockekrUp);
            this.rockerView.zOrder = 50;
        }
    }, {
        key: 'hideView',
        value: function hideView() {
            this.rockerView.visible = false;
        }
    }, {
        key: 'showView',
        value: function showView() {
            this.rockerView.visible = true;
        }
    }, {
        key: 'getRockerView',
        value: function getRockerView() {
            return this.rockerView;
        }
    }, {
        key: 'onUpdate',
        value: function onUpdate() {
            if (this.rockerBtn.x !== this.rockerBtnOrigin.x || this.rockerBtn.y !== this.rockerBtnOrigin.y) {
                var dx = this.deltaX;
                var dy = this.deltaY;
                if (Math.abs(dx) <= 20 && Math.abs(dy) <= 20) return;
                var angle = 3;
                if (Math.abs(dx) > Math.abs(dy)) {
                    if ((0, _utils.isMobileRotateWrongX)(this.introData.subname)) {
                        this.model.transform.rotate(new Laya.Vector3(0, dx > 0 ? angle : -angle, 0), true, false);
                    } else {
                        this.model.transform.rotate(new Laya.Vector3(0, 0, dx > 0 ? angle : -angle), true, false);
                    }
                } else {
                    if ((0, _utils.isMobileRotateWrongY)(this.introData.subname)) {
                        this.model.transform.rotate(new Laya.Vector3(dy > 0 ? angle : -angle, 0, 0), false, false);
                    } else {
                        this.model.transform.rotate(new Laya.Vector3(dy > 0 ? -angle : angle, 0, 0), false, false);
                    }
                }
            }
        }
    }, {
        key: 'onRockerDown',
        value: function onRockerDown(e) {
            this.rockerBg.visible = true;
            this.firstPostion.x = e.stageX;
            this.firstPostion.y = e.stageY;
            Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.onRockerMove);
            Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onRockerUp);
            Laya.stage.on(Laya.Event.MOUSE_OUT, this, this.onRockerUp);
        }
    }, {
        key: 'onRockerUp',
        value: function onRockerUp(e) {
            this.rockerBtn.pos(this.rockerBtnOrigin.x, this.rockerBtnOrigin.y);
            this.rockerBg.visible = false;
            //修改摇杆角度与弧度为-1（代表无角度）
            this.radians = this.angle = -1;
            Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.onRockerMove);
        }

        // 控制rockerBtn的移动范围

    }, {
        key: 'onRockerMove',
        value: function onRockerMove(e) {
            var locationPos = this.rockerView.globalToLocal(new Laya.Point(e.stageX, e.stageY), false);
            this.deltaX = locationPos.x - this.originPoint.x;
            this.deltaY = locationPos.y - this.originPoint.y;
            var dx = this.deltaX * this.deltaX;
            var dy = this.deltaY * this.deltaY;
            this.angle = Math.atan2(this.deltaX, this.deltaY) * 180 / Math.PI;
            if (this.angle < 0) this.angle += 360;
            this.angle = Math.round(this.angle);
            this.radians = Math.PI / 180 * this.angle;
            if (dx + dy >= (this.rockerView.width / 2 - this.rockerBtn.width / 2) * (this.rockerView.width / 2 - this.rockerBtn.width / 2)) {
                var x = Math.floor(Math.sin(this.radians) * (this.rockerView.width / 2 - this.rockerBtn.width / 2) + this.originPoint.x);
                var y = Math.floor(Math.cos(this.radians) * (this.rockerView.width / 2 - this.rockerBtn.width / 2) + this.originPoint.y);
                this.rockerBtn.pos(x - this.rockerBtn.width / 2, y - this.rockerBtn.height / 2);
            } else {
                this.rockerBtn.pos(locationPos.x - this.rockerBtn.width / 2, locationPos.y - this.rockerBtn.height / 2);
            }
        }
    }]);

    return JoyStick;
}();

exports.default = JoyStick;

},{"./script/utils":8}],3:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BigMoveScript = require('./script/BigMoveScript');

var _BigMoveScript2 = _interopRequireDefault(_BigMoveScript);

var _PhoneMoveScript = require('./script/PhoneMoveScript');

var _PhoneMoveScript2 = _interopRequireDefault(_PhoneMoveScript);

var _utils = require('./script/utils');

var _Intro = require('./Intro');

var _Intro2 = _interopRequireDefault(_Intro);

var _Question = require('./Question');

var _Question2 = _interopRequireDefault(_Question);

var _QuestionPhone = require('./QuestionPhone');

var _QuestionPhone2 = _interopRequireDefault(_QuestionPhone);

var _JoyStick = require('./JoyStick');

var _JoyStick2 = _interopRequireDefault(_JoyStick);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var startLoad, endLoad;
startLoad = new Date();
console.log('startLoad:' + startLoad);
var Events = Laya.Event;

var LoadModel = function () {
	function LoadModel() {
		_classCallCheck(this, LoadModel);

		var Browser = Laya.Browser;
		var Sprite = Laya.Sprite;
		var Text = Laya.Text;
		var Button = Laya.Button;
		Config.isAlpha = true;
		var config = new Config3D();
		config.isAlpha = true;
		Laya3D.init(Browser.clientWidth, Browser.clientHeight, config);
		Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
		Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
		Laya.stage.alginV = Laya.Stage.ALGIN_MIDDLE;
		Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;

		this.agent = (0, _utils.getUserAgent)();
		this.getData(); // 获取该模型所有相关数据
		this.sceneId = 0; // 0为模型页，1为介绍页，2为效果页
		this.backImage = new Sprite();
		this.scale = Laya.Browser.width / 1920;

		if ((0, _utils.GetQueryString)('isphoto')) {
			// isphoto = 0是模型页，不等于0是拍照页；
			this.isPhoto = (0, _utils.GetQueryString)('isphoto') === '0' ? false : true;
		} else {
			this.isPhoto = false;
		}

		// 添加背景图片
		if (this.isPhoto) {
			// 拍照页
			if (Laya.Render.isWebGL) {
				Laya.stage.bgColor = "none";
			} else {
				Laya.stage.bgColor = null;
			}
		} else {
			Laya.stage.on('resize', this, function () {
				var bg = '';
				if (this.introData.subname === 'taiyangxi') {
					bg = './res/taiyang-bg.jpg';
				} else if (this.introData.mainname === 'CHE' && (this.agent === 'ios' || this.agent === 'android')) {
					bg = './res/bg-che.jpg';
				} else {
					bg = './res/bg-ht.png';
				}
				this.backImage.width = Laya.stage.width;
				this.backImage.height = Laya.stage.height;
				this.backImage.pos(0, 0);
				this.backImage.loadImage(bg);
			});
			Laya.stage.addChild(this.backImage);
		}
		var firstLoad = false;
		if ((0, _utils.GetQueryString)('firstLoad') === 'true') {
			firstLoad = true;
		}
		if (!(this.agent == 'android' && firstLoad)) {
			this.preLoadModel();
		}
		Laya.loader.load("res/atlas/res.atlas", Laya.Handler.create(this, this.initButtons));
	}

	// 根据url中的name获取模型数据


	_createClass(LoadModel, [{
		key: 'getData',
		value: function getData() {
			var name = (0, _utils.GetQueryString)("name");
			for (var i = 0, len = BookInfos.length; i < len; i++) {
				if (name === BookInfos[i].subname) {
					this.introData = BookInfos[i];
					localStorage.setItem('currBookInfo', JSON.stringify(BookInfos[i]));
				}
			}
		}
	}, {
		key: 'getMod',
		value: function getMod() {
			var mod = void 0;
			if ((0, _utils.isLsFile)(this.introData.subname)) {
				mod = this.scene.getChildAt(1);
			} else {
				mod = this.model.getChildAt(2);
			}
			return mod;
		}
	}, {
		key: 'preLoadModel',
		value: function preLoadModel() {
			Laya.loader.create(['./models/13_faxianhao_laya/Conventional/13_faxianhao.lh'], Laya.Handler.create(this, this.onModelLoad, null, false));
		}
	}, {
		key: 'ctrlModelMoveScript',
		value: function ctrlModelMoveScript() {
			var self = this;
			var rock = this.rockerView.getRockerView();
			rock.on(Laya.Event.MOUSE_DOWN, this, function () {
				if (this.modelMoveScript && this.modelMoveScript.enabled) {
					this.modelMoveScript.enabled = false;
					Laya.stage.once(Laya.Event.MOUSE_UP, this, function () {
						if (this.modelMoveScript && !this.modelMoveScript.enabled) {
							this.modelMoveScript.enabled = true;
						}
					});
				}
			});
		}

		// 模型处理

	}, {
		key: 'onModelLoad',
		value: function onModelLoad() {
			var mod = void 0,
			    camera = void 0;
			if ((0, _utils.isLsFile)(this.introData.subname)) {
				this.scene = Laya.stage.addChild(Laya.Loader.getRes(this.introData.sz_model));
				this.model = this.scene.getChildAt(1);
				mod = this.model;
				camera = this.scene.getChildByName("Main Camera");
			} else {
				// 添加场景
				this.scene = Laya.stage.addChild(new Laya.Scene3D());
				this.model = Laya.Loader.getRes(this.introData.sz_model);
				this.scene.addChild(this.model);
				mod = this.model.getChildAt(2);
				camera = this.model.getChildByName("Main Camera");
			}
			(0, _utils.resetModel)(this.introData, mod);
			this.firstRotate = new Laya.Quaternion(mod.transform.rotation.x, mod.transform.rotation.y, mod.transform.rotation.z, mod.transform.rotation.w);
			this.firstPosition = new Laya.Vector3(mod.transform.position.x, mod.transform.position.y, mod.transform.position.z);
			if (this.agent === 'alva big' || this.agent === 'chrome') {
				this.modelMoveScript = mod.addComponent(_BigMoveScript2.default);
			} else {
				this.modelMoveScript = mod.addComponent(_PhoneMoveScript2.default);
				this.rockerView = new _JoyStick2.default(mod, this.modelMoveScript);
				this.ctrlModelMoveScript();
			}
			if (!(0, _utils.isNoBackImg)(this.introData.subname)) {
				camera.clearFlag = Laya.BaseCamera.CLEARFLAG_DEPTHONLY;
			}
			this.hideLoading();
			endLoad = new Date();
			console.log('endLoad:' + endLoad);
		}

		// 适配

	}, {
		key: 'adaptation',
		value: function adaptation(chrome, alvabig, alvasmall, ios, android) {
			switch (this.agent) {
				case 'chrome':
					return chrome;
				case 'alva small':
					return alvasmall;
				case 'ios':
					return ios || android;
				case 'android':
					return android || ios;
				default:
					return alvabig || chrome;
			}
		}
	}, {
		key: 'initButtons',


		/* button处理开始 */
		value: function initButtons() {
			var VERTICAL_SPACING = 150 * this.scale;
			var skins = ['res/intro-btn.png', 'res/question.png', 'res/close-pop.png', 'res/camera.png', 'res/recognize.png'];
			var btnNames = ['introBtn', 'question', 'backBtn', 'cameraBtn', 'recognize'];
			for (var i = 0, len = skins.length; i < len; i++) {
				var isWin = this.agent !== 'android' && this.agent !== 'ios';
				if (!(this.agent === 'android' || this.agent === 'ios') && i === 3) {
					break;
				}
				var btn = this.createButton(skins[i], null, btnNames[i]);
				var x = Laya.Browser.width - VERTICAL_SPACING;
				var y = 0;
				switch (i) {
					case 0:
						// 介绍
						if (this.agent !== 'alva big') {
							y = Laya.Browser.height - VERTICAL_SPACING * 2;
						} else {
							y = 580 * this.scale;
						}
						btn.on(Events.CLICK, this, this.introBtnClick);
						break;
					case 1:
						// 答题
						if (this.agent !== 'alva big') {
							y = Laya.Browser.height - VERTICAL_SPACING;
						} else {
							y = 700 * this.scale;
						}
						btn.on(Events.CLICK, this, this.questionBtnClick);
						break;
					case 2:
						// 返回
						if (this.agent === 'android' || this.agent === 'ios') {
							x = 60 * this.scale;
							y = 60 * this.scale;
							btn.width = 100 * this.scale;
							btn.height = 100 * this.scale;
						} else {
							x = 1800 * this.scale;
							y = 40 * this.scale;
							btn.width = this.adaptation(90 * this.scale, 90 * this.scale, 120 * this.scale);
							btn.height = this.adaptation(60 * this.scale, 60 * this.scale, 80 * this.scale);
						}
						btn.on(Events.CLICK, this, this.backBtnClick);
						// TODO: 这里实际上不需要注释，注释是方便本地测试
						if (this.agent === 'alva small') {
							btn.visible = false;
						}
						break;
					case 3:
						// 相机
						y = Laya.Browser.height - VERTICAL_SPACING * 3;
						btn.on(Events.CLICK, this, this.cameraBtnClick);
						break;
					case 4:
						// 拍照识别
						x = Laya.Browser.width - VERTICAL_SPACING;
						y = 60 * this.scale;
						btn.on(Events.CLICK, this, this.onRecognizeClick);
				}
				btn.pos(x, y);
			}
		}
	}, {
		key: 'createButton',
		value: function createButton(skin, text, name) {
			var btn;
			if (skin === 'res/close-pop.png' && (this.agent === 'android' || this.agent === 'ios')) {
				btn = new Laya.Button('res/close-pop-p.png', text);
			} else {
				btn = new Laya.Button(skin, text);
			}
			if (this.agent !== 'alva big') {
				btn.width = 120 * this.scale;
				btn.height = 120 * this.scale;
			} else {
				btn.width = 80 * this.scale;
				btn.height = 80 * this.scale;
			}
			btn.name = name;
			btn.zOrder = 20;
			btn.stateNum = 1;
			Laya.stage.addChild(btn);
			if (this.isPhoto) {
				btn.visible = false;
			}
			return btn;
		}
	}, {
		key: 'resetBtnShow',
		value: function resetBtnShow(sceneId) {
			switch (sceneId) {
				case 0:
					Laya.stage.getChildByName('cameraBtn') && (Laya.stage.getChildByName('cameraBtn').visible = true);
					Laya.stage.getChildByName('recognize') && (Laya.stage.getChildByName('recognize').visible = true);
					Laya.stage.getChildByName('introBtn').visible = true;
					Laya.stage.getChildByName('question').visible = true;
					if (this.rockerView) {
						this.rockerView.showView();
					}
					break;
				case 1:
				case 2:
					Laya.stage.getChildByName('cameraBtn') && (Laya.stage.getChildByName('cameraBtn').visible = false);
					Laya.stage.getChildByName('recognize') && (Laya.stage.getChildByName('recognize').visible = false);
					Laya.stage.getChildByName('introBtn').visible = false;
					Laya.stage.getChildByName('question').visible = false;
					if (this.rockerView) {
						this.rockerView.hideView();
					}
					break;
			}
		}
		/* button处理结束 */

		/* 事件处理开始 */

	}, {
		key: 'introBtnClick',
		value: function introBtnClick(e) {
			window.sceneId = this.sceneId = 1;
			this.resetBtnShow(this.sceneId);
			Laya.stage.removeChild(this.scene);
			this.introPage = new _Intro2.default(this.scene, this.agent, this.introData);
		}
	}, {
		key: 'questionBtnClick',
		value: function questionBtnClick(e) {
			window.sceneId = this.sceneId = 2;
			this.resetBtnShow(this.sceneId);
			if ((0, _utils.isLsFile)(this.introData.subname)) {
				var camera = this.scene.getChildByName("Main Camera");
				camera.clearFlag = Laya.BaseCamera.CLEARFLAG_DEPTHONLY;
			}
			this.scene.removeChild(this.model);
			Laya.stage.removeChild(this.scene);
			if (this.agent === 'android' || this.agent === 'ios' || this.agent === 'alva small') {
				this.playPage = new _QuestionPhone2.default(this.scene, this.agent, this.introData.questionDataPhone || this.introData.questionData);
			} else {
				this.playPage = new _Question2.default(this.scene, this.agent, this.introData.questionData);
			}
		}
	}, {
		key: 'cameraBtnClick',
		value: function cameraBtnClick(e) {
			var name = (0, _utils.GetQueryString)("name");
			if (this.agent === "ios") {
				window.location.href = window.location.href + "&takephoto";
			} else {
				if (typeof AndroidTool != "undefined") {
					if (AndroidTool.goCaptures) {
						AndroidTool.goCaptures(name);
					}
				}
			}
		}
	}, {
		key: 'addModelScript',
		value: function addModelScript() {
			var mod = this.getMod();
			if (this.agent === 'alva big' || this.agent === 'chrome') {
				// 添加脚本(model从舞台移除重新添加后其原来的脚本不起作用了，要重新绑定一个脚本)
				// 大屏和chrome需要加一个新的BigMoveScript，否则原来的BigMoveScript无法作用于mod，mod就无法旋转移动等;
				this.modelMoveScript = mod.addComponent(_BigMoveScript2.default);
			} else {
				// 移动端不需要重新加PhoneMoveScript，不重新加mod仍然可以执行旧的PhoneMoveScript
				// 如果重新加PhoneMoveScript的话this.modelMoveScript的id的值会被改变，rock绑定的down事件就无法对新id的this.modelMoveScript起作用，只会对原来id的this.modelMoveScript起作用，则当按下rock时模型会同时发生移动和旋转；
				// this.modelMoveScript = mod.addComponent(PhoneMoveScript);
			}
		}
	}, {
		key: 'backResetModel',
		value: function backResetModel() {
			var mod = this.getMod();
			mod.transform.rotation = this.firstRotate;
			mod.transform.position = this.firstPosition;
		}
	}, {
		key: 'backBtnClick',
		value: function backBtnClick() {
			switch (this.sceneId) {
				case 0:
					// 模型页
					Laya.loader.clearRes(this.introData.sz_model);
					if (this.agent === 'alva big' || this.agent === 'chrome') {
						Laya.Browser.window.location.href = './main.html';
					} else if (this.agent === "ios") {
						window.location.href = window.location.href + "&callback";
					} else {
						if (this.agent === 'android') {
							if (AndroidTool.goBack) {
								AndroidTool.goBack();
							}
						}
					}
					break;
				case 1:
					// 介绍页
					window.sceneId = this.sceneId = 0;
					this.introPage.back();
					this.resetBtnShow(this.sceneId);

					Laya.stage.addChild(this.scene);
					this.addModelScript();
					break;
				case 2:
					// 答题页
					window.sceneId = this.sceneId = 0;
					this.playPage.back();
					this.resetBtnShow(this.sceneId);
					if ((0, _utils.isNoBackImg)(this.introData.subname)) {
						var camera = this.scene.getChildByName("Main Camera");
						camera.clearFlag = Laya.BaseCamera.CLEARFLAG_SKY;
					}
					Laya.stage.addChild(this.scene);
					this.scene.addChild(this.model);
					this.addModelScript();
					break;
			}
		}
		/* 事件处理结束 */

		/*点击跳转到拍照识别页面*/

	}, {
		key: 'onRecognizeClick',
		value: function onRecognizeClick() {
			switch (this.agent) {
				case 'ios':
					window.location.href = window.location.href + "&jumpcamera";
					break;
				case 'android':
					if (AndroidTool.goCatch) {
						AndroidTool.goCatch();
					}
					break;
			}
		}

		// 相机拍照时绘制Canvas

	}, {
		key: 'savehtml',
		value: function savehtml() {
			// var htmlCanvas = Laya.stage.drawToCanvas(Laya.stage.width, Laya.stage.height, 0, 0);
			// var canvas=htmlCanvas.source;
			// var dataURL=canvas.toDataURL("image/png");
			// $('#img').attr('src',dataURL);
			if (this.rockerView) {
				this.rockerView.hideView();
			}
			Laya.timer.once(10, this, function () {

				html2canvas(document.getElementsByTagName('canvas')[0], {
					backgroundColor: null,
					width: window.innerWidth,
					height: window.innerHeight
				}).then(function (canvas) {
					var dataURL = canvas.toDataURL("image/png");
					$('#img').attr('src', dataURL);
					if (typeof AndroidTool != "undefined") {
						if (AndroidTool.savehtml) {
							AndroidTool.savehtml(dataURL);
						}
					}
					if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.app) {
						window.webkit.messageHandlers.app.postMessage(dataURL);
					}
				});
			});
		}
	}, {
		key: 'showRocker',
		value: function showRocker() {
			if (this.rockerView) {
				this.rockerView.showView();
			}
		}
	}, {
		key: 'showLoading',
		value: function showLoading() {
			if (typeof AndroidTool != "undefined") {
				if (AndroidTool.startAnimation) {
					AndroidTool.startAnimation();
				}
			}
			if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.showLoading) {
				window.webkit.messageHandlers.showLoading.postMessage("");
			}
		}
	}, {
		key: 'hideLoading',
		value: function hideLoading() {
			if (typeof AndroidTool != "undefined") {
				if (AndroidTool.stopAnimation) {
					AndroidTool.stopAnimation();
				}
			}
			if (this.agent === 'ios') {
				if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.hideLoading) {
					window.webkit.messageHandlers.hideLoading.postMessage("");
				}
			}
		}
	}]);

	return LoadModel;
}();

window.LayaScene = new LoadModel();

},{"./Intro":1,"./JoyStick":2,"./Question":4,"./QuestionPhone":5,"./script/BigMoveScript":6,"./script/PhoneMoveScript":7,"./script/utils":8}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require('./script/utils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var texiaoUrl = '../model/LayaScene_texiao/Conventional/texiao.lh';

var QuestionPage = function () {
    function QuestionPage(scene, agent, questionData) {
        _classCallCheck(this, QuestionPage);

        this.scene = scene;
        this.agent = agent;
        this.scale = Laya.Browser.width / 1920;
        this.questionData = questionData;
        this.questionIndex = 0;
        Laya.loader.load("res/atlas/info.atlas", Laya.Handler.create(this, this.initButtons));
        this.questionBox = new Laya.Sprite();
        this.questionBox.size(800 * this.scale, 1000 * this.scale);
        var left = (Laya.stage.width - this.questionBox.width) / 2;
        var top = (Laya.stage.height - this.questionBox.height) / 2;
        this.questionBox.pos(left, top);
        Laya.stage.addChild(this.questionBox);
        this.questionBox.cacheAs = 'bitmap';
        var currQuestionData = this.questionData[this.questionIndex]; // 存储当前展示问题的数据
        Laya.loader.create([texiaoUrl], Laya.Handler.create(this, this.createQuestion, [currQuestionData], false));
        // this.initButtons();
    }

    /* button处理开始 */


    _createClass(QuestionPage, [{
        key: 'initButtons',
        value: function initButtons() {
            var Events = Laya.Event;
            var skins = ['info/last-question.png', 'info/next-question.png'];
            var btnNames = ['lastQuestion', 'nextQuestion'];
            for (var i = 0, len = skins.length; i < len; i++) {
                var btn = this.createButton(skins[i], null, btnNames[i]);
                var x = 1565 * this.scale;
                var y = 0;
                switch (i) {
                    case 0:
                        // 上一题
                        y = 400 * this.scale;
                        btn.on(Events.CLICK, this, this.lastQuestion);
                        break;
                    case 1:
                        // 下一题
                        y = 600 * this.scale;
                        btn.on(Events.CLICK, this, this.nextQuestion);
                        break;
                }
                btn.pos(x, y);
            }
        }
    }, {
        key: 'createButton',
        value: function createButton(skin, text, name) {
            var btn;
            btn = new Laya.Button(skin, text);
            btn.width = 75 * this.scale;
            btn.height = 102 * this.scale;
            btn.name = name;
            btn.zOrder = 20;
            btn.stateNum = 1;
            Laya.stage.addChild(btn);
            return btn;
        }

        // 适配

    }, {
        key: 'adaptation',
        value: function adaptation(chrome, alvabig, alvasmall) {
            switch (this.agent) {
                case 'chrome':
                    return chrome;
                case 'alva small':
                    return alvasmall;
                default:
                    return alvabig || chrome;
            }
        }
    }, {
        key: 'createQuestion',
        value: function createQuestion(questionData) {
            // 问题
            var questionTitBox = Laya.Pool.getItemByClass('Box', Laya.Sprite);
            questionTitBox.loadImage('./res/question-tit.png');
            questionTitBox.pos(0 * this.scale, 0 * this.scale);
            questionTitBox.size(840 * this.scale, 555 * this.scale);

            var icon = Laya.Pool.getItemByClass('Box', Laya.Sprite);
            icon.loadImage('info/ques' + this.questionIndex + '.png');
            icon.pos(60 * this.scale, 110 * this.scale);
            icon.size(100 * this.scale, 33 * this.scale);
            questionTitBox.addChild(icon);
            var question = Laya.Pool.getItemByClass('Txt', Laya.Text);
            question.leading = 15;
            question.color = '#000';
            question.fontSize = this.adaptation(25, 60, 40 * this.scale);
            question.text = questionData.question;
            question.wordWrap = true;
            question.size(550 * this.scale, 200 * this.scale);
            question.pos(120 * this.scale, 170 * this.scale);
            questionTitBox.addChild(question);

            this.questionBox.addChild(questionTitBox);
            // 答对特效
            var texiao = Laya.Loader.getRes(texiaoUrl);
            var camera = texiao.getChildByName("Main Camera");
            camera.clearFlag = Laya.BaseCamera.CLEARFLAG_DEPTHONLY;
            // 问题选项
            var rightAnswerIndex = 0;
            var questionTitBoxH = questionTitBox.height;
            var questionTitBoxW = questionTitBox.width;
            for (var i = 0; i < questionData.option.length; i++) {
                var optionBox = Laya.Pool.getItemByClass('Box', Laya.Sprite);
                optionBox.name = 'optionBox' + i;
                optionBox.loadImage('info/' + i + '.png');
                optionBox.pos(75 * this.scale, questionTitBoxH + (20 + i * 100) * this.scale);
                optionBox.size(questionTitBoxW - 200 * this.scale, 90 * this.scale);
                var option = Laya.Pool.getItemByClass('Txt', Laya.Text); // 选项内容
                option.color = '#000';
                option.fontSize = this.adaptation(22, 60, 40 * this.scale);
                option.pos(80 * this.scale, 40 * this.scale);
                option.text = questionData.option[i];
                if (questionData.option[i].length > 18) {
                    option.fontSize = this.adaptation(18, 30, 30 * this.scale);
                    option.wordWrap = true;
                    option.width = 320 * this.scale;
                    if (questionData.option[i].length > 44) {
                        option.pos(60 * this.scale, 22 * this.scale);
                    }
                }
                optionBox.addChild(option);

                var prompt = Laya.Pool.getItemByClass('Box', Laya.Sprite); // 对号或者错号
                prompt.pos(optionBox.width - 30 * this.scale, 10 * this.scale);
                prompt.visible = false;
                prompt.name = 'prompt';
                if (questionData.option[i] === questionData.rightAnswer) {
                    prompt.loadImage('info/right.png');
                    prompt.size(62 * this.scale, 50 * this.scale);
                    rightAnswerIndex = i;
                } else {
                    prompt.loadImage('info/wrong.png');
                    prompt.size(50 * this.scale, 50 * this.scale);
                }
                optionBox.addChild(prompt);

                optionBox.on(Laya.Event.CLICK, this, this.answerClick, [questionData, questionData.option[i], i, texiao]);
                this.questionBox.addChild(optionBox);
            }
            var analysis = Laya.Pool.getItemByClass('Btn', Laya.Button); // 答案解析
            analysis.skin = 'info/analysis.png';
            analysis.name = 'analysis';
            analysis.stateNum = 1;
            analysis.size(52 * this.scale, 69 * this.scale);
            analysis.pos(questionTitBoxW - 100 * this.scale, questionTitBoxH + (30 + rightAnswerIndex * 100) * this.scale);
            analysis.visible = false;
            analysis.on(Laya.Event.CLICK, this, this.analysisClick, [questionData]);
            this.questionBox.addChild(analysis);
        }
    }, {
        key: 'recoverQuestion',
        value: function recoverQuestion(back) {
            // this.questionBox.destroyChildren();
            this.questionBox.removeChildren();
            if (back) {
                Laya.Pool.clearBySign('Box');
                Laya.Pool.clearBySign('Txt');
                Laya.Pool.clearBySign('Btn');
                Laya.Pool.clearBySign('anBox');
                Laya.Pool.clearBySign('anTxt');
                Laya.loader.clearRes(texiaoUrl);
            } else {
                Laya.Pool.recoverByClass('Box');
                Laya.Pool.recoverByClass('Txt');
                Laya.Pool.recoverByClass('Btn');
            }
        }
    }, {
        key: 'analysisClick',
        value: function analysisClick(questionData) {
            var analysisPage = Laya.Pool.getItemByClass('anBox', Laya.Sprite);
            analysisPage.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, '#000');
            analysisPage.alpha = 0.2;
            analysisPage.zOrder = 26;

            var analysisBox = Laya.Pool.getItemByClass('anBox', Laya.Sprite);
            analysisBox.loadImage('./res/analysis-box.png');
            analysisBox.size(840 * this.scale, 840 * this.scale / 680 * 390);
            analysisBox.zOrder = 27;
            var left = (Laya.stage.width - analysisBox.width) / 2;
            var top = (Laya.stage.height - analysisBox.height) / 2;
            analysisBox.pos(left, top + 50 * this.scale);

            var analysisClose = Laya.Pool.getItemByClass('anBox', Laya.Sprite);
            analysisClose.loadImage('info/analysis-close.png');
            analysisClose.size(50 * this.scale, 50 * this.scale);
            analysisClose.pos(analysisBox.width - 20 * this.scale, -20 * this.scale);
            analysisBox.addChild(analysisClose);
            analysisClose.on(Laya.Event.CLICK, this, this.closeAnalysis, [analysisPage, analysisBox]);

            var analysisTxt = Laya.Pool.getItemByClass('anTxt', Laya.Text);
            analysisTxt.text = questionData.analysis;
            analysisTxt.size(535 * this.scale, 350 * this.scale);
            analysisTxt.leading = 15;
            analysisTxt.wordWrap = true;
            analysisTxt.overflow = Laya.Text.SCROLL;analysisTxt.fontSize = 60;
            analysisTxt.pos(250 * this.scale, 60 * this.scale);
            analysisTxt.on(Laya.Event.MOUSE_DOWN, this, _utils.scrollText, [analysisTxt]);
            analysisBox.addChild(analysisTxt);
            Laya.stage.addChild(analysisPage);
            Laya.stage.addChild(analysisBox);
        }
    }, {
        key: 'closeAnalysis',
        value: function closeAnalysis(analysisPage, analysisBox) {
            Laya.stage.removeChild(analysisPage);
            Laya.stage.removeChild(analysisBox);
            Laya.Pool.recoverByClass('anBox');
            Laya.Pool.recoverByClass('anTxt');
        }
    }, {
        key: 'answerClick',
        value: function answerClick(questionData, answer, answerIndex, texiao) {
            var optionBox = this.questionBox.getChildByName('optionBox' + answerIndex);
            if (answer === questionData.rightAnswer) {
                optionBox.getChildByName('prompt').visible = true;
                this.questionBox.getChildByName('analysis').visible = true;
                if (this.agent !== 'alva small') {
                    Laya.SoundManager.playMusic("./res/audio/right.mp3", 1);
                }
                Laya.stage.addChild(this.scene);
                this.scene.addChild(texiao);
                Laya.timer.once(1000, this, function () {
                    this.scene.removeChild(texiao);
                    Laya.stage.removeChild(this.scene);
                });
            } else {
                optionBox.getChildByName('prompt').visible = true;
                if (this.agent !== 'alva small') {
                    Laya.SoundManager.playMusic("./res/audio/wrong.mp3", 1);
                }
            }
        }
    }, {
        key: 'lastQuestion',
        value: function lastQuestion() {
            if (this.questionIndex > 0) {
                this.recoverQuestion(false);
                this.questionIndex--;
                this.createQuestion(this.questionData[this.questionIndex]);
            } else {
                console.log('已经是第一题了！');
            }
        }
    }, {
        key: 'nextQuestion',
        value: function nextQuestion() {
            if (this.questionIndex < this.questionData.length - 1) {
                this.recoverQuestion(false);
                this.questionIndex++;
                this.createQuestion(this.questionData[this.questionIndex]);
            } else {
                console.log('已经是最后一题了！');
            }
        }
    }, {
        key: 'back',
        value: function back() {
            this.recoverQuestion(true);
            Laya.stage.removeChild(this.questionBox);
            Laya.stage.getChildByName('lastQuestion').destroy();
            Laya.stage.getChildByName('nextQuestion').destroy();
        }
    }]);

    return QuestionPage;
}();

exports.default = QuestionPage;

},{"./script/utils":8}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require('./script/utils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var texiaoUrl = './res/LayaScene_texiao/Conventional/texiao.lh';

var QuestionPhone = function () {
    function QuestionPhone(scene, agent, questionData) {
        _classCallCheck(this, QuestionPhone);

        this.scene = scene;
        this.agent = agent;
        this.scale = Laya.Browser.width / 1920;
        this.questionData = questionData;
        this.questionIndex = 0;
        Laya.loader.load("res/atlas/info.atlas", Laya.Handler.create(this, this.initButtons));
        this.questionBox = new Laya.Sprite();
        this.questionBox.size(Laya.stage.width, Laya.stage.height);
        this.questionBox.loadImage('./res/question-bg-p.png');
        this.questionBox.pos(0, 0);
        Laya.stage.addChild(this.questionBox);
        this.questionBox.cacheAs = 'bitmap';

        var currQuestionData = this.questionData[this.questionIndex]; // 存储当前展示问题的数据
        Laya.loader.create([texiaoUrl], Laya.Handler.create(this, this.createQuestion, [currQuestionData], false));
        // this.initButtons();
    }

    /* button处理开始 */


    _createClass(QuestionPhone, [{
        key: 'initButtons',
        value: function initButtons() {
            var Events = Laya.Event;
            var skins = ['info/last-question-p.png', 'info/next-question-p.png'];
            var btnNames = ['lastQuestion', 'nextQuestion'];
            for (var i = 0, len = skins.length; i < len; i++) {
                var btn = this.createButton(skins[i], null, btnNames[i]);
                var x = 1480 * this.scale;
                var y = 0;
                switch (i) {
                    case 0:
                        // 上一题
                        y = 125 * this.scale;
                        btn.on(Events.CLICK, this, this.lastQuestion);
                        break;
                    case 1:
                        // 下一题
                        y = 400 * this.scale;
                        btn.on(Events.CLICK, this, this.nextQuestion);
                        break;
                }
                btn.pos(x, y);
            }
        }
    }, {
        key: 'createButton',
        value: function createButton(skin, text, name) {
            var btn;
            btn = new Laya.Button(skin, text);
            btn.width = 66 * this.scale;
            btn.height = 55 * this.scale;
            btn.name = name;
            btn.zOrder = 20;
            btn.stateNum = 1;
            Laya.stage.addChild(btn);
            return btn;
        }

        // 适配

    }, {
        key: 'adaptation',
        value: function adaptation(alavsmall, ios, android) {
            switch (this.agent) {
                case 'alva small':
                    return alavsmall;
                case 'ios':
                    return ios || android;
                case 'android':
                    return android || ios;
                default:
                    return alvabig || chrome;
            }
        }
    }, {
        key: 'createQuestion',
        value: function createQuestion(questionData) {
            // 问题
            var questionTitBox = Laya.Pool.getItemByClass('Box', Laya.Sprite);
            questionTitBox.size(920 * this.scale, 650 * this.scale);
            var left = (Laya.stage.width - questionTitBox.width) / 2;
            questionTitBox.pos(left, 30 * this.scale);
            var question = Laya.Pool.getItemByClass('Txt', Laya.Text);
            question.leading = 12;
            question.color = '#fff';
            question.fontSize = this.adaptation(44 * this.scale, 44 * this.scale);
            question.text = this.questionIndex + 1 + '. ' + questionData.question;
            question.wordWrap = true;
            question.size(600 * this.scale, 410 * this.scale);
            if (questionData.question.length < 29) {
                question.pos(160 * this.scale, 170 * this.scale);
            } else {
                question.pos(160 * this.scale, 100 * this.scale);
            }
            questionTitBox.addChild(question);
            this.questionBox.addChild(questionTitBox);

            // 答对特效
            var texiao = Laya.Loader.getRes(texiaoUrl);
            var camera = texiao.getChildByName("Main Camera");
            camera.clearFlag = Laya.BaseCamera.CLEARFLAG_DEPTHONLY;

            // 问题选项
            var rightAnswerIndex = 0;
            var questionTitBoxH = questionTitBox.height;
            var questionTitBoxW = questionTitBox.width;
            var allOptionBox = Laya.Pool.getItemByClass('Box', Laya.Sprite);
            allOptionBox.name = 'allOption';
            allOptionBox.size(1400 * this.scale, 340 * this.scale);
            allOptionBox.pos((Laya.stage.width - allOptionBox.width) / 2, Laya.stage.height - 420 * this.scale);
            this.questionBox.addChild(allOptionBox);
            for (var i = 0; i < questionData.option.length; i++) {
                var optionBox = Laya.Pool.getItemByClass('Box', Laya.Sprite);
                optionBox.name = 'optionBox' + i;
                optionBox.loadImage('info/' + i + '-p.png');
                // 0 1 2 3
                switch (i) {
                    case 0:
                        optionBox.pos(0, 0);
                        break;
                    case 1:
                        optionBox.pos(830 * this.scale, 0);
                        break;
                    case 2:
                        optionBox.pos(0, 150 * this.scale);
                        break;
                    case 3:
                        optionBox.pos(830 * this.scale, 150 * this.scale);
                        break;
                }
                optionBox.size(680 * this.scale, 140 * this.scale);

                var option = Laya.Pool.getItemByClass('Txt', Laya.Text); // 选项内容
                option.color = '#000';
                option.fontSize = this.adaptation(40 * this.scale, 40 * this.scale);
                option.pos(150 * this.scale, 60 * this.scale);
                option.color = '#fff';
                option.text = questionData.option[i];
                // if (questionData.option[i].length > 16) {
                //     option.fontSize = 14;
                //     option.wordWrap = true;
                //     option.width = 320 * this.scale;
                //     if (questionData.option[i].length > 42) {
                //         option.pos(60 * this.scale, 22 * this.scale);
                //     }
                // }
                optionBox.addChild(option);

                var prompt = Laya.Pool.getItemByClass('Box', Laya.Sprite); // 对号或者错号
                prompt.pos(optionBox.width - 80 * this.scale, 40 * this.scale);
                prompt.visible = false;
                prompt.name = 'prompt';
                if (questionData.option[i] === questionData.rightAnswer) {
                    prompt.loadImage('info/right.png');
                    prompt.size(100 * this.scale, 80 * this.scale);
                    rightAnswerIndex = i;
                } else {
                    prompt.loadImage('info/wrong.png');
                    prompt.size(80 * this.scale, 80 * this.scale);
                }
                optionBox.addChild(prompt);

                optionBox.on(Laya.Event.CLICK, this, this.answerClick, [questionData, questionData.option[i], i, texiao]);

                allOptionBox.addChild(optionBox);
            }
            var analysis = Laya.Pool.getItemByClass('Btn', Laya.Button); // 答案解析
            analysis.skin = 'info/analysis-p.png';
            analysis.name = 'analysis';
            analysis.stateNum = 1;
            analysis.size(100 * this.scale, 131 * this.scale);
            switch (rightAnswerIndex) {
                case 0:
                    analysis.pos(700 * this.scale, 30 * this.scale);
                    break;
                case 1:
                    analysis.pos(1530 * this.scale, 30 * this.scale);
                    break;
                case 2:
                    analysis.pos(700 * this.scale, 180 * this.scale);
                    break;
                case 3:
                    analysis.pos(1530 * this.scale, 180 * this.scale);
                    break;
            }
            analysis.visible = false;
            analysis.on(Laya.Event.CLICK, this, this.analysisClick, [questionData]);
            allOptionBox.addChild(analysis);
        }
    }, {
        key: 'recoverQuestion',
        value: function recoverQuestion(back) {
            // this.questionBox.destroyChildren();
            this.questionBox.removeChildren();
            if (back) {
                Laya.Pool.clearBySign('Box');
                Laya.Pool.clearBySign('Txt');
                Laya.Pool.clearBySign('Btn');
                Laya.Pool.clearBySign('anBox');
                Laya.Pool.clearBySign('anTxt');
                Laya.loader.clearRes(texiaoUrl);
            } else {
                Laya.Pool.recoverByClass('Box');
                Laya.Pool.recoverByClass('Txt');
                Laya.Pool.recoverByClass('Btn');
            }
        }
    }, {
        key: 'analysisClick',
        value: function analysisClick(questionData) {
            var analysisPage = Laya.Pool.getItemByClass('anBox', Laya.Sprite);
            analysisPage.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, '#000');
            analysisPage.alpha = 0.2;
            analysisPage.zOrder = 26;

            var analysisBox = Laya.Pool.getItemByClass('anBox', Laya.Sprite);
            analysisBox.loadImage('./res/analysis-box-p.png');
            analysisBox.size(1297 * this.scale, 744 * this.scale);
            analysisBox.zOrder = 27;
            var left = (Laya.stage.width - analysisBox.width) / 2;
            var top = (Laya.stage.height - analysisBox.height) / 2;
            analysisBox.pos(left, top);

            var analysisClose = Laya.Pool.getItemByClass('anBox', Laya.Sprite);
            analysisClose.loadImage('info/analysis-close.png');
            analysisClose.size(100 * this.scale, 100 * this.scale);
            analysisClose.pos(analysisBox.width - 50 * this.scale, -50 * this.scale);
            analysisBox.addChild(analysisClose);
            analysisClose.on(Laya.Event.CLICK, this, this.closeAnalysis, [analysisPage, analysisBox]);

            var analysisTxt = Laya.Pool.getItemByClass('anTxt', Laya.Text);
            analysisTxt.text = questionData.analysis;
            analysisTxt.size(810 * this.scale, 560 * this.scale);
            analysisTxt.leading = 15;
            analysisTxt.wordWrap = true;
            analysisTxt.overflow = Laya.Text.SCROLL;;
            analysisTxt.fontSize = this.adaptation(44 * this.scale, 44 * this.scale);
            if (questionData.analysis.length < 80) {
                analysisTxt.pos(380 * this.scale, 250 * this.scale);
            } else {
                analysisTxt.pos(380 * this.scale, 90 * this.scale);
            }
            analysisTxt.on(Laya.Event.MOUSE_DOWN, this, _utils.scrollText, [analysisTxt]);
            analysisBox.addChild(analysisTxt);
            Laya.stage.addChild(analysisPage);
            Laya.stage.addChild(analysisBox);
        }
    }, {
        key: 'closeAnalysis',
        value: function closeAnalysis(analysisPage, analysisBox) {
            Laya.stage.removeChild(analysisPage);
            Laya.stage.removeChild(analysisBox);
            Laya.Pool.recoverByClass('anBox');
            Laya.Pool.recoverByClass('anTxt');
        }
    }, {
        key: 'answerClick',
        value: function answerClick(questionData, answer, answerIndex, texiao) {
            var optionBox = this.questionBox.getChildByName('allOption').getChildByName('optionBox' + answerIndex);
            if (answer === questionData.rightAnswer) {
                optionBox.getChildByName('prompt').visible = true;
                this.questionBox.getChildByName('allOption').getChildByName('analysis').visible = true;
                Laya.stage.addChild(this.scene);
                Laya.SoundManager.playMusic("./res/audio/right.mp3", 1);
                this.scene.addChild(texiao);
                Laya.timer.once(1000, this, function () {
                    this.scene.removeChild(texiao);
                    Laya.stage.removeChild(this.scene);
                });
            } else {
                Laya.SoundManager.playMusic("./res/audio/wrong.mp3", 1);
                optionBox.getChildByName('prompt').visible = true;
            }
        }
    }, {
        key: 'lastQuestion',
        value: function lastQuestion() {
            if (this.questionIndex > 0) {
                this.recoverQuestion(false);
                this.questionIndex--;
                this.createQuestion(this.questionData[this.questionIndex]);
            } else {
                console.log('已经是第一题了！');
            }
        }
    }, {
        key: 'nextQuestion',
        value: function nextQuestion() {
            if (this.questionIndex < this.questionData.length - 1) {
                this.recoverQuestion(false);
                this.questionIndex++;
                this.createQuestion(this.questionData[this.questionIndex]);
            } else {
                console.log('已经是最后一题了！');
            }
        }
    }, {
        key: 'back',
        value: function back() {
            this.recoverQuestion(true);
            Laya.stage.removeChild(this.questionBox);
            Laya.stage.getChildByName('lastQuestion').destroy();
            Laya.stage.getChildByName('nextQuestion').destroy();
        }
    }]);

    return QuestionPhone;
}();

exports.default = QuestionPhone;

},{"./script/utils":8}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require('./utils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BigMoveScript = function (_Laya$Script3D) {
	_inherits(BigMoveScript, _Laya$Script3D);

	// ES6类的继承，继承父类的属性和方法。继承实质：先创建父类的实例对象this，然后再用子类的构造函数修改this;
	function BigMoveScript() {
		_classCallCheck(this, BigMoveScript);

		// 表示父类的构造函数，调用父类的constructor,用来新建父类的this对象；子类必须在constructor方法中调用super()方法，因为子类没有自己的this对象，而是继承父类的this对象，然后对其进行加工；如果不调用super，子类就得不到this对象；
		var _this = _possibleConstructorReturn(this, (BigMoveScript.__proto__ || Object.getPrototypeOf(BigMoveScript)).call(this));
		// super作为对象使用的话可以用来调用父类中原型上的方法（不能调用实例的方法属性-constructor中的），作为函数使用代表父类的构造函数


		_this.scene = null;
		_this.lastPosition = new Laya.Vector2(0, 0);
		_this.distance = 0.0;
		_this.disFirstTouch = new Laya.Vector2(0, 0);
		_this.disLastTouch = new Laya.Vector2(0, 0);
		_this.isTwoTouch = false;
		_this.first = true;
		_this.twoFirst = true;
		_this.rotate = new Laya.Vector3(0, 0, 0);
		_this.translate = new Laya.Vector3(0, 0, 0);
		_this.sprite3DSacle = new Laya.Vector3(0, 0, 0);

		_this.modelRotate = true; //模型默认自转，当用户点击到屏幕时取消自转
		_this.introData = JSON.parse(localStorage.getItem('currBookInfo'));
		_this.sensitivity = (0, _utils.setSensitivity)(_this.introData); // 灵敏度
		_this.clicked = 1;
		_this.clickedTime = {
			'timeA': '',
			'timeB': ''
		};
		return _this;
	}

	/**
  * 第一次执行update之前执行，只会执行一次
  */


	_createClass(BigMoveScript, [{
		key: 'onStart',
		value: function onStart() {
			if ((0, _utils.isLsFile)(this.introData.subname)) {
				this.scene = this.owner.parent;
			} else {
				this.scene = this.owner.parent.parent;
			}
			this.firstRotate = new Laya.Quaternion(this.owner.transform.rotation.x, this.owner.transform.rotation.y, this.owner.transform.rotation.z, this.owner.transform.rotation.w);
			this.firstPosition = new Laya.Vector3(this.owner.transform.position.x, this.owner.transform.position.y, this.owner.transform.position.z);
			// Laya.stage.on(Laya.Event.MOUSE_OUT,this,this.onMouseOut);
			Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onMouseUp);
		}
	}, {
		key: 'onAwake',
		value: function onAwake() {}

		/**
   * 每帧更新时执行
   */

	}, {
		key: 'onUpdate',
		value: function onUpdate() {
			var mod = this.owner;
			if (this.modelRotate && !(0, _utils.isNoBackImg)(this.introData.subname)) {
				mod.transform.rotate(new Laya.Vector3(0, 0.5, 0), false, false);
			}
			var touchCount = this.scene.input.touchCount(); // 获取触摸点个数
			if (1 === touchCount) {
				//判断是否为两指触控，撤去一根手指后引发的touchCount===1
				if (this.isTwoTouch) {
					return;
				}
				//获取当前的触控点，数量为1
				var touch = this.scene.input.getTouch(0); // 获取触摸点，参数代表索引
				//是否为新一次触碰，并未发生移动
				if (this.first) {
					//获取触碰点的位置
					this.lastPosition.x = touch._position.x;
					this.lastPosition.y = touch._position.y;
					this.first = false;
				} else {
					//移动触碰点
					var deltaY = void 0;
					if ((0, _utils.isXDirecWrong)(this.introData.subname)) {
						deltaY = -(this.lastPosition.y - touch._position.y);
					} else {
						deltaY = this.lastPosition.y - touch._position.y;
					}

					var deltaX = touch._position.x - this.lastPosition.x;
					this.lastPosition.x = touch._position.x;
					this.lastPosition.y = touch._position.y;
					//根据移动的距离进行旋转
					if (this.introData.mainname === 'CHE') {
						this.rotate.setValue(0, 1 * deltaX / 2, 0);
					} else {
						this.rotate.setValue(1 * deltaY / 2, 1 * deltaX / 2, 0);
					}

					mod.transform.rotate(this.rotate, false, false);
				}
			} else if (2 === touchCount) {
				this.isTwoTouch = true;
				//获取两个触碰点
				var _touch = this.scene.input.getTouch(0);
				var touch2 = this.scene.input.getTouch(1);
				//是否为新一次触碰，并未发生移动
				if (this.twoFirst) {
					//获取触碰点的位置
					this.disFirstTouch.x = _touch.position.x - touch2.position.x;
					this.disFirstTouch.y = _touch.position.y - touch2.position.y;
					this.distance = Laya.Vector2.scalarLength(this.disFirstTouch); // 计算标量长度
					// console.log('First Distance',this.distance);
					this.sprite3DSacle = mod.transform.scale;

					this.touchAFirstX = _touch.position.x;
					this.touchAFirstY = _touch.position.y;
					this.touchBFirstX = touch2.position.x;
					this.touchBFirstY = touch2.position.y;

					this.twoFirst = false;
				} else {
					// 缩放
					this.disLastTouch.x = _touch.position.x - touch2.position.x;
					this.disLastTouch.y = _touch.position.y - touch2.position.y;
					var distance2 = Laya.Vector2.scalarLength(this.disLastTouch);
					//根据移动的距离进行缩放
					var factor = 0.001 * (distance2 - this.distance);
					this.sprite3DSacle.x += factor;
					this.sprite3DSacle.y += factor;
					this.sprite3DSacle.z += factor;
					(0, _utils.ctrolScale)(this.introData, this.sprite3DSacle.x, this.sprite3DSacle.y, this.sprite3DSacle.z);
					mod.transform.scale = this.sprite3DSacle;
					this.distance = distance2;
					// let factor = distance2/this.distance;
					// console.log('Last Distance',distance2);
					// let vc = new Laya.Vector3(factor,factor,factor);
					// mod.transform.scale = vc;


					// 移动
					this.touchALastX = _touch.position.x;
					this.touchALastY = _touch.position.y;
					this.touchBLastX = touch2.position.x;
					this.touchBLastY = touch2.position.y;

					var centerFirst = new Laya.Point((this.touchAFirstX + this.touchBFirstX) / 2, (this.touchAFirstY + this.touchBFirstY) / 2);
					var centerLast = new Laya.Point((this.touchALastX + this.touchBLastX) / 2, (this.touchALastY + this.touchBLastY) / 2);

					var moveX = void 0,
					    moveY = void 0;
					if ((0, _utils.isXDirecWrong)(this.introData.subname)) {
						moveX = -(centerFirst.x - centerLast.x) / this.sensitivity;
					} else {
						moveX = (centerFirst.x - centerLast.x) / this.sensitivity;
					}
					moveY = (centerFirst.y - centerLast.y) / this.sensitivity;
					mod.transform.translate(new Laya.Vector3(moveX, moveY, 0), false);

					this.touchAFirstX = _touch.position.x;
					this.touchAFirstY = _touch.position.y;
					this.touchBFirstX = touch2.position.x;
					this.touchBFirstY = touch2.position.y;
				}
			} else if (0 === touchCount) {
				this.first = true;
				this.twoFirst = true;
				this.lastPosition.x = 0;
				this.lastPosition.y = 0;
				this.isTwoTouch = false;
			}
		}

		/**
   * 鼠标弹起时执行
   */

	}, {
		key: 'onMouseUp',
		value: function onMouseUp() {
			if (this.clicked == 1) {
				this.clicked++;
				// 单击事件
				this.modelRotate = false;
			} else if (this.clicked == 2) {
				this.clickedTime.timeA = new Date();
				this.clicked++;
			} else if (this.clicked == 3) {
				this.clickedTime.timeB = new Date();
				var gap = Math.abs(this.clickedTime.timeA - this.clickedTime.timeB);
				if (gap < 400 && gap > 100) {
					this.clicked = 1;

					// 双击事件
					this.owner.transform.rotation = this.firstRotate;
					this.owner.transform.position = this.firstPosition;
					this.modelRotate = true;
				} else {
					this.clickedTime.timeA = new Date();
				}
			}
		}
	}, {
		key: 'offMove',
		value: function offMove() {}
	}, {
		key: 'onMouseMove',
		value: function onMouseMove(e) {}

		/**
   * 鼠标拖拽时执行
   */

	}, {
		key: 'onMouseDrag',
		value: function onMouseDrag() {}
		/**
   * 鼠标点击时执行
   */

	}, {
		key: 'onMouseClick',
		value: function onMouseClick() {
			console.log('click');
		}

		/**
   * 鼠标进入时执行
   */

	}, {
		key: 'onMouseEnter',
		value: function onMouseEnter() {
			console.log('enter');
		}
		/**
   * 鼠标经过时执行
   */

	}, {
		key: 'onMouseOver',
		value: function onMouseOver() {
			console.log('over');
		}
		/**
      * 创建后只执行,只会执行一次，此时所有节点和组件以及创建完毕
      */

	}, {
		key: 'onAwake',
		value: function onAwake() {
			console.log('awake');
		}
		/**
   * 脚本每次启动后执行，例如被添加到一个激活的对象上或者设置脚本的enabled = true
   */

	}, {
		key: 'onEnable',
		value: function onEnable() {
			console.log('onEnable');
		}
	}, {
		key: 'onDisable',
		value: function onDisable() {
			console.log('onDisable');
		}
		/**
   * 开始触发时执行
   */

	}, {
		key: 'onTriggerEnter',
		value: function onTriggerEnter(other) {}
		/**
   * 持续触发时执行
   */

	}, {
		key: 'onTriggerStay',
		value: function onTriggerStay(other) {}
		/**
   * 结束触发时执行
   */

	}, {
		key: 'onTriggerExit',
		value: function onTriggerExit(other) {}
		/**
   * 开始碰撞时执行
   */

	}, {
		key: 'onCollisionEnter',
		value: function onCollisionEnter(collision) {}
		/**
   * 持续碰撞时执行
   */

	}, {
		key: 'onCollisionStay',
		value: function onCollisionStay(collision) {}
		/**
   * 结束碰撞时执行
   */

	}, {
		key: 'onCollisionExit',
		value: function onCollisionExit(collision) {}
		/**
   * 键盘按下时执行
   */

	}, {
		key: 'onKeyDown',
		value: function onKeyDown(e) {}
		/**
   * 键盘产生一个字符时执行
   */

	}, {
		key: 'onKeyPress',
		value: function onKeyPress(e) {}
		/**
   * 键盘抬起时执行
   */

	}, {
		key: 'onKeyUp',
		value: function onKeyUp(e) {}
		/**
   * 每帧更新时执行，在update之后执行
   */

	}, {
		key: 'onLateUpdate',
		value: function onLateUpdate() {}
		/**
   * 渲染之前执行
   */

	}, {
		key: 'onPreRender',
		value: function onPreRender() {}
		/**
   * 渲染之后执行
   */

	}, {
		key: 'onPostRender',
		value: function onPostRender() {}
		/**
   * 禁用时执行
   */

	}, {
		key: 'onDisable',
		value: function onDisable() {}
		/**
   * 手动调用销毁时执行
   */

	}, {
		key: 'onDestroy',
		value: function onDestroy() {}
	}]);

	return BigMoveScript;
}(Laya.Script3D);

exports.default = BigMoveScript;

},{"./utils":8}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require('./utils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PhoneMoveScript = function (_Laya$Script3D) {
	_inherits(PhoneMoveScript, _Laya$Script3D);

	function PhoneMoveScript() {
		_classCallCheck(this, PhoneMoveScript);

		// 表示父类的构造函数，调用父类的constructor,用来新建父类的this对象；子类必须在constructor方法中调用super()方法，因为子类没有自己的this对象，而是继承父类的this对象，然后对其进行加工；如果不调用super，子类就得不到this对象；
		var _this = _possibleConstructorReturn(this, (PhoneMoveScript.__proto__ || Object.getPrototypeOf(PhoneMoveScript)).call(this));
		// super作为对象使用的话可以用来调用父类中原型上的方法（不能调用实例的方法属性-constructor中的），作为函数使用代表父类的构造函数


		_this.scene = null;
		_this.touchFirst = new Laya.Vector2(0, 0);
		_this.distance = 0.0;
		_this.disFirstTouch = new Laya.Vector2(0, 0);
		_this.disLastTouch = new Laya.Vector2(0, 0);
		_this.isTwoTouch = false;
		_this.first = true;
		_this.twoFirst = true;
		_this.rotate = new Laya.Vector3(0, 0, 0);
		_this.translate = new Laya.Vector3(0, 0, 0);
		_this.sprite3DSacle = new Laya.Vector3(0, 0, 0);
		_this.agent = (0, _utils.getUserAgent)();
		_this.introData = JSON.parse(localStorage.getItem('currBookInfo'));
		_this.sensitivity = (0, _utils.setSensitivity)(_this.introData); // 灵敏度
		return _this;
	}

	/**
  * 第一次执行update之前执行，只会执行一次
  */


	_createClass(PhoneMoveScript, [{
		key: 'onStart',
		value: function onStart() {
			if ((0, _utils.isLsFile)(this.introData.subname)) {
				this.scene = this.owner.parent;
			} else {
				this.scene = this.owner.parent.parent;
			}
		}
	}, {
		key: 'onAwake',
		value: function onAwake() {
			console.log('awake');
		}
	}, {
		key: 'onEnable',
		value: function onEnable() {
			console.log('onEnable');
			Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onMouseUp);
		}
	}, {
		key: 'onDisable',
		value: function onDisable() {
			console.log('onDisable');
		}

		/**
   * 每帧更新时执行
   */

	}, {
		key: 'onUpdate',
		value: function onUpdate() {
			var mod = this.owner;
			var touchCount = this.scene.input.touchCount(); // 获取触摸点个数
			if (1 === touchCount) {
				// 移动
				if (this.isTwoTouch) {
					return;
				}
				//获取当前的触控点，数量为1
				var touch = this.scene.input.getTouch(0);
				if (this.first) {
					this.touchFirst.x = touch._position.x;
					this.touchFirst.y = touch._position.y;
					this.first = false;
				} else {
					// 移动
					var moveX = void 0,
					    moveY = void 0;
					if ((0, _utils.isXDirecWrong)(this.introData.subname)) {
						moveX = -(this.touchFirst.x - touch._position.x) / this.sensitivity;
					} else {
						moveX = (this.touchFirst.x - touch._position.x) / this.sensitivity;
					}
					moveY = (this.touchFirst.y - touch._position.y) / this.sensitivity;
					mod.transform.translate(new Laya.Vector3(moveX, moveY, 0), false);
					this.touchFirst.x = touch._position.x;
					this.touchFirst.y = touch._position.y;
				}
			} else if (2 === touchCount) {
				// 缩放
				this.isTwoTouch = true;
				//获取两个触碰点
				var _touch = this.scene.input.getTouch(0);
				var touch2 = this.scene.input.getTouch(1);
				//是否为新一次触碰，并未发生移动
				if (this.twoFirst) {
					//获取触碰点的位置
					this.disFirstTouch.x = _touch.position.x - touch2.position.x;
					this.disFirstTouch.y = _touch.position.y - touch2.position.y;
					this.distance = Laya.Vector2.scalarLength(this.disFirstTouch); // 计算标量长度
					// console.log('First Distance',this.distance);
					this.sprite3DSacle = mod.transform.scale;
					this.twoFirst = false;
				} else {
					// 缩放
					this.disLastTouch.x = _touch.position.x - touch2.position.x;
					this.disLastTouch.y = _touch.position.y - touch2.position.y;
					var distance2 = Laya.Vector2.scalarLength(this.disLastTouch);
					//根据移动的距离进行缩放
					var factor = 0.001 * (distance2 - this.distance);
					this.sprite3DSacle.x += factor;
					this.sprite3DSacle.y += factor;
					this.sprite3DSacle.z += factor;
					(0, _utils.ctrolScale)(this.introData, this.sprite3DSacle.x, this.sprite3DSacle.y, this.sprite3DSacle.z);
					mod.transform.scale = this.sprite3DSacle;
					this.distance = distance2;
				}
			} else if (0 === touchCount) {
				this.first = true;
				this.twoFirst = true;
				this.isTwoTouch = false;
			}
		}
	}]);

	return PhoneMoveScript;
}(Laya.Script3D);

exports.default = PhoneMoveScript;

},{"./utils":8}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
// 由于外包给的模型文件大小不一，初始角度也可能有问题，旋转轴也可能不规范
// 这里用来统一管理需要适配在某个角度某个大小或旋转轴不对或者移动灵敏度太大或太小的模型
var _modelSort = {
	lsFile: ['yinhexi', 'chongdong', 'taiyang', 'taiyangxi'], // ls文件
	noBackImg: ['yinhexi', 'chongdong', 'taiyang'], //不要背景图的模型
	notScaleModel: ['yinhexi', 'chongdong', 'yueqiu'], //缩放相关
	scale005: ['taiyangxi'], //放大0.005倍的模型
	scale04: ['haiwangxing'],
	scale08: ['gongjiaoche'],
	scale1: ['tuxingwuhao', 'camaro', 'junyongkache', 'laojiefangkache', 'youguanche'],
	scale2: ['yongqihao', 'sanlunqiche', 'silunche', 'tiangong1', 'shenzhou5'],
	scale3: ['baomai8', 'xiaoche'], // 应该放大3倍的模型
	rotate180: ['dalishen', 'aliyadang'],
	rotate90: ['ELAN', 'camaro', 'hanmah3'], // 初始旋转角度和其他模型不同
	xDirectionWrong: ['yutu', 'amusitelang', 'CloudSat', 'ELAN'], //移动时x轴方向和其他模型相反
	mobileRotateWrongX: ['laoyepaoche', 'hanmah3', 'muxing', 'huoxing', 'mingwangxing', 'haiwei1', 'haiwangxing', 'tianwei3', 'dazongjieda', 'camaro', 'abolo', 'yueqiu', 'hongwaixuntian', 'SUV', 'tongxunweixing', 'diqiu', 'shuixing', 'dongfang1hao', 'dalishen', 'db9', 'dongfanghong1', 'fengyun', 'changzheng2F', 'yutu', 'change3', 'aliyadang', 'tuxingwuhao', 'jiakechong', 'laosilaisihuanying', 'tesila', 'sibinte', 'yiweikekailunbinwei', 'jingche', 'lanbojini', 'zongcai', 'taiyangxi'],
	mobileRotateWrongY: ['ELAN'],
	Sensitivity10: [// 控制移动灵敏度
	'taiyangxi', 'haiwangxing', 'lvxingzhe2', 'lvxingzhe1', 'tuxingwuhao', 'jialilue', 'hgs', 'yongqihao', 'dipinghao', 'jinxingkuaiche', 'xinshihao', 'beidouweixing3', 'dongfang1hao', 'dongfanghong1', 'tongxunweixing', 'CloudSat', 'habo', 'faxianhao', 'kaipule', 'changzheng2F', 'aliyadang', 'change3', 'hongwaixuntian', 'dalishen', 'yueqiu3', 'shenzhou5', 'zhizihao', 'yueqiu'],
	Sensitivity20: ['putenike1', 'pake', 'fengyun', 'yinhexi', 'chongdong'],
	Sensitivity100: ['yutu', 'amusitelang'],
	Sensitivity200: ['dongchahao', 'bmx1', 'xiaoche', 'ENZO', 'taiyang', 'yutu']

	// 控制移动灵敏度的值
};function setSensitivity(introData) {
	var modelName = introData.subname.split('.')[0];
	console.log(modelName);
	if (_modelSort.Sensitivity10.indexOf(modelName) !== -1) {
		return 10;
	} else if (_modelSort.Sensitivity20.indexOf(modelName) !== -1) {
		return 20;
	} else if (_modelSort.Sensitivity100.indexOf(modelName) !== -1) {
		return 100;
	} else if (_modelSort.Sensitivity200.indexOf(modelName) !== -1) {
		return 200;
	}

	if (introData.mainname === 'CHE') {
		return 100;
	} else {
		return 1;
	}
}

// 控制缩放的最大范围，最小范围
function ctrolScale(introData, scaleX, scaleY, scaleZ) {
	var minValue = 0,
	    maxValue = 0;
	if (_modelSort.scale3.indexOf(introData.subname) !== -1) {
		minValue = 1.5;maxValue = 5;
		scaleX = scaleX < minValue ? minValue : scaleX > maxValue ? maxValue : scaleX;
		scaleY = scaleY < minValue ? minValue : scaleY > maxValue ? maxValue : scaleY;
		scaleZ = scaleZ < minValue ? minValue : scaleZ > maxValue ? maxValue : scaleZ;
	} else if (_modelSort.scale005.indexOf(introData.subname) !== -1) {
		minValue = 0.005;maxValue = 0.15;
		scaleX = scaleX < minValue ? minValue : scaleX > maxValue ? maxValue : scaleX;
		scaleY = scaleY < minValue ? minValue : scaleY > maxValue ? maxValue : scaleY;
		scaleZ = scaleZ < minValue ? minValue : scaleZ > maxValue ? maxValue : scaleZ;
	} else {
		minValue = 0.75;maxValue = 2.5;
		scaleX = scaleX < minValue ? minValue : scaleX > maxValue ? maxValue : scaleX;
		scaleY = scaleY < minValue ? minValue : scaleY > maxValue ? maxValue : scaleY;
		scaleZ = scaleZ < minValue ? minValue : scaleZ > maxValue ? maxValue : scaleZ;
	}
}

// 重置模型的旋转角度及大小
function resetModel(introData, mod) {
	if (_modelSort.notScaleModel.indexOf(introData.subname) === -1) {
		if (_modelSort.scale005.indexOf(introData.subname) !== -1) {
			mod.transform.scale = new Laya.Vector3(0.05, 0.05, 0.05);
		} else if (_modelSort.scale04.indexOf(introData.subname) !== -1) {
			mod.transform.scale = new Laya.Vector3(0.4, 0.4, 0.4);
		} else if (_modelSort.scale08.indexOf(introData.subname) !== -1) {
			mod.transform.scale = new Laya.Vector3(0.8, 0.8, 0.8);
		} else if (_modelSort.scale1.indexOf(introData.subname) !== -1) {
			mod.transform.scale = new Laya.Vector3(1, 1, 1);
		} else if (_modelSort.scale2.indexOf(introData.subname) !== -1) {
			mod.transform.scale = new Laya.Vector3(2, 2, 2);
		} else if (_modelSort.scale3.indexOf(introData.subname) !== -1) {
			mod.transform.scale = new Laya.Vector3(3, 3, 3);
		} else {
			mod.transform.scale = new Laya.Vector3(1.5, 1.5, 1.5);
		}
	}
	if (introData.mainname === 'CHE') {
		if (_modelSort.rotate90.indexOf(introData.subname) !== -1) {
			mod.transform.rotate(new Laya.Vector3(0, -90, 0), false, false);
		} else {
			mod.transform.rotate(new Laya.Vector3(0, 90, 0), false, false);
		}
	}
	if (_modelSort.rotate180.indexOf(introData.subname) !== -1) {
		mod.transform.rotate(new Laya.Vector3(0, 180, 0), false, false);
	}
}

function isLsFile(subname) {
	return _modelSort.lsFile.indexOf(subname) !== -1;
}

function isXDirecWrong(subname) {
	return _modelSort.xDirectionWrong.indexOf(subname) !== -1;
}

function isNoBackImg(subname) {
	return _modelSort.noBackImg.indexOf(subname) !== -1;
}

function isMobileRotateWrongX(subname) {
	return _modelSort.mobileRotateWrongX.indexOf(subname) !== -1;
}

function isMobileRotateWrongY(subname) {
	return _modelSort.mobileRotateWrongY.indexOf(subname) !== -1;
}

function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return r[2]; //注意这里不能用js里面的unescape方法
	return null;
}

function createScrollBar(parent, text, position) {
	if (text.maxScrollY !== 0) {
		var txtHeight = text.height;
		var scrollBox = new Laya.Sprite();
		scrollBox.height = txtHeight;
		scrollBox.pos(position.left, position.top);
		var scrollSlider = new Laya.Sprite();
		var scale = txtHeight / (text.maxScrollY + txtHeight);
		var scrollSliderH = scrollBox.height * scale;
		scrollSlider.graphics.drawRect(0, 0, 12 * scale, scrollSliderH, '#ccc');
		scrollSlider.height = scrollSliderH;
		scrollSlider.y = text.scrollY;
		scrollBox.addChild(scrollSlider);
		parent.addChild(scrollBox);
		return scrollSlider;
	}
}

// 滚动文本
function scrollText(text, scrollSlider) {
	var prevX = text.mouseX;
	var prevY = text.mouseY;
	// 鼠标滚动文本
	var scrollText = function scrollText() {
		var nowX = text.mouseX;
		var nowY = text.mouseY;
		text.scrollX += prevX - nowX;
		text.scrollY += prevY - nowY;
		if (scrollSlider && text.maxScrollY !== 0) {
			var scale = (text.height - scrollSlider.height) / text.maxScrollY; //txt_detail.height等于scrollBox.height，这里用txt_detail.height替代scrollBox.height
			scrollSlider.y = text.scrollY * scale;
		}
		prevX = nowX;
		prevY = nowY;
	};

	// 停止滚动文本
	var finishScrollText = function finishScrollText() {
		Laya.stage.off(Laya.Event.MOUSE_MOVE, this, scrollText);
		Laya.stage.off(Laya.Event.MOUSE_UP, this, finishScrollText);
	};
	Laya.stage.on(Laya.Event.MOUSE_MOVE, this, scrollText, [text]);
	Laya.stage.on(Laya.Event.MOUSE_UP, this, finishScrollText);
}

/* 获取客户端类型*/
function getUserAgent() {
	if (parseInt(GetQueryString('type')) === 0) return 'alva small';

	if (GetQueryString("client") === 'ios') return 'ios';

	if (typeof AndroidTool != "undefined") return 'android';

	if (window.navigator.userAgent.indexOf("Chrome") !== -1) return 'chrome';

	return 'alva big';
};

exports.GetQueryString = GetQueryString;
exports.createScrollBar = createScrollBar;
exports.scrollText = scrollText;
exports.getUserAgent = getUserAgent;
exports.resetModel = resetModel;
exports.setSensitivity = setSensitivity;
exports.ctrolScale = ctrolScale;
exports.isLsFile = isLsFile;
exports.isXDirecWrong = isXDirecWrong;
exports.isNoBackImg = isNoBackImg;
exports.isMobileRotateWrongX = isMobileRotateWrongX;
exports.isMobileRotateWrongY = isMobileRotateWrongY;

},{}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6L1Byb2dyYW0gRmlsZXMvTGF5YUFpcklERTIuMS4xL3Jlc291cmNlcy9hcHAvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsInNyYy9JbnRyby5qcyIsInNyYy9Kb3lTdGljay5qcyIsInNyYy9NYWluLmpzIiwic3JjL1F1ZXN0aW9uLmpzIiwic3JjL1F1ZXN0aW9uUGhvbmUuanMiLCJzcmMvc2NyaXB0L0JpZ01vdmVTY3JpcHQuanMiLCJzcmMvc2NyaXB0L1Bob25lTW92ZVNjcmlwdC5qcyIsInNyYy9zY3JpcHQvdXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDVkE7Ozs7SUFDcUIsUztBQUNqQixvQkFBWSxLQUFaLEVBQWtCLEtBQWxCLEVBQXdCLFNBQXhCLEVBQWtDO0FBQUE7O0FBQzlCLE9BQUssS0FBTCxHQUFhLEtBQWI7QUFDQSxPQUFLLEtBQUwsR0FBYSxLQUFiO0FBQ0EsT0FBSyxTQUFMLEdBQWlCLFNBQWpCO0FBQ04sT0FBSyxLQUFMLEdBQWEsS0FBSyxPQUFMLENBQWEsS0FBYixHQUFxQixJQUFsQzs7QUFFTSxPQUFLLFNBQUwsR0FBaUIsSUFBSSxLQUFLLE1BQVQsRUFBakI7QUFDTixPQUFLLFNBQUwsQ0FBZSxTQUFmLENBQXlCLEtBQUssU0FBTCxDQUFlLFdBQXhDO0FBQ0EsVUFBUSxLQUFSO0FBQ0MsUUFBSyxTQUFMO0FBQ0EsUUFBSyxLQUFMO0FBQ0MsU0FBSyxTQUFMLENBQWUsS0FBZixHQUF1QixPQUFPLEtBQUssS0FBbkM7QUFDQSxTQUFLLFNBQUwsQ0FBZSxNQUFmLEdBQXdCLE1BQU0sS0FBSyxLQUFuQztBQUNBO0FBQ0Q7QUFDQyxTQUFLLFNBQUwsQ0FBZSxLQUFmLEdBQXVCLE9BQU8sS0FBSyxLQUFuQztBQUNBLFNBQUssU0FBTCxDQUFlLE1BQWYsR0FBd0IsTUFBTSxLQUFL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TUFBSyxLQUFMLENBQVcsRUFBWCxDQUFjLEtBQUssS0FBTCxDQUFXLFVBQXpCLEVBQW9DLElBQXBDLEVBQXlDLFVBQXpDLEVBQW9ELENBQUMsSUFBRCxDQUFwRDtBQUNBLE1BQUssS0FBTCxDQUFXLEVBQVgsQ0FBYyxLQUFLLEtBQUwsQ0FBVyxRQUF6QixFQUFrQyxJQUFsQyxFQUF1QyxnQkFBdkM7QUFDQTs7QUFFRDtBQUNBLFNBQVMsWUFBVCxHQUF5QjtBQUN4QixLQUFJLFNBQVMsZUFBZSxNQUFmLENBQVQsTUFBcUMsQ0FBekMsRUFBNEMsT0FBTyxZQUFQOztBQUU1QyxLQUFJLGVBQWUsUUFBZixNQUE2QixLQUFqQyxFQUF3QyxPQUFPLEtBQVA7O0FBRXhDLEtBQUssT0FBUSxXQUFSLElBQXlCLFdBQTlCLEVBQTRDLE9BQU8sU0FBUDs7QUFFNUMsS0FBSSxPQUFPLFNBQVAsQ0FBaUIsU0FBakIsQ0FBMkIsT0FBM0IsQ0FBbUMsUUFBbkMsTUFBaUQsQ0FBQyxDQUF0RCxFQUF5RCxPQUFPLFFBQVA7O0FBRXpELFFBQU8sVUFBUDtBQUNBOztRQUdBLGMsR0FBQSxjO1FBQ0EsZSxHQUFBLGU7UUFDQSxVLEdBQUEsVTtRQUNBLFksR0FBQSxZO1FBQ0EsVSxHQUFBLFU7UUFDQSxjLEdBQUEsYztRQUNBLFUsR0FBQSxVO1FBQ0EsUSxHQUFBLFE7UUFDQSxhLEdBQUEsYTtRQUNBLFcsR0FBQSxXO1FBQ0Esb0IsR0FBQSxvQjtRQUNBLG9CLEdBQUEsb0IiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbInZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG4oZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IHtjcmVhdGVTY3JvbGxCYXIsc2Nyb2xsVGV4dCxnZXRVc2VyQWdlbnR9IGZyb20gJy4vc2NyaXB0L3V0aWxzJztcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW50cm9QYWdle1xyXG4gICAgY29uc3RydWN0b3Ioc2NlbmUsYWdlbnQsaW50cm9EYXRhKXtcclxuICAgICAgICB0aGlzLnNjZW5lID0gc2NlbmU7XHJcbiAgICAgICAgdGhpcy5hZ2VudCA9IGFnZW50O1xyXG4gICAgICAgIHRoaXMuaW50cm9EYXRhID0gaW50cm9EYXRhO1xyXG5cdFx0dGhpcy5zY2FsZSA9IExheWEuQnJvd3Nlci53aWR0aCAvIDE5MjA7XHJcblxyXG4gICAgICAgIHRoaXMuaW5mb0ltYWdlID0gbmV3IExheWEuU3ByaXRlKCk7XHJcblx0XHR0aGlzLmluZm9JbWFnZS5sb2FkSW1hZ2UodGhpcy5pbnRyb0RhdGEuc3pfYmdfbW9kZWwpO1xyXG5cdFx0c3dpdGNoIChhZ2VudCkge1xyXG5cdFx0XHRjYXNlICdhbmRyb2lkJzpcclxuXHRcdFx0Y2FzZSAnaW9zJzpcclxuXHRcdFx0XHR0aGlzLmluZm9JbWFnZS53aWR0aCA9IDEzMjMgKiB0aGlzLnNjYWxlO1xyXG5cdFx0XHRcdHRoaXMuaW5mb0ltYWdlLmhlaWdodCA9IDg2NiAqIHRoaXMuc2NhbGU7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0dGhpcy5pbmZvSW1hZ2Uud2lkdGggPSAxMTAwICogdGhpcy5zY2FsZTtcclxuXHRcdFx0XHR0aGlzLmluZm9JbWFnZS5oZWlnaHQgPSA3MDAgKiB0aGlzLnNjYWxlO1xyXG5cdFx0fVxyXG5cdFx0bGV0IGxlZnQgPSAoTGF5YS5zdGFnZS53aWR0aCAtIHRoaXMuaW5mb0ltYWdlLndpZHRoKSAvIDI7XHJcblx0XHRsZXQgdG9wID0gKExheWEuc3RhZ2UuaGVpZ2h0IC0gdGhpcy5pbmZvSW1hZ2UuaGVpZ2h0KSAvIDI7XHJcblx0XHR0aGlzLmluZm9JbWFnZS5wb3MobGVmdCx0b3ApO1xyXG5cdFx0TGF5YS5zdGFnZS5hZGRDaGlsZCh0aGlzLmluZm9JbWFnZSk7XHJcblx0XHRcclxuXHRcdHRoaXMuY3JlYXRlVGV4dCh0aGlzLmluZm9JbWFnZSk7XHJcblx0XHRcclxuXHRcdHRoaXMuY3JlYXRlQXVkaW8oKTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVUZXh0KHBhcmVudCkge1xyXG5cdFx0dmFyIGRhdGEgPSB0aGlzLmludHJvRGF0YTtcclxuXHRcdHZhciB0eHRfY2FwdGlvbiA9IG5ldyBMYXlhLlRleHQoKTtcclxuXHRcdHR4dF9jYXB0aW9uLnRleHQgPSBkYXRhLnN6X2NhcHRpb247XHJcblxyXG5cdFx0Ly/orr7nva7mlofmnKzmsLTlubPlsYXkuK1cclxuXHRcdHR4dF9jYXB0aW9uLnNpemUoMjgwICogdGhpcy5zY2FsZSwgOTAgKiB0aGlzLnNjYWxlKTtcclxuXHRcdHR4dF9jYXB0aW9uLmFsaWduID0gXCJjZW50ZXJcIjtcclxuXHRcdHR4dF9jYXB0aW9uLnZhbGlnbiA9ICdtaWRkbGUnO1xyXG5cdFx0cGFyZW50LmFkZENoaWxkKHR4dF9jYXB0aW9uKTtcclxuXHJcblx0XHR2YXIgdHh0X2RldGFpbHMgPSBuZXcgTGF5YS5UZXh0KCk7XHJcblx0XHR0eHRfZGV0YWlscy50ZXh0ID0gZGF0YS50eF9jb250ZW50O1xyXG5cclxuXHRcdC8v6K6+572u5a696auY5Lul5ZCO55qE6Ieq5Yqo6KOB5Ymq5Lya5oyJ54Wn6L+Z5Liq5Yy65Z+f6KOB5YmqXHJcblx0XHR0eHRfZGV0YWlscy5zaXplKDM3MCAqIHRoaXMuc2NhbGUsIDM4MCAqIHRoaXMuc2NhbGUpO1xyXG5cdFx0Ly8gaWYgKHRoaXMuYWdlbnQgPT09ICdhbHZhIGJpZycpIHtcclxuXHRcdFx0dHh0X2NhcHRpb24uZm9udCA9IFwi5pa55q2j57KX5Yev566A5L2TXCI7XHJcblx0XHRcdHR4dF9kZXRhaWxzLmZvbnQgPSBcIuaWueato+Wkp+agh+Wui+eugOS9k1wiO1xyXG5cdFx0Ly8gfVxyXG5cdFx0aWYgKHRoaXMuaW50cm9EYXRhLm1haW5uYW1lID09PSAnQ0hFJykge1xyXG5cdFx0XHR0eHRfZGV0YWlscy5jb2xvciA9IHR4dF9jYXB0aW9uLmNvbG9yID0gXCIjMDAwXCI7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0eHRfZGV0YWlscy5jb2xvciA9IHR4dF9jYXB0aW9uLmNvbG9yID0gXCIjZmZmXCI7XHJcblx0XHR9XHJcblx0XHRwYXJlbnQuYWRkQ2hpbGQodHh0X2RldGFpbHMpO1xyXG5cdFx0dHh0X2RldGFpbHMub3ZlcmZsb3cgPSBMYXlhLlRleHQuU0NST0xMOztcclxuXHRcdC8v6K6+572u6Ieq5Yqo5o2i6KGMXHJcblx0XHR0eHRfZGV0YWlscy53b3JkV3JhcCA9IHRydWU7XHJcblx0XHQvL+iuvue9ruaWh+acrOawtOW5s+WxheS4rVxyXG5cdFx0dHh0X2RldGFpbHMuYWxpZ24gPSBcImxlZnRcIjtcclxuXHJcblx0XHRzd2l0Y2ggKHRoaXMuYWdlbnQpIHtcclxuXHRcdFx0Y2FzZSAnYWx2YSBzbWFsbCc6XHJcblx0XHRcdFx0dHh0X2NhcHRpb24uZm9udFNpemUgPSA0MCAqIHRoaXMuc2NhbGU7XHJcblx0XHRcdFx0dHh0X2NhcHRpb24ubGVhZGluZyA9IDA7XHJcblxyXG5cdFx0XHRcdHR4dF9kZXRhaWxzLmZvbnRTaXplID0gMzAgKiB0aGlzLnNjYWxlO1xyXG5cdFx0XHRcdHR4dF9jYXB0aW9uLnBvcyg2NTAgKiB0aGlzLnNjYWxlLCA2MCAqIHRoaXMuc2NhbGUpO1xyXG5cdFx0XHRcdHR4dF9kZXRhaWxzLmxlYWRpbmcgPSA1O1xyXG5cdFx0XHRcdHR4dF9kZXRhaWxzLnBvcyg2MDAgKiB0aGlzLnNjYWxlLCAxNTAgKiB0aGlzLnNjYWxlKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAnYW5kcm9pZCc6XHJcblx0XHRcdGNhc2UgJ2lvcyc6XHJcblx0XHRcdFx0dHh0X2NhcHRpb24uZm9udFNpemUgPSA0MCAqIHRoaXMuc2NhbGU7XHJcblx0XHRcdFx0dHh0X2NhcHRpb24ubGVhZGluZyA9IDA7XHJcblxyXG5cdFx0XHRcdHR4dF9kZXRhaWxzLmZvbnRTaXplID0gMzUgKiB0aGlzLnNjYWxlO1xyXG5cclxuXHRcdFx0XHR0eHRfY2FwdGlvbi5wb3MoNzcwICogdGhpcy5zY2FsZSwgODAgKiB0aGlzLnNjYWxlKTtcclxuXHRcdFx0XHR0eHRfZGV0YWlscy5sZWFkaW5nID0gMTU7XHJcblx0XHRcdFx0dHh0X2RldGFpbHMuc2l6ZSg0MjAgKiB0aGlzLnNjYWxlLCA1NTAgKiB0aGlzLnNjYWxlKTtcclxuXHRcdFx0XHR0eHRfZGV0YWlscy5wb3MoNzMwICogdGhpcy5zY2FsZSwgMTcwICogdGhpcy5zY2FsZSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0dHh0X2NhcHRpb24uZm9udFNpemUgPSAzNSAqIHRoaXMuc2NhbGU7XHJcblx0XHRcdFx0dHh0X2NhcHRpb24ubGVhZGluZyA9IDE1ICogdGhpcy5zY2FsZTtcclxuXHRcdFx0XHR0eHRfY2FwdGlvbi5wb3MoNjUwICogdGhpcy5zY2FsZSwgNjAgKiB0aGlzLnNjYWxlKTtcclxuXHJcblx0XHRcdFx0dHh0X2RldGFpbHMuZm9udFNpemUgPSAyMCAqIHRoaXMuc2NhbGU7XHJcblx0XHRcdFx0dHh0X2RldGFpbHMubGVhZGluZyA9IDEwO1xyXG5cdFx0XHRcdHR4dF9kZXRhaWxzLnBvcyg2MTAgKiB0aGlzLnNjYWxlLCAxNTAgKiB0aGlzLnNjYWxlKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0bGV0IHBvc2l0aW9uID0ge1xyXG5cdFx0XHRsZWZ0OnRoaXMuaW5mb0ltYWdlLndpZHRoIC0gMTAwKnRoaXMuc2NhbGUsXHJcblx0XHRcdHRvcDp0eHRfZGV0YWlscy55XHJcbiAgICAgICAgfVxyXG5cdFx0dmFyIHNjcm9sbFNsaWRlciA9IGNyZWF0ZVNjcm9sbEJhcih0aGlzLmluZm9JbWFnZSx0eHRfZGV0YWlscyxwb3NpdGlvbik7XHJcbiAgICAgICAgdHh0X2RldGFpbHMub24oTGF5YS5FdmVudC5NT1VTRV9ET1dOLCB0aGlzLCBzY3JvbGxUZXh0LFt0eHRfZGV0YWlscyxzY3JvbGxTbGlkZXJdKTtcclxuXHR9XHJcblx0XHJcblx0Lyrku4vnu43pobXmlofmnKzlpITnkIbnu5PmnZ8qLyBcclxuXHJcblx0LyrliJvlu7rku4vnu43pobXpnaLnmoRhdWRpbyovXHJcblx0Y3JlYXRlQXVkaW8gKCkge1xyXG5cdFx0bGV0IGRhdGEgPSB0aGlzLmludHJvRGF0YTtcclxuXHRcdGxldCBhdWRpb1VybCA9ICdodHRwOi8vMTkyLjE2OC4xOTkuMjUxLycgKyB0aGlzLmludHJvRGF0YS5hdWRpb25hbWU7XHJcblx0XHRzd2l0Y2ggKHRoaXMuYWdlbnQpIHtcclxuXHRcdFx0Y2FzZSAnYWx2YSBiaWcnOlxyXG5cdFx0XHRcdHdpbmRvdy5RV2ViU2NhbGUgPSB0aGlzLnNjYWxlO1xyXG5cdFx0XHRcdGxldCBzZWxmID0gdGhpcztcclxuXHRcdFx0XHRuZXcgUVdlYkNoYW5uZWwocXQud2ViQ2hhbm5lbFRyYW5zcG9ydCwgZnVuY3Rpb24oY2hhbm5lbCkge1xyXG5cdFx0XHRcdFx0d2luZG93LmxpYlF0NUpTT2JqZWN0ID0gY2hhbm5lbC5vYmplY3RzLmxpYlF0NUpTT2JqZWN0O1xyXG5cdFx0XHRcdFx0d2luZG93LmxpYlF0NUpTT2JqZWN0LkNyZWF0ZUF1ZGlvV2lkZ2V0KHNlbGYuaW50cm9EYXRhLmF1ZGlvbmFtZSwgOTkwICogd2luZG93LlFXZWJTY2FsZSwgNzUwICogd2luZG93LlFXZWJTY2FsZSwgNDAwICogd2luZG93LlFXZWJTY2FsZSwgMTMwICogd2luZG93LlFXZWJTY2FsZSk7IFxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICdhbmRyb2lkJzpcclxuXHRcdFx0XHRpZihBbmRyb2lkVG9vbC5wbGF5QmFrTXVzaWMpe1xyXG5cdFx0XHRcdFx0bGV0IHggPSB0aGlzLmluZm9JbWFnZS54ICsgNjQ1ICogdGhpcy5zY2FsZTtcclxuXHRcdFx0XHRcdGxldCB5ID0gIHRoaXMuaW5mb0ltYWdlLnkgKyA0ODAgKiB0aGlzLnNjYWxlO1xyXG5cdFx0XHRcdFx0QW5kcm9pZFRvb2wuZ2V0V0goTGF5YS5Ccm93c2VyLndpZHRoLExheWEuQnJvd3Nlci5oZWlnaHQsIHgsIHkpO1xyXG5cdFx0XHRcdFx0QW5kcm9pZFRvb2wucGxheUJha011c2ljKGF1ZGlvVXJsKTtcclxuXHRcdFx0XHR9O1xyXG5cdFx0ICAgXHRcdGJyZWFrO1xyXG5cdFx0ICAgY2FzZSAnaW9zJzpcclxuXHRcdFx0XHRpZih3aW5kb3cud2Via2l0ICYmICB3aW5kb3cud2Via2l0Lm1lc3NhZ2VIYW5kbGVycyAmJiB3aW5kb3cud2Via2l0Lm1lc3NhZ2VIYW5kbGVycy5zaG93QXVkaW8pe1xyXG5cdFx0XHRcdFx0d2luZG93LndlYmtpdC5tZXNzYWdlSGFuZGxlcnMuc2hvd0F1ZGlvLnBvc3RNZXNzYWdlKGF1ZGlvVXJsKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvLyDplIDmr4Hku4vnu43pobXpnaLnmoRhdWRpb1xyXG5cdGRlc3Ryb3lBdWRpbyAoKSB7XHJcblx0XHRzd2l0Y2ggKHRoaXMuYWdlbnQpIHtcclxuXHRcdFx0Y2FzZSAnYWx2YSBiaWcnOlxyXG5cdFx0XHRcdG5ldyBRV2ViQ2hhbm5lbChxdC53ZWJDaGFubmVsVHJhbnNwb3J0LCBmdW5jdGlvbihjaGFubmVsKSB7XHJcblx0XHRcdFx0XHR3aW5kb3cubGliUXQ1SlNPYmplY3QgPSBjaGFubmVsLm9iamVjdHMubGliUXQ1SlNPYmplY3Q7XHJcblx0XHRcdFx0XHR3aW5kb3cubGliUXQ1SlNPYmplY3QuQ2xvc2VBdWRpb1dpZGdldCgpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICdpb3MnOlxyXG5cdFx0XHRcdGlmKHdpbmRvdy53ZWJraXQgJiYgIHdpbmRvdy53ZWJraXQubWVzc2FnZUhhbmRsZXJzICYmIHdpbmRvdy53ZWJraXQubWVzc2FnZUhhbmRsZXJzLnJlbW92ZUF1ZGlvKXtcclxuXHRcdFx0XHRcdHdpbmRvdy53ZWJraXQubWVzc2FnZUhhbmRsZXJzLnJlbW92ZUF1ZGlvLnBvc3RNZXNzYWdlKCcnKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Ly8gaWYod2luZG93LndlYmtpdCAmJiAgd2luZG93LndlYmtpdC5tZXNzYWdlSGFuZGxlcnMgJiYgd2luZG93LndlYmtpdC5tZXNzYWdlSGFuZGxlcnMuYmFjayl7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgd2luZG93LndlYmtpdC5tZXNzYWdlSGFuZGxlcnMuYmFjay5wb3N0TWVzc2FnZShcIlwiKTtcclxuICAgICAgICAgICAgICAgIC8vIH1cclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAnYW5kcm9pZCc6XHJcblx0XHRcdFx0aWYoIHR5cGVvZiggQW5kcm9pZFRvb2wgKSAhPSBcInVuZGVmaW5lZFwiICl7XHJcblx0XHRcdFx0XHRpZihBbmRyb2lkVG9vbC5wYXVzZUJha011c2ljKXtcclxuXHRcdFx0XHRcdFx0QW5kcm9pZFRvb2wucGF1c2VCYWtNdXNpYygpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgYmFjayAoKSB7XHJcbiAgICAgICAgdGhpcy5pbmZvSW1hZ2UuZ3JhcGhpY3MuY2xlYXIoKTtcclxuICAgICAgICBMYXlhLnN0YWdlLnJlbW92ZUNoaWxkKHRoaXMuaW5mb0ltYWdlKTtcdFx0XHJcbiAgICAgICAgdGhpcy5kZXN0cm95QXVkaW8oKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7aXNNb2JpbGVSb3RhdGVXcm9uZ1gsaXNNb2JpbGVSb3RhdGVXcm9uZ1l9IGZyb20gJy4vc2NyaXB0L3V0aWxzJztcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSm95U3RpY2t7XHJcbiAgICBjb25zdHJ1Y3Rvcihtb2Qpe1xyXG4gICAgICAgIHRoaXMubW9kZWwgPSBtb2Q7Ly8g5qih5Z6LXHJcbiAgICAgICAgdGhpcy5zY2FsZSA9IExheWEuQnJvd3Nlci53aWR0aCAvIDE5MjA7XHJcbiAgICAgICAgdGhpcy5pbnRyb0RhdGEgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyQm9va0luZm8nKSk7XHJcbiAgICAgICAgdGhpcy5yb2NrZXJCdG5PcmlnaW4gPSBuZXcgTGF5YS5Qb2ludCgxMDAgKiB0aGlzLnNjYWxlLCAxMDAgKiB0aGlzLnNjYWxlKTsgXHJcbiAgICAgICAgLy8gTGF5YS5sb2FkZXIubG9hZChcInJlcy9hdGxhcy9yZXMuYXRsYXNcIiwgTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLCApKTtcclxuICAgICAgICB0aGlzLmluaXRWaWV3KClcclxuICAgICAgICB0aGlzLm9yaWdpblBvaW50ID0gbmV3IExheWEuUG9pbnQodGhpcy5yb2NrZXJWaWV3LndpZHRoLzIsdGhpcy5yb2NrZXJWaWV3LmhlaWdodC8yKTtcclxuICAgICAgICB0aGlzLmZpcnN0UG9zdGlvbiA9IG5ldyBMYXlhLlBvaW50KDAsMCk7Ly8g6YGl5p2G5YaF6YOo5oyJ6ZKu55qE5Yid5aeL5L2N572uXHJcbiAgICAgICAgLyoqKuaRh+adhueahOinkuW6pioqKiovXHJcbiAgICAgICAgdGhpcy5hbmdsZSA9IC0xOyAgICAgICAgXHJcbiAgICAgICAgLyoqKuaRh+adhueahOW8p+W6pioqKiovXHJcbiAgICAgICAgdGhpcy5yYWRpYW5zID0gLTE7XHJcbiAgICAgICAgdGhpcy5kZWx0YVggPSAwO1xyXG4gICAgICAgIHRoaXMuZGVsdGFZID0gMDtcclxuICAgICAgICBMYXlhLnRpbWVyLmxvb3AoMzAsdGhpcyx0aGlzLm9uVXBkYXRlKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0Vmlldygpe1xyXG4gICAgICAgIHRoaXMucm9ja2VyVmlldyA9IG5ldyBMYXlhLlNwcml0ZSgpO1xyXG5cdFx0dGhpcy5yb2NrZXJWaWV3LnNpemUoNDAwICogdGhpcy5zY2FsZSwgNDAwICogdGhpcy5zY2FsZSk7XHJcbiAgICAgICAgdGhpcy5yb2NrZXJWaWV3LnBvcyg0MCAqIHRoaXMuc2NhbGUsIExheWEuQnJvd3Nlci5oZWlnaHQgLSA0MjAgKiB0aGlzLnNjYWxlKTtcclxuXHRcdHRoaXMucm9ja2VyQmcgPSBuZXcgTGF5YS5TcHJpdGUoKTtcclxuICAgICAgICB0aGlzLnJvY2tlckJnLmxvYWRJbWFnZSgnLi9yZXMvcm9ja2VyLWJnLnBuZycpO1xyXG4gICAgICAgIHRoaXMucm9ja2VyQmcudmlzaWJsZSA9IGZhbHNlO1xyXG5cdFx0dGhpcy5yb2NrZXJCZy5zaXplKDQwMCAqIHRoaXMuc2NhbGUsIDQwMCAqIHRoaXMuc2NhbGUpO1xyXG5cclxuXHRcdHRoaXMucm9ja2VyQnRuID0gbmV3IExheWEuQnV0dG9uKCcuL3Jlcy9yb2NrZXItYnRuLnBuZycpO1xyXG5cdFx0dGhpcy5yb2NrZXJCdG4uc2l6ZSgyMDAgKiB0aGlzLnNjYWxlLCAyMDAgKiB0aGlzLnNjYWxlKTtcclxuXHRcdHRoaXMucm9ja2VyQnRuLnN0YXRlTnVtID0gMjtcclxuXHRcdHRoaXMucm9ja2VyQnRuLnBvcyh0aGlzLnJvY2tlckJ0bk9yaWdpbi54LCB0aGlzLnJvY2tlckJ0bk9yaWdpbi55KTtcclxuICAgICAgICB0aGlzLnJvY2tlckJ0bi5vbihMYXlhLkV2ZW50Lk1PVVNFX0RPV04sdGhpcyx0aGlzLm9uUm9ja2VyRG93bik7XHJcblx0XHR0aGlzLnJvY2tlclZpZXcuYWRkQ2hpbGQodGhpcy5yb2NrZXJCZyk7XHJcbiAgICAgICAgdGhpcy5yb2NrZXJWaWV3LmFkZENoaWxkKHRoaXMucm9ja2VyQnRuKTtcclxuICAgICAgICBMYXlhLnN0YWdlLmFkZENoaWxkKHRoaXMucm9ja2VyVmlldyk7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5vbihMYXlhLkV2ZW50Lk1PVVNFX1VQLHRoaXMsdGhpcy5vblJvY2tla3JVcCk7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5vbihMYXlhLkV2ZW50Lk1PVVNFX09VVCx0aGlzLHRoaXMub25Sb2NrZWtyVXApO1xyXG4gICAgICAgIHRoaXMucm9ja2VyVmlldy56T3JkZXIgPSA1MDtcclxuICAgIH1cclxuXHJcbiAgICBoaWRlVmlldygpe1xyXG4gICAgICAgIHRoaXMucm9ja2VyVmlldy52aXNpYmxlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1ZpZXcoKXtcclxuICAgICAgICB0aGlzLnJvY2tlclZpZXcudmlzaWJsZSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Um9ja2VyVmlldygpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJvY2tlclZpZXc7XHJcbiAgICB9XHJcblxyXG4gICAgb25VcGRhdGUoKXtcclxuICAgICAgICBpZiAodGhpcy5yb2NrZXJCdG4ueCAhPT0gdGhpcy5yb2NrZXJCdG5PcmlnaW4ueCB8fCB0aGlzLnJvY2tlckJ0bi55ICE9PSB0aGlzLnJvY2tlckJ0bk9yaWdpbi55KSB7XHJcbiAgICAgICAgICAgIHZhciBkeCA9IHRoaXMuZGVsdGFYO1xyXG4gICAgICAgICAgICB2YXIgZHkgPSB0aGlzLmRlbHRhWTtcclxuICAgICAgICAgICAgaWYgKE1hdGguYWJzKGR4KSA8PSAyMCAmJiBNYXRoLmFicyhkeSkgPD0gMjApIHJldHVybjtcclxuICAgICAgICAgICAgdmFyIGFuZ2xlID0gMztcclxuICAgICAgICAgICAgaWYgKE1hdGguYWJzKGR4KSA+IE1hdGguYWJzKGR5KSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzTW9iaWxlUm90YXRlV3JvbmdYKHRoaXMuaW50cm9EYXRhLnN1Ym5hbWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb2RlbC50cmFuc2Zvcm0ucm90YXRlKG5ldyBMYXlhLlZlY3RvcjMoMCxkeCA+IDAgPyBhbmdsZSA6IC1hbmdsZSwwKSx0cnVlLGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb2RlbC50cmFuc2Zvcm0ucm90YXRlKG5ldyBMYXlhLlZlY3RvcjMoMCwwLGR4ID4gMCA/IGFuZ2xlIDogLWFuZ2xlKSx0cnVlLGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHsgICAgICBcclxuICAgICAgICAgICAgICAgIGlmIChpc01vYmlsZVJvdGF0ZVdyb25nWSh0aGlzLmludHJvRGF0YS5zdWJuYW1lKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW9kZWwudHJhbnNmb3JtLnJvdGF0ZShuZXcgTGF5YS5WZWN0b3IzKGR5ID4gMCA/IGFuZ2xlIDogLWFuZ2xlLDAsMCksZmFsc2UsZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vZGVsLnRyYW5zZm9ybS5yb3RhdGUobmV3IExheWEuVmVjdG9yMyhkeSA+IDAgPyAtYW5nbGUgOiBhbmdsZSwwLDApLGZhbHNlLGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH0gICAgICBcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uUm9ja2VyRG93bihlKXtcclxuICAgICAgICB0aGlzLnJvY2tlckJnLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZmlyc3RQb3N0aW9uLnggPSBlLnN0YWdlWDtcclxuICAgICAgICB0aGlzLmZpcnN0UG9zdGlvbi55ID0gZS5zdGFnZVk7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5vbihMYXlhLkV2ZW50Lk1PVVNFX01PVkUsdGhpcyx0aGlzLm9uUm9ja2VyTW92ZSk7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5vbihMYXlhLkV2ZW50Lk1PVVNFX1VQLHRoaXMsdGhpcy5vblJvY2tlclVwKTtcclxuICAgICAgICBMYXlhLnN0YWdlLm9uKExheWEuRXZlbnQuTU9VU0VfT1VULHRoaXMsdGhpcy5vblJvY2tlclVwKTtcclxuICAgIH1cclxuXHJcbiAgICBvblJvY2tlclVwKGUpe1xyXG4gICAgICAgIHRoaXMucm9ja2VyQnRuLnBvcyh0aGlzLnJvY2tlckJ0bk9yaWdpbi54LCB0aGlzLnJvY2tlckJ0bk9yaWdpbi55KTtcclxuICAgICAgICB0aGlzLnJvY2tlckJnLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAvL+S/ruaUueaRh+adhuinkuW6puS4juW8p+W6puS4ui0x77yI5Luj6KGo5peg6KeS5bqm77yJXHJcbiAgICAgICAgdGhpcy5yYWRpYW5zID0gdGhpcy5hbmdsZSA9IC0xO1xyXG4gICAgICAgIExheWEuc3RhZ2Uub2ZmKExheWEuRXZlbnQuTU9VU0VfTU9WRSx0aGlzLHRoaXMub25Sb2NrZXJNb3ZlKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDmjqfliLZyb2NrZXJCdG7nmoTnp7vliqjojIPlm7RcclxuICAgIG9uUm9ja2VyTW92ZShlKXtcclxuICAgICAgICB2YXIgbG9jYXRpb25Qb3MgPSB0aGlzLnJvY2tlclZpZXcuZ2xvYmFsVG9Mb2NhbChuZXcgTGF5YS5Qb2ludChlLnN0YWdlWCxlLnN0YWdlWSksZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuZGVsdGFYID0gbG9jYXRpb25Qb3MueCAtIHRoaXMub3JpZ2luUG9pbnQueDtcclxuICAgICAgICB0aGlzLmRlbHRhWSA9IGxvY2F0aW9uUG9zLnkgLSB0aGlzLm9yaWdpblBvaW50Lnk7XHJcbiAgICAgICAgdmFyIGR4ID0gdGhpcy5kZWx0YVggKiB0aGlzLmRlbHRhWDtcclxuICAgICAgICB2YXIgZHkgPSB0aGlzLmRlbHRhWSAqIHRoaXMuZGVsdGFZO1xyXG4gICAgICAgIHRoaXMuYW5nbGUgPSBNYXRoLmF0YW4yKHRoaXMuZGVsdGFYLHRoaXMuZGVsdGFZKSAqIDE4MCAvIE1hdGguUEk7XHJcbiAgICAgICAgaWYgKHRoaXMuYW5nbGUgPCAwKSB0aGlzLmFuZ2xlICs9IDM2MDtcclxuICAgICAgICB0aGlzLmFuZ2xlID0gTWF0aC5yb3VuZCh0aGlzLmFuZ2xlKTtcclxuICAgICAgICB0aGlzLnJhZGlhbnMgPSBNYXRoLlBJIC8gMTgwICogdGhpcy5hbmdsZTtcclxuICAgICAgICBpZiAoZHggKyBkeSA+PSAgKHRoaXMucm9ja2VyVmlldy53aWR0aC8yIC0gdGhpcy5yb2NrZXJCdG4ud2lkdGgvMikgKiAodGhpcy5yb2NrZXJWaWV3LndpZHRoLzIgLSB0aGlzLnJvY2tlckJ0bi53aWR0aC8yKSkge1xyXG4gICAgICAgICAgICB2YXIgeCA9IE1hdGguZmxvb3IoTWF0aC5zaW4odGhpcy5yYWRpYW5zKSAqICh0aGlzLnJvY2tlclZpZXcud2lkdGgvMiAtIHRoaXMucm9ja2VyQnRuLndpZHRoLzIpICsgdGhpcy5vcmlnaW5Qb2ludC54KTtcclxuICAgICAgICAgICAgdmFyIHkgPSBNYXRoLmZsb29yKE1hdGguY29zKHRoaXMucmFkaWFucykgKiAodGhpcy5yb2NrZXJWaWV3LndpZHRoLzIgLSB0aGlzLnJvY2tlckJ0bi53aWR0aC8yKSArIHRoaXMub3JpZ2luUG9pbnQueSk7XHJcbiAgICAgICAgICAgIHRoaXMucm9ja2VyQnRuLnBvcyh4IC0gdGhpcy5yb2NrZXJCdG4ud2lkdGggLyAyLHkgLSB0aGlzLnJvY2tlckJ0bi5oZWlnaHQgLyAyKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnJvY2tlckJ0bi5wb3MobG9jYXRpb25Qb3MueCAtIHRoaXMucm9ja2VyQnRuLndpZHRoIC8gMixsb2NhdGlvblBvcy55IC0gdGhpcy5yb2NrZXJCdG4uaGVpZ2h0IC8gMik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IEJpZ01vdmVTY3JpcHQgZnJvbSAnLi9zY3JpcHQvQmlnTW92ZVNjcmlwdCc7XHJcbmltcG9ydCBQaG9uZU1vdmVTY3JpcHQgZnJvbSAnLi9zY3JpcHQvUGhvbmVNb3ZlU2NyaXB0JztcclxuaW1wb3J0IHtHZXRRdWVyeVN0cmluZyxjcmVhdGVTY3JvbGxCYXIsc2Nyb2xsVGV4dCxnZXRVc2VyQWdlbnQscmVzZXRNb2RlbCxcclxuXHRcdGlzTHNGaWxlLGlzTm9CYWNrSW1nfSBmcm9tICcuL3NjcmlwdC91dGlscyc7XHJcbmltcG9ydCBJbnRyb1BhZ2UgZnJvbSAnLi9JbnRybyc7XHJcbmltcG9ydCBRdWVzdGlvblBhZ2UgZnJvbSAnLi9RdWVzdGlvbic7XHJcbmltcG9ydCBRdWVzdGlvblBob25lIGZyb20gJy4vUXVlc3Rpb25QaG9uZSc7XHJcbmltcG9ydCBKb3lTdGljayBmcm9tICcuL0pveVN0aWNrJztcclxuXHJcbnZhciBzdGFydExvYWQsZW5kTG9hZDtcclxuc3RhcnRMb2FkID0gbmV3IERhdGUoKTtcclxuY29uc29sZS5sb2coJ3N0YXJ0TG9hZDonICsgc3RhcnRMb2FkKTtcclxudmFyIEV2ZW50cyA9IExheWEuRXZlbnQ7XHJcbmNsYXNzIExvYWRNb2RlbHtcclxuXHRjb25zdHJ1Y3RvciAoKSB7XHJcblx0XHRjb25zdCBCcm93c2VyID0gTGF5YS5Ccm93c2VyO1xyXG5cdFx0Y29uc3QgU3ByaXRlID0gTGF5YS5TcHJpdGU7XHRcclxuXHRcdGNvbnN0IFRleHQgPSBMYXlhLlRleHQ7XHJcblx0XHRjb25zdCBCdXR0b24gPSBMYXlhLkJ1dHRvbjtcclxuXHRcdENvbmZpZy5pc0FscGhhID0gdHJ1ZTtcclxuXHRcdGxldCBjb25maWcgPSBuZXcgQ29uZmlnM0QoKTtcclxuXHRcdGNvbmZpZy5pc0FscGhhID0gdHJ1ZTtcclxuXHRcdExheWEzRC5pbml0KEJyb3dzZXIuY2xpZW50V2lkdGgsIEJyb3dzZXIuY2xpZW50SGVpZ2h0LGNvbmZpZyk7XHJcblx0XHRMYXlhLnN0YWdlLnNjYWxlTW9kZSA9IExheWEuU3RhZ2UuU0NBTEVfRlVMTDtcclxuXHRcdExheWEuc3RhZ2Uuc2NyZWVuTW9kZSA9IExheWEuU3RhZ2UuU0NSRUVOX05PTkU7XHJcblx0XHRMYXlhLnN0YWdlLmFsZ2luViA9IExheWEuU3RhZ2UuQUxHSU5fTUlERExFO1xyXG5cdFx0TGF5YS5zdGFnZS5hbGlnbkggPSBMYXlhLlN0YWdlLkFMSUdOX0NFTlRFUjtcclxuXHRcdFxyXG5cdFx0dGhpcy5hZ2VudCA9IGdldFVzZXJBZ2VudCgpO1xyXG5cdFx0dGhpcy5nZXREYXRhKCk7Ly8g6I635Y+W6K+l5qih5Z6L5omA5pyJ55u45YWz5pWw5o2uXHJcblx0XHR0aGlzLnNjZW5lSWQgPSAwOyAvLyAw5Li65qih5Z6L6aG177yMMeS4uuS7i+e7jemhte+8jDLkuLrmlYjmnpzpobVcclxuXHRcdHRoaXMuYmFja0ltYWdlID0gbmV3IFNwcml0ZSgpO1x0XHJcblx0XHR0aGlzLnNjYWxlID0gTGF5YS5Ccm93c2VyLndpZHRoIC8gMTkyMDtcclxuXHJcblx0XHRpZiAoR2V0UXVlcnlTdHJpbmcoJ2lzcGhvdG8nKSkgey8vIGlzcGhvdG8gPSAw5piv5qih5Z6L6aG177yM5LiN562J5LqOMOaYr+aLjeeFp+mhte+8m1xyXG5cdFx0XHR0aGlzLmlzUGhvdG8gPSBHZXRRdWVyeVN0cmluZygnaXNwaG90bycpID09PSAnMCcgPyBmYWxzZSA6IHRydWU7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLmlzUGhvdG8gPSBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyDmt7vliqDog4zmma/lm77niYdcclxuXHRcdGlmICh0aGlzLmlzUGhvdG8pIHsvLyDmi43nhafpobVcclxuXHRcdFx0aWYgKExheWEuUmVuZGVyLmlzV2ViR0wpIHtcclxuXHRcdFx0XHRMYXlhLnN0YWdlLmJnQ29sb3IgPSBcIm5vbmVcIjtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRMYXlhLnN0YWdlLmJnQ29sb3IgPSBudWxsO1xyXG5cdFx0XHR9IFxyXG5cdFx0fSBlbHNlIHtcdFx0XHRcclxuXHRcdFx0TGF5YS5zdGFnZS5vbigncmVzaXplJyx0aGlzLGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0bGV0IGJnID0gJyc7XHJcblx0XHRcdFx0aWYgKHRoaXMuaW50cm9EYXRhLnN1Ym5hbWUgPT09ICd0YWl5YW5neGknKSB7XHJcblx0XHRcdFx0XHRiZyA9ICcuL3Jlcy90YWl5YW5nLWJnLmpwZyc7XHJcblx0XHRcdFx0fSBlbHNlIGlmICh0aGlzLmludHJvRGF0YS5tYWlubmFtZSA9PT0gJ0NIRScgJiYgKHRoaXMuYWdlbnQgPT09ICdpb3MnIHx8IHRoaXMuYWdlbnQgPT09ICdhbmRyb2lkJykpIHtcclxuXHRcdFx0XHRcdGJnID0gJy4vcmVzL2JnLWNoZS5qcGcnO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRiZyA9ICcuL3Jlcy9iZy1odC5wbmcnO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHR0aGlzLmJhY2tJbWFnZS53aWR0aCA9IExheWEuc3RhZ2Uud2lkdGg7XHJcblx0XHRcdFx0dGhpcy5iYWNrSW1hZ2UuaGVpZ2h0ID0gTGF5YS5zdGFnZS5oZWlnaHQ7XHJcblx0XHRcdFx0dGhpcy5iYWNrSW1hZ2UucG9zKDAsMCk7XHJcblx0XHRcdFx0dGhpcy5iYWNrSW1hZ2UubG9hZEltYWdlKGJnKTtcclxuXHRcdFx0fSk7XHJcbiAgICAgICAgICAgIExheWEuc3RhZ2UuYWRkQ2hpbGQodGhpcy5iYWNrSW1hZ2UpO1xyXG5cdFx0fVxyXG5cdFx0bGV0IGZpcnN0TG9hZCA9IGZhbHNlO1xyXG5cdFx0aWYgKEdldFF1ZXJ5U3RyaW5nKCdmaXJzdExvYWQnKSA9PT0gJ3RydWUnKSB7XHJcblx0XHRcdGZpcnN0TG9hZCA9IHRydWU7XHJcblx0XHR9XHJcblx0XHRpZiAoISgodGhpcy5hZ2VudCA9PSAnYW5kcm9pZCcgJiYgZmlyc3RMb2FkKSkpIHtcclxuXHRcdFx0dGhpcy5wcmVMb2FkTW9kZWwoKTtcclxuXHRcdH1cclxuICAgICAgICBMYXlhLmxvYWRlci5sb2FkKFwicmVzL2F0bGFzL3Jlcy5hdGxhc1wiLCBMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsIHRoaXMuaW5pdEJ1dHRvbnMpKTtcclxuICAgIH1cclxuXHRcclxuXHQvLyDmoLnmja51cmzkuK3nmoRuYW1l6I635Y+W5qih5Z6L5pWw5o2uXHJcblx0Z2V0RGF0YSgpe1xyXG5cdFx0bGV0IG5hbWUgPSBHZXRRdWVyeVN0cmluZyhcIm5hbWVcIik7XHJcblx0XHRmb3IgKGxldCBpID0gMCAsIGxlbiA9IEJvb2tJbmZvcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG5cdFx0XHRpZiAobmFtZSA9PT0gQm9va0luZm9zW2ldLnN1Ym5hbWUpIHtcclxuXHRcdFx0XHR0aGlzLmludHJvRGF0YSA9IEJvb2tJbmZvc1tpXTtcclxuXHRcdFx0XHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY3VyckJvb2tJbmZvJyxKU09OLnN0cmluZ2lmeShCb29rSW5mb3NbaV0pKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Z2V0TW9kKCl7XHRcclxuXHRcdGxldCBtb2Q7XHJcblx0XHRpZiAoaXNMc0ZpbGUodGhpcy5pbnRyb0RhdGEuc3VibmFtZSkpIHtcclxuXHRcdFx0bW9kID0gdGhpcy5zY2VuZS5nZXRDaGlsZEF0KDEpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0bW9kID0gdGhpcy5tb2RlbC5nZXRDaGlsZEF0KDIpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIG1vZDtcclxuXHR9XHJcblxyXG5cdHByZUxvYWRNb2RlbCgpIHtcclxuXHRcdExheWEubG9hZGVyLmNyZWF0ZShbdGhpcy5pbnRyb0RhdGEuc3pfbW9kZWxdLExheWEuSGFuZGxlci5jcmVhdGUodGhpcyx0aGlzLm9uTW9kZWxMb2FkLG51bGwsZmFsc2UpKTtcclxuXHR9XHJcblxyXG5cdGN0cmxNb2RlbE1vdmVTY3JpcHQgKCkge1xyXG5cdFx0bGV0IHNlbGYgPSB0aGlzO1xyXG5cdFx0bGV0IHJvY2sgPSB0aGlzLnJvY2tlclZpZXcuZ2V0Um9ja2VyVmlldygpO1xyXG5cdFx0cm9jay5vbihMYXlhLkV2ZW50Lk1PVVNFX0RPV04sdGhpcyxmdW5jdGlvbigpe1xyXG5cdFx0XHRpZiAodGhpcy5tb2RlbE1vdmVTY3JpcHQgJiYgdGhpcy5tb2RlbE1vdmVTY3JpcHQuZW5hYmxlZCkge1xyXG5cdFx0XHRcdHRoaXMubW9kZWxNb3ZlU2NyaXB0LmVuYWJsZWQgPSBmYWxzZTtcclxuXHRcdFx0XHRMYXlhLnN0YWdlLm9uY2UoTGF5YS5FdmVudC5NT1VTRV9VUCx0aGlzLGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRpZiAodGhpcy5tb2RlbE1vdmVTY3JpcHQgJiYgIXRoaXMubW9kZWxNb3ZlU2NyaXB0LmVuYWJsZWQpIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5tb2RlbE1vdmVTY3JpcHQuZW5hYmxlZCA9IHRydWU7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdC8vIOaooeWei+WkhOeQhlxyXG5cdG9uTW9kZWxMb2FkICgpIHtcclxuXHRcdGxldCBtb2QsY2FtZXJhO1xyXG5cdFx0aWYgKGlzTHNGaWxlKHRoaXMuaW50cm9EYXRhLnN1Ym5hbWUpKSB7XHJcblx0XHRcdHRoaXMuc2NlbmUgPSBMYXlhLnN0YWdlLmFkZENoaWxkKExheWEuTG9hZGVyLmdldFJlcyh0aGlzLmludHJvRGF0YS5zel9tb2RlbCkpO1xyXG5cdFx0XHR0aGlzLm1vZGVsID0gdGhpcy5zY2VuZS5nZXRDaGlsZEF0KDEpO1xyXG5cdFx0XHRtb2QgPSB0aGlzLm1vZGVsO1xyXG5cdFx0XHRjYW1lcmEgPSB0aGlzLnNjZW5lLmdldENoaWxkQnlOYW1lKFwiTWFpbiBDYW1lcmFcIik7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHQvLyDmt7vliqDlnLrmma9cclxuXHRcdFx0dGhpcy5zY2VuZSA9IExheWEuc3RhZ2UuYWRkQ2hpbGQobmV3IExheWEuU2NlbmUzRCgpKTtcclxuXHRcdFx0dGhpcy5tb2RlbCA9IExheWEuTG9hZGVyLmdldFJlcyh0aGlzLmludHJvRGF0YS5zel9tb2RlbCk7XHJcblx0XHRcdHRoaXMuc2NlbmUuYWRkQ2hpbGQodGhpcy5tb2RlbCk7XHJcblx0XHRcdG1vZCA9IHRoaXMubW9kZWwuZ2V0Q2hpbGRBdCgyKTtcclxuXHRcdFx0Y2FtZXJhID0gdGhpcy5tb2RlbC5nZXRDaGlsZEJ5TmFtZShcIk1haW4gQ2FtZXJhXCIpO1xyXG5cdFx0fVxyXG5cdFx0cmVzZXRNb2RlbCh0aGlzLmludHJvRGF0YSxtb2QpO1xyXG5cdFx0dGhpcy5maXJzdFJvdGF0ZSA9IG5ldyBMYXlhLlF1YXRlcm5pb24obW9kLnRyYW5zZm9ybS5yb3RhdGlvbi54LG1vZC50cmFuc2Zvcm0ucm90YXRpb24ueSxtb2QudHJhbnNmb3JtLnJvdGF0aW9uLnosbW9kLnRyYW5zZm9ybS5yb3RhdGlvbi53KTtcclxuXHRcdHRoaXMuZmlyc3RQb3NpdGlvbiA9IG5ldyBMYXlhLlZlY3RvcjMobW9kLnRyYW5zZm9ybS5wb3NpdGlvbi54LG1vZC50cmFuc2Zvcm0ucG9zaXRpb24ueSxtb2QudHJhbnNmb3JtLnBvc2l0aW9uLnopO1xyXG5cdFx0aWYgKHRoaXMuYWdlbnQgPT09ICdhbHZhIGJpZyd8fCB0aGlzLmFnZW50ID09PSAnY2hyb21lJykge1xyXG5cdFx0XHR0aGlzLm1vZGVsTW92ZVNjcmlwdCA9IG1vZC5hZGRDb21wb25lbnQoQmlnTW92ZVNjcmlwdCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLm1vZGVsTW92ZVNjcmlwdCA9IG1vZC5hZGRDb21wb25lbnQoUGhvbmVNb3ZlU2NyaXB0KTtcdFxyXG5cdFx0XHR0aGlzLnJvY2tlclZpZXcgPSBuZXcgSm95U3RpY2sobW9kLHRoaXMubW9kZWxNb3ZlU2NyaXB0KTtcclxuXHRcdFx0dGhpcy5jdHJsTW9kZWxNb3ZlU2NyaXB0KCk7XHJcblx0XHR9XHJcblx0XHRpZiAoIWlzTm9CYWNrSW1nKHRoaXMuaW50cm9EYXRhLnN1Ym5hbWUpKSB7XHJcblx0XHRcdGNhbWVyYS5jbGVhckZsYWcgPSBMYXlhLkJhc2VDYW1lcmEuQ0xFQVJGTEFHX0RFUFRIT05MWTtcclxuXHRcdH1cclxuXHRcdHRoaXMuaGlkZUxvYWRpbmcoKTtcclxuXHRcdGVuZExvYWQgPSBuZXcgRGF0ZSgpO1xyXG5cdFx0Y29uc29sZS5sb2coJ2VuZExvYWQ6JyArIGVuZExvYWQpO1xyXG5cdH1cclxuXHJcblx0Ly8g6YCC6YWNXHJcbiAgICBhZGFwdGF0aW9uIChjaHJvbWUsIGFsdmFiaWcsIGFsdmFzbWFsbCwgaW9zLCBhbmRyb2lkKSB7XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLmFnZW50KSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ2Nocm9tZSc6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY2hyb21lO1xyXG4gICAgICAgICAgICBjYXNlICdhbHZhIHNtYWxsJzpcclxuICAgICAgICAgICAgICAgIHJldHVybiBhbHZhc21hbGw7XHJcbiAgICAgICAgICAgIGNhc2UgJ2lvcyc6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaW9zIHx8IGFuZHJvaWQ7XHJcbiAgICAgICAgICAgIGNhc2UgJ2FuZHJvaWQnOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFuZHJvaWQgfHwgaW9zO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFsdmFiaWcgfHwgY2hyb21lO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG5cclxuXHQvKiBidXR0b27lpITnkIblvIDlp4sgKi9cclxuXHRpbml0QnV0dG9ucyAoKSB7XHJcblx0XHRjb25zdCBWRVJUSUNBTF9TUEFDSU5HID0gMTUwICogdGhpcy5zY2FsZTtcclxuXHRcdGxldCBza2lucyA9IFtcclxuXHRcdFx0J3Jlcy9pbnRyby1idG4ucG5nJywncmVzL3F1ZXN0aW9uLnBuZycsJ3Jlcy9jbG9zZS1wb3AucG5nJywncmVzL2NhbWVyYS5wbmcnLCdyZXMvcmVjb2duaXplLnBuZydcclxuXHRcdF1cclxuXHRcdGxldCBidG5OYW1lcyA9IFtcclxuXHRcdFx0J2ludHJvQnRuJywncXVlc3Rpb24nLCdiYWNrQnRuJywnY2FtZXJhQnRuJywncmVjb2duaXplJ1xyXG5cdFx0XVxyXG5cdFx0Zm9yIChsZXQgaSA9IDAsIGxlbiA9IHNraW5zLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcblx0XHRcdGNvbnN0IGlzV2luID0gdGhpcy5hZ2VudCAhPT0gJ2FuZHJvaWQnICYmIHRoaXMuYWdlbnQgIT09ICdpb3MnXHJcblx0XHRcdGlmICggISh0aGlzLmFnZW50ID09PSAnYW5kcm9pZCcgfHwgdGhpcy5hZ2VudCA9PT0gJ2lvcycpICYmIGkgPT09IDMgKSB7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdH1cclxuXHRcdFx0bGV0IGJ0biA9IHRoaXMuY3JlYXRlQnV0dG9uKHNraW5zW2ldLG51bGwsYnRuTmFtZXNbaV0pO1xyXG5cdFx0XHRsZXQgeCA9IExheWEuQnJvd3Nlci53aWR0aCAtIFZFUlRJQ0FMX1NQQUNJTkc7XHJcblx0XHRcdGxldCB5ID0gMDtcclxuXHRcdFx0c3dpdGNoIChpKSB7XHJcblx0XHRcdFx0Y2FzZSAwOlxyXG5cdFx0XHRcdFx0Ly8g5LuL57uNXHJcblx0XHRcdFx0XHRpZiAodGhpcy5hZ2VudCAhPT0gJ2FsdmEgYmlnJykge1xyXG5cdFx0XHRcdFx0XHR5ID0gIExheWEuQnJvd3Nlci5oZWlnaHQgLSBWRVJUSUNBTF9TUEFDSU5HICogMjtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdHkgPSAgNTgwICogdGhpcy5zY2FsZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGJ0bi5vbihFdmVudHMuQ0xJQ0ssIHRoaXMsIHRoaXMuaW50cm9CdG5DbGljayk7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRjYXNlIDE6XHJcblx0XHRcdFx0XHQvLyDnrZTpophcclxuXHRcdFx0XHRcdGlmICh0aGlzLmFnZW50ICE9PSAnYWx2YSBiaWcnKSB7XHJcblx0XHRcdFx0XHRcdHkgPSBMYXlhLkJyb3dzZXIuaGVpZ2h0IC0gVkVSVElDQUxfU1BBQ0lORztcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdHkgPSA3MDAgKiB0aGlzLnNjYWxlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0YnRuLm9uKEV2ZW50cy5DTElDSywgdGhpcywgdGhpcy5xdWVzdGlvbkJ0bkNsaWNrKTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdGNhc2UgMjpcclxuXHRcdFx0XHRcdC8vIOi/lOWbnlxyXG5cdFx0XHRcdFx0aWYgKHRoaXMuYWdlbnQgPT09ICdhbmRyb2lkJyB8fCB0aGlzLmFnZW50ID09PSAnaW9zJykge1xyXG5cdFx0XHRcdFx0XHR4ID0gNjAgKiB0aGlzLnNjYWxlO1xyXG5cdFx0XHRcdFx0XHR5ID0gNjAgKiB0aGlzLnNjYWxlO1xyXG5cdFx0XHRcdFx0XHRidG4ud2lkdGggPSAxMDAgKiB0aGlzLnNjYWxlO1xyXG5cdFx0XHRcdFx0XHRidG4uaGVpZ2h0ID0gMTAwICogdGhpcy5zY2FsZTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdHggPSAxODAwICogdGhpcy5zY2FsZTtcclxuXHRcdFx0XHRcdFx0eSA9IDQwICogdGhpcy5zY2FsZTtcclxuXHRcdFx0XHRcdFx0YnRuLndpZHRoID0gdGhpcy5hZGFwdGF0aW9uKDkwICogdGhpcy5zY2FsZSwgOTAgKiB0aGlzLnNjYWxlLCAxMjAgKiB0aGlzLnNjYWxlKTtcclxuXHRcdFx0XHRcdFx0YnRuLmhlaWdodCA9IHRoaXMuYWRhcHRhdGlvbig2MCAqIHRoaXMuc2NhbGUsIDYwICogdGhpcy5zY2FsZSwgODAgKiB0aGlzLnNjYWxlKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGJ0bi5vbihFdmVudHMuQ0xJQ0ssIHRoaXMsIHRoaXMuYmFja0J0bkNsaWNrKTtcclxuXHRcdFx0XHRcdC8vIFRPRE86IOi/memHjOWunumZheS4iuS4jemcgOimgeazqOmHiu+8jOazqOmHiuaYr+aWueS+v+acrOWcsOa1i+ivlVxyXG5cdFx0XHRcdFx0aWYgKHRoaXMuYWdlbnQgPT09ICdhbHZhIHNtYWxsJykge1xyXG5cdFx0XHRcdFx0XHRidG4udmlzaWJsZSA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0Y2FzZSAzOiAvLyDnm7jmnLpcclxuXHRcdFx0XHRcdHkgPSBMYXlhLkJyb3dzZXIuaGVpZ2h0IC0gVkVSVElDQUxfU1BBQ0lORyAqIDM7XHJcblx0XHRcdFx0XHRidG4ub24oRXZlbnRzLkNMSUNLLCB0aGlzLCB0aGlzLmNhbWVyYUJ0bkNsaWNrKTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdGNhc2UgNDogLy8g5ouN54Wn6K+G5YirXHJcblx0XHRcdFx0XHR4ID0gTGF5YS5Ccm93c2VyLndpZHRoIC0gVkVSVElDQUxfU1BBQ0lORztcclxuXHRcdFx0XHRcdHkgPSA2MCAqIHRoaXMuc2NhbGU7XHJcblx0XHRcdFx0XHRidG4ub24oRXZlbnRzLkNMSUNLLHRoaXMsdGhpcy5vblJlY29nbml6ZUNsaWNrKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRidG4ucG9zKHgseSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRjcmVhdGVCdXR0b24oc2tpbix0ZXh0LG5hbWUpIHtcclxuXHRcdHZhciBidG47XHJcblx0XHRpZiAoc2tpbiA9PT0gJ3Jlcy9jbG9zZS1wb3AucG5nJyAmJiAodGhpcy5hZ2VudCA9PT0gJ2FuZHJvaWQnIHx8IHRoaXMuYWdlbnQgPT09ICdpb3MnKSkge1xyXG5cdFx0XHRidG4gPSBuZXcgTGF5YS5CdXR0b24oJ3Jlcy9jbG9zZS1wb3AtcC5wbmcnLCB0ZXh0KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGJ0biA9IG5ldyBMYXlhLkJ1dHRvbihza2luLCB0ZXh0KTtcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLmFnZW50ICE9PSAnYWx2YSBiaWcnKSB7XHJcblx0XHRcdGJ0bi53aWR0aCA9IDEyMCAqIHRoaXMuc2NhbGU7XHJcblx0XHRcdGJ0bi5oZWlnaHQgPSAxMjAgKiB0aGlzLnNjYWxlO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0YnRuLndpZHRoID0gODAgKiB0aGlzLnNjYWxlO1xyXG5cdFx0XHRidG4uaGVpZ2h0ID0gODAgKiB0aGlzLnNjYWxlO1xyXG5cdFx0fVxyXG5cdFx0YnRuLm5hbWUgPSBuYW1lO1xyXG5cdFx0YnRuLnpPcmRlciA9IDIwO1xyXG5cdFx0YnRuLnN0YXRlTnVtID0gMTtcclxuXHRcdExheWEuc3RhZ2UuYWRkQ2hpbGQoYnRuKTtcclxuXHRcdGlmICh0aGlzLmlzUGhvdG8pIHtcclxuXHRcdFx0YnRuLnZpc2libGUgPSBmYWxzZTtcclxuXHRcdH1cclxuXHRcdHJldHVybiBidG47XHJcblx0fVxyXG5cclxuXHRyZXNldEJ0blNob3cgKHNjZW5lSWQpIHtcclxuXHRcdHN3aXRjaCAoc2NlbmVJZCkge1xyXG5cdFx0XHRjYXNlIDA6XHJcblx0XHRcdFx0TGF5YS5zdGFnZS5nZXRDaGlsZEJ5TmFtZSgnY2FtZXJhQnRuJykgJiYgKExheWEuc3RhZ2UuZ2V0Q2hpbGRCeU5hbWUoJ2NhbWVyYUJ0bicpLnZpc2libGUgPSB0cnVlKTtcclxuXHRcdFx0XHRMYXlhLnN0YWdlLmdldENoaWxkQnlOYW1lKCdyZWNvZ25pemUnKSAmJiAoTGF5YS5zdGFnZS5nZXRDaGlsZEJ5TmFtZSgncmVjb2duaXplJykudmlzaWJsZSA9IHRydWUpO1xyXG5cdFx0XHRcdExheWEuc3RhZ2UuZ2V0Q2hpbGRCeU5hbWUoJ2ludHJvQnRuJykudmlzaWJsZSA9IHRydWU7XHJcblx0XHRcdFx0TGF5YS5zdGFnZS5nZXRDaGlsZEJ5TmFtZSgncXVlc3Rpb24nKS52aXNpYmxlID0gdHJ1ZTtcclxuXHRcdFx0XHRpZiAodGhpcy5yb2NrZXJWaWV3KXtcclxuXHRcdFx0XHRcdHRoaXMucm9ja2VyVmlldy5zaG93VmlldygpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAxOlxyXG5cdFx0XHRjYXNlIDI6XHJcblx0XHRcdFx0TGF5YS5zdGFnZS5nZXRDaGlsZEJ5TmFtZSgnY2FtZXJhQnRuJykgJiYgKExheWEuc3RhZ2UuZ2V0Q2hpbGRCeU5hbWUoJ2NhbWVyYUJ0bicpLnZpc2libGUgPSBmYWxzZSk7XHJcblx0XHRcdFx0TGF5YS5zdGFnZS5nZXRDaGlsZEJ5TmFtZSgncmVjb2duaXplJykgJiYgKExheWEuc3RhZ2UuZ2V0Q2hpbGRCeU5hbWUoJ3JlY29nbml6ZScpLnZpc2libGUgPSBmYWxzZSk7XHJcblx0XHRcdFx0TGF5YS5zdGFnZS5nZXRDaGlsZEJ5TmFtZSgnaW50cm9CdG4nKS52aXNpYmxlID0gZmFsc2U7XHJcblx0XHRcdFx0TGF5YS5zdGFnZS5nZXRDaGlsZEJ5TmFtZSgncXVlc3Rpb24nKS52aXNpYmxlID0gZmFsc2U7XHJcblx0XHRcdFx0aWYgKHRoaXMucm9ja2VyVmlldyl7XHJcblx0XHRcdFx0XHR0aGlzLnJvY2tlclZpZXcuaGlkZVZpZXcoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHR9XHJcblx0fVxyXG5cdC8qIGJ1dHRvbuWkhOeQhue7k+adnyAqL1xyXG5cclxuXHQvKiDkuovku7blpITnkIblvIDlp4sgKi9cclxuXHRpbnRyb0J0bkNsaWNrKGUpe1xyXG5cdFx0d2luZG93LnNjZW5lSWQgPSB0aGlzLnNjZW5lSWQgPSAxO1xyXG5cdFx0dGhpcy5yZXNldEJ0blNob3codGhpcy5zY2VuZUlkKTtcclxuXHRcdExheWEuc3RhZ2UucmVtb3ZlQ2hpbGQodGhpcy5zY2VuZSk7XHJcblx0XHR0aGlzLmludHJvUGFnZSA9IG5ldyBJbnRyb1BhZ2UodGhpcy5zY2VuZSx0aGlzLmFnZW50LHRoaXMuaW50cm9EYXRhKTtcclxuXHR9XHJcblxyXG5cdHF1ZXN0aW9uQnRuQ2xpY2soZSl7XHJcblx0XHR3aW5kb3cuc2NlbmVJZCA9IHRoaXMuc2NlbmVJZCA9IDI7XHJcblx0XHR0aGlzLnJlc2V0QnRuU2hvdyh0aGlzLnNjZW5lSWQpO1xyXG5cdFx0aWYgKGlzTHNGaWxlKHRoaXMuaW50cm9EYXRhLnN1Ym5hbWUpKSB7XHRcdFxyXG5cdFx0XHRsZXQgY2FtZXJhID0gdGhpcy5zY2VuZS5nZXRDaGlsZEJ5TmFtZShcIk1haW4gQ2FtZXJhXCIpO1xyXG5cdFx0XHRjYW1lcmEuY2xlYXJGbGFnID0gTGF5YS5CYXNlQ2FtZXJhLkNMRUFSRkxBR19ERVBUSE9OTFk7XHJcblx0XHR9IFxyXG5cdFx0dGhpcy5zY2VuZS5yZW1vdmVDaGlsZCh0aGlzLm1vZGVsKTtcclxuXHRcdExheWEuc3RhZ2UucmVtb3ZlQ2hpbGQodGhpcy5zY2VuZSk7XHJcblx0XHRpZiAodGhpcy5hZ2VudCA9PT0gJ2FuZHJvaWQnIHx8IHRoaXMuYWdlbnQgPT09ICdpb3MnfHwgdGhpcy5hZ2VudCA9PT0gJ2FsdmEgc21hbGwnKSB7XHJcblx0XHRcdHRoaXMucGxheVBhZ2UgPSBuZXcgUXVlc3Rpb25QaG9uZSh0aGlzLnNjZW5lLHRoaXMuYWdlbnQsdGhpcy5pbnRyb0RhdGEucXVlc3Rpb25EYXRhUGhvbmUgfHwgdGhpcy5pbnRyb0RhdGEucXVlc3Rpb25EYXRhKTtcclxuXHRcdH0gZWxzZSB7XHRcdFx0XHJcblx0XHRcdHRoaXMucGxheVBhZ2UgPSBuZXcgUXVlc3Rpb25QYWdlKHRoaXMuc2NlbmUsdGhpcy5hZ2VudCx0aGlzLmludHJvRGF0YS5xdWVzdGlvbkRhdGEpO1xyXG5cdFx0fVxyXG5cdH1cdFxyXG5cclxuXHRjYW1lcmFCdG5DbGljayhlKXtcclxuXHRcdGxldCBuYW1lID0gR2V0UXVlcnlTdHJpbmcoXCJuYW1lXCIpO1xyXG5cdFx0aWYodGhpcy5hZ2VudCA9PT0gXCJpb3NcIil7XHJcblx0XHRcdHdpbmRvdy5sb2NhdGlvbi5ocmVmPSB3aW5kb3cubG9jYXRpb24uaHJlZitcIiZ0YWtlcGhvdG9cIjtcclxuXHRcdH1lbHNle1xyXG5cdFx0XHRpZiggdHlwZW9mKCBBbmRyb2lkVG9vbCApICE9IFwidW5kZWZpbmVkXCIgKXtcclxuXHRcdFx0XHRpZihBbmRyb2lkVG9vbC5nb0NhcHR1cmVzKXtcclxuXHRcdFx0XHRcdEFuZHJvaWRUb29sLmdvQ2FwdHVyZXMobmFtZSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9ICAgIFxyXG5cdH1cclxuXHJcblx0YWRkTW9kZWxTY3JpcHQgKCkge1x0XHJcblx0XHRsZXQgbW9kID0gdGhpcy5nZXRNb2QoKTtcclxuXHRcdGlmICh0aGlzLmFnZW50ID09PSAnYWx2YSBiaWcnfHwgdGhpcy5hZ2VudCA9PT0gJ2Nocm9tZScpIHtcclxuXHRcdFx0Ly8g5re75Yqg6ISa5pysKG1vZGVs5LuO6Iie5Y+w56e76Zmk6YeN5paw5re75Yqg5ZCO5YW25Y6f5p2l55qE6ISa5pys5LiN6LW35L2c55So5LqG77yM6KaB6YeN5paw57uR5a6a5LiA5Liq6ISa5pysKVxyXG5cdFx0XHQvLyDlpKflsY/lkoxjaHJvbWXpnIDopoHliqDkuIDkuKrmlrDnmoRCaWdNb3ZlU2NyaXB077yM5ZCm5YiZ5Y6f5p2l55qEQmlnTW92ZVNjcmlwdOaXoOazleS9nOeUqOS6jm1vZO+8jG1vZOWwseaXoOazleaXi+i9rOenu+WKqOetiTtcclxuXHRcdFx0dGhpcy5tb2RlbE1vdmVTY3JpcHQgPSBtb2QuYWRkQ29tcG9uZW50KEJpZ01vdmVTY3JpcHQpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Ly8g56e75Yqo56uv5LiN6ZyA6KaB6YeN5paw5YqgUGhvbmVNb3ZlU2NyaXB077yM5LiN6YeN5paw5YqgbW9k5LuN54S25Y+v5Lul5omn6KGM5pen55qEUGhvbmVNb3ZlU2NyaXB0XHJcblx0XHRcdC8vIOWmguaenOmHjeaWsOWKoFBob25lTW92ZVNjcmlwdOeahOivnXRoaXMubW9kZWxNb3ZlU2NyaXB055qEaWTnmoTlgLzkvJrooqvmlLnlj5jvvIxyb2Nr57uR5a6a55qEZG93buS6i+S7tuWwseaXoOazleWvueaWsGlk55qEdGhpcy5tb2RlbE1vdmVTY3JpcHTotbfkvZznlKjvvIzlj6rkvJrlr7nljp/mnaVpZOeahHRoaXMubW9kZWxNb3ZlU2NyaXB06LW35L2c55So77yM5YiZ5b2T5oyJ5LiLcm9ja+aXtuaooeWei+S8muWQjOaXtuWPkeeUn+enu+WKqOWSjOaXi+i9rO+8m1xyXG5cdFx0XHQvLyB0aGlzLm1vZGVsTW92ZVNjcmlwdCA9IG1vZC5hZGRDb21wb25lbnQoUGhvbmVNb3ZlU2NyaXB0KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGJhY2tSZXNldE1vZGVsICgpIHtcclxuXHRcdGxldCBtb2QgPSB0aGlzLmdldE1vZCgpO1xyXG5cdFx0bW9kLnRyYW5zZm9ybS5yb3RhdGlvbiA9IHRoaXMuZmlyc3RSb3RhdGU7XHJcblx0XHRtb2QudHJhbnNmb3JtLnBvc2l0aW9uID0gdGhpcy5maXJzdFBvc2l0aW9uO1xyXG5cdH1cclxuXHJcblx0YmFja0J0bkNsaWNrKCl7XHJcblx0XHRzd2l0Y2ggKHRoaXMuc2NlbmVJZCl7XHJcblx0XHRcdGNhc2UgMDogLy8g5qih5Z6L6aG1XHJcblx0XHRcdFx0TGF5YS5sb2FkZXIuY2xlYXJSZXModGhpcy5pbnRyb0RhdGEuc3pfbW9kZWwpO1xyXG5cdFx0XHRcdGlmICh0aGlzLmFnZW50ID09PSAnYWx2YSBiaWcnIHx8IHRoaXMuYWdlbnQgPT09ICdjaHJvbWUnKSB7XHJcblx0XHRcdFx0XHRMYXlhLkJyb3dzZXIud2luZG93LmxvY2F0aW9uLmhyZWYgPSAnLi9tYWluLmh0bWwnO1xyXG5cdFx0XHRcdH0gZWxzZSBpZih0aGlzLmFnZW50ID09PSBcImlvc1wiKSB7XHJcblx0XHRcdFx0XHR3aW5kb3cubG9jYXRpb24uaHJlZj0gd2luZG93LmxvY2F0aW9uLmhyZWYrXCImY2FsbGJhY2tcIjtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0aWYoIHRoaXMuYWdlbnQgPT09ICdhbmRyb2lkJyApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihBbmRyb2lkVG9vbC5nb0JhY2spe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQW5kcm9pZFRvb2wuZ29CYWNrKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgMTogLy8g5LuL57uN6aG1XHJcblx0XHRcdFx0d2luZG93LnNjZW5lSWQgPSB0aGlzLnNjZW5lSWQgPSAwO1xyXG5cdFx0XHRcdHRoaXMuaW50cm9QYWdlLmJhY2soKTtcclxuXHRcdFx0XHR0aGlzLnJlc2V0QnRuU2hvdyh0aGlzLnNjZW5lSWQpO1xyXG5cclxuXHRcdFx0XHRMYXlhLnN0YWdlLmFkZENoaWxkKHRoaXMuc2NlbmUpO1xyXG5cdFx0XHRcdHRoaXMuYWRkTW9kZWxTY3JpcHQoKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAyOiAvLyDnrZTpopjpobVcclxuXHRcdFx0XHR3aW5kb3cuc2NlbmVJZCA9IHRoaXMuc2NlbmVJZCA9IDA7XHJcblx0XHRcdFx0dGhpcy5wbGF5UGFnZS5iYWNrKClcclxuXHRcdFx0XHR0aGlzLnJlc2V0QnRuU2hvdyh0aGlzLnNjZW5lSWQpO1xyXG5cdFx0XHRcdGlmIChpc05vQmFja0ltZyh0aGlzLmludHJvRGF0YS5zdWJuYW1lKSkge1x0XHRcclxuXHRcdFx0XHRcdGxldCBjYW1lcmEgPSB0aGlzLnNjZW5lLmdldENoaWxkQnlOYW1lKFwiTWFpbiBDYW1lcmFcIik7XHJcblx0XHRcdFx0XHRjYW1lcmEuY2xlYXJGbGFnID0gTGF5YS5CYXNlQ2FtZXJhLkNMRUFSRkxBR19TS1k7XHJcblx0XHRcdFx0fSBcclxuXHRcdFx0XHRMYXlhLnN0YWdlLmFkZENoaWxkKHRoaXMuc2NlbmUpO1xyXG5cdFx0XHRcdHRoaXMuc2NlbmUuYWRkQ2hpbGQodGhpcy5tb2RlbCk7XHJcblx0XHRcdFx0dGhpcy5hZGRNb2RlbFNjcmlwdCgpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0fVxyXG5cdH1cclxuXHQvKiDkuovku7blpITnkIbnu5PmnZ8gKi9cclxuXHJcblxyXG5cdC8q54K55Ye76Lez6L2s5Yiw5ouN54Wn6K+G5Yir6aG16Z2iKi9cclxuXHRvblJlY29nbml6ZUNsaWNrKCl7XHJcblx0XHRzd2l0Y2ggKHRoaXMuYWdlbnQpIHtcclxuXHRcdFx0Y2FzZSAnaW9zJzpcclxuXHRcdFx0XHR3aW5kb3cubG9jYXRpb24uaHJlZj0gd2luZG93LmxvY2F0aW9uLmhyZWYrXCImanVtcGNhbWVyYVwiO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICdhbmRyb2lkJzpcclxuXHRcdFx0XHRpZihBbmRyb2lkVG9vbC5nb0NhdGNoKXtcclxuXHRcdFx0XHRcdEFuZHJvaWRUb29sLmdvQ2F0Y2goKTtcclxuXHRcdFx0XHR9ICBcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8vIOebuOacuuaLjeeFp+aXtue7mOWItkNhbnZhc1xyXG4gICAgc2F2ZWh0bWwgKCl7XHJcblx0XHQvLyB2YXIgaHRtbENhbnZhcyA9IExheWEuc3RhZ2UuZHJhd1RvQ2FudmFzKExheWEuc3RhZ2Uud2lkdGgsIExheWEuc3RhZ2UuaGVpZ2h0LCAwLCAwKTtcclxuXHRcdC8vIHZhciBjYW52YXM9aHRtbENhbnZhcy5zb3VyY2U7XHJcblx0XHQvLyB2YXIgZGF0YVVSTD1jYW52YXMudG9EYXRhVVJMKFwiaW1hZ2UvcG5nXCIpO1xyXG5cdFx0Ly8gJCgnI2ltZycpLmF0dHIoJ3NyYycsZGF0YVVSTCk7XHJcblx0XHRpZiAodGhpcy5yb2NrZXJWaWV3KXtcclxuXHRcdFx0dGhpcy5yb2NrZXJWaWV3LmhpZGVWaWV3KCk7XHJcblx0XHR9XHJcblx0XHRMYXlhLnRpbWVyLm9uY2UoMTAsdGhpcyxmdW5jdGlvbigpe1xyXG5cclxuXHRcdFx0aHRtbDJjYW52YXMoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2NhbnZhcycpWzBdLHtcclxuXHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6bnVsbCxcclxuXHRcdFx0XHR3aWR0aDp3aW5kb3cuaW5uZXJXaWR0aCxcclxuXHRcdFx0XHRoZWlnaHQ6d2luZG93LmlubmVySGVpZ2h0XHJcblx0XHRcdH0pLnRoZW4oZnVuY3Rpb24gKGNhbnZhcykge1xyXG5cdFx0XHRcdHZhciBkYXRhVVJMPWNhbnZhcy50b0RhdGFVUkwoXCJpbWFnZS9wbmdcIik7XHJcblx0XHRcdFx0JCgnI2ltZycpLmF0dHIoJ3NyYycsZGF0YVVSTCk7XHRcdFxyXG5cdFx0XHRcdGlmKCB0eXBlb2YoIEFuZHJvaWRUb29sICkgIT0gXCJ1bmRlZmluZWRcIiApe1xyXG5cdFx0XHRcdFx0aWYoQW5kcm9pZFRvb2wuc2F2ZWh0bWwpe1xyXG5cdFx0XHRcdFx0XHRBbmRyb2lkVG9vbC5zYXZlaHRtbChkYXRhVVJMKTtcclxuXHRcdFx0XHRcdH0gIFxyXG5cdFx0XHRcdH0gXHJcblx0XHRcdFx0aWYod2luZG93LndlYmtpdCAmJiAgd2luZG93LndlYmtpdC5tZXNzYWdlSGFuZGxlcnMgJiYgd2luZG93LndlYmtpdC5tZXNzYWdlSGFuZGxlcnMuYXBwKXtcclxuXHRcdFx0XHRcdHdpbmRvdy53ZWJraXQubWVzc2FnZUhhbmRsZXJzLmFwcC5wb3N0TWVzc2FnZShkYXRhVVJMKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdHNob3dSb2NrZXIgKCkge1xyXG5cdFx0aWYgKHRoaXMucm9ja2VyVmlldyl7XHJcblx0XHRcdHRoaXMucm9ja2VyVmlldy5zaG93VmlldygpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0c2hvd0xvYWRpbmcoKXtcclxuXHRcdGlmICh0eXBlb2YoIEFuZHJvaWRUb29sICkgIT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICBpZihBbmRyb2lkVG9vbC5zdGFydEFuaW1hdGlvbil7XHJcbiAgICAgICAgICAgICAgICAgQW5kcm9pZFRvb2wuc3RhcnRBbmltYXRpb24oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAod2luZG93LndlYmtpdCAmJiAgd2luZG93LndlYmtpdC5tZXNzYWdlSGFuZGxlcnMgJiYgd2luZG93LndlYmtpdC5tZXNzYWdlSGFuZGxlcnMuc2hvd0xvYWRpbmcpIHtcclxuICAgICAgICAgICAgd2luZG93LndlYmtpdC5tZXNzYWdlSGFuZGxlcnMuc2hvd0xvYWRpbmcucG9zdE1lc3NhZ2UoXCJcIik7XHJcbiAgICAgICAgfVxyXG5cdH1cclxuXHJcblx0aGlkZUxvYWRpbmcoKXtcclxuXHRcdGlmKCB0eXBlb2YoIEFuZHJvaWRUb29sICkgIT0gXCJ1bmRlZmluZWRcIiApe1xyXG5cdFx0XHRpZihBbmRyb2lkVG9vbC5zdG9wQW5pbWF0aW9uKXtcclxuXHRcdFx0XHQgQW5kcm9pZFRvb2wuc3RvcEFuaW1hdGlvbigpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5hZ2VudCA9PT0gJ2lvcycpIHtcclxuXHRcdFx0aWYod2luZG93LndlYmtpdCAmJiAgd2luZG93LndlYmtpdC5tZXNzYWdlSGFuZGxlcnMgJiYgd2luZG93LndlYmtpdC5tZXNzYWdlSGFuZGxlcnMuaGlkZUxvYWRpbmcpe1xyXG5cdFx0XHRcdHdpbmRvdy53ZWJraXQubWVzc2FnZUhhbmRsZXJzLmhpZGVMb2FkaW5nLnBvc3RNZXNzYWdlKFwiXCIpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG53aW5kb3cuTGF5YVNjZW5lID0gbmV3IExvYWRNb2RlbCgpO1xyXG5cclxuIiwiaW1wb3J0IHtzY3JvbGxUZXh0fSBmcm9tICcuL3NjcmlwdC91dGlscyc7XHJcbmNvbnN0IHRleGlhb1VybCA9ICcuLi9tb2RlbC9MYXlhU2NlbmVfdGV4aWFvL0NvbnZlbnRpb25hbC90ZXhpYW8ubGgnO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBRdWVzdGlvblBhZ2V7XHJcbiAgICBjb25zdHJ1Y3RvcihzY2VuZSxhZ2VudCxxdWVzdGlvbkRhdGEpe1xyXG4gICAgICAgIHRoaXMuc2NlbmUgPSBzY2VuZTtcclxuICAgICAgICB0aGlzLmFnZW50ID0gYWdlbnQ7XHJcbiAgICAgICAgdGhpcy5zY2FsZSA9IExheWEuQnJvd3Nlci53aWR0aCAvIDE5MjA7XHJcbiAgICAgICAgdGhpcy5xdWVzdGlvbkRhdGEgPSBxdWVzdGlvbkRhdGE7XHJcbiAgICAgICAgdGhpcy5xdWVzdGlvbkluZGV4ID0gMDtcclxuICAgICAgICBMYXlhLmxvYWRlci5sb2FkKFwicmVzL2F0bGFzL2luZm8uYXRsYXNcIiwgTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLCB0aGlzLmluaXRCdXR0b25zKSk7XHJcbiAgICAgICAgdGhpcy5xdWVzdGlvbkJveCA9IG5ldyBMYXlhLlNwcml0ZSgpO1xyXG4gICAgICAgIHRoaXMucXVlc3Rpb25Cb3guc2l6ZSg4MDAgKiB0aGlzLnNjYWxlLCAxMDAwICogdGhpcy5zY2FsZSk7XHJcblx0XHR2YXIgbGVmdCA9IChMYXlhLnN0YWdlLndpZHRoIC0gdGhpcy5xdWVzdGlvbkJveC53aWR0aCkgLyAyO1xyXG5cdFx0dmFyIHRvcCA9IChMYXlhLnN0YWdlLmhlaWdodCAtIHRoaXMucXVlc3Rpb25Cb3guaGVpZ2h0KSAvIDI7XHJcblx0XHR0aGlzLnF1ZXN0aW9uQm94LnBvcyhsZWZ0LCB0b3ApO1xyXG5cdFx0TGF5YS5zdGFnZS5hZGRDaGlsZCh0aGlzLnF1ZXN0aW9uQm94KTtcclxuICAgICAgICB0aGlzLnF1ZXN0aW9uQm94LmNhY2hlQXMgPSAnYml0bWFwJztcclxuICAgICAgICBsZXQgY3VyclF1ZXN0aW9uRGF0YSA9ICB0aGlzLnF1ZXN0aW9uRGF0YVt0aGlzLnF1ZXN0aW9uSW5kZXhdOyAvLyDlrZjlgqjlvZPliY3lsZXnpLrpl67popjnmoTmlbDmja5cclxuICAgICAgICBMYXlhLmxvYWRlci5jcmVhdGUoW3RleGlhb1VybF0sIExheWEuSGFuZGxlci5jcmVhdGUodGhpcywgdGhpcy5jcmVhdGVRdWVzdGlvbiwgW2N1cnJRdWVzdGlvbkRhdGFdLCBmYWxzZSkpO1xyXG4gICAgICAgIC8vIHRoaXMuaW5pdEJ1dHRvbnMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiBidXR0b27lpITnkIblvIDlp4sgKi9cclxuXHRpbml0QnV0dG9ucyAoKSB7XHJcbiAgICAgICAgbGV0IEV2ZW50cyA9IExheWEuRXZlbnQ7XHJcblx0XHRsZXQgc2tpbnMgPSBbXHJcblx0XHRcdCdpbmZvL2xhc3QtcXVlc3Rpb24ucG5nJywnaW5mby9uZXh0LXF1ZXN0aW9uLnBuZycsXHJcblx0XHRdXHJcblx0XHRsZXQgYnRuTmFtZXMgPSBbXHJcblx0XHRcdCdsYXN0UXVlc3Rpb24nLCduZXh0UXVlc3Rpb24nXHJcblx0XHRdXHJcblx0XHRmb3IgKGxldCBpID0gMCwgbGVuID0gc2tpbnMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGJ0biA9IHRoaXMuY3JlYXRlQnV0dG9uKHNraW5zW2ldLG51bGwsYnRuTmFtZXNbaV0pO1xyXG4gICAgICAgICAgICBsZXQgeCA9IDE1NjUqdGhpcy5zY2FsZTtcclxuICAgICAgICAgICAgbGV0IHkgPSAwO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGkpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDovLyDkuIrkuIDpophcclxuICAgICAgICAgICAgICAgICAgICB5ID0gNDAwKnRoaXMuc2NhbGU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnRuLm9uKEV2ZW50cy5DTElDSyx0aGlzLHRoaXMubGFzdFF1ZXN0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMTovLyDkuIvkuIDpophcclxuICAgICAgICAgICAgICAgICAgICB5ID0gNjAwKnRoaXMuc2NhbGU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnRuLm9uKEV2ZW50cy5DTElDSyx0aGlzLHRoaXMubmV4dFF1ZXN0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBidG4ucG9zKHgseSk7XHJcbiAgICAgICAgfVxyXG5cdH1cclxuXHJcblx0Y3JlYXRlQnV0dG9uKHNraW4sdGV4dCxuYW1lKSB7XHJcblx0XHR2YXIgYnRuO1xyXG5cdFx0YnRuID0gbmV3IExheWEuQnV0dG9uKHNraW4sIHRleHQpO1xyXG5cdFx0YnRuLndpZHRoID0gNzUgKiB0aGlzLnNjYWxlO1xyXG4gICAgICAgIGJ0bi5oZWlnaHQgPSAxMDIgKiB0aGlzLnNjYWxlO1xyXG5cdFx0YnRuLm5hbWUgPSBuYW1lO1xyXG5cdFx0YnRuLnpPcmRlciA9IDIwO1xyXG5cdFx0YnRuLnN0YXRlTnVtID0gMTtcclxuXHRcdExheWEuc3RhZ2UuYWRkQ2hpbGQoYnRuKTtcclxuXHRcdHJldHVybiBidG47XHJcblx0fVxyXG5cclxuICAgIC8vIOmAgumFjVxyXG4gICAgYWRhcHRhdGlvbiAoY2hyb21lLCBhbHZhYmlnLCBhbHZhc21hbGwpIHtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMuYWdlbnQpIHtcclxuICAgICAgICAgICAgY2FzZSAnY2hyb21lJzpcclxuICAgICAgICAgICAgICAgIHJldHVybiBjaHJvbWU7XHJcbiAgICAgICAgICAgIGNhc2UgJ2FsdmEgc21hbGwnOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFsdmFzbWFsbDtcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHJldHVybiBhbHZhYmlnIHx8IGNocm9tZTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGNyZWF0ZVF1ZXN0aW9uIChxdWVzdGlvbkRhdGEpIHtcclxuICAgICAgIC8vIOmXrumimFxyXG4gICAgICAgdmFyIHF1ZXN0aW9uVGl0Qm94ID0gTGF5YS5Qb29sLmdldEl0ZW1CeUNsYXNzKCdCb3gnLCBMYXlhLlNwcml0ZSk7XHJcbiAgICAgICBxdWVzdGlvblRpdEJveC5sb2FkSW1hZ2UoJy4vcmVzL3F1ZXN0aW9uLXRpdC5wbmcnKTtcclxuICAgICAgIHF1ZXN0aW9uVGl0Qm94LnBvcygwICogdGhpcy5zY2FsZSwgMCAqIHRoaXMuc2NhbGUpO1xyXG4gICAgICAgcXVlc3Rpb25UaXRCb3guc2l6ZSg4NDAgKiB0aGlzLnNjYWxlLCA1NTUgKiB0aGlzLnNjYWxlKTtcclxuXHJcbiAgICAgICB2YXIgaWNvbiA9IExheWEuUG9vbC5nZXRJdGVtQnlDbGFzcygnQm94JyxMYXlhLlNwcml0ZSk7XHJcbiAgICAgICBpY29uLmxvYWRJbWFnZSgnaW5mby9xdWVzJyArIHRoaXMucXVlc3Rpb25JbmRleCArICcucG5nJyk7XHJcbiAgICAgICBpY29uLnBvcyg2MCAqIHRoaXMuc2NhbGUsIDExMCAqIHRoaXMuc2NhbGUpO1xyXG4gICAgICAgaWNvbi5zaXplKDEwMCAqIHRoaXMuc2NhbGUsIDMzICogdGhpcy5zY2FsZSk7XHJcbiAgICAgICBxdWVzdGlvblRpdEJveC5hZGRDaGlsZChpY29uKTtcclxuICAgICAgIHZhciBxdWVzdGlvbiA9IExheWEuUG9vbC5nZXRJdGVtQnlDbGFzcygnVHh0JywgTGF5YS5UZXh0KTtcclxuICAgICAgIHF1ZXN0aW9uLmxlYWRpbmcgPSAxNTtcclxuICAgICAgIHF1ZXN0aW9uLmNvbG9yID0gJyMwMDAnO1xyXG4gICAgICAgcXVlc3Rpb24uZm9udFNpemUgPSB0aGlzLmFkYXB0YXRpb24oMjUsNjAsNDAgKiB0aGlzLnNjYWxlKTtcclxuICAgICAgIHF1ZXN0aW9uLnRleHQgPSBxdWVzdGlvbkRhdGEucXVlc3Rpb247XHJcbiAgICAgICBxdWVzdGlvbi53b3JkV3JhcCA9IHRydWU7XHJcbiAgICAgICBxdWVzdGlvbi5zaXplKDU1MCAqIHRoaXMuc2NhbGUsIDIwMCAqIHRoaXMuc2NhbGUpO1xyXG4gICAgICAgcXVlc3Rpb24ucG9zKDEyMCAqIHRoaXMuc2NhbGUsIDE3MCAqIHRoaXMuc2NhbGUpO1xyXG4gICAgICAgcXVlc3Rpb25UaXRCb3guYWRkQ2hpbGQocXVlc3Rpb24pO1xyXG5cclxuICAgICAgIHRoaXMucXVlc3Rpb25Cb3guYWRkQ2hpbGQocXVlc3Rpb25UaXRCb3gpO1xyXG4gICAgICAgLy8g562U5a+554m55pWIXHJcbiAgICAgICB2YXIgdGV4aWFvID0gTGF5YS5Mb2FkZXIuZ2V0UmVzKHRleGlhb1VybCk7XHJcbiAgICAgICB2YXIgY2FtZXJhID0gdGV4aWFvLmdldENoaWxkQnlOYW1lKFwiTWFpbiBDYW1lcmFcIik7XHJcbiAgICAgICBjYW1lcmEuY2xlYXJGbGFnID0gTGF5YS5CYXNlQ2FtZXJhLkNMRUFSRkxBR19ERVBUSE9OTFk7XHJcbiAgICAgICAvLyDpl67popjpgInpoblcclxuICAgICAgIGxldCByaWdodEFuc3dlckluZGV4ID0gMDtcclxuICAgICAgIGxldCBxdWVzdGlvblRpdEJveEggPSBxdWVzdGlvblRpdEJveC5oZWlnaHQ7XHJcbiAgICAgICBsZXQgcXVlc3Rpb25UaXRCb3hXID0gcXVlc3Rpb25UaXRCb3gud2lkdGg7XHJcbiAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHF1ZXN0aW9uRGF0YS5vcHRpb24ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICB2YXIgb3B0aW9uQm94ID0gTGF5YS5Qb29sLmdldEl0ZW1CeUNsYXNzKCdCb3gnLCBMYXlhLlNwcml0ZSk7XHJcbiAgICAgICAgICAgb3B0aW9uQm94Lm5hbWUgPSAnb3B0aW9uQm94JyArIGk7XHJcbiAgICAgICAgICAgb3B0aW9uQm94LmxvYWRJbWFnZSgnaW5mby8nICsgaSArICcucG5nJyk7XHJcbiAgICAgICAgICAgb3B0aW9uQm94LnBvcyggNzUgKiB0aGlzLnNjYWxlLHF1ZXN0aW9uVGl0Qm94SCArICgyMCArIGkgKiAxMDApICogdGhpcy5zY2FsZSk7XHJcbiAgICAgICAgICAgb3B0aW9uQm94LnNpemUocXVlc3Rpb25UaXRCb3hXIC0gMjAwICogdGhpcy5zY2FsZSwgOTAgKiB0aGlzLnNjYWxlKTtcclxuICAgICAgICAgICB2YXIgb3B0aW9uID0gTGF5YS5Qb29sLmdldEl0ZW1CeUNsYXNzKCdUeHQnLCBMYXlhLlRleHQpOy8vIOmAiemhueWGheWuuVxyXG4gICAgICAgICAgIG9wdGlvbi5jb2xvciA9ICcjMDAwJztcclxuICAgICAgICAgICBvcHRpb24uZm9udFNpemUgPSB0aGlzLmFkYXB0YXRpb24oMjIsNjAsNDAgKiB0aGlzLnNjYWxlKTtcclxuICAgICAgICAgICBvcHRpb24ucG9zKDgwICogdGhpcy5zY2FsZSwgNDAgKiB0aGlzLnNjYWxlKTtcclxuICAgICAgICAgICBvcHRpb24udGV4dCA9IHF1ZXN0aW9uRGF0YS5vcHRpb25baV07XHJcbiAgICAgICAgICAgaWYgKHF1ZXN0aW9uRGF0YS5vcHRpb25baV0ubGVuZ3RoID4gMTgpIHtcclxuICAgICAgICAgICAgICAgb3B0aW9uLmZvbnRTaXplID0gdGhpcy5hZGFwdGF0aW9uKDE4LDMwLDMwICogdGhpcy5zY2FsZSk7XHJcbiAgICAgICAgICAgICAgIG9wdGlvbi53b3JkV3JhcCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgIG9wdGlvbi53aWR0aCA9IDMyMCAqIHRoaXMuc2NhbGU7XHJcbiAgICAgICAgICAgICAgIGlmIChxdWVzdGlvbkRhdGEub3B0aW9uW2ldLmxlbmd0aCA+IDQ0KSB7XHJcbiAgICAgICAgICAgICAgICAgICBvcHRpb24ucG9zKDYwICogdGhpcy5zY2FsZSwgMjIgKiB0aGlzLnNjYWxlKTtcclxuICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgIH1cclxuICAgICAgICAgICBvcHRpb25Cb3guYWRkQ2hpbGQob3B0aW9uKTtcclxuXHJcbiAgICAgICAgICAgdmFyIHByb21wdCA9IExheWEuUG9vbC5nZXRJdGVtQnlDbGFzcygnQm94JywgTGF5YS5TcHJpdGUpOy8vIOWvueWPt+aIluiAhemUmeWPt1xyXG4gICAgICAgICAgIHByb21wdC5wb3Mob3B0aW9uQm94LndpZHRoIC0gMzAgKiB0aGlzLnNjYWxlLCAxMCAqIHRoaXMuc2NhbGUpO1xyXG4gICAgICAgICAgIHByb21wdC52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgcHJvbXB0Lm5hbWUgPSAncHJvbXB0JztcclxuICAgICAgICAgICBpZiAocXVlc3Rpb25EYXRhLm9wdGlvbltpXSA9PT0gcXVlc3Rpb25EYXRhLnJpZ2h0QW5zd2VyKSB7XHJcbiAgICAgICAgICAgICAgIHByb21wdC5sb2FkSW1hZ2UoJ2luZm8vcmlnaHQucG5nJyk7XHJcbiAgICAgICAgICAgICAgIHByb21wdC5zaXplKDYyICogdGhpcy5zY2FsZSwgNTAgKiB0aGlzLnNjYWxlKTtcclxuICAgICAgICAgICAgICAgcmlnaHRBbnN3ZXJJbmRleCA9IGk7XHJcbiAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgcHJvbXB0LmxvYWRJbWFnZSgnaW5mby93cm9uZy5wbmcnKTtcclxuICAgICAgICAgICAgICAgcHJvbXB0LnNpemUoNTAgKiB0aGlzLnNjYWxlLCA1MCAqIHRoaXMuc2NhbGUpO1xyXG4gICAgICAgICAgIH1cclxuICAgICAgICAgICBvcHRpb25Cb3guYWRkQ2hpbGQocHJvbXB0KTtcclxuXHJcbiAgICAgICAgICAgb3B0aW9uQm94Lm9uKExheWEuRXZlbnQuQ0xJQ0ssIHRoaXMsIHRoaXMuYW5zd2VyQ2xpY2ssIFtxdWVzdGlvbkRhdGEscXVlc3Rpb25EYXRhLm9wdGlvbltpXSwgaSwgdGV4aWFvXSk7XHJcbiAgICAgICAgICAgdGhpcy5xdWVzdGlvbkJveC5hZGRDaGlsZChvcHRpb25Cb3gpO1xyXG4gICAgICAgfVxyXG4gICAgICAgbGV0IGFuYWx5c2lzID0gTGF5YS5Qb29sLmdldEl0ZW1CeUNsYXNzKCdCdG4nLExheWEuQnV0dG9uKTsvLyDnrZTmoYjop6PmnpBcclxuICAgICAgIGFuYWx5c2lzLnNraW4gPSAnaW5mby9hbmFseXNpcy5wbmcnO1xyXG4gICAgICAgYW5hbHlzaXMubmFtZSA9ICdhbmFseXNpcyc7XHJcbiAgICAgICBhbmFseXNpcy5zdGF0ZU51bSA9IDE7XHJcbiAgICAgICBhbmFseXNpcy5zaXplKDUyICogdGhpcy5zY2FsZSwgNjkgKiB0aGlzLnNjYWxlKTtcclxuICAgICAgIGFuYWx5c2lzLnBvcyhxdWVzdGlvblRpdEJveFcgLSAxMDAgKiB0aGlzLnNjYWxlLCBxdWVzdGlvblRpdEJveEggKyAoMzAgKyByaWdodEFuc3dlckluZGV4ICogMTAwKSAqIHRoaXMuc2NhbGUpO1xyXG4gICAgICAgYW5hbHlzaXMudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgYW5hbHlzaXMub24oTGF5YS5FdmVudC5DTElDSyx0aGlzLHRoaXMuYW5hbHlzaXNDbGljayxbcXVlc3Rpb25EYXRhXSk7XHJcbiAgICAgICB0aGlzLnF1ZXN0aW9uQm94LmFkZENoaWxkKGFuYWx5c2lzKTtcclxuICAgIH1cclxuXHJcbiAgICByZWNvdmVyUXVlc3Rpb24gKGJhY2spIHtcclxuICAgICAgICAvLyB0aGlzLnF1ZXN0aW9uQm94LmRlc3Ryb3lDaGlsZHJlbigpO1xyXG4gICAgICAgIHRoaXMucXVlc3Rpb25Cb3gucmVtb3ZlQ2hpbGRyZW4oKTtcclxuICAgICAgICBpZiAoYmFjaykge1xyXG4gICAgICAgICAgICBMYXlhLlBvb2wuY2xlYXJCeVNpZ24oJ0JveCcpO1xyXG4gICAgICAgICAgICBMYXlhLlBvb2wuY2xlYXJCeVNpZ24oJ1R4dCcpO1xyXG4gICAgICAgICAgICBMYXlhLlBvb2wuY2xlYXJCeVNpZ24oJ0J0bicpO1xyXG4gICAgICAgICAgICBMYXlhLlBvb2wuY2xlYXJCeVNpZ24oJ2FuQm94Jyk7XHJcbiAgICAgICAgICAgIExheWEuUG9vbC5jbGVhckJ5U2lnbignYW5UeHQnKTtcclxuICAgICAgICAgICAgTGF5YS5sb2FkZXIuY2xlYXJSZXModGV4aWFvVXJsKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBMYXlhLlBvb2wucmVjb3ZlckJ5Q2xhc3MoJ0JveCcpO1xyXG4gICAgICAgICAgICBMYXlhLlBvb2wucmVjb3ZlckJ5Q2xhc3MoJ1R4dCcpO1xyXG4gICAgICAgICAgICBMYXlhLlBvb2wucmVjb3ZlckJ5Q2xhc3MoJ0J0bicpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhbmFseXNpc0NsaWNrIChxdWVzdGlvbkRhdGEpIHtcclxuICAgICAgICBsZXQgYW5hbHlzaXNQYWdlID0gTGF5YS5Qb29sLmdldEl0ZW1CeUNsYXNzKCdhbkJveCcsTGF5YS5TcHJpdGUpO1xyXG4gICAgICAgIGFuYWx5c2lzUGFnZS5ncmFwaGljcy5kcmF3UmVjdCgwLDAsTGF5YS5zdGFnZS53aWR0aCxMYXlhLnN0YWdlLmhlaWdodCwnIzAwMCcpO1xyXG4gICAgICAgIGFuYWx5c2lzUGFnZS5hbHBoYSA9IDAuMjtcclxuICAgICAgICBhbmFseXNpc1BhZ2Uuek9yZGVyID0gMjY7XHJcblxyXG4gICAgICAgIGxldCBhbmFseXNpc0JveCA9IExheWEuUG9vbC5nZXRJdGVtQnlDbGFzcygnYW5Cb3gnLExheWEuU3ByaXRlKTtcclxuICAgICAgICBhbmFseXNpc0JveC5sb2FkSW1hZ2UoJy4vcmVzL2FuYWx5c2lzLWJveC5wbmcnKTtcclxuICAgICAgICBhbmFseXNpc0JveC5zaXplKDg0MCAqIHRoaXMuc2NhbGUsIDg0MCAqIHRoaXMuc2NhbGUgLyA2ODAqMzkwKTtcclxuICAgICAgICBhbmFseXNpc0JveC56T3JkZXIgPSAyNztcclxuICAgICAgICBsZXQgbGVmdCA9IChMYXlhLnN0YWdlLndpZHRoIC0gYW5hbHlzaXNCb3gud2lkdGgpIC8gMjtcclxuICAgICAgICBsZXQgdG9wID0gKExheWEuc3RhZ2UuaGVpZ2h0IC0gYW5hbHlzaXNCb3guaGVpZ2h0KSAvIDI7XHJcbiAgICAgICAgYW5hbHlzaXNCb3gucG9zKGxlZnQsdG9wICsgNTAgKiB0aGlzLnNjYWxlKTtcclxuXHJcbiAgICAgICAgbGV0IGFuYWx5c2lzQ2xvc2UgPSBMYXlhLlBvb2wuZ2V0SXRlbUJ5Q2xhc3MoJ2FuQm94JyxMYXlhLlNwcml0ZSk7XHJcbiAgICAgICAgYW5hbHlzaXNDbG9zZS5sb2FkSW1hZ2UoJ2luZm8vYW5hbHlzaXMtY2xvc2UucG5nJyk7XHJcbiAgICAgICAgYW5hbHlzaXNDbG9zZS5zaXplKDUwICogdGhpcy5zY2FsZSwgNTAgKiB0aGlzLnNjYWxlKTtcclxuICAgICAgICBhbmFseXNpc0Nsb3NlLnBvcyhhbmFseXNpc0JveC53aWR0aCAtIDIwICogdGhpcy5zY2FsZSwgLTIwICogdGhpcy5zY2FsZSk7XHJcbiAgICAgICAgYW5hbHlzaXNCb3guYWRkQ2hpbGQoYW5hbHlzaXNDbG9zZSk7XHJcbiAgICAgICAgYW5hbHlzaXNDbG9zZS5vbihMYXlhLkV2ZW50LkNMSUNLLHRoaXMsdGhpcy5jbG9zZUFuYWx5c2lzLFthbmFseXNpc1BhZ2UsYW5hbHlzaXNCb3hdKTtcclxuXHJcbiAgICAgICAgbGV0IGFuYWx5c2lzVHh0ID0gTGF5YS5Qb29sLmdldEl0ZW1CeUNsYXNzKCdhblR4dCcsIExheWEuVGV4dCk7XHJcbiAgICAgICAgYW5hbHlzaXNUeHQudGV4dCA9IHF1ZXN0aW9uRGF0YS5hbmFseXNpcztcclxuICAgICAgICBhbmFseXNpc1R4dC5zaXplKDUzNSAqIHRoaXMuc2NhbGUsIDM1MCAqIHRoaXMuc2NhbGUpO1xyXG4gICAgICAgIGFuYWx5c2lzVHh0LmxlYWRpbmcgPSAxNTtcclxuICAgICAgICBhbmFseXNpc1R4dC53b3JkV3JhcCA9IHRydWU7XHJcbiAgICAgICAgYW5hbHlzaXNUeHQub3ZlcmZsb3cgPSBMYXlhLlRleHQuU0NST0xMOyAgICAgICAgYW5hbHlzaXNUeHQuZm9udFNpemUgPSA2MDtcclxuICAgICAgICBhbmFseXNpc1R4dC5wb3MoMjUwICogdGhpcy5zY2FsZSAsNjAgKiB0aGlzLnNjYWxlKTtcclxuICAgICAgICBhbmFseXNpc1R4dC5vbihMYXlhLkV2ZW50Lk1PVVNFX0RPV04sIHRoaXMsIHNjcm9sbFRleHQsW2FuYWx5c2lzVHh0XSk7XHJcbiAgICAgICAgYW5hbHlzaXNCb3guYWRkQ2hpbGQoYW5hbHlzaXNUeHQpO1xyXG4gICAgICAgIExheWEuc3RhZ2UuYWRkQ2hpbGQoYW5hbHlzaXNQYWdlKTtcclxuICAgICAgICBMYXlhLnN0YWdlLmFkZENoaWxkKGFuYWx5c2lzQm94KTtcclxuICAgIH1cclxuXHJcbiAgICBjbG9zZUFuYWx5c2lzKGFuYWx5c2lzUGFnZSxhbmFseXNpc0JveCkge1xyXG4gICAgICAgIExheWEuc3RhZ2UucmVtb3ZlQ2hpbGQoYW5hbHlzaXNQYWdlKTtcclxuICAgICAgICBMYXlhLnN0YWdlLnJlbW92ZUNoaWxkKGFuYWx5c2lzQm94KTtcclxuICAgICAgICBMYXlhLlBvb2wucmVjb3ZlckJ5Q2xhc3MoJ2FuQm94Jyk7XHRcclxuICAgICAgICBMYXlhLlBvb2wucmVjb3ZlckJ5Q2xhc3MoJ2FuVHh0Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgYW5zd2VyQ2xpY2sgKHF1ZXN0aW9uRGF0YSxhbnN3ZXIsYW5zd2VySW5kZXgsdGV4aWFvKSB7XHJcbiAgICAgICAgbGV0IG9wdGlvbkJveCA9IHRoaXMucXVlc3Rpb25Cb3guZ2V0Q2hpbGRCeU5hbWUoJ29wdGlvbkJveCcgKyBhbnN3ZXJJbmRleCk7XHJcbiAgICAgICAgaWYgKGFuc3dlciA9PT0gcXVlc3Rpb25EYXRhLnJpZ2h0QW5zd2VyKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbkJveC5nZXRDaGlsZEJ5TmFtZSgncHJvbXB0JykudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMucXVlc3Rpb25Cb3guZ2V0Q2hpbGRCeU5hbWUoJ2FuYWx5c2lzJykudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmFnZW50ICE9PSAnYWx2YSBzbWFsbCcpIHtcclxuICAgICAgICAgICAgICAgIExheWEuU291bmRNYW5hZ2VyLnBsYXlNdXNpYyhcIi4vcmVzL2F1ZGlvL3JpZ2h0Lm1wM1wiLDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIExheWEuc3RhZ2UuYWRkQ2hpbGQodGhpcy5zY2VuZSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2NlbmUuYWRkQ2hpbGQodGV4aWFvKTtcclxuICAgICAgICAgICAgTGF5YS50aW1lci5vbmNlKDEwMDAsIHRoaXMsICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjZW5lLnJlbW92ZUNoaWxkKHRleGlhbyk7XHJcbiAgICAgICAgICAgICAgICBMYXlhLnN0YWdlLnJlbW92ZUNoaWxkKHRoaXMuc2NlbmUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBvcHRpb25Cb3guZ2V0Q2hpbGRCeU5hbWUoJ3Byb21wdCcpLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5hZ2VudCAhPT0gJ2FsdmEgc21hbGwnKSB7XHJcbiAgICAgICAgICAgICAgICBMYXlhLlNvdW5kTWFuYWdlci5wbGF5TXVzaWMoXCIuL3Jlcy9hdWRpby93cm9uZy5tcDNcIiwxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsYXN0UXVlc3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnF1ZXN0aW9uSW5kZXggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVjb3ZlclF1ZXN0aW9uKGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5xdWVzdGlvbkluZGV4LS07XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlUXVlc3Rpb24oIHRoaXMucXVlc3Rpb25EYXRhW3RoaXMucXVlc3Rpb25JbmRleF0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCflt7Lnu4/mmK/nrKzkuIDpopjkuobvvIEnKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBuZXh0UXVlc3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnF1ZXN0aW9uSW5kZXggPCAgdGhpcy5xdWVzdGlvbkRhdGEubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLnJlY292ZXJRdWVzdGlvbihmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMucXVlc3Rpb25JbmRleCsrO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVF1ZXN0aW9uKCB0aGlzLnF1ZXN0aW9uRGF0YVt0aGlzLnF1ZXN0aW9uSW5kZXhdKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn5bey57uP5piv5pyA5ZCO5LiA6aKY5LqG77yBJylcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYmFjayAoKSB7XHJcbiAgICAgICAgdGhpcy5yZWNvdmVyUXVlc3Rpb24odHJ1ZSk7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5yZW1vdmVDaGlsZCh0aGlzLnF1ZXN0aW9uQm94KTtcclxuICAgICAgICBMYXlhLnN0YWdlLmdldENoaWxkQnlOYW1lKCdsYXN0UXVlc3Rpb24nKS5kZXN0cm95KCk7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5nZXRDaGlsZEJ5TmFtZSgnbmV4dFF1ZXN0aW9uJykuZGVzdHJveSgpO1xyXG4gICAgfVxyXG59XHJcblxyXG4iLCJpbXBvcnQge3Njcm9sbFRleHR9IGZyb20gJy4vc2NyaXB0L3V0aWxzJztcclxuY29uc3QgdGV4aWFvVXJsID0gJy4vcmVzL0xheWFTY2VuZV90ZXhpYW8vQ29udmVudGlvbmFsL3RleGlhby5saCc7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFF1ZXN0aW9uUGhvbmV7XHJcbiAgICBjb25zdHJ1Y3RvcihzY2VuZSxhZ2VudCxxdWVzdGlvbkRhdGEpe1xyXG4gICAgICAgIHRoaXMuc2NlbmUgPSBzY2VuZTtcclxuICAgICAgICB0aGlzLmFnZW50ID0gYWdlbnQ7XHJcbiAgICAgICAgdGhpcy5zY2FsZSA9IExheWEuQnJvd3Nlci53aWR0aCAvIDE5MjA7XHJcbiAgICAgICAgdGhpcy5xdWVzdGlvbkRhdGEgPSBxdWVzdGlvbkRhdGE7XHJcbiAgICAgICAgdGhpcy5xdWVzdGlvbkluZGV4ID0gMDtcclxuICAgICAgICBMYXlhLmxvYWRlci5sb2FkKFwicmVzL2F0bGFzL2luZm8uYXRsYXNcIiwgTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLCB0aGlzLmluaXRCdXR0b25zKSk7XHJcbiAgICAgICAgdGhpcy5xdWVzdGlvbkJveCA9IG5ldyBMYXlhLlNwcml0ZSgpO1xyXG4gICAgICAgIHRoaXMucXVlc3Rpb25Cb3guc2l6ZShMYXlhLnN0YWdlLndpZHRoLCBMYXlhLnN0YWdlLmhlaWdodCk7XHJcbiAgICAgICAgdGhpcy5xdWVzdGlvbkJveC5sb2FkSW1hZ2UoJy4vcmVzL3F1ZXN0aW9uLWJnLXAucG5nJyk7XHJcblx0XHR0aGlzLnF1ZXN0aW9uQm94LnBvcygwLCAwKTtcclxuXHRcdExheWEuc3RhZ2UuYWRkQ2hpbGQodGhpcy5xdWVzdGlvbkJveCk7XHJcbiAgICAgICAgdGhpcy5xdWVzdGlvbkJveC5jYWNoZUFzID0gJ2JpdG1hcCc7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGN1cnJRdWVzdGlvbkRhdGEgPSAgdGhpcy5xdWVzdGlvbkRhdGFbdGhpcy5xdWVzdGlvbkluZGV4XTsgLy8g5a2Y5YKo5b2T5YmN5bGV56S66Zeu6aKY55qE5pWw5o2uXHJcbiAgICAgICAgTGF5YS5sb2FkZXIuY3JlYXRlKFt0ZXhpYW9VcmxdLCBMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsIHRoaXMuY3JlYXRlUXVlc3Rpb24sIFtjdXJyUXVlc3Rpb25EYXRhXSwgZmFsc2UpKTtcclxuICAgICAgICAvLyB0aGlzLmluaXRCdXR0b25zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyogYnV0dG9u5aSE55CG5byA5aeLICovXHJcblx0aW5pdEJ1dHRvbnMgKCkge1xyXG4gICAgICAgIGxldCBFdmVudHMgPSBMYXlhLkV2ZW50O1xyXG5cdFx0bGV0IHNraW5zID0gW1xyXG5cdFx0XHQnaW5mby9sYXN0LXF1ZXN0aW9uLXAucG5nJywnaW5mby9uZXh0LXF1ZXN0aW9uLXAucG5nJyxcclxuXHRcdF1cclxuXHRcdGxldCBidG5OYW1lcyA9IFtcclxuXHRcdFx0J2xhc3RRdWVzdGlvbicsJ25leHRRdWVzdGlvbidcclxuXHRcdF1cclxuXHRcdGZvciAobGV0IGkgPSAwLCBsZW4gPSBza2lucy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG5cdFx0XHRsZXQgYnRuID0gdGhpcy5jcmVhdGVCdXR0b24oc2tpbnNbaV0sbnVsbCxidG5OYW1lc1tpXSk7XHJcblx0XHRcdGxldCB4ID0gMTQ4MCp0aGlzLnNjYWxlO1xyXG5cdFx0XHRsZXQgeSA9IDA7XHJcblx0XHRcdHN3aXRjaCAoaSkge1xyXG5cdFx0XHRcdGNhc2UgMDovLyDkuIrkuIDpophcclxuXHRcdFx0XHRcdHkgPSAxMjUqdGhpcy5zY2FsZTtcclxuXHRcdFx0XHRcdGJ0bi5vbihFdmVudHMuQ0xJQ0ssdGhpcyx0aGlzLmxhc3RRdWVzdGlvbik7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRjYXNlIDE6Ly8g5LiL5LiA6aKYXHJcblx0XHRcdFx0XHR5ID0gNDAwKnRoaXMuc2NhbGU7XHJcblx0XHRcdFx0XHRidG4ub24oRXZlbnRzLkNMSUNLLHRoaXMsdGhpcy5uZXh0UXVlc3Rpb24pO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdH1cclxuICAgICAgICAgICAgYnRuLnBvcyh4LHkpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Y3JlYXRlQnV0dG9uKHNraW4sdGV4dCxuYW1lKSB7XHJcblx0XHR2YXIgYnRuO1xyXG5cdFx0YnRuID0gbmV3IExheWEuQnV0dG9uKHNraW4sIHRleHQpO1xyXG5cdFx0YnRuLndpZHRoID0gNjYgKiB0aGlzLnNjYWxlO1xyXG4gICAgICAgIGJ0bi5oZWlnaHQgPSA1NSAqIHRoaXMuc2NhbGU7XHJcblx0XHRidG4ubmFtZSA9IG5hbWU7XHJcblx0XHRidG4uek9yZGVyID0gMjA7XHJcblx0XHRidG4uc3RhdGVOdW0gPSAxO1xyXG5cdFx0TGF5YS5zdGFnZS5hZGRDaGlsZChidG4pO1xyXG5cdFx0cmV0dXJuIGJ0bjtcclxuXHR9XHJcblxyXG4gICAgLy8g6YCC6YWNXHJcbiAgICBhZGFwdGF0aW9uIChhbGF2c21hbGwsaW9zLCBhbmRyb2lkKSB7XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLmFnZW50KSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ2FsdmEgc21hbGwnOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFsYXZzbWFsbDtcclxuICAgICAgICAgICAgY2FzZSAnaW9zJzpcclxuICAgICAgICAgICAgICAgIHJldHVybiBpb3MgfHwgYW5kcm9pZDtcclxuICAgICAgICAgICAgY2FzZSAnYW5kcm9pZCc6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYW5kcm9pZCB8fCBpb3M7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYWx2YWJpZyB8fCBjaHJvbWU7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBjcmVhdGVRdWVzdGlvbiAocXVlc3Rpb25EYXRhKSB7XHJcbiAgICAgICAgLy8g6Zeu6aKYXHJcbiAgICAgICAgdmFyIHF1ZXN0aW9uVGl0Qm94ID0gTGF5YS5Qb29sLmdldEl0ZW1CeUNsYXNzKCdCb3gnLCBMYXlhLlNwcml0ZSk7XHJcbiAgICAgICAgcXVlc3Rpb25UaXRCb3guc2l6ZSg5MjAgKiB0aGlzLnNjYWxlLCA2NTAgKiB0aGlzLnNjYWxlKTtcclxuICAgICAgICBsZXQgbGVmdCA9IChMYXlhLnN0YWdlLndpZHRoIC0gcXVlc3Rpb25UaXRCb3gud2lkdGgpIC8gMjtcclxuICAgICAgICBxdWVzdGlvblRpdEJveC5wb3MobGVmdCwgMzAgKiB0aGlzLnNjYWxlKTtcclxuICAgICAgICB2YXIgcXVlc3Rpb24gPSBMYXlhLlBvb2wuZ2V0SXRlbUJ5Q2xhc3MoJ1R4dCcsIExheWEuVGV4dCk7XHJcbiAgICAgICAgcXVlc3Rpb24ubGVhZGluZyA9IDEyO1xyXG4gICAgICAgIHF1ZXN0aW9uLmNvbG9yID0gJyNmZmYnO1xyXG4gICAgICAgIHF1ZXN0aW9uLmZvbnRTaXplID0gdGhpcy5hZGFwdGF0aW9uKDQ0ICogdGhpcy5zY2FsZSw0NCAqIHRoaXMuc2NhbGUpO1xyXG4gICAgICAgIHF1ZXN0aW9uLnRleHQgPSB0aGlzLnF1ZXN0aW9uSW5kZXggKyAxICsgJy4gJyArIHF1ZXN0aW9uRGF0YS5xdWVzdGlvbjtcclxuICAgICAgICBxdWVzdGlvbi53b3JkV3JhcCA9IHRydWU7XHJcbiAgICAgICAgcXVlc3Rpb24uc2l6ZSg2MDAgKiB0aGlzLnNjYWxlLCA0MTAgKiB0aGlzLnNjYWxlKTtcclxuICAgICAgICBpZiAocXVlc3Rpb25EYXRhLnF1ZXN0aW9uLmxlbmd0aCA8IDI5KSB7XHJcbiAgICAgICAgICAgIHF1ZXN0aW9uLnBvcygxNjAgKiB0aGlzLnNjYWxlLCAxNzAgKiB0aGlzLnNjYWxlKTtcclxuICAgICAgICB9IGVsc2UgeyAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHF1ZXN0aW9uLnBvcygxNjAgKiB0aGlzLnNjYWxlLCAxMDAgKiB0aGlzLnNjYWxlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcXVlc3Rpb25UaXRCb3guYWRkQ2hpbGQocXVlc3Rpb24pO1xyXG4gICAgICAgIHRoaXMucXVlc3Rpb25Cb3guYWRkQ2hpbGQocXVlc3Rpb25UaXRCb3gpO1xyXG5cclxuICAgICAgICAvLyDnrZTlr7nnibnmlYhcclxuICAgICAgICB2YXIgdGV4aWFvID0gTGF5YS5Mb2FkZXIuZ2V0UmVzKHRleGlhb1VybCk7XHJcbiAgICAgICAgdmFyIGNhbWVyYSA9IHRleGlhby5nZXRDaGlsZEJ5TmFtZShcIk1haW4gQ2FtZXJhXCIpO1xyXG4gICAgICAgIGNhbWVyYS5jbGVhckZsYWcgPSBMYXlhLkJhc2VDYW1lcmEuQ0xFQVJGTEFHX0RFUFRIT05MWTtcclxuXHJcbiAgICAgICAgLy8g6Zeu6aKY6YCJ6aG5XHJcbiAgICAgICAgbGV0IHJpZ2h0QW5zd2VySW5kZXggPSAwO1xyXG4gICAgICAgIGxldCBxdWVzdGlvblRpdEJveEggPSBxdWVzdGlvblRpdEJveC5oZWlnaHQ7XHJcbiAgICAgICAgbGV0IHF1ZXN0aW9uVGl0Qm94VyA9IHF1ZXN0aW9uVGl0Qm94LndpZHRoO1xyXG4gICAgICAgIGxldCBhbGxPcHRpb25Cb3ggPSBMYXlhLlBvb2wuZ2V0SXRlbUJ5Q2xhc3MoJ0JveCcsTGF5YS5TcHJpdGUpO1xyXG4gICAgICAgIGFsbE9wdGlvbkJveC5uYW1lID0gJ2FsbE9wdGlvbic7XHJcbiAgICAgICAgYWxsT3B0aW9uQm94LnNpemUoMTQwMCAqIHRoaXMuc2NhbGUsIDM0MCAqIHRoaXMuc2NhbGUpO1xyXG4gICAgICAgIGFsbE9wdGlvbkJveC5wb3MoKExheWEuc3RhZ2Uud2lkdGggLSBhbGxPcHRpb25Cb3gud2lkdGgpIC8gMiwgTGF5YS5zdGFnZS5oZWlnaHQgLSA0MjAgKiB0aGlzLnNjYWxlKTtcclxuICAgICAgICB0aGlzLnF1ZXN0aW9uQm94LmFkZENoaWxkKGFsbE9wdGlvbkJveCk7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBxdWVzdGlvbkRhdGEub3B0aW9uLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBvcHRpb25Cb3ggPSBMYXlhLlBvb2wuZ2V0SXRlbUJ5Q2xhc3MoJ0JveCcsIExheWEuU3ByaXRlKTtcclxuICAgICAgICAgICAgb3B0aW9uQm94Lm5hbWUgPSAnb3B0aW9uQm94JyArIGk7XHJcbiAgICAgICAgICAgIG9wdGlvbkJveC5sb2FkSW1hZ2UoJ2luZm8vJyArIGkgKyAnLXAucG5nJyk7XHJcbiAgICAgICAgICAgIC8vIDAgMSAyIDNcclxuICAgICAgICAgICAgc3dpdGNoIChpKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uQm94LnBvcyggMCAsIDApO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbkJveC5wb3MoIDgzMCAqIHRoaXMuc2NhbGUgLCAwKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb25Cb3gucG9zKCAwICwgMTUwICogdGhpcy5zY2FsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uQm94LnBvcyggODMwICogdGhpcy5zY2FsZSAsIDE1MCAqIHRoaXMuc2NhbGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wdGlvbkJveC5zaXplKDY4MCAqIHRoaXMuc2NhbGUsIDE0MCAqIHRoaXMuc2NhbGUpO1xyXG5cclxuICAgICAgICAgICAgdmFyIG9wdGlvbiA9IExheWEuUG9vbC5nZXRJdGVtQnlDbGFzcygnVHh0JywgTGF5YS5UZXh0KTsvLyDpgInpobnlhoXlrrlcclxuICAgICAgICAgICAgb3B0aW9uLmNvbG9yID0gJyMwMDAnO1xyXG4gICAgICAgICAgICBvcHRpb24uZm9udFNpemUgPSB0aGlzLmFkYXB0YXRpb24oNDAgKiB0aGlzLnNjYWxlLDQwICogdGhpcy5zY2FsZSk7XHJcbiAgICAgICAgICAgIG9wdGlvbi5wb3MoMTUwICogdGhpcy5zY2FsZSwgNjAgKiB0aGlzLnNjYWxlKTtcclxuICAgICAgICAgICAgb3B0aW9uLmNvbG9yID0gJyNmZmYnO1xyXG4gICAgICAgICAgICBvcHRpb24udGV4dCA9IHF1ZXN0aW9uRGF0YS5vcHRpb25baV07XHJcbiAgICAgICAgICAgIC8vIGlmIChxdWVzdGlvbkRhdGEub3B0aW9uW2ldLmxlbmd0aCA+IDE2KSB7XHJcbiAgICAgICAgICAgIC8vICAgICBvcHRpb24uZm9udFNpemUgPSAxNDtcclxuICAgICAgICAgICAgLy8gICAgIG9wdGlvbi53b3JkV3JhcCA9IHRydWU7XHJcbiAgICAgICAgICAgIC8vICAgICBvcHRpb24ud2lkdGggPSAzMjAgKiB0aGlzLnNjYWxlO1xyXG4gICAgICAgICAgICAvLyAgICAgaWYgKHF1ZXN0aW9uRGF0YS5vcHRpb25baV0ubGVuZ3RoID4gNDIpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICBvcHRpb24ucG9zKDYwICogdGhpcy5zY2FsZSwgMjIgKiB0aGlzLnNjYWxlKTtcclxuICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICBvcHRpb25Cb3guYWRkQ2hpbGQob3B0aW9uKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBwcm9tcHQgPSBMYXlhLlBvb2wuZ2V0SXRlbUJ5Q2xhc3MoJ0JveCcsIExheWEuU3ByaXRlKTsvLyDlr7nlj7fmiJbogIXplJnlj7dcclxuICAgICAgICAgICAgcHJvbXB0LnBvcyhvcHRpb25Cb3gud2lkdGggLSA4MCAqIHRoaXMuc2NhbGUsIDQwICogdGhpcy5zY2FsZSk7XHJcbiAgICAgICAgICAgIHByb21wdC52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHByb21wdC5uYW1lID0gJ3Byb21wdCc7XHJcbiAgICAgICAgICAgIGlmIChxdWVzdGlvbkRhdGEub3B0aW9uW2ldID09PSBxdWVzdGlvbkRhdGEucmlnaHRBbnN3ZXIpIHtcclxuICAgICAgICAgICAgICAgIHByb21wdC5sb2FkSW1hZ2UoJ2luZm8vcmlnaHQucG5nJyk7XHJcbiAgICAgICAgICAgICAgICBwcm9tcHQuc2l6ZSgxMDAgKiB0aGlzLnNjYWxlLCA4MCAqIHRoaXMuc2NhbGUpO1xyXG4gICAgICAgICAgICAgICAgcmlnaHRBbnN3ZXJJbmRleCA9IGk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBwcm9tcHQubG9hZEltYWdlKCdpbmZvL3dyb25nLnBuZycpO1xyXG4gICAgICAgICAgICAgICAgcHJvbXB0LnNpemUoODAgKiB0aGlzLnNjYWxlLCA4MCAqIHRoaXMuc2NhbGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wdGlvbkJveC5hZGRDaGlsZChwcm9tcHQpO1xyXG5cclxuICAgICAgICAgICAgb3B0aW9uQm94Lm9uKExheWEuRXZlbnQuQ0xJQ0ssIHRoaXMsIHRoaXMuYW5zd2VyQ2xpY2ssIFtxdWVzdGlvbkRhdGEscXVlc3Rpb25EYXRhLm9wdGlvbltpXSwgaSwgdGV4aWFvXSk7XHJcblxyXG4gICAgICAgICAgICBhbGxPcHRpb25Cb3guYWRkQ2hpbGQob3B0aW9uQm94KTtcclxuICAgICAgICB9ICAgXHJcbiAgICAgICAgbGV0IGFuYWx5c2lzID0gTGF5YS5Qb29sLmdldEl0ZW1CeUNsYXNzKCdCdG4nLExheWEuQnV0dG9uKTsvLyDnrZTmoYjop6PmnpBcclxuICAgICAgICBhbmFseXNpcy5za2luID0gJ2luZm8vYW5hbHlzaXMtcC5wbmcnO1xyXG4gICAgICAgIGFuYWx5c2lzLm5hbWUgPSAnYW5hbHlzaXMnO1xyXG4gICAgICAgIGFuYWx5c2lzLnN0YXRlTnVtID0gMTtcclxuICAgICAgICBhbmFseXNpcy5zaXplKDEwMCAqIHRoaXMuc2NhbGUsIDEzMSAqIHRoaXMuc2NhbGUpO1xyXG4gICAgICAgIHN3aXRjaChyaWdodEFuc3dlckluZGV4KSB7XHJcbiAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgIGFuYWx5c2lzLnBvcyg3MDAgKiB0aGlzLnNjYWxlLCAzMCAqIHRoaXMuc2NhbGUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIGFuYWx5c2lzLnBvcygxNTMwICogdGhpcy5zY2FsZSwgMzAgKiB0aGlzLnNjYWxlKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICBhbmFseXNpcy5wb3MoNzAwICogdGhpcy5zY2FsZSwgMTgwICogdGhpcy5zY2FsZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgYW5hbHlzaXMucG9zKDE1MzAgKiB0aGlzLnNjYWxlLCAxODAgKiB0aGlzLnNjYWxlKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBhbmFseXNpcy52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgYW5hbHlzaXMub24oTGF5YS5FdmVudC5DTElDSyx0aGlzLHRoaXMuYW5hbHlzaXNDbGljayxbcXVlc3Rpb25EYXRhXSk7XHJcbiAgICAgICAgYWxsT3B0aW9uQm94LmFkZENoaWxkKGFuYWx5c2lzKTtcclxuICAgIH1cclxuXHJcbiAgICByZWNvdmVyUXVlc3Rpb24gKGJhY2spIHtcclxuICAgICAgICAvLyB0aGlzLnF1ZXN0aW9uQm94LmRlc3Ryb3lDaGlsZHJlbigpO1xyXG4gICAgICAgIHRoaXMucXVlc3Rpb25Cb3gucmVtb3ZlQ2hpbGRyZW4oKTtcclxuICAgICAgICBpZiAoYmFjaykge1xyXG4gICAgICAgICAgICBMYXlhLlBvb2wuY2xlYXJCeVNpZ24oJ0JveCcpO1xyXG4gICAgICAgICAgICBMYXlhLlBvb2wuY2xlYXJCeVNpZ24oJ1R4dCcpO1xyXG4gICAgICAgICAgICBMYXlhLlBvb2wuY2xlYXJCeVNpZ24oJ0J0bicpO1xyXG4gICAgICAgICAgICBMYXlhLlBvb2wuY2xlYXJCeVNpZ24oJ2FuQm94Jyk7XHJcbiAgICAgICAgICAgIExheWEuUG9vbC5jbGVhckJ5U2lnbignYW5UeHQnKTtcclxuICAgICAgICAgICAgTGF5YS5sb2FkZXIuY2xlYXJSZXModGV4aWFvVXJsKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBMYXlhLlBvb2wucmVjb3ZlckJ5Q2xhc3MoJ0JveCcpO1xyXG4gICAgICAgICAgICBMYXlhLlBvb2wucmVjb3ZlckJ5Q2xhc3MoJ1R4dCcpO1xyXG4gICAgICAgICAgICBMYXlhLlBvb2wucmVjb3ZlckJ5Q2xhc3MoJ0J0bicpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhbmFseXNpc0NsaWNrIChxdWVzdGlvbkRhdGEpIHtcclxuICAgICAgICBsZXQgYW5hbHlzaXNQYWdlID0gTGF5YS5Qb29sLmdldEl0ZW1CeUNsYXNzKCdhbkJveCcsTGF5YS5TcHJpdGUpO1xyXG4gICAgICAgIGFuYWx5c2lzUGFnZS5ncmFwaGljcy5kcmF3UmVjdCgwLDAsTGF5YS5zdGFnZS53aWR0aCxMYXlhLnN0YWdlLmhlaWdodCwnIzAwMCcpO1xyXG4gICAgICAgIGFuYWx5c2lzUGFnZS5hbHBoYSA9IDAuMjtcclxuICAgICAgICBhbmFseXNpc1BhZ2Uuek9yZGVyID0gMjY7XHJcblxyXG4gICAgICAgIGxldCBhbmFseXNpc0JveCA9IExheWEuUG9vbC5nZXRJdGVtQnlDbGFzcygnYW5Cb3gnLExheWEuU3ByaXRlKTtcclxuICAgICAgICBhbmFseXNpc0JveC5sb2FkSW1hZ2UoJy4vcmVzL2FuYWx5c2lzLWJveC1wLnBuZycpO1xyXG4gICAgICAgIGFuYWx5c2lzQm94LnNpemUoMTI5NyAqIHRoaXMuc2NhbGUsIDc0NCAqIHRoaXMuc2NhbGUpO1xyXG4gICAgICAgIGFuYWx5c2lzQm94LnpPcmRlciA9IDI3O1xyXG4gICAgICAgIGxldCBsZWZ0ID0gKExheWEuc3RhZ2Uud2lkdGggLSBhbmFseXNpc0JveC53aWR0aCkgLyAyO1xyXG4gICAgICAgIGxldCB0b3AgPSAoTGF5YS5zdGFnZS5oZWlnaHQgLSBhbmFseXNpc0JveC5oZWlnaHQpIC8gMjtcclxuICAgICAgICBhbmFseXNpc0JveC5wb3MobGVmdCx0b3ApO1xyXG5cclxuICAgICAgICBsZXQgYW5hbHlzaXNDbG9zZSA9IExheWEuUG9vbC5nZXRJdGVtQnlDbGFzcygnYW5Cb3gnLExheWEuU3ByaXRlKTtcclxuICAgICAgICBhbmFseXNpc0Nsb3NlLmxvYWRJbWFnZSgnaW5mby9hbmFseXNpcy1jbG9zZS5wbmcnKTtcclxuICAgICAgICBhbmFseXNpc0Nsb3NlLnNpemUoMTAwICogdGhpcy5zY2FsZSwgMTAwICogdGhpcy5zY2FsZSk7XHJcbiAgICAgICAgYW5hbHlzaXNDbG9zZS5wb3MoYW5hbHlzaXNCb3gud2lkdGggLSA1MCAqIHRoaXMuc2NhbGUsIC01MCAqIHRoaXMuc2NhbGUpO1xyXG4gICAgICAgIGFuYWx5c2lzQm94LmFkZENoaWxkKGFuYWx5c2lzQ2xvc2UpO1xyXG4gICAgICAgIGFuYWx5c2lzQ2xvc2Uub24oTGF5YS5FdmVudC5DTElDSyx0aGlzLHRoaXMuY2xvc2VBbmFseXNpcyxbYW5hbHlzaXNQYWdlLGFuYWx5c2lzQm94XSk7XHJcblxyXG4gICAgICAgIGxldCBhbmFseXNpc1R4dCA9IExheWEuUG9vbC5nZXRJdGVtQnlDbGFzcygnYW5UeHQnLCBMYXlhLlRleHQpO1xyXG4gICAgICAgIGFuYWx5c2lzVHh0LnRleHQgPSBxdWVzdGlvbkRhdGEuYW5hbHlzaXM7XHJcbiAgICAgICAgYW5hbHlzaXNUeHQuc2l6ZSg4MTAgKiB0aGlzLnNjYWxlLCA1NjAgKiB0aGlzLnNjYWxlKTtcclxuICAgICAgICBhbmFseXNpc1R4dC5sZWFkaW5nID0gMTU7XHJcbiAgICAgICAgYW5hbHlzaXNUeHQud29yZFdyYXAgPSB0cnVlO1xyXG4gICAgICAgIGFuYWx5c2lzVHh0Lm92ZXJmbG93ID0gTGF5YS5UZXh0LlNDUk9MTDs7XHJcbiAgICAgICAgYW5hbHlzaXNUeHQuZm9udFNpemUgPSB0aGlzLmFkYXB0YXRpb24oNDQgKiB0aGlzLnNjYWxlLDQ0ICogdGhpcy5zY2FsZSk7XHJcbiAgICAgICAgaWYgKHF1ZXN0aW9uRGF0YS5hbmFseXNpcy5sZW5ndGggPCA4MCkgeyAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGFuYWx5c2lzVHh0LnBvcygzODAgKiB0aGlzLnNjYWxlICwyNTAgKiB0aGlzLnNjYWxlKTtcclxuICAgICAgICB9IGVsc2UgeyAgIFxyXG4gICAgICAgICAgICBhbmFseXNpc1R4dC5wb3MoMzgwICogdGhpcy5zY2FsZSAsOTAgKiB0aGlzLnNjYWxlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYW5hbHlzaXNUeHQub24oTGF5YS5FdmVudC5NT1VTRV9ET1dOLCB0aGlzLCBzY3JvbGxUZXh0LFthbmFseXNpc1R4dF0pO1xyXG4gICAgICAgIGFuYWx5c2lzQm94LmFkZENoaWxkKGFuYWx5c2lzVHh0KTtcclxuICAgICAgICBMYXlhLnN0YWdlLmFkZENoaWxkKGFuYWx5c2lzUGFnZSk7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5hZGRDaGlsZChhbmFseXNpc0JveCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xvc2VBbmFseXNpcyhhbmFseXNpc1BhZ2UsYW5hbHlzaXNCb3gpIHtcclxuICAgICAgICBMYXlhLnN0YWdlLnJlbW92ZUNoaWxkKGFuYWx5c2lzUGFnZSk7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5yZW1vdmVDaGlsZChhbmFseXNpc0JveCk7XHJcbiAgICAgICAgTGF5YS5Qb29sLnJlY292ZXJCeUNsYXNzKCdhbkJveCcpO1x0XHJcbiAgICAgICAgTGF5YS5Qb29sLnJlY292ZXJCeUNsYXNzKCdhblR4dCcpO1xyXG4gICAgfVxyXG5cclxuICAgIGFuc3dlckNsaWNrIChxdWVzdGlvbkRhdGEsYW5zd2VyLGFuc3dlckluZGV4LHRleGlhbykge1xyXG4gICAgICAgIGxldCBvcHRpb25Cb3ggPSB0aGlzLnF1ZXN0aW9uQm94LmdldENoaWxkQnlOYW1lKCdhbGxPcHRpb24nKS5nZXRDaGlsZEJ5TmFtZSgnb3B0aW9uQm94JyArIGFuc3dlckluZGV4KTtcclxuICAgICAgICBpZiAoYW5zd2VyID09PSBxdWVzdGlvbkRhdGEucmlnaHRBbnN3ZXIpIHtcclxuICAgICAgICAgICAgb3B0aW9uQm94LmdldENoaWxkQnlOYW1lKCdwcm9tcHQnKS52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5xdWVzdGlvbkJveC5nZXRDaGlsZEJ5TmFtZSgnYWxsT3B0aW9uJykuZ2V0Q2hpbGRCeU5hbWUoJ2FuYWx5c2lzJykudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIExheWEuc3RhZ2UuYWRkQ2hpbGQodGhpcy5zY2VuZSk7XHJcbiAgICAgICAgICAgIExheWEuU291bmRNYW5hZ2VyLnBsYXlNdXNpYyhcIi4vcmVzL2F1ZGlvL3JpZ2h0Lm1wM1wiLDEpO1xyXG4gICAgICAgICAgICB0aGlzLnNjZW5lLmFkZENoaWxkKHRleGlhbyk7XHJcbiAgICAgICAgICAgIExheWEudGltZXIub25jZSgxMDAwLCB0aGlzLCAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2VuZS5yZW1vdmVDaGlsZCh0ZXhpYW8pO1xyXG4gICAgICAgICAgICAgICAgTGF5YS5zdGFnZS5yZW1vdmVDaGlsZCh0aGlzLnNjZW5lKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgTGF5YS5Tb3VuZE1hbmFnZXIucGxheU11c2ljKFwiLi9yZXMvYXVkaW8vd3JvbmcubXAzXCIsMSk7XHJcbiAgICAgICAgICAgIG9wdGlvbkJveC5nZXRDaGlsZEJ5TmFtZSgncHJvbXB0JykudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGxhc3RRdWVzdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucXVlc3Rpb25JbmRleCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5yZWNvdmVyUXVlc3Rpb24oZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLnF1ZXN0aW9uSW5kZXgtLTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVRdWVzdGlvbiggdGhpcy5xdWVzdGlvbkRhdGFbdGhpcy5xdWVzdGlvbkluZGV4XSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+W3sue7j+aYr+esrOS4gOmimOS6hu+8gScpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG5leHRRdWVzdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucXVlc3Rpb25JbmRleCA8ICB0aGlzLnF1ZXN0aW9uRGF0YS5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVjb3ZlclF1ZXN0aW9uKGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5xdWVzdGlvbkluZGV4Kys7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlUXVlc3Rpb24oIHRoaXMucXVlc3Rpb25EYXRhW3RoaXMucXVlc3Rpb25JbmRleF0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCflt7Lnu4/mmK/mnIDlkI7kuIDpopjkuobvvIEnKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBiYWNrICgpIHtcclxuICAgICAgICB0aGlzLnJlY292ZXJRdWVzdGlvbih0cnVlKTtcclxuICAgICAgICBMYXlhLnN0YWdlLnJlbW92ZUNoaWxkKHRoaXMucXVlc3Rpb25Cb3gpO1xyXG4gICAgICAgIExheWEuc3RhZ2UuZ2V0Q2hpbGRCeU5hbWUoJ2xhc3RRdWVzdGlvbicpLmRlc3Ryb3koKTtcclxuICAgICAgICBMYXlhLnN0YWdlLmdldENoaWxkQnlOYW1lKCduZXh0UXVlc3Rpb24nKS5kZXN0cm95KCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbiIsImltcG9ydCB7Z2V0VXNlckFnZW50LHNldFNlbnNpdGl2aXR5LGN0cm9sU2NhbGUsaXNMc0ZpbGUsaXNYRGlyZWNXcm9uZyxpc05vQmFja0ltZ30gZnJvbSAnLi91dGlscyc7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJpZ01vdmVTY3JpcHQgZXh0ZW5kcyBMYXlhLlNjcmlwdDNEey8vIEVTNuexu+eahOe7p+aJv++8jOe7p+aJv+eItuexu+eahOWxnuaAp+WSjOaWueazleOAgue7p+aJv+Wunui0qO+8muWFiOWIm+W7uueItuexu+eahOWunuS+i+WvueixoXRoaXPvvIznhLblkI7lho3nlKjlrZDnsbvnmoTmnoTpgKDlh73mlbDkv67mlLl0aGlzO1xyXG5cdGNvbnN0cnVjdG9yKCl7XHJcblx0XHQvLyBzdXBlcuS9nOS4uuWvueixoeS9v+eUqOeahOivneWPr+S7peeUqOadpeiwg+eUqOeItuexu+S4reWOn+Wei+S4iueahOaWueazle+8iOS4jeiDveiwg+eUqOWunuS+i+eahOaWueazleWxnuaApy1jb25zdHJ1Y3RvcuS4reeahO+8ie+8jOS9nOS4uuWHveaVsOS9v+eUqOS7o+ihqOeItuexu+eahOaehOmAoOWHveaVsFxyXG5cdFx0c3VwZXIoKTsvLyDooajnpLrniLbnsbvnmoTmnoTpgKDlh73mlbDvvIzosIPnlKjniLbnsbvnmoRjb25zdHJ1Y3RvciznlKjmnaXmlrDlu7rniLbnsbvnmoR0aGlz5a+56LGh77yb5a2Q57G75b+F6aG75ZyoY29uc3RydWN0b3Lmlrnms5XkuK3osIPnlKhzdXBlcigp5pa55rOV77yM5Zug5Li65a2Q57G75rKh5pyJ6Ieq5bex55qEdGhpc+Wvueixoe+8jOiAjOaYr+e7p+aJv+eItuexu+eahHRoaXPlr7nosaHvvIznhLblkI7lr7nlhbbov5vooYzliqDlt6XvvJvlpoLmnpzkuI3osIPnlKhzdXBlcu+8jOWtkOexu+WwseW+l+S4jeWIsHRoaXPlr7nosaHvvJtcclxuXHRcdHRoaXMuc2NlbmUgPSBudWxsO1xyXG5cdFx0dGhpcy5sYXN0UG9zaXRpb24gPSBuZXcgTGF5YS5WZWN0b3IyKDAsIDApO1xyXG5cdFx0dGhpcy5kaXN0YW5jZSA9IDAuMDtcclxuXHRcdHRoaXMuZGlzRmlyc3RUb3VjaCA9IG5ldyBMYXlhLlZlY3RvcjIoMCwgMCk7XHJcblx0XHR0aGlzLmRpc0xhc3RUb3VjaCA9IG5ldyBMYXlhLlZlY3RvcjIoMCwgMCk7XHJcblx0XHR0aGlzLmlzVHdvVG91Y2ggPSBmYWxzZTtcclxuXHRcdHRoaXMuZmlyc3QgPSB0cnVlO1xyXG5cdFx0dGhpcy50d29GaXJzdCA9IHRydWU7XHJcblx0XHR0aGlzLnJvdGF0ZSA9IG5ldyBMYXlhLlZlY3RvcjMoMCwwLDApO1xyXG5cdFx0dGhpcy50cmFuc2xhdGUgPSBuZXcgTGF5YS5WZWN0b3IzKDAsMCwwKTtcclxuXHRcdHRoaXMuc3ByaXRlM0RTYWNsZSA9IG5ldyBMYXlhLlZlY3RvcjMoMCwwLDApO1xyXG5cclxuXHRcdHRoaXMubW9kZWxSb3RhdGUgPSB0cnVlOy8v5qih5Z6L6buY6K6k6Ieq6L2s77yM5b2T55So5oi354K55Ye75Yiw5bGP5bmV5pe25Y+W5raI6Ieq6L2sXHJcblx0XHR0aGlzLmludHJvRGF0YSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cnJCb29rSW5mbycpKTtcclxuXHRcdHRoaXMuc2Vuc2l0aXZpdHkgPSBzZXRTZW5zaXRpdml0eSh0aGlzLmludHJvRGF0YSk7Ly8g54G15pWP5bqmXHJcblx0XHR0aGlzLmNsaWNrZWQgPSAxO1xyXG5cdFx0dGhpcy5jbGlja2VkVGltZSA9IHtcclxuXHRcdFx0J3RpbWVBJzonJyxcclxuXHRcdFx0J3RpbWVCJzonJ1xyXG5cdFx0fVxyXG5cdH1cclxuXHRcclxuICAgIC8qKlxyXG4gICAgICog56ys5LiA5qyh5omn6KGMdXBkYXRl5LmL5YmN5omn6KGM77yM5Y+q5Lya5omn6KGM5LiA5qyhXHJcbiAgICAgKi9cclxuXHRvblN0YXJ0KCl7XHJcblx0XHRpZiAoaXNMc0ZpbGUodGhpcy5pbnRyb0RhdGEuc3VibmFtZSkpIHtcclxuXHRcdFx0dGhpcy5zY2VuZSA9ICB0aGlzLm93bmVyLnBhcmVudDtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMuc2NlbmUgPSAgdGhpcy5vd25lci5wYXJlbnQucGFyZW50O1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5maXJzdFJvdGF0ZSA9IG5ldyBMYXlhLlF1YXRlcm5pb24odGhpcy5vd25lci50cmFuc2Zvcm0ucm90YXRpb24ueCx0aGlzLm93bmVyLnRyYW5zZm9ybS5yb3RhdGlvbi55LHRoaXMub3duZXIudHJhbnNmb3JtLnJvdGF0aW9uLnosdGhpcy5vd25lci50cmFuc2Zvcm0ucm90YXRpb24udyk7XHJcblx0XHR0aGlzLmZpcnN0UG9zaXRpb24gPSBuZXcgTGF5YS5WZWN0b3IzKHRoaXMub3duZXIudHJhbnNmb3JtLnBvc2l0aW9uLngsdGhpcy5vd25lci50cmFuc2Zvcm0ucG9zaXRpb24ueSx0aGlzLm93bmVyLnRyYW5zZm9ybS5wb3NpdGlvbi56KTtcclxuXHRcdC8vIExheWEuc3RhZ2Uub24oTGF5YS5FdmVudC5NT1VTRV9PVVQsdGhpcyx0aGlzLm9uTW91c2VPdXQpO1xyXG5cdFx0TGF5YS5zdGFnZS5vbihMYXlhLkV2ZW50Lk1PVVNFX1VQLHRoaXMsdGhpcy5vbk1vdXNlVXApO1xyXG5cdH1cclxuXHJcblx0b25Bd2FrZSgpe1xyXG5cdH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOavj+W4p+abtOaWsOaXtuaJp+ihjFxyXG4gICAgICovXHJcblx0b25VcGRhdGUoKXtcclxuXHRcdHZhciBtb2QgPSB0aGlzLm93bmVyO1xyXG5cdFx0aWYgKHRoaXMubW9kZWxSb3RhdGUgJiYgIWlzTm9CYWNrSW1nKHRoaXMuaW50cm9EYXRhLnN1Ym5hbWUpKSB7XHJcblx0XHRcdG1vZC50cmFuc2Zvcm0ucm90YXRlKG5ldyBMYXlhLlZlY3RvcjMoMCwwLjUsMCksZmFsc2UsZmFsc2UpO1xyXG5cdFx0fVxyXG5cdFx0bGV0IHRvdWNoQ291bnQgPSB0aGlzLnNjZW5lLmlucHV0LnRvdWNoQ291bnQoKTsvLyDojrflj5bop6bmkbjngrnkuKrmlbBcclxuXHRcdGlmICgxID09PSB0b3VjaENvdW50KXtcclxuXHRcdFx0Ly/liKTmlq3mmK/lkKbkuLrkuKTmjIfop6bmjqfvvIzmkqTljrvkuIDmoLnmiYvmjIflkI7lvJXlj5HnmoR0b3VjaENvdW50PT09MVxyXG5cdFx0XHRpZih0aGlzLmlzVHdvVG91Y2gpe1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cdFx0XHQvL+iOt+WPluW9k+WJjeeahOinpuaOp+eCue+8jOaVsOmHj+S4ujFcclxuXHRcdFx0bGV0IHRvdWNoID0gdGhpcy5zY2VuZS5pbnB1dC5nZXRUb3VjaCgwKTsvLyDojrflj5bop6bmkbjngrnvvIzlj4LmlbDku6PooajntKLlvJVcclxuXHRcdFx0Ly/mmK/lkKbkuLrmlrDkuIDmrKHop6bnorDvvIzlubbmnKrlj5HnlJ/np7vliqhcclxuXHRcdFx0aWYgKHRoaXMuZmlyc3Qpe1xyXG5cdFx0XHRcdC8v6I635Y+W6Kem56Kw54K555qE5L2N572uXHJcblx0XHRcdFx0dGhpcy5sYXN0UG9zaXRpb24ueCA9IHRvdWNoLl9wb3NpdGlvbi54O1xyXG5cdFx0XHRcdHRoaXMubGFzdFBvc2l0aW9uLnkgPSB0b3VjaC5fcG9zaXRpb24ueTtcclxuXHRcdFx0XHR0aGlzLmZpcnN0ID0gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZXtcclxuXHRcdFx0XHQvL+enu+WKqOinpueisOeCuVxyXG5cdFx0XHRcdGxldCBkZWx0YVlcclxuXHRcdFx0XHRpZiAoaXNYRGlyZWNXcm9uZyh0aGlzLmludHJvRGF0YS5zdWJuYW1lKSkge1xyXG5cdFx0XHRcdFx0ZGVsdGFZID0gIC0odGhpcy5sYXN0UG9zaXRpb24ueSAtIHRvdWNoLl9wb3NpdGlvbi55KTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0ZGVsdGFZID0gIHRoaXMubGFzdFBvc2l0aW9uLnkgLSB0b3VjaC5fcG9zaXRpb24ueTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGxldCBkZWx0YVggPSB0b3VjaC5fcG9zaXRpb24ueCAtIHRoaXMubGFzdFBvc2l0aW9uLng7XHJcblx0XHRcdFx0dGhpcy5sYXN0UG9zaXRpb24ueCA9IHRvdWNoLl9wb3NpdGlvbi54O1xyXG5cdFx0XHRcdHRoaXMubGFzdFBvc2l0aW9uLnkgPSB0b3VjaC5fcG9zaXRpb24ueTtcclxuXHRcdFx0XHQvL+agueaNruenu+WKqOeahOi3neemu+i/m+ihjOaXi+i9rFxyXG5cdFx0XHRcdGlmICh0aGlzLmludHJvRGF0YS5tYWlubmFtZSA9PT0gJ0NIRScpIHsgXHRcdFxyXG5cdFx0XHRcdFx0dGhpcy5yb3RhdGUuc2V0VmFsdWUoMCwgMSAqIGRlbHRhWCAvIDIsIDApO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHR0aGlzLnJvdGF0ZS5zZXRWYWx1ZSgxICogZGVsdGFZIC8yLCAxICogZGVsdGFYIC8gMiwgMCk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRtb2QudHJhbnNmb3JtLnJvdGF0ZSh0aGlzLnJvdGF0ZSxmYWxzZSxmYWxzZSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGVsc2UgaWYgKDIgPT09IHRvdWNoQ291bnQpe1xyXG5cdFx0XHR0aGlzLmlzVHdvVG91Y2ggPSB0cnVlO1xyXG5cdFx0XHQvL+iOt+WPluS4pOS4quinpueisOeCuVxyXG5cdFx0XHRsZXQgdG91Y2ggPSB0aGlzLnNjZW5lLmlucHV0LmdldFRvdWNoKDApO1xyXG5cdFx0XHRsZXQgdG91Y2gyID0gdGhpcy5zY2VuZS5pbnB1dC5nZXRUb3VjaCgxKTtcclxuXHRcdFx0Ly/mmK/lkKbkuLrmlrDkuIDmrKHop6bnorDvvIzlubbmnKrlj5HnlJ/np7vliqhcclxuXHRcdFx0aWYgKHRoaXMudHdvRmlyc3Qpe1xyXG5cdFx0XHRcdC8v6I635Y+W6Kem56Kw54K555qE5L2N572uXHJcblx0XHRcdFx0dGhpcy5kaXNGaXJzdFRvdWNoLnggPSB0b3VjaC5wb3NpdGlvbi54IC0gdG91Y2gyLnBvc2l0aW9uLng7XHJcblx0XHRcdFx0dGhpcy5kaXNGaXJzdFRvdWNoLnkgPSB0b3VjaC5wb3NpdGlvbi55IC0gdG91Y2gyLnBvc2l0aW9uLnk7XHJcblx0XHRcdFx0dGhpcy5kaXN0YW5jZSA9IExheWEuVmVjdG9yMi5zY2FsYXJMZW5ndGgodGhpcy5kaXNGaXJzdFRvdWNoKTsvLyDorqHnrpfmoIfph4/plb/luqZcclxuXHRcdFx0XHQvLyBjb25zb2xlLmxvZygnRmlyc3QgRGlzdGFuY2UnLHRoaXMuZGlzdGFuY2UpO1xyXG5cdFx0XHRcdHRoaXMuc3ByaXRlM0RTYWNsZSA9IG1vZC50cmFuc2Zvcm0uc2NhbGU7XHJcblxyXG5cdFx0XHRcdHRoaXMudG91Y2hBRmlyc3RYID0gdG91Y2gucG9zaXRpb24ueDtcclxuXHRcdFx0XHR0aGlzLnRvdWNoQUZpcnN0WSA9IHRvdWNoLnBvc2l0aW9uLnk7XHJcblx0XHRcdFx0dGhpcy50b3VjaEJGaXJzdFggPSB0b3VjaDIucG9zaXRpb24ueDtcclxuXHRcdFx0XHR0aGlzLnRvdWNoQkZpcnN0WSA9IHRvdWNoMi5wb3NpdGlvbi55O1xyXG5cclxuXHRcdFx0XHR0aGlzLnR3b0ZpcnN0ID0gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZXtcclxuXHRcdFx0XHQvLyDnvKnmlL5cclxuXHRcdFx0XHR0aGlzLmRpc0xhc3RUb3VjaC54ID0gdG91Y2gucG9zaXRpb24ueCAtIHRvdWNoMi5wb3NpdGlvbi54O1xyXG5cdFx0XHRcdHRoaXMuZGlzTGFzdFRvdWNoLnkgPSB0b3VjaC5wb3NpdGlvbi55IC0gdG91Y2gyLnBvc2l0aW9uLnk7XHJcblx0XHRcdFx0bGV0IGRpc3RhbmNlMiA9IExheWEuVmVjdG9yMi5zY2FsYXJMZW5ndGgodGhpcy5kaXNMYXN0VG91Y2gpO1xyXG5cdFx0XHRcdC8v5qC55o2u56e75Yqo55qE6Led56a76L+b6KGM57yp5pS+XHJcblx0XHRcdFx0bGV0IGZhY3RvciA9ICAwLjAwMSAqIChkaXN0YW5jZTIgLSB0aGlzLmRpc3RhbmNlKTtcclxuXHRcdFx0XHR0aGlzLnNwcml0ZTNEU2FjbGUueCArPSBmYWN0b3I7XHJcblx0XHRcdFx0dGhpcy5zcHJpdGUzRFNhY2xlLnkgKz0gZmFjdG9yO1xyXG5cdFx0XHRcdHRoaXMuc3ByaXRlM0RTYWNsZS56ICs9IGZhY3RvcjtcclxuXHRcdFx0XHRjdHJvbFNjYWxlKHRoaXMuaW50cm9EYXRhLHRoaXMuc3ByaXRlM0RTYWNsZS54LHRoaXMuc3ByaXRlM0RTYWNsZS55LHRoaXMuc3ByaXRlM0RTYWNsZS56KTtcclxuXHRcdFx0XHRtb2QudHJhbnNmb3JtLnNjYWxlID0gdGhpcy5zcHJpdGUzRFNhY2xlO1xyXG5cdFx0XHRcdHRoaXMuZGlzdGFuY2UgPSBkaXN0YW5jZTI7XHJcblx0XHRcdFx0Ly8gbGV0IGZhY3RvciA9IGRpc3RhbmNlMi90aGlzLmRpc3RhbmNlO1xyXG5cdFx0XHRcdC8vIGNvbnNvbGUubG9nKCdMYXN0IERpc3RhbmNlJyxkaXN0YW5jZTIpO1xyXG5cdFx0XHRcdC8vIGxldCB2YyA9IG5ldyBMYXlhLlZlY3RvcjMoZmFjdG9yLGZhY3RvcixmYWN0b3IpO1xyXG5cdFx0XHRcdC8vIG1vZC50cmFuc2Zvcm0uc2NhbGUgPSB2YztcclxuXHJcblxyXG5cdFx0XHRcdC8vIOenu+WKqFxyXG5cdFx0XHRcdHRoaXMudG91Y2hBTGFzdFggPSB0b3VjaC5wb3NpdGlvbi54O1xyXG5cdFx0XHRcdHRoaXMudG91Y2hBTGFzdFkgPSB0b3VjaC5wb3NpdGlvbi55O1xyXG5cdFx0XHRcdHRoaXMudG91Y2hCTGFzdFggPSB0b3VjaDIucG9zaXRpb24ueDtcclxuXHRcdFx0XHR0aGlzLnRvdWNoQkxhc3RZID0gdG91Y2gyLnBvc2l0aW9uLnk7XHJcblxyXG5cdFx0XHRcdGxldCBjZW50ZXJGaXJzdCA9IG5ldyBMYXlhLlBvaW50KCh0aGlzLnRvdWNoQUZpcnN0WCArIHRoaXMudG91Y2hCRmlyc3RYKSAvIDIsICh0aGlzLnRvdWNoQUZpcnN0WSArIHRoaXMudG91Y2hCRmlyc3RZKSAvIDIpOyBcclxuXHRcdFx0XHRsZXQgY2VudGVyTGFzdCA9IG5ldyBMYXlhLlBvaW50KCh0aGlzLnRvdWNoQUxhc3RYICsgdGhpcy50b3VjaEJMYXN0WCkgLyAyLCAodGhpcy50b3VjaEFMYXN0WSArIHRoaXMudG91Y2hCTGFzdFkpIC8gMik7XHJcblxyXG5cdFx0XHRcdGxldCBtb3ZlWCxtb3ZlWTtcclxuXHRcdFx0XHRpZiAoaXNYRGlyZWNXcm9uZyh0aGlzLmludHJvRGF0YS5zdWJuYW1lKSkge1xyXG5cdFx0XHRcdFx0bW92ZVggPSAtKGNlbnRlckZpcnN0LnggLSBjZW50ZXJMYXN0LngpIC8gdGhpcy5zZW5zaXRpdml0eTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0bW92ZVggPSAoY2VudGVyRmlyc3QueCAtIGNlbnRlckxhc3QueCkgLyB0aGlzLnNlbnNpdGl2aXR5O1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRtb3ZlWSA9IChjZW50ZXJGaXJzdC55IC0gY2VudGVyTGFzdC55KSAvIHRoaXMuc2Vuc2l0aXZpdHk7XHJcblx0XHRcdFx0bW9kLnRyYW5zZm9ybS50cmFuc2xhdGUobmV3IExheWEuVmVjdG9yMyhtb3ZlWCxtb3ZlWSwwKSxmYWxzZSk7XHJcblxyXG5cdFx0XHRcdHRoaXMudG91Y2hBRmlyc3RYID0gdG91Y2gucG9zaXRpb24ueDtcclxuXHRcdFx0XHR0aGlzLnRvdWNoQUZpcnN0WSA9IHRvdWNoLnBvc2l0aW9uLnk7XHJcblx0XHRcdFx0dGhpcy50b3VjaEJGaXJzdFggPSB0b3VjaDIucG9zaXRpb24ueDtcclxuXHRcdFx0XHR0aGlzLnRvdWNoQkZpcnN0WSA9IHRvdWNoMi5wb3NpdGlvbi55O1x0XHJcblx0XHRcdH1cdFxyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZiAoMCA9PT0gdG91Y2hDb3VudCl7XHJcblx0XHRcdHRoaXMuZmlyc3QgPSB0cnVlO1xyXG5cdFx0XHR0aGlzLnR3b0ZpcnN0ID0gdHJ1ZTtcclxuXHRcdFx0dGhpcy5sYXN0UG9zaXRpb24ueCA9IDA7XHJcblx0XHRcdHRoaXMubGFzdFBvc2l0aW9uLnkgPSAwO1xyXG5cdFx0XHR0aGlzLmlzVHdvVG91Y2ggPSBmYWxzZTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpvKDmoIflvLnotbfml7bmiafooYxcclxuICAgICAqL1xyXG5cdG9uTW91c2VVcCgpIHtcdFxyXG5cdFx0aWYgKHRoaXMuY2xpY2tlZCA9PSAxKSB7XHJcblx0XHRcdHRoaXMuY2xpY2tlZCsrO1xyXG5cdFx0XHQvLyDljZXlh7vkuovku7ZcclxuXHRcdFx0dGhpcy5tb2RlbFJvdGF0ZSA9IGZhbHNlO1xyXG5cdFx0fSBlbHNlIGlmICh0aGlzLmNsaWNrZWQgPT0gIDIpIHtcclxuXHRcdFx0dGhpcy5jbGlja2VkVGltZS50aW1lQSA9IG5ldyBEYXRlKCk7XHJcblx0XHRcdHRoaXMuY2xpY2tlZCsrO1xyXG5cdFx0fSBlbHNlIGlmKHRoaXMuY2xpY2tlZCA9PSAzKSB7XHJcblx0XHRcdHRoaXMuY2xpY2tlZFRpbWUudGltZUIgPSBuZXcgRGF0ZSgpO1xyXG5cdFx0XHRsZXQgZ2FwID0gTWF0aC5hYnModGhpcy5jbGlja2VkVGltZS50aW1lQSAtIHRoaXMuY2xpY2tlZFRpbWUudGltZUIpO1xyXG5cdFx0XHRpZiAoZ2FwIDwgNDAwICYmIGdhcCA+IDEwMCl7XHJcblx0XHRcdFx0dGhpcy5jbGlja2VkID0gMTtcclxuXHJcblx0XHRcdFx0Ly8g5Y+M5Ye75LqL5Lu2XHJcblx0XHRcdFx0dGhpcy5vd25lci50cmFuc2Zvcm0ucm90YXRpb24gPSB0aGlzLmZpcnN0Um90YXRlO1xyXG5cdFx0XHRcdHRoaXMub3duZXIudHJhbnNmb3JtLnBvc2l0aW9uID0gdGhpcy5maXJzdFBvc2l0aW9uO1xyXG5cdFx0XHRcdHRoaXMubW9kZWxSb3RhdGUgPSB0cnVlO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuY2xpY2tlZFRpbWUudGltZUEgPSBuZXcgRGF0ZSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHJcblx0b2ZmTW92ZSgpe1xyXG5cdH1cclxuXHJcblx0b25Nb3VzZU1vdmUoZSl7XHRcclxuXHR9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpvKDmoIfmi5bmi73ml7bmiafooYxcclxuICAgICAqL1xyXG4gICAgIG9uTW91c2VEcmFnKCkge1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDpvKDmoIfngrnlh7vml7bmiafooYxcclxuICAgICAqL1xyXG4gICAgIG9uTW91c2VDbGljaygpIHtcclxuXHRcdCBjb25zb2xlLmxvZygnY2xpY2snKVxyXG5cdCB9XHJcblx0XHJcbiAgICAvKipcclxuICAgICAqIOm8oOagh+i/m+WFpeaXtuaJp+ihjFxyXG4gICAgICovXHJcbiAgICAgb25Nb3VzZUVudGVyKCkge1xyXG5cdFx0IGNvbnNvbGUubG9nKCdlbnRlcicpXHJcblx0IH1cclxuICAgIC8qKlxyXG4gICAgICog6byg5qCH57uP6L+H5pe25omn6KGMXHJcbiAgICAgKi9cclxuICAgICBvbk1vdXNlT3ZlcigpIHtcclxuXHRcdCBjb25zb2xlLmxvZygnb3ZlcicpXHJcblx0IH1cclxuXHQvKipcclxuICAgICAqIOWIm+W7uuWQjuWPquaJp+ihjCzlj6rkvJrmiafooYzkuIDmrKHvvIzmraTml7bmiYDmnInoioLngrnlkoznu4Tku7bku6Xlj4rliJvlu7rlrozmr5VcclxuICAgICAqL1xyXG5cdG9uQXdha2UoKSB7XHJcblx0XHRjb25zb2xlLmxvZygnYXdha2UnKVxyXG5cdFx0XHJcblx0fVxyXG4gICAgLyoqXHJcbiAgICAgKiDohJrmnKzmr4/mrKHlkK/liqjlkI7miafooYzvvIzkvovlpoLooqvmt7vliqDliLDkuIDkuKrmv4DmtLvnmoTlr7nosaHkuIrmiJbogIXorr7nva7ohJrmnKznmoRlbmFibGVkID0gdHJ1ZVxyXG4gICAgICovXHJcblx0b25FbmFibGUoKXtcclxuXHRcdGNvbnNvbGUubG9nKCdvbkVuYWJsZScpO1xyXG5cdFx0XHJcblx0fVxyXG5cclxuXHRvbkRpc2FibGUoKXtcclxuXHRcdGNvbnNvbGUubG9nKCdvbkRpc2FibGUnKTtcclxuXHR9XHJcbiAgICAvKipcclxuICAgICAqIOW8gOWni+inpuWPkeaXtuaJp+ihjFxyXG4gICAgICovXHJcbiAgICAgb25UcmlnZ2VyRW50ZXIob3RoZXIpIHt9XHJcbiAgICAvKipcclxuICAgICAqIOaMgee7reinpuWPkeaXtuaJp+ihjFxyXG4gICAgICovXHJcbiAgICAgb25UcmlnZ2VyU3RheShvdGhlcikge31cclxuICAgIC8qKlxyXG4gICAgICog57uT5p2f6Kem5Y+R5pe25omn6KGMXHJcbiAgICAgKi9cclxuICAgICBvblRyaWdnZXJFeGl0KG90aGVyKSB7fVxyXG4gICAgLyoqXHJcbiAgICAgKiDlvIDlp4vnorDmkp7ml7bmiafooYxcclxuICAgICAqL1xyXG4gICAgIG9uQ29sbGlzaW9uRW50ZXIoY29sbGlzaW9uKSB7fVxyXG4gICAgLyoqXHJcbiAgICAgKiDmjIHnu63norDmkp7ml7bmiafooYxcclxuICAgICAqL1xyXG4gICAgIG9uQ29sbGlzaW9uU3RheShjb2xsaXNpb24pIHt9XHJcbiAgICAvKipcclxuICAgICAqIOe7k+adn+eisOaSnuaXtuaJp+ihjFxyXG4gICAgICovXHJcbiAgICAgb25Db2xsaXNpb25FeGl0KGNvbGxpc2lvbikge31cclxuICAgIC8qKlxyXG4gICAgICog6ZSu55uY5oyJ5LiL5pe25omn6KGMXHJcbiAgICAgKi9cclxuICAgICBvbktleURvd24oZSkge31cclxuICAgIC8qKlxyXG4gICAgICog6ZSu55uY5Lqn55Sf5LiA5Liq5a2X56ym5pe25omn6KGMXHJcbiAgICAgKi9cclxuICAgICBvbktleVByZXNzKGUpIHt9XHJcbiAgICAvKipcclxuICAgICAqIOmUruebmOaKrOi1t+aXtuaJp+ihjFxyXG4gICAgICovXHJcbiAgICAgb25LZXlVcChlKSB7fVxyXG4gICAgLyoqXHJcbiAgICAgKiDmr4/luKfmm7TmlrDml7bmiafooYzvvIzlnKh1cGRhdGXkuYvlkI7miafooYxcclxuICAgICAqL1xyXG4gICAgIG9uTGF0ZVVwZGF0ZSgpIHt9XHJcbiAgICAvKipcclxuICAgICAqIOa4suafk+S5i+WJjeaJp+ihjFxyXG4gICAgICovXHJcbiAgICAgb25QcmVSZW5kZXIoKSB7fVxyXG4gICAgLyoqXHJcbiAgICAgKiDmuLLmn5PkuYvlkI7miafooYxcclxuICAgICAqL1xyXG4gICAgIG9uUG9zdFJlbmRlcigpIHt9XHJcbiAgICAvKipcclxuICAgICAqIOemgeeUqOaXtuaJp+ihjFxyXG4gICAgICovXHJcbiAgICAgb25EaXNhYmxlKCkge31cclxuICAgIC8qKlxyXG4gICAgICog5omL5Yqo6LCD55So6ZSA5q+B5pe25omn6KGMXHJcbiAgICAgKi9cclxuICAgICBvbkRlc3Ryb3koKSB7fVxyXG59IiwiaW1wb3J0IHtnZXRVc2VyQWdlbnQsc2V0U2Vuc2l0aXZpdHksY3Ryb2xTY2FsZSxpc0xzRmlsZSxpc1hEaXJlY1dyb25nfSBmcm9tICcuL3V0aWxzJztcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGhvbmVNb3ZlU2NyaXB0IGV4dGVuZHMgTGF5YS5TY3JpcHQzRHtcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcblx0XHQvLyBzdXBlcuS9nOS4uuWvueixoeS9v+eUqOeahOivneWPr+S7peeUqOadpeiwg+eUqOeItuexu+S4reWOn+Wei+S4iueahOaWueazle+8iOS4jeiDveiwg+eUqOWunuS+i+eahOaWueazleWxnuaApy1jb25zdHJ1Y3RvcuS4reeahO+8ie+8jOS9nOS4uuWHveaVsOS9v+eUqOS7o+ihqOeItuexu+eahOaehOmAoOWHveaVsFxyXG5cdFx0c3VwZXIoKTsvLyDooajnpLrniLbnsbvnmoTmnoTpgKDlh73mlbDvvIzosIPnlKjniLbnsbvnmoRjb25zdHJ1Y3RvciznlKjmnaXmlrDlu7rniLbnsbvnmoR0aGlz5a+56LGh77yb5a2Q57G75b+F6aG75ZyoY29uc3RydWN0b3Lmlrnms5XkuK3osIPnlKhzdXBlcigp5pa55rOV77yM5Zug5Li65a2Q57G75rKh5pyJ6Ieq5bex55qEdGhpc+Wvueixoe+8jOiAjOaYr+e7p+aJv+eItuexu+eahHRoaXPlr7nosaHvvIznhLblkI7lr7nlhbbov5vooYzliqDlt6XvvJvlpoLmnpzkuI3osIPnlKhzdXBlcu+8jOWtkOexu+WwseW+l+S4jeWIsHRoaXPlr7nosaHvvJtcclxuXHRcdHRoaXMuc2NlbmUgPSBudWxsO1xyXG5cdFx0dGhpcy50b3VjaEZpcnN0ID0gbmV3IExheWEuVmVjdG9yMigwLCAwKTtcclxuXHRcdHRoaXMuZGlzdGFuY2UgPSAwLjA7XHJcblx0XHR0aGlzLmRpc0ZpcnN0VG91Y2ggPSBuZXcgTGF5YS5WZWN0b3IyKDAsIDApO1xyXG5cdFx0dGhpcy5kaXNMYXN0VG91Y2ggPSBuZXcgTGF5YS5WZWN0b3IyKDAsIDApO1xyXG5cdFx0dGhpcy5pc1R3b1RvdWNoID0gZmFsc2U7XHJcblx0XHR0aGlzLmZpcnN0ID0gdHJ1ZTtcclxuXHRcdHRoaXMudHdvRmlyc3QgPSB0cnVlO1xyXG5cdFx0dGhpcy5yb3RhdGUgPSBuZXcgTGF5YS5WZWN0b3IzKDAsMCwwKTtcclxuXHRcdHRoaXMudHJhbnNsYXRlID0gbmV3IExheWEuVmVjdG9yMygwLDAsMCk7XHJcblx0XHR0aGlzLnNwcml0ZTNEU2FjbGUgPSBuZXcgTGF5YS5WZWN0b3IzKDAsMCwwKTtcclxuXHRcdHRoaXMuYWdlbnQgPSBnZXRVc2VyQWdlbnQoKTtcclxuXHRcdHRoaXMuaW50cm9EYXRhID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VyckJvb2tJbmZvJykpO1xyXG5cdFx0dGhpcy5zZW5zaXRpdml0eSA9IHNldFNlbnNpdGl2aXR5KHRoaXMuaW50cm9EYXRhKTsvLyDngbXmlY/luqZcclxuXHR9XHJcblx0XHJcbiAgICAvKipcclxuICAgICAqIOesrOS4gOasoeaJp+ihjHVwZGF0ZeS5i+WJjeaJp+ihjO+8jOWPquS8muaJp+ihjOS4gOasoVxyXG4gICAgICovXHJcblx0b25TdGFydCgpe1xyXG5cdFx0aWYgKGlzTHNGaWxlKHRoaXMuaW50cm9EYXRhLnN1Ym5hbWUpKSB7XHJcblx0XHRcdHRoaXMuc2NlbmUgPSAgdGhpcy5vd25lci5wYXJlbnQ7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLnNjZW5lID0gIHRoaXMub3duZXIucGFyZW50LnBhcmVudDtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdG9uQXdha2UoKXtcclxuXHRcdGNvbnNvbGUubG9nKCdhd2FrZScpXHJcblx0fVxyXG5cclxuXHRvbkVuYWJsZSgpe1xyXG5cdFx0Y29uc29sZS5sb2coJ29uRW5hYmxlJyk7XHJcblx0XHRMYXlhLnN0YWdlLm9uKExheWEuRXZlbnQuTU9VU0VfVVAsdGhpcyx0aGlzLm9uTW91c2VVcCk7XHJcblx0fVxyXG5cclxuXHRvbkRpc2FibGUoKXtcclxuXHRcdGNvbnNvbGUubG9nKCdvbkRpc2FibGUnKTtcclxuXHR9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmr4/luKfmm7TmlrDml7bmiafooYxcclxuICAgICAqL1xyXG5cdG9uVXBkYXRlKCl7XHJcblx0XHR2YXIgbW9kID0gdGhpcy5vd25lcjtcclxuXHRcdGxldCB0b3VjaENvdW50ID0gdGhpcy5zY2VuZS5pbnB1dC50b3VjaENvdW50KCk7Ly8g6I635Y+W6Kem5pG454K55Liq5pWwXHJcblx0XHRpZiAoMSA9PT0gdG91Y2hDb3VudCl7Ly8g56e75YqoXHJcblx0XHRcdGlmKHRoaXMuaXNUd29Ub3VjaCl7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblx0XHRcdC8v6I635Y+W5b2T5YmN55qE6Kem5o6n54K577yM5pWw6YeP5Li6MVxyXG4gICAgICAgICAgICBsZXQgdG91Y2ggPSB0aGlzLnNjZW5lLmlucHV0LmdldFRvdWNoKDApO1xyXG5cdFx0XHRpZiAodGhpcy5maXJzdCl7XHJcblx0XHRcdFx0dGhpcy50b3VjaEZpcnN0LnggPSB0b3VjaC5fcG9zaXRpb24ueDtcclxuXHRcdFx0XHR0aGlzLnRvdWNoRmlyc3QueSA9IHRvdWNoLl9wb3NpdGlvbi55O1xyXG5cdFx0XHRcdHRoaXMuZmlyc3QgPSBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNle1xyXG4gICAgICAgICAgICAgICAgLy8g56e75YqoXHJcblx0XHRcdFx0bGV0IG1vdmVYLG1vdmVZO1xyXG5cdFx0XHRcdGlmIChpc1hEaXJlY1dyb25nKHRoaXMuaW50cm9EYXRhLnN1Ym5hbWUpKSB7XHJcblx0XHRcdFx0XHRtb3ZlWCA9IC0odGhpcy50b3VjaEZpcnN0LnggLSB0b3VjaC5fcG9zaXRpb24ueCkgLyB0aGlzLnNlbnNpdGl2aXR5O1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRtb3ZlWCA9ICh0aGlzLnRvdWNoRmlyc3QueCAtIHRvdWNoLl9wb3NpdGlvbi54KSAvIHRoaXMuc2Vuc2l0aXZpdHk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdG1vdmVZID0gKHRoaXMudG91Y2hGaXJzdC55IC0gdG91Y2guX3Bvc2l0aW9uLnkpIC8gdGhpcy5zZW5zaXRpdml0eTtcclxuICAgICAgICAgICAgICAgIG1vZC50cmFuc2Zvcm0udHJhbnNsYXRlKG5ldyBMYXlhLlZlY3RvcjMobW92ZVgsbW92ZVksMCksZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b3VjaEZpcnN0LnggPSB0b3VjaC5fcG9zaXRpb24ueDtcclxuICAgICAgICAgICAgICAgIHRoaXMudG91Y2hGaXJzdC55ID0gdG91Y2guX3Bvc2l0aW9uLnk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGVsc2UgaWYgKDIgPT09IHRvdWNoQ291bnQpeyAvLyDnvKnmlL5cclxuXHRcdFx0dGhpcy5pc1R3b1RvdWNoID0gdHJ1ZTtcclxuXHRcdFx0Ly/ojrflj5bkuKTkuKrop6bnorDngrlcclxuXHRcdFx0bGV0IHRvdWNoID0gdGhpcy5zY2VuZS5pbnB1dC5nZXRUb3VjaCgwKTtcclxuXHRcdFx0bGV0IHRvdWNoMiA9IHRoaXMuc2NlbmUuaW5wdXQuZ2V0VG91Y2goMSk7XHJcblx0XHRcdC8v5piv5ZCm5Li65paw5LiA5qyh6Kem56Kw77yM5bm25pyq5Y+R55Sf56e75YqoXHJcblx0XHRcdGlmICh0aGlzLnR3b0ZpcnN0KXtcclxuXHRcdFx0XHQvL+iOt+WPluinpueisOeCueeahOS9jee9rlxyXG5cdFx0XHRcdHRoaXMuZGlzRmlyc3RUb3VjaC54ID0gdG91Y2gucG9zaXRpb24ueCAtIHRvdWNoMi5wb3NpdGlvbi54O1xyXG5cdFx0XHRcdHRoaXMuZGlzRmlyc3RUb3VjaC55ID0gdG91Y2gucG9zaXRpb24ueSAtIHRvdWNoMi5wb3NpdGlvbi55O1xyXG5cdFx0XHRcdHRoaXMuZGlzdGFuY2UgPSBMYXlhLlZlY3RvcjIuc2NhbGFyTGVuZ3RoKHRoaXMuZGlzRmlyc3RUb3VjaCk7Ly8g6K6h566X5qCH6YeP6ZW/5bqmXHJcblx0XHRcdFx0Ly8gY29uc29sZS5sb2coJ0ZpcnN0IERpc3RhbmNlJyx0aGlzLmRpc3RhbmNlKTtcclxuXHRcdFx0XHR0aGlzLnNwcml0ZTNEU2FjbGUgPSBtb2QudHJhbnNmb3JtLnNjYWxlO1xyXG5cdFx0XHRcdHRoaXMudHdvRmlyc3QgPSBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNle1xyXG5cdFx0XHRcdC8vIOe8qeaUvlxyXG5cdFx0XHRcdHRoaXMuZGlzTGFzdFRvdWNoLnggPSB0b3VjaC5wb3NpdGlvbi54IC0gdG91Y2gyLnBvc2l0aW9uLng7XHJcblx0XHRcdFx0dGhpcy5kaXNMYXN0VG91Y2gueSA9IHRvdWNoLnBvc2l0aW9uLnkgLSB0b3VjaDIucG9zaXRpb24ueTtcclxuXHRcdFx0XHRsZXQgZGlzdGFuY2UyID0gTGF5YS5WZWN0b3IyLnNjYWxhckxlbmd0aCh0aGlzLmRpc0xhc3RUb3VjaCk7XHJcblx0XHRcdFx0Ly/moLnmja7np7vliqjnmoTot53nprvov5vooYznvKnmlL5cclxuXHRcdFx0XHRsZXQgZmFjdG9yID0gIDAuMDAxICogKGRpc3RhbmNlMiAtIHRoaXMuZGlzdGFuY2UpO1xyXG5cdFx0XHRcdHRoaXMuc3ByaXRlM0RTYWNsZS54ICs9IGZhY3RvcjtcclxuXHRcdFx0XHR0aGlzLnNwcml0ZTNEU2FjbGUueSArPSBmYWN0b3I7XHJcblx0XHRcdFx0dGhpcy5zcHJpdGUzRFNhY2xlLnogKz0gZmFjdG9yO1xyXG5cdFx0XHRcdGN0cm9sU2NhbGUodGhpcy5pbnRyb0RhdGEsdGhpcy5zcHJpdGUzRFNhY2xlLngsdGhpcy5zcHJpdGUzRFNhY2xlLnksdGhpcy5zcHJpdGUzRFNhY2xlLnopO1xyXG5cdFx0XHRcdG1vZC50cmFuc2Zvcm0uc2NhbGUgPSB0aGlzLnNwcml0ZTNEU2FjbGU7XHJcblx0XHRcdFx0dGhpcy5kaXN0YW5jZSA9IGRpc3RhbmNlMjtcclxuXHRcdFx0fVx0XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmICgwID09PSB0b3VjaENvdW50KXtcclxuXHRcdFx0dGhpcy5maXJzdCA9IHRydWU7XHJcblx0XHRcdHRoaXMudHdvRmlyc3QgPSB0cnVlO1xyXG5cdFx0XHR0aGlzLmlzVHdvVG91Y2ggPSBmYWxzZTtcclxuXHRcdH1cclxuXHR9XHJcbn0iLCIvLyDnlLHkuo7lpJbljIXnu5nnmoTmqKHlnovmlofku7blpKflsI/kuI3kuIDvvIzliJ3lp4vop5LluqbkuZ/lj6/og73mnInpl67popjvvIzml4vovazovbTkuZ/lj6/og73kuI3op4TojINcclxuLy8g6L+Z6YeM55So5p2l57uf5LiA566h55CG6ZyA6KaB6YCC6YWN5Zyo5p+Q5Liq6KeS5bqm5p+Q5Liq5aSn5bCP5oiW5peL6L2s6L205LiN5a+55oiW6ICF56e75Yqo54G15pWP5bqm5aSq5aSn5oiW5aSq5bCP55qE5qih5Z6LXHJcbnZhciBfbW9kZWxTb3J0ID0ge1xyXG5cdGxzRmlsZTpbJ3lpbmhleGknLCdjaG9uZ2RvbmcnLCd0YWl5YW5nJywndGFpeWFuZ3hpJ10sLy8gbHPmlofku7ZcclxuXHRub0JhY2tJbWc6Wyd5aW5oZXhpJywnY2hvbmdkb25nJywndGFpeWFuZyddLC8v5LiN6KaB6IOM5pmv5Zu+55qE5qih5Z6LXHJcblx0bm90U2NhbGVNb2RlbDpbJ3lpbmhleGknLCdjaG9uZ2RvbmcnLCd5dWVxaXUnXSwvL+e8qeaUvuebuOWFs1xyXG5cdHNjYWxlMDA1OlsndGFpeWFuZ3hpJ10sLy/mlL7lpKcwLjAwNeWAjeeahOaooeWei1xyXG5cdHNjYWxlMDQ6WydoYWl3YW5neGluZyddLFxyXG5cdHNjYWxlMDg6Wydnb25namlhb2NoZScsXSxcclxuXHRzY2FsZTE6Wyd0dXhpbmd3dWhhbycsJ2NhbWFybycsJ2p1bnlvbmdrYWNoZScsJ2xhb2ppZWZhbmdrYWNoZScsJ3lvdWd1YW5jaGUnXSxcclxuXHRzY2FsZTI6Wyd5b25ncWloYW8nLCdzYW5sdW5xaWNoZScsJ3NpbHVuY2hlJywndGlhbmdvbmcxJywnc2hlbnpob3U1J10sXHJcblx0c2NhbGUzOlsnYmFvbWFpOCcsJ3hpYW9jaGUnXSwvLyDlupTor6XmlL7lpKcz5YCN55qE5qih5Z6LXHJcblx0cm90YXRlMTgwOlsnZGFsaXNoZW4nLCdhbGl5YWRhbmcnXSxcclxuXHRyb3RhdGU5MDpbJ0VMQU4nLCdjYW1hcm8nLCdoYW5tYWgzJ10sLy8g5Yid5aeL5peL6L2s6KeS5bqm5ZKM5YW25LuW5qih5Z6L5LiN5ZCMXHJcblx0eERpcmVjdGlvbldyb25nOlsneXV0dScsJ2FtdXNpdGVsYW5nJywnQ2xvdWRTYXQnLCdFTEFOJ10sLy/np7vliqjml7Z46L205pa55ZCR5ZKM5YW25LuW5qih5Z6L55u45Y+NXHJcblx0bW9iaWxlUm90YXRlV3JvbmdYOlsnbGFveWVwYW9jaGUnLCdoYW5tYWgzJywnbXV4aW5nJywnaHVveGluZycsJ21pbmd3YW5neGluZycsJ2hhaXdlaTEnLCdoYWl3YW5neGluZycsJ3RpYW53ZWkzJywnZGF6b25namllZGEnLCdjYW1hcm8nLCdhYm9sbycsJ3l1ZXFpdScsJ2hvbmd3YWl4dW50aWFuJywnU1VWJywndG9uZ3h1bndlaXhpbmcnLCdkaXFpdScsJ3NodWl4aW5nJywnZG9uZ2ZhbmcxaGFvJywnZGFsaXNoZW4nLCdkYjknLCdkb25nZmFuZ2hvbmcxJywnZmVuZ3l1bicsJ2NoYW5nemhlbmcyRicsJ3l1dHUnLCdjaGFuZ2UzJywnYWxpeWFkYW5nJywndHV4aW5nd3VoYW8nLCdqaWFrZWNob25nJywnbGFvc2lsYWlzaWh1YW55aW5nJywndGVzaWxhJywnc2liaW50ZScsJ3lpd2Vpa2VrYWlsdW5iaW53ZWknLCdqaW5nY2hlJywnbGFuYm9qaW5pJywnem9uZ2NhaScsJ3RhaXlhbmd4aSddLFxyXG5cdG1vYmlsZVJvdGF0ZVdyb25nWTpbJ0VMQU4nXSxcclxuXHRTZW5zaXRpdml0eTEwOlsvLyDmjqfliLbnp7vliqjngbXmlY/luqZcclxuXHRcdCd0YWl5YW5neGknLCdoYWl3YW5neGluZycsJ2x2eGluZ3poZTInLCdsdnhpbmd6aGUxJyxcclxuXHRcdCd0dXhpbmd3dWhhbycsJ2ppYWxpbHVlJywnaGdzJywneW9uZ3FpaGFvJywnZGlwaW5naGFvJyxcclxuXHRcdCdqaW54aW5na3VhaWNoZScsJ3hpbnNoaWhhbycsJ2JlaWRvdXdlaXhpbmczJywnZG9uZ2ZhbmcxaGFvJyxcclxuXHRcdCdkb25nZmFuZ2hvbmcxJywndG9uZ3h1bndlaXhpbmcnLCdDbG91ZFNhdCcsJ2hhYm8nLCdmYXhpYW5oYW8nLFxyXG5cdFx0J2thaXB1bGUnLCdjaGFuZ3poZW5nMkYnLCdhbGl5YWRhbmcnLCdjaGFuZ2UzJywnaG9uZ3dhaXh1bnRpYW4nLFxyXG5cdFx0J2RhbGlzaGVuJywneXVlcWl1MycsJ3NoZW56aG91NScsJ3poaXppaGFvJywneXVlcWl1J1xyXG5cdFx0XSxcclxuXHRTZW5zaXRpdml0eTIwOlsncHV0ZW5pa2UxJywncGFrZScsJ2Zlbmd5dW4nLCd5aW5oZXhpJywnY2hvbmdkb25nJ10sXHJcblx0U2Vuc2l0aXZpdHkxMDA6Wyd5dXR1JywnYW11c2l0ZWxhbmcnXSwgICAgXHJcblx0U2Vuc2l0aXZpdHkyMDA6Wydkb25nY2hhaGFvJywnYm14MScsJ3hpYW9jaGUnLCdFTlpPJywndGFpeWFuZycsJ3l1dHUnXSwgICAgXHJcbn1cclxuXHJcbi8vIOaOp+WItuenu+WKqOeBteaVj+W6pueahOWAvFxyXG5mdW5jdGlvbiBzZXRTZW5zaXRpdml0eSAoaW50cm9EYXRhKSB7XHJcblx0bGV0IG1vZGVsTmFtZSA9IGludHJvRGF0YS5zdWJuYW1lLnNwbGl0KCcuJylbMF07XHJcblx0XHRjb25zb2xlLmxvZyhtb2RlbE5hbWUpXHJcblx0XHRpZiAoX21vZGVsU29ydC5TZW5zaXRpdml0eTEwLmluZGV4T2YobW9kZWxOYW1lKSAhPT0gLTEpIHtcclxuXHRcdFx0cmV0dXJuIDEwO1xyXG5cdFx0fSBlbHNlIGlmIChfbW9kZWxTb3J0LlNlbnNpdGl2aXR5MjAuaW5kZXhPZihtb2RlbE5hbWUpICE9PSAtMSkge1xyXG5cdFx0XHRyZXR1cm4gMjA7XHJcblx0XHR9IGVsc2UgaWYoX21vZGVsU29ydC5TZW5zaXRpdml0eTEwMC5pbmRleE9mKG1vZGVsTmFtZSkgIT09IC0xKSB7XHJcblx0XHRcdHJldHVybiAxMDA7XHJcblx0XHR9IGVsc2UgaWYgKF9tb2RlbFNvcnQuU2Vuc2l0aXZpdHkyMDAuaW5kZXhPZihtb2RlbE5hbWUpICE9PSAtMSkge1xyXG5cdFx0XHRyZXR1cm4gMjAwO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRpZiAoaW50cm9EYXRhLm1haW5uYW1lID09PSAnQ0hFJykge1xyXG5cdFx0XHRyZXR1cm4gMTAwO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmV0dXJuIDE7XHJcblx0XHR9XHJcbn1cclxuXHJcbi8vIOaOp+WItue8qeaUvueahOacgOWkp+iMg+WbtO+8jOacgOWwj+iMg+WbtFxyXG5mdW5jdGlvbiAgY3Ryb2xTY2FsZShpbnRyb0RhdGEsc2NhbGVYLHNjYWxlWSxzY2FsZVope1xyXG5cdGxldCBtaW5WYWx1ZSA9IDAsbWF4VmFsdWUgPSAwO1xyXG5cdGlmIChfbW9kZWxTb3J0LnNjYWxlMy5pbmRleE9mKGludHJvRGF0YS5zdWJuYW1lKSAhPT0gLTEpIHtcclxuXHRcdG1pblZhbHVlID0gMS41OyBtYXhWYWx1ZSA9IDU7XHJcblx0XHRzY2FsZVggPSBzY2FsZVggPCBtaW5WYWx1ZSA/IG1pblZhbHVlIDogKHNjYWxlWCA+IG1heFZhbHVlID8gbWF4VmFsdWUgOiBzY2FsZVgpO1xyXG5cdFx0c2NhbGVZID0gc2NhbGVZIDwgbWluVmFsdWUgPyBtaW5WYWx1ZSA6IChzY2FsZVkgPiBtYXhWYWx1ZSA/IG1heFZhbHVlIDogc2NhbGVZKTtcclxuXHRcdHNjYWxlWiA9IHNjYWxlWiA8IG1pblZhbHVlID8gbWluVmFsdWUgOiAoc2NhbGVaID4gbWF4VmFsdWUgPyBtYXhWYWx1ZSA6IHNjYWxlWik7XHJcblx0fSBlbHNlIGlmIChfbW9kZWxTb3J0LnNjYWxlMDA1LmluZGV4T2YoaW50cm9EYXRhLnN1Ym5hbWUpICE9PSAtMSl7XHJcblx0XHRtaW5WYWx1ZSA9IDAuMDA1OyBtYXhWYWx1ZSA9IDAuMTU7XHJcblx0XHRzY2FsZVggPSBzY2FsZVggPCBtaW5WYWx1ZSA/IG1pblZhbHVlIDogKHNjYWxlWCA+IG1heFZhbHVlID8gbWF4VmFsdWUgOiBzY2FsZVgpO1xyXG5cdFx0c2NhbGVZID0gc2NhbGVZIDwgbWluVmFsdWUgPyBtaW5WYWx1ZSA6IChzY2FsZVkgPiBtYXhWYWx1ZSA/IG1heFZhbHVlIDogc2NhbGVZKTtcclxuXHRcdHNjYWxlWiA9IHNjYWxlWiA8IG1pblZhbHVlID8gbWluVmFsdWUgOiAoc2NhbGVaID4gbWF4VmFsdWUgPyBtYXhWYWx1ZSA6IHNjYWxlWik7XHJcblx0fSBlbHNlIHtcclxuXHRcdG1pblZhbHVlID0gMC43NTsgbWF4VmFsdWUgPSAyLjU7XHJcblx0XHRzY2FsZVggPSBzY2FsZVggPCBtaW5WYWx1ZSA/IG1pblZhbHVlIDogKHNjYWxlWCA+IG1heFZhbHVlID8gbWF4VmFsdWUgOiBzY2FsZVgpO1xyXG5cdFx0c2NhbGVZID0gc2NhbGVZIDwgbWluVmFsdWUgPyBtaW5WYWx1ZSA6IChzY2FsZVkgPiBtYXhWYWx1ZSA/IG1heFZhbHVlIDogc2NhbGVZKTtcclxuXHRcdHNjYWxlWiA9IHNjYWxlWiA8IG1pblZhbHVlID8gbWluVmFsdWUgOiAoc2NhbGVaID4gbWF4VmFsdWUgPyBtYXhWYWx1ZSA6IHNjYWxlWik7XHJcblx0fVxyXG59XHJcblxyXG4vLyDph43nva7mqKHlnovnmoTml4vovazop5Lluqblj4rlpKflsI9cclxuZnVuY3Rpb24gcmVzZXRNb2RlbChpbnRyb0RhdGEsbW9kKXtcclxuXHRpZiAoX21vZGVsU29ydC5ub3RTY2FsZU1vZGVsLmluZGV4T2YoaW50cm9EYXRhLnN1Ym5hbWUpID09PSAtMSkge1xyXG5cdFx0aWYgKF9tb2RlbFNvcnQuc2NhbGUwMDUuaW5kZXhPZihpbnRyb0RhdGEuc3VibmFtZSkgIT09IC0xKXtcclxuXHRcdFx0bW9kLnRyYW5zZm9ybS5zY2FsZSA9IG5ldyBMYXlhLlZlY3RvcjMoMC4wNSwwLjA1LDAuMDUpO1xyXG5cdFx0fSBlbHNlIGlmIChfbW9kZWxTb3J0LnNjYWxlMDQuaW5kZXhPZihpbnRyb0RhdGEuc3VibmFtZSkgIT09IC0xKXtcclxuXHRcdFx0bW9kLnRyYW5zZm9ybS5zY2FsZSA9IG5ldyBMYXlhLlZlY3RvcjMoMC40LDAuNCwwLjQpO1xyXG5cdFx0fSBlbHNlIGlmIChfbW9kZWxTb3J0LnNjYWxlMDguaW5kZXhPZihpbnRyb0RhdGEuc3VibmFtZSkgIT09IC0xKXtcclxuXHRcdFx0bW9kLnRyYW5zZm9ybS5zY2FsZSA9IG5ldyBMYXlhLlZlY3RvcjMoMC44LDAuOCwwLjgpO1xyXG5cdFx0fSBlbHNlIGlmIChfbW9kZWxTb3J0LnNjYWxlMS5pbmRleE9mKGludHJvRGF0YS5zdWJuYW1lKSAhPT0gLTEpe1xyXG5cdFx0XHRtb2QudHJhbnNmb3JtLnNjYWxlID0gbmV3IExheWEuVmVjdG9yMygxLDEsMSk7XHJcblx0XHR9IGVsc2UgaWYgKF9tb2RlbFNvcnQuc2NhbGUyLmluZGV4T2YoaW50cm9EYXRhLnN1Ym5hbWUpICE9PSAtMSl7XHJcblx0XHRcdG1vZC50cmFuc2Zvcm0uc2NhbGUgPSBuZXcgTGF5YS5WZWN0b3IzKDIsMiwyKTtcclxuXHRcdH0gZWxzZSAgaWYgKF9tb2RlbFNvcnQuc2NhbGUzLmluZGV4T2YoaW50cm9EYXRhLnN1Ym5hbWUpICE9PSAtMSkge1x0XHJcblx0XHRcdG1vZC50cmFuc2Zvcm0uc2NhbGUgPSBuZXcgTGF5YS5WZWN0b3IzKDMsMywzKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdG1vZC50cmFuc2Zvcm0uc2NhbGUgPSBuZXcgTGF5YS5WZWN0b3IzKDEuNSwxLjUsMS41KTtcclxuXHRcdH1cclxuXHR9XHJcblx0aWYgKGludHJvRGF0YS5tYWlubmFtZSA9PT0gJ0NIRScpIHtcclxuXHRcdGlmIChfbW9kZWxTb3J0LnJvdGF0ZTkwLmluZGV4T2YoaW50cm9EYXRhLnN1Ym5hbWUpICE9PSAtMSApIHtcclxuXHRcdFx0bW9kLnRyYW5zZm9ybS5yb3RhdGUobmV3IExheWEuVmVjdG9yMygwLC05MCwwKSxmYWxzZSxmYWxzZSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRtb2QudHJhbnNmb3JtLnJvdGF0ZShuZXcgTGF5YS5WZWN0b3IzKDAsOTAsMCksZmFsc2UsZmFsc2UpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRpZiAoX21vZGVsU29ydC5yb3RhdGUxODAuaW5kZXhPZihpbnRyb0RhdGEuc3VibmFtZSkgIT09IC0xKSB7XHJcblx0XHRtb2QudHJhbnNmb3JtLnJvdGF0ZShuZXcgTGF5YS5WZWN0b3IzKDAsMTgwLDApLGZhbHNlLGZhbHNlKTtcclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzTHNGaWxlIChzdWJuYW1lKSB7XHJcblx0cmV0dXJuIF9tb2RlbFNvcnQubHNGaWxlLmluZGV4T2Yoc3VibmFtZSkgIT09IC0xXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzWERpcmVjV3JvbmcgKHN1Ym5hbWUpIHtcclxuXHRyZXR1cm4gX21vZGVsU29ydC54RGlyZWN0aW9uV3JvbmcuaW5kZXhPZihzdWJuYW1lKSAhPT0gLTE7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzTm9CYWNrSW1nIChzdWJuYW1lKSB7XHJcblx0cmV0dXJuIF9tb2RlbFNvcnQubm9CYWNrSW1nLmluZGV4T2Yoc3VibmFtZSkgIT09IC0xO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpc01vYmlsZVJvdGF0ZVdyb25nWChzdWJuYW1lKXtcclxuXHRyZXR1cm4gX21vZGVsU29ydC5tb2JpbGVSb3RhdGVXcm9uZ1guaW5kZXhPZihzdWJuYW1lKSAhPT0gLTE7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzTW9iaWxlUm90YXRlV3JvbmdZKHN1Ym5hbWUpe1xyXG5cdHJldHVybiBfbW9kZWxTb3J0Lm1vYmlsZVJvdGF0ZVdyb25nWS5pbmRleE9mKHN1Ym5hbWUpICE9PSAtMTtcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIEdldFF1ZXJ5U3RyaW5nKG5hbWUpIHtcclxuXHR2YXIgcmVnID0gbmV3IFJlZ0V4cChcIihefCYpXCIgKyBuYW1lICsgXCI9KFteJl0qKSgmfCQpXCIpO1xyXG5cdHZhciByID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaC5zdWJzdHIoMSkubWF0Y2gocmVnKTtcclxuXHRpZiAociAhPSBudWxsKVxyXG5cdFx0cmV0dXJuIHJbMl07ICAgICAvL+azqOaEj+i/memHjOS4jeiDveeUqGpz6YeM6Z2i55qEdW5lc2NhcGXmlrnms5VcclxuXHRyZXR1cm4gbnVsbDtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlU2Nyb2xsQmFyKHBhcmVudCx0ZXh0LHBvc2l0aW9uKXtcclxuXHRpZiAodGV4dC5tYXhTY3JvbGxZICE9PSAwKSB7XHRcdFxyXG5cdFx0bGV0IHR4dEhlaWdodCA9IHRleHQuaGVpZ2h0O1xyXG5cdFx0bGV0IHNjcm9sbEJveCA9IG5ldyBMYXlhLlNwcml0ZSgpO1xyXG5cdFx0c2Nyb2xsQm94LmhlaWdodCA9IHR4dEhlaWdodDtcclxuXHRcdHNjcm9sbEJveC5wb3MocG9zaXRpb24ubGVmdCwgcG9zaXRpb24udG9wKTtcclxuXHRcdGxldCBzY3JvbGxTbGlkZXIgPSBuZXcgTGF5YS5TcHJpdGUoKTtcclxuXHRcdGxldCBzY2FsZSA9IHR4dEhlaWdodCAvICh0ZXh0Lm1heFNjcm9sbFkgKyB0eHRIZWlnaHQpXHJcblx0XHRsZXQgc2Nyb2xsU2xpZGVySCA9IHNjcm9sbEJveC5oZWlnaHQgKiBzY2FsZSA7XHJcblx0XHRzY3JvbGxTbGlkZXIuZ3JhcGhpY3MuZHJhd1JlY3QoMCwwLDEyICogc2NhbGUsc2Nyb2xsU2xpZGVySCwnI2NjYycpO1xyXG5cdFx0c2Nyb2xsU2xpZGVyLmhlaWdodCA9IHNjcm9sbFNsaWRlckg7XHJcblx0XHRzY3JvbGxTbGlkZXIueSA9IHRleHQuc2Nyb2xsWTtcclxuXHRcdHNjcm9sbEJveC5hZGRDaGlsZChzY3JvbGxTbGlkZXIpO1xyXG5cdFx0cGFyZW50LmFkZENoaWxkKHNjcm9sbEJveCk7XHJcblx0XHRyZXR1cm4gc2Nyb2xsU2xpZGVyO1xyXG5cdH1cclxufVxyXG5cclxuXHJcbi8vIOa7muWKqOaWh+acrFxyXG5mdW5jdGlvbiBzY3JvbGxUZXh0KHRleHQsc2Nyb2xsU2xpZGVyKXtcclxuXHR2YXIgcHJldlggPSB0ZXh0Lm1vdXNlWDtcclxuXHR2YXIgcHJldlkgPSB0ZXh0Lm1vdXNlWTtcclxuXHQvLyDpvKDmoIfmu5rliqjmlofmnKxcclxuXHR2YXIgc2Nyb2xsVGV4dCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIG5vd1ggPSB0ZXh0Lm1vdXNlWDtcclxuXHRcdHZhciBub3dZID0gdGV4dC5tb3VzZVk7XHJcblx0XHR0ZXh0LnNjcm9sbFggKz0gcHJldlggLSBub3dYO1xyXG5cdFx0dGV4dC5zY3JvbGxZICs9IHByZXZZIC0gbm93WTtcclxuXHRcdGlmIChzY3JvbGxTbGlkZXIgJiYgdGV4dC5tYXhTY3JvbGxZICE9PSAwKSB7XHJcblx0XHRcdGxldCBzY2FsZSA9ICh0ZXh0LmhlaWdodCAtIHNjcm9sbFNsaWRlci5oZWlnaHQpLyh0ZXh0Lm1heFNjcm9sbFkpO1x0Ly90eHRfZGV0YWlsLmhlaWdodOetieS6jnNjcm9sbEJveC5oZWlnaHTvvIzov5nph4znlKh0eHRfZGV0YWlsLmhlaWdodOabv+S7o3Njcm9sbEJveC5oZWlnaHRcclxuXHRcdFx0c2Nyb2xsU2xpZGVyLnkgPSB0ZXh0LnNjcm9sbFkgKiBzY2FsZTtcclxuXHRcdH1cclxuXHRcdHByZXZYID0gbm93WDtcclxuXHRcdHByZXZZID0gbm93WTtcclxuXHR9XHJcblxyXG5cdC8vIOWBnOatoua7muWKqOaWh+acrFxyXG5cdHZhciBmaW5pc2hTY3JvbGxUZXh0ID0gZnVuY3Rpb24oKXtcclxuXHRcdExheWEuc3RhZ2Uub2ZmKExheWEuRXZlbnQuTU9VU0VfTU9WRSwgdGhpcywgc2Nyb2xsVGV4dCk7XHJcblx0XHRMYXlhLnN0YWdlLm9mZihMYXlhLkV2ZW50Lk1PVVNFX1VQLCB0aGlzLCBmaW5pc2hTY3JvbGxUZXh0KTtcclxuXHR9XHJcblx0TGF5YS5zdGFnZS5vbihMYXlhLkV2ZW50Lk1PVVNFX01PVkUsdGhpcyxzY3JvbGxUZXh0LFt0ZXh0XSk7XHJcblx0TGF5YS5zdGFnZS5vbihMYXlhLkV2ZW50Lk1PVVNFX1VQLHRoaXMsZmluaXNoU2Nyb2xsVGV4dCk7XHJcbn1cclxuXHJcbi8qIOiOt+WPluWuouaIt+err+exu+WeiyovXHJcbmZ1bmN0aW9uIGdldFVzZXJBZ2VudCAoKSB7XHJcblx0aWYgKHBhcnNlSW50KEdldFF1ZXJ5U3RyaW5nKCd0eXBlJykpID09PSAwKSByZXR1cm4gJ2FsdmEgc21hbGwnO1xyXG5cclxuXHRpZiAoR2V0UXVlcnlTdHJpbmcoXCJjbGllbnRcIikgPT09ICdpb3MnKSByZXR1cm4gJ2lvcyc7XHJcblxyXG5cdGlmICggdHlwZW9mKCBBbmRyb2lkVG9vbCApICE9IFwidW5kZWZpbmVkXCIgKSByZXR1cm4gJ2FuZHJvaWQnO1xyXG5cclxuXHRpZiAod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIkNocm9tZVwiKSAhPT0gLTEpIHJldHVybiAnY2hyb21lJztcclxuXHJcblx0cmV0dXJuICdhbHZhIGJpZyc7XHJcbn07XHJcblxyXG5leHBvcnQge1xyXG5cdEdldFF1ZXJ5U3RyaW5nLCBcclxuXHRjcmVhdGVTY3JvbGxCYXIsIFxyXG5cdHNjcm9sbFRleHQsIFxyXG5cdGdldFVzZXJBZ2VudCxcclxuXHRyZXNldE1vZGVsLFxyXG5cdHNldFNlbnNpdGl2aXR5LFxyXG5cdGN0cm9sU2NhbGUsXHJcblx0aXNMc0ZpbGUsXHJcblx0aXNYRGlyZWNXcm9uZyxcclxuXHRpc05vQmFja0ltZyxcclxuXHRpc01vYmlsZVJvdGF0ZVdyb25nWCxcclxuXHRpc01vYmlsZVJvdGF0ZVdyb25nWVxyXG59OyJdfQ==

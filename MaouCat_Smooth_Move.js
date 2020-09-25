//=============================================================================
// Version: 1.0
//=============================================================================
/*:
 * @plugindesc MaouCat Smooth Move.
 * @author MaouCat
 *
 * @help
 * This pluging can help you move your picture smoothly.
 * Copy the following command to the event script column and modify the parameters:
 * 
 * $gameScreen.movePictureSmooth(pictureId, origin, x, y, scaleX, scaleY, opacity, blendMode, duration);
 * 
 * example:
 * $gameScreen.movePictureSmooth(1, 0, 100, 100, 100, 100, 255, 0, 60);
 * 
 * 
 * 這個插件能幫助你滑順地移動圖片。
 * 把以下指令複製到事件腳本欄，並修改參數:
 * 
 * $gameScreen.movePictureSmooth(圖片編號, 中心模式(0中間1左上), X座標, Y座標, X縮放, Y縮放, 透明度, 融合模式, 時間);
 * 
 * 使用範例:
 * $gameScreen.movePictureSmooth(1, 0, 100, 100, 100, 100, 255, 0, 60);
 * 
*/
Game_Screen.prototype.movePictureSmooth = function(pictureId, origin, x, y, scaleX, scaleY, opacity, blendMode, duration) {
    var picture = this.picture(pictureId);
    if (picture) {
        picture._smoothmove = true;
        picture._totaltime = duration;
        picture._ori_x = picture._x;
        picture._ori_y = picture._y;
        picture._ori_scaleX = picture._scaleX;
        picture._ori_scaleY = picture._scaleY;
        picture._ori_opacity = picture._opacity;
        picture.move(origin, x, y, scaleX, scaleY, opacity, blendMode, duration);
    }
};

MaouCat_plugin_Game_Picture_initBasic = Game_Picture.prototype.initBasic;
Game_Picture.prototype.initBasic = function() {
    MaouCat_plugin_Game_Picture_initBasic.call(this);
    this._ori_x = 0;
    this._ori_y = 0;
    this._ori_scaleX = 1;
    this._ori_scaleY = 1;
    this._ori_opacity = 0;
    this._smoothmove = false;
    this._totaltime = 0;
};

Game_Picture.prototype.updateMove = function() {
    if (this._smoothmove){
        if (this._duration > 0) {
            var d = this._duration;
            if(this._duration == 1){
                d=0;
            }
            var t = this._totaltime;
            this._x = (this._ori_x * (1-Math.cos(d/t*Math.PI/2)) + this._targetX * Math.cos(d/t*Math.PI/2));
            this._y = (this._ori_y * (1-Math.cos(d/t*Math.PI/2)) + this._targetY * Math.cos(d/t*Math.PI/2));
            this._scaleX  = (this._ori_scaleX * (1-Math.cos(d/t*Math.PI/2)) + this._targetScaleX * Math.cos(d/t*Math.PI/2));
            this._scaleY  = (this._ori_scaleY * (1-Math.cos(d/t*Math.PI/2)) + this._targetScaleY * Math.cos(d/t*Math.PI/2));
            this._opacity = (this._ori_opacity * (1-Math.cos(d/t*Math.PI/2)) + this._targetOpacity * Math.cos(d/t*Math.PI/2));
            this._duration--;
            if(this._duration == 0){
                this._smoothmove = false;
                this._totaltime = 0;
            }
        }
    }else{
        if (this._duration > 0) {
            var d = this._duration;
            this._x = (this._x * (d - 1) + this._targetX) / d;
            this._y = (this._y * (d - 1) + this._targetY) / d;
            this._scaleX  = (this._scaleX  * (d - 1) + this._targetScaleX)  / d;
            this._scaleY  = (this._scaleY  * (d - 1) + this._targetScaleY)  / d;
            this._opacity = (this._opacity * (d - 1) + this._targetOpacity) / d;
            this._duration--;
        }
    }
};
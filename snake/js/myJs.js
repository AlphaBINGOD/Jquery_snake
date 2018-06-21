//毫秒转特定的时间单位
//传入参数：毫秒，要转换到的时间单位（second，minutes，hour，day，year）
//
function milliTransition(millisecond,transitionTime) {
    var result;
    if(transitionTime === "second"){
        result = millisecond / 1000;
    }
    if(transitionTime === "minutes"){
        result = millisecond / 1000 /60;
    }
    if(transitionTime === "hour"){
        result = millisecond / 1000 / 60 / 60;
    }
    if(transitionTime === "day"){
        result = millisecond / 1000 / 60 / 60 / 24;
    }
    if(transitionTime === "year"){
        result = millisecond / 1000 / 60 / 60 / 24 / 365;
    }
    return result;
}


//名称：
//描述：显示与关闭显示特定位置的盒子背景颜色
//传入参数：面板盒子（用于判断盒子大小），坐标值（横坐标坐标值，纵坐标值），显示标志，
//
function displayXY(frame, xyJSON, flag) {
    var allObj = frame + " div";
    if(flag === true){
        $(allObj).eq((xyJSON.Y - 1) * ($(frame).attr("frameWidth")) + (xyJSON.X-1)).css({"background":xyJSON.color});
    }else{
        $(allObj).eq((xyJSON.Y - 1) * ($(frame).attr("frameWidth")) + (xyJSON.X-1)).css({"background":"#ddd"});
    }

}





//定时更新数据
//传入参数：
//
function  updateDis(frame, xyJSON,flag,dir) {
    displayXY(frame,xyJSON,false);
    switch(dir){
        case "left" :
            xyJSON.X--;
            if(xyJSON.X < 1){
                xyJSON.X = $(frame).attr("frameWidth");
            }
            displayXY(frame,xyJSON,flag);
            break;
        case "up":
            xyJSON.Y--;
            if(xyJSON.Y < 1){
                xyJSON.Y = $(frame).attr("frameHeight");
            }
            displayXY(frame,xyJSON,flag);
            break;
        case "right":
            xyJSON.X++;
            if(xyJSON.X > $(frame).attr("frameWidth")){
                xyJSON.X = 1;
            }
            displayXY(frame,xyJSON,flag);
            break;
        case "down" :
            xyJSON.Y++;
            if(xyJSON.Y > $(frame).attr("frameHeight")){
                xyJSON.Y = 1;
            }
            displayXY(frame,xyJSON,flag);
            break;
}}

//移动
//传入参数： json数组
function move(frame, jsonArr,dir,foodJSON,callback) {
    //移动的思想是，将最后一个点取消，显示头部后一个点
    //取消最后一个点
    //关闭最后一个点的显示
    var addX = 0;
    var addY = 0;
    var minusX = 0;
    var minusY = 0;
    var maxWidth = parseInt($(frame).attr("frameWidth"));
    var maxHeight = parseInt($(frame).attr("frameHeight"));
    //根据当前方向改变头部的运动方向
    switch(dir){
        case "up"    : minusY = -1 ; break;
        case "down"  : addY   =  1 ; break;
        case "left"  : minusX = -1 ; break;
        case "right" : addX   =  1 ; break;
    }

    //向数组头部添加一个新的的点
    var newX = jsonArr[0].X + addX + minusX;
    var newY = jsonArr[0].Y + addY + minusY;
    newX = newX < 1 ? maxWidth  : newX;
    newY = newY < 1 ? maxHeight : newY;
    newX = newX > maxWidth  ? 1 : newX;
    newY = newY > maxHeight ? 1 : newY;

    var newDot = {
        X : newX,
        Y : newY,
        color : "#153170"
    };
    //判断是否吃到食物
    jsonArr.unshift(newDot);
    displayXY(frame, newDot, true);
    //如果吃到食物，则不进行尾部清除
    if(newX === foodJSON.X && newY === foodJSON.Y){
        callback && callback();
        return;
    }
    //尾部的运动

    displayXY(frame, jsonArr[jsonArr.length-1], false);
    //删除数组最后一个点
    jsonArr.pop();
}

//食物构造函数；
//用于生成新的食物位置
function creatFood(frame) {
    var newFood = {
        X : Math.ceil(Math.random() * $(frame).attr("frameWidth")),
        Y : Math.ceil(Math.random() * $(frame).attr("frameHeight")),
        color : "red"
    };
    return newFood;
}

//数据更新显示
//用于更新游戏相关数据

function update(firstBox, secondBox, score, speed) {
    $(firstBox).text(score);
    $(secondBox).text(speed);
}






"use strict";

var TouchHistoryMath=require('react/lib/TouchHistoryMath');

var currentCentroidXOfTouchesChangedAfter=
TouchHistoryMath.currentCentroidXOfTouchesChangedAfter;
var currentCentroidYOfTouchesChangedAfter=
TouchHistoryMath.currentCentroidYOfTouchesChangedAfter;
var previousCentroidXOfTouchesChangedAfter=
TouchHistoryMath.previousCentroidXOfTouchesChangedAfter;
var previousCentroidYOfTouchesChangedAfter=
TouchHistoryMath.previousCentroidYOfTouchesChangedAfter;
var currentCentroidX=TouchHistoryMath.currentCentroidX;
var currentCentroidY=TouchHistoryMath.currentCentroidY;
































































































var PanResponder={
































































_initializeGestureState:function _initializeGestureState(gestureState){
gestureState.moveX=0;
gestureState.moveY=0;
gestureState.x0=0;
gestureState.y0=0;
gestureState.dx=0;
gestureState.dy=0;
gestureState.vx=0;
gestureState.vy=0;
gestureState.numberActiveTouches=0;

gestureState._accountsForMovesUpTo=0;
},

























_updateGestureStateOnMove:function _updateGestureStateOnMove(gestureState,touchHistory){
gestureState.numberActiveTouches=touchHistory.numberActiveTouches;
gestureState.moveX=currentCentroidXOfTouchesChangedAfter(
touchHistory,
gestureState._accountsForMovesUpTo);

gestureState.moveY=currentCentroidYOfTouchesChangedAfter(
touchHistory,
gestureState._accountsForMovesUpTo);

var movedAfter=gestureState._accountsForMovesUpTo;
var prevX=previousCentroidXOfTouchesChangedAfter(touchHistory,movedAfter);
var x=currentCentroidXOfTouchesChangedAfter(touchHistory,movedAfter);
var prevY=previousCentroidYOfTouchesChangedAfter(touchHistory,movedAfter);
var y=currentCentroidYOfTouchesChangedAfter(touchHistory,movedAfter);
var nextDX=gestureState.dx+(x-prevX);
var nextDY=gestureState.dy+(y-prevY);


var dt=
touchHistory.mostRecentTimeStamp-gestureState._accountsForMovesUpTo;
gestureState.vx=(nextDX-gestureState.dx)/dt;
gestureState.vy=(nextDY-gestureState.dy)/dt;

gestureState.dx=nextDX;
gestureState.dy=nextDY;
gestureState._accountsForMovesUpTo=touchHistory.mostRecentTimeStamp;
},

































create:function create(config){
var gestureState={

stateID:Math.random()};

PanResponder._initializeGestureState(gestureState);
var panHandlers={
onStartShouldSetResponder:function onStartShouldSetResponder(e){
return config.onStartShouldSetPanResponder===undefined?false:
config.onStartShouldSetPanResponder(e,gestureState);
},
onMoveShouldSetResponder:function onMoveShouldSetResponder(e){
return config.onMoveShouldSetPanResponder===undefined?false:
config.onMoveShouldSetPanResponder(e,gestureState);
},
onStartShouldSetResponderCapture:function onStartShouldSetResponderCapture(e){


if(e.nativeEvent.touches){
if(e.nativeEvent.touches.length===1){
PanResponder._initializeGestureState(gestureState);
}
}else
if(e.nativeEvent.originalEvent&&e.nativeEvent.originalEvent.type==='mousedown'){
PanResponder._initializeGestureState(gestureState);
}
gestureState.numberActiveTouches=e.touchHistory.numberActiveTouches;
return config.onStartShouldSetPanResponderCapture!==undefined?
config.onStartShouldSetPanResponderCapture(e,gestureState):false;
},

onMoveShouldSetResponderCapture:function onMoveShouldSetResponderCapture(e){
var touchHistory=e.touchHistory;



if(gestureState._accountsForMovesUpTo===touchHistory.mostRecentTimeStamp){
return false;
}
PanResponder._updateGestureStateOnMove(gestureState,touchHistory);
return config.onMoveShouldSetPanResponderCapture?
config.onMoveShouldSetPanResponderCapture(e,gestureState):false;
},

onResponderGrant:function onResponderGrant(e){
gestureState.x0=currentCentroidX(e.touchHistory);
gestureState.y0=currentCentroidY(e.touchHistory);
gestureState.dx=0;
gestureState.dy=0;
config.onPanResponderGrant&&config.onPanResponderGrant(e,gestureState);

return config.onShouldBlockNativeResponder===undefined?true:
config.onShouldBlockNativeResponder();
},

onResponderReject:function onResponderReject(e){
config.onPanResponderReject&&config.onPanResponderReject(e,gestureState);
},

onResponderRelease:function onResponderRelease(e){
config.onPanResponderRelease&&config.onPanResponderRelease(e,gestureState);
PanResponder._initializeGestureState(gestureState);
},

onResponderStart:function onResponderStart(e){
var touchHistory=e.touchHistory;
gestureState.numberActiveTouches=touchHistory.numberActiveTouches;
config.onPanResponderStart&&config.onPanResponderStart(e,gestureState);
},

onResponderMove:function onResponderMove(e){
var touchHistory=e.touchHistory;


if(gestureState._accountsForMovesUpTo===touchHistory.mostRecentTimeStamp){
return;
}


PanResponder._updateGestureStateOnMove(gestureState,touchHistory);
config.onPanResponderMove&&config.onPanResponderMove(e,gestureState);
},

onResponderEnd:function onResponderEnd(e){
var touchHistory=e.touchHistory;
gestureState.numberActiveTouches=touchHistory.numberActiveTouches;
config.onPanResponderEnd&&config.onPanResponderEnd(e,gestureState);
},

onResponderTerminate:function onResponderTerminate(e){
config.onPanResponderTerminate&&
config.onPanResponderTerminate(e,gestureState);
PanResponder._initializeGestureState(gestureState);
},

onResponderTerminationRequest:function onResponderTerminationRequest(e){
return config.onPanResponderTerminationRequest===undefined?true:
config.onPanResponderTerminationRequest(e,gestureState);
}};

return{panHandlers:panHandlers};
}};


module.exports=PanResponder;
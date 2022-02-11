pc.script.createLoadingScreen((function(e){e.on("preload:end",(function(){e.off("preload:progress")})),e.on("preload:progress",(function(e){var n=document.getElementById("progress-bar");n&&(e=Math.min(1,Math.max(0,e)),n.style.width=100*e+"%")})),e.on("start",(function(){document.getElementById("application-splash-wrapper")}))}));var MouseInput=pc.createScript("mouseInput");MouseInput.attributes.add("orbitSensitivity",{type:"number",default:.3,title:"Orbit Sensitivity",description:"How fast the camera moves around the orbit. Higher is faster"}),MouseInput.attributes.add("distanceSensitivity",{type:"number",default:.15,title:"Distance Sensitivity",description:"How fast the camera moves in and out. Higher is faster"}),MouseInput.prototype.changesenisitivty=function(t){this.orbitSensitivity=t},MouseInput.prototype.initialize=function(){var t=this;if(this.app.on("set:orbitsens",(function(o){t.changesenisitivty(o)})),this.orbitCamera=this.entity.script.orbitCamera,this.orbitCamera){var onMouseOut=function(o){t.onMouseOut(o)};this.app.mouse.on(pc.EVENT_MOUSEDOWN,this.onMouseDown,this),this.app.mouse.on(pc.EVENT_MOUSEUP,this.onMouseUp,this),this.app.mouse.on(pc.EVENT_MOUSEMOVE,this.onMouseMove,this),window.addEventListener("mouseout",onMouseOut,!1),this.on("destroy",(function(){this.app.mouse.off(pc.EVENT_MOUSEDOWN,this.onMouseDown,this),this.app.mouse.off(pc.EVENT_MOUSEUP,this.onMouseUp,this),this.app.mouse.off(pc.EVENT_MOUSEMOVE,this.onMouseMove,this),window.removeEventListener("mouseout",onMouseOut,!1)}))}this.app.mouse.disableContextMenu(),this.mouseSteps=[],this.lookButtonDown=!1,this.panButtonDown=!1,this.lastPoint=new pc.Vec2},MouseInput.fromWorldPoint=new pc.Vec3,MouseInput.toWorldPoint=new pc.Vec3,MouseInput.worldDiff=new pc.Vec3,MouseInput.prototype.pan=function(t){var o=MouseInput.fromWorldPoint,i=MouseInput.toWorldPoint,e=MouseInput.worldDiff,s=this.entity.camera,n=this.orbitCamera.distance;s.screenToWorld(t.x,t.y,n,o),s.screenToWorld(this.lastPoint.x,this.lastPoint.y,n,i),e.sub2(i,o),this.orbitCamera.pivotPoint.add(e)},MouseInput.prototype.onMouseDown=function(t){switch(t.button){case pc.MOUSEBUTTON_LEFT:this.lookButtonDown=!0;break;case pc.MOUSEBUTTON_MIDDLE:case pc.MOUSEBUTTON_RIGHT:this.panButtonDown=!0}},MouseInput.prototype.onMouseUp=function(t){switch(t.button){case pc.MOUSEBUTTON_LEFT:this.lookButtonDown=!1;break;case pc.MOUSEBUTTON_MIDDLE:case pc.MOUSEBUTTON_RIGHT:this.panButtonDown=!1}},MouseInput.prototype.onMouseMove=function(t){pc.app.mouse;if(this.lookButtonDown){this.orbitCamera.pitch-=t.dy*this.orbitSensitivity,this.mouseSteps.unshift(t.dx*this.orbitSensitivity);let o=this.orbitCamera.yaw-t.dx*this.orbitSensitivity;this.orbitCamera.yaw=pc.math.lerp(this.orbitCamera.yaw,o,.25)}else this.panButtonDown&&this.pan(t);this.lastPoint.set(t.x,t.y)},MouseInput.prototype.onMouseWheel=function(t){this.orbitCamera.distance-=t.wheel*this.distanceSensitivity*(.1*this.orbitCamera.distance),t.event.preventDefault()},MouseInput.prototype.onMouseOut=function(t){this.lookButtonDown=!1,this.panButtonDown=!1};var TouchInput=pc.createScript("touchInput");TouchInput.attributes.add("orbitSensitivity",{type:"number",default:.4,title:"Orbit Sensitivity",description:"How fast the camera moves around the orbit. Higher is faster"}),TouchInput.attributes.add("distanceSensitivity",{type:"number",default:.2,title:"Distance Sensitivity",description:"How fast the camera moves in and out. Higher is faster"}),TouchInput.prototype.initialize=function(){this.orbitCamera=this.entity.script.orbitCamera,this.lastTouchPoint=new pc.Vec2,this.lastPinchMidPoint=new pc.Vec2,this.lastPinchDistance=0,this.orbitCamera&&this.app.touch&&(this.app.touch.on(pc.EVENT_TOUCHSTART,this.onTouchStartEndCancel,this),this.app.touch.on(pc.EVENT_TOUCHEND,this.onTouchStartEndCancel,this),this.app.touch.on(pc.EVENT_TOUCHCANCEL,this.onTouchStartEndCancel,this),this.app.touch.on(pc.EVENT_TOUCHMOVE,this.onTouchMove,this),this.on("destroy",(function(){this.app.touch.off(pc.EVENT_TOUCHSTART,this.onTouchStartEndCancel,this),this.app.touch.off(pc.EVENT_TOUCHEND,this.onTouchStartEndCancel,this),this.app.touch.off(pc.EVENT_TOUCHCANCEL,this.onTouchStartEndCancel,this),this.app.touch.off(pc.EVENT_TOUCHMOVE,this.onTouchMove,this)})),this.app.on("set:orbitsens",(function(t){this.changesenisitivty(t)})))},TouchInput.prototype.changesenisitivty=function(t){this.orbitSensitivity=t},TouchInput.prototype.getPinchDistance=function(t,i){var n=t.x-i.x,o=t.y-i.y;return Math.sqrt(n*n+o*o)},TouchInput.prototype.calcMidPoint=function(t,i,n){n.set(i.x-t.x,i.y-t.y),n.scale(.5),n.x+=t.x,n.y+=t.y},TouchInput.prototype.onTouchStartEndCancel=function(t){var i=t.touches;1==i.length?this.lastTouchPoint.set(i[0].x,i[0].y):2==i.length&&(this.lastPinchDistance=this.getPinchDistance(i[0],i[1]),this.calcMidPoint(i[0],i[1],this.lastPinchMidPoint))},TouchInput.fromWorldPoint=new pc.Vec3,TouchInput.toWorldPoint=new pc.Vec3,TouchInput.worldDiff=new pc.Vec3,TouchInput.prototype.pan=function(t){var i=TouchInput.fromWorldPoint,n=TouchInput.toWorldPoint,o=TouchInput.worldDiff,h=this.entity.camera,c=this.orbitCamera.distance;h.screenToWorld(t.x,t.y,c,i),h.screenToWorld(this.lastPinchMidPoint.x,this.lastPinchMidPoint.y,c,n),o.sub2(n,i),this.orbitCamera.pivotPoint.add(o)},TouchInput.pinchMidPoint=new pc.Vec2,TouchInput.prototype.onTouchMove=function(t){var i=TouchInput.pinchMidPoint,n=t.touches;if(1==n.length){var o=n[0];this.orbitCamera.pitch-=(o.y-this.lastTouchPoint.y)*this.orbitSensitivity,this.orbitCamera.yaw-=(o.x-this.lastTouchPoint.x)*this.orbitSensitivity,this.lastTouchPoint.set(o.x,o.y)}else if(2==n.length){var h=this.getPinchDistance(n[0],n[1]),c=h-this.lastPinchDistance;this.lastPinchDistance=h,this.orbitCamera.distance-=c*this.distanceSensitivity*.1*(.1*this.orbitCamera.distance),this.calcMidPoint(n[0],n[1],i),this.pan(i),this.lastPinchMidPoint.copy(i)}};var OrbitCamera=pc.createScript("orbitCamera");OrbitCamera.attributes.add("distanceMax",{type:"number",default:0,title:"Distance Max",description:"Setting this at 0 will give an infinite distance limit"}),OrbitCamera.attributes.add("distanceMin",{type:"number",default:0,title:"Distance Min"}),OrbitCamera.attributes.add("pitchAngleMax",{type:"number",default:90,title:"Pitch Angle Max (degrees)"}),OrbitCamera.attributes.add("pitchAngleMin",{type:"number",default:-90,title:"Pitch Angle Min (degrees)"}),OrbitCamera.attributes.add("inertiaFactor",{type:"number",default:0,title:"Inertia Factor",description:"Higher value means that the camera will continue moving after the user has stopped dragging. 0 is fully responsive."}),OrbitCamera.attributes.add("focusEntity",{type:"entity",title:"Focus Entity",description:"Entity for the camera to focus on. If blank, then the camera will use the whole scene"}),OrbitCamera.attributes.add("frameOnStart",{type:"boolean",default:!0,title:"Frame on Start",description:'Frames the entity or scene at the start of the application."'}),Object.defineProperty(OrbitCamera.prototype,"distance",{get:function(){return this._targetDistance},set:function(t){this._targetDistance=this._clampDistance(t)}}),Object.defineProperty(OrbitCamera.prototype,"pitch",{get:function(){return this._targetPitch},set:function(t){this._targetPitch=this._clampPitchAngle(t)}}),Object.defineProperty(OrbitCamera.prototype,"yaw",{get:function(){return this._targetYaw},set:function(t){this._targetYaw=t;var i=(this._targetYaw-this._yaw)%360;this._targetYaw=i>180?this._yaw-(360-i):i<-180?this._yaw+(360+i):this._yaw+i}}),Object.defineProperty(OrbitCamera.prototype,"pivotPoint",{get:function(){return this._pivotPoint},set:function(t){this._pivotPoint.copy(t)}}),OrbitCamera.prototype.focus=function(t){this._buildAabb(t,0);var i=this._modelsAabb.halfExtents,e=Math.max(i.x,Math.max(i.y,i.z));e/=Math.tan(.5*this.entity.camera.fov*pc.math.DEG_TO_RAD),e*=2,this.distance=e,this._removeInertia(),this._pivotPoint.copy(this._modelsAabb.center)},OrbitCamera.distanceBetween=new pc.Vec3,OrbitCamera.prototype.resetAndLookAtPoint=function(t,i){this.pivotPoint.copy(i),this.entity.setPosition(t),this.entity.lookAt(i);var e=OrbitCamera.distanceBetween;e.sub2(i,t),this.distance=e.length(),this.pivotPoint.copy(i);var a=this.entity.getRotation();this.yaw=this._calcYaw(a),this.pitch=this._calcPitch(a,this.yaw),this._removeInertia(),this._updatePosition()},OrbitCamera.prototype.resetAndLookAtEntity=function(t,i){this._buildAabb(i,0),this.resetAndLookAtPoint(t,this._modelsAabb.center)},OrbitCamera.prototype.reset=function(t,i,e){this.pitch=i,this.yaw=t,this.distance=e,this._removeInertia()},OrbitCamera.prototype.setintertiafactor=function(t){this.inertiaFactor=inertiaFactor},OrbitCamera.prototype.initialize=function(){var t=this;this.app.on("set:intertiafactor",(function(i){t.setintertiafactor(i)})),this.app.on("set:fov",(function(i){t.entity.camera.fov=i}));var onWindowResize=function(){t._checkAspectRatio()};window.addEventListener("resize",onWindowResize,!1),this._checkAspectRatio(),this._modelsAabb=new pc.BoundingBox,this._buildAabb(this.focusEntity||this.app.root,0),this.entity.lookAt(this._modelsAabb.center),this._pivotPoint=new pc.Vec3,this._pivotPoint.copy(this._modelsAabb.center);var i=this.entity.getRotation();if(this._yaw=this._calcYaw(i),this._pitch=this._clampPitchAngle(this._calcPitch(i,this._yaw)),this.entity.setLocalEulerAngles(this._pitch,this._yaw,0),this._distance=0,this._targetYaw=this._yaw,this._targetPitch=this._pitch,this.frameOnStart)this.focus(this.focusEntity||this.app.root);else{var e=new pc.Vec3;e.sub2(this.entity.getPosition(),this._pivotPoint),this._distance=this._clampDistance(e.length())}this._targetDistance=this._distance,this.on("attr:pitchAngleMin",(function(t,i){this._targetPitch=this._clampPitchAngle(this._pitch)})),this.on("attr:pitchAngleMax",(function(t,i){this._targetPitch=this._clampPitchAngle(this._pitch)})),this.on("attr:focusEntity",(function(t,i){this.frameOnStart?this.focus(t||this.app.root):this.resetAndLookAtEntity(this.entity.getPosition(),t||this.app.root)})),this.on("attr:frameOnStart",(function(t,i){t&&this.focus(this.focusEntity||this.app.root)})),this.on("destroy",(function(){window.removeEventListener("resize",onWindowResize,!1)}))},OrbitCamera.prototype.update=function(t){var i=0===this.inertiaFactor?1:Math.min(t/this.inertiaFactor,1);this._distance=pc.math.lerp(this._distance,this._targetDistance,i),this._yaw=pc.math.lerp(this._yaw,this._targetYaw,i),this._pitch=pc.math.lerp(this._pitch,this._targetPitch,i),this._updatePosition()},OrbitCamera.prototype._updatePosition=function(){this.entity.setLocalPosition(0,0,0),this.entity.setLocalEulerAngles(this._pitch,this._yaw,0);var t=this.entity.getPosition();t.copy(this.entity.forward),t.scale(-this._distance),t.add(this.pivotPoint),this.entity.setPosition(t)},OrbitCamera.prototype._removeInertia=function(){this._yaw=this._targetYaw,this._pitch=this._targetPitch,this._distance=this._targetDistance},OrbitCamera.prototype._checkAspectRatio=function(){var t=this.app.graphicsDevice.height,i=this.app.graphicsDevice.width;this.entity.camera.horizontalFov=t>i},OrbitCamera.prototype._buildAabb=function(t,i){var e,a=0,n=0;if(t instanceof pc.Entity){var s=[],r=t.findComponents("render");for(a=0;a<r.length;++a)for(e=r[a].meshInstances,n=0;n<e.length;n++)s.push(e[n]);var o=t.findComponents("model");for(a=0;a<o.length;++a)for(e=o[a].meshInstances,n=0;n<e.length;n++)s.push(e[n]);for(a=0;a<s.length;a++)0===i?this._modelsAabb.copy(s[a].aabb):this._modelsAabb.add(s[a].aabb),i+=1}for(a=0;a<t.children.length;++a)i+=this._buildAabb(t.children[a],i);return i},OrbitCamera.prototype._calcYaw=function(t){var i=new pc.Vec3;return t.transformVector(pc.Vec3.FORWARD,i),Math.atan2(-i.x,-i.z)*pc.math.RAD_TO_DEG},OrbitCamera.prototype._clampDistance=function(t){return this.distanceMax>0?pc.math.clamp(t,this.distanceMin,this.distanceMax):Math.max(t,this.distanceMin)},OrbitCamera.prototype._clampPitchAngle=function(t){return pc.math.clamp(t,-this.pitchAngleMax,-this.pitchAngleMin)},OrbitCamera.quatWithoutYaw=new pc.Quat,OrbitCamera.yawOffset=new pc.Quat,OrbitCamera.prototype._calcPitch=function(t,i){var e=OrbitCamera.quatWithoutYaw,a=OrbitCamera.yawOffset;a.setFromEulerAngles(0,-i,0),e.mul2(a,t);var n=new pc.Vec3;return e.transformVector(pc.Vec3.FORWARD,n),Math.atan2(n.y,-n.z)*pc.math.RAD_TO_DEG};var CameraAutoRotate=pc.createScript("cameraAutoRotate");CameraAutoRotate.attributes.add("speed",{type:"number",default:1,title:"Speed",description:"The rotate speed of camera."}),CameraAutoRotate.prototype.initialize=function(){this.orbitCamera=this.entity.script.orbitCamera},CameraAutoRotate.prototype.update=function(t){this.orbitCamera.yaw+=this.speed*t};var LoadExternalImage=pc.createScript("loadExternalImage");LoadExternalImage.attributes.add("imageUrl",{type:"string"}),LoadExternalImage.prototype.initialize=function(){this.app.on("image:set",(function(e){console.log("!!!!!!!!!!!!!!!"),console.log(e),this.setImage(e)}),this);var e=this;function getURLParameter(e){return decodeURIComponent((new RegExp("[?|&]"+e+"=([^&;]+?)(&|#|;|$)").exec(location.search)||[null,""])[1].replace(/\+/g,"%20"))||null}console.log("hmmm");let o=!!getURLParameter("imageUrl")&&getURLParameter("imageUrl");if(console.log(o),console.log("^^6"),this.app.loader.getHandler("texture").crossOrigin="anonymous",o){var a=new pc.Asset("myTexture","texture",{url:o});this.app.assets.add(a),a.on("error",(function(e){console.log(e)})),a.on("load",(function(o){console.log("loaded");var a=e.entity.model.meshInstances[0].material;console.log("mart"),console.log(a._diffuseMap),a.diffuseMap=o.resource,a.update()})),this.app.assets.load(a)}},LoadExternalImage.prototype.update=function(e){},LoadExternalImage.prototype.setImage=function(e){var o=this;if(console.log("hmmm"),console.log(e),console.log("^^6"),this.app.loader.getHandler("texture").crossOrigin="anonymous",e){var a=new pc.Asset("myTexture","texture",{url:e});this.app.assets.add(a),a.on("error",(function(e){console.log(e)})),a.on("load",(function(e){console.log("loaded");var a=o.entity.model.meshInstances[0].material;console.log("mart"),console.log(a._diffuseMap),a.diffuseMap=e.resource,a.update()})),this.app.assets.load(a)}},window.addEventListener("message",(function(e){var o=e.data.imageUrl;pc.Application.getApplication().fire("image:set",o)}),!1);const colorConfig={black:0,blue:1,gold:2,gray:3,green:4,red:5};var ChangeModel=pc.createScript("changeModel");function getURLParameter(e){return decodeURIComponent((new RegExp("[?|&]"+e+"=([^&;]+?)(&|#|;|$)").exec(location.search)||[null,""])[1].replace(/\+/g,"%20"))||null}ChangeModel.attributes.add("imageUrl",{type:"string"}),ChangeModel.attributes.add("materials",{type:"asset",assetType:"material",array:!0}),ChangeModel.prototype.initialize=function(){console.log("uwagadaje:"),this.app.on("config:set",(function(e){console.log("!!!!!!!!!!!!!!!"),console.log(e),this.setConfig(e)}),this),console.log("hmmm");let e=getURLParameter("qscolor"),o=getURLParameter("qsimage"),t=getURLParameter("qsfov");(e||o||t)&&this.app.fire("config:set",{imageUrl:o,color:e,fov:t})},ChangeModel.prototype.update=function(e){},ChangeModel.prototype.setConfig=function(e){console.log("dajeconf"),console.log(e),e.imageUrl&&this.setImage(e.imageUrl),e.color&&this.setMaterial(this.materials[colorConfig[e.color]]),e.orbit_sens&&this.app.fire("set:orbitsens",e.orbit_sens),e.intertia_factor&&this.app.fire("set:intertiafactor",e.intertia_factor),e.fov&&this.app.fire("set:fov",e.fov)},ChangeModel.prototype.setMaterial=function(e){var o=this.entity.render.meshInstances[0].material;this.entity.render.meshInstances[0].material=e._resources[0],console.log("bdz"),console.log(o.diffuseMap),o.update(),console.log("oho"),console.log(o),console.log("2"),console.log(e)},ChangeModel.prototype.setImage=function(e){var o=this;if(console.log(e),console.log("^^6"),this.app.loader.getHandler("texture").crossOrigin="anonymous",e){var t=new pc.Asset("myTexture","texture",{url:e});this.app.assets.add(t),t.on("error",(function(e){console.log(e)})),t.on("load",(function(e){console.log("loaded");var t=o.entity.render.meshInstances[2].material;console.log("mart"),console.log(t._diffuseMap),t.diffuseMap=e.resource,t.update()})),this.app.assets.load(t)}},window.addEventListener("message",(function(e){console.log("event"),console.log(e);var o=e.data.config;pc.Application.getApplication().fire("config:set",o)}),!1);var CustomShader=pc.createScript("customShader");CustomShader.attributes.add("vs",{type:"asset",assetType:"shader",title:"Vertex Shader"}),CustomShader.attributes.add("fs",{type:"asset",assetType:"shader",title:"Fragment Shader"}),CustomShader.attributes.add("diffuseMap",{type:"asset",assetType:"texture",title:"Diffuse Map"}),CustomShader.prototype.initialize=function(){this.time=0,this.material=new pc.Material,this.diffuseTexture=this.diffuseMap.resource,this.entity.model.model.meshInstances[0].material=this.material,this.createShader()},CustomShader.prototype.update=function(e){},CustomShader.prototype.createShader=function(){var e=this.app,t=(this.entity.model.model,this.vs.resource),s=this.fs.resource,a={attributes:{vVertex:pc.SEMANTIC_POSITION,vNormal:pc.SEMANTIC_NORMAL,vTexCoord:pc.SEMANTIC_TEXCOORD0},vshader:t,fshader:s},r=e.graphicsDevice;this.shader=new pc.Shader(r,a),this.material.setShader(this.shader),this.material.setParameter("uTime",0),this.material.setParameter("uDiffuseMap",this.diffuseTexture)},CustomShader.prototype.updateShader=function(e){this.diffuseMap=e,this.diffuseTexture=this.diffuseMap.resource,this.entity.model.model.meshInstances[0].material.setParameter("uDiffuseMap",this.diffuseTexture)};
import * as BABYLON from 'babylonjs'
import * as GUI from 'babylonjs-gui'

export default function run(canvas: HTMLCanvasElement) {
  initFunction(canvas).then(engine => {
    window.addEventListener("resize", function () {
      engine.resize();
    });
  })
}

function startRenderLoop(engine: BABYLON.Engine, sceneToRender: BABYLON.Scene) {
  engine.runRenderLoop(function () {
    if (sceneToRender && sceneToRender.activeCamera) {
      sceneToRender.render();
    }
  });
}

function createDefaultEngine(canvas: HTMLCanvasElement) {
  return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true,  disableWebGL2Support: false});
};

function createScene(engine: BABYLON.Engine, canvas: HTMLCanvasElement) {
  var scene = new BABYLON.Scene(engine);
  BABYLON.EngineStore._LastCreatedScene=scene;
  BABYLON.EngineStore.Instances.push(engine);
  var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 100, new BABYLON.Vector3(0, 0, 0), scene);
  camera.setPosition(new BABYLON.Vector3(80, 80, 120));
  camera.attachControl(canvas, true);

  var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);

  BABYLON.SceneLoader.ImportMesh("", "/scenes/", "skull.babylon", scene, function (newMeshes) {
      // Set the target of the camera to the first imported mesh
      // camera.target = newMeshes[0];
  });

  var defaultPipeline = new BABYLON.DefaultRenderingPipeline("default", true, scene, [camera]);
  defaultPipeline.bloomEnabled = false;
  defaultPipeline.fxaaEnabled = false;
  defaultPipeline.bloomWeight = 0.5;
  // defaultPipeline.cameraFov = camera.fov;

  // GUI
  var bgCamera = new BABYLON.ArcRotateCamera("BGCamera", Math.PI / 2 + Math.PI / 7, Math.PI / 2, 100,
      new BABYLON.Vector3(0, 20, 0),
      scene);
  bgCamera.layerMask = 0x10000000;

  console.log(GUI.Control)
  GUI.Control._GetFontOffset
  var advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI", true, scene as any);
  advancedTexture.layer.layerMask = 0x10000000;

  var panel = new GUI.StackPanel();
  panel.width = "300px";
  panel.isVertical = true;
  panel.paddingRight = "20px";
  panel.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
  panel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
  advancedTexture.addControl(panel);

  const addCheckbox = function(text, func, initialValue, left?) {
      const checkbox = new GUI.Checkbox();
      checkbox.width = "20px";
      checkbox.height = "20px";
      checkbox.isChecked = initialValue;
      checkbox.color = "green";
      checkbox.onIsCheckedChangedObservable.add(function(value) {
          func(value);
      });

      const header = GUI.Control.AddHeader(checkbox, text, "180px", { isHorizontal: true, controlFirst: true});
      header.height = "30px";
      header.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

      if (left) {
          header.left = left;
      }

      panel.addControl(header);  
  }

  var addSlider = function(text, func, initialValue, min, max, left) {
      var header = new GUI.TextBlock();
      header.text = text;
      header.height = "30px";
      header.color = "white";
      header.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
      panel.addControl(header); 
      if (left) {
          header.left = left;
      }

      var slider = new GUI.Slider();
      slider.minimum = min;
      slider.maximum = max;
      slider.value = initialValue;
      slider.height = "20px";
      slider.color = "green";
      slider.background = "white";
      slider.onValueChangedObservable.add(function(value) {
          func(value);
      });

      if (left) {
          slider.paddingLeft = left;
      }

     panel.addControl(slider);  
  }

  var addColorPicker = function(text, func, initialValue, left) {
      var header = new GUI.TextBlock();
      header.text = text;
      header.height = "30px";
      header.color = "white";
      header.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
      panel.addControl(header); 

      if (left) {
          header.left = left;
      }        

      var colorPicker = new GUI.ColorPicker();
      colorPicker.value = initialValue;
      colorPicker.size = "100px";
      colorPicker.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
      colorPicker.onValueChangedObservable.add(function(value) {
          func(value);
      });

      if (left) {
          colorPicker.left = left;
      }        

      panel.addControl(colorPicker);  
  }

  var toneMappingEnabled = defaultPipeline.imageProcessing.toneMappingEnabled;
  var vignetteEnabled = defaultPipeline.imageProcessing.vignetteEnabled;
  var vignetteColor = defaultPipeline.imageProcessing.vignetteColor;
  var vignetteWeight = defaultPipeline.imageProcessing.vignetteWeight;
  var vignetteBlendMode = defaultPipeline.imageProcessing.vignetteBlendMode;
  var colorCurvesEnabled = defaultPipeline.imageProcessing.colorCurvesEnabled;
  var contrast = defaultPipeline.imageProcessing.contrast;
  var exposure = defaultPipeline.imageProcessing.exposure;

  var curve = new BABYLON.ColorCurves();
  curve.globalHue = 200;
  curve.globalDensity = 80;
  curve.globalSaturation = 80;

  curve.highlightsHue = 20;
  curve.highlightsDensity = 80;
  curve.highlightsSaturation = -80;

  curve.shadowsHue = 2;
  curve.shadowsDensity = 80;
  curve.shadowsSaturation = 40;
  
  defaultPipeline.imageProcessing.colorCurves = curve;     

  var rebindValues = function() {
      if (defaultPipeline.imageProcessing) {
          defaultPipeline.imageProcessing.toneMappingEnabled = toneMappingEnabled;
          defaultPipeline.imageProcessing.vignetteEnabled = vignetteEnabled;
          defaultPipeline.imageProcessing.vignetteWeight = vignetteWeight;
          defaultPipeline.imageProcessing.vignetteColor = vignetteColor;
          defaultPipeline.imageProcessing.vignetteBlendMode = vignetteBlendMode;
          defaultPipeline.imageProcessing.colorCurvesEnabled = colorCurvesEnabled;
          defaultPipeline.imageProcessing.contrast = contrast;
          defaultPipeline.imageProcessing.exposure = exposure;
          defaultPipeline.imageProcessing.colorCurves = curve;            
      }
  }

  addCheckbox("fxaa", function(value) {
      defaultPipeline.fxaaEnabled = value;
      rebindValues();
  }, defaultPipeline.fxaaEnabled );

  addCheckbox("bloom", function(value) {
      defaultPipeline.bloomEnabled = value;
      rebindValues();
  }, defaultPipeline.bloomEnabled);    

  addSlider("bloom weight", function(value) {
      defaultPipeline.bloomWeight = value;
  }, defaultPipeline.bloomWeight, 0, 2, "20px");        

  addCheckbox("image processing", function(value) {
      defaultPipeline.imageProcessingEnabled = value;
      rebindValues();
  }, defaultPipeline.imageProcessingEnabled);

  addCheckbox("tone mapping", function(value) {
      defaultPipeline.imageProcessing.toneMappingEnabled = value;
      toneMappingEnabled = value;
  }, toneMappingEnabled, "20px");      

  addCheckbox("vignette", function(value) {
      defaultPipeline.imageProcessing.vignetteEnabled = value;
      vignetteEnabled = value;
  }, vignetteEnabled, "20px");     

  addCheckbox("vignette multiply", function(value) {
      var blendMode = value ? BABYLON.ImageProcessingConfiguration.VIGNETTEMODE_MULTIPLY : BABYLON.ImageProcessingConfiguration.VIGNETTEMODE_OPAQUE;
      defaultPipeline.imageProcessing.vignetteBlendMode = blendMode;
      vignetteBlendMode = blendMode;
  }, vignetteBlendMode === BABYLON.ImageProcessingConfiguration.VIGNETTEMODE_MULTIPLY, "40px");     

  addColorPicker("vignette color", function(value) {
      defaultPipeline.imageProcessing.vignetteColor = value;
      vignetteColor = value;
  }, vignetteColor, "40px");    

  addSlider("vignette weight", function(value) {
      defaultPipeline.imageProcessing.vignetteWeight = value;
      vignetteWeight = value;
  }, vignetteWeight, 0, 10, "40px");             

  addCheckbox("color curves", function(value) {
      defaultPipeline.imageProcessing.colorCurvesEnabled = value;
      colorCurvesEnabled = value;
  }, colorCurvesEnabled, "20px");    

  addSlider("camera contrast", function(value) {
      defaultPipeline.imageProcessing.contrast = value;
      contrast = value;
  }, contrast, 0, 4, "20px");  

  addSlider("camera exposure", function(value) {
      defaultPipeline.imageProcessing.exposure = value;
      exposure = value;
      console.log(value);
  }, exposure, 0, 4, "20px");      
  
  scene.activeCameras = [camera, bgCamera];
         
  return scene;   
}

async function asyncEngineCreation(canvas: HTMLCanvasElement) {
  try {
    return createDefaultEngine(canvas);
  } catch(e) {
    console.log("the available createEngine function failed. Creating the default engine instead");
    return createDefaultEngine(canvas);
  }
}

async function initFunction(canvas: HTMLCanvasElement) {
  const engine = await asyncEngineCreation(canvas);
  if (!engine) throw 'engine should not be null.';
  const scene = createScene(engine, canvas);
  startRenderLoop(engine, scene);
  return engine
}

/**
 * Adam vanWestrienen
 */

let imageLibrary = "https://source.unsplash.com/random/";
let p1, p2, p3, p4, p5;
let control;
let myCanvas;
let canvasWidth = 1100;
let canvasHeight = 800;
let imageLoaded = false;
let themeChanged = false;
let bgColorChanged = false;
let drawChanged = false;
let shapeChanged = false;
let colorChanged = false;
let sizeChanged = false;
let imgSizeChanged = false;
let randomPicturePositionX;
let randomPicturePositionY;
let loadCollageButton = false;
let randomImg;
let goLoadPhotos = false;
let imageArray = [];
let lineArray = [];
let rectArray = [];
let pointArray = [];
let ellipseArray = [];
let vertexArray = [];
let numShapesChanged = false;
let canvasWidthChanged = false;
let canvasHeightChanged = false;


function preload() {

}


function setup() {
    myCanvas = createCanvas(canvasWidth, canvasHeight);
    myCanvas.parent('canvas-container');
    createControls();

    lineLoader(100);
    rectLoader(100);
    pointLoader(100);
    ellipseLoader(100);
    vertexLoader(100);

  }


  function draw() {
    frameRate(20);
    myCanvas.width = control.canvasWidth;
    myCanvas.height = control.canvasHeight;

    // reload shape arrays if canvas size is adjusted
    if (canvasWidthChanged || canvasHeightChanged) {
      lineArray = new Array();
      rectArray = new Array();
      pointArray = new Array();
      ellipseArray = new Array();
      rectLoader(control.numShapes);
      pointLoader(control.numShapes);
      ellipseLoader(control.numShapes);
      lineLoader(control.numShapes);
      canvasWidthChanged = false;
      canvasHeightChanged = false;

    }

    //load collage when LoadCollage is pressed
    if (loadCollageButton) {

      if (goLoadPhotos || loadCollageButton) {
        print("Start loading photos...")

        for (let i = 0; i < int(control.numImages); i++) {
          doSleep(2000).then(() => {
            var randomImg = new picture("https://source.unsplash.com/random/" +
              control.imgSize + "/?" + control.theme + "&key=" + Math.floor(random(1000)));
            if (control.theme === "random") {
              randomImg = new picture("https://source.unsplash.com/user/splashabout/" + control.imgSize);
            }

            loadPhotos(randomImg);
          });
      }
        goLoadPhotos = false;
      }

      switch (control.Shape) {
        case "rect":
          control.addStroke;
          print(control.addStroke);
          noStroke();
          if (control.addStroke) {
            stroke(control.strokeColor);
            strokeWeight(control.strokeWeight);
          }
          fill(control.shapeColor);
          for (let i = 0; i < control.numShapes; i++) {
            rectArray[i].displayRectangle();
          }
        break;
        case "line":
          stroke(control.shapeColor);
          strokeWeight(control.shapeWeight);
          for (let i = 0; i < control.numShapes; i++) {
            lineArray[i].displayLine();
          }
        break;
        case "point":
          stroke(control.shapeColor);
          for (let i = 0; i < control.numShapes; i++) {
            let randomStrokeWeight = random(20);
            strokeWeight(randomStrokeWeight);
            pointArray[i].displayPoint();
          }
        break;
        case "ellipse":
        noFill();
        stroke(control.shapeColor);
        for (let i = 0; i < control.numShapes; i++) {
          let randomStrokeWeight = random(20);
          strokeWeight(control.shapeWeight);
          ellipseArray[i].displayEllipse();
        }
        break;
        case "vertexLine":
          fill(control.shapeColor);
          stroke(control.strokeColor);
          strokeWeight(control.shapeWeight);
          for (let i = 0; i < control.numShapes; i++) {
            vertexArray[i].displayVertexShape();
          }
        break;

      }

      // If the background has changed, update.
      if (bgColorChanged) {
          background(control.backgroundColor);
          bgColorChanged = false;
          imageLoaded = false;
          // loadPicture();
      }

      loadCollageButton = false;

    } // end loadCollage

    // Draw a line if enabled.
    if (control.Draw === "line") {
        // print("Line color: " + control.Color);
        stroke(control.Color);
        strokeWeight(control.Size);
        if (mouseIsPressed === true) {
            line(mouseX, mouseY, pmouseX, pmouseY);
        }
    }

    // Draw a circle if enabled.
    if (control.Draw === "circle") {
        // print("Circle color: " + control.Color);
        fill(control.Color);
        strokeWeight(0);
        if (mouseIsPressed === true) {
            ellipse(mouseX, mouseY, control.Size, control.Size);
        }
    }

  } //end draw function



  function loadPhotos(img){
    cnt = 0;
    start = new Date();
      doSleep(2000).then(() => {
        imageArray.push(img);

          w = random(control.canvasWidth - 400);
          h = random(control.canvasHeight - 300);
          img.display(w, h);
          print("Display photo: " + img.x + "," + img.y  +  ", time: " + elapsedTime(start, new Date()));
        cnt++;
      });

    end = new Date();

  }


  function loadPicture() {
    if (!imageLoaded || themeChanged) {
        p1 = new picture(imageLibrary + control.imgSize + "/?" + control.theme);
        // Pause to let the image load, before attempting display.
        doSleep(doSleepTime).then(() => {
            p1.display(0, 0);
            print(p1.url);
            // print(randomCanvasPositionX + ", " + randomCanvasPositionY);

        });
        themeChanged = false;
        imageLoaded = true;

    }
}

class picture {
    constructor(url, x, y) {
        this.url = url;
        this.x = x;
        this.y = y;
        this.img = loadImage(url);
        print("Image loaded: " + this.url)
    }

    setTranparency(t) {
        this.t = t;
    }

    display(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
      //  tint(255, this.t);

        image(this.img, this.x, this.y, this.w, this.h);
        print("Image displayed: " + this.url);

    }
}

class lineCreator {
  constructor(x1, y1, x2, y2) {
    this.x1 = random(control.canvasWidth);
    this.x2 = random(control.canvasWidth);
    this.y1 = random(control.canvasHeight);
    this.y2 = random(control.canvasHeight);
  }

  displayLine() {
    line(this.x1, this.y1, this.x2, this.y2);
    print("Line created at points: " + this.x1 + ":" + this.y1 + " " + this.x2 + ":" + this.y2);
  }


}

function lineLoader(num) {
  for (let i = 0; i < num; i++) {
    let newLine = new lineCreator();
    lineArray.push(newLine);
  }
}

class rectangleCreator {
  constructor(x, y, width, height) {
    this.x = random(control.canvasWidth);
    this.y = random(control.canvasHeight);
    this.width = random(200);
    this.height = random(200);
    let numRect = control.numShapes;
  }

  displayRectangle() {
    rect(this.x, this.y, this.width, this.height);
    print("rect created at : " + this.x + ":" + this.y);
  }
}

function rectLoader(num) {
  for (let i = 0; i < num; i++) {
    let newRect = new rectangleCreator();
    rectArray.push(newRect);
  }

}

class pointCreator {
  constructor(x, y) {
    this.x = random(control.canvasWidth);
    this.y = random(control.canvasHeight);
  }

  displayPoint() {
    point(this.x, this.y);
  }
}

function pointLoader(num) {
  for (let i = 0; i < num; i++) {
    let newPoint = new pointCreator();
    pointArray.push(newPoint);
  }
}

class ellipseCreator {
  constructor(x, y, width, height) {
    this.x = random(control.canvasWidth);
    this.y = random(control.canvasHeight);
    this.width = random(200);
    this.height = random(200);
  }

  displayEllipse() {
    ellipse(this.x, this.y, this.width, this.height);
  }
}

function ellipseLoader(num) {
  for (let i = 0; i < num; i++) {
    let newEllipse = new ellipseCreator();
    ellipseArray.push(newEllipse);
  }
}

class vertexShape {
  constructor(points, yoff) {
    this.points = random(10, 50);
    this.yoff = random(1);
  }

  displayVertexShape() {
    beginShape();
      for (let x = random(50); x < this.points; x++) {
        let n = noise(this.yoff) * canvasHeight;
        vertex(x * this.points, n);
        this.yoff += 0.05;
      }
    endShape();
  }
}

function vertexLoader(num) {
  for (let i = 0; i < num; i++) {
    let newVertex = new vertexShape();
    vertexArray.push(newVertex);
  }
}




/**
 * Define the control object.
 */
function Controls() {
    this.theme = "random";
    this.img = null;
    this.imgSize = "400x200";
    this.numImages = 0;
    this.canvasHeight = canvasHeight;
    this.canvasWidth = canvasWidth;
    this.backgroundColor = [ 255, 255, 255 ];
    this.Color = [ 255,0,15 ];
    this.Draw = "line";
    this.Size = 5;
    this.Shape = "line";
    this.numShapes = 0;
    this.shapeColor = [ 170, 170, 43];;
    this.shapeWeight = 5;
    this.addStroke = false;
    this.strokeWeight = 0;
    this.strokeColor = [ 0, 0, 0 ];

    this.LoadCollage = function() {
      loadCollageButton = true;
      console.log("LoadCollage button was pressed");
    }
    this.ClearCollage = function() {
      clear();
      console.log("Clear-Collage Button was pressed");
    }
    this.SaveCollage = function() {
      saveCanvas(myCanvas, 'myCollage', 'png');
      console.log("SaveCanvas button clicked");
    }
    this.RandomCollage = function() {
      console.log("RandomCollage button pressed");
      let randomShapeNum = Math.floor(random(20));
      print(randomShapeNum);

    }


}

// function randoCollage() {
//   control.numImages = Math.floor(random(10));
//   print(control.numImages);
//   Controls.updateDisplay();
// }




/**
 * Create the control panel.
 */
function createControls() {
    control = new Controls();
    gui = new dat.GUI();

    // Canvas Folder
    canvasFolder = gui.addFolder("Canvas");
    canvasSizeWidthControl = canvasFolder.add(control, "canvasWidth", 100, screen.width);
    canvasSizeWidthControl.onFinishChange(function(value) {
      print("canvasWidth changed to: " + value);
      canvasWidthChanged = true;
    });
    canvasSizeHeightControl = canvasFolder.add(control, "canvasHeight", 100, screen.height);
    canvasSizeHeightControl.onFinishChange(function(value) {
      print("canvasHeight changed to: " + value);
      canvasHeightChanged = true;
    });

    bgControl = canvasFolder.addColor(control, "backgroundColor");
    bgControl.onFinishChange(function(value) {
        print("New background color: " + value);
        bgColorChanged = true;
    });

    // Image Folder -------------------------------------
    imageFolder = gui.addFolder("Image");
    imageControl = imageFolder.add(control, "theme");
    imageControl.onFinishChange(function(value) {
        print("New theme is: " + value);
        themeChanged = true;
    });

    imageSize = imageFolder.add(control, "imgSize");
    imageSize.onFinishChange(function(value) {
      print("Image size is: " + value);
      imgSizeChanged = true;
    });

    numImages = imageFolder.add(control, "numImages");
    numImages.onFinishChange(function(value) {
      print("Number of Images is: " + value);
      goLoadPhotos = true;
      loadPhotos();
    })

    // Shape Folder -----------------------------------
    shapesFolder = gui.addFolder("Shape");
    shapesControl = shapesFolder.add(control, "Shape", ["line", "point", "ellipse", "rect", "vertexLine"]);
    shapesControl.onFinishChange(function(value) {
      print("Shape control is: " + value);
      shapeChanged = true;

    })

    numShapes = shapesFolder.add(control, "numShapes");
    numShapes.onFinishChange(function(value) {
      numShapesChanged = true;
    })

    shapeColor = shapesFolder.addColor(control, "shapeColor");
    shapeWeight = shapesFolder.add(control, "shapeWeight", 0, 25);
    addStrokeOption = shapesFolder.add(control, "addStroke");
    strokeColor = shapesFolder.addColor(control, "strokeColor");
    strokeWeightVal = shapesFolder.add(control, "strokeWeight", 0, 20);

    // Draw Folder ---------------------------------------
    drawFolder = gui.addFolder("Draw");
    drawControl = drawFolder.add(control, "Draw", ["line", "circle"]);
    drawControl.onFinishChange(function(value) {
        print("Draw control is: " + value);
        drawChanged = true;

    });

    drawColor = drawFolder.addColor(control, "Color");
    drawColor.onFinishChange(function(value) {
        print("Draw color is: " + value);
        colorChanged = true;
    });

    drawSize = drawFolder.add(control, "Size", 1, 40);
    drawSize.onFinishChange(function(value) {
        print("Draw size is: " + value);
        sizeChanged = true;
    });

    // Action Buttons ------------------------------------
    loadMyCollage = gui.add(control, "LoadCollage");
    randomCollage = gui.add(control, "RandomCollage");
    clearCollage  = gui.add(control, "ClearCollage");
    saveCollage = gui.add(control, "SaveCollage");

    canvasFolder.open();
    imageFolder.open();
    drawFolder.open();
    shapesFolder.open();

}



function variableEllipse(x, y, px, py) {
    let speed = abs(x - px) + abs(y - py);
    stroke(speed);
    ellipse(x, y, speed, speed);
  }

/**
 * This is called whenever a key is pressed.
 */
function keyPressed() {
    enterKeyPressed = (keyCode === ENTER);
}

function doSleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

/**
 * Pause for some time (milliseconds).
 */
function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

function elapsedTime(start, end) {
  diff = end.getTime() - start.getTime();
  return diff;
}

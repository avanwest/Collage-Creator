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
let numShapesChanged = false;




/**
 * Preload is called before setup.
 */
function preload() {

}

/**
 * Setup is called after preload and before draw.
 */
function setup() {

    myCanvas = createCanvas(canvasWidth, canvasHeight);
    myCanvas.parent('canvas-container');
    createControls();

    // randomPicturePositionX = random(control.canvasWidth);
    // randomPicturePositionY = random(control.canvasHeight);
    // console.log(randomPicturePositionX + " : " + randomPicturePositionY);
    console.log(pointArray);

  }


  /**
   * Draw on the canvas.
   */
  function draw() {

    lineLoader(control.numShapes);
    rectLoader(control.numShapes);
    pointLoader(control.numShapes);
    ellipseLoader(control.numShapes);
    // loadPhotos(control.numImages);


    // Define how often the canvas is refreshed.
    frameRate(10);
    myCanvas.width = control.canvasWidth;
    myCanvas.height = control.canvasHeight;

    if (loadCollageButton) {
      for (let i = 0; i < control.numImages; i++) {
        loadPicture();
      }



      switch (control.Shape) {
        case "rect":
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


      }





      loadCollageButton = false;

    }


    // If the background has changed, update.
    if (bgColorChanged) {
        background(control.backgroundColor);
        bgColorChanged = false;
        imageLoaded = false;
        // loadPicture();
    }

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
        print("Circle color: " + control.Color);
        fill(control.Color);
        strokeWeight(0);
        if (mouseIsPressed === true) {
            ellipse(mouseX, mouseY, control.Size, control.Size);
        }
    }



  }

  function loadPhotos(){
    for (let i = 0; i < control.numImages; i++) {
      randomImg = new picture("https://source.unsplash.com/random/" + control.imgSize + "/?" + control.theme);
      sleep(2000).then(() => {
        imageArray.push(randomImg);
      })


    }
    console.log(imageArray);
  }

  /**
   * Load an image.
   */
  function loadPicture() {
      if (!imageLoaded || themeChanged) {
          p1 = new picture(imageLibrary + control.imgSize + "/?" + control.theme);
          // Pause to let the image load, before attempting display.
          sleep(4000).then(() => {
              p1.display(0, 0);
              print(p1.url);
              // print(randomCanvasPositionX + ", " + randomCanvasPositionY);

          });
          themeChanged = false;
          imageLoaded = true;

      }
  }


  function updateDisplay(gui) {
      for (var i in gui.__controllers) {
          gui.__controllers[i].updateDisplay();
      }
      for (var f in gui.__folders) {
          updateDisplay(gui.__folders[f]);
      }
  }



/**
 * Define a class to represent an image.
 */
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
    this.x1 = random(canvasWidth);
    this.x2 = random(canvasWidth);
    this.y1 = random(canvasHeight);
    this.y2 = random(canvasHeight);
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
    this.x = random(canvasWidth);
    this.y = random(canvasHeight);
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
    this.x = random(canvasWidth);
    this.y = random(canvasHeight);
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
    this.x = random(canvasWidth);
    this.y = random(canvasHeight);
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


/**
 * Define the control object.
 */
function Controls() {
    this.theme = "random";
    this.img = null;
    this.imgSize = "600x400";
    this.numImages = 0;
    this.canvasHeight = canvasHeight;
    this.canvasWidth = canvasWidth;
    this.backgroundColor = "white";
    this.Color = "white";
    this.Draw = "line";
    this.Size = 5;
    this.Shape = "line";
    this.numShapes = 5;
    this.shapeColor = "black";
    this.shapeWeight = 5;
    this.LoadCollage = function() {
      loadCollageButton = true;
      console.log("LoadCollage button was pressed");
    }
}


/**
 * Create the control panel.
 */
function createControls() {
    control = new Controls();
    gui = new dat.GUI();

    canvasFolder = gui.addFolder("Canvas");
    canvasSizeWidthControl = canvasFolder.add(control, "canvasWidth", 50, screen.width);
    canvasSizeHeightControl = canvasFolder.add(control, "canvasHeight", 50, screen.height);

    bgControl = canvasFolder.add(control, "backgroundColor");
    bgControl.onFinishChange(function(value) {
        print("New background color: " + value);
        bgColorChanged = true;
    });


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

    shapesFolder = gui.addFolder("Shape");
    shapesControl = shapesFolder.add(control, "Shape", ["line", "point", "ellipse", "rect", "vertexShape"]);
    shapesControl.onFinishChange(function(value) {
      print("Shape control is: " + value);
      shapeChanged = true;

    })

    numShapes = shapesFolder.add(control, "numShapes");
    numShapes.onFinishChange(function(value) {
      numShapesChanged = true;
    })

    shapeColor = shapesFolder.add(control, "shapeColor", ["black", "red", "blue", "white"]);
    shapeWeight = shapesFolder.add(control, "shapeWeight", 1, 25);

    drawFolder = gui.addFolder("Draw");
    drawControl = drawFolder.add(control, "Draw", ["line", "circle"]);
    drawControl.onFinishChange(function(value) {
        print("Draw control is: " + value);
        drawChanged = true;

    });

    //drawFolder.add(control, "circle");
    drawColor = drawFolder.add(control, "Color", ["white", "black", "red", "blue"]);
    drawColor.onFinishChange(function(value) {
        print("Draw color is: " + value);
        colorChanged = true;
    });

    drawSize = drawFolder.add(control, "Size", 1, 40);
    drawSize.onFinishChange(function(value) {
        print("Draw size is: " + value);
        sizeChanged = true;
    });

    loadMyCollage = gui.add(control, "LoadCollage");

    canvasFolder.open();
    imageFolder.open();
    drawFolder.open();
    shapesFolder.open();

    updateDisplay(gui);
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

/**
 * Pause for some time (milliseconds).
 */
function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

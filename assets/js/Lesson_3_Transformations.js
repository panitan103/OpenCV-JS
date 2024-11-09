// TAB 1 Resize
let imgElement = document.getElementById('imageSrc');
let inputElement = document.getElementById('fileInput');

const canvas = document.createElement("canvas");
canvas.id="canvasOutput";
canvas.classList.add("img-fluid");
//canvas.style.width = "auto";
document.getElementById("image-container").appendChild(canvas);

inputElement.addEventListener('change', (e) => {
    imgElement.src = URL.createObjectURL(e.target.files[0]);
}, false);
 
imgElement.onload = function() {
    document.getElementById("size-width").max=imgElement.width;
    document.getElementById("size-height").max=imgElement.height; 
    reSize();

};

function reSize() {
    let size_width = Number(document.getElementById("size-width").value);
    let size_height = Number(document.getElementById("size-height").value);
    
    document.getElementById("size-width-value").setAttribute('value', size_width);
    document.getElementById("size-height-value").setAttribute('value', size_height);

    let dsize = new cv.Size(size_width, size_height);
    console.log(size_width);
    let mat = cv.imread(imgElement);
    
    cv.resize(mat, mat, dsize, 0, 0, cv.INTER_AREA);
    cv.imshow('canvasOutput', mat);
    mat.delete();
}

// TAB 2 Crop

let imgElement_1= document.getElementById('imageSrc-1');
let inputElement_1= document.getElementById('fileInput-1');

const canvas_1= document.createElement("canvas");
canvas_1.id="canvasOutput-1"
canvas_1.classList.add("img-fluid");
//canvas_1.style.width = "auto";
document.getElementById("image-container-1").appendChild(canvas_1)

inputElement_1.addEventListener('change', (e) => {
  imgElement_1.src = URL.createObjectURL(e.target.files[0]);
}, false);
 
imgElement_1.onload = function() {

    imgCrop();
    document.getElementById("start-x").max=imgElement_1.width;
    document.getElementById("start-y").max=imgElement_1.height; 
    document.getElementById("end-width").max=imgElement_1.width;
    document.getElementById("end-height").max=imgElement_1.height; 
    
};
function imgCrop() {
    let src = cv.imread(imgElement_1);
    
    let start_x = Number(document.getElementById("start-x").value);
    let start_y = Number(document.getElementById("start-y").value);
    let end_width = Number(document.getElementById("end-width").value);
    let end_height = Number(document.getElementById("end-height").value);

    document.getElementById("start-x-value").setAttribute('value', start_x);
    document.getElementById("start-y-value").setAttribute('value', start_y);
    document.getElementById("end-width-value").setAttribute('value', end_width);
    document.getElementById("end-height-value").setAttribute('value', end_height);
    
     // Define the ROI (Region of Interest)
    let rect = new cv.Rect(start_x, start_y, end_width, end_height);
    if ((start_x+end_width)>imgElement_1.width) {
        console.log("oversize")
        return
    } else if ((start_y+end_height)>imgElement_1.height) {
        console.log("oversize")
        return
    } 
    let cropped = src.roi(rect);
    cv.imshow('canvasOutput-1', cropped);

    src.delete();
    cropped.delete();
}


// TAB 3 Rotate

let imgElement_2= document.getElementById('imageSrc-2');
let inputElement_2= document.getElementById('fileInput-2');

const canvas_2= document.createElement("canvas");
canvas_2.id="canvasOutput-2"
canvas_2.classList.add("img-fluid");
//canvas_1.style.width = "auto";
document.getElementById("image-container-2").appendChild(canvas_2)

inputElement_2.addEventListener('change', (e) => {
  imgElement_2.src = URL.createObjectURL(e.target.files[0]);
}, false);
 
imgElement_2.onload = function() {

    imgRotate();
    
};
function imgRotate() {
    let src = cv.imread(imgElement_2);
    let dst = new cv.Mat();
    let dsize = new cv.Size(src.cols, src.rows);
    let center = new cv.Point(src.cols / 2, src.rows / 2);

    let degree = Number(document.getElementById("img-degree").value);
    
    let M = cv.getRotationMatrix2D(center, degree, 1);

    document.getElementById("img-degree-value").setAttribute('value', degree);

    cv.warpAffine(src, dst, M, dsize, cv.INTER_LINEAR, cv.BORDER_CONSTANT, new cv.Scalar());

    cv.imshow('canvasOutput-2', dst);

    src.delete();
    dst.delete();
}




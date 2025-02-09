// TAB 1 GREY
let imgElement = document.getElementById('imageSrc');
let inputElement = document.getElementById('fileInput');

const canvas = document.createElement("canvas");
canvas.id="canvasOutput"
canvas.classList.add("img-fluid");
//canvas.style.width = "auto";
document.getElementById("image-container").appendChild(canvas)

inputElement.addEventListener('change', (e) => {
  imgElement.src = URL.createObjectURL(e.target.files[0]);
}, false);
 
imgElement.onload = function() {
  let mat = cv.imread(imgElement);

    cv.cvtColor(mat, mat, cv.COLOR_RGBA2GRAY, 0);
  cv.imshow('canvasOutput', mat);
  mat.delete();
};

// TAB 2 inRange

let imgElement_1 = document.getElementById('imageSrc-1');
let inputElement_1 = document.getElementById('fileInput-1');


const canvas_1 = document.createElement("canvas");
canvas_1.id="canvasOutput-1"
canvas_1.classList.add("img-fluid");
canvas_1.style.width = "auto";
document.getElementById("image-container-1").appendChild(canvas_1)

let low_R = Number(document.getElementById("low-RED").value)
let low_G = Number(document.getElementById("low-GREEN").value)
let low_B = Number(document.getElementById("low-BLUE").value)

let high_R = Number(document.getElementById("high-RED").value)
let high_G = Number(document.getElementById("high-GREEN").value)
let high_B = Number(document.getElementById("high-BLUE").value)

document.getElementById("low-RED-value").setAttribute('value', low_R)
document.getElementById("low-GREEN-value").setAttribute('value', low_G)
document.getElementById("low-BLUE-value").setAttribute('value', low_B)
document.getElementById("high-RED-value").setAttribute('value', high_R)
document.getElementById("high-GREEN-value").setAttribute('value', high_G)
document.getElementById("high-BLUE-value").setAttribute('value', high_B)

inputElement_1.addEventListener('change', (e) => {
  imgElement_1.src = URL.createObjectURL(e.target.files[0]);
}, false);
 
imgElement_1.onload = function() {
    updateValue();
};
function updateValue() {
    let src = cv.imread(imgElement_1);
    let dst = new cv.Mat();

    let low_R = Number(document.getElementById("low-RED").value)
    let low_G = Number(document.getElementById("low-GREEN").value)
    let low_B = Number(document.getElementById("low-BLUE").value)

    let high_R = Number(document.getElementById("high-RED").value)
    let high_G = Number(document.getElementById("high-GREEN").value)
    let high_B = Number(document.getElementById("high-BLUE").value)
    
    document.getElementById("low-RED-value").setAttribute('value', low_R)
    document.getElementById("low-GREEN-value").setAttribute('value', low_G)
    document.getElementById("low-BLUE-value").setAttribute('value', low_B)
    document.getElementById("high-RED-value").setAttribute('value', high_R)
    document.getElementById("high-GREEN-value").setAttribute('value', high_G)
    document.getElementById("high-BLUE-value").setAttribute('value', high_B)
    

    let low = new cv.Mat(src.rows, src.cols, src.type(), [low_R, low_G, low_B, 0]);
    let high = new cv.Mat(src.rows, src.cols, src.type(), [high_R, high_G, high_B, 255]);

    cv.inRange(src, low, high, src);
    cv.imshow('canvasOutput-1', src);

    dst.delete();
    low.delete();
    high.delete();
}




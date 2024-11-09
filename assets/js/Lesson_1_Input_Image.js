let imgElement = document.getElementById('imageSrc');
let inputElement = document.getElementById('fileInput');

const canvas = document.createElement("canvas");
canvas.id="canvasOutput"
canvas.classList.add("img-fluid");
canvas.classList.add("justify-content-end");
//canvas.style.width = "auto";
document.getElementById("image-container").appendChild(canvas)

inputElement.addEventListener('change', (e) => {
    imgElement.src = URL.createObjectURL(e.target.files[0]);
}, false);

 
imgElement.onload = function() {
 let mat  = cv.imread(imgElement);
    cv.imshow('canvasOutput', mat);
    mat.delete();
  
};
 

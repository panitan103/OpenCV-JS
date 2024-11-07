let imgElement = document.getElementById('imageSrc');
let inputElement = document.getElementById('fileInput');

const canvas = document.createElement("canvas");
canvas.id="canvasOutput"
canvas.style.width = "100%";
document.getElementById("image-container-output").appendChild(canvas)

inputElement.addEventListener('change', (e) => {
  imgElement.src = URL.createObjectURL(e.target.files[0]);
}, false);
 
imgElement.onload = function() {
  let mat = cv.imread(imgElement);
  cv.imshow('canvasOutput', mat);
  mat.delete();
};
 

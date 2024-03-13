const textR = document.querySelectorAll(".right");
const avg = document.querySelectorAll("#avg");
const insert = document.querySelector("#ins");
var sum = 0;
textR.forEach(function(element){
    element.addEventListener("input", function() {
        if(element.innerHTML == '-'){
            element.style.textAlign = "center";
        }else{
            element.style.textAlign = "right";
        }
    
    });
})

function sumOfResults(element){
    element.querySelectorAll(".right").forEach(function(cell){
        const value = parseInt(cell.textContent);
        if (!isNaN(value)) {
            sum += value;
        }
    });
    return sum;
}
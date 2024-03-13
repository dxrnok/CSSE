const textR = document.querySelectorAll(".right");

textR.forEach(function(element){
    element.addEventListener("input", function() {
        if(element.innerHTML == '-'){
            element.style.textAlign = "center";
        }else{
            element.style.textAlign = "right";
        }
    });
})
document.addEventListener('click', function(event) {
    const target = event.target;
    
    if (target.classList.contains('plus-button')) {
        const container = target.closest('.button-container, .button-container-top');
        const display = container.querySelector('.display');
        const displayTop = container.querySelector('.display-top');
        const level = container.closest('.shape').id;
        
        if (display !== null) {
            let num = parseInt(display.textContent);
            num++;
            updateDisplay(display, num);
            updateColor(display, num, level);
            updateSize(num, level);
        } 
        if (displayTop !== null) {
            let num = parseInt(displayTop.textContent);
            num++;
            updateDisplayTop(displayTop, num);
            updateColor(displayTop, num, level);
            updateSize(num, level);
        }
    } else if (target.classList.contains('minus-button')) {
        const container = target.closest('.button-container, .button-container-top');
        const display = container.querySelector('.display');
        const displayTop = container.querySelector('.display-top');
        const level = container.closest('.shape').id;
        
        if (display !== null) {
            let num = parseInt(display.textContent);
            if (num > 0) {
                num--;
                updateDisplay(display, num);
                updateColor(display, num, level);
                updateSize(num, level);
            }
        }
        if (displayTop !== null) {
            let num = parseInt(displayTop.textContent);
            if (num > 0) {
                num--;
                updateDisplayTop(displayTop, num);
                updateColor(displayTop, num, level);
                updateSize(num, level);
            }
        }
    }
});

function updateDisplay(display, num) {
    display.textContent = num;
}
    
function updateDisplayTop(displayTop, num){
    displayTop.textContent = num;
}

function updateColor(display, num, level) {
    let guidelineMin, guidelineMax;
    if (level === 'level1' || level === 'level2') {
        guidelineMin = 1; guidelineMax = 1;
    } else if(level === 'level3'){
        guidelineMin = 2, guidelineMax = 2;
    }else if(level === 'level4'){
        guidelineMin = 3, guidelineMax = 3;
    }else if(level === 'level5'){
        guidelineMin = 3, guidelineMax = 5;
    }else if(level === 'level6'){
        guidelineMin = 5, guidelineMax = 7;
    }

    if(num === 0){
        display.style.backgroundColor = 'white';
    } else if (num > guidelineMax) {
        display.style.backgroundColor = 'red';
    } else if (num > 0 && num < guidelineMin) {
        display.style.backgroundColor = 'yellow';
    } else{
        display.style.backgroundColor = 'green';
    }
}

function updateSize(num, level){
    const element=document.getElementById(level);
    let borderBottomW, borderLeftW, currentMarginBottom;
    if (level === "level1" || level === "level2") {
		let updateMargin = 15;
		element.style.transform = "scaleY(1." + num + ")";
		element.style.marginBottom = updateMargin*(num) + "px";
    } else {
		let updateMargin = 7;
		element.style.transform = "scaleY(1." + num + ")";
		element.style.marginBottom = updateMargin*(num-1) + "px";
		element.style.marginTop = updateMargin*(num-1) + "px";
	}
}

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const now =  new Date();
const year = now.getFullYear();
const month = months[now.getMonth()];
const day = now.getDate();
document.getElementById("date").innerHTML = "[" + day + "-" + month + "-" + year + "]";

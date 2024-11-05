const table = document.getElementById("table_id");
const textR = document.querySelectorAll(".right");
const avg = document.querySelectorAll("#avg");
const insert = document.querySelector("#ins");
const gradesTable = document.querySelector(".gradeTable");
const insR = document.querySelector("#insR");
const insC = document.querySelector("#insC");
var sum = 0;

//allows input in mulitple cells with class right
textR.forEach(function(element){
    element.addEventListener("input", function() {
        const row = element.parentElement;  //accesing parentElement of the element
        calcAvg(row);                       //calculating average
        countUnsubmitted();                 //counting unsubmitted aka the "-" 
        checkInput(element);                //checks user input
    });
});

//function to check user input
function checkInput(element){
    //making sure input is containing data between 0-100
    if(element.innerHTML > 100){
        element.innerHTML = "-";
    }else if(element.innerHTML < 0){
        element.innerHTML = "-";
    }

    //styling based on input
    if(element.innerHTML == '-'){
        element.style.textAlign = "center";
        element.style.backgroundColor = "yellow";
    }else{
        element.style.textAlign = "right";
        element.style.backgroundColor = "";
    }
}

//for each average cell
avg.forEach(function(element){
    element.addEventListener("click", function() {
        toggleGrades();     //function to display the american grade system (click on any average cell and click again to close it) 
    })
})

let clickCount = 0;
//function to display grading system, based on user click of the average cell
function toggleGrades(){
    clickCount++;
    if(clickCount % 2 !== 0){
        gradesTable.style.visibility = "visible";
    }else{
        gradesTable.style.visibility = "hidden";
    }
}

//calculating the average %
function calcAvg(row) {
    let sum = 0;
    let count = 0;

    //select all cells with class = right 
    row.querySelectorAll(".right").forEach(function(cell) {
        const value = parseInt(cell.textContent);   //get the integer at the current cell
        if (!isNaN(value)) { //check if value is not NaN
            sum += value;
            count++;
        }
    });

    const average = count > 0 ? Math.round(sum / count) + "%" : "-"; //check if count > 0 then if true get the avegare else change cell to "-"
    const avgCell = row.querySelector("#avg");  //select the average cell
    
    if (avgCell) {
        avgCell.textContent = average;      //display average

        //check based on condition to style the average cell else dont change
        if (average !== "-" && parseInt(average) < 60 && parseInt(average) >= 0) {
            avgCell.style.color = "white";
            avgCell.style.backgroundColor = "red";
        }else if(average !== "-" && parseInt(average) > 60 && parseInt(average) <= 100){
            avgCell.style.color = "";
            avgCell.style.backgroundColor = "";
        }else{
            avgCell.textContent = "-";
            avgCell.style.color = "";
            avgCell.style.backgroundColor = "";
        }
    }
}


//count the unsubmitted assignments ("-")
function countUnsubmitted() {
    let count = 0;

    //for each cell with class = right
    textR.forEach(function(cell) {
        //check if cell contains "-"
        if (cell.textContent == "-") {
            count++;
            cell.style.backgroundColor = "yellow";
        } else {
            cell.style.backgroundColor = "";
        }
    });
}
countUnsubmitted(); //update unsubmitted


//inser row 
insR.addEventListener("click", function() {
    const newRow = table.insertRow(-1); //insert row at the end of the table
    const cellCount = table.rows[0].cells.length;   //get the number of cells (row 1)

    //inserting new cells for row
    for (let i = 0; i < cellCount; i++) {
        const newCell = newRow.insertCell(i);
        newCell.textContent = "-";
        
        //update each class of the cells to make sure they are functioning 
        if(i < 2){
            newCell.classList.add("left");
        }else if (i === cellCount - 1) {
            newCell.id = "avg";
            newCell.addEventListener("click", toggleGrades) //adds function to the average cell to display grading system
        } else {
            newCell.classList.add("right");
        }
        if(newCell.classList == "right"){
            newCell.style.backgroundColor = "yellow";
        }
    }
    newUpdate(newRow);  //upadtes new cell
});

//update function to check user input and get the average for avg cell
function newUpdate(newRow){
    newRow.querySelectorAll(".right").forEach(function(cell) {
        cell.addEventListener("input", function() {
            checkInput(cell);
            const row = cell.parentElement;
            calcAvg(row);
        });
    });
}


//insert column
insC.addEventListener("click", function() {
    const headerRow = table.rows[0];    //get the first row of the table
    const newCellIndex = headerRow.cells.length - 1; //gets the index of last header row cell (-1 to exclude average column)

    const newHeaderCell = document.createElement("th"); //inserst new header for column
    newHeaderCell.textContent = "Assignment " + (newCellIndex-1);   //automatically assigned name based on cell index (-1 exlude avg column)
    headerRow.insertBefore(newHeaderCell, headerRow.cells[newCellIndex]);   //insert new header before the last cell in table

    const rowCount = table.rows.length; //get how many rows
    for (let i = 1; i < rowCount; i++) {
        const newRow = table.rows[i];   //access row at i
        const newCell = newRow.insertCell(newCellIndex);    //insert new row at the index
        newCell.textContent = "-";  //set default display of new cell to "-"
        newCell.classList.add("right"); //set class of the new cell to right
        newUpdate(newRow);  //upadtes new cell
        checkInput(newCell);    //check user input for each new cell
    }
});
var numOfDays;
var submitf = 0;

function numOfDaysForm() {
    numOfDays = document.forms["form"]["input"].value;
    if (numOfDays == null || numOfDays == "") {
        alert("Name must be filled out");
        return false;
    }
}
class Calendar 
{
    constructor() 
    {
        this.dayDropdown = document.getElementById("day-dropdown").classList.toggle("day-toggle");
        this.monthDropdown = document.getElementById("month-dropdown").classList.toggle("month-toggle");
        this.yearDropdown = document.getElementById("year-dropdown").classList.toggle("year-toggle");

    }

    myFunction() 
    {
        
    }
}

let calendar = new Calendar();
calendar.myFunction();

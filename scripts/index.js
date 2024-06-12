class Calendar 
{
    constructor() 
    {
        

        this.toggleList = document.querySelectorAll('[class^="dropdown"]');
        this.inputList = document.querySelectorAll('input[type=number]');       

        this.init(); 
    }

    
    dropdown()
    {
        this.inputList[0].addEventListener('click', () =>
        {
            document.getElementById("day-dropdown").classList.toggle("day-toggle");
        });
        this.inputList[1].addEventListener('click', () =>
        {
            document.getElementById("month-dropdown").classList.toggle("month-toggle");
        });
        this.inputList[2].addEventListener('click', () =>
        {
            document.getElementById("year-dropdown").classList.toggle("year-toggle");
        });
    }

    init()
    {
        this.dropdown()
    }
        
}

let calendar = new Calendar();

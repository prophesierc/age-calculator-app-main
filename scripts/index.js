class Calendar
{
    constructor()
    {
        this.buttonClass = document.getElementsByTagName('button');
        this.dayButtonId = document.getElementById('day-button');
        this.dayButton = this.buttonClass[0];
        this.monthButton = this.buttonClass[1];
        this.yearButton = this.buttonClass[2];
        // console.log(this.buttonClass);
    }

    inputSelector()
    {
        
    }
}

let calendar = new Calendar();
calendar.inputSelector();
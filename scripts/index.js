class Calendar 
{
    constructor() 
    {
        this.inputArray = Array.from(document.querySelectorAll('input[type=number]')); //iterable array from nodelists
        this.toggleArray = Array.from(document.querySelectorAll('[class^="dropdown"]'));

        document.getElementById("day-dropdown").classList.add("hidden");        
        document.getElementById("month-dropdown").classList.add("hidden");
        document.getElementById("year-dropdown").classList.add("hidden");



        this.submitButton = document.querySelector('button');
        

        this.init(); 
    }

    dropdown() 
    {
        
        this.inputArray.forEach((input, index) => 
        {
            let toggleItem = this.toggleArray[index].classList;            

            input.onclick = () => 
            {
                toggleItem.toggle("hidden");        
            }
            input.onblur = () => 
            {
                toggleItem.contains("hidden") ? null : toggleItem.add("hidden");
            }  

        });        
    }

    dropdownValue()
    {
        this.selectMenu = document.getElementById("day-dropdown");
        // this.selectMenu = document.getElementById("month-dropdown");
        // this.selectMenu = document.getElementById("year-dropdown");

        for (let i = 1; i <= 31; i++) 
        {  
            let tempOption = document.createElement("option");
            let tempText = document.createTextNode(i);  
            tempOption.appendChild(tempText);  
            tempOption.setAttribute("value", i);  
            this.selectMenu.appendChild(tempOption); 
        }

    }

    submit()
    {
        this.submitButton.addEventListener('click', () => 
        {

        })
    }


    init() 
    {
        this.dropdown();
        this.dropdownValue();
        this.submit();
    }
}

let calendar = new Calendar();

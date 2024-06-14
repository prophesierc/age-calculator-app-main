class Calendar 
{
    constructor() 
    {
        this.inputArray = Array.from(document.querySelectorAll('input[type=number]'));
        this.toggleArray = Array.from(document.querySelectorAll('[class^="dropdown"]'));

        document.getElementById("day-dropdown").classList.add("hidden");
        document.getElementById("month-dropdown").classList.add("hidden");
        document.getElementById("year-dropdown").classList.add("hidden");
        
        this.outputBeforeContent = Array.from(document.querySelectorAll('[id*="before"]'));
             

        this.submitButton = document.querySelector('button');
        this.dateTime();
        this.init();
    }

    dateTime() 
    {
        // set default of 31 days per month, then change based on selected month & year on submit
        this.date = new Date();
        this.year = this.date.getFullYear();
        this.month = this.date.getMonth() + 1;
        this.now = new Date(this.year, this.month, 0);
        this.daysThisMonth = this.now.getDate();
    }

    dropdown(id, start, end) 
    {
        let dropdownValue = document.getElementById(id);

        for (let i = start; i <= end; i++) 
        {            
            let option = document.createElement("option");
            option.value = parseInt(i);
            option.textContent = parseInt(i);
            dropdownValue.appendChild(option);

            option.addEventListener('click', () => 
            {
                let inputId = id.replace('dropdown', 'button-input');
                document.getElementById(inputId).value = parseInt(i);
                dropdownValue.classList.add("hidden");
            });
        }

        this.inputArray.forEach((input, index) => 
        {
            let toggleItem = this.toggleArray[index].classList;

            input.onclick = () => 
            {
                toggleItem.toggle("hidden");
            }

            input.onblur = async () =>
            {                
                await new Promise(resolve => setTimeout(resolve, 10));
                toggleItem.contains("hidden") ? null : toggleItem.add("hidden");                
            }
        });
    }
    displayError()
    {
        console.log('errr test');
    }

    displayOutput()
    {
        // (wip)
        this.outputBeforeContent[2].textContent = this.inputArray[2].value //day
        this.outputBeforeContent[1].textContent = this.inputArray[1].value; //months
        this.outputBeforeContent[0].textContent = this.inputArray[0].value; //years

        this.outputDate = new Date(this.outputBeforeContent[2].textContent, this.outputBeforeContent[1].textContent - 1, this.outputBeforeContent[0].textContent); // datetime rekating input values into real dates
        
        this.math = Math.abs(this.outputDate - new Date())
        this.dateTimeDebugger()
    }

    dateTimeDebugger()
    {
        this.day = parseInt(this.outputBeforeContent[2].textContent, 10);
        this.month = parseInt(this.outputBeforeContent[1].textContent, 10) - 1;
        this.year = parseInt(this.outputBeforeContent[0].textContent, 10);
        this.outputDate = new Date(this.year, this.month, this.day);
        this.math = Math.abs(this.outputDate - new Date());
        console.log(this.outputDate);
        console.log(this.math)
        console.log('parseint Day:', this.day); // shows year insstead
        console.log('parseint Month:', this.month); // shows day instead
        console.log('parseint Year:', this.year); // shows month instead
        console.log('Date:', this.outputDate);
        console.log('day:', this.outputBeforeContent[2].textContent); //y
        console.log('month:', this.outputBeforeContent[1].textContent); //m
        console.log('year:', this.outputBeforeContent[0].textContent); //d

        
    }

    submit() 
    {
        this.submitButton.addEventListener('click', async () => 
        {
            
            
            this.displayOutput();
        });
    }

    init() 
    {
        this.dropdown('day-dropdown', 1, this.daysThisMonth);
        this.dropdown('month-dropdown', 1, 12);
        this.dropdown('year-dropdown', this.year - 50, this.year + 50);
        this.submit();
    }
}

let calendar = new Calendar();

class Calendar 
{
    constructor() 
    {
        this.inputArray = Array.from(document.querySelectorAll('input[type=number]'));
        this.toggleArray = Array.from(document.querySelectorAll('[class^="dropdown"]'));

        document.getElementById("day-dropdown").classList.add("hidden");
        document.getElementById("month-dropdown").classList.add("hidden");
        document.getElementById("year-dropdown").classList.add("hidden");
        this.submitButton = document.querySelector('button');


        this.outputYears = document.getElementById("output-years");
        this.outputMonths = document.getElementById("output-months");
        this.outputDays = document.getElementById("output-days");        

        this.dateTime();
        this.init();
    }

    dateTime() 
    {
        this.date = new Date();
        this.year = this.date.getFullYear();
        this.month = this.date.getMonth() + 1;
        this.now = new Date(this.year, this.month, 0);
        this.daysThisMonth = this.now.getDate();
    }

    output()
    {
        this.outputYears.textContent = `--years`; //math wip
        this.outputMonths.textContent = `--months`
        this.outputDays.textContent = `--days`
    }

    dropdown(id, start, end) 
    {
        let dropdownValue = document.getElementById(id);

        for (let i = start; i <= end; i++) 
        {            
            let option = document.createElement("option");
            option.value = i;
            option.textContent = i;
            dropdownValue.appendChild(option);

            option.addEventListener('click', () => 
            {
                let inputId = id.replace('dropdown', 'button-input');
                document.getElementById(inputId).value = i;
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

    submit() 
    {
        this.submitButton.addEventListener('click', () => 
        {
            
        });
    }

    init() 
    {
        this.dropdown('day-dropdown', 1, this.daysThisMonth);
        this.dropdown('month-dropdown', 1, 12);
        this.dropdown('year-dropdown', this.year - 50, this.year + 50);
        this.output()
        this.submit();
    }
}

let calendar = new Calendar();

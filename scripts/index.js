/*
  IPO Chart
  Name: Calendar
  Date: 

  Input:
    - Inputs Day, Month, Year 

  Process:
    - Takes absolute value of inputs dates - todays dates, adds validator to ensure calendar formatting

  Output:
    - Absolute values of Input - Today

  Author: Prophesierc
  Modified: 6/15/2024
*/

class Calendar 
{
    constructor() 
    {
        this.inputArray = Array.from(document.querySelectorAll('input[type=number]'));
        this.toggleArray = Array.from(document.querySelectorAll('[class^="dropdown"]'));
        this.labelArray = Array.from(document.getElementsByTagName('label'));
        this.requiredText = Array.from(document.querySelectorAll('.empty-field'));
        this.invalidText = Array.from(document.querySelectorAll('.invalid-field'));
        this.outputBeforeContent = Array.from(document.querySelectorAll('[id*="before"]'));

        this.date = new Date();
        this.now = Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate());
        
        document.getElementById("day-dropdown").classList.add("hidden");
        document.getElementById("month-dropdown").classList.add("hidden");
        document.getElementById("year-dropdown").classList.add("hidden");

        this.submitButton = document.querySelector('button');
        this.errorStateIsActive = false
        this.init();     
    }

    dropdown(id, start, end) 
    {
        let dropdownValue = document.getElementById(id);
        let inputId = id.replace('dropdown', 'button-input');
        

        for (let i = start; i <= end; i++) //iterates dropdow fields
        {            
            let option = document.createElement("option");
            option.value = parseInt(i);
            option.textContent = parseInt(i);
            dropdownValue.appendChild(option);

            option.addEventListener('click', () => // onclick dropdown to map value to textfield
            {
                document.getElementById(inputId).value = parseInt(i);
                dropdownValue.classList.add("hidden");
            });
        }

        this.inputArray.forEach((input, index) => 
        {   
            let toggleItem = this.toggleArray[index].classList;

            input.onclick = () => // onclick text field to open dropdown
            {
                toggleItem.toggle("hidden");
            }

            input.onblur = async () => // removes dropdown onblur
            {                
                await new Promise(resolve => setTimeout(resolve, 100));
                toggleItem.contains("hidden") ? null : toggleItem.add("hidden");                
            }
            
            input.onkeydown = (event) =>
            {
                let key = event.key
                if (key === 'Enter')
                {
                    toggleItem.contains("hidden") ? null : toggleItem.add("hidden");                
                    this.submitButton.click();
                };
            }

            input.oninput = () => 
            {
                input.placeholder === 'YYYY' 
                ? input.value = input.value.trim().slice(0, 4) 
                : input.value = input.value.trim().slice(0, 2)
            };
        });
    }

    displayOutput()
    {
        let diffInYears = Math.abs(this.outputDate.getFullYear() - this.date.getFullYear());
        let diffInMonths = Math.abs(this.outputDate.getMonth() - this.date.getMonth());
        let diffInDays = Math.abs(this.outputDate.getDate() - this.date.getDate());

        this.outputBeforeContent[0].textContent = diffInYears;
        this.outputBeforeContent[1].textContent = diffInMonths;
        this.outputBeforeContent[2].textContent = diffInDays;
    }

    validator() 
    {
        this.outputDate = new Date
        (
            this.inputArray[2].value,
            this.inputArray[1].value - 1,
            this.inputArray[0].value
        );
    
        this.errorStateIsActive = false;
        this.inputArray.forEach((input, index) => 
        {
            let labelErrorColor = () => 
            {
                this.labelArray[index].style.color = 'hsl(0, 100%, 67%)';
                input.style.border = '1px solid hsl(0, 100%, 67%)';
            };
    
            let labelColor = () => 
            {
                this.labelArray[index].style.color = 'hsl(0, 1%, 44%)';
                input.style.border = '1px solid hsl(0, 0%, 86%)';
            };
    
            let isEmpty = input.value === '';
            let isInvalid =
            (input.placeholder === 'YYYY' && (input.value.length < 4 
                || input.value > this.date.getFullYear())) 
                || (input.placeholder === 'MM' && (input.value > 12 
                || input.value < 1)) 
                || (input.placeholder === 'DD' && (input.value > 31 
                || input.value < 1));
    
            this.requiredText[index].style.display = isEmpty 
            ? (this.invalidText[index].style.display = 'none', 'flex') : 'none';

            this.invalidText[index].style.display = isInvalid 
            ? (this.requiredText[index].style.display = 'none', 'flex') : 'none';
    
            isEmpty || isInvalid 
            ? labelErrorColor() : labelColor();
    
            this.errorStateIsActive = isEmpty || isInvalid 
            ? true : this.errorStateIsActive;
        });
    }

    submit() 
    {
        this.submitButton.addEventListener('click', async () => 
        {
            this.validator();
            if (!this.errorStateIsActive)
            {
                this.displayOutput();
            }
        });
    }

    init() 
    {
        this.dropdown('day-dropdown', 1, 31);
        this.dropdown('month-dropdown', 1, 12);
        this.dropdown('year-dropdown', 1900, this.date.getFullYear());
        this.submit();
    }
}
const calendar = new Calendar();
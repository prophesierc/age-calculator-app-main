class Calendar 
{
    constructor() 
    {
        this.inputArray = Array.from(document.querySelectorAll('input[type=number]'));
        this.toggleArray = Array.from(document.querySelectorAll('[class^="dropdown"]'));
        this.requiredText = Array.from(document.querySelectorAll('.empty-field'));
        this.invalidText = Array.from(document.querySelectorAll('.invalid-field'));
        this.outputBeforeContent = Array.from(document.querySelectorAll('[id*="before"]'));

        this.date = new Date();
        this.now = Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate());
        
        document.getElementById("day-dropdown").classList.add("hidden");
        document.getElementById("month-dropdown").classList.add("hidden");
        document.getElementById("year-dropdown").classList.add("hidden");

        this.submitButton = document.querySelector('button');
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
                    this.displayOutput();
                };
            }

            input.oninput = () => 
            {
                input.placeholder === 'YYYY' ? input.value = input.value.trim().slice(0, 4) : input.value = input.value.trim().slice(0, 2)
            };
        });
    }

    displayOutput()
    {
        this.outputDate = 
        new Date(
            this.inputArray[2].value, this.inputArray[1].value - 1, this.inputArray[0].value
        ); 
        this.diffInYears = Math.abs(this.outputDate.getFullYear() - this.date.getFullYear());
        this.diffInMonths = Math.abs(this.outputDate.getMonth() - this.date.getMonth());
        this.diffInDays = Math.abs(this.outputDate.getDate() - this.date.getDate());

        this.outputBeforeContent[0].textContent = this.diffInYears; 
        this.outputBeforeContent[1].textContent = this.diffInMonths; 
        this.outputBeforeContent[2].textContent = this.diffInDays; 
    }

    validator()
    {
        this.inputArray.forEach((input, index) => 
        {   
            //MM / DD need to account for length > 2 to account for not adding 0
            // need to fix logic for || to enforce either required or invalid warning text
            input.value === '' 
            ? this.requiredText[index].style.display = 'flex' : this.requiredText[index].style.display = 'none' // required text
        
            input.placeholder === 'YYYY' && input.value.length < 4 ? this.invalidText[index].style.display = 'flex' :  this.invalidText[index].style.display = 'none' // YYYY invalid text
            
            input.placeholder === 'DD' || input.placeholder === 'MM' && input.value.length < 2 
            ? this.invalidText[index].style.display = 'flex' : this.requiredText[index].style.display = 'none'; // MM / DD invalid text
            
        });
    }

    submit() 
    {
        this.submitButton.addEventListener('click', () => 
        {
            this.validator();
            this.displayOutput();
        });
    }

    init() 
    {
        this.dropdown('day-dropdown', 1, 31);
        this.dropdown('month-dropdown', 1, 12);
        this.dropdown('year-dropdown', 1950, 2050);
        this.submit();
    }
}

let calendar = new Calendar();

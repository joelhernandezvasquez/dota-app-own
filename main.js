

const rootendpoint = 'https://api.opendota.com/api';

zlFetch(`${rootendpoint}/heroStats`)
.then(data => loadHeroes(data))
.catch(error=> console.log(error));

function loadHeroes(data)
{
  const menu = document.querySelector(".heroes");
  const htmlString = data.body.map(hero => 
    {
       return `<div class="heroe">
       <img src="https://api.opendota.com${hero.img}"/>
       <div> <span>${hero["localized_name"]} </span></div>
       </div>`
    }).join("")

    menu.innerHTML = htmlString;
}

function filterHeroes(e)
{
    if(e.target.matches("input[type=checkbox]"))
    {
        const primaryAttribureDiv = document.querySelector("#primary-attribute");
        const primaryAttributeCheckboxes = Array.from(primaryAttribureDiv.querySelectorAll("input:checked"));
        const attackTypeDiv = document.querySelector("#attack-type");
        const attackTypeCheckBoxes = Array.from(attackTypeDiv.querySelectorAll("input:checked"));
        const rolesDiv = document.querySelector("#roles");
        const rolesCheckbox = Array.from(rolesDiv.querySelectorAll("input:checked"));

       zlFetch(`${rootendpoint}/heroStats`)
       .then(data=> 
        {
           const listHeroesFiltered = data.body.filter(hero=>
            {
                if(!primaryAttributeCheckboxes.length) return true
                const heroAttribute = hero['primary_attr'];
                for(el of primaryAttributeCheckboxes)
                {
                  const attr = el.id;
                  return attr===heroAttribute;  
                }
            
                }).filter(hero=>{
                    if(!attackTypeCheckBoxes.length) return true
                    
                    const heroAttack = hero["attack_type"].toLowerCase();
                    for(el of attackTypeCheckBoxes)
                    {
                        
                        const attackType = el.id;
                        return heroAttack===attackType;
                    }
                }).filter(hero=>{
                    if(!rolesCheckbox.length) return true

                    const roles = hero.roles;
                    
                    for(el of rolesCheckbox)
                    {
                    const selectedRoll = el.id.substring(0,1).toUpperCase() + el.id.substring(1);
                    if(!roles.includes(selectedRoll))return false
       
                    }
                    return true
                })
            
              
              const htmlString = listHeroesFiltered.map(hero=> {
                return `<div class="heroe">
                <img src="https://api.opendota.com${hero.img}"/>
                <div> <span>${hero["localized_name"]} </span></div>
                </div>`
             }).join("");
             
             const menu = document.querySelector(".heroes");
             menu.innerHTML = htmlString;
            })
        

         

         

        
        }
}
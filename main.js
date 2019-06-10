const rootendpoint = 'https://api.opendota.com/api';

zlFetch(`${rootendpoint}/heroStats`)
.then(data=> renderHeroes(data.body)) 
.catch(error=> console.log(error));

function renderHeroes(data)
{
  const menu = document.querySelector(".heroes");
  const htmlString = data.map(hero=>{
    return `<div class="hero">
             <img src="https://api.opendota.com${hero.img}"/>
             <div> <span>${hero["localized_name"]}  </span> </div>
             </div>`
  }).join("");

  menu.innerHTML = htmlString;
  
}

function filterHeroes(e)
{
  if(e.target.matches("input[type=checkbox"))
  {
    zlFetch(`${rootendpoint}/heroStats`)
   .then(data=> {
      const filter1 =  filterByPrimaryAttribute(data.body);
      const filter2 =  filterByAttackType(filter1); 
      const filter =   filterByRoles(filter2);
      
      renderHeroes(filter);

     })
     .catch(error=> console.log(error));
   }  
   
  }

  function filterByPrimaryAttribute(heroes)
  {
    const primaryAttributeDiv = document.querySelector("#primary-attribute");
    const primaryAttributeCheckbox = Array.from(primaryAttributeDiv.querySelectorAll("input:checked"));

    const filterHeroesList = heroes.filter(hero=>
      {
        if(!primaryAttributeCheckbox.length) return true
          
          const heroAttribute = hero["primary_attr"];
          
          for(const el of primaryAttributeCheckbox)
          {
            const attr = el.id;
            return heroAttribute===attr;
          }
      })
     return filterHeroesList;
  }

  function filterByAttackType(heroes)
  {
    const attackTypeDiv = document.querySelector("#attack-type");
    const attackTypeCheckboxes = Array.from(attackTypeDiv.querySelectorAll("input:checked"));

     const filterHeroesList = heroes.filter(hero=>
      {
        if(!attackTypeCheckboxes.length) return true

            const heroAttack = hero["attack_type"].toLowerCase();
             for(const el of attackTypeCheckboxes)
             {
              const attack = el.id;
              return attack===heroAttack;
        }
      })
      return filterHeroesList;
  }

  function filterByRoles(heroes)
  {
    const rolesDiv = document.querySelector("#roles");
    const rolesCheckBoxes = rolesDiv.querySelectorAll("input:checked");

    const filterHeroesList = heroes.filter(hero=> 
      {
        if(!rolesCheckBoxes.length) return true
            
             const roles = hero["roles"];
            for(const el of rolesCheckBoxes)
            {
              const rol = el.id.substring(0,1).toUpperCase() + el.id.substring(1);
              if(!roles.includes(rol)) return false
                  return true;
            }
      })
      return filterHeroesList;

  }


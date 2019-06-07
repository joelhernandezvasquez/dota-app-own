

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
        console.log(e.target);
    }
}
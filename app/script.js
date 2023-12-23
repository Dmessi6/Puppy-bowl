const span = document.querySelector('span');
const ul = document.querySelector('ul');
let players = [];

window.addEventListener('hashchange', function(){
render();
});

async function fetchPlayers () {   
    const response = await fetch('https://fsa-puppy-bowl.herokuapp.com/api/2309-ftb-et-am/players ');
    const json = await response.json();       
    players = json.data.players;
    render();
}

function render() {
    const hash = window.location.hash;
    const id = hash.slice(1);
    let filtered = players;
    if(id) {
        filtered = filtered.filter(function(player){
            return player.id === id;
        });
    }
    const html = filtered.map(function(player){
        return `
            <li> 
                <h1><a href = '#${player.id}'>${player.name}</a></h1>
                ${player.breed}
                <img src='${player.imageUrl}'/>
            </li>
        `
    }).join('');
    ul.innerHTML = html;
    span.innerHTML = players.length;
}
fetchPlayers();




const rootendpoint = 'https://api.opendota.com/api';

zlFetch(`${rootendpoint}/heroStats`)
.then(data => console.log(data.body))
.catch(error=> console.log(error));
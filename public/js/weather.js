const form = document.querySelector('#weather-form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const address = e.target.address.value;

    if (address.trim()) {

        document.querySelector('#address').innerHTML = 'loading..'
        fetch(`http://localhost:8080/api/weather?address=${address}`).
            then((response) => {
                response.json().then(({ error, address, location, forecast }) => {
                    if (error) {
                        document.querySelector('.error').innerHTML = error;
                        document.querySelector('#address').innerHTML = '';
                        document.querySelector('#location').innerHTML = '';
                        document.querySelector('#forecast').innerHTML = '';
                    } else {
                        document.querySelector('#address').innerHTML = address;
                        document.querySelector('#location').innerHTML = location;
                        document.querySelector('#forecast').innerHTML = forecast;
                        document.querySelector('.error').innerHTML = '';
                    }
                });
            }).catch((error) => {
                document.querySelector('.error').innerHTML = error;
                document.querySelector('#address').innerHTML = '';
                document.querySelector('#location').innerHTML = '';
                document.querySelector('#forecast').innerHTML = '';
            });
    } else {
        document.querySelector('.error').innerHTML = 'Invalid address';
    }
});
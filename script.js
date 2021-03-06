var dogImg = document.getElementsByTagName('img')[0];
var dogSelect = document.getElementsByTagName("select")[0];

function xhrDogList() {

    const xhrDogReq = new XMLHttpRequest();

    xhrDogReq.onload = function () {
        if (xhrDogReq.readyState == 4) {
            if (xhrDogReq.status == 200) {
                var data = JSON.parse(xhrDogReq.responseText);
                let option;
                const dogBreeds = Object.keys(data.message);

                for (let i = 0; i < dogBreeds.length; i++) {
                    option = document.createElement('option');
                    option.text = dogBreeds[i];
                    dogSelect.add(option);
                }
                for (const property in data) {
                    console.log(`${data[property]}`)
                }
                if (xhrDogReq.status == 404) {
                    console.log("File not found");
                }
            }

        }
    }
    xhrDogReq.open('GET', 'https://dog.ceo/api/breeds/list/all', true);
    xhrDogReq.send();

    setBtnFunc("xhr");
}

function showDogXHR() {
    var dBreed = dogSelect.value;

    var consulta = new XMLHttpRequest;
    console.log(dBreed);
    consulta.open("GET", "https://dog.ceo/api/breed/" + dBreed + "/images/random");

    consulta.onreadystatechange = () => {
        if (consulta.readyState == 2) {
            console.log("cargando");
        } else if (consulta.readyState == 3) {
            console.log("Interactivo");
        } else if (consulta.readyState == 4) {
            console.log("Completado");
            // console.log(JSON.parse(consulta.responseText));

            var dogObj = JSON.parse(consulta.responseText);
            dogImg.src = dogObj.message;
        }
    }

    consulta.send();
}


//Fetch
async function fetchDogList() {
    var dogObj;
    var dogImgUrl = await fetch('https://dog.ceo/api/breeds/list/all')
        .then(response => {
            return response.text()
        })
        .then(data => {
            dogObj = JSON.parse(data);
            return dogObj.message;
        })
        .catch(error => {
            console.log("Se ha producido un error");
        })

    let option;
    const dogBreeds = Object.keys(dogObj.message);

    for (let i = 0; i < dogBreeds.length; i++) {
        option = document.createElement('option');
        option.text = dogBreeds[i];
        dogSelect.add(option);
    };
    setBtnFunc("fetch");
}

async function fetchDog() {

    var dBreed = dogSelect.value;

    var dogImgUrl = await fetch("https://dog.ceo/api/breed/" + dBreed + "/images/random")
        .then(response => {
            return response.text()
        })
        .then(data => {
            var dogObj = JSON.parse(data);
            return dogObj.message;
        })
        .catch(error => {
            console.log("Se ha producido un error");
        })

    dogImg.src = dogImgUrl;
}
//jQuery y Ajax

function jQueryDogList() {
    $.ajax({
        url: 'https://dog.ceo/api/breeds/list/all', //URL de la petici??n
        type: 'GET', //tipo de la petici??n: POST o GET
        dataType: 'json', //tipo de dato que se espera
        success: function (json) { //funci??n a ejecutar si es satisfactoria
            let option;
            const dogBreeds = $.map(json.message, function(value,index) {
                return [index];
            });

            for (let i = 0; i < dogBreeds.length; i++) {
                option = document.createElement('option');
                option.text = dogBreeds[i];
                dogSelect.add(option);
            };
        },
        error: function (jqXHR, status, error) { //funci??n error
            console.log('Disculpe, existi?? un problema : ' + error);
        },
        // funci??n a ejecutar sin importar si la petici??n fall?? o no
        complete: function (jqXHR, status) {
            console.log('Petici??n realizada');
        }
    });
    setBtnFunc("jQuery");

}

function jQueryDog() {
    $.ajax({
        url: 'https://dog.ceo/api/breeds/image/random', //URL de la petici??n
        type: 'GET', //tipo de la petici??n: POST o GET
        dataType: 'json', //tipo de dato que se espera
        success: function (json) { //funci??n a ejecutar si es satisfactoria
            dogImg.src = json.message;
        },
        error: function (jqXHR, status, error) { //funci??n error
            console.log('Disculpe, existi?? un problema : ' + error);
        },
        // funci??n a ejecutar sin importar si la petici??n fall?? o no
        complete: function (jqXHR, status) {
            console.log('Petici??n realizada');
        }
    });
}

var radios = document.querySelectorAll("input");

radios.forEach(radio => {
    radio.addEventListener("change", () => {
        setSelect(radio.value);
    });
});

function setSelect(reqType) {
    if (reqType == "xhr") {

        xhrDogList();
    } else if (reqType == "fetch") {

        console.log("Recargando razas con: Fetch ");
        fetchDogList();

    } else if (reqType == "jQuery") {
        console.log("Recargando razas con: jQuery");
        jQueryDogList();
    }
}
function setBtnFunc(dogFunc) {
    var btn = document.getElementsByTagName("button")[0];


    btn.addEventListener("click", function btnListner() {
        if (dogFunc == "xhr") {
            console.log("Recargando razas con: XHR");

            showDogXHR();
        } else if (dogFunc == "fetch") {

            console.log("Recargando razas con: Fetch ");
            fetchDog();

        } else if (dogFunc == "jQuery") {
            console.log("Recargando razas con: jQuery");
            jQueryDog();
        }
    });
    console.log(dogFunc);

};

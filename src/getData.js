
function search() {
    var miDiv = document.getElementById('results1');
    var miDiv2 = document.getElementById('results2');
    miDiv.innerHTML = '';
    miDiv2.innerHTML = '';
    var e = document.getElementById("search-input");
    var value = e.value;

    var dataToSend = {
        val: value,
    };
    //Comunication with Flask server
    fetch('http://127.0.0.1:5000/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
        })
        .then(response => response.json())
        .then(data => {
            if(data.length == 0){
                mostraStats(null, 0);
            } else {
                for (const item of data) {
                    mostraStats(item, 1);
                }
            }
        });
}

function mostraStats(item, opc) {
    var miDiv = document.getElementById("results1");
    var miDiv2 = document.getElementById("results2");
    var arr = [];
    if(opc == 0){
        miDiv.innerHTML = '<h1>No hay resultados</h1>';
    } else {
        for (var i in item){
            arr.push(item[i])
        }
        var id = arr[2];
        var title = arr[12];
        var publish_date = arr[7];
        var pages = arr[5];
        var num_editions = arr[4];
        var contributors = arr[1];
        var placepublish = arr[6];
        var rating = arr[10];
        var quieren_leer = arr[9];
        var ya_leyendo = arr[12];
        var publishers = arr[8];
        var languages = arr[3];
        var autor_name = arr[0];
        var subjects = arr[11];
        miDiv.innerHTML = '<h1>Resultados:</h1>';
        miDiv2.innerHTML += '<div><h2>Título: ' + title + '</h2></div>' +
        '<div>ISBN:' + id + '</div>' + 
        '<div>Fecha de Lanzamiento:' + publish_date + '</div>' +
        '<div>Páginas:' + pages + '</div>' +
        '<div>Número de Ediciones:' + num_editions + '</div>' +
        '<div>Contribuidores:' + contributors + '</div>' +
        '<div>Lugares en los que se publicó:' + placepublish + '</div>' +
        '<div>Puntuación:' + rating + '</div>' +
        '<div>Usuarios que quieren leer este libro:' + quieren_leer + '</div>' +
        '<div>Usuarios que ya lo estan leyendo:' + ya_leyendo + '</div>' +
        '<div>Publicadores:' + publishers + '</div>' +
        '<div>Idiomas:' + languages + '</div>'  +
        '<div>Nombre del Autor:' + autor_name + '</div>' +
        '<div>Categorías:' + subjects + '</div>';
    }
}
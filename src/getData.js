
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
        miDiv.innerHTML = '<h1 style="text-align: center;">Resultados:</h1>';
        miDiv2.innerHTML += '<div style="background-color: rgba(54, 162, 235, 0.5); color: black; border-radius: 5px; padding: 3%; margin-bottom: 3%;">' + 
        '<div style="background-color: rgba(255, 99, 132, 1); color: black; border-radius: 5px; padding: 1%; margin-bottom: 3%;"><h2>Título: ' + title + '</h2></div>' +
        '<div style="background-color: white; color: black; border-radius: 5px; padding: 1%; margin-bottom: 3%;"><b>ID:</b>' + id + '</div>' + 
        '<div style="background-color: white; color: black; border-radius: 5px; padding: 1%; margin-bottom: 3%;"><b>Fecha de Lanzamiento:</b>' + publish_date + '</div>' +
        '<div style="background-color: white; color: black; border-radius: 5px; padding: 1%; margin-bottom: 3%;"><b>Páginas:</b>' + pages + '</div>' +
        '<div style="background-color: white; color: black; border-radius: 5px; padding: 1%; margin-bottom: 3%;"><b>Número de Ediciones:</b>' + num_editions + '</div>' +
        '<div style="background-color: white; color: black; border-radius: 5px; padding: 1%; margin-bottom: 3%;"><b>Contribuidores:</b>' + contributors + '</div>' +
        '<div style="background-color: white; color: black; border-radius: 5px; padding: 1%; margin-bottom: 3%;"><b>Lugares en los que se publicó:</b>' + placepublish + '</div>' +
        '<div style="background-color: white; color: black; border-radius: 5px; padding: 1%; margin-bottom: 3%;"><b>Puntuación:</b>' + rating + '</div>' +
        '<div style="background-color: white; color: black; border-radius: 5px; padding: 1%; margin-bottom: 3%;"><b>Usuarios que quieren leer este libro:</b>' + quieren_leer + '</div>' +
        '<div style="background-color: white; color: black; border-radius: 5px; padding: 1%; margin-bottom: 3%;"><b>Usuarios que ya lo estan leyendo:</b>' + ya_leyendo + '</div>' +
        '<div style="background-color: white; color: black; border-radius: 5px; padding: 1%; margin-bottom: 3%;"><b>Publicadores:</b>' + publishers + '</div>' +
        '<div style="background-color: white; color: black; border-radius: 5px; padding: 1%; margin-bottom: 3%;"><b>Idiomas:</b>' + languages + '</div>'  +
        '<div style="background-color: white; color: black; border-radius: 5px; padding: 1%; margin-bottom: 3%;"><b>Nombre del Autor:</b>' + autor_name + '</div>' +
        '<div style="background-color: white; color: black; border-radius: 5px; padding: 1%; margin-bottom: 3%;"><b>Categorías:</b>' + subjects + '</div></div>';
    }
}
function miFuncion() {
    var labelStat = []
    var data1 = []
    var data2 = []
    fetch('http://127.0.0.1:5000/stats1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
        })
        .then(response => response.json())
        .then(data => {
            for (const item of data) {
                labelStat.push(item["Title"])
                data1.push(item["QuierenLeer"])
                data2.push(item["YaLeyendo"])
            }
            miDiv2 = document.getElementById("stats1");
            miDiv2.innerHTML = '<canvas id="grafico" width="50%" height="50%" style="margin-left: 20%; margin-right: 20%;"></canvas>';
            let canvas = document.getElementById("grafico");
            var data = {
                labels: labelStat,
                datasets: [{
                    label: 'Personas que quieren leer el libro',
                    data: data1,
                    backgroundColor: 'rgba(255, 99, 132, 0.5)', 
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }, {
                    label: 'Personas que ya estan leyendo el libro',
                    data: data2,
                    backgroundColor: 'rgba(54, 162, 235, 0.5)', 
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            };
            graph = new Chart(canvas, {
                type: "bar",
                data: data
            });   
        });
        doGraph();
        doGraph2();
}

function doGraph(){
    var ratg = []
    var counter = 0
    var dataToSend = {
        val: "",
    };
    fetch('http://127.0.0.1:5000/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
        })
        .then(response => response.json())
        .then(data => {
            for (const item of data) {
                ratg.push([item["Title"], item["Rating"]])
            }
            maxRating = []
            nameTitle = []
            ratg.sort(function(a, b) {
                return b[1] - a[1];
            });
            for (var i in ratg){
                maxRating.push(ratg[i][1])
                nameTitle.push(ratg[i][0])
                if(counter == 4){
                    break;
                }
                counter++;
            }
            miDiv2 = document.getElementById("stats2");
            miDiv2.innerHTML = '<canvas id="grafico2" width="50%" height="50%" style="margin-left: 30%; margin-right: 30%;"></canvas>';
            let canvas = document.getElementById("grafico2");
            var data = {
                labels: nameTitle,
                datasets: [{
                    label: 'Ratings',
                    data: maxRating,
                    backgroundColor: 'rgba(255, 99, 132, 0.5)', 
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }]
            };
            graph = new Chart(canvas, {
                type: "bar",
                data: data
            });   

    });
}

function doGraph2(){
    var pag = []
    var counter = 0
    var dataToSend = {
        val: "",
    };
    fetch('http://127.0.0.1:5000/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
        })
        .then(response => response.json())
        .then(data => {
            for (const item of data) {
                pag.push([item["Title"], item["Pages"]])
            }
            maxPages = []
            nameTitle = []
            pag.sort(function(a, b) {
                return b[1] - a[1];
            });
            for (var i in pag){
                maxPages.push(pag[i][1])
                nameTitle.push(pag[i][0])
                if(counter == 4){
                    break;
                }
                counter++;
            }
            miDiv2 = document.getElementById("stats3");
            miDiv2.innerHTML = '<canvas id="grafico3" width="50%" height="50%" style="margin-left: 30%; margin-right: 30%;"></canvas>';
            let canvas = document.getElementById("grafico3");
            var data = {
                labels: nameTitle,
                datasets: [{
                    label: 'Listado de los 5 libros con mayor número de páginas',
                    data: maxPages,
                    backgroundColor: 'rgba(255, 99, 132, 0.5)', 
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }]
            };
            graph = new Chart(canvas, {
                type: "bar",
                data: data
            });   

    });
}


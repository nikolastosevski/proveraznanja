const http = require('http');
const url = require('url');
const querystring = require('query-string');
let artikli = [
    {
        "id": 1,
        "naziv": "Naziv1",
        "cena": "100",
        "imeKompanije": "Kompanija1"
    },
    {
        "id": 2,
        "naziv": "Naziv2",
        "cena": "200",
        "imeKompanije": "Kompanija2"
    },
    {
        "id": 3,
        "naziv": "Naziv3",
        "cena": "300",
        "imeKompanije": "Kompanija3"
    }
];

http.createServer(function (req, res){    
    let urlObj = url.parse(req.url,true,false);
    if (req.method == "GET"){
        if (urlObj.pathname == "/svi-artikli"){ 
            response = sviArtikli();
            res.write(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Svi Artikli</title>
                    <style>
                        table, th, td {
                            border: 1px solid black;
                        }
                        th,td {
                            padding: 5px 12px;
                        }
                    </style>
                </head>
                <body>
                    <h3>Svi Artikli</h3>
                    <a href="/dodaj-artikal">Dodaj Artikal</a>
                    <br>
                    <br>
                    <div id="prikaz">
                        <table>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Naziv</th>
                                    <th>Cena</th>
                                    <th>Kompanija</th>
                                    <th>Izmena</th>
                                    <th>Brisanje</th>
                                </tr>
                            </thead>               
                            <tbody>
            `);
            for(let a of response){
                res.write(`
                    <tr>
                        <td>${a.id}</td>
                        <td>${a.naziv}</td>
                        <td>${a.cena}</td>
                        <td>${a.imeKompanije}</td>
                        <td><a href='/postavi-artikal?id=${a.id}'>Izmeni Artikal</a></td>
                        <td>
                            <form action='/obrisi-artikal' method='POST'>
                                <input type='hidden' name='id' value='${a.id}'>
                                <button type='submit'>Brisanje Artikla</button>
                            </form>
                        </td>
                    </tr>
                `);
            }
            res.end(`
                            </tbody>
                        </table>
                    </body>
                </html>
            `);
        }
        if (urlObj.pathname == "/proba"){ 
            res.writeHead(302, {
                'Location': '/svi-artikli'
            });
            res.end();
        }
        if (urlObj.pathname == "/postavi-artikal"){
            let artikal = artikli.find(x => x.id == urlObj.query.id);
            res.write(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Izmeni Artikal</title>
                </head>
                <body>
                    <h3>Izmeni Artikal</h3>
                    <a href="/svi-artikli">Sve Osobe</a>
                    <br><br>
                    <form action='/postavi-artikal' method='POST'>
                        ID: <input type='number' name='id' value='${artikal.id}' readonly><br><br>
                        NAZIV: <input type='text' name='naziv' value='${artikal.naziv}'><br><br>
                        CENA: <input type='text' name='cena' value='${artikal.cena}'><br><br>
                        KOMPANIJA: <input type='text' name='imeKompanije' value='${artikal.imeKompanije}'><br><br>
                        <button type='submit'>IZMENI ARTIKAL</button>
                    </form>
                </body>
                </html>
            `);
        }
        if (urlObj.pathname == "/dodaj-artikal"){
            res.write(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Dodaj Artikal</title>
                </head>
                <body>
                    <h3>Dodaj Artikal</h3>
                    <a href="/svi-artikli">Svi Artikli</a>
                    <br><br>
                    <form action='/dodaj-artikal' method='POST'>
                        ID: <input type='number' name='id'><br><br>
                        NAZIV: <input type='text' name='naziv'><br><br>
                        CENA: <input type='text' name='cena'><br><br>
                        KOMAPNIJA: <input type='text' name='imeKompanije'><br><br>
                        <button type='submit'>DODAJ ARTIKAL</button>
                    </form>
                </body>
                </html>
            `);
        }
        if (urlObj.pathname == "/artikli-kompanije"){ 
            response = artiklikompanije();
            res.write(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Artikli Komapnije</title>
                    <style>
                        table, th, td {
                            border: 1px solid black;
                        }
                        th,td {
                            padding: 5px 12px;
                        }
                    </style>
                </head>
                <body>
                    <h3>Artikli Kompanije</h3>
                    <a href="/svi-artikli">Svi Artikli</a>
                    <br>
                    <br>
                    <form action='/artikal-kompanije' method='POST'>
                        KOMAPNIJA: <input type='text' name='imeKompanije'><br><br>
                        <button type='submit'>PRETRAZI KOMPANIJU</button>
                    </form>
                    <div id="prikaz">
                        <table>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Naziv</th>
                                    <th>Cena</th>
                                    <th>Kompanija</th>
                                </tr>
                            </thead>               
                            <tbody>
            `);
            for(let a of response){
                res.write(`
                    <tr>
                        <td>${a.id}</td>
                        <td>${a.naziv}</td>
                        <td>${a.cena}</td>
                        <td>${a.imeKompanije}</td>
                    </tr>
                `);
            }
            res.end(`
                            </tbody>
                        </table>
                    </body>
                </html>
            `);
        }






    }
    else if(req.method == "POST") {
        if (urlObj.pathname == "/postavi-artikal"){
            var body = '';
                req.on('data', function (data) {
                body += data;
            });
            req.on('end', function () {
                postaviArtikal(querystring.parse(body).id,querystring.parse(body).naziv,
                             querystring.parse(body).cena,querystring.parse(body).imeKompanije);
                res.writeHead(302, {
                    'Location': '/sve-osobe'
                });
                res.end();
            });
        }
        if (urlObj.pathname == "/obrisi-artikal"){
            var body = '';
                req.on('data', function (data) {
                body += data;
            });
            req.on('end', function () {
                obrisiArtikal(querystring.parse(body).id)
                res.writeHead(302, {
                    'Location': '/sve-osobe'
                });
                res.end();
            });
        }
        if (urlObj.pathname == "/dodaj-artikal"){
            var body = '';
                req.on('data', function (data) {
                body += data;
            });
            req.on('end', function () {
                dodajArtikal(querystring.parse(body).id,querystring.parse(body).naziv,
                           querystring.parse(body).cena,querystring.parse(body).imeKompanije);
                res.writeHead(302, {
                    'Location': '/sve-osobe'
                });
                res.end();
            });
        }
        if (urlObj.pathname == "/artikal-kompanije"){
            var body = '';
                req.on('data', function (data) {
                body += data;
            });
            req.on('end', function () {
                dodajArtikal(querystring.parse(body).imeKompanije);
                res.writeHead(302, {
                    'Location': '/artikli-kompanije'
                });
                res.end();
            });
        }
    }
}).listen(4000);

function sviArtikli(){
    return artikli;
}
function postaviArtikal(id,naziv,cena,imeKompanije){
    for(let i=0;i<artikli.length;i++){
        if(artikli[i].id == id){
            artikli[i].naziv = naziv;
            artikli[i].cena = cena;
            artikli[i].imeKompanije = imeKompanije;
        }
    }
}
function obrisiArtikal(id){
    let pomocni = []
    for(let i=0;i<artikli.length;i++){
        if(artikli[i].id != id){
            pomocni.push(artikli[i])
        }
    }
    artikli = pomocni
    return artikli
}

function artiklikompanije(imeKOmpanije){
    let pomocni = []
    for(let i=0;i<artikli.length;i++){
        if(artikli[i].imeKompanije == imeKompanije){
            pomocni.push(artikli[i])
        }
    }
    return pomocni
}

function dodajArtikal(id,naziv,cena,imeKompanije){
    let tmp = {
        'id': id,
        'naziv': naziv,
        'cena': cena,
        'imeKompanije': imeKompanije
    };
    artikli.push(tmp);
}
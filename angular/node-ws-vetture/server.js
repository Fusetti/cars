const express = require('express'); // modulo per il server express
const oracledb = require('oracledb'); // modulo per gestire il database oracle
const app = express();

const PORT = 3000;
const dataSource = {
    user: "vetturedb",
    password: "vetturedb",
    connectString: "127.0.0.1:1521/xe"
};

const marca = {
    add: `INSERT INTO marca VALUES (marca_seq.nextval, :nome, :fondazione, :website)`,
    addOptions: {
        autoCommit: true,
        bindDefs: {
            nome: { type: oracledb.STRING, maxSize: 100 },
            fondazione: { type: oracledb.NUMBER },
            website: { type: oracledb.STRING, maxSize: 300 }
        }
    },
    getId: `SELECT m.id_marca AS "idMarca", m.nome AS "nome", m.fondazione AS "fondazione", m.website AS "website" FROM marca m WHERE m.id_marca = :idMarca`,
    getIdOptions: {
        bindDefs: {
            id_marca: { type: oracledb.NUMBER }
        }
    },
    getName: `SELECT m.id_marca AS "idMarca", m.nome AS "nome", m.fondazione AS "fondazione", m.website AS "website" FROM marca m WHERE m.nome = :nome`,
    getNameOptions: {
        bindDefs: {
            nome: { type: oracledb.STRING, maxSize: 100 }
        }
    },
    set: `UPDATE marca SET nome = :nome, fondazione = :fondazione, website = :website WHERE id_marca = :idMarca`,
    setOptions: {
        autoCommit: true,
        bindDefs: {
            nome: { type: oracledb.STRING, maxSize: 100 },
            fondazione: { type: oracledb.NUMBER },
            website: { type: oracledb.STRING, maxSize: 300 },
            id_marca: { type: oracledb.NUMBER }
        }
    },
    remove: `DELETE FROM marca WHERE id_marca = :idMarca`,
    removeOptions: {
        autoCommit: true,
        bindDefs: {
            id_marca: { type: oracledb.NUMBER }
        }
    },
    getAll: `SELECT m.id_marca AS "idMarca", m.nome AS "nome", m.fondazione AS "fondazione", m.website AS "website" FROM marca m ORDER BY m.nome`
};

const modello = {
    add: `INSERT INTO modello VALUES (modello_seq.nextval, :nome, :cilindrata, :potenza, :idMarca)`,
    addOptions: {
        autoCommit: true,
        bindDefs: {
            nome: { type: oracledb.STRING, maxSize: 100 },
            cilindrata: { type: oracledb.NUMBER },
            potenza: { type: oracledb.NUMBER },
            id_marca: { type: oracledb.NUMBER }
        }
    },
    getId: `SELECT m.id_modello AS "idModello", m.nome AS "nome", m.cilindrata AS "cilindrata", m.potenza AS "potenza", m.id_marca AS "idMarca" FROM modello m WHERE m.id_modello = :idModello`,
    getIdOptions: {
        bindDefs: {
            nome: { type: oracledb.NUMBER }
        }
    },
    getName: `SELECT m.id_modello AS "idModello", m.nome AS "nome", m.cilindrata AS "cilindrata", m.potenza AS "potenza", m.id_marca AS "idMarca" FROM modello m WHERE m.nome = :nome`,
    getNameOptions: {
        bindDefs: {
            nome: { type: oracledb.STRING, maxSize: 100 }
        }
    },
    set: `UPDATE modello SET nome = :nome, cilindrata = :cilindrata, potenza = :potenza, id_marca = :idMarca WHERE id_modello = :idModello`,
    setOptions: {
        autoCommit: true,
        bindDefs: {
            nome: { type: oracledb.STRING, maxSize: 100 },
            cilindrata: { type: oracledb.NUMBER },
            potenza: { type: oracledb.NUMBER },
            id_marca: { type: oracledb.NUMBER },
            id_modello: { type: oracledb.NUMBER }
        }
    },
    remove: `DELETE FROM modello WHERE id_modello = :idModello`,
    removeOptions: {
        autoCommit: true,
        bindDefs: {
            id_modello: { type: oracledb.NUMBER }
        }
    },
    getAll: `SELECT m.id_modello AS "idModello", m.nome AS "nome", m.cilindrata AS "cilindrata", m.potenza AS "potenza", m.id_marca AS "idMarca" FROM modello m ORDER BY m.nome`
};

// function per eseguire query sul database oracle 11g
function executeUpdate(query, params, options) {
    return oracledb.getConnection(dataSource)
        .then(connection => {
            return connection.execute(query, params, options)
                .then(result => {
                    console.log('-executeUpdate- result: ' + JSON.stringify(result));
                    console.log('*********************************************\n');
                    doRelease(connection);

                    return true;
                }).catch(error => {
                    console.error('-execute- error: ' + error.message);
                    doRelease(connection);

                    return false;
                });
        }).catch(error => {
            console.error('-getConnection- error: ' + error.message);
        });
}
function executeQuery(query, params) {
    return oracledb.getConnection(dataSource)
        .then(connection => {
            return connection.execute(query, params, { outFormat: oracledb.OBJECT })
                .then(result => {
                    console.log('-executeQuery- result: {"rowsCount":' + JSON.stringify(result.rows.length) + '}');
                    console.log('*********************************************\n');
                    let rs = result.rows;
                    doRelease(connection);

                    return rs;
                }).catch(error => {
                    console.error('-execute- error: ' + error.message);
                    doRelease(connection);

                    return null;
                });
        }).catch(error => {
            console.error('-getConnection- error: ' + error.message);
        });
}
function doRelease(connection) {
    connection.close((error) => {
        if(error)
            console.error('-close- error: ' + error.message);
    });
}

// abilita l'accesso alle risorse statiche che si trovano sotto pages
app.use(express.static('pages'));
// abilita il body parser per recuperare un json da una request
app.use(express.json());

// abilita accesso da remoto
app.use(function(request, response, next) {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Methods', 'PUT, DELETE');
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// metodi per creare web service
app.get('/', (request, response) => response.send('<h1>Welcome to WS-VETTURE</h1>'));

app.get('/test', (request, response) => response.sendFile('pages/test.html', { root: __dirname }));

// ws per marca
app.post('/marca/inserisci', (request, response) => {
    const data = request.body;
    console.log('data arrived to web server:');
    console.log(data);
    executeUpdate(marca.add, [data.nome, data.fondazione, data.website], marca.addOptions)
        .then(result => {
            response.setHeader('Content-Type', 'application/json');
            response.send(JSON.stringify({
                esito: {
                    marca: {
                        inserisci: result,
                        aggiorna: null,
                        rimuovi: null
                    },
                    modello: {
                        inserisci: null,
                        aggiorna: null,
                        rimuovi: null
                    }
                }
            }));
        });
});

app.get('/marca/leggi-per-id/:id', (request, response) => {
    const data = request.body;
    console.log('data arrived to web server:');
    console.log(data);
    executeQuery(marca.getId, [request.params.id], marca.getIdOptions)
        .then(result => {
            response.setHeader('Content-Type', 'application/json');
            response.send(JSON.stringify({ esito: { marca: result, modello: null } }));
        });
});

app.get('/marca/leggi-per-nome/:nome', (request, response) => {
    const data = request.body;
    console.log('data arrived to web server:');
    console.log(data);
    executeQuery(marca.getName, [request.params.nome], marca.getNameOptions)
        .then(result => {
            response.setHeader('Content-Type', 'application/json');
            response.send(JSON.stringify({ esito: { marca: result, modello: null } }));
        });
});

app.put('/marca/aggiorna', (request, response) => {
    const data = request.body;
    console.log('data arrived to web server:');
    console.log(data);
    executeUpdate(marca.set, [data.nome, data.fondazione, data.website, data.idMarca], marca.setOptions)
        .then(result => {
            response.setHeader('Content-Type', 'application/json');
            response.send(JSON.stringify({
                esito: {
                    marca: {
                        inserisci: null,
                        aggiorna: result,
                        rimuovi: null
                    },
                    modello: {
                        inserisci: null,
                        aggiorna: null,
                        rimuovi: null
                    }
                }
            }));
        });
});

app.delete('/marca/rimuovi/:id', (request, response) => {
    const data = request.body;
    console.log('data arrived to web server:');
    console.log(data);
    executeUpdate(marca.remove, [request.params.id], marca.removeOptions)
        .then(result => {
            response.setHeader('Content-Type', 'application/json');
            response.send(JSON.stringify({
                esito: {
                    marca: {
                        inserisci: null,
                        aggiorna: null,
                        rimuovi: result
                    },
                    modello: {
                        inserisci: null,
                        aggiorna: null,
                        rimuovi: null
                    }
                }
            }));
        });
});

app.get('/marca/leggi-tutto', (request, response) => {
    const data = request.body;
    console.log('data arrived to web server:');
    console.log(data);
    executeQuery(marca.getAll, [])
        .then(result => {
            response.setHeader('Content-Type', 'application/json');
            response.send(JSON.stringify({ esito: { marca: result, modello: null } }));
        });
});

// ws per modello
app.post('/modello/inserisci', (request, response) => {
    const data = request.body;
    console.log('data arrived to web server:');
    console.log(data);
    executeUpdate(modello.add, [data.nome, data.cilindrata, data.potenza, data.idMarca], modello.addOptions)
        .then(result => {
            response.setHeader('Content-Type', 'application/json');
            response.send(JSON.stringify({
                esito: {
                    marca: {
                        inserisci: null,
                        aggiorna: null,
                        rimuovi: null
                    },
                    modello: {
                        inserisci: result,
                        aggiorna: null,
                        rimuovi: null
                    }
                }
            }));
        });
});

app.get('/modello/leggi-per-id/:id', (request, response) => {
    const data = request.body;
    console.log('data arrived to web server:');
    console.log(data);
    executeQuery(modello.getId, [request.params.id], modello.getIdOptions)
        .then(result => {
            response.setHeader('Content-Type', 'application/json');
            response.send(JSON.stringify({ esito: { marca: null, modello: result } }));
        });
});

app.get('/modello/leggi-per-nome/:nome', (request, response) => {
    const data = request.body;
    console.log('data arrived to web server:');
    console.log(data);
    executeQuery(modello.getName, [request.params.nome], modello.getNameOptions)
        .then(result => {
            response.setHeader('Content-Type', 'application/json');
            response.send(JSON.stringify({ esito: { marca: null, modello: result } }));
        });
});

app.put('/modello/aggiorna', (request, response) => {
    const data = request.body;
    console.log('data arrived to web server:');
    console.log(data);
    executeUpdate(modello.set, [data.nome, data.cilindrata, data.potenza, data.idMarca, data.idModello], modello.setOptions)
        .then(result => {
            response.setHeader('Content-Type', 'application/json');
            response.send(JSON.stringify({
                esito: {
                    marca: {
                        inserisci: null,
                        aggiorna: null,
                        rimuovi: null
                    },
                    modello: {
                        inserisci: null,
                        aggiorna: result,
                        rimuovi: null
                    }
                }
            }));
        });
});

app.delete('/modello/rimuovi/:id', (request, response) => {
    const data = request.body;
    console.log('data arrived to web server:');
    console.log(data);
    executeUpdate(modello.remove, [request.params.id], modello.removeOptions)
        .then(result => {
            response.setHeader('Content-Type', 'application/json');
            response.send(JSON.stringify({
                esito: {
                    marca: {
                        inserisci: null,
                        aggiorna: null,
                        rimuovi: null
                    },
                    modello: {
                        inserisci: null,
                        aggiorna: null,
                        rimuovi: result
                    }
                }
            }));
        });
});

app.get('/modello/leggi-tutto', (request, response) => {
    const data = request.body;
    console.log('data arrived to web server:');
    console.log(data);
    executeQuery(modello.getAll, [])
        .then(result => {
            response.setHeader('Content-Type', 'application/json');
            response.send(JSON.stringify({ esito: { marca: null, modello: result } }));
        });
});

// attiva il server su una certa porta
app.listen(PORT, () => console.log(`Server listening on port ${PORT} ...`));
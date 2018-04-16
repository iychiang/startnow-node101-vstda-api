const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

let initialData = [
    {
        todoItemId: 0,
        name: 'an item',
        priority: 3,
        completed: false
    },
    {
        todoItemId: 1,
        name: 'another item',
        priority: 2,
        completed: false
    },
    {
        todoItemId: 2,
        name: 'a done item',
        priority: 1,
        completed: true
    }
];

app.get('/', (req, res) => {
    res.status(200).send({ status: "ok" });
});

app.get('/api/todoItems', (req, res) => {
    res.status(200).send(initialData);
});

app.get('/api/todoItems/:number', (req, res) => {
    let numberRoute = req.params.number;
    let index = initialData.findIndex(x => x.todoItemId == numberRoute);
    res.status(200).send(initialData[index]);
    console.log("Get index number", index);
    //res.status(200).send(initialData[x]); works only if array is in order
});

app.post('/api/todoItems', (req, res) => {
    //if req.body[index of todoItem] exists already, replace it
    let request = req.body;
    let dataAdded = false;
    for (i = 0; i < initialData.length; i++) {
        if (initialData[i].todoItemId === request.todoItemId){
            //initialData.splice(i, 1, request);
            initialData[i] = request;
            dataAdded = true;
        }
    };

    if (dataAdded == false){ //if request doesn't match
        initialData.push(request);
    };
    //initialData.splice(initialData.length + 1, 0, request);
    //console.log("Incoming request todoItemId: ", request.todoItemId);
    //console.log("initialData index: ", initialData.findIndex(x => x.todoItemId == request.todoItemId));
    //initialData.push(req.body) = initialData;
    res.status(201).send(request);
});

app.delete('/api/todoItems/:number', (req, res) => {
    let numberRoute = req.params.number;
    let index = initialData.findIndex(x => x.todoItemId == numberRoute);
    res.status(200).send(initialData[index]);
    initialData.splice(index, 1);
});

app.listen(8484, () => {
    console.log("Listening on port 8484");
});

module.exports = app;

const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const http = require('http').createServer(app)

app.use(bodyParser.json());
app.use(express.json())

const mochFamily = [{
    name: "Mocha",
    petName: "Mochu",
    habit: "eating",
    age: 27
}, {
    name: "Milk",
    petName: "Milku",
    habit: "sleeping",
    age: 29
}, {
    name: "Matcha",
    petName: "kutti",
    habit: "roaming",
    age: 22
},{
    name: "Bubu",
    petName: "cutie",
    habit: "fighting",
    age: 28
}];

app.get('/api/bears', (request, response) => {
    response.status(200).send(mochFamily);
});

app.post('/api/bear/create', (request, response) => {
    const newBear = {
        name: request.body.name,
        petName: request.body.petName,
        habit: request.body.habit,
        age: request.body.age
    };

    mochFamily.push(newBear);

    const data = {
        message: "Bear Family has been created successfully"
    }
    response.status(200).send(data);
});

app.put('/api/bear/update/:id', (request, response) => {
    const id = request.params.id;
    const index = mochFamily.findIndex((value, index) => {
        return value.id == id;
    });

    const editBear = {
        name: request.body.name,
        petName: request.body.petName,
        habit: request.body.habit,
        age: request.body.age,
        id: mochFamily[index].id
    };

    mochFamily[index] = editBear;
    const data = {
        message: "Bear Family has been Updated successfully"
    }
    response.status(200).send(data);
});

app.delete('/api/bear/delete/:id', (request, response) => {
    const id = request.params.id;
    const index = mochFamily.findIndex((value, index) => {
        return value.id == id;
    });

    mochFamily.splice(index, 1);
    const data = {
        message: "Bear Family has been Deleted successfully"
    }
    response.status(200).send(data);
})


const port = process.env.port || 8080;

http.listen(port, () => {
    console.log("SERVER IS RUNNING ON PORT 8080");
})
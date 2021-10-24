const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const path = require('path');


const fs = require('fs');


app.use(bodyParser.json());
app.use(express.json());

function writeJSONFile(tempData) {
  fs.writeFile(path.resolve('./data/data.json'), JSON.stringify(tempData), error => {
    if (error) throw error;
    console.log("Done writing to JSON");
  })
}

app.get('/getOrders', (req, res) => {
  res.send(retrieveOrders());
})
app.get('/getDrivers', (req, res) => {
  res.send(retrieveDrivers());
})


app.post('/saveNewDriver', function (req, res) {


  fs.readFile('./data/data.json', (error, jsonString) => {
    if (error) {
      console.log(error);
    } else {
      try {

        //loading data
        let data = JSON.parse(jsonString);
        
        //get new driver information
        const newDriver = req.body

        //construct a new driver object with sent values
        const payload = {
          name: newDriver.name,
          insuranceNumber: newDriver.insurance
        }

        let newColumnNumber = Object.keys(data.columns).length + 1;
        let newColumnId = "column-" + newColumnNumber;

        //adding new driver into data and then saving that to my JSON file
        data.drivers[newDriver.name] = payload;
        data.columns[newColumnId] = {
          id: newColumnId,
          title: newDriver.name,
          orderIds: [],
          driverId: newDriver.name,
        };
        data.columnOrder.push(newColumnId);
        writeJSONFile(data);


        //data.columns['column-1'].orderIds.push(newOrderId);
        //writeJSONFile(data);
        res.send(data);
      } catch (error) {
        console.log("Error parsing JSON", error);
      }
    }
  })

})


app.post('/saveNewOrder', function (req, res) {

  fs.readFile('./data/data.json', (error, jsonString) => {
    if (error) {
      console.log(error);
    } else {
      try {

        //loading data
        let data = JSON.parse(jsonString);
        //grab values from the request body
        const newOrder = req.body

        //constructing a new order object
        let newOrderNumber = Object.keys(data.orders).length + 1;
        let newOrderId = "order-" + newOrderNumber;

        //adding the new order to oders list
        data.orders[newOrderId] = newOrder;
        data.orders[newOrderId].id = newOrderId;

        //pushing new order into unassigned orders and writing to my JSON file
        data.columns['column-1'].orderIds.push(newOrderId);

        writeJSONFile(data);
        res.send(data);
      } catch (error) {
        console.log("Error parsing JSON", error);
      }
    }
  })

})

app.post('/saveCostAndRevenue', (req, res) => {

  fs.readFile('./data/data.json', (error, jsonString) => {
    if (error) {
      console.log(error);
    } else {
      try {

        //loading data
        let data = JSON.parse(jsonString);
        console.log(req.body);
        //grab values from the request body
        const newCost = req.body.cost;
        const newRevenue = req.body.revenue;
        const orderToChange = req.body.orderId;

        //changing specified order cost/revenue
        data.orders[orderToChange].cost = newCost;
        data.orders[orderToChange].revenue = newRevenue;
        writeJSONFile(data);
        res.send(data);
      } catch (error) {
        console.log("Error parsing JSON", error);
      }
    }
  })

})


app.get('/getData', (req, res) => {
  fs.readFile('./data/data.json', (error, jsonString) => {
    if (error) {
      console.log(error);
    } else {
      try {
        let data = JSON.parse(jsonString);
        res.header("Content-Type", 'application/json');
        res.send(data);
        return;
      } catch (error) {
        console.log("Error parsing JSON", error);
      }
    }
  })


})

app.post('/updateJSON', (req, res) => {
  const payload = req.body;
  writeJSONFile(payload);
  res.send(payload);

})

app.get('/downloadJSON', (req, res) => {
  const file = './data/data.json'
  res.download(file);
})

app.post('/uploadJSON', (req, res) => {
  console.log(req.files);
})




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
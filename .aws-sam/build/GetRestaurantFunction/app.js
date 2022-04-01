const AWS = require("aws-sdk");

AWS.config.update({
    region: "eu-central-1",
});

const DynamoDB = new AWS.DynamoDB();

function createTable() {
    const params = {
        TableName: "Restaurants",
        KeySchema: [{ AttributeName: "uid", KeyType: "HASH" }],
        AttributeDefinitions: [{ AttributeName: "uid", AttributeType: "S" }],
        ProvisionedThroughput: {
            ReadCapacityUnits: 10,
            WriteCapacityUnits: 10,
        },
    };

    DynamoDB.createTable(params, function (err, data) {
        if (err) {
            console.error("Impossible de créer la table", err);
        } else {
            console.log("Table créée", data);
        }
    });
}

function addRestaurant(event,context) {
    const params = {
        TableName: "Restaurants",
        Item: {
            uid: { S: event.name },
            name: { S: event.name },
            type: { S: event.type },
            adresse: { S: event.adresse },
        },
    };

    DynamoDB.putItem(params, function (err) {
        if (err) {
            console.error("Impossible d'ajouter le restaurant", err);
        } else {
            console.log(`Le ${event.type} ${event.name} situé le ${event.adresse} a été ajouté`);
        }
    });
}

function getAllRestaurants() {
    const params = {
        TableName: "Restaurants",
    };

    DynamoDB.scan(params, function (err, data) {
        if (err) {
            console.error("Impossible de trouver des restaurants", err);
        } else {
            console.log(`Trouvé ${data.Count} restaurants`);
            console.log(data.Items);
        }
    });
}

function getRestaurant(event, context) {
    const params = {
        TableName: "Restaurants",
        Key: {
            uid: { S: event.uid },
        },
    };

    DynamoDB.getItem(params, function (err, data) {
        if (err) {
            console.error("Impossible de trouver ce restaurant", err);
        } else {
            console.log("Restaurant trouvé", data.Item);
        }
    });
}

function updateRestaurantName(event, context) {
    const params = {
      TableName: "Restaurants",
      Item: {
        uid: { S: event.uid },
        name: { S: event.name.toString() },
      },
      ReturnConsumedCapacity: "TOTAL",
    };
  
    DynamoDB.putItem(params, function(err) {
      if (err) {
        console.error("Impossible de trouver le film", err);
      } else {
        console.log(`Le nom du restaurant ${event.uid} a bien été mis à jour avec le nom ${event.name}`);
      }
    });
  }

module.exports = {
    createTable,
    addRestaurant,
    getAllRestaurants,
    getRestaurant,
    updateRestaurantName
};
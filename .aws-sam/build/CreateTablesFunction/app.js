//const { v4: uuidv4 } = require("uuid");    
const AWS = require("aws-sdk");

AWS.config.update({
    region: "eu-central-1",
});

const DynamoDB = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

function createTables() {
    const restaurant = {
        TableName: "Restaurants",
        KeySchema: [{ AttributeName: "uid", KeyType: "HASH" }],
        AttributeDefinitions: [{ AttributeName: "uid", AttributeType: "S" }],
        ProvisionedThroughput: {
            ReadCapacityUnits: 10,
            WriteCapacityUnits: 10,
        },
    };

    DynamoDB.createTable(restaurant, function (err, data) {
        if (err) {
            console.error("Impossible de créer la table Restaurants", err);
        } else {
            console.log("Table créée", data);
        }
    });

    const datas = {
        TableName: "Datas",
        KeySchema: [{ AttributeName: "uid", KeyType: "HASH" }],
        AttributeDefinitions: [{ AttributeName: "uid", AttributeType: "S" }],
        ProvisionedThroughput: {
            ReadCapacityUnits: 10,
            WriteCapacityUnits: 10,
        },
    };

    DynamoDB.createTable(datas, function (err, data) {
        if (err) {
            console.error("Impossible de créer la table Datas", err);
        } else {
            console.log("Table créée", data);
        }
    });
}

function generateRestaurants() {
    const params = {
        RequestItems: {
            "Restaurants": [
                {
                    PutRequest: {
                        Item: {
                            uid: { S: "King Burger" },
                            name: { S: "King Burger" },
                            typeRestaurant: { S: "Fast food" },
                            adresse: { S: "163 Rue du Faubourg d'Arras, 59000 Lille" },
                        }
                    }
                },
                {
                    PutRequest: {
                        Item: {
                            uid: { S: "Aux éphérites" },
                            name: { S: "Aux éphérites" },
                            typeRestaurant: { S: "Bistro" },
                            adresse: { S: "17 Rue Nicolas Leblanc, 59000 Lille" },
                        }
                    }
                },
                {
                    PutRequest: {
                        Item: {
                            uid: { S: "Le Chantecler" },
                            name: { S: "Le Chantecler" },
                            typeRestaurant: { S: "Restaurant français" },
                            adresse: { S: "22 Rue Nicolas Leblanc, 59000 Lille" },
                        }
                    }
                },
                {
                    PutRequest: {
                        Item: {
                            uid: { S: "Patrimoine Kabyle" },
                            name: { S: "Patrimoine Kabyle" },
                            typeRestaurant: { S: "Restaurant de cuisine traditionnelle" },
                            adresse: { S: "30 Rue Nicolas Leblanc, 59000 Lille" },
                        }
                    }
                },
                {
                    PutRequest: {
                        Item: {
                            uid: { S: "La Fossetta" },
                            name: { S: "La Fossetta" },
                            typeRestaurant: { S: "Restaurant italien" },
                            adresse: { S: "15 Rue des Fossés, 59000 Lille" },
                        }
                    }
                },
                {
                    PutRequest: {
                        Item: {
                            uid: { S: "Saveurs de l'Inde" },
                            name: { S: "Saveurs de l'Inde" },
                            typeRestaurant: { S: "Restaurant indien" },
                            adresse: { S: "181 Rue Solférino, 59000 Lille" },
                        }
                    }
                },
                {
                    PutRequest: {
                        Item: {
                            uid: { S: "L'Avant Scène" },
                            name: { S: "L'Avant Scène" },
                            typeRestaurant: { S: "Restaurant français" },
                            adresse: { S: "8 Pl. Philippe Lebon, 59000 Lille" },
                        }
                    }
                },
                {
                    PutRequest: {
                        Item: {
                            uid: { S: "Chez Max Bistrot Lillois" },
                            name: { S: "Chez Max Bistrot Lillois" },
                            typeRestaurant: { S: "Restaurant français" },
                            adresse: { S: "164 Rue Solférino, 59800 Lille" },
                        }
                    }
                },
                {
                    PutRequest: {
                        Item: {
                            uid: { S: "Le Broc" },
                            name: { S: "Le Broc" },
                            typeRestaurant: { S: "Restaurant français" },
                            adresse: { S: "17 Pl. de Béthune, 59800 Lille" },
                        }
                    }
                },
                {
                    PutRequest: {
                        Item: {
                            uid: { S: "Il Ristorante - le restaurant Italien de Lille" },
                            name: { S: "Il Ristorante - le restaurant Italien de Lille" },
                            typeRestaurant: { S: "Restaurant italien" },
                            adresse: { S: "51 Rue des Tanneurs, 59000 Lille" },
                        }
                    }
                },
            ]
        }
    };

    DynamoDB.batchWriteItem(params, function (err) {
        if (err) {
            console.error("Impossible d'ajouter les restaurants", err);
        } else {
            console.log(`Tous les restaurants ont été ajoutés`);
        }
    });
}

function addRestaurant(event, context) {
    const params = {
        TableName: "Restaurants",
        Item: {
            uid: { S: event.name },
            name: { S: event.name },
            typeRestaurant: { S: event.typeRestaurant },
            adresse: { S: event.adresse },
        },
    };

    DynamoDB.putItem(params, function (err) {
        if (err) {
            console.error("Impossible d'ajouter le restaurant", err);
        } else {
            console.log(`Le ${event.typeRestaurant} ${event.name} situé le ${event.adresse} a été ajouté`);
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

    DynamoDB.putItem(params, function (err) {
        if (err) {
            console.error("Impossible de trouver le film", err);
        } else {
            console.log(`Le nom du restaurant ${event.uid} a bien été mis à jour avec le nom ${event.name}`);
        }
    });
}

function getRestaurantByType(event) {

    docClient.scan({
        TableName: "Restaurants",
        FilterExpression: "contains(typeRestaurant, :typeRestaurant)",
        ExpressionAttributeValues: { ":typeRestaurant": event.typeRestaurant }
    },
        function (err, data) {
            if (err) {
                console.error("Impossible de trouver le restaurant", err);
            } else {
                console.log(`Trouvé ${data.Count} restaurants`);
                console.log(data.Items);
                return {
                    statusCode: 200,
                    body: data.Items
                }
            }
        }
    );
}

function uuidv4() {
    return 'xxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        var r = (Math.random() * 16) | 0,
            v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

function addData(event, context) {
    let uid = uuidv4();
    const params = {
        TableName: "Datas",
        Item: {
            uid: { S: uid },
            typeRestaurant: { S: event.typeRestaurant },
        },
    };

    DynamoDB.putItem(params, function (err) {
        if (err) {
            console.error("Impossible d'ajouter la donnée", err);
        } else {
            console.log(`La donnée a été ajouté`);
        }
    });
}


module.exports = {
    createTables,
    generateRestaurants,
    addRestaurant,
    getAllRestaurants,
    getRestaurant,
    updateRestaurantName,
    getRestaurantByType,
    addData
};
const Sequelize = require('sequelize')
const db = new Sequelize('postgres://localhost/dealership', {
  logging: false
})

const faker = require('faker')
const { STRING, UUID, UUIDV4, INTEGER, DATEONLY } = require('sequelize')
const { string } = require('prop-types')


const Dealer = db.define('dealer', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  }, 
  name: {
    type: STRING,
    allowNull: false,
  },
  address: {
    type: STRING
  },
  inventoryAmount: {
    type: INTEGER
  }
})

const Car = db.define('car', {
  brand: {
    type: STRING,
    allowNull: false
  }, 
  model: {
    type: STRING,
    allowNull: false
  },
  type: {
    type: STRING,
    allowNull: false
  }, 
  price: {
    type: INTEGER,
    allowNull: false
  }
})

const Client = db.define('client', {
  name: STRING,
  address: STRING,
  age: INTEGER,
  email: {
    isEmail: true
  }, 
  purchaseDate: DATEONLY
})

Car.belongsTo(Dealer)
Car.belongsTo(Client)
Client.belongsTo(Dealer)

Client.hasMany(Car)
Dealer.hasMany(Car)
Dealer.hasMany(Client)


const syncAndSeed = async() =>{
  await db.sync( { force: true } );

  const carvana = await Dealer.create({
    name: 'FOREIGNS',
    address: faker.address(),
    inventoryAmount: 10
  })

  const [mcLaren, saleen, ferrari, porsche, mercedes, maserati, 
    koenigsegg, lamborghini, astonMartin, bugatti] = await Promise.all([
      Car.create({ brand: 'McLaren', model: 'McLaren P1', type: 'Supercar', price: 100000 }),
      Car.create({ brand: 'Saleen', model: 'Saleen S7', type: 'Supercar', price: 200000 }),
      Car.create({ brand: 'Ferrari', model: 'LaFerrari', type: 'Supercar', price: 3000000 }),
      Car.create({ brand: 'Porsche', model: '918 Spyder', type: 'Supercar', price: 400000 }),
      Car.create({ brand: 'Mercedes-Benz', model: 'SLR', type: 'Supercar', price: 150000 }),
      Car.create({ brand: 'maserati', model: 'MC12', type: 'Supercar', price: 250000 }),
      Car.create({ brand: 'Koenigsegg', model: 'Regera', type: 'Supercar', price: 1000000 }),
      Car.create({ brand: 'Lamborghini', model: 'Reventon', type: 'Supercar', price: 350000 }),
      Car.create({ brand: 'Aston Martin', model: 'One-77', type: 'Supercar', price: 400000 }),
      Car.create({ brand: 'Bugatti', model: 'Veyron Super Sport', type: 'Supercar', price: 200000 }),
    ])
    for (let i = 0; i < 10; i++){
      const newClient = await Client.create({
        name: faker.name.findName(),
        age: faker.age(),
        address: faker.address(),
        email: faker.email(),
        purchaseDate: faker.date.past(),
      })
    }
}

module.exports = {
  syncAndSeed, 
  models: {
    Dealer, 
    Car, 
    Client
  }
}
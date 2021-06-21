const Sequelize = require('sequelize')
const db = new Sequelize('postgres://localhost/dealership',{
  logging: false
} )

const faker = require('faker')
const { STRING, UUID, UUIDV4, INTEGER, DATEONLY } = require('sequelize')


const Dealer = db.define('dealer', {
  name: {
    type: STRING,
    allowNull: false,
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
  }, 
})

const Client = db.define('client', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },
  name: STRING,
  age: INTEGER,
  email: {
    type: STRING,
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
  // await db.sync( { force: true } );

  const foreigns = await Dealer.create({
    name: 'FOREIGNS',
    address: faker.address.city(),
    inventoryAmount: 10
  })
  const exotics = await Dealer.create({
    name: 'Exotics',
    address: '100 Park Ave',
    inventoryAmount: 10
  })

  const [client1, client2, client3, client4]  = await Promise.all([
    Client.create({name: faker.name.findName(), age: (18 + Math.floor(Math.random()*(55-18))), email: faker.internet.email(), purchaseDate: faker.date.past(), dealerId: (1 + Math.floor(Math.random()*(3-1)))  }),
    Client.create({name: faker.name.findName(), age: (18 + Math.floor(Math.random()*(55-18))), email: faker.internet.email(), purchaseDate: faker.date.past(), dealerId: (1 + Math.floor(Math.random()*(3-1)))  }),
    Client.create({name: faker.name.findName(), age: (18 + Math.floor(Math.random()*(55-18))), email: faker.internet.email(), purchaseDate: faker.date.past(), dealerId: (1 + Math.floor(Math.random()*(3-1)))  }),
    Client.create({name: faker.name.findName(), age: (18 + Math.floor(Math.random()*(55-18))), email: faker.internet.email(), purchaseDate: faker.date.past(), dealerId: (1 + Math.floor(Math.random()*(3-1)))  }),
  ]) 

  const [mcLaren, saleen, ferrari, porsche, mercedes, maserati, 
    koenigsegg, lamborghini, astonMartin, bugatti] = await Promise.all([
      Car.create({ brand: 'McLaren', model: 'McLaren P1', type: 'Supercar', price: 100000,  dealerId: 1, clientId: client1.id}),
      Car.create({ brand: 'Saleen', model: 'Saleen S7', type: 'Supercar', price: 200000, dealerId: 1, clientId: client2.id}),
      Car.create({ brand: 'Ferrari', model: 'LaFerrari', type: 'Supercar', price: 3000000, dealerId: 1, clientId: client3.id}),
      Car.create({ brand: 'Porsche', model: '918 Spyder', type: 'Supercar', price: 400000, dealerId: 1, clientId: client4.id}),
      Car.create({ brand: 'Mercedes-Benz', model: 'SLR', type: 'Supercar', price: 150000, dealerId: 1, clientId: client4.id }),
      Car.create({ brand: 'maserati', model: 'MC12', type: 'Supercar', price: 250000, dealerId: 1, clientId: client1.id}),
      Car.create({ brand: 'Koenigsegg', model: 'Regera', type: 'Supercar', price: 1000000, dealerId: 1, clientId: client2.id}),
      Car.create({ brand: 'Lamborghini', model: 'Reventon', type: 'Supercar', price: 350000, dealerId: 1, clientId: client3.id }),
      Car.create({ brand: 'Aston Martin', model: 'One-77', type: 'Supercar', price: 400000, dealerId: 1, clientId: client3.id }),
      Car.create({ brand: 'Bugatti', model: 'Veyron Super Sport', type: 'Supercar', price: 200000, dealerId: 1, clientId: client3.id}),
    ])

    

    // for (let i = 0; i < 10; i++){
    //   const newClient = await Client.create({
    //     name: faker.name.findName(),
    //     age: (18 + Math.floor(Math.random()*(55-18))),
    //     email: faker.internet.email(),
    //     purchaseDate: faker.date.past(),
    //     dealerId: (1 + Math.floor(Math.random()*(3-1)))
    //   })
    // }
}

module.exports = {
  syncAndSeed, 
  db,
  models: {
    Dealer, 
    Car, 
    Client
  }
}
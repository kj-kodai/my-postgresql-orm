import { AppDataSource } from "./data-source"
import { People, User, Customer, Invoice } from "./entity/User"
import { users, customers, revenue, invoices } from './migration/placeholder-data';
import bcrypt = require('bcrypt');

AppDataSource.initialize().then(async () => {

    console.log("Inserting a new user into the database...")
    // const user = new User()
    // user.name = "KJ Test"
    // user.email = "test@test.com"
    // user.password = "1234"
    // await AppDataSource.manager.save(user)
    // console.log("Saved a new user with id: " + user.id)

    // console.log("Loading users from the database...")
    // const users = await AppDataSource.manager.find(User)
    // console.log("Loaded users: ", users)

    // // Clean up existing seed users.
    // const usersToBeDeleted = await AppDataSource.manager.find(User);
    // await AppDataSource.manager.remove(usersToBeDeleted);

    // // Seed users.
    // const insertedUsers = await Promise.all(
    //   users.map(async (user) => {
    //     const hashedPassword = await bcrypt.hash(user.password, 10);
    //     const mappedUser = new User();
    //     mappedUser.name = user.name;
    //     mappedUser.email = user.email;
    //     mappedUser.password = hashedPassword;
    //     await AppDataSource.manager.save(mappedUser);
    //   }),
    // );

    // console.log(`Seeded ${insertedUsers.length} users`);

    // await seedUsers();
    // await seedCustomers();

    await seedInvoices();

    // console.log("Here you can setup and run express / fastify / any other framework.")

    // const person = new People();
    // person.firstName = "Kyle";
    // person.lastName = "Smith";
    // person.age = 30;
    // await AppDataSource.manager.save(person);
    // console.log("Saved a new person with id: " + person.id);

}).catch(error => console.log(error))


async function seedUsers() {
  const usersToBeDeleted = await AppDataSource.manager.find(User);
  await AppDataSource.manager.remove(usersToBeDeleted);

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const mappedUser = new User();
      mappedUser.name = user.name;
      mappedUser.email = user.email;
      mappedUser.password = hashedPassword;
      await AppDataSource.manager.save(mappedUser);
    }),
  );

  console.log(`Seeded ${insertedUsers.length} users`);
}

async function seedCustomers() {
    const customersToBeDeleted = await AppDataSource.manager.find(Customer);
    await AppDataSource.manager.remove(customersToBeDeleted);

    const insertedCustomers = await Promise.all(
      customers.map(async (customer) => {
        const mappedCustomer = new Customer();
        mappedCustomer.name = customer.name;
        mappedCustomer.email = customer.email;
        mappedCustomer.image_url = customer.image_url;
        await AppDataSource.manager.save(mappedCustomer);
      }),
    );

    console.log(`Seeded ${insertedCustomers.length} customers`);
}

async function seedInvoices() {
    const invoicesToBeDeleted = await AppDataSource.manager.find(Invoice);
    await AppDataSource.manager.remove(invoicesToBeDeleted);

    const customers = await AppDataSource.manager.find(Customer);
    // console.log("Customers: ", customers);

    const insertedInvoices = await Promise.all(
      invoices.map(async (invoice) => {
        const mappedInvoice = new Invoice();
        
        // console.log('OG Id:', invoice.customer_id);
        // Very hacky!
        // const goal = parseInt(invoice.customer_id);
        // var customer = customers.reduce(function(prev, curr) {
        //     return (Math.abs(parseInt(curr.id) - goal) < Math.abs(parseInt(prev.id) - goal) ? curr : prev);
        // });

        // Attempted to randomize!
        const customer = customers[Math.floor(Math.random() * customers.length)];
        // mappedInvoice.customer = customer;
        mappedInvoice.customer_id = customer.id;
        mappedInvoice.amount = invoice.amount;
        mappedInvoice.status = invoice.status;
        mappedInvoice.date = invoice.date;
        console.log('Invoice: ', mappedInvoice.customer_id);
        await AppDataSource.manager.save(mappedInvoice);
      }),
    );

    console.log(`Seeded ${insertedInvoices.length} invoices`);
}
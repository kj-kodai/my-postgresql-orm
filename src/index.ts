import { AppDataSource } from "./data-source"
import { People, User } from "./entity/User"

AppDataSource.initialize().then(async () => {

    console.log("Inserting a new user into the database...")
    const user = new User()
    user.firstName = "Timber"
    user.lastName = "Saw"
    user.age = 25
    await AppDataSource.manager.save(user)
    console.log("Saved a new user with id: " + user.id)

    console.log("Loading users from the database...")
    const users = await AppDataSource.manager.find(User)
    console.log("Loaded users: ", users)

    console.log("Here you can setup and run express / fastify / any other framework.")

    const person = new People();
    person.firstName = "Kyle";
    person.lastName = "Smith";
    person.age = 30;
    await AppDataSource.manager.save(person);
    console.log("Saved a new person with id: " + person.id);

}).catch(error => console.log(error))

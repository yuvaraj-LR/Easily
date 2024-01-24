export default class UserModel {
    constructor(id, name, email, password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    static getAll() {
        return users;
    }

    static addNewUser(name, email, password) {
        let newUser = new UserModel(users.length + 1, name, email, password);

        users.push(newUser);
    }

    static loginUser(email, password) {
        let status = false;
        users.forEach(element => {
            if(element.email == email && element.password == password) {
                status = true;
            }
        });

        return status;
    }
}

let users = [new UserModel(1, "demo", "demo@demo.com", "1234")];
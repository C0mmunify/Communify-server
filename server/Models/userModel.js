const db = require('../dbConfig')

class User {

    constructor(data){
        this.id = data.id
        this.name = data.name
        this.email = data.email
        this.phone = data.phone
        this.age = data.age
        this.address = data.address
        this.council = data.council
        this.admin = data.admin
    }
    
    static findById (id) {
        return new Promise (async (resolve, reject) => {
            try {
                let userData = await db.query(`SELECT * FROM users WHERE id = $1;`, [ id ]); 
                let user = new User(userData.rows[0]);
                resolve (user);
            } catch (err) {
                reject('User not found');
            }
        });
    }
}

module.exports = User;
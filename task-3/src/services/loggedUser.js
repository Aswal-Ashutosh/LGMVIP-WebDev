export default class LoggedUser{
    static #email;
    static #userExist;
    constructor(){
        throw Error('Can\'t instantiate LoggedUser');
    }

    static setUser(email){
        this.#email = email;
        this.#userExist = true;
    }

    static resetUser(){
        this.#email = null;
        this.#userExist = true;
    }

    static get userExist(){
        return this.#userExist;
    }

    static get email(){
        return this.#email;
    }
}
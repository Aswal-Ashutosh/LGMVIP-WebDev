class LoggedUser{
    #email;
    #userExist;

    constructor(){
        this.#email = null;
        this.#userExist = false;
    }

    setUser(email){
        this.#email = email;
        this.#userExist = true;
    }

    resetUser(){
        this.#email = null;
        this.#userExist = true;
    }

    get userExist(){
        return this.#userExist;
    }

    get email(){
        return this.#email;
    }
}

export  const loggedUser = new LoggedUser();
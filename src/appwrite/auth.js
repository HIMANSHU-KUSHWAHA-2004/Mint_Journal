import config from "../config/config";
import { Client, ID, Account } from "appwrite";

export class Authservice {
    client = new Client()
    account;
    
    constructor() {
        this.client.setEndpoint(config.appwriteUrl).setProject(config.appwriteProjectId)
        this.account = new Account(this.client)
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)

            if (userAccount) {
                return await this.login({ email, password })
            }

            return null
        } catch (error) {
            throw error
        }

    }

    async login({email,password}){
        try {
            return await this.account.createEmailPasswordSession({email,password})
        } catch (error) {
            throw error
        }
    }

    async currentUser(){

        try {
            return await this.account.get()
        } catch (error) {
            console.log("Error not the current user",error)
            return null
        }
    }

    async logout(){
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            console.log("Error not the current user",error)
        }
    }
}

const authservice_obj = new Authservice()
export default authservice_obj

import config from "../config/config";
import { Client, TablesDB, Storage, Query, ID } from "appwrite";

export class Database_Service{
    client = new Client()
    database;
    bucket;
    constructor(){
        this.client.setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId)

        this.database = new TablesDB(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            return await this.database.createRow(
                config.appwriteDatabaseId,
                config.appwriteTableId,
                slug,{
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
            
        } catch (error) {
            console.error("Failed to create post:", error);
            throw error;
        }
    }

    async updatePost(slug,{title,content,featuredImage,status}){
        try {
            return await this.database.updateRow(
                config.appwriteDatabaseId,
                config.appwriteTableId,
                slug,{
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
            
        } catch (error) {
            console.error("Failed to update post:", error);
            throw error;
        }
    }

    async deletePost(slug){
        try {
            await this.database.deleteRow(
                config.appwriteDatabaseId,
                config.appwriteTableId,
                slug
            )
            return true;

        } catch (error) {
            console.error("Failed to delete post:", error);
            throw error;
        }
    }

    async getPost(slug){
        try {
            return await this.database.getRow(
                config.appwriteDatabaseId,
                config.appwriteTableId,
                slug
            )
            return true;
            
        } catch (error) {
            console.error("Failed to load post:", error);
            throw error;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
             return await this.database.listRows(
                config.appwriteDatabaseId,
                config.appwriteTableId,
                queries
            )
            
        } catch (error) {
            console.error("Failed to load posts:", error);
            throw error;
        }
    }

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
            config.appwriteBucketId
            ,ID.unique(),
            file)

        } catch (error) {
            console.error("Failed to upload file:", error);
            throw error;
        }
    } 

    async deleteFile(fileid){
        try {
            await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileid
            )
            return true;
        } catch (error) {
            console.error("Failed to delete file:", error);
            throw error;
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFileView(
            config.appwriteBucketId,
            fileId
        )
    }
}

const Db_service = new Database_Service();
export default Db_service

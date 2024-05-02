import DBConfig from './../configs/db-config.js';
import pkg from 'pg';
const { Client, Pool } = pkg;

export default class ProvinceRepository{
    getAllSync = async () => {
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = 'SELECT * FROM provinces';
            const result = await client.query(sql);
            await client.end();
            returnArray = result.rows;
        }
        catch (error){
            console.log(error);
        }
        return returnArray;
    }
    
    getByIdSync = async (id) => {

    }
    createAsync = async (entity) => {
        
    }
    updateAsync = async (entity) => {
        
    }
    deleteByIdAsync = async (id) => {
        
    }
}
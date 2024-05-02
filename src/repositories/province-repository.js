import DBConfig from './../configs/db-config.js';
import pkg from 'pg';
import res from 'express/lib/response.js';
import { rows } from 'pg/lib/defaults.js';
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
        let returnObject = null;
        try {
            const client = await this.getDBClient();
            const sql = 'SELECT * from provinces WHERE id=$1';
            const values = [id];
            const result = await client.query(sql, values);
            returnObject = result.rows[0];
        }
        catch (error){
            console.logError(error);
        }
        return returnObject;
    }
    createAsync = async (entity) => {
        let rowsAffected = 0;
        try {
            const client = new Client(config);
            await client.connect();
            const sql = `
                INSERT INTO provinces
                    (name, full_name, latitute, longitude, display_order)
                VALUES
                    ($1, $2, $3, $4, $5)
            `;
            const values = [entity.name, entity.full_name, entity.latitude, entity.longitude, entity.display_order];
            const result = await client.query(sql, values);
            rowsAffected = result.rowCount;
        }
        catch (error){
            console.logError(error);
        }
        await client.end();
        return rowsAffected;
    }
    updateAsync = async (entity) => {
        let rowsAffected = 0;
        try {
            const client = new Client(config);
            await client.connect();
            const sql = `
                UPDATE provinces
                    (name, full_name, latitute, longitude, display_order)
                VALUES
                    ($1, $2, $3, $4, $5)
            `;
            const values = [entity.name, entity.full_name, entity.latitude, entity.longitude, entity.display_order];
            const result = await client.query(sql, values);
            rowsAffected = result.rowCount;
        }
        catch (error){
            console.logError(error);
        }
        await client.end();
        return rowsAffected;
    }
    deleteByIdAsync = async (id) => {
        let rowsAffected = 0;
        try {
            const client = await this.getDBClient();
            const sql = 'DELETE from provinces WHERE id=$1';
            const values = [id];
            const result = await client.query(sql, values);
            rowsAffected = result.rowCount;
        }
        catch (error){
            console.logError(error);
        }
        return rowsAffected;
    }
}
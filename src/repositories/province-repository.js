import DBConfig from './../configs/db-config.js';
import pkg from 'pg';
const { Client } = pkg;

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
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = 'SELECT * from provinces WHERE id=$1';
            const values = [id];
            const result = await client.query(sql, values);
            await client.end();
            returnObject = result.rows[0];
        }
        catch (error){
            console.log(error);
        }
        return returnObject;
    }
    createAsync = async (entity) => {
        let rowsAffected = 0;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `
                INSERT INTO provinces
                    (name, full_name, latitude, longitude, display_order)
                VALUES
                    ($1, $2, $3, $4, $5)
            `;
            const values = [entity.name, entity.full_name, entity.latitude, entity.longitude, entity.display_order];
            const result = await client.query(sql, values);
            await client.end();
            rowsAffected = result.rowCount;
        }
        catch (error){
            console.log(error);
        }
        await client.end();
        return rowsAffected;
    }
    updateAsync = async (entity) => {
        let rowsAffected = 0;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `
                UPDATE provinces
                SET name = $1, full_name = $2, latitude = $3, longitude = $4, display_order = $5
                WHERE id = $6
            `;
            const values = [entity.name, entity.full_name, entity.latitude, entity.longitude, entity.display_order, entity.id];
            const result = await client.query(sql, values);
            await client.end();
            rowsAffected = result.rowCount;
        }
        catch (error){
            console.log(error);
        }
        await client.end();
        return rowsAffected;
    }
    deleteByIdAsync = async (id) => {
        let rowsAffected = 0;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const locationsSql = 'SELECT id FROM locations where id_province = $1';
            const values = [id];
            const locationResult = await client.query(locationsSql, values);
            for (const locationRow of locationResult.rows){
                const locationId = locationRow.id;
                const deleteLocationQuery = `DELETE FROM locations WHERE id = $1`;
                const deleteLocationValues = [locationId];
                await client.query(deleteLocationQuery, deleteLocationValues);
            }
            const deleteSql = 'DELETE FROM provinces WHERE id = $1';
            const deleteValues = [id];
            const deleteResult = await client.query(deleteSql, deleteValues);
            await client.end();
            rowsAffected = deleteResult.rowCount;
        }
        catch (error){
            console.log(error);
        }
        return rowsAffected;
    }
}
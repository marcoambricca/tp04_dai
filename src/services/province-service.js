import ProvinceRepository from '../repositories/province-repository.js';

export default class ProvinceService{
    getAllSync = async () => {
        const repo = new ProvinceRepository();
        const returnArray = await repo.getAllSync();
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
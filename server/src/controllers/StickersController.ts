import { Request, Response } from 'express';
import knex from '../database/connection';

class StickersController {

    async index(request: Request, response: Response) {

        const stickers = await knex('stickers').select('*');
    
        const serializesStickers = stickers.map(sticker => {
            return {
                id: sticker.id,
                name: sticker.name,
                description: sticker.description,
                rarity: sticker.rarity,
                book_id: sticker.book_id,
                image_url: `http://localhost:3333/uploads/${sticker.image}`
            };
        });
    
        return response.json(serializesStickers);

    }

    async show(request: Request, response: Response) {

        const { id } = request.params;

        const sticker = await knex('stickers').where('id', id).first();

        if(!sticker) {
            return response.status(400).json({ message: 'Sticker not found.' });
        }

        const stickers = await knex('stickers')
        .where('id', id)
        .select('*');

        const serializesStickers = stickers.map(sticker => {
            return {
                id: sticker.id,
                name: sticker.name,
                description: sticker.description,
                rarity: sticker.rarity,
                book_id: sticker.book_id,
                image_url: `http://localhost:3333/uploads/${sticker.image}`
            };
        });        

        return response.json(serializesStickers);

    }
    
    async create(request: Request, response: Response) {

        const {
            name,
            description,
            rarity,
            book_id,
            image
        } = request.body;

        const sticker = {
            name,
            description,
            rarity,
            book_id,
            image
        };

        const stickerId = await knex('stickers').insert(sticker)
    
        return response.json(stickerId);

    }    

}

export default StickersController;
import { Request, Response } from 'express';
import knex from '../database/connection';

class PupilStickersController {

    async index(request: Request, response: Response) {

        const { pupil_id, sticker_id } = request.query;

        const pupilStickers = await knex('pupil_stickers')
        .where('pupil_id', String(pupil_id))
        .where('sticker_id', String(sticker_id))
        .distinct()
        .select('*');
    
        const serializesPupilStickers = pupilStickers.map(pupilSticker => {
            return {
                id: pupilSticker.id,
                quantity: pupilSticker.quantity,
                pupil_id: pupilSticker.pupil_id,
                sticker_id: pupilSticker.sticker_id
            };
        });
    
        return response.json(serializesPupilStickers);

    }

    async show(request: Request, response: Response) {

        const { id } = request.params;

        const pupilSticker = await knex('pupil_stickers').where('id', id).first();

        if(!pupilSticker) {
            return response.status(400).json({ message: 'Pupil Sticker not found.' });
        }

        const pupilStickers = await knex('pupil_stickers')
        .where('id', id)
        .select('*');

        const serializesPupilStickers = pupilStickers.map(pupilSticker => {
            return {
                id: pupilSticker.id,
                quantity: pupilSticker.quantity,
                pupil_id: pupilSticker.pupil_id,
                sticker_id: pupilSticker.sticker_id
            };
        });        

        return response.json(serializesPupilStickers);

    }
    
    async create(request: Request, response: Response) {

        const {
            quantity,
            pupil_id,
            sticker_id
        } = request.body;

        const pupilSticker = {
            quantity,
            pupil_id,
            sticker_id
        };

        const pupilStickerId = await knex('pupil_stickers').insert(pupilSticker)
    
        return response.json(pupilStickerId);

    }    

}

export default PupilStickersController;
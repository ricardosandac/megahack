import { Request, Response } from 'express';
import knex from '../database/connection';

class ProfileController {

    async index(request: Request, response: Response) {

        const pupil = await knex('pupils').select('*');
    
        const serializesPupils = pupil.map(pupil => {
            return {
                id: pupil.id,
                first_name: pupil.first_name,
                last_name: pupil.last_name,
                period: pupil.period,
                class: pupil.class,
                photo_url: `http://localhost:3333/uploads/${pupil.photo}`
            };
        });
    
        return response.json(serializesPupils);

    }

    async show(request: Request, response: Response) {

        const { id } = request.params;

        const pupil = await knex('pupils').where('id', id).first();

        if(!pupil) {
            return response.status(400).json({ message: 'Pupil not found.' });
        }

        const pupils = await knex('pupils')
        .where('id', id)
        .select('*');

        const serializesPupils = pupils.map(pupil => {
            return {
                id: pupil.id,
                first_name: pupil.first_name,
                last_name: pupil.last_name,
                period: pupil.period,
                class: pupil.class,
                photo_url: `http://localhost:3333/uploads/${pupil.photo}`
            };
        });        

        return response.json(serializesPupils);

    }
    
    async create(request: Request, response: Response) {

        const {
            first_name,
            last_name,
            birth_date,
            email,
            phone,
            mobile,
            photo,
            period,
            classroom
        } = request.body;

        const pupil = {
            first_name,
            last_name,
            birth_date,
            email,
            phone,
            mobile,
            photo,
            period,
            classroom
        };

        const pupilId = await knex('pupils').insert(pupil)
    
        return response.json(pupilId);

    }    

}

export default ProfileController;
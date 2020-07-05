import { Request, Response } from 'express';
import knex from '../database/connection';

class PupilResponsesController {

    async index(request: Request, response: Response) {

        const { pupil_id, question_id } = request.query;

        const pupilResponses = await knex('pupil_responses')
        .where('pupil_id', String(pupil_id))
        .where('question_id', String(question_id))
        .distinct()
        .select('*');
    
        const serializesPupilResponses = pupilResponses.map(pupilResponse => {
            return {
                id: pupilResponse.id,
                selected_option: pupilResponse.selected_option,
                is_correct: pupilResponse.is_correct,
                pupil_id: pupilResponse.pupil_id,
                question_id: pupilResponse.question_id
            };
        });
    
        return response.json(serializesPupilResponses);

    }

    async show(request: Request, response: Response) {

        const { id } = request.params;

        const pupilResponse = await knex('pupil_responses').where('id', id).first();

        if(!pupilResponse) {
            return response.status(400).json({ message: 'Pupil Response not found.' });
        }

        const pupilResponses = await knex('pupil_responses')
        .where('id', id)
        .select('*');

        const serializesPupilResponses = pupilResponses.map(pupilResponse => {
            return {
                id: pupilResponse.id,
                selected_option: pupilResponse.selected_option,
                is_correct: pupilResponse.is_correct,
                pupil_id: pupilResponse.pupil_id,
                question_id: pupilResponse.question_id
            };
        });        

        return response.json(serializesPupilResponses);

    }
    
    async create(request: Request, response: Response) {

        const {
            selected_option,
            is_correct,
            pupil_id,
            question_id
        } = request.body;

        const pupilResponse = {
            selected_option,
            is_correct,
            pupil_id,
            question_id
        };

        const pupilResponseId = await knex('pupil_responses').insert(pupilResponse)
    
        return response.json(pupilResponseId);

    }    

}

export default PupilResponsesController;
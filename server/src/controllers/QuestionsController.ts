import { Request, Response } from 'express';
import knex from '../database/connection';

class QuestionsController {

    async index(request: Request, response: Response) {

        const questions = await knex('questions').select('*');
    
        const serializesQuestions = questions.map(question => {
            return {
                id: question.id,
                text: question.text,
                option_one: question.option_one,
                option_two: question.option_two,
                option_three: question.option_three,
                option_four: question.option_four,
                answer: question.answer,
                book_id: question.book_id
            };
        });
    
        return response.json(serializesQuestions);

    }

    async show(request: Request, response: Response) {

        const { id } = request.params;

        const question = await knex('questions').where('id', id).first();

        if(!question) {
            return response.status(400).json({ message: 'Question not found.' });
        }

        const questions = await knex('questions')
        .where('id', id)
        .select('*');

        const serializesQuestions = questions.map(question => {
            return {
                id: question.id,
                text: question.text,
                option_one: question.option_one,
                option_two: question.option_two,
                option_three: question.option_three,
                option_four: question.option_four,
                answer: question.answer,
                book_id: question.book_id
            };
        });        

        return response.json(serializesQuestions);

    }
    
    async create(request: Request, response: Response) {

        const {
            text,
            option_one,
            option_two,
            option_three,
            option_four,
            answer,
            book_id
        } = request.body;

        const question = {
            text,
            option_one,
            option_two,
            option_three,
            option_four,
            answer,
            book_id
        };

        const questionId = await knex('questions').insert(question)
    
        return response.json(questionId);

    }    

}

export default QuestionsController;
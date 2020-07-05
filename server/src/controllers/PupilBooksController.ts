import { Request, Response } from 'express';
import knex from '../database/connection';

class PupilBooksController {

    async index(request: Request, response: Response) {

        const { pupil_id, book_id } = request.query;

        const pupilBooks = await knex('pupil_books')
        .where('pupil_id', String(pupil_id))
        .where('book_id', String(book_id))
        .distinct()
        .select('*');
    
        const serializesPupilBooks = pupilBooks.map(pupilBook => {
            return {
                id: pupilBook.id,
                was_read: pupilBook.was_read,           
                current_page: pupilBook.current_page,
                pupil_id: pupilBook.pupil_id,                
                book_id: pupilBook.book_id
            };
        });
    
        return response.json(serializesPupilBooks);

    }

    async show(request: Request, response: Response) {

        const { id } = request.params;

        const pupilBook = await knex('pupil_books').where('id', id).first();

        if(!pupilBook) {
            return response.status(400).json({ message: 'Pupil Book not found.' });
        }

        const pupilBooks = await knex('pupil_books')
        .where('id', id)
        .select('*');

        const serializesPupilBooks = pupilBooks.map(pupilBook => {
            return {
                id: pupilBook.id,
                was_read: pupilBook.was_read,           
                current_page: pupilBook.current_page,
                pupil_id: pupilBook.pupil_id,                
                book_id: pupilBook.book_id
            };
        });        

        return response.json(serializesPupilBooks);

    }
    
    async create(request: Request, response: Response) {

        const {
            was_read,
            current_page,
            pupil_id,
            book_id
        } = request.body;

        const pupilBook = {
            was_read,
            current_page,
            pupil_id,
            book_id
        };

        const pupilBookId = await knex('pupil_books').insert(pupilBook)
    
        return response.json(pupilBookId);

    }

}

export default PupilBooksController;
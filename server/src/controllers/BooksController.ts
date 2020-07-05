import { Request, Response } from 'express';
import knex from '../database/connection';

class BooksController {

    async index(request: Request, response: Response) {

        const books = await knex('books').select('*');
    
        const serializesBooks = books.map(book => {
            return {
                id: book.id,
                title: book.title,
                description: book.description,
                image_url: `http://192.168.0.25:3333/uploads/${book.image}`
            };
        });
    
        return response.json(serializesBooks);

    }

    async show(request: Request, response: Response) {

        const { id } = request.params;

        const book = await knex('books').where('id', id).first();

        if(!book) {
            return response.status(400).json({ message: 'Book not found.' });
        }

        const books = await knex('books')
        .where('id', id)
        .select('*');

        const serializesBooks = books.map(book => {
            return {
                id: book.id,
                title: book.title,
                description: book.description,
                image_url: `http://192.168.0.25:3333/uploads/${book.image}`
            };
        });        

        return response.json(serializesBooks);

    }
    
    async create(request: Request, response: Response) {

        const {
            title,
            description,
            image,
            isbn,
            publisher,
            publish_date,
            category,
            author
        } = request.body;

        const book = {
            title,
            description,
            image,
            isbn,
            publisher,
            publish_date,
            category,
            author
        };

        const bookId = await knex('books').insert(book)
    
        return response.json(bookId);

    }    

}

export default BooksController;
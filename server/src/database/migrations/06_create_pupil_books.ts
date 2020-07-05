import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('pupil_books', table => {
        table.increments('id').primary();
        table.boolean('was_read').notNullable();
        table.integer('current_page').notNullable();
        table.integer('pupil_id')
        .notNullable()
        .references('id')
        .inTable('pupils');                
        table.integer('book_id')
        .notNullable()
        .references('id')
        .inTable('books');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('pupil_books');
}
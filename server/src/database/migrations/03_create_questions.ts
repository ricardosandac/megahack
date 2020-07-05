import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('questions', table => {
        table.increments('id').primary();
        table.string('text').notNullable();
        table.string('option_one').notNullable();
        table.string('option_two').notNullable();
        table.string('option_three').notNullable();
        table.string('option_four').notNullable();                                
        table.string('answer').notNullable;
        table.integer('book_id')
        .notNullable()
        .references('id')
        .inTable('books');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('questions');
}
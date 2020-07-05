import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('books', table => {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.string('image').notNullable();
        table.string('isbn').notNullable();
        table.string('publisher').notNullable();
        table.date('publish_date').notNullable();
        table.string('category').notNullable();
        table.string('author').notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('books');
}
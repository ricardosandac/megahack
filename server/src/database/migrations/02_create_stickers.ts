import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('stickers', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('description');
        table.string('rarity').notNullable();
        table.string('image').notNullable();
        table.integer('book_id')
        .notNullable()
        .references('id')
        .inTable('books');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('stickers');
}
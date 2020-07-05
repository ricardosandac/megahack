import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('pupil_stickers', table => {
        table.increments('id').primary();
        table.integer('quantity').notNullable();
        table.integer('pupil_id')
        .notNullable()
        .references('id')
        .inTable('pupils');        
        table.integer('sticker_id')
        .notNullable()
        .references('id')
        .inTable('stickers');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('pupil_stickers');
}
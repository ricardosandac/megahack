import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('pupil_responses', table => {
        table.increments('id').primary();
        table.string('selected_option').notNullable();
        table.boolean('is_correct').notNullable();        
        table.integer('pupil_id')
        .notNullable()
        .references('id')
        .inTable('pupils');
        table.integer('question_id')
        .notNullable()
        .references('id')
        .inTable('questions');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('pupil_responses');
}
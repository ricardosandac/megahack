import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('pupils', table => {
        table.increments('id').primary();
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.date('birth_date').notNullable();
        table.string('email').notNullable();
        table.string('phone').notNullable();
        table.string('mobile');        
        table.string('photo');
        table.string('period').notNullable();
        table.string('classroom').notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('pupils');
}
import Knex from 'knex'

export async function seed(knex: Knex){
    await knex('items').insert([
        {title: 'Bulb', image: 'lampadas.svg'},
        {title: 'Batteries', image: 'baterias.svg'},
        {title: 'Papers and cupboard', image: 'papeis-papelao.svg'},
        {title: 'Eletronics waste', image: 'eletronicos.svg'},
        {title: 'Organics waste', image: 'organicos.svg'},
        {title: 'Kitchen oil', image: 'oleos.svg'},
    ])
}
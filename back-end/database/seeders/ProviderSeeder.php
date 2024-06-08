<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProviderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('providers')->insert([
            'user_id' => 1,
            'bio' => 'Professionnel du nettoyage expérimenté avec plus de 5 ans d\'expérience.',
            'rating' => 4.75,
            'number_of_ratings' => 20,
            'insurance_info' => 'Assuré pour la responsabilité jusqu\'à 1 000 000 $.',
            'availability' => 'Disponible du lundi au vendredi, de 9h à 17h.',
            'service_area' => 'Service dans la grande zone métropolitaine.',
            'additional_contact_info' => 'Vous pouvez également me joindre par e-mail : marouane_business@gmail.com',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('providers')->insert([
            'user_id' => 2,
            'bio' => 'Artisan qualifié avec une expertise en réparations électriques et assemblage de meubles.',
            'rating' => 4.90,
            'number_of_ratings' => 15,
            'insurance_info' => 'Entièrement assuré avec une couverture pour les dommages matériels et corporels.',
            'availability' => 'Horaire flexible, disponible les week-ends sur demande.',
            'service_area' => 'Service les quartiers dans un rayon de 20 miles.',
            'additional_contact_info' => 'Contactez-moi par téléphone : +212666653591',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}

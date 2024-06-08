<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categories = [
            [
                'name' => 'Services de nettoyage',
                'description' => 'Services de nettoyage professionnels pour les maisons et les bureaux.',
                'image_url' => '/images/categories/cleaning-services.png',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Maintenance et Réparations',
                'description' => 'Services de maintenance et de réparation experts pour vos appareils et équipements domestiques.',
                'image_url' => '/images/categories/maintenance-and-repairs.png',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Jardinage et Aménagement Paysager',
                'description' => 'Transformez votre espace extérieur avec des services professionnels de jardinage et d\'aménagement paysager.',
                'image_url' => '/images/categories/gardening-and-landscaping.png',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Contrôle des Pestes',
                'description' => 'Solutions efficaces de contrôle des pestes pour maintenir votre domicile sans parasites.',
                'image_url' => '/images/categories/pest-control.png',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        foreach ($categories as $category) {
            DB::table('categories')->insert($category);
        }
    }
}

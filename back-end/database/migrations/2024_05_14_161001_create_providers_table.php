<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('providers', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->unique();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->text('bio')->nullable();
            $table->decimal('rating', 3, 2)->default(0.00);
            $table->unsignedInteger('number_of_ratings')->default(0);
            $table->text('insurance_info')->nullable();
            $table->string('availability')->nullable();
            $table->text('service_area')->nullable();
            $table->text('additional_contact_info')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('providers');
    }
};

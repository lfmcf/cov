<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
           $table->bigIncrements('id');
            $table->string('nom');
            $table->string('prenom');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->timestamp('dateDeNaissance')->nullable();
            $table->string('genre')->nullable();
            $table->string('avatar')->nullable();
            $table->string('tel')->nullable();
            $table->string('adress')->nullable();
            $table->mediumText('about')->nullable();
            $table->integer('cigarettes')->default('2');
            $table->integer('animaux')->default('2');
            $table->integer('music')->default('2');
            $table->string('carName')->nullable();
            $table->string('carModel')->nullable();
            $table->string('carPic')->nullable();
            $table->rememberToken();
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
        Schema::dropIfExists('users');
    }
}

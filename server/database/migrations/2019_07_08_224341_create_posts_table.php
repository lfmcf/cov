<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePostsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('from');
            $table->string('fromcity');
            $table->string('to');
            $table->string('tocity');
            $table->string('passBy')->nullable();
            $table->string('passbycity')->nullable();
            $table->dateTime('travelTime');
            $table->float('price');
            $table->float('PassByPrice')->nullable();
            $table->float('firstDuration');
            $table->float('secondDuration');
            $table->integer('nbrplace');
            $table->mediumText('description');
            $table->integer('user_id');
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
        Schema::dropIfExists('posts');
    }
}

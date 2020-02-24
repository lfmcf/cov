<?php

use App\Post;
use Illuminate\Support\Str;
use Faker\Generator as Faker;

$factory->define(Post::class, function (Faker $faker) {
	return [
        'from' => 'Rabat, Maroc',
        'fromcity' => 'Rabat',
        'to' => 'Fès, Maroc',
        'tocity' => 'Fès',
        'passBy' => 'Meknès, Maroc',
        'travelTime' => now(),
        'price' => $faker->randomNumber($nbDigits = 3),
        'PassByPrice' => $faker->randomNumber($nbDigits = 3),
        'nbrplace' => $faker->randomNumber($nbDigits = 1),
        'description' => Str::random(1000),
    ];
});

?>
<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});



Route::post('register', 'AuthController@register');
Route::post('login', 'AuthController@login');

Route::middleware('auth:api')->group(function () {
    Route::get('currentUser', 'AuthController@getAuthenticatedUser');
    Route::post('post', 'PostController@creatPost');
    Route::get('conversations', 'MessageController@getConversationList');
    Route::post('message', 'MessageController@sendmessage');
});


Route::post('getMessage', 'MessageController@getMessage');
Route::post('insertmessage', 'MessageController@insertmessage');
Route::post('markread', 'MessageStatusController@markread');
Route::get('unread', 'MessageStatusController@show');

Route::get('auth/redirect/facebook', 'AuthController@redirectToProvider');
Route::post('facebook/callback', 'AuthController@handleProviderCallback');

Route::get('email/verify/{id}', 'VerificationApiController@verify')->name('verificationapi.verify');
Route::get('email/resend', 'VerificationApiController@resend')->name('verificationapi.resend');

Route::post('checkemail', 'AuthController@checkEmail');

Route::post('search', 'PostController@search');

Route::get("all_posts", "PostController@all_posts");



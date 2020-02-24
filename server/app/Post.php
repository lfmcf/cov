<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $guarded = [];

    public function users()
    {
    	return $this->belongsTo(User::class, 'user_id');
    }
}

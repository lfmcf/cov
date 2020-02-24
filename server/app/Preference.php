<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Preference extends Model
{
    protected $guarded = [];

    public function preferences()
    {
        return $this->belongsTo(User::class, 'id');
    }
}

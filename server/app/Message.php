<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $fillable = [
    	'from', 'fromName', 'to', 'toName', 'message'
    ];
}

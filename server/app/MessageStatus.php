<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MessageStatus extends Model
{
    protected $fillable = [
    	'message_id', 'conversation_id', 'status', 'user_id'
    ];
}

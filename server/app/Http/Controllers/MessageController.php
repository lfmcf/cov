<?php

namespace App\Http\Controllers;

use App\Message;
use App\Events\SendMessage;
use Illuminate\Http\Request;
use Auth;
use App\Conversation;
use App\ConversationReply;
use Illuminate\Support\Facades\DB;
use App\User;
class MessageController extends Controller
{
    public function sendmessage(Request $request)
    {
        $fromName = $request->json()->get('fromName');
    	$message = new Message([
    		'from' => $request->json()->get('from'),
            'fromName' => $request->json()->get('fromName'),
    		'to' => $request->json()->get('to'),
            'toName' => $request->json()->get('toName'),
    		'message' => $request->json()->get('message')
    	]);

    	$event = new SendMessage($message);
    	broadcast($event)->toOthers();

        $message->save();

    	return response()->json(compact('message'), 200);
    	
    }

    public function getMessages(Request $request)
    {
        $id = Auth::id();
        $messages = Message::where('to', $id)->get();
        return response()->json(["message" => $messages], 200);
    }

    public function getConversationList(Request $request)
    {
        $id = Auth::id();
        $conlist = DB::raw("SELECT DISTINCT u.id, u.avatar, c.c_id,c.created_at, u.nom, u.email FROM conversations c, users u, conversation_replies r
            WHERE CASE 
            WHEN c.user_one = '$id'
            THEN c.user_two = u.id
            WHEN c.user_two = '$id'
            THEN c.user_one= u.id
            END AND c.c_id=r.c_id
            AND ( c.user_one ='$id' OR c.user_two ='$id' )
            Order BY c.c_id DESC");
        $res = DB::select( DB::raw($conlist));
        return response()->json($res, 200);
    }

    public function getMessage(Request $request)
    {
        $c_id = $request->json()->get('val');
        $messages = DB::raw("SELECT R.cr_id ,R.reply , U.id as user_id, U.nom, U.avatar, U.email, R.created_at FROM users U, conversation_replies R WHERE R.user_id=U.id and R.c_id='$c_id' ORDER BY R.cr_id ASC");
        $res = DB::select( DB::raw($messages));
        if($res){
            $to_id = Conversation::where("c_id", $c_id)->first();
            //$to_id = $to_id->user_two;
        }
        return response()->json(["messages" => $res, "to_id" => $to_id], 200);
    }

    public function insertmessage(Request $request)
    {
        
        $from = $request->json()->get('from');
        $to = $request->json()->get('to');
        $reply = $request->json()->get('message');
        $conversation = Conversation::where('user_one', $from)->where('user_two', $to)
        ->orWhere('user_one', $to)->where('user_two', $from)->first();
        $c_id = $conversation->c_id;
        
        if($c_id){
            $con = new ConversationReply([
                'reply' => $reply,
                'user_id' => $from,
                'c_id' => $c_id,
            ]);
            $con->save();
        }
        $user = User::where('id', $from)->get(['avatar']);
        $event = new SendMessage($con, $conversation);
        broadcast($event);
        $con->save();
        return response()->json(["con" => $user], 200);
    }
}

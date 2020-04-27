<?php

namespace App\Http\Controllers;

use App\Post;
use Auth;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function creatPost(Request $request)
    {
    	
    	$post = Post::create([
    		'from' => $request->json()->get('from'),
            'fromcity' => $request->json()->get('fromcity'),
    		'to' => $request->json()->get('to'),
            'tocity' => $request->json()->get('tocity'),
    		'passBy' => $request->json()->get('other'),
            'passbycity' => $request->json()->get('othercity'),
    		'travelTime' => $request->json()->get('dt'),
    		'price' => $request->json()->get('prix'),
    		'PassByPrice' => $request->json()->get('secprix'),
            'firstDuration' => $request->json()->get('duration_value_1'),
            'secondDuration' => $request->json()->get('duration_value_2'),
    		'nbrplace' => $request->json('nbrplace'),
    		'description' => $request->json('description'),
    		'user_id' => Auth::id(),
    	]);
    	return response()->json(['post' => $post], 200);
    }

    public function search(Request $request)
    {
        $from = $request->json()->get('from');
        $to = $request->json()->get('to');
        $date = $request->json()->get('date');

        $posts = Post::with('users')->where([
            ['fromcity', '=', $from],
            ['tocity', '=', $to],
        ])->orWhere([
            ['fromcity', "=", $from],
            ['passbycity', "=", $to],
        ])->get();
        
        // $pp = Post::with('users')->where([
        //     ['fromcity', '=', $from],
        //     ['passbycity', '=', $to]
        // ])->get();

        // foreach ($pp as $p) {
        //     $p->finaldest = $p->tocity;
        //     $p->tocity = $p->passbycity;
        //     $p->to = $p->passBy;
        //     $p->duration = $p->firstDuration;
        // }

        // $psts = $posts->merge($pp);

        return response()->json(compact('posts'),201);
    }

    public function all_posts() 
    {
        $posts = Post::all();
        return response()->json(compact('posts'),201);
    }

}

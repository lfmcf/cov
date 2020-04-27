<?php

namespace App\Http\Controllers;

use App\MessageStatus;
use Illuminate\Http\Request;

class MessageStatusController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\MessageStatus  $messageStatus
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        $id = $request->id;
        $msgs = MessageStatus::where([
            ['user_id', '=', $id],
            ['status', '=', false]
        ])->get();
        return response()->json($msgs, "200");
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\MessageStatus  $messageStatus
     * @return \Illuminate\Http\Response
     */
    public function edit(MessageStatus $messageStatus)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\MessageStatus  $messageStatus
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, MessageStatus $messageStatus)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\MessageStatus  $messageStatus
     * @return \Illuminate\Http\Response
     */
    public function destroy(MessageStatus $messageStatus)
    {
        //
    }

    public function markread(Request $request) {
        $c_id = $request->json()->get('val');
        $res = MessageStatus::where('conversation_id', $c_id)->update(['status' => 1]);
        return response()->json($res, 200);
    }
}

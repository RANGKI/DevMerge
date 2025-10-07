<?php

namespace App\Http\Controllers;

use App\Models\ChatMessage;
use App\Services\ChatMessageService;
use Illuminate\Http\Request;

class ChatMessageController extends Controller
{
    public function __construct(public ChatMessageService $service)
    {
        
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // dd(auth()->check(), auth()->user());
        // dd($this->service->get_users());
        $directMessages = $this->service->get_users();
        return inertia('Chat',[
            'directMessages' => $directMessages,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dd($request->all());
        $this->service->store_message($request->input('content'),$request->input('receiver_id'),$request->input('sender_id'),$request->input('conversation_id'),);
        return back()->with('success', 'Message sent successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(ChatMessage $chatMessage)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ChatMessage $chatMessage)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ChatMessage $chatMessage)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ChatMessage $chatMessage)
    {
        //
    }
}

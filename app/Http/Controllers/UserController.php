<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // If already logged in, redirect to chat page
        if (Auth::check()) {
            return redirect()->route('chat.index');
        }

        // Otherwise, show login page
        return inertia('Login');
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
        $credentials = [
            'email' => $request->input('email'),
            'password' => $request->input('password'),
        ];
        // $info = 'invalid';
        if (Auth::attempt($credentials)) {
            // $info = 'sucesss';
            // dd($info);
            $request->session()->regenerate();
            return redirect()->intended('/user/chat');
        }
        // dd($info);

        return back()->withErrors([
            'email' => 'Invalid credentials.',
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }

    public function login() {

    }
}

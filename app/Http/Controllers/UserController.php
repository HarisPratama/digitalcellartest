<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller {

    public function index() {
        return User::paginate(10);
    }

    public function store(Request $request) {
        $validatedData = $request->validate([
            'name' => 'required',
            'email' => 'required|unique:users|email',
        ]);

        return User::create($validatedData);
    }

    public function show($id) {
        $user = User::find($id);
    
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
    
        return $user;
    }

    public function update(Request $request, $id) {
        $user = User::find($id);
    
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
    
        $validatedData = $request->validate([
            'name' => 'required',
            'email' => 'required|unique:users,email,' . $id,
        ]);
    
        $user->name = $validatedData['name'];
        $user->email = $validatedData['email'];
        $user->save();
    
        return $user;
    }

    public function destroy($id) {
        $user = User::find($id);
    
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
    
        $user->delete();
    
        return response()->json(['message' => 'User deleted successfully']);
    }
    
}


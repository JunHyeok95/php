<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\User;

class AuthController extends Controller
{
  public function __construct()
  {
    $this->middleware('JWT', ['except' => ['login', 'register']]);
    // auth()->setDefaultDriver('api');
  }

  public function login()
  {
    $credentials = request(['email', 'password']);

    if (!$token = auth()->attempt($credentials)) {
      return response()->json(['error' => 'Unauthorized'], 401);
    }

    return $this->respondWithToken($token);
  }

  public function register(RegisterRequest $request)
  {
    $user = User::create($request->all());

    return $this->login($request);
  }

  public function me()
  {
    return response()->json(auth()->user());
  }

  public function logout()
  {
    auth()->logout();

    return response()->json(['message' => 'Successfully logged out']);
  }

  public function refresh()
  {
    return $this->respondWithToken(auth()->refresh());
  }

  protected function respondWithToken($token)
  {
    return response()->json([
      'access_token' => $token,
      'token_type' => 'bearer',
      'expires_in' => auth()->factory()->getTTL() * 60,
      'current_user' => auth()->user()
    ]);
  }
}

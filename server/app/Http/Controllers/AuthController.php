<?php

namespace App\Http\Controllers;

use App\User;
use App\Preference;
use Illuminate\Http\Request;
use Socialite;
use Auth;
use Illuminate\Foundation\Auth\VerifiesEmails;
use Illuminate\Auth\Events\Verified;
use Intervention\Image\Facades\Image;
class AuthController extends Controller
{
    public function register(Request $request)
    {
        // $nom = $request->prenom;
        // return response()->json(['nom' => $nom], 200);
    	// $this->validate($request, [
    	// 	'nom' => 'required|min:3',
     //        'prenom' => 'required|min:3',
    	// 	'email' => 'required|email|unique:users',
    	// 	'password' => 'required|min:6',
     //        'tel' => 'phone:MA',
    	// ]);

    	$user = User::create([
    		'email' => $request->email,
    		'password' => bcrypt($request->password),
            'genre' => $request->gender,
            'nom' => $request->nom,
            'prenom' => $request->prenom,
    	]);
        
        $token = $user->createToken('token')->accessToken;
        $user->sendApiEmailVerificationNotification();
        
        return response()->json(['token'=>$token, 'EmailVerified'=> false],200);
    }

    public function login(Request $request)
    {
    	$credentials = [
    		'email' => $request->email,
    		'password' => $request->password
    	];

    	if(auth()->attempt($credentials))
        {
            $user = Auth::user();
            $token = auth()->user()->createToken('token')->accessToken;
            if($user->email_verified_at !== NULL)
            {
                return response()->json(['token' => $token, 'user' => $user], 200);
            } else {
                return response()->json(['EmailVerified'=> false, 'token' => $token], 200);
            }
            
        }else 
        {
            return response()->json(['error' => 'UnAuthorised'], 200);
        }
    }

    public function redirectToProvider()
    {
        return Socialite::driver('facebook')->stateless()->redirect()->getTargetUrl();
    }

    public function handleProviderCallback(Request $request) 
    {
        //$credentials = $request->json()->all();
        $url = $request->json()->get('picture');
        $path = NULL;
        if($url) {
            $str=rand(); 
            $result = sha1($str); 
            $path = public_path('images/'.$result.'.jpeg');
            $file = file_put_contents($path, file_get_contents($url));
        }
        
        $user = User::query()->firstOrNew(['email' => $request->json()->get('email')]);

        if (!$user->exists) {
            $user = User::create([
                'nom' => $request->json()->get('nom'),
                'prenom' => $request->json()->get('prenom'),
                'email' => $request->json()->get('email'),
                'avatar' => $path,
            ]);
        }

        $token = $user->createToken('token')->accessToken;

        return response()->json(['token' => $token, 'user' => $user], 200);
    }

    public function getAuthenticatedUser()
    {
        $user = Auth::user();
        
        if($user) {
            return response()->json(['user' => $user], 200);
        }else {
            return response()->json(['error' => "UnAuthorised"], 200);
        }
        
    }

    public function checkEmail(Request $request)
    {
        $email = $request->json()->get('email');
        
        $user = User::where('email', $email)->first();
        if($user){
            return response()->json(['user'=>true], 200);
        }else {
            return response()->json(['user'=>false], 200);
        }
    }
}

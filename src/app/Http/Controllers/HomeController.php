<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Response;

class HomeController extends Controller
{
    //
    public function index()
    {
        return view('app');
    }

    public function getIndexData()
    {
        //タブテーブルからタブを全て取得
        $tabs = DB::table('tabs')
                ->select('id','key','name','default')
                ->orderBy('id')
                ->get();

        return Response::json([
            'tabs'=>$tabs
        ]);
    }
}

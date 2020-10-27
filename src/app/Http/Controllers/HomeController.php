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

        //記事テーブルから全ての記事を取得
        $topics=DB::table('topics as t')
                ->join('tabs as tb','tb.id','t.tab_id')
                ->join('thumbnails as tm','tm.id','t.thumbnail_gid')
                ->join('animations as ani','ani.id','t.animation_gid')
                ->join('music as m','m.id','t.music_gid')
                ->select('t.id','tb.key','t.title','t.image','tm.thumbnail_type','t.text','t.owner','t.url','m.bgm_created_name','m.bgm_name','ani.animation_type',DB::raw("false as favorite"))
                ->orderBy('t.updated_at','desc')
                ->get();

        return Response::json([
            'tabs'=>$tabs,
            'topics'=>$topics
        ]);
    }
}

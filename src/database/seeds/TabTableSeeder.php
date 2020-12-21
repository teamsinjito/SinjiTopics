<?php

use Illuminate\Database\Seeder;
use App\Tab;
use App\Music;
use App\Animation;
use App\Thumbnail;
use Illuminate\Support\Facades\DB;

class TabTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        Tab::truncate();
        Music::truncate();
        Animation::truncate();
        Thumbnail::truncate();
        
        $tabs=[
            ["contents-domestic","国内","active"],
            ["contents-overseas","国際",""],
            ["contents-economy","政治・経済",""],
            ["contents-technology","IT・技術",""],
            ["contents-sports","スポーツ",""],
            ["contents-entertainment","エンタメ",""],
            ["contents-history","履歴",""],
            ["contents-favorite","お気に入り",""]
        ];
        $musics=[

            ["フリーBGM「シャイニングスター」by 森田交一","シャイニングスター"],
            ["フリーBGM「タイフーンパレード」by 龍崎一","タイフーンパレード"],
            ["フリーBGM「Success!」by 龍崎一","Success!"],
            ["フリーBGM素材「ランプ」by カワサキヤスヒロ","ランプ"],
            ["フリーBGM素材「フタツノココロ」by t.tam","フタツノココロ"],
            ["フリーBGM「ホットミルク」by カワサキヤスヒロ","ホットミルク"],
            ["フリーBGM「Where you are」by 森田交一","Where you are"],
            ["フリーBGM「Cry again」by 森田交一","Cry again"],
            ["フリーBGM「ながれぼし」by もっぴーさうんど","ながれぼし"]
        ];
        $thubmnails=[
            ["standard"],
            ["w-large"],
            ["h-large"],
            ["title-only"],
        ];
        $animations=[
            ["end-roll"],
            ["writer"],
        ];

        foreach($tabs as $tab){
            Tab::create([
                'key'=>$tab[0],
                'name'=>$tab[1],
                'default'=>$tab[2]
            ]);
        }

        foreach($musics as $music){
            Music::create([
                'bgm_created_name'=>$music[0],
                'bgm_name'=>$music[1]
            ]);
        }

        foreach($thubmnails as $thubmnail){
            Thumbnail::create([
                'thumbnail_type'=>$thubmnail[0],
            ]);
        }

        foreach($animations as $animation){
            Animation::create([
                'animation_type'=>$animation[0],
            ]);
        }

    }
}

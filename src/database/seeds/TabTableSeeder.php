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
            ["フリーBGM「さわやかデイズ」by ハップル","明るい"],
            ["フリーBGM素材「ADV GAmE FoAm」by えすにっく・かわひろ","懐かしい"],
            ["フリーBGM素材「ツインテール少女のお約束」by しんさんわーくす","コメディー"],
            ["フリーBGM素材「Evil Dance」by 伊藤ケイスケ","怒り"],
            ["フリーBGM素材「雪の降り積もる夜に」by Ryo Lion","悲しい"],
            ["フリーBGM素材「Crescent Moon」by shimtone","ファンタジー"],
            ["フリーBGM素材「夜の秋桜」by しんさんわーくす","おしゃれ"],
            ["フリーBGM素材「悩む昼ごはん」by いまたく","日常"],
            ["フリーBGM素材「Catch the future」by FLASH☆BEAT","サイバー"],
            ["フリーBGM素材「Sulpiride」by Anonyment","暗い"],
            ["フリーBGM素材「Caution Beat」by shimtone","緊張"],
            ["フリーBGM素材「休日どこ行こっか?」by しんさんわーくす","希望"],
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

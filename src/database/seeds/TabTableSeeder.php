<?php

use Illuminate\Database\Seeder;
use App\Tab;
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

        foreach($tabs as $tab){

            Tab::create([
                'key'=>$tab[0],
                'name'=>$tab[1],
                'default'=>$tab[2]
            ]);

        }

    }
}

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
        
        $tabs=array('国内','国際','政治・経済','IT・技術','スポーツ','エンタメ','履歴','お気に入り');

        foreach($tabs as $index => $tab){
            if($index==0){
                Tab::create([
                    'name'=>$tab,
                    'default'=>"active"
                ]);
            }else{
                Tab::create([
                    'name'=>$tab
                ]);

            }
        }

    }
}

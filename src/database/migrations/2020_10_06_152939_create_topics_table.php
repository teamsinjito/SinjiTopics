<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTopicsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('topics', function (Blueprint $table) {
            $table->bigIncrements('sid');
            $table->string('id',80)->unique();
            $table->unsignedBigInteger('tab_id');
            $table->string('title',255);
            $table->text('text');
            $table->string('owner',100);
            $table->text('url');
            $table->text('image');
            $table->text('image2');
            $table->unsignedBigInteger('thumbnail_gid')->nullable();
            $table->unsignedBigInteger('animation_gid')->nullable();
            $table->unsignedBigInteger('music_gid')->nullable();
            $table->timestamps();
        });

        Schema::table('topics', function ($table) {
            $table->foreign('tab_id')->references('id')->on('tabs')->onDelete('cascade');
            $table->foreign('thumbnail_gid')-> references('id')->on('thumbnails')->onDelete('set null');
            $table->foreign('animation_gid')-> references('id')->on('animations')->onDelete('set null');
            $table->foreign('music_gid')-> references('id')->on('music')->onDelete('set null');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('topics');
    }
}

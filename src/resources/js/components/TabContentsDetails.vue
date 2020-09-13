<template>
    <div class="grid-containers">
        <div class="card text-white" style="grid-row: span 2; grid-column: span 2;">
            <img class="card-img-top" src="img/sample/uver paper.jpg" alt="スダンダードコースのイメージ画像">
            <div class="card-img-overlay">
                <h4 class="card-title">ライトコース</h4>
                <p class="card-text">ホームページ・ブログ開設など基礎を身に付けたい方向けコースです。</p>
            </div>
        </div>

        <div class="card" style="grid-row: span 2; grid-column: span 1;">
            <img class="card-img-top" src="img/sample/uver paper.jpg" alt="スダンダードコースのイメージ画像">
            <div class="card-body">
                <h4 class="card-title">スダンダードコース</h4>
                <p class="card-text">ホームページ作</p>
            </div>
        </div>

        <div class="card" style="grid-row: span 2; grid-column: span 1;">
            <img class="card-img-top" src="img/sample/uver paper.jpg" alt="スダンダードコースのイメージ画像">
            <div class="card-body">
                <h4 class="card-title">スダンダードコース</h4>
                <p class="card-text">ホームページ作</p>
            </div>
        </div>
        <div class="card text-white" style="grid-row: span 2; grid-column: span 2;">
            <img class="card-img-top" src="img/sample/uver paper.jpg" alt="スダンダードコースのイメージ画像">
            <div class="card-img-overlay">
                <h4 class="card-title">ライトコース</h4>
                <p class="card-text">ホームページ・ブログ開設など基礎を身に付けたい方向けコースです。</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        
        contentTopics:{
            type:Array
        }
    }
}
</script>
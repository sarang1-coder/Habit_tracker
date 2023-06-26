const weeklyBtn=document.getElementById("weekly_btn");
const dailyBtn=document.getElementById("daily_btn");



console.log('Static file is loaded');


let weeksContainer = document.querySelectorAll(".weekly__container");

function showDailyInfo() {
    for( letsingleClass of weeksContainer){
        letsingleClass.style.display = "flex";
    }
}

function showWeeklyInfo() {
    for (letsingleClass of weeksContainer) {
        letsingleClass.style.display = "none";
    }
}




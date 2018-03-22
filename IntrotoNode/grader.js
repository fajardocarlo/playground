var sum = 0
function average(score){
    for(var i=0 ; i < score.length ; i++){
         sum += score[i];
    }
    console.log(Math.round(sum/i));
    sum = 0;
}

var scores = [90, 98, 89, 100, 100, 86, 94];
average(scores);
var scores1 = [40, 65, 77, 82, 80, 54, 73, 63, 95, 49];
average(scores1);
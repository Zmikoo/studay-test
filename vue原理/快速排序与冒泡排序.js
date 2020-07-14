
function quickSort(arr){
    if (arr.length <= 1) return arr;
    var pivotIndex = Math.floor(arr.length/2);
    var pivot = arr.splice(pivotIndex,1)[0];
    var left = [];
    var right = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i])
        } else {
            right.push(arr[i])
        }
    }
    return quickSort(left).concat([pivot],quickSort(right))
}
var arr = [3,3,-5,6,0,2,-1,-1,3];
console.log(arr);
quickSort(arr);
console.log(arr);

// 冒泡排序
var   arr2=[2,5,4,1,7,3,8,6,9,0];
function sort(arr){
    var temp = null;
    for (var i = 0;i < arr.length-1; i++){
        for (var j = i + 1; j < arr.length; j++) {
            if (arr[i] > arr[j]) {
                temp = arr[j];
                arr[j] = arr[i];
                arr[i] = temp;
            }
        }
    }
}
console.log(sort(arr2));
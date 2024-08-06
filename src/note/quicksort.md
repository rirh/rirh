


## 快速排序

> 顾名思义快速排序听起来是概念性的东西，名字就代表了它本身。设想一个这样的场景：如果在你面前有一群刚出生不久生病的小狗狗，都有自己的挂号单，现在给你的任务就是按照单号给小狗排序，因为时间问题，所以要去无论什么办法，需要在最短的时间内完成。这个时候也许快速排序能帮上你的忙！

##  核心方案

 - **在排序之前选择一个值为游标（中间值）**
 - **所有小于游标的放在左侧，大于游标的放在右侧**
 - **左右两边分开的数据不断重复第一步、第二步，
直到里面只有一个值为止**


> 假设刚刚狗狗的单号是这样子的




 1. ***第一步选择8作为中间值（选择任何值都行，中间比较容易明白）***
![在这里插入图片描述](https://c18e-1257416358.cos.accelerate.myqcloud.com/uPic/2019010310182524.png)
 2. ***所有小于8的放在左侧，大于8的放在右侧***
![在这里插入图片描述](https://c18e-1257416358.cos.accelerate.myqcloud.com/uPic/2019010310205446.png)
 3. ***左右两边分开的数据不断重复第一步、第二步，直到里面只有一个值为止***
![在这里插入图片描述](https://c18e-1257416358.cos.accelerate.myqcloud.com/uPic/20190103103146394.png)

![在这里插入图片描述](https://c18e-1257416358.cos.accelerate.myqcloud.com/uPic/20190103103204593.png)

##  使用javascript实现

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
</body>
<script>
    const AR = {
        arr: [3, 4, 6, 1, 2, 0, 8, 9, 5, 7, 22, 88, 23],
        //快速排序
        quickSort(arr) {
            //直到分为单个时返回当前排好序的数组
            if (arr.length <= 1) return arr;
            // 获取前数组的中间值下标
            const cursor = Math.floor(arr.length / 2);
            // 获取数组的中间值
            const [crrent, ] = arr.splice(cursor, 1);
            // 左边的数组
            const leftArr = [];
            // 右边的数组
            const rightArr = [];
            // 以中间值为游标大的放右边小的放左边
            arr.forEach(e => {
                if (e < crrent) {
                    leftArr.push(e)
                } else {
                    rightArr.push(e)
                }
            });
            // 递归重复这个步骤最后就可以得到排好序的数组
            return AR.quickSort(leftArr).concat([crrent], AR.quickSort(rightArr))
        },
    }
    console.dir(AR.quickSort(AR.arr));
</script>

</html>
```
**使用的时候直接调用就行了**
![在这里插入图片描述](https://c18e-1257416358.cos.accelerate.myqcloud.com/uPic/20190103103950652.png)

## 1.9.4 快速排序思维导图

![在这里插入图片描述](https://c18e-1257416358.cos.accelerate.myqcloud.com/uPic/20190103103740192.png)

小狗很快就拍好序了：）好吧，可能会受不了，可能会狗带，毕竟和电脑比不了，具体情况具体分析，当数据量很大的时候。对于计算机来说，这种方式是最为广泛也是最快的。





# 数据绑定实例

**由于Proxy的先进机制和兼容的发展，vue3.0放弃IE老版本的兼容，采用Proxy为核心机制**

**手写一个简单的数据绑定**

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
    <span class="model"></span>
    <input type="text" class="value">
</body>
<script>
    const obj = {}
    const value_dom = document.querySelector('.value');
    const model_dom = document.querySelector('.model');

    const newObj = new Proxy(obj, {
        get: function (target, key, receiver) {
            return Reflect.get(target, key, receiver)
        },
        set: function (target, key, value, receiver) {
            if (key === 'value') {
                model_dom.innerHTML = value
                value_dom.value = value
            }
            return Reflect.set(target, key, value, receiver)
        }
    })

    value_dom.addEventListener('keyup', e => {
        const val = e.target.value;
        // newObj.value = val;
        newObj.value = val;
        console.log(`${val}`);
    });

</script>
</html>
```



**3.0之前版本数据双向绑定核心代码**



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
    <span class="model"></span>
    <input type="text" class="value">
</body>
<script>
    const data = {value:''}
    const value_dom = document.querySelector('.value');
    const model_dom = document.querySelector('.model');

     Object.defineProperty(data, 'value', {
        get: (val) => {
             return val;

         },
        set: (val) => {
           model_dom.innerHTML = val;
           value_dom.value = val;

         }
     })


    value_dom.addEventListener('keyup', e => {
        const val = e.target.value;
        data.value=val;
        console.log(`${val}`);
    });
    
</script>
</html>
```



# Inquirejs

Inquirer.js是一个基于命令行交互的Node.js工具，用于向用户提出问题并解析答案。它为开发人员提供了一种简单、直接的方式收集用户输入和生成交互式命令行界面。其主要特点包括体积小巧、易于使用、高度可定制、支持异步操作和链式调用等。

下面是一些Inquirer常用问题类型的示例：

1. ### list问题类型

```
const inquirer = require('inquirer');

inquirer
  .prompt([
    {
      type: 'list',
      name: 'fruit',
      message: 'What is your favorite fruit?',
      choices: ['apple', 'banana', 'kiwi', 'pear']
    }
  ])
  .then(answers => {
    console.log('You like ' + answers.fruit);
  });
```

上述代码将会在命令行终端中提出一个选项列表问题，用户需要从预定义的选项中选择一个答案。

2. ### input问题类型

```
const inquirer = require('inquirer');

inquirer
  .prompt([
    {
      type: 'input',
      name: 'username',
      message: 'What is your username?'
    }
  ])
  .then(answers => {
    console.log('Your username is ' + answers.username);
  });
```

上述代码将会在命令行终端中询问用户一个问题，并让用户输入一个答案。

3. ### confirm问题类型

```
const inquirer = require('inquirer');

inquirer
  .prompt([
    {
      type: 'confirm',
      name: 'toBeContinued',
      message: 'Do you want to continue?'
    }
  ])
  .then(answers => {
    console.log(answers.toBeContinued ? 'Let\'s continue...' : 'Maybe next time.');
  });
```

上述代码将会在命令行终端中询问用户一个问题，其答案为yes或no。

4. ### checkbox问题类型

```
const inquirer = require('inquirer');

inquirer
  .prompt([
    {
      type: 'checkbox',
      message: 'Select toppings',
      name: 'toppings',
      choices: [
        new inquirer.Separator(' = The Meats = '),
        {
          name: 'Pepperoni'
        },
        {
          name: 'Bacon'
        },
        {
          name: 'Ham'
        },
        {
          name: 'Sausage'
        },
        new inquirer.Separator(' = The Cheeses = '),
        {
          name: 'Mozzarella',
          checked: true
        },
        {
          name: 'Cheddar'
        },
        {
          name: 'Parmesan'
        },
        new inquirer.Separator(' = The usual ='),
        {
          name: 'Mushroom'
        },
        {
          name: 'Tomato'
        },
        new inquirer.Separator(' = The extras = '),
        {
          name: 'Pineapple'
        },
        {
          name: 'Olives',
          disabled: 'out of stock'
        },
        {
          name: 'Extra cheese'
        }
      ],
      validate: function(answer) {
        if (answer.length < 1) {
          return 'You must choose at least one topping.';
        }
        return true;
      }
    }
  ])
  .then(answers => {
    console.log('Your toppings are ' + JSON.stringify(answers.toppings));
  });
```

上述代码将会在命令行终端中提出一个复选框问题，用户需要从预定义的选项中选择多个答案。

5. ### password（密码框）

password类型问题可以用来向用户询问密码，输入时会屏蔽掉输入内容，以保证密码安全。

```javascript
const inquirer = require('inquirer');

inquirer.prompt([
  {
    type: 'password',
    message: '请输入你的密码：',
    name: 'password',
    mask: '*',
  },
]).then(answers => {
  console.log('密码是：', answers.password);
});
```

6. ### editor（文本编辑器）

editor类型问题可以用来向用户展示一个文本编辑器，用户可以在里面输入多行文本，类似于vim、emacs等编辑器。

```javascript
const inquirer = require('inquirer');

inquirer.prompt([
  {
    type: 'editor',
    message: '请输入文本：',
    name: 'text',
    validate: function (text) {
      if (text.trim().length === 0) {
        return '文本不能为空';
      }
      return true;
    }
  },
]).then(answers => {
  console.log('你输入的文本是：', answers.text);
});
```

7. ### number（数字输入框）

number类型问题可以用来向用户询问数字，可以设置最大值、最小值等属性。

```javascript
const inquirer = require('inquirer');

inquirer.prompt([
  {
    type: 'number',
    message: '请输入一个数字：',
    name: 'number',
    validate: function (number) {
      if (isNaN(number)) {
        return '请输入数字';
      }
      return true;
    },
    filter: function (number) {
      return parseInt(number);
    },
  },
]).then(answers => {
  console.log('你输入的数字是：', answers.number);
});
```

8. ### autocomplete（自动补全）

autocomplete类型问题可以用来向用户展示一个自动补全的输入框，用户可以根据提示进行选择。

```javascript
const inquirer = require('inquirer');

inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));

const choices = [
  'apple',
  'orange',
  'banana',
  'watermelon',
  'peach',
];

const searchFruit = (answers, input) => {
  input = input || '';
  return new Promise(function (resolve) {
    const filtered = choices.filter(choice => {
      return choice.toLowerCase().indexOf(input.toLowerCase()) !== -1;
    });
    resolve(filtered);
  });
};

inquirer.prompt([
  {
    type: 'autocomplete',
    message: '请选择一个水果：',
    name: 'fruit',
    source: searchFruit,
  },
]).then(answers => {
  console.log('你选择的水果是：', answers.fruit);
});
```

9. ### date（日期选择）

date类型问题可以用来向用户展示一个日期选择器，用户可以选择日期和时间。

```javascript
const inquirer = require('inquirer');

inquirer.prompt([
  {
    type: 'datetime',
    message: '请选择一个日期和时间：',
    name: 'date',
    format: ['yyyy', '-', 'mm', '-', 'dd', ' ', 'HH', ':', 'MM', ':', 'ss'],
  },
]).then(answers => {
  console.log('你选择的日期是：', answers.date);
});
```

10. ### time（时间选择）

time类型问题可以用来向用户展示一个时间选择器，用户可以选择具体的时间。

```javascript
const inquirer = require('inquirer');

inquirer.prompt([
  {
    type: 'time',
    message: '请选择一个时间：',
    name: 'time',
    format: ['hh', ':', 'mm', ' ', 'a'],
  },
]).then(answers => {
  console.log('你选择的时间是：', answers.time);
});
```


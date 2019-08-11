# Vue Getting Started

TOC:

- 1 Vue Object
- 2 Basic skelet
- 3 'directives'
- 4 Dynamicly attachting classes to html
  - 4.1 Basics
  - 4.2 Using Objects
  - 4.3 Using Names
  - 4.4 Using Arrays
  - 4.5 Using Styles
- 5 Conditional
  - 5.1 v-if and v-else / v-else-if
  - 5.2 v-show
  - 5.3 v-for
- 6 The Vue Object
  - 6.1 \$el
  - 6.2 \$data
  - 6.3 \$refs
  - 6.4 Monuting a template
- 7 Real Development Workflow
  - 7.1 Installing Vue-cli
  - 7.2 Webpack
- 8 Components

**References:** [Vue](https://www.vuejs.org)

## 1 Vue Object

```javascript
var vm = new Vue({
  el: "#myVueApp",//-> connection to the DOM
  data:           //-> data variables to be used (can't be functions!!)
  computed:       //-> dependent properties (behave like 'data:', ! are evaluated !)
  methods:        //-> methods of the Vue instance
  watch:          //-> Executes code upon data changes
  }
})
```

**remarks:**

**Computed vs methods**

**computed** is prefered above **methods**, except if you need to always recalculate! Difference is that 'methods' are ALWAYS recalculated even when not needed since Vue does not analyses the code upfront to see what variables or dependencies it contains. When using 'computed', Vue analyse the code upfront and only executes the code when it contains vaiables that are impacted! If not sure use console.log and see if called! (college 24)

**watch**

**watch vs methods/computed**

**watch** gives us the ability to react to changes. Big difference with methods or computed is that watch is **'asynchronous'**. Incase of methods or computed all the code is executed **'synchrounous' !**. Use case of watch and needed asynchronous behaviour are the start of a timer (cfr setTimeout(function,time)) or a API call.

What is Vue ?

- Vue is the view layer of an MVC application (Model View Controller)
- Vue is an open source frontend javascript framework

## 2 Basic skelet

```html
// index.html
<html>
  <head>
    <title>My first Vue site</title>
    // vue development version - for debug - not production
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  </head>
  <body>
    <div id="#myApp">
      <p>temp = {{temerature}}</p>
    </div>
    <script src="app.js"></script>
  </body>
</html>
```

```javascript
/* app.js*/
var app = new Vue ({
  el: '#myApp',
  data: {
    temperature: 21
  }

}
```

## 3 directives

- are 'instructions'
- directives are prefixed with 'v-' (eg: 'v-bind')
- they indicate special reactive behaviour to render the DOM.
- they 'bind' dynamicly data to html.
- you can als make your own directives.

**Available directives:**

- v-bind -> binds to attributes (js -> Html)
- v-model -> 2-way binding (js <-> HTML)
- v-on: -> bind to events ( cfr v-on:click="doSuff")
- v-once -> only bind once
- v-html -> forces string as html ( cfr CORS security)

shorthands:

- v-on:click == @click
- v-bind:href == :href

Intro:

We can directly use Vue data variables from in 'app.js' into the html -> eg {{myName}}

      -> eg: <h1>{{myVariableTitle}}</h1>

We can **NOT** bind diretly to html 'attributes' (eg href,div,a,ul, etc)

      -> eg: `<a href = {{myVariableLink}}>Google</a>` -> Does **NOT** work

    -> instead we have to 'bind' it and tell it not to use the normal attribute by prefixing 'v-...'

      -> eg: `<a v-bind:href = "myVariableLink">Google</a>` -> without '{{}}'

**v-bind**

```
todo
```

**v-model**

This sets '2-way binding' between html and the Vue instance

```html
<input type="text" v-model="name" />
<p>My name is {{name}}</p>
```

```javascript
///Vue app
var vm = new Vue({
  el: '#myApp',
  data: {
    name: 'Peter'
  }
});
```

** Recap: Difference: v-bind vs v-model !**

**v-bind === js - > Html** ! Dynamically binds (one-way) your js value to HTML

**v-model === js <-> Html** ! Dynamically binds (Two-way) your js value to HTML and vice versa

v-bind -> typically used to make the Html dynamic (cfr add classes, change content,...) <BR> v-model -> typically used for forms or input fields

```
/// equivallent code !!!
<input v-model:value="myText">

===

<input
  v-bind:value="myText"
  v-on:input="myText = $event.target.value"
>
```

**v-once**

```
  -> eg: `<h1 v-one>"myTitle"</h1>`  (!!will only render it 1 time and stops)
```

**v-html**

```
  This outputs 'raw html'. If we would have a variable

  myLink = `"<a href="www.google.com">Google</a>"`

      `<p>{{myLink}}</p>`           -> this would output raw text !

      `<p v-html>{{myLink}}</p>`    -> OK

      **Remark:** This is to prevent Cross site scripting attacks!!!
```

**v-on**

```
  With 'v-on' we can listen to a event of the context and trigger a function that was declared in the Vue object

  `<button v-on:click = "incrementMyCounter">Add</button>`
```

**Remark:** The event is always passed within the function. Pay attention because in the function we have to use 'this.x' (not 'x' ) in case 'x' is a variable (cfr 'data:') in the Vue object.

`<p v-on:mousemove = "updateCoordinates">x = {{x}} y = {{y}}</p>`

```javascript
var vm = new Vue({
  el: 'myVueApp',
  data: {
    x: 0,
    y: 0
  },
  methods: {
    updateCoordinates: function(event) {
      this.x = event.ClientX;
      this.y = event.ClientY;
    }
  }
});
```

**Remark**

In case of nested attributes that trigger the same event, we have 2 options:

- trigger a empty function that holds 'event.stopropagation'
- Use a **'Event modifier'**
  - `<p v-on:mousemove.stop="">DEAD Spot</p>` -> also stops propagation. (college 21)

A other use case for event modifiers is with the keyup event

- `<input type="text" v-on:keyup = "alertMe">`
- `<input type="text" v-on:keyup.enter = "alertMe">`
- `<input type="text" v-on:keyup.enter.space = "alertMe">`

[Reference modifiers](http://vuejs.org/v2/guide/events.html#Key-Modifiers)

# 4 Dynamically attach classes to Html

see chapter 27-33

## 4.1 Basic (chapter 27)

Use **':class={className:boolean}'**, where via v-bind (cfr':'), we will add a class 'className', when boolean condition is true.

```html
<div class="Rect" @click="isRed=!isRed" :class="{red:isRed}">...</div>
<div class="Rect" @click="isRed=!isRed" :class="{red:isRed, blue:!Red}">..</div>
```

see example: Getting-Started-Vue/Code-examples/Section_2_Dynamic_Styling/1_Basic

## 4.2 Using Objects (chapter 28)

If it gets complex or you dont want the logic in your html code, as in 4.1, we can mut the logic in a (computed) function of our Vue object. The function return a object '{red:isRed, blue:!isRed}'.

```html
<div class="Rect" @click="isRed=!isRed" :class="computeDivClasses">...</div>
```

```javascript
var vm = new Vue({
  el: 'myVueApp',
  data: {
    isRed: false
  },
  computed: {
    computeDivClasses: function(event) {
      return {
        red: this.isRed,
        blue: !this.isRed
      };
    }
  }
});
```

see example: Getting-Started-Vue/Code-examples/Section_2_Dynamic_Styling/2_Using_Objects

## 4.3 Using Names (chapter 29)

Instead of using a boolean condition in order to attach pre-defined class, we now want to attach any class In the code below we type the name of any css class, and it will be attached.

```html
<div class="Rect" :class="color">...</div>
<input type="text" v-model="color" />
```

```javascript
var vm = new Vue({
  el: 'myVueApp',
  data: {
    color: 'green'
  }
});
```

**Remark:** We can also mix different approaches, object + direct (4.3 + 4.1)

## 4.4 using Arrays

We can also mix different approaches, object + direct (4.3 + 4.1)

**Remark:** In case of 2 competing CSS classes, eg 'red and green' than the sequence in css determins who wins (last in css)

```
<div :class = "["myClass",{red:isRedTrue}]">..</div>    -> cfr use-case progressbar
```

see example: Getting-Started-Vue/Code-examples/Dynamic-css-snippet/Using-Arrays

## 4.5 Using Styles

We can also directly attach or change style properties! In this example we input any color and bind it to the backgroundcolor We can directly change the 'style' with the logic in the html or we can put it into a method and this rreturns or change a style object.

```
<div :style = "{'background-color':color}">..</div>    -> remark! '' because - is not valid char in property name
<div :style = "{backgroundColor:color}">..</div>      -> remlark: we can us camelCase as alternative of ''
<div :style = "myStyle">..</div>    -> cfr use-case progressbar, where mystyle returns {width:x}
```

see example: Getting-Started-Vue/Code-examples/Dynamic-css-snippet/Using-Styles

## 5 Conditional

## 5.1 v-if

v-if -> conditionally attaches or detaches a element to the DOM. It completely removes it !! (see chrome inspect)

```javascript
// Basic
<p v-if="show">
  {' '}
  This paragraph element is only added when condition(show) is true !!
</p>
```

```javascript
// with 'else'
<p v-if = "show"> This paragraph element is only added when condition(show) is true !!</p>
<p v-else> If show is false, you can see me as alternative!</p>
```

```javascript
// with a 'template'(HTML5)
// Remark: template element is never rendered but allows us to wrap multiple elemenst together
<template v-if ="show>
  <h1>Congratioltions: You won ! </h1>
  <p> Go to our website and ....</p>
</template>
```

## 5.2 v-show

Similar to v-if, but it gets rendered and becomes HTML and if 'false' -> 'display: none' becomes the html property.

**Remark:** v-else is not available with v-show !!!

## 5.3 v-for

It enables us to loop trough an array.

```javascript
///html

<ul>
  <li v-for="framework in frameworks">{{framework}}</li>
</ul>
<ul>
  <li v-for = "person in persons">
    <div v-for ="(value,key) in person">
      {{key}} : {{value}}
    </div>
  </li>
</ul>

/// app.js

data:{
  frameworks:['Angular','React','Vue']
  persons:[
    {name:'Max',age:33,passion:'Vue'}
    {name:'Trixie',age:32,passion:'music'}
  ]
}
```

```javascript
// looping trough list of numbers
<span v-for = "n in 10>{{n}}</span>
```

## 6 The Vue Object

[See details](https://vue.org/api)

```javascript
var vm = new Vue({
  el: "#myVueApp",//-> connection to the DOM
  data:           //-> data variables to be used (can't be functions!!)
  computed:       //-> dependent properties (behave like 'data:', ! are evaluated !)
  methods:        //-> methods of the Vue instance
  watch:          //-> Executes code upon data changes
  }
})
```

We can look at 'vm' in the console.

- it is a normal 'javascript' object we can interact with.
- we can see 'all' methods and properties attached to it

<img src="img/vue_object.png" width="600px" >

### 6.1 \$el

Refers to our Vue instance in our DOM element

### 6.2 \$data

Refers to our 'data:' definition in our Vue instance.

```
vm.temperature === vm.$data.temperature
```

### 6.3 \$refs

'ref', no standard html but vue, can be used like a html identifier (id="myButton") to select a element. It can be usefull to retrieve the value of a html element, similar like you standard do in html with a 'Queryselector'

```javascript
///  How in standard javascript-html
<h1 id="myText"></h1>
...
/// script
document.querySelector("#myText").innerHTML = "Hello World"

```

```html
/// In Vue with ref
<h1 ref="myText"></h1>
```

```javascript
/// In Vue app.js
vm.$refs.myText.innerText = 'Hello World';
```

### 6.4 Mounting a template

Instead of defining your html element that will be controlled bu Vue, we can also work the other way round. Typical use case is that you don't know yet what to control of the html does not yet exists.

```javascript
var vm1 = new Vue({
  template: '<h1>Hello World!</h1>'
});

vm1.$mount('#app3'); //-> this will input it into your html and will be controlled by Vue.
```

**Or** we can insert the 'Vue controlled code inside any other element. But this is rather uncommon and has some drawbacks.

```javascript
var vm1 = new Vue({
  template: '<h1>Hello World!</h1>'
});

vm1.$mount(); //-> we create it but it is not inserted into html yet.
document.getElementById('app3').appendChild(vm1.$el);
```

### 6.5 Vue Object Lifecycle

    - beforeCreate()
    - created()
    - beforeMount()
    - mounted()
    - beforeUpdate()
    - updated()
    - ....
    - beforeDestroyed()
    - destroyed()

## 7 Real Development Workflow

When building larger applications we face different challeges:

1. **Dependencies:**

Mostly you end up with a lot of code and external libraries that depend of each other and MUST be loaded in the right sequence.

Solution = webpack traces all these dependencies and places the code in one file and in the right order.

2. **Compatibility:**

Some our your code takes advantages of new ES6 features but will not run in all browsers. 'Babel', a transpilar, converts the code into backwards compatible code (ES5).

Solution = Webpack uses Babel to achieve this.

3. **Performance**

In order to gain performance (+/- 30%) files with human readable code can be made smaller, AKA **'minified' or 'uglyfied'**, by removing unnecessary ASCII characters(spaces, tabs,..), using shorter name variables etc. Resulting into a LONG string, unreadable for humans but functional!.

**Solution = Webpack**

<img src="img/webpack.jpeg" width="600px" >

### 7.1 Installing Vue-cli

```
// version 3 = @vue/cli
// version 2 = vue-cli

npm install -g @vue/cli
```

### 7.2 Webpack

```
vue init webpack-simple myProtoType1
```

<img src="img/vue_init.png" width="600px" >
<img src="img/vue_folder.png" width="600px" >

**Remark:** Project name MUST be lowercase.

After running 'npm install'

<img src="img/npm_install.png" width="600px" >

After running 'npm run dev', it will start our development server, that serves **App.vue** in the **index.html**, and launches the browser at 'hhtp://localhost:8080'.

<img src="img/vue_dev_folder.png" width="600px" >

## Components

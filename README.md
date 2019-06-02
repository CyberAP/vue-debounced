# vue-debounced

A simple vue component to debounce value changes

## Example

Debounce value in place with a custom timeout

```html
<Debounced :value="reactiveValue" :timeout="100" @input="onDebouncedChange" />
```

Pass deboucned value down as a scoped slot prop

```html
<Debounced :value="reactiveValue">
  <template v-slot="{ debounced }">
    Debounced value: {{ debounced }}
  </template>
</Debounced>
```

Store and debounce value from scoped slot

```html
<Debounced>
  <template v-slot="{ debounced, value, setValue }">
    <!-- 'value' is set immediate and is not not debounced -->
    <TextInput :value="value" @input="setValue" />
    Debounced value: {{ debounced }}
  </template>
</Debounced>
```

# Usage

Install via npm:

`npm install vue-promised --save`

Pick one of three ways to use it.

## 1. Wrap in your component

Recommended way

```html
<template>
  <Debounced :value="value" :timeout="timeout" @input="$emit('input', $event)">
    <template v-slot="{ debounced, value, setValue }">
      <slot :debounced="debounced" :value="value" :setValue="setValue" />
    </template>
  </Debounced>
</template>

<script>
  import { Debounced } from 'vue-debounced';

  export default {
    name: "MyDebounce",
    components: { Debounced },
    props: ['value', 'timeout']
  }
</script>
```

## 2. Directly as a component

Not recommended for medium and big projects

```html
<template>
  <div class="my-component">
    <Debounced @input="$emit('input', $event)">
      <template v-slot="{ value, setValue }">
        <TextInput :value="value" @input="setValue" />
      </template>
    </Debounced>
  </div>
</template>

<script>
  import { Debounced } from 'vue-debounced';
  import TextInput from '~/components/TextInput.vue';

  export default {
    name: 'MyComponent',
    components: { Debounced, TextInput },
  }
</script>
```

## 3. Use as a global component

Not recommended, only for prototyping

```javascript
// main.js
import Vue from 'vue';
import Debounced from 'vue-debounced';

Vue.use(Debounced);
```

```html
<template>
  <div class="my-component">
    <Debounced @input="$emit('input', $event)">
      <template v-slot="{ value, setValue }">
        <TextInput :value="value" @input="setValue" />
      </template>
    </Debounced>
  </div>
</template>

<script>
  import TextInput from '~/components/TextInput.vue';

  export default {
    name: 'MyComponent',
    components: { TextInput },
  }
</script>
```

# API

## Component

### Properties

#### value

* type: `any`

A reactive value that will be debounced

```html
<Debounced :value="reactiveValue" />
```

#### timeout

* type: `Number`
* default: `250`

Time in milliseconds to debounce value

```html
<Debounced :value="reactiveValue" :timeout="100" @input="onDebouncedInput" />
```

### Events

#### input

Returns debounced value

```html
<Debounced :value="reactiveValue" @input="onReactiveInput" />
```

```html
<!-- @input will emit as soon as the setValue finishes debouncing -->
<Debounced @input="onReactiveInput">
  <template v-slot="{ value, setValue }">
    <TextInput :value="value" @input="setValue" />
  </template>
</Debounced>
```

## Scoped slot (default)

### Properties

#### debounced

Provides debounced value.

```html
<Debounced :value="outerValue">
  <template v-slot="{ debounced }">
    Debounced value: {{ debounced }}
  </template>
</Debounced>
```

```html
<Debounced>
  <template v-slot="{ debounced, setValue }">
    <TextInput @input="setValue" />
    Debounced value: {{ debounced }}
  </template>
</Debounced>
```

```html
<Debounced :value="outerValue">
  <template v-slot="{ debounced, setValue }">
    <TextInput @input="setValue" />
    <!-- inherits debounced changes from both 'outerValue' and 'setValue' -->
    Debounced value: {{ debounced }}
  </template>
</Debounced>
```

#### value

Provides scoped reactive value that inherits changes from the top level value.

```html
<Debounced :value="outerValue">
  <template v-slot="{ value }">
    <!-- Updates as soon as 'outerValue' changes -->
    Immediate value: {{ value }}
  </template>
</Debounced>
```

```html
<Debounced>
  <template v-slot="{ value, setValue }">
    <TextInput :value="value" @input="setValue" />
    <!-- Updates as soon as 'setValue' is inkoved -->
    Immediate value: {{ value }}
  </template>
</Debounced>
```

```html
<Debounced :value="outerValue">
  <template v-slot="{ value, setValue }">
    <TextInput :value="value" @input="setValue" />
    <!-- Updates as soon as 'setValue' is inkoved or 'outerValue' changes -->
    Immediate value: {{ value }}
  </template>
</Debounced>
```

### Methods

#### setValue

Set internal immediate value and trigger debounce

```html
<Debounced>
  <template v-slot="{ debounced, value, setValue }">
    <TextInput :value="value" @input="setValue" />
    Debounced value: {{ debounced }}
  </template>
</Debounced>
```

```html
<Debounced @input="onDebouncedInput">
  <template v-slot="{ setValue }">
    <TextInput @input="setValue" />
  </template>
</Debounced>
```


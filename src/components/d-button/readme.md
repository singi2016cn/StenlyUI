# d-button



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description                 | Type                                                                                   | Default     |
| -------------- | --------------- | --------------------------- | -------------------------------------------------------------------------------------- | ----------- |
| `ariaControls` | `aria-controls` | ARIA 控制的目标元素 ID             | `string`                                                                               | `undefined` |
| `ariaExpanded` | `aria-expanded` | ARIA 展开状态                   | `boolean`                                                                              | `undefined` |
| `ariaHidden`   | `aria-hidden`   | 是否隐藏 ARIA 信息                | `boolean`                                                                              | `false`     |
| `ariaLabel`    | `aria-label`    | ARIA 标签（无障碍访问）              | `string`                                                                               | `undefined` |
| `ariaPressed`  | `aria-pressed`  | ARIA 按下状态                   | `boolean`                                                                              | `undefined` |
| `buttonId`     | `button-id`     | 按钮 ID                       | `string`                                                                               | `undefined` |
| `buttonTitle`  | `button-title`  | 按钮标题（tooltip）               | `string`                                                                               | `undefined` |
| `cssClass`     | `css-class`     | 自定义 CSS 类名                  | `string`                                                                               | `undefined` |
| `disabled`     | `disabled`      | 是否禁用按钮                      | `boolean`                                                                              | `false`     |
| `ellipsis`     | `ellipsis`      | 是否显示省略号                     | `boolean`                                                                              | `false`     |
| `href`         | `href`          | 链接地址（如果提供，将渲染为链接）           | `string`                                                                               | `undefined` |
| `icon`         | `icon`          | 按钮图标（使用图标名称）                | `string`                                                                               | `undefined` |
| `label`        | `label`         | 按钮文本标签                      | `string`                                                                               | `undefined` |
| `loading`      | `loading`       | 是否显示加载状态                    | `boolean`                                                                              | `false`     |
| `preventFocus` | `prevent-focus` | 是否阻止按钮获得焦点                  | `boolean`                                                                              | `false`     |
| `size`         | `size`          | 按钮尺寸                        | `"large" \| "medium" \| "small"`                                                       | `'medium'`  |
| `suffixIcon`   | `suffix-icon`   | 后缀图标（使用图标名称）                | `string`                                                                               | `undefined` |
| `type`         | `type`          | 按钮类型（submit, button, reset） | `"button" \| "reset" \| "submit"`                                                      | `'button'`  |
| `variant`      | `variant`       | 按钮变体样式                      | `"danger" \| "default" \| "flat" \| "link" \| "primary" \| "success" \| "transparent"` | `'default'` |


## Events

| Event      | Description | Type                         |
| ---------- | ----------- | ---------------------------- |
| `dClick`   | 点击事件        | `CustomEvent<MouseEvent>`    |
| `dKeyDown` | 键盘按下事件      | `CustomEvent<KeyboardEvent>` |


## Methods

### `blurButton() => Promise<void>`

失焦按钮

#### Returns

Type: `Promise<void>`



### `focusButton() => Promise<void>`

聚焦按钮

#### Returns

Type: `Promise<void>`




## Slots

| Slot            | Description |
| --------------- | ----------- |
|                 | 按钮内容        |
| `"icon"`        | 按钮图标（前缀）    |
| `"suffix-icon"` | 按钮图标（后缀）    |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*

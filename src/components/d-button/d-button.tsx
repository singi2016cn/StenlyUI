import {
  Component,
  Host,
  h,
  Prop,
  Event,
  EventEmitter,
  Method,
  Element,
} from '@stencil/core';

export type ButtonVariant = 'default' | 'primary' | 'danger' | 'success' | 'flat' | 'transparent' | 'link';
export type ButtonSize = 'small' | 'medium' | 'large';

/**
 * @slot - 按钮内容
 * @slot icon - 按钮图标（前缀）
 * @slot suffix-icon - 按钮图标（后缀）
 */
@Component({
  tag: 'd-button',
  styleUrl: 'd-button.css',
  shadow: true,
})
export class DButton {
  @Element() el: HTMLElement;

  /**
   * 按钮变体样式
   */
  @Prop() variant: ButtonVariant = 'default';

  /**
   * 按钮尺寸
   */
  @Prop() size: ButtonSize = 'medium';

  /**
   * 按钮图标（使用图标名称）
   */
  @Prop() icon?: string;

  /**
   * 后缀图标（使用图标名称）
   */
  @Prop() suffixIcon?: string;

  /**
   * 按钮文本标签
   */
  @Prop() label?: string;

  /**
   * 按钮标题（tooltip）
   */
  @Prop() buttonTitle?: string;

  /**
   * 是否禁用按钮
   */
  @Prop() disabled = false;

  /**
   * 是否显示加载状态
   */
  @Prop() loading = false;

  /**
   * 按钮类型（submit, button, reset）
   */
  @Prop() type: 'button' | 'submit' | 'reset' = 'button';

  /**
   * 链接地址（如果提供，将渲染为链接）
   */
  @Prop() href?: string;

  /**
   * 是否阻止按钮获得焦点
   */
  @Prop() preventFocus = false;

  /**
   * 是否显示省略号
   */
  @Prop() ellipsis = false;

  /**
   * ARIA 标签（无障碍访问）
   */
  @Prop() ariaLabel?: string;

  /**
   * ARIA 展开状态
   */
  @Prop() ariaExpanded?: boolean;

  /**
   * ARIA 按下状态
   */
  @Prop() ariaPressed?: boolean;

  /**
   * ARIA 控制的目标元素 ID
   */
  @Prop() ariaControls?: string;

  /**
   * 是否隐藏 ARIA 信息
   */
  @Prop() ariaHidden = false;

  /**
   * 自定义 CSS 类名
   */
  @Prop() cssClass?: string;

  /**
   * 按钮 ID
   */
  @Prop() buttonId?: string;

  /**
   * 点击事件
   */
  @Event() dClick: EventEmitter<MouseEvent>;

  /**
   * 键盘按下事件
   */
  @Event() dKeyDown: EventEmitter<KeyboardEvent>;

  private buttonRef?: HTMLButtonElement | HTMLAnchorElement;

  /**
   * 聚焦按钮
   */
  @Method()
  async focusButton() {
    this.buttonRef?.focus();
  }

  /**
   * 失焦按钮
   */
  @Method()
  async blurButton() {
    this.buttonRef?.blur();
  }

  private handleClick = (event: MouseEvent) => {
    if (this.disabled || this.loading) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.dClick.emit(event);
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    if (this.disabled || this.loading) {
      return;
    }
    this.dKeyDown.emit(event);
  };

  private handleFocus = () => {
    // Focus state tracking can be added if needed
  };

  private handleBlur = () => {
    // Blur state tracking can be added if needed
  };

  private handleMouseDown = (event: MouseEvent) => {
    if (this.preventFocus) {
      event.preventDefault();
    }
  };

  /**
   * 获取按钮类名
   */
  private getClassNames(): string {
    const classes = [
      'btn',
      `btn-${this.variant}`,
      `btn-${this.size}`,
      this.cssClass || '',
    ];

    // 图标按钮
    if (this.icon && !this.label && !this.loading) {
      classes.push('btn-icon');
    }

    // 仅图标文本按钮
    if (this.icon && this.label) {
      classes.push('btn-icon-text');
    }

    // 无文本按钮
    if (!this.label && !this.icon && !this.loading) {
      classes.push('no-text');
    }

    // 加载状态
    if (this.loading) {
      classes.push('is-loading');
    }

    // 禁用状态
    if (this.disabled || this.loading) {
      classes.push('disabled');
    }

    return classes.filter(Boolean).join(' ');
  }

  /**
   * 渲染图标
   */
  private renderIcon(iconName: string, isSuffix = false) {
    const iconClasses = isSuffix ? 'd-button__suffix-icon' : '';
    return (
      <span class={iconClasses}>
        <d-icon name={iconName}></d-icon>
      </span>
    );
  }

  /**
   * 渲染加载图标
   */
  private renderLoadingIcon() {
    return (
      <span class="loading-container">
        <d-icon name="spinner" class="loading-icon"></d-icon>
      </span>
    );
  }

  /**
   * 渲染按钮内容
   */
  private renderContent() {
    const content: any[] = [];

    // 加载图标
    if (this.loading) {
      content.push(this.renderLoadingIcon());
    } else if (this.icon) {
      content.push(this.renderIcon(this.icon));
    }

    // 标签文本
    if (this.label) {
      content.push(
        <span class="d-button-label">
          {this.label}
          {this.ellipsis && '…'}
        </span>
      );
    } else if (!this.icon && !this.loading) {
      // 零宽空格，确保仅图标按钮的高度与普通按钮一致
      content.push('\u200b');
    }

    // slot 内容
    content.push(<slot></slot>);

    // 后缀图标
    if (this.suffixIcon) {
      content.push(
        <span class="d-button__suffix-icon">
          <d-icon name={this.suffixIcon}></d-icon>
        </span>
      );
    }

    return content;
  }

  render() {
    const classNames = this.getClassNames();
    const isLink = !!this.href;
    const isDisabled = this.disabled || this.loading;

    const commonProps = {
      class: classNames,
      title: this.buttonTitle,
      'aria-label': this.ariaLabel || this.buttonTitle,
      'aria-expanded': this.ariaExpanded !== undefined ? String(this.ariaExpanded) : undefined,
      'aria-pressed': this.ariaPressed !== undefined ? String(this.ariaPressed) : undefined,
      'aria-controls': this.ariaControls,
      'aria-hidden': this.ariaHidden ? 'true' : undefined,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      onMouseDown: this.handleMouseDown,
    };

    if (isLink) {
      return (
        <Host>
          <a
            ref={(el) => (this.buttonRef = el!)}
            href={isDisabled ? undefined : this.href}
            {...commonProps}
            onClick={this.handleClick}
            onKeyDown={this.handleKeyDown}
            tabindex={isDisabled ? '-1' : undefined}
          >
            {this.renderContent()}
          </a>
        </Host>
      );
    }

    return (
      <Host>
        <button
          ref={(el) => (this.buttonRef = el!)}
          type={this.type}
          disabled={isDisabled}
          id={this.buttonId}
          {...commonProps}
          onClick={this.handleClick}
          onKeyDown={this.handleKeyDown}
        >
          {this.renderContent()}
        </button>
      </Host>
    );
  }
}

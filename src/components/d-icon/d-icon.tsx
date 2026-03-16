import { Component, Host, h, Prop, Element, State, Watch } from '@stencil/core';
import { getIconSvg, registerIcon } from '../../utils/icon-library';

export type IconSize = 'sm' | 'md' | 'lg' | 'xl';
export type IconColor = 'default' | 'primary' | 'secondary' | 'tertiary' | 'success' | 'danger' | 'warning';

/**
 * @slot - 图标内容（可选，用于自定义 SVG）
 */
@Component({
  tag: 'd-icon',
  styleUrl: 'd-icon.css',
  shadow: true,
})
export class DIcon {
  @Element() el: HTMLElement;

  /**
   * 图标名称
   */
  @Prop() name = '';

  /**
   * 图标尺寸
   */
  @Prop() size: IconSize = 'md';

  /**
   * 图标颜色
   */
  @Prop() color: IconColor = 'default';

  /**
   * 图标标题（用于无障碍访问）
   */
  @Prop() iconTitle?: string;

  /**
   * 是否旋转图标
   */
  @Prop() spin = false;

  /**
   * 是否翻转图标（水平）
   */
  @Prop() flipH = false;

  /**
   * 是否翻转图标（垂直）
   */
  @Prop() flipV = false;

  /**
   * 旋转角度（90 的倍数：90, 180, 270）
   */
  @Prop() rotate?: 90 | 180 | 270;

  /**
   * 是否隐藏图标（用于无障碍）
   */
  @Prop() dAriaHidden = true;

  /**
   * 自定义 CSS 类名
   */
  @Prop() cssClass?: string;

  @State() private iconSvg: string | null = null;
  @State() private iconLoaded = false;

  private loadedIcons = new Map<string, string>();

  /**
   * 注册自定义图标
   */
  static registerIcon(name: string, svgContent: string) {
    registerIcon(name, svgContent);
  }

  /**
   * 批量注册图标
   */
  static registerIcons(icons: Record<string, string>) {
    Object.entries(icons).forEach(([name, svg]) => {
      registerIcon(name, svg);
    });
  }

  componentWillLoad() {
    this.loadIcon();
  }

  @Watch('name')
  onNameChange() {
    this.loadIcon();
  }

  private loadIcon() {
    if (!this.name) {
      this.iconSvg = null;
      this.iconLoaded = false;
      return;
    }

    // 检查是否已缓存
    if (this.loadedIcons.has(this.name)) {
      this.iconSvg = this.loadedIcons.get(this.name)!;
      this.iconLoaded = true;
      return;
    }

    // 获取图标 SVG
    const svg = getIconSvg(this.name);
    if (svg) {
      this.loadedIcons.set(this.name, svg);
      this.iconSvg = svg;
      this.iconLoaded = true;
    } else {
      // 尝试使用内联 SVG 作为后备
      this.iconSvg = this.getFallbackSvg();
      this.iconLoaded = true;
    }
  }

  /**
   * 获取后备 SVG（当图标未注册时）
   */
  private getFallbackSvg(): string {
    // 返回一个默认的问号图标
    return `<svg viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V400a16 16 0 0 0 32 0V336h24c13.3 0 24-10.7 24-24V264c0-57.5-42.5-105-97.8-112.6c-6.4-.9-12.8-1.4-19.2-1.4c-60.9 0-112 42.3-125.7 99.1c-3 12.4 4.6 25.2 17 28.2s25.2-4.6 28.2-17c8.6-35.6 40.3-62.3 78.5-62.3c4.3 0 8.6.3 12.8.9c32.5 4.5 56.8 31.8 56.8 64.8V312c0 13.3-10.7 24-24 24H216c-13.3 0-24 10.7-24 24s10.7 24 24 24zm-40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>`;
  }

  /**
   * 获取图标类名
   */
  private getClassNames(): string {
    const classes = ['d-icon', `d-icon-${this.name || 'blank'}`, `d-icon-${this.size}`, `d-icon-${this.color}`, this.cssClass || ''];

    if (this.spin) {
      classes.push('d-icon-spin');
    }

    if (this.flipH) {
      classes.push('d-icon-flip-h');
    }

    if (this.flipV) {
      classes.push('d-icon-flip-v');
    }

    if (this.rotate) {
      classes.push(`d-icon-rotate-${this.rotate}`);
    }

    return classes.filter(Boolean).join(' ');
  }

  render() {
    const classNames = this.getClassNames();

    return (
      <Host>
        <span
          class={classNames}
          role={this.dAriaHidden ? undefined : 'img'}
          aria-label={this.dAriaHidden ? undefined : this.iconTitle || this.name}
          aria-hidden={this.dAriaHidden ? 'true' : undefined}
          title={this.iconTitle}
        >
          {this.iconLoaded && this.iconSvg ? <span class="d-icon-svg" innerHTML={this.iconSvg}></span> : <slot></slot>}
        </span>
      </Host>
    );
  }
}

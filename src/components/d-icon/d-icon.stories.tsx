import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';

const meta: Meta = {
  title: 'Components/DIcon',
  component: 'd-icon',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    name: {
      control: 'text',
      description: '图标名称',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: '图标尺寸',
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'tertiary', 'success', 'danger', 'warning'],
      description: '图标颜色',
    },
    iconTitle: {
      control: 'text',
      description: '图标标题（用于无障碍访问）',
    },
    spin: {
      control: 'boolean',
      description: '是否旋转图标',
    },
    flipH: {
      control: 'boolean',
      description: '是否水平翻转图标',
    },
    flipV: {
      control: 'boolean',
      description: '是否垂直翻转图标',
    },
    rotate: {
      control: 'select',
      options: [90, 180, 270],
      description: '旋转角度（90 的倍数）',
    },
    ariaHidden: {
      control: 'boolean',
      description: '是否隐藏图标（用于无障碍）',
    },
    cssClass: {
      control: 'text',
      description: '自定义 CSS 类名',
    },
  },
  args: {
    name: 'search',
    size: 'md',
    color: 'default',
    spin: false,
    flipH: false,
    flipV: false,
    ariaHidden: true,
  },
};

export default meta;

type Story = StoryObj;

/**
 * 默认图标
 */
export const Primary: Story = {
  args: {
    name: 'search',
  },
};

/**
 * 不同尺寸的图标展示
 */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <d-icon name="search" size="sm"></d-icon>
      <d-icon name="search" size="md"></d-icon>
      <d-icon name="search" size="lg"></d-icon>
      <d-icon name="search" size="xl"></d-icon>
    </div>
  ),
};

/**
 * 不同颜色的图标展示
 */
export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <d-icon name="circle" color="default"></d-icon>
      <d-icon name="circle" color="primary"></d-icon>
      <d-icon name="circle" color="secondary"></d-icon>
      <d-icon name="circle" color="tertiary"></d-icon>
      <d-icon name="circle" color="success"></d-icon>
      <d-icon name="circle" color="danger"></d-icon>
      <d-icon name="circle" color="warning"></d-icon>
    </div>
  ),
};

/**
 * 旋转动画图标
 */
export const Spin: Story = {
  args: {
    name: 'spinner',
    spin: true,
  },
};

/**
 * 水平翻转图标
 */
export const FlipHorizontal: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <d-icon name="arrow-right" color="primary"></d-icon>
      <span>默认</span>
      <d-icon name="arrow-right" color="primary" flipH></d-icon>
      <span>水平翻转</span>
    </div>
  ),
};

/**
 * 垂直翻转图标
 */
export const FlipVertical: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <d-icon name="arrow-up" color="primary"></d-icon>
      <span>默认</span>
      <d-icon name="arrow-up" color="primary" flipV></d-icon>
      <span>垂直翻转</span>
    </div>
  ),
};

/**
 * 旋转角度展示
 */
export const Rotate: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <d-icon name="arrow-up" color="primary"></d-icon>
        <div>0°</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <d-icon name="arrow-up" color="primary" rotate={90}></d-icon>
        <div>90°</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <d-icon name="arrow-up" color="primary" rotate={180}></d-icon>
        <div>180°</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <d-icon name="arrow-up" color="primary" rotate={270}></d-icon>
        <div>270°</div>
      </div>
    </div>
  ),
};

/**
 * 常用图标集合展示
 */
export const CommonIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <d-icon name="search" iconTitle="搜索"></d-icon>
      <d-icon name="home" iconTitle="首页"></d-icon>
      <d-icon name="user" iconTitle="用户"></d-icon>
      <d-icon name="settings" iconTitle="设置"></d-icon>
      <d-icon name="bell" iconTitle="通知"></d-icon>
      <d-icon name="heart" iconTitle="收藏"></d-icon>
      <d-icon name="star" iconTitle="星标"></d-icon>
      <d-icon name="bookmark" iconTitle="书签"></d-icon>
      <d-icon name="calendar" iconTitle="日历"></d-icon>
      <d-icon name="clock" iconTitle="时间"></d-icon>
      <d-icon name="check" iconTitle="确认"></d-icon>
      <d-icon name="close" iconTitle="关闭"></d-icon>
      <d-icon name="plus" iconTitle="添加"></d-icon>
      <d-icon name="minus" iconTitle="减少"></d-icon>
      <d-icon name="edit" iconTitle="编辑"></d-icon>
      <d-icon name="trash" iconTitle="删除"></d-icon>
      <d-icon name="download" iconTitle="下载"></d-icon>
      <d-icon name="upload" iconTitle="上传"></d-icon>
      <d-icon name="share" iconTitle="分享"></d-icon>
      <d-icon name="link" iconTitle="链接"></d-icon>
    </div>
  ),
};

/**
 * 带标题的图标（无障碍支持）
 */
export const WithTitle: Story = {
  args: {
    name: 'info',
    iconTitle: '信息提示',
    ariaHidden: false,
  },
};

/**
 * 组合变换效果
 */
export const CombinedTransforms: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <d-icon name="arrow-right" color="primary" size="lg"></d-icon>
        <div>默认</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <d-icon name="arrow-right" color="primary" size="lg" flipH rotate={90}></d-icon>
        <div>翻转 + 旋转</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <d-icon name="arrow-right" color="primary" size="lg" spin></d-icon>
        <div>旋转动画</div>
      </div>
    </div>
  ),
};

/**
 * 导航箭头图标组
 */
export const NavigationArrows: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <d-icon name="arrow-left" size="lg" color="primary"></d-icon>
      <d-icon name="arrow-right" size="lg" color="primary"></d-icon>
      <d-icon name="arrow-up" size="lg" color="primary"></d-icon>
      <d-icon name="arrow-down" size="lg" color="primary"></d-icon>
    </div>
  ),
};

/**
 * 状态图标组
 */
export const StatusIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <d-icon name="check-circle" color="success" size="lg"></d-icon>
      <d-icon name="times-circle" color="danger" size="lg"></d-icon>
      <d-icon name="exclamation-circle" color="warning" size="lg"></d-icon>
      <d-icon name="info-circle" color="primary" size="lg"></d-icon>
    </div>
  ),
};

/**
 * 操作图标组
 */
export const ActionIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <d-icon name="search" size="lg"></d-icon>
      <d-icon name="filter" size="lg"></d-icon>
      <d-icon name="sort" size="lg"></d-icon>
      <d-icon name="refresh" size="lg"></d-icon>
      <d-icon name="download" size="lg"></d-icon>
      <d-icon name="upload" size="lg"></d-icon>
      <d-icon name="print" size="lg"></d-icon>
      <d-icon name="copy" size="lg"></d-icon>
    </div>
  ),
};

/**
 * 文件类型图标组
 */
export const FileIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <d-icon name="file" size="lg"></d-icon>
      <d-icon name="file-text" size="lg"></d-icon>
      <d-icon name="file-image" size="lg"></d-icon>
      <d-icon name="file-code" size="lg"></d-icon>
      <d-icon name="folder" size="lg"></d-icon>
      <d-icon name="folder-open" size="lg"></d-icon>
    </div>
  ),
};

/**
 * 社交媒体图标组
 */
export const SocialIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <d-icon name="github" size="lg"></d-icon>
      <d-icon name="twitter" size="lg"></d-icon>
      <d-icon name="facebook" size="lg"></d-icon>
      <d-icon name="linkedin" size="lg"></d-icon>
      <d-icon name="youtube" size="lg"></d-icon>
      <d-icon name="instagram" size="lg"></d-icon>
    </div>
  ),
};

/**
 * 自定义 CSS 类名
 */
export const CustomClass: Story = {
  args: {
    name: 'star',
    size: 'lg',
    color: 'warning',
    cssClass: 'custom-icon',
  },
};

/**
 * 内联 SVG 后备（未注册的图标名称）
 */
export const FallbackIcon: Story = {
  args: {
    name: 'unknown-icon-name',
    size: 'lg',
  },
};

/**
 * 空图标名称
 */
export const EmptyName: Story = {
  args: {
    name: '',
    size: 'md',
  },
};

/**
 * 无障碍完整示例
 */
export const Accessibility: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      {/* 装饰性图标 - 对屏幕阅读器隐藏 */}
      <d-icon name="check" color="success" ariaHidden={true}></d-icon>

      {/* 有意义的图标 - 对屏幕阅读器可见 */}
      <d-icon
        name="info"
        color="primary"
        ariaHidden={false}
        iconTitle="重要信息"
      ></d-icon>

      {/* 带角色描述的图标 */}
      <d-icon
        name="warning"
        color="warning"
        ariaHidden={false}
        iconTitle="警告提示"
      ></d-icon>
    </div>
  ),
};

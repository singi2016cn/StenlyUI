import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';

const meta: Meta = {
  title: 'Components/DButton',
  component: 'd-button',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'danger', 'success', 'flat', 'transparent', 'link'],
      description: '按钮变体样式',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '按钮尺寸',
    },
    icon: {
      control: 'text',
      description: '前缀图标名称',
    },
    suffixIcon: {
      control: 'text',
      description: '后缀图标名称',
    },
    label: {
      control: 'text',
      description: '按钮文本标签',
    },
    buttonTitle: {
      control: 'text',
      description: '按钮标题（tooltip）',
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用',
    },
    loading: {
      control: 'boolean',
      description: '是否显示加载状态',
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: '按钮类型',
    },
    href: {
      control: 'text',
      description: '链接地址（渲染为 <a> 标签）',
    },
    preventFocus: {
      control: 'boolean',
      description: '是否阻止获得焦点',
    },
    ellipsis: {
      control: 'boolean',
      description: '是否显示省略号',
    },
    ariaLabel: {
      control: 'text',
      description: 'ARIA 标签',
    },
    ariaExpanded: {
      control: 'boolean',
      description: 'ARIA 展开状态',
    },
    ariaPressed: {
      control: 'boolean',
      description: 'ARIA 按下状态',
    },
    ariaControls: {
      control: 'text',
      description: 'ARIA 控制的目标元素 ID',
    },
    cssClass: {
      control: 'text',
      description: '自定义 CSS 类名',
    },
    buttonId: {
      control: 'text',
      description: '按钮 ID',
    },
  },
  args: {
    variant: 'default',
    size: 'medium',
    label: '按钮',
    disabled: false,
    loading: false,
    type: 'button',
  },
};

export default meta;

type Story = StoryObj;

/**
 * 默认按钮样式
 */
export const Primary: Story = {
  args: {
    variant: 'default',
    label: '默认按钮',
  },
};

/**
 * 主要操作按钮（用于重要操作）
 */
export const PrimaryVariant: Story = {
  args: {
    variant: 'primary',
    label: '主要按钮',
  },
};

/**
 * 危险操作按钮（用于删除等危险操作）
 */
export const Danger: Story = {
  args: {
    variant: 'danger',
    label: '危险按钮',
  },
};

/**
 * 成功操作按钮（用于确认成功操作）
 */
export const Success: Story = {
  args: {
    variant: 'success',
    label: '成功按钮',
  },
};

/**
 * 扁平样式按钮（用于次要操作）
 */
export const Flat: Story = {
  args: {
    variant: 'flat',
    label: '扁平按钮',
  },
};

/**
 * 透明样式按钮（用于工具栏等场景）
 */
export const Transparent: Story = {
  args: {
    variant: 'transparent',
    label: '透明按钮',
  },
};

/**
 * 链接样式按钮（外观类似链接）
 */
export const Link: Story = {
  args: {
    variant: 'link',
    label: '链接按钮',
  },
};

/**
 * 不同尺寸的按钮展示
 */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <d-button size="small" label="小按钮"></d-button>
      <d-button size="medium" label="中按钮"></d-button>
      <d-button size="large" label="大按钮"></d-button>
    </div>
  ),
};

/**
 * 带图标的按钮
 */
export const WithIcon: Story = {
  args: {
    icon: 'search',
    label: '搜索',
  },
};

/**
 * 仅图标按钮（无文本）
 */
export const IconOnly: Story = {
  args: {
    icon: 'cog',
    ariaLabel: '设置',
    buttonTitle: '设置',
  },
};

/**
 * 带后缀图标的按钮（用于下拉菜单等）
 */
export const WithSuffixIcon: Story = {
  args: {
    label: '更多选项',
    suffixIcon: 'chevron-down',
  },
};

/**
 * 图标 + 文本 + 后缀图标
 */
export const WithBothIcons: Story = {
  args: {
    icon: 'star',
    label: '收藏',
    suffixIcon: 'chevron-down',
  },
};

/**
 * 加载状态按钮
 */
export const Loading: Story = {
  args: {
    loading: true,
    label: '加载中...',
  },
};

/**
 * 加载状态的图标按钮
 */
export const LoadingWithIcon: Story = {
  args: {
    icon: 'spinner',
    loading: true,
    label: '处理中...',
  },
};

/**
 * 禁用状态按钮
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    label: '不可用',
  },
};

/**
 * 所有变体的禁用状态展示
 */
export const DisabledAllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <d-button variant="default" disabled label="默认"></d-button>
      <d-button variant="primary" disabled label="主要"></d-button>
      <d-button variant="danger" disabled label="危险"></d-button>
      <d-button variant="success" disabled label="成功"></d-button>
      <d-button variant="flat" disabled label="扁平"></d-button>
      <d-button variant="transparent" disabled label="透明"></d-button>
      <d-button variant="link" disabled label="链接"></d-button>
    </div>
  ),
};

/**
 * 链接模式按钮
 */
export const AsLink: Story = {
  args: {
    href: 'https://example.com',
    variant: 'primary',
    label: '访问链接',
  },
};

/**
 * 所有变体展示
 */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <d-button variant="default" label="默认"></d-button>
      <d-button variant="primary" label="主要"></d-button>
      <d-button variant="danger" label="危险"></d-button>
      <d-button variant="success" label="成功"></d-button>
      <d-button variant="flat" label="扁平"></d-button>
      <d-button variant="transparent" label="透明"></d-button>
      <d-button variant="link" label="链接"></d-button>
    </div>
  ),
};

/**
 * 工具栏按钮组（仅图标）
 */
export const ToolbarGroup: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '4px' }}>
      <d-button icon="bold" ariaLabel="加粗" buttonTitle="加粗"></d-button>
      <d-button icon="italic" ariaLabel="斜体" buttonTitle="斜体"></d-button>
      <d-button icon="underline" ariaLabel="下划线" buttonTitle="下划线"></d-button>
      <d-button icon="strikethrough" ariaLabel="删除线" buttonTitle="删除线"></d-button>
    </div>
  ),
};

/**
 * 操作按钮组
 */
export const ActionGroup: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px' }}>
      <d-button variant="primary" label="确认"></d-button>
      <d-button variant="default" label="取消"></d-button>
      <d-button variant="danger" label="删除"></d-button>
    </div>
  ),
};

/**
 * 带省略号的长文本按钮
 */
export const WithEllipsis: Story = {
  render: () => (
    <div style={{ maxWidth: '150px' }}>
      <d-button label="这是一个非常长的按钮文本" ellipsis></d-button>
    </div>
  ),
};

/**
 * 表单提交按钮
 */
export const FormButtons: Story = {
  render: () => (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        alert('表单提交！');
      }}
      style={{ display: 'flex', gap: '12px' }}
    >
      <d-button type="submit" variant="primary" label="提交"></d-button>
      <d-button type="reset" variant="flat" label="重置"></d-button>
    </form>
  ),
};

/**
 * 无障碍支持示例
 */
export const Accessibility: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      {/* 图标按钮 - 提供 aria-label */}
      <d-button icon="cog" ariaLabel="设置" buttonTitle="设置"></d-button>

      {/* 带展开状态的按钮 */}
      <d-button
        label="菜单"
        suffixIcon="chevron-down"
        ariaExpanded={false}
        ariaControls="menu-content"
      ></d-button>

      {/* 带按下状态的切换按钮 */}
      <d-button icon="star" ariaPressed={true} ariaLabel="已收藏"></d-button>
    </div>
  ),
};

/**
 * 自定义样式（通过 CSS 变量）
 */
export const CustomStyles: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px' }}>
      <d-button
        variant="primary"
        label="自定义颜色"
        style={{
          '--d-button-primary-bg-color': '#8b5cf6',
          '--d-button-primary-bg-color--hover': '#7c3aed',
        } as any}
      ></d-button>
      <d-button
        variant="danger"
        label="圆角按钮"
        style={{ '--d-button-border-radius': '20px' } as any}
      ></d-button>
    </div>
  ),
};

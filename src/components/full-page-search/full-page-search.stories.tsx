import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';

const meta: Meta = {
  title: 'Components/FullPageSearch',
  component: 'full-page-search',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    searchTerm: {
      control: 'text',
      description: '搜索关键词',
    },
    searchType: {
      control: 'select',
      options: ['default', 'posts', 'topics', 'users', 'categories', 'tags'],
      description: '搜索类型',
    },
    sortOrder: {
      control: 'select',
      options: ['latest', 'top', 'relevance'],
      description: '排序方式',
    },
    currentPage: {
      control: 'number',
      description: '当前页码',
    },
    pageSize: {
      control: 'number',
      description: '每页数量',
    },
    minLength: {
      control: 'number',
      description: '最小搜索长度',
    },
    enableBulkSelect: {
      control: 'boolean',
      description: '是否启用批量选择',
    },
    showAdvancedOptions: {
      control: 'boolean',
      description: '是否显示高级选项',
    },
    showResultCount: {
      control: 'boolean',
      description: '是否显示结果计数',
    },
    searching: {
      control: 'boolean',
      description: '是否正在搜索',
    },
    loadingMore: {
      control: 'boolean',
      description: '是否正在加载更多',
    },
    error: {
      control: 'text',
      description: '错误信息',
    },
  },
  args: {
    searchTerm: '',
    searchType: 'default',
    sortOrder: 'relevance',
    currentPage: 1,
    pageSize: 20,
    minLength: 3,
    enableBulkSelect: false,
    showAdvancedOptions: false,
    showResultCount: true,
    searching: false,
    loadingMore: false,
    error: null,
  },
};

export default meta;

type Story = StoryObj;

/**
 * 基础搜索页面
 */
export const Primary: Story = {
  args: {
    searchTerm: '',
    minLength: 3,
  },
};

/**
 * 带高级选项的搜索
 */
export const WithAdvancedOptions: Story = {
  args: {
    showAdvancedOptions: true,
    searchType: 'default',
    sortOrder: 'relevance',
  },
};

/**
 * 带批量选择功能的搜索
 */
export const WithBulkSelect: Story = {
  args: {
    enableBulkSelect: true,
    showAdvancedOptions: true,
  },
};

/**
 * 搜索中状态
 */
export const Searching: Story = {
  args: {
    searchTerm: 'React',
    searching: true,
  },
  render: (args) => (
    <full-page-search
      search-term={args.searchTerm}
      searching={args.searching}
    >
    </full-page-search>
  ),
};

/**
 * 有搜索结果的页面
 */
export const WithResults: Story = {
  render: () => {
    const mockResults = [
      {
        id: 1,
        type: 'topic' as const,
        title: '如何在 React 中使用 TypeScript？',
        excerpt: '我想在 React 项目中使用 TypeScript，但是不知道如何开始。有没有什么好的教程或者最佳实践？',
        url: '/t/topic/1',
        username: '张三',
        categoryName: '技术讨论',
        tags: ['react', 'typescript'],
        createdAt: '2024-01-15T10:30:00Z',
      },
      {
        id: 2,
        type: 'topic' as const,
        title: 'React Hooks 最佳实践',
        excerpt: '分享一些 React Hooks 的使用技巧和最佳实践，包括 useState、useEffect、useMemo 等。',
        url: '/t/topic/2',
        username: '李四',
        categoryName: '前端开发',
        tags: ['react', 'hooks'],
        likes: 25,
        createdAt: '2024-01-14T15:20:00Z',
      },
      {
        id: 3,
        type: 'post' as const,
        title: 'Re: 如何在 React 中使用 TypeScript？',
        excerpt: '推荐官方文档，还有 TypeScript 的 React 模板项目 create-react-app --template typescript',
        url: '/t/topic/1/3',
        username: '王五',
        categoryName: '技术讨论',
        createdAt: '2024-01-15T11:00:00Z',
      },
      {
        id: 4,
        type: 'topic' as const,
        title: 'React 性能优化指南',
        excerpt: '详细介绍 React 应用性能优化的各种方法，包括代码分割、懒加载、memo 等。',
        url: '/t/topic/4',
        username: '赵六',
        categoryName: '性能优化',
        tags: ['react', 'performance'],
        likes: 42,
        createdAt: '2024-01-13T09:15:00Z',
      },
    ];

    setTimeout(() => {
      const search = document.querySelector('full-page-search');
      if (search) {
        (search as any).results = mockResults;
        (search as any).totalResults = 4;
        (search as any).hasSearched = true;
      }
    }, 100);

    return (
      <full-page-search
        search-term="React"
        show-result-count={true}
      >
      </full-page-search>
    );
  },
};

/**
 * 带分类/标签/用户结果的搜索
 */
export const WithAllResultTypes: Story = {
  render: () => {
    const mockResults = [
      {
        id: 1,
        type: 'topic' as const,
        title: 'JavaScript 学习资源汇总',
        excerpt: '收集了一些 JavaScript 学习的优质资源，包括书籍、教程、视频等。',
        url: '/t/topic/1',
        username: '前端达人',
        categoryName: '学习资源',
        tags: ['javascript', 'learning'],
        createdAt: '2024-01-15T10:30:00Z',
      },
      {
        id: 2,
        type: 'topic' as const,
        title: 'TypeScript 入门教程',
        excerpt: '从零开始学习 TypeScript，包括类型系统、接口、泛型等内容。',
        url: '/t/topic/2',
        username: 'TS 专家',
        categoryName: '教程',
        tags: ['typescript', 'tutorial'],
        createdAt: '2024-01-14T15:20:00Z',
      },
    ];

    const mockCategories = [
      { id: 101, type: 'category' as const, name: '技术讨论', url: '/c/tech', title: '技术讨论' },
      { id: 102, type: 'category' as const, name: '前端开发', url: '/c/frontend', title: '前端开发' },
    ];

    const mockTags = [
      { id: 201, type: 'tag' as const, title: 'JavaScript', url: '/t/javascript' },
      { id: 202, type: 'tag' as const, title: 'TypeScript', url: '/t/typescript' },
      { id: 203, type: 'tag' as const, title: 'React', url: '/t/react' },
    ];

    const mockUsers = [
      {
        id: 301,
        type: 'user' as const,
        title: '前端达人',
        username: 'frontend-master',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=frontend-master',
        url: '/u/frontend-master',
      },
      {
        id: 302,
        type: 'user' as const,
        title: 'TS 专家',
        username: 'ts-expert',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ts-expert',
        url: '/u/ts-expert',
      },
    ];

    setTimeout(() => {
      const search = document.querySelector('full-page-search');
      if (search) {
        (search as any).results = mockResults;
        (search as any).totalResults = 2;
        (search as any).categories = mockCategories;
        (search as any).tags = mockTags;
        (search as any).users = mockUsers;
        (search as any).hasSearched = true;
      }
    }, 100);

    return (
      <full-page-search
        search-term="JavaScript"
        show-advanced-options={true}
        show-result-count={true}
      >
      </full-page-search>
    );
  },
};

/**
 * 无结果状态
 */
export const NoResults: Story = {
  render: () => {
    setTimeout(() => {
      const search = document.querySelector('full-page-search');
      if (search) {
        (search as any).results = [];
        (search as any).totalResults = 0;
        (search as any).hasSearched = true;
      }
    }, 100);

    return (
      <full-page-search
        search-term="不存在的关键词 xyz123"
      >
      </full-page-search>
    );
  },
};

/**
 * 错误状态
 */
export const ErrorState: Story = {
  render: () => {
    setTimeout(() => {
      const search = document.querySelector('full-page-search');
      if (search) {
        (search as any).error = '搜索服务暂时不可用，请稍后重试';
        (search as any).hasSearched = true;
      }
    }, 100);

    return (
      <full-page-search
        search-term="test"
      >
      </full-page-search>
    );
  },
};

/**
 * 带搜索上下文的搜索（在分类内搜索）
 */
export const WithSearchContext: Story = {
  args: {
    searchContext: {
      type: 'category',
      id: 1,
      name: '技术讨论',
    },
  },
  render: (args) => (
    <full-page-search
      search-context={JSON.stringify(args.searchContext)}
      search-term=""
    >
    </full-page-search>
  ),
};

/**
 * 自定义无结果提示
 */
export const CustomNoResults: Story = {
  render: () => {
    setTimeout(() => {
      const search = document.querySelector('full-page-search');
      if (search) {
        (search as any).results = [];
        (search as any).totalResults = 0;
        (search as any).hasSearched = true;
      }
    }, 100);

    return (
      <full-page-search search-term="找不到内容">
        <template slot="no-results">
          <div style={{ padding: '2em', textAlign: 'center' }}>
            <d-icon name="search" style={{ fontSize: '48px', color: '#ccc' }}></d-icon>
            <h3 style={{ margin: '1em 0', color: '#333' }}>没有找到相关内容</h3>
            <p style={{ color: '#666' }}>试试以下建议：</p>
            <ul style={{ textAlign: 'left', display: 'inline-block', color: '#666' }}>
              <li>检查拼写是否正确</li>
              <li>尝试更短的关键词</li>
              <li>使用更通用的搜索词</li>
            </ul>
          </div>
        </template>
      </full-page-search>
    );
  },
};

/**
 * 不同搜索类型
 */
export const SearchTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2em' }}>
      <div>
        <h3>全部搜索</h3>
        <full-page-search search-type="default"></full-page-search>
      </div>
      <div>
        <h3>帖子搜索</h3>
        <full-page-search search-type="posts"></full-page-search>
      </div>
      <div>
        <h3>主题搜索</h3>
        <full-page-search search-type="topics"></full-page-search>
      </div>
      <div>
        <h3>用户搜索</h3>
        <full-page-search search-type="users"></full-page-search>
      </div>
    </div>
  ),
};

/**
 * 带自定义 API 的搜索
 */
export const WithCustomApi: Story = {
  args: {
    searchApiUrl: '/api/search',
    pageSize: 10,
  },
  render: (args) => (
    <full-page-search
      search-api-url={args.searchApiUrl}
      page-size={args.pageSize}
      search-headers={JSON.stringify({
        'Content-Type': 'application/json',
      })}
    >
    </full-page-search>
  ),
};

/**
 * 键盘快捷键演示
 */
export const KeyboardShortcuts: Story = {
  render: () => {
    setTimeout(() => {
      document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
          e.preventDefault();
          const search = document.querySelector('full-page-search') as any;
          search?.focusInput();
        }
      });
    }, 100);

    return (
      <full-page-search>
      </full-page-search>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '按 Ctrl+K 或 Cmd+K 聚焦搜索框',
      },
    },
  },
};

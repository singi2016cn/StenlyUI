import {
  Component,
  Host,
  h,
  Prop,
  Event,
  EventEmitter,
  State,
  Method,
  Element,
  Watch,
} from '@stencil/core';

export type SearchType = 'default' | 'posts' | 'topics' | 'users' | 'categories' | 'tags';
export type SortOrder = 'latest' | 'top' | 'relevance';

export interface SearchResult {
  id: string | number;
  type: 'post' | 'topic' | 'user' | 'category' | 'tag';
  title?: string;
  name?: string;
  excerpt?: string;
  url?: string;
  avatarUrl?: string;
  username?: string;
  categoryName?: string;
  tags?: string[];
  likes?: number;
  comments?: number;
  createdAt?: string;
}

export interface SearchResponse {
  results: SearchResult[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
  categories?: SearchResult[];
  tags?: SearchResult[];
  users?: SearchResult[];
}

/**
 * @slot search-input - 搜索输入框区域
 * @slot search-options - 高级搜索选项
 * @slot search-results - 搜索结果区域
 * @slot no-results - 无结果时显示的内容
 * @slot loading - 加载状态显示的内容
 */
@Component({
  tag: 'full-page-search',
  styleUrl: 'full-page-search.css',
  shadow: true,
})
export class FullPageSearch {
  @Element() el: HTMLElement;

  /**
   * 搜索关键词
   */
  @Prop({ mutable: true }) searchTerm = '';

  /**
   * 搜索类型
   */
  @Prop() searchType: SearchType = 'default';

  /**
   * 排序方式
   */
  @Prop() sortOrder: SortOrder = 'relevance';

  /**
   * 当前页码
   */
  @Prop({ mutable: true }) currentPage = 1;

  /**
   * 每页数量
   */
  @Prop() pageSize = 20;

  /**
   * 是否正在搜索
   */
  @Prop({ mutable: true }) searching = false;

  /**
   * 是否正在加载更多
   */
  @Prop({ mutable: true }) loadingMore = false;

  /**
   * 搜索结果
   */
  @Prop({ mutable: true }) results: SearchResult[] = [];

  /**
   * 搜索结果总数
   */
  @Prop({ mutable: true }) totalResults = 0;

  /**
   * 分类结果
   */
  @Prop({ mutable: true }) categories: SearchResult[] = [];

  /**
   * 标签结果
   */
  @Prop({ mutable: true }) tags: SearchResult[] = [];

  /**
   * 用户结果
   */
  @Prop({ mutable: true }) users: SearchResult[] = [];

  /**
   * 搜索错误信息
   */
  @Prop({ mutable: true }) error: string | null = null;

  /**
   * 最小搜索长度
   */
  @Prop() minLength = 3;

  /**
   * 是否启用批量选择
   */
  @Prop() enableBulkSelect = false;

  /**
   * 是否显示高级选项
   */
  @Prop() showAdvancedOptions = false;

  /**
   * 搜索上下文（如分类 ID、标签 ID 等）
   */
  @Prop() searchContext?: {
    type: 'category' | 'tag' | 'user';
    id: string | number;
    name: string;
  };

  /**
   * 是否显示结果计数
   */
  @Prop() showResultCount = true;

  /**
   * 自定义搜索 API 端点
   */
  @Prop() searchApiUrl?: string;

  /**
   * 搜索请求头
   */
  @Prop() searchHeaders?: Record<string, string>;

  /**
   * 搜索变化时触发
   */
  @Event() dSearchChange: EventEmitter<{ term: string; type: SearchType }>;

  /**
   * 搜索结果变化时触发
   */
  @Event() dResultsChange: EventEmitter<SearchResponse>;

  /**
   * 加载更多内容时触发
   */
  @Event() dLoadMore: EventEmitter<{ page: number }>;

  /**
   * 批量选择变化时触发
   */
  @Event() dBulkSelectChange: EventEmitter<{ selected: string[] }>;

  @State() private hasSearched = false;
  @State() private selectedIds: Set<string> = new Set();
  @State() private bulkSelectMode = false;

  private searchInputRef?: HTMLInputElement;
  private debounceTimer?: number;

  /**
   * 聚焦搜索输入框
   */
  @Method()
  async focusInput() {
    this.searchInputRef?.focus();
  }

  /**
   * 清除搜索
   */
  @Method()
  async clearSearch() {
    this.searchTerm = '';
    this.results = [];
    this.totalResults = 0;
    this.hasSearched = false;
    this.error = null;
    this.currentPage = 1;
  }

  /**
   * 设置搜索关键词并执行搜索
   */
  @Method()
  async performSearch(term: string) {
    this.searchTerm = term;
    await this.executeSearch();
  }

  /**
   * 加载下一页
   */
  @Method()
  async loadMore() {
    if (this.loadingMore || !this.hasMoreResults) {
      return;
    }
    this.currentPage++;
    this.loadingMore = true;
    this.dLoadMore.emit({ page: this.currentPage });
    await this.executeSearch(true);
    this.loadingMore = false;
  }

  /**
   * 切换批量选择模式
   */
  @Method()
  async toggleBulkSelect() {
    this.bulkSelectMode = !this.bulkSelectMode;
    if (!this.bulkSelectMode) {
      this.selectedIds.clear();
      this.dBulkSelectChange.emit({ selected: [] });
    }
  }

  /**
   * 选择/取消选择结果
   */
  @Method()
  async toggleSelect(id: string) {
    if (this.selectedIds.has(id)) {
      this.selectedIds.delete(id);
    } else {
      this.selectedIds.add(id);
    }
    this.dBulkSelectChange.emit({ selected: Array.from(this.selectedIds) });
  }

  /**
   * 全选当前页结果
   */
  @Method()
  async selectAll() {
    this.results.forEach((result) => this.selectedIds.add(result.id.toString()));
    this.dBulkSelectChange.emit({ selected: Array.from(this.selectedIds) });
  }

  /**
   * 取消全选
   */
  @Method()
  async clearSelection() {
    this.selectedIds.clear();
    this.dBulkSelectChange.emit({ selected: [] });
  }

  @Watch('searchTerm')
  onSearchTermChange(newValue: string) {
    if (this.debounceTimer) {
      window.clearTimeout(this.debounceTimer);
    }

    if (!newValue || newValue.length < this.minLength) {
      if (newValue.length === 0) {
        this.clearSearch();
      }
      return;
    }

    this.debounceTimer = window.setTimeout(() => {
      this.executeSearch();
    }, 300);
  }

  @Watch('searchType')
  @Watch('sortOrder')
  onOptionsChange() {
    if (this.hasSearched) {
      this.currentPage = 1;
      this.executeSearch();
    }
  }

  private get hasResults(): boolean {
    return this.results.length > 0;
  }

  private get hasMoreResults(): boolean {
    return this.totalResults > this.results.length;
  }

  private get resultCountLabel(): string {
    if (this.totalResults === 0) {
      return '';
    }
    const start = (this.currentPage - 1) * this.pageSize + 1;
    const end = Math.min(this.currentPage * this.pageSize, this.totalResults);
    return `${start}-${end} / ${this.totalResults}`;
  }

  private get isSearchValid(): boolean {
    return this.searchTerm.length >= this.minLength;
  }

  private get showSuggestions(): boolean {
    return !this.hasResults && this.hasSearched && this.isSearchValid;
  }

  /**
   * 执行搜索
   */
  private async executeSearch(append = false) {
    if (!this.isSearchValid) {
      return;
    }

    this.searching = true;
    this.error = null;

    try {
      // 如果有自定义 API，使用 fetch 请求
      if (this.searchApiUrl) {
        await this.fetchFromApi(append);
      } else {
        // 否则触发自定义事件，由父组件处理搜索逻辑
        this.dSearchChange.emit({
          term: this.searchTerm,
          type: this.searchType,
        });
      }

      this.hasSearched = true;
      this.dResultsChange.emit({
        results: this.results,
        total: this.totalResults,
        page: this.currentPage,
        pageSize: this.pageSize,
        hasMore: this.hasMoreResults,
        categories: this.categories,
        tags: this.tags,
        users: this.users,
      });
    } catch (err) {
      this.error = err instanceof Error ? err.message : '搜索失败，请稍后重试';
    } finally {
      this.searching = false;
    }
  }

  /**
   * 从 API 获取数据
   */
  private async fetchFromApi(append = false) {
    const params = new URLSearchParams({
      q: this.searchTerm,
      type: this.searchType,
      page: this.currentPage.toString(),
      limit: this.pageSize.toString(),
      order: this.sortOrder,
    });

    if (this.searchContext) {
      params.append('context_type', this.searchContext.type);
      params.append('context_id', this.searchContext.id.toString());
    }

    const response = await fetch(`${this.searchApiUrl}?${params}`, {
      headers: this.searchHeaders,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: SearchResponse = await response.json();

    if (append) {
      this.results = [...this.results, ...data.results];
    } else {
      this.results = data.results;
    }

    this.totalResults = data.total;
    this.categories = data.categories || [];
    this.tags = data.tags || [];
    this.users = data.users || [];
  }

  /**
   * 处理输入变化
   */
  private handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value;
  };

  /**
   * 处理键盘事件
   */
  private handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      this.clearSearch();
      this.searchInputRef?.blur();
    }
  };

  /**
   * 渲染搜索输入框
   */
  private renderSearchInput() {
    return (
      <div class="search-input-container">
        <d-icon name="search" class="search-icon"></d-icon>
        <input
          ref={(el) => (this.searchInputRef = el!)}
          type="text"
          class="search-input"
          placeholder="输入搜索关键词..."
          value={this.searchTerm}
          onInput={this.handleInput}
          onKeyDown={this.handleKeyDown}
          aria-label="搜索"
        />
        {this.searchTerm && (
          <button
            class="clear-search-btn"
            onClick={this.clearSearch.bind(this)}
            aria-label="清除搜索"
          >
            <d-icon name="times"></d-icon>
          </button>
        )}
      </div>
    );
  }

  /**
   * 渲染搜索选项
   */
  private renderSearchOptions() {
    return (
      <div class="search-options">
        <div class="search-type-selector">
          <label>搜索类型：</label>
          <select
            class="search-type-select"
            onChange={(e) => (this.searchType = (e.target as HTMLSelectElement).value as SearchType)}
          >
            <option value="default" selected={this.searchType === 'default'}>全部</option>
            <option value="posts" selected={this.searchType === 'posts'}>帖子</option>
            <option value="topics" selected={this.searchType === 'topics'}>主题</option>
            <option value="users" selected={this.searchType === 'users'}>用户</option>
            <option value="categories" selected={this.searchType === 'categories'}>分类</option>
            <option value="tags" selected={this.searchType === 'tags'}>标签</option>
          </select>
        </div>

        <div class="search-sort-selector">
          <label>排序：</label>
          <select
            class="search-sort-select"
            onChange={(e) =>
              (this.sortOrder = (e.target as HTMLSelectElement).value as SortOrder)
            }
          >
            <option value="relevance" selected={this.sortOrder === 'relevance'}>相关性</option>
            <option value="latest" selected={this.sortOrder === 'latest'}>最新</option>
            <option value="top" selected={this.sortOrder === 'top'}>最热</option>
          </select>
        </div>

        {this.enableBulkSelect && (
          <button
            class={`bulk-select-btn ${this.bulkSelectMode ? 'active' : ''}`}
            onClick={this.toggleBulkSelect.bind(this)}
          >
            {this.bulkSelectMode ? '取消批量选择' : '批量选择'}
          </button>
        )}
      </div>
    );
  }

  /**
   * 渲染批量选择工具栏
   */
  private renderBulkSelectToolbar() {
    if (!this.bulkSelectMode) {
      return null;
    }

    return (
      <div class="bulk-select-toolbar">
        <span class="selected-count">已选择 {this.selectedIds.size} 项</span>
        <div class="bulk-actions">
          <button class="select-all-btn" onClick={this.selectAll.bind(this)}>
            全选
          </button>
          <button class="clear-selection-btn" onClick={this.clearSelection.bind(this)}>
            取消全选
          </button>
          <slot name="bulk-actions"></slot>
        </div>
      </div>
    );
  }

  /**
   * 渲染搜索结果
   */
  private renderResults() {
    if (this.searching) {
      return this.renderLoading();
    }

    if (this.error) {
      return this.renderError();
    }

    if (!this.hasSearched) {
      return null;
    }

    if (!this.hasResults) {
      return this.renderNoResults();
    }

    return (
      <div class="search-results">
        {this.showResultCount && (
          <div class="result-count">{this.resultCountLabel} 条结果</div>
        )}

        {this.categories.length > 0 && (
          <div class="search-section categories-section">
            <h3 class="section-title">分类</h3>
            <div class="category-list">
              {this.categories.map((category) => this.renderCategoryItem(category))}
            </div>
          </div>
        )}

        {this.tags.length > 0 && (
          <div class="search-section tags-section">
            <h3 class="section-title">标签</h3>
            <div class="tag-list">
              {this.tags.map((tag) => this.renderTagItem(tag))}
            </div>
          </div>
        )}

        {this.users.length > 0 && (
          <div class="search-section users-section">
            <h3 class="section-title">用户</h3>
            <div class="user-list">
              {this.users.map((user) => this.renderUserItem(user))}
            </div>
          </div>
        )}

        <div class="search-section results-section">
          <slot name="search-results">
            <div class="result-list">
              {this.results.map((result) => this.renderResultItem(result))}
            </div>
          </slot>
        </div>

        {this.hasMoreResults && (
          <div class="load-more-container">
            <button
              class="load-more-btn"
              onClick={this.loadMore.bind(this)}
              disabled={this.loadingMore}
            >
              {this.loadingMore ? '加载中...' : '加载更多'}
            </button>
          </div>
        )}
      </div>
    );
  }

  /**
   * 渲染加载状态
   */
  private renderLoading() {
    return (
      <div class="search-loading">
        <slot name="loading">
          <d-icon name="spinner" class="loading-spinner"></d-icon>
          <span>搜索中...</span>
        </slot>
      </div>
    );
  }

  /**
   * 渲染错误信息
   */
  private renderError() {
    return (
      <div class="search-error">
        <d-icon name="exclamation-triangle"></d-icon>
        <span>{this.error}</span>
      </div>
    );
  }

  /**
   * 渲染无结果状态
   */
  private renderNoResults() {
    return (
      <div class="no-results">
        <slot name="no-results">
          <d-icon name="search" class="no-results-icon"></d-icon>
          <h3>未找到相关结果</h3>
          <p>尝试使用更短的关键词或不同的搜索条件</p>
          {this.showSuggestions && (
            <div class="search-suggestions">
              <p>找不到想要的内容？</p>
              <slot name="suggestions"></slot>
            </div>
          )}
        </slot>
      </div>
    );
  }

  /**
   * 渲染结果项
   */
  private renderResultItem(result: SearchResult) {
    const isSelected = this.selectedIds.has(result.id.toString());

    return (
      <div
        class={`result-item result-type-${result.type} ${isSelected ? 'selected' : ''}`}
        onClick={() => this.bulkSelectMode && this.toggleSelect(result.id.toString())}
      >
        {this.enableBulkSelect && this.bulkSelectMode && (
          <input
            type="checkbox"
            class="result-checkbox"
            checked={isSelected}
            onChange={() => this.toggleSelect(result.id.toString())}
            aria-label="选择此项"
          />
        )}

        {result.type === 'post' || result.type === 'topic' ? (
          <article class="result-content">
            {result.avatarUrl && (
              <img src={result.avatarUrl} alt={result.username} class="result-avatar" />
            )}
            <div class="result-main">
              <h4 class="result-title">
                <a href={result.url} class="result-link">
                  {result.title}
                </a>
              </h4>
              {result.excerpt && <p class="result-excerpt">{result.excerpt}</p>}
              <div class="result-meta">
                {result.username && <span class="result-username">{result.username}</span>}
                {result.categoryName && (
                  <span class="result-category">{result.categoryName}</span>
                )}
                {result.tags && result.tags.length > 0 && (
                  <div class="result-tags">
                    {result.tags.map((tag) => (
                      <span class="result-tag">{tag}</span>
                    ))}
                  </div>
                )}
                {result.createdAt && (
                  <time class="result-date" dateTime={result.createdAt}>
                    {result.createdAt}
                  </time>
                )}
              </div>
            </div>
          </article>
        ) : (
          <div class="result-content">
            <h4 class="result-title">
              <a href={result.url} class="result-link">
                {result.title}
              </a>
            </h4>
            {result.excerpt && <p class="result-excerpt">{result.excerpt}</p>}
          </div>
        )}
      </div>
    );
  }

  /**
   * 渲染分类项
   */
  private renderCategoryItem(category: SearchResult) {
    return (
      <a href={category.url} class="category-item">
        <d-icon name="folder" class="category-icon"></d-icon>
        <span class="category-name">{category.name}</span>
      </a>
    );
  }

  /**
   * 渲染标签项
   */
  private renderTagItem(tag: SearchResult) {
    return (
      <a href={tag.url} class="tag-item">
        <d-icon name="tag" class="tag-icon"></d-icon>
        <span class="tag-name">{tag.title}</span>
      </a>
    );
  }

  /**
   * 渲染用户项
   */
  private renderUserItem(user: SearchResult) {
    return (
      <a href={user.url} class="user-item">
        {user.avatarUrl && (
          <img src={user.avatarUrl} alt={user.username} class="user-avatar" />
        )}
        <div class="user-info">
          <span class="user-name">{user.title}</span>
          <span class="user-username">@{user.username}</span>
        </div>
      </a>
    );
  }

  render() {
    return (
      <Host>
        <div class="full-page-search">
          <header class="search-header">
            {this.renderSearchInput()}
            {this.showAdvancedOptions && this.renderSearchOptions()}
            {this.enableBulkSelect && this.renderBulkSelectToolbar()}
          </header>

          {this.searchContext && (
            <div class="search-context">
              <span class="context-label">搜索范围：</span>
              <span class="context-value">{this.searchContext.name}</span>
            </div>
          )}

          <main class="search-main">
            <slot name="search-input"></slot>
            <slot name="search-options"></slot>
            {this.renderResults()}
          </main>
        </div>
      </Host>
    );
  }
}

<template>
  <div class="gitalk-comment">
    <!-- Gitalk -->
    <div id="gitalk-container" class="gitalk-container" />
    <!-- Gitalk -->
  </div>
</template>

<script setup lang="ts">
import { useData } from 'vitepress'

import { onMounted } from 'vue'
import md5 from '@withtypes/md5'
import Gitalk from 'gitalk'
import 'gitalk/dist/gitalk.css'
const {title} = useData()

const props = defineProps<{
  issueId: number
}>()

function init() {
  const gitalk = new Gitalk({
    clientID: '5374d68865c38ddcd9f1',
    clientSecret: '312bf7b3a00bf03e1dcd1b20cdc642326d34372e',
    repo: 'NoteBook',
    owner: 'hugozach',
    admin: ['hugozach'],
    id: md5(title.value),
    number: props.issueId,
  })

  gitalk.render('gitalk-container')
}

onMounted(init)
</script>

<style scoped>
.gitalk-container :deep(.gt-container) a {
  color: var(--c-brand) !important;
}
.gitalk-container :deep(.gt-container) .gt-header-textarea {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  background-color: var(--c-bg-light);
}
.gitalk-container
  :deep(.gt-container)
  .gt-svg
  svg {
  fill: var(--c-brand);
}
.gitalk-container :deep(.gt-container) .gt-link {
  border-color: var(--c-brand);
}
.gitalk-container :deep(.gt-container) .gt-btn {
  background-color: var(--c-brand);
  border-color: var(--c-brand);
}
.gitalk-container :deep(.gt-container) .gt-btn.gt-btn-preview {
  color: var(--c-brand);
  background-color: var(--c-bg);
}
.gitalk-container
  :deep(.gt-container)
  .gt-comments
  .gt-comments-null {
  color: var(--c-text);
}
.gitalk-container
  :deep(.gt-container)
  .gt-comment-content {
  background-color: var(--c-bg-light);
  box-shadow: none;
}
.gitalk-container
  :deep(.gt-container)
  .gt-comment-content
  .gt-comment-body {
  color: var(--c-text) !important;
}
.gitalk-container
  :deep(.gt-container)
  .gt-comment-content
  blockquote {
  color: var(--c-text-quote) !important;
  border: 0;
  background-color: var(--c-bg-lighter);
  padding: 1em;
  margin-top: 1em !important;
}
.gitalk-container :deep(.gt-container) .gt-avatar {
  border-radius: 50%;
  overflow: hidden;
}
.gitalk-container :deep(.gt-container) .gt-avatar img {
  height: 100%;
  object-fit: cover;
}
</style>

# DFS

## 遍历

## 回溯

## 注意事项

每次完成下一步遍历之前，需要保留之前的结果。例如：

```javascript
const path = []
for (let i = start; i <= n; i++) {
  path.push(i)
  next(path, i + 1)
  path.pop() // 恢复之前的结果
}
```

export function removeItemsWithId(items, idsToRemove) {
    if (!items) return false
    for (let i = items.length -1; i >= 0; i--) {
        if (idsToRemove.includes(items[i].id)) {
            items.splice(i, 1)
        }
        // 如果元素具有子元素children，则递归调用removeItemsWithId函数
        if (items[i]?.children?.length) {
            removeItemsWithId(items[i].children, idsToRemove)
        }
    }
}
/* 字段名以字符串的形式传入 */
//获取菜单树
export function setTreeData(source) {
  console.log(source);
  let cloneData = JSON.parse(JSON.stringify(source))
  console.log(cloneData);
  let tree = cloneData.filter(father => {
    let branchArr = cloneData.filter(child => {
      return father.id == child.parentId
    });
    if (branchArr.length > 0) {
      father.children = branchArr
    }
    return father.parentId == 0 //如果第一层不是parentId=0，请自行修改
  })
  console.log(tree);
  return tree
}

//冒泡排序
function sort(elements) {
  for (let i = 0; i < elements.length - 1; i++) {
    for (let j = 0; j < elements.length - i - 1; j++) {
      if (elements[j].orderSort > elements[j + 1].orderSort) {
        let swap = elements[j];
        elements[j] = elements[j + 1];
        elements[j + 1] = swap;
      }
    }
  }
  console.log(elements);
  return elements;
}

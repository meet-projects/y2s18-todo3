# Solution Notes for Lab: `todo3`

```javascript
function readTodoItems() {
  var todoInfo = [];

  $("li").each(function() {
    var info = {};
    info.complete = $(this).find(".todo-item-checkbox").first().hasClass("checked");
    info.name = $(this).find("input[name='todo-item-text']").val();
    todoInfo.push(info);
  });

  return JSON.stringify(todoInfo);
}
```

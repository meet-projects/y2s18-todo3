function toggleComplete(obj) {
  $(obj).toggleClass("checked");
}

function createTodoItem() {
  var rawHtml = `
  <li>
    <table class="todo-item">
      <tr>
        <td onclick="toggleComplete(this)" class="todo-item-checkbox">
          <i class="far fa-check-circle"></i>
          <!-- <i class="fas fa-check-circle"></i> -->
        </td>

        <td class="todo-item-body">
          <input type="text" name="todo-item-text">
        </td>

        <td onclick="deleteTodoItem(this)" class="todo-item-buttons">
          <i class="far fa-trash-alt"></i>
        </td>

      </tr>
    </table>
  </li>`

  var newItem = $.parseHTML(rawHtml);

  $("#todo-items-list").append(newItem);
}

function deleteTodoItem(obj) {
  $(obj).parents("li")[0].remove();
}
/* START TODO2 SOLUTION */
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

/* END TODO2 SOLUTION */

function readTodoItems() {
  var todoInfo = [];

  $("li").each(function() {
    var info = {};
    info.complete = $(this).find(".todo-item-checkbox").first().hasClass("checked");
    info.task = $(this).find("input[name='todo-item-text']").val();
    todoInfo.push(info);
  });

  return JSON.stringify(todoInfo);
}

function readListName() {
  return $("#todo-list-name").val();
}

function readPassword() {
  return $("#todo-list-password").val();
}

function showMessage() {
  $("#message").removeClass("invisible");

  setTimeout(function () {
    $("#message").addClass("invisible");
  }, 2000);

}

function pullTodoList() {
  var list = readListName();
  var password = readPassword();

  $.ajax("http://localhost:3000/todo", {
    method: "POST",
    data: {
      list: list,
      password: password,
    },
    success: function(data) {
      console.log(data);
    },
    error: function(data) {
      console.log(data);
    }
  });
}

function pushTodoList() {
  var list = readListName();
  var password = readPassword();
  var tasks = readTodoItems();

  $.ajax("http://localhost:3000/todo/edit", {
    method: "POST",
    data: {
      list: list,
      password: password,
      tasks: tasks
    },
    success: function(data) {
      console.log(data);
    },
    error: function(data) {
      console.log(data);
    }
  });
}
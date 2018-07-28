/* START TODO2 SOLUTION */
function toggleComplete(obj) {
  $(obj).toggleClass("checked");
}

function createTodoItem(name, complete) {
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
  $(newItem).find("input[name='todo-item-text']").val(name);
  if (complete) {
    $(newItem).find(".todo-item-checkbox").addClass("checked");
  }

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
    info.name = $(this).find("input[name='todo-item-text']").val();
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

function showMessage(message) {
  $("#message").html(message);
  $("#message").removeClass("invisible");

  setTimeout(function () {
    $("#message").addClass("invisible");
  }, 2000);
}

function pullTodoList() {
  var list = readListName();
  var password = readPassword();

  $.ajax("https://api.meet.sh/todo", {
    method: "POST",
    data: {
      list: list,
      password: password,
    },
    success: function(data) {
      showMessage("<p style='color: green'>Retrieved todo list successfully.</p>");
      $("li").remove();
      for (var i = 0; i < data.length; i++) {
        createTodoItem(data[i].name, data[i].complete);
      }
    },
    error: function(data) {
      showMessage("<p style='color: red'>Failed to retrieve todo list.</p>");
    }
  });
}

function pushTodoList() {
  var list = readListName();
  var password = readPassword();
  var tasks = readTodoItems();

  $.ajax("https://api.meet.sh/todo/edit", {
    method: "POST",
    data: {
      list: list,
      password: password,
      tasks: tasks
    },
    success: function(data) {
      showMessage("<p style='color: green'>Saved todo list successfully.</p>");
    },
    error: function(data) {
      showMessage("<p style='color: red'>Failed to save todo list.</p>");
    }
  });
}
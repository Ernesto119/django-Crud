$(document).ready(function () {
  // Load items on page load

  // Create or Update Item
  $("#formtask").submit(function (event) {
    event.preventDefault();

    $.ajax({
      url: "/create/",
      method: "POST",
      data: $(this).serialize(),
      success: function (response) {
        // Agrega la nueva tarea a la lista de tareas sin recargar la página
        $("#tasklist").append(`
          <div class="d-flex mb-3 border" id="task-${response.id}">
          <h3 class="me-auto p-2">${response.title}</h3>
    <div class="btn-group align-items-center" role="group">
      <button class="delete-btn p-2 btn btn-danger" data-id="${response.id}">Delete</button>
      <a href="{% url 'update' ${response.id}%}" class="p-2 btn btn-primary">Update</a>
      <button class="complete-btn p-2 btn btn-success" data-id="${response.id}">Complete</button>
          </div>
          </div>
          `);
        $("#formtask")[0].reset();
      },
      error: function () {
        alert("Error creating task.");
      },
    });
  });
  $("#tasklist").on("click", ".delete-btn", function (e) {
    e.preventDefault();
    const taskId = $(this).data("id");
    $.ajax({
      url: `/delete/${taskId}/`,
      method: "POST",
      headers: {
        "X-CSRFToken": $('input[name="csrfmiddlewaretoken"]').val(),
      },
      success: function () {
        // Elimina el elemento de la tarea de la lista
        $(`#task-${taskId}`).remove();
      },
      error: function () {
        alert("Error deleting task.");
      },
    });
  });

  // AJAX para completar una tarea
  $("#tasklist").on("click", ".complete-btn", function (e) {
    e.preventDefault();
    const taskId = $(this).data("id");
    $.ajax({
      url: `/complete/${taskId}/`,
      method: "POST",
      headers: {
        "X-CSRFToken": $('input[name="csrfmiddlewaretoken"]').val(),
      },
      success: function () {
        // Actualiza el estado de la tarea a completado
        $(`#task-${taskId}`).remove();
      },
      error: function () {
        alert("Error completing task.");
      },
    });
  });
  // Other CRUD operations (update, delete) to be implemented similarly
});

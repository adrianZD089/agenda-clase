$(function () {
  var operation = "C"; //"C"=Crear
  var selected_index = -1; // Indice de el elemento seleccionado en la lista
  var tblPersons = localStorage.getItem("tblPersons"); //Retornar los datos almacenados
  tblPersons = JSON.parse(tblPersons); //Convertir String a Object
  if (tblPersons === null) // Si no hay datos, inicializar un array vacio
      tblPersons = [];

  function Create() {
    //Obtener los valores de la forma HTML y transformalos en String.
    var person = JSON.stringify({
      ID: $("#txtID").val(),
      Name: $("#txtName").val(),
      PhonePer: $("#txtPhonePer").val(),
      PhoneOfic: $("#txtPhoneOfic").val(),
      EmailPer: $("#txtEmailPer").val(),
      txtEmailOfice: $("#txtEmailOfice").val(),
      FechaN: $("#txtFechaN").val()
    }); 
    //Añadir el objeto a la tabla
    tblPersons.push(person);
    //Almacenar los datos en el Local Storage
    localStorage.setItem("tblPersons", JSON.stringify(tblPersons));
    alert("Los datos han sido almacenados"); //Mensaje de alerta
    return true;
  }

  function Edit() {
    // Editar el item seleccionado en la tabla
    tblPersons[selected_index] = JSON.stringify({
        ID: $("#txtID").val(),
        Name: $("#txtName").val(),
        PhonePer: $("#txtPhonePer").val(),
        PhoneOfic: $("#txtPhoneOfic").val(),
        EmailPer: $("#txtEmailPer").val(),
        txtEmailOfice: $("#txtEmailOfice").val(),
        FechaN: $("#txtFechaN").val(),
    });
    //Almacenar los datos en el Local Storage
    localStorage.setItem("tblPersons", JSON.stringify(tblPersons)); 
    alert("Los datos han sido editados"); //Mensaje de alerta
    return true;
  }

  function Delete() {
    //Eliminar el elemento seleccionado en la tabla
    tblPersons.splice(selected_index, 1); 
    //Actualizar los datos del Local Storage
    localStorage.setItem("tblPersons", JSON.stringify(tblPersons)); 
    alert("Persona Eliminada"); //Mensaje de alerta
  }

  function List() {
    $("#tblList").html("");
    $("#tblList").html(
            "<thead>" +
            "<tr>" +                
            "<th>ID</th>" +
            "<th>Nombre</th>" +
            "<th>Teléfono Personal</th>" +
            "<th>Teléfono Oficina</th>" +
            "<th>Email Personal</th>" +
            "<th>Email Oficina</th>" +
            "<th>Fecha de Nacimiento</th>" +
            "<th>Acciones</th>" +
            "</tr>" +
            "</thead>" +
            "<tbody>" +
            "</tbody>"
            ); //Agregar la tabla a la estructura HTML
    for (var i in tblPersons) {
        var per = JSON.parse(tblPersons[i]);
        $("#tblList tbody").append("<tr>" +                    
                "<td>" + per.ID + "</td>" +
                "<td>" + per.Name + "</td>" +
                "<td>" + per.PhonePer + "</td>" +
                "<td>" + per.PhoneOfic + "</td>" +
                "<td>" + per.EmailPer + "</td>" +  
                "<td>" + per.txtEmailOfice + "</td>" + 
                "<td>" + per.FechaN + "</td>" +                  
                "<td><img src='./img/edit.png' alt='Edit" + i + "' class='btnEdit'/>&nbsp &nbsp<img src='./img/delete.png' alt='Delete" + i + "' class='btnDelete'/></td>" +
                "</tr>"
                );
    } //Recorrer y agregar los items a la tabla HTML
  }

  $("#frmPerson").bind("submit", function () {
    if (operation === "C")
        return Create();
    else
        return Edit();
  }); //Función para decidir si se encuentra añadiendo o editando un item
  
  List();

  $(".btnEdit").bind("click", function () {
    operation = "E"; //"E" = Editar
    //Obtener el identificador del item a ser editado
    selected_index = parseInt($(this).attr("alt").replace("Edit", ""));
    // Convertir de JSON al formato adecuando para editarlos datos
    var per = JSON.parse(tblPersons[selected_index]); 
    $("#txtID").val(per.ID);
    $("#txtName").val(per.Name);
    $("#txtPhonePer").val(per.PhonePer);
    $("#txtPhoneOfic").val(per.PhoneOfic);
    $("#txtEmailPer").val(per.EmailPer);
    $("#txtEmailOfice").val(per.txtEmailOfice);
    $("#txtFechaN").val(per.FechaN);
    $("#txtID").attr("readonly", "readonly");
    $("#txtName").focus();
  });

  $(".btnDelete").bind("click", function () {
    //Obtener el identificador del item a ser eliminado
    selected_index = parseInt($(this).attr("alt").replace("Delete", "")); 
    Delete(); //Eliminar el item
    List(); //Volver a listar los items en la tabla
  });
});


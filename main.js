$(document).ready(function() {
    idClicado = null;
    nomeClicado = null;
    preencherUsuarios();

    $("#btnConfirmarExclusao").click(function() {
        $.ajax({
            url: "http://serene-chamber-53332.herokuapp.com/api/pessoa/" + idClicado,
            type: "delete",
            success: function(data) {
                alert("Deletado com sucesso!");
                $("#modalExcluir").modal('hide');
            },
            error: function() {
                alert("Erro ao deletar!");
            }
        })
    });

    $("#btnModalNovo").click(function() {
        $("#modalAdd").modal();
    });

    $("#btnConfirmarAdd").click(function() {
        nome = $("#addNome").val();
        email = $("#addEmail").val();
        phone = $("#addPhone").val();
        endereco = $("#addEndereco").val();

        json_data = JSON.stringify({
            "name": nome,
            "mail": email,
            "phone": phone,
        });

        $.ajax({
            type: "POST",
            url:"http://serene-chamber-53332.herokuapp.com/api/pessoa",
            contentType:"application/json",
            data:json_data,
            success: function(data) {
                alert("Inserido com sucesso! ID: " + data.id);
            },
            error: function() {
                alert("Erro ao inserir!");
            }
        });
    });

    $("#btnConfirmarAlter").click(function() {
        $.ajax({
            url: "http://serene-chamber-53332.herokuapp.com/api/pessoa/" + idClicado,
            type: "PATCH",
            contentType: "application/json",
            data: JSON.stringify({
                "id":idClicado,
                "name":$("#alterNome").val(),
                "mail":$("#alterEmail").val(),
                "phone":$("#alterPhone").val() 
            }),
            success: function(data) {
                alert("Alterado com sucesso!");
            },
            error: function() {
                alert("Erro ao alterar!");
            }
        });
    });
});

function preencherUsuarios() {
    $.getJSON("http://serene-chamber-53332.herokuapp.com/api/pessoa",function(data) {
        var tabela = $("#tabela-usuarios tbody");
        $.each(data, function(key,val) {
            tabela.append("<tr>")
            tabela.append("<td>" + val.id + "</td>");
            tabela.append("<td>" + val.name + "</td>");
            tabela.append("<td>" + val.mail + "</td>");
            tabela.append("<td>" + val.phone + "</td>");
            tabela.append("<td>" + val.endereco + "</td>");
            tabela.append($('<td><i class="remover fas fa-trash-alt"></i></td>')
                .click(function() {
                    idClicado = val.id;
                    nomeClicado = val.name;
                    $("#nomeItem").html(nomeClicado);
                    $("#modalExcluir").modal();
                }));
            tabela.append($('<td><i class="alterar fas fa-pencil-alt"></i></td>')
                .click(function() {
                    idClicado = val.id;
                    nomeClicado = val.name;
                    emailClicado = val.mail;
                    phoneClicado = val.phone;

                    $("#alterID").val(idClicado);
                    $("#alterNome").val(nomeClicado);
                    $("#alterEmail").val(emailClicado);
                    $("#alterPhone").val(phoneClicado);
                    $("#modalAlter").modal();
                }));
            tabela.append("</tr>");
        });
    });
}
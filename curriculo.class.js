class Curriculo {
    
    request = new XMLHttpRequest();
    requestURL = "";
    constructor( id ) {
        this.requestURL = `https://my-json-server.typicode.com/LucasTBorges/apifake/curriculos/${id}`;
        console.log(  this.requestURL)
    }

 

    getItemEscolaridade( escolaItem ) {
        return `<article>
                    <h3>${escolaItem.Entidade}</h3>
                    <p><strong>Curso:</strong> ${escolaItem.Curso}<p>
                    <p><strong>Período:</strong> ${escolaItem.periodo} <p>
                    <p><strong>Atividades:</strong> ${escolaItem.atividades}<p>
                    </article>`;

    }

    builderEscolaridade( dadosEscolaridade ) {
        dadosEscolaridade.forEach((element) => {
            var artigo = this.getItemEscolaridade(element);
            $("#educacao").append($(artigo));
        });
    }

    getItemExperiencia( experienciaItem ) {
        return `<article>
                        <h3>${experienciaItem.empresa}</h3>
                        <p><strong>Cargo: </strong> ${experienciaItem.cargo}</p>
                        <p><strong>Período: </strong> ${experienciaItem.periodo}</p>
                        <p><strong>Responsabilidades: </strong> ${experienciaItem.atividades}<p>
                    </article>`;

    }

    builderExperiencia( dadosExperiencia ) {
        dadosExperiencia.forEach((element) => {
            var artigo = this.getItemExperiencia(element);
            $("#experiencia").append($(artigo));
        });
    }

    getItemHabilidade( item ) {
        return "<li>"+item.titulo+"</li>";

    }

    builderHabilidade( dadosHabilidade ) {
        dadosHabilidade.forEach((element) => {
            var artigo = this.getItemHabilidade(element);
            $("#habilidades").append($(artigo));
        });
    }

    builderDadosCurriculo( dados ) {
       $("#nome").text(dados.nome);
       $("#telefone").text(`Telefone: ${dados.telefone}`);
       var textEmail = `Email: <a href="mailto:${dados.email}">${dados.email}</a>`;
       $("#email").html(textEmail);
    }


    getDados() {
        this.request.open("GET", this.requestURL);
        this.request.send();
    }

    builderRequest() {
        this.request.responseType = "json";
        var that = this;
        this.request.onload = function () {
            that.dados = this.response;
            console.log( that.dados );
            that.builderEscolaridade(that.dados.escolaridade);
            that.builderExperiencia(that.dados.experiencia);
            that.builderHabilidade(that.dados.habilidades);
            that.builderDadosCurriculo(that.dados);
        }
    }

}

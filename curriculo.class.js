class Curriculo {
    
    request = new XMLHttpRequest();
    requestURL = "";
    constructor( id ) {
        this.requestURL = `http://localhost:3000/curriculos/${id}`;
        console.log(  this.requestURL)
    }

    getItemProjeto(projeto){
        return `<li>${projeto.descritivo}</li>`
    }

    builderProjetos(projetos){
        projetos.forEach((projeto)=>{
            $("#projetos").append(this.getItemProjeto(projeto));
        })
    }
    getItemInteresse(interesse){
        return`<li class="item-simples">${interesse.nome}</li>`
    }

    builderInteresses(interesses){
        interesses.forEach((interesse)=>{
            $("#interesses").append(this.getItemInteresse(interesse));
        })
    }
    getItemIdioma(idioma){
        return `<li><p class="item-simples">${idioma.nome} <small class="gray">(${idioma.nivel})</small></p<</li>`;
    }

    builderIdioma(idiomas){
        idiomas.forEach((idioma) => {
            $("#idiomas").append(this.getItemIdioma(idioma));
        })

    }

    getItemSocial(rede){
        var partes = rede.url.split("/");
        console.log(partes);
        var nome ="";
        if (partes.length > 0){
            nome = "/"+partes[partes.length - 1];
        }
        if (nome === "/"){
            if(partes.length > 1){
                nome = "/"+partes[partes.length - 2];
            }
            else{
                nome = "Link";
            }
        }
        return `<li>
                    <img class="iconeRede fill-white" alt="Ícone de ${rede.nome}" src="${rede.iconeUrl}"/>
                    <a class="linkRedes" href="${rede.url}">${nome}</a>
                </li>`
    }

    builderSocial(redes){
        redes.forEach((rede) => {
            $("#redes").append(this.getItemSocial(rede))
        })
    }

    builderProfile(urlProfile){
        if (urlProfile !== undefined){
            $("#foto").attr("src",urlProfile);
        } else{
            $("#foto").attr("src","https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png");
        }
    }

    getItemBio(bio){
        return `<p>${bio}</p>`;
    }
     
    builderBio(bio){
        $("#bio").append(this.getItemBio(bio))
    }

    getItemEscolaridade( escolaItem ) {
    return `<li class="list-group-item list-group-item-action flex-column align-items-start border-0 elemento">
                    <div class="d-flex w-100 justify-content-between">
                        <h5>${escolaItem.entidade}</h5>
                        <p class="text-muted periodo">${escolaItem.periodo}<p>
                    </div>
                    <p><strong>Curso:</strong> ${escolaItem.curso}<p>       
                    <p><strong>Atividades:</strong> ${escolaItem.atividades}<p>
                </li>`;

    }

    builderEscolaridade( dadosEscolaridade ) {
        dadosEscolaridade.forEach((element) => {
            var artigo = this.getItemEscolaridade(element);
            $("#educacao").append($(artigo));
        });
    }

    getItemExperiencia( experienciaItem ) {
        return `<article class="list-group-item list-group-item-action flex-column align-items-start border-0 elemento">
                    <div class="d-flex w-100">
                        <h5>${experienciaItem.empresa}</h5>
                        <p class="text-muted periodo">${experienciaItem.periodo}<p>
                    </div>
                    <p><strong>Cargo:</strong> ${experienciaItem.cargo}<p>       
                    <p><strong>Responsabilidades:</strong> ${experienciaItem.atividades}<p>
                </article>`;
    }

    builderExperiencia( dadosExperiencia ) {
        dadosExperiencia.forEach((element) => {
            var artigo = this.getItemExperiencia(element);
            $("#experiencia").append($(artigo));
        });
    }

    getItemHabilidade( item ) {
        const valor = item.pontuacao;
        return `<li>
                    <strong>${item.titulo}</strong>
                    <div class="progress">
                        <div class="progress-bar" role="progressbar" style="width: ${valor*10}%" aria-valuenow="${valor*10}" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </li>`
    }

    builderHabilidade( dadosHabilidade ) {
        dadosHabilidade.forEach((element) => {
            var artigo = this.getItemHabilidade(element);
            $("#habilidades").append($(artigo));
        });
    }

    builderDadosCurriculo( dados ) {
       $("#nome").text(dados.nome);
       $("#telefone").html(`<i class="bi bi-telephone-fill"></i> ${dados.telefone}`);
       var textEmail = `<i class="bi bi-envelope-fill"></i><a href="mailto:${dados.email}">${dados.email}</a>`;
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
            that.builderProfile(that.dados.urlProfile)
            that.builderBio(that.dados.bio);
            that.builderEscolaridade(that.dados.escolaridade);
            that.builderExperiencia(that.dados.experiencia);
            that.builderHabilidade(that.dados.habilidades);
            that.builderDadosCurriculo(that.dados);
            that.builderSocial(that.dados.redeSocial);
            that.builderIdioma(that.dados.idiomas);
            that.builderInteresses(that.dados.interesses);
            that.builderProjetos(that.dados.projetos);
        }
    }

}

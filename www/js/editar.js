var app = {

    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        document.getElementById("btnBuscar").addEventListener("click",app.buscar);
        document.getElementById("btnEditar").addEventListener("click",app.editar);
        this.receivedEvent('deviceready');
    },

    
    buscar: function(){
        var url_string = window.location.href;
        var url = new URL(url_string);
        var getTelefone = url.searchParams.get("telefone");

        var db = firebase.firestore();
        var ag = db.collection("agendamentos").where("telefone", "==", getTelefone);

        ag.get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                document.getElementById("txtNome").value = doc.data().nome;
                document.getElementById("txtTelefone").value = doc.data().telefone;
                document.getElementById("txtOrigem").value = doc.data().origem;
                document.getElementById("txtDataContato").value = doc.data().data_contato;
                document.getElementById("txtObservacao").value = doc.data().observacao;
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
    },


    editar: function(){
        var url_string = window.location.href;
        var url = new URL(url_string);
        var getTelefone = url.searchParams.get("telefone");


        let nome = document.getElementById("txtNome").value;
        let telefone = document.getElementById("txtTelefone").value;
        let origem = document.getElementById("txtOrigem").value;
        let data_contato = document.getElementById("txtDataContato").value;
        let observacao = document.getElementById("txtObservacao").value;

        var db = firebase.firestore();
        var ag = db.collection("agendamentos").where("telefone", "==", getTelefone);

        ag.get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                var dados = db.collection("agendamentos").doc(doc.id);

                return dados.update({
                    nome: nome,
                    telefone: telefone,
                    origem: origem,
                    data_contato: data_contato,
                    observacao: observacao
                })
                .then(() => {
                    console.log("Documento atualizado com sucesso!");
                    window.location.href = cordova.file.applicationDirectory + "www/consultar.html";
                })
                .catch((error) => {
                    // O documento provavelmente não existe
                    console.error("Erro ao atualizar", error);
                });
            });
        })
        .catch((error) => {
            console.log("Erro em obter os documentos: ", error);
        });

    }

};

app.initialize();
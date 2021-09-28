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

        db.transaction(function(tx) {
            tx.executeSql('UPDATE clientes SET nome=?, telefone=?, origem=?, data_contato=?, observacao=? WHERE telefone=?', [nome, telefone, origem, data_contato, observacao, getTelefone]);
        }, function(error) {
            alert('Erro durante a transacao com o banco: ' + error.message);
        }, function() {
            alert('Atualização realizada com sucesso!!!');
        });
    }

};

app.initialize();
// Initialize Firebase
$('#Loader').show();
var config = {
    apiKey: "AIzaSyC3fRsurholLQ_OH0OVN48rtrSblEfb1Eg",
    authDomain: "ubiqum-project.firebaseapp.com",
    databaseURL: "https://ubiqum-project.firebaseio.com",
    storageBucket: "ubiqum-project.appspot.com",
    messagingSenderId: "597896297392"
};
firebase.initializeApp(config);

var TablaDeBaseDatos = firebase.database().ref('Imagenes');

$('#upload-file-selector').change(function () {
    if (this.files && this.files[0]) {
        var Archivo = new FileReader();
        Archivo.onload = function (e) {
            var smmallimage = redimensionarimagen(e.target.result, 300, 300);
            var mediumimage = redimensionarimagen(e.target.result, 590, 590);
            TablaDeBaseDatos.push({
                urlLarge: mediumimage,
                url: smmallimage
            });
            // Visualizar la imagen en la etiqueta img
            $('#img').attr('src', smmallimage);
        };
        Archivo.readAsDataURL(this.files[0]);
    }
});


TablaDeBaseDatos.on('value', function (snapshot) {
    $("#DivImagenes").html(""); // Limpiamos el cotenedor de imágenes
    snapshot.forEach(function (e) {
        var Objeto = e.val();
        if (Objeto.url != null) {
            // Agregamos las imágenes que se encuentran en la base de datos
            $("#DivImagenes").append('<div class="col-md-2"><img src="' + Objeto.url + '" style="cursor:pointer" data-imagen="' + Objeto.urlLarge + '" class="img-thumbnail" onclick="MostrarImagen($(this))" /><label class="btn btn-block btn-danger" onclick="Remover(\'' + e.key + '\')"><i class="fa_icon icon-trash margin-correction"></i>Borrar</label><br/><br/></div>');

        }


    });

    $('#Loader').hide();
});

function Remover(keyImagen) {
    TablaDeBaseDatos.child(keyImagen).remove(); // Remover el nodo con el ID
}
function MostrarImagen(ObjetoImagen) {
    $('#PreviewImg').attr('src', ObjetoImagen.attr('data-imagen'));
    $('#myModal').modal('show');

}
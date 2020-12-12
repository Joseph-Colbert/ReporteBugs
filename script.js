const buildFormData = (data)=>{
    let formData = new FormData()
    const imagefile = document.querySelector('#add-new-photo');     
    formData.append('image', imagefile.files[0]);
    console.log(formData.values());
    if(Array.isArray(formData)){
       console.info('es un array')
    } else {
        for(const key in data){
            formData.append(key,data[key])
        }
    }
    return formData
}
 
 //axios post
 
        var loading = document.getElementById('load');
        const button = document.getElementById('btn');
        button.addEventListener("click", ()=>{
            loading.style.display = ''; 
            
            const data = axios({
            method: 'POST',
            url:'https://sandbox.zoundbar.com/zb-qa/api/v1/report/',
            data: {
                "issuerName": $('#nombre').val(),
                "description": $('textarea#mensaje').val(),
                "priority": $('#prioridad').val(),
                "module": $('#modulo').val()
                }
            })
            .then(function (res) {
                console.log(res.data)
                console.log(res.data.bug.zbBugId)

                const payload = buildFormData({  
                    "zbBugId": res.data.bug.zbBugId,
                    "Content-type": "multipart/form-data"  //para que la API sepa que es formdata      
                })
                axios.post("https://sandbox.zoundbar.com/zb-qa/api/v1/report/image", payload)
                .then(res => console.log(res))            
                .catch(err => console.log(err))  

            })          
            .catch(err => console.log(err))
            .then(function() {
                loading.style.display = 'none';
              })              
            
            });

          
          


        //para el error
            /*
            var formulario = document.getElementById('formulario'),
            nombre = formulario.nombre,
            mensaje = formulario.mensaje,
            error = document.getElementById('error');
            function validarEnvio(e){
             if(succese= false == false){
                 console.log('Error al subir los datos');
                 error.style.display = 'block';
                 error.innerHTML = error.innerHTML + '<li> Se produjo un error al momento de subir los datos</li>'// para que muestre todos los errores
                 e.preventDefault();
             }else{
                 error.style.display = 'none';
             }
         }
            function validarNombre(e){
                if(nombre.value == '' || nombre.value == null){
                    console.log('Porfavor completa el nombre');
                    error.style.display = 'block';
                    error.innerHTML = error.innerHTML + '<li> Porfavor completa el nombre</li>'// para que muestre todos los errores
                    e.preventDefault();
                }else{
                    error.style.display = 'none';
                }
            }
            function validarMensaje(e){
                if(mensaje.value == '' || mensaje.value == null){
                    console.log('Porfavor deja un mensaje');
                    error.style.display = 'block';
                    error.innerHTML = error.innerHTML + '<li> Porfavor deja un mensaje</li>'// para que muestre todos los errores
                    e.preventDefault();
                }else{
                    error.style.display = 'none';// para que ya no aparezcan mensajes de error
                }
            }
            function validarFormulario(e){
                error.innerHTML = '';//para que se reinicien los errores encontrados
                validarNombre(e);
                validarMensaje(e);
        
            }
            formulario.addEventListener('submit',validarFormulario);
*/
            //ventana

            let cerrar = document.querySelectorAll(".close")[0];
            let abrir = document.querySelectorAll(".boton")[0];
            let msg = document.querySelectorAll(".msg")[0];
            let msgC = document.querySelectorAll(".msg-container")[0];

            abrir.addEventListener("click", function(e){
                
                e.preventDefault();
                msgC.style.opacity = "1";
                msgC.style.visibility = "visible";
                msg.classList.toggle("msg-close");
            });

            cerrar.addEventListener("click",function(){
                msg.classList.toggle("msg-close");//toggle lo que haces es quitar o poner
             
                setTimeout(function(){
                    msgC.style.opacity = "0";
                    msgC.style.visibility = "hidden";
                },850)
            });

            window.addEventListener("click", function(e){
                console.log(e.target)
                if(e.target == msgC){
                    msg.classList.toggle("msg-close");

                    setTimeout(function(){
                        msgC.style.opacity = "0";
                        msgC.style.visibility = "hidden";
                    },850)
                }
            });





            //Genera las previsualizaciones
            function createPreview(file) {
                var imgCodified = URL.createObjectURL(file);
                var img = $('<div class="col-xl-2 col-lg-2 col-md-3 col-sm-4 col-xs-12"><div class="image-container"> <figure> <img src="' + imgCodified + '" alt="Foto del usuario"> <figcaption> <i class="icon-cross"></i> </figcaption> </figure> </div></div>');
                $(img).insertBefore("#add-photo-container");
            } 


            function showModal(card) {
            $("#" + card).show();
            $(".modal").addClass("show");
            }

            function closeModal() {
            $(".modal").removeClass("show");
            setTimeout(function () {
                $(".modal .modal-card").hide();
            }, 300);
            }

            function loading(status, tag) {
            if (status) {
                $("#loading .tag").text(tag);
                showModal("loading");
            }
            else {
                closeModal();
            }
            }


            $(document).ready(function(){

            // Modal

            $(".modal").on("click", function (e) {
                console.log(e);
                if (($(e.target).hasClass("modal-main") || $(e.target).hasClass("close-modal")) && $("#loading").css("display") == "none") {
                    closeModal();
                }
            });

            // -> Modal

            // Abrir el inspector de archivos

            $(document).on("click", "#add-photo", function(){
                $("#add-new-photo").click();
            });

            // -> Abrir el inspector de archivos

            // Agarrmos el evento change

            $(document).on("change", "#add-new-photo", function () {
                console.log(this.files);
                var files = this.files;
                var element;
                var supportedImages = ["image/jpeg", "image/png", "image/jpg"];
                var seEncontraronElementoNoValidos = false;

                for (var i = 0; i < files.length; i++) {
                    element = files[i];

                    if (supportedImages.indexOf(element.type) != -1) {
                        createPreview(element);
                    }
                    else {
                        seEncontraronElementoNoValidos = true;
                    }
                }

              /*  if (seEncontraronElementoNoValidos) {
                    showMessage("Se encontraron archivos no validos.");
                }
                else {
                    showMessage("Todos los archivos se subieron correctamente.");
                }
*/
            });


            // Eliminar previsualizaciones

            $(document).on("click", "#Images .image-container", function(e){
                $(this).parent().remove();
            });

            // -> Eliminar previsualizaciones

        });
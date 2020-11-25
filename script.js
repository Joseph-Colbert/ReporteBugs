         //axios post

        var loading = document.getElementById('load');
        const button = document.getElementById('btn');
        button.addEventListener("click", ()=>{
            loading.style.display = '';
        axios({
            method: 'POST',
            url:'https://sandbox.zoundbar.com/zb-qa/api/v1/report/',
            data: {
                "issuerName": $('#nombre').val(),
                "description": $('textarea#mensaje').val(),
                "priority": $('#prioridad').val(),
                "module": $('#modulo').val()
                }
            })

            .then(res => console.log(res.data))
            .catch(err => console.log(err))
            .then(function() {
                loading.style.display = 'none';
              })
          });
       
       
        
        //para que la imagen aparezca

        const file = document.getElementById("file");
        const pC = document.getElementById("iP");
        const pI = pC.querySelector(".i");
        const pDT = pC.querySelector(".imagen");

        file.addEventListener("change", function(){
            const filee = this.files[0];

            if(filee){
                const reader = new FileReader();

                pDT.style.display = "none";
                pI.style.display = 'block';

                reader.addEventListener("load", function(){
                    console.log(this);
                    pI.setAttribute("src", this.result);
                });

                reader.readAsDataURL(filee);
            }else{
                pDT.style.display = null;
                pI.style.display = null;
                pI.setAttribute("src","");
            }
        });



        //para el error
            /*
		var formulario = document.getElementById('formulario'),
				nombre = formulario.nombre,
				mensaje = formulario.mensaje,
				error = document.getElementById('error');
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
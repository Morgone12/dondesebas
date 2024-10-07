
//addEventListener("evento", handleEvent, options); esta funcion cuenta con un tercer parametro: options, si solo pones options entonces no hara nada, si pones once: entonces el evento se ejecutara una vez y luego se eliminara del elemento que tenga este evento. si usas capture: Un valor booleano que indica que los eventos de este tipo serán enviados al receptor registrado antes de ser enviados a cualquier EventTarget por debajo de él en el árbol DOM. Si no se especifica, el valor predeterminado es false.

//usar removeEventListener("click", evento); para eliminar un evento, "click" puede ser reemplazado por cualquier otra cosa

//usar remove() y removeChild() para el crud

//usar elementoQueSeClonara.cloneNode(true); y elementoQueSeRemplazara.replaceWith(elementoRemplazador);

//replaceWith(); ESTE METODO NO CLONA EL ELEMENTO REMPLAZADOR, LO MUEVE DONDE VA A REEMPLAZAR.
//cloneNode(true OR false); ESTE METODO CLONA EL ELEMENTO Y SUS PARAMETROS, CLASES, ID, ETC. False: NO SE CLONAN LOS HIJOS; true: SE CLONAN LOS HIJOS DEL ELEMENTO.

//alert("mensaje"); muestra una ventana de alerta con un mensaje.

//setTimeout(funcionAEjectutar, cuentaAtrasMilisegundos);
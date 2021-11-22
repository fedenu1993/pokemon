$(document).ready(function () {
  const inputPokemon = document.getElementById("buscar-pokemon");
  let listaPokemon = document.getElementById("lista-pokemon");
  const maxVida = 255;
  const maxAta = 190;
  const maxDef = 250;
  const maxVel = 180;

  const estrellas = (max, numero, id, text) => {
    if (numero == max) {
      id.innerHTML = cincoStar;
      text.innerText = numero;
    }
    if (numero < max && numero >= (max * 4) / 5) {
      id.innerHTML = cuatroStar;
      text.innerText = numero;
    }
    if (numero < (max * 4) / 5 && numero >= (max * 3) / 5) {
      id.innerHTML = tresStar;
      text.innerText = numero;
    }
    if (numero < (max * 3) / 5 && numero >= (max * 2) / 5) {
      id.innerHTML = dosStar;
      text.innerText = numero;
    }
    if (numero < (max * 2) / 5) {
      id.innerHTML = unaStar;
      text.innerText = numero;
    }
  };
  const unaStar =
    '<i class="fas fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>';
  const dosStar =
    '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>';
  const tresStar =
    '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>';
  const cuatroStar =
    '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i>';
  const cincoStar =
    '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>';

  const cantTotalPokemon = async (valorInput) => {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/`);
      const data = await res.json();
      pasarPokemon(data.count, valorInput);
    } catch (error) {
      console.log(error);
    }
  };

  const pasarPokemon = (cantidad, valorInput) => {
    buscarSugerenciasPokemon(cantidad, valorInput);
  };

  const buscarSugerenciasPokemon = async (cantTotal, valorInput) => {
    const url = `https://pokeapi.co/api/v2/pokemon/?limit=${cantTotal}`;
    const res = await fetch(url);
    const data = await res.json();
    const v = new RegExp(valorInput);
    let array = [];
    data.results.forEach((pokemon) => {
      // console.log(pokemon.name);
      // console.log(v.test(pokemon.name), array.length)
      if (v.test(pokemon.name) && array.length < 10) {
        // console.log("si",pokemon.name);
        // console.log(pokemon);
        array.push(pokemon.name);
        // console.log("agregar")
      } else {
        return;
      }
    });
    // console.log(array);
    let contenido = "";
    array.forEach((nombrePokemon) => {
      contenido += `<option value="${nombrePokemon}">`;
    });
    listaPokemon.innerHTML = contenido;
    if (valorInput == "") {
      listaPokemon.innerHTML = "";
    }
  };

  inputPokemon.oninput = function (e) {
    valorInput = e.target.value.trim();
    cantTotalPokemon(valorInput);
  };

  let nombreCambiar = document.getElementById("nombreCambiar");
  let divImg = document.querySelector(
    ".col > div:nth-child(1) > div:nth-child(1)"
  );
  let spinnerBusqueda = document.getElementById("spinnerBusqueda");

  let vidaCambiar = document.getElementById("vidaCambiar");
  let ataCambiar = document.getElementById("ataCambiar");
  let defCambiar = document.getElementById("defCambiar");
  let velCambiar = document.getElementById("velCambiar");

  let textoVidaCambiar = document.getElementById("textoVidaCambiar");
  let textoAtaCambiar = document.getElementById("textoAtaCambiar");
  let textoDefCambiar = document.getElementById("textoDefCambiar");
  let textoVelCambiar = document.getElementById("textoVelCambiar");

  const buscarPokemon = async (valorInput) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${valorInput}`;
    const res = await fetch(url);
    const data = await res.json();
    const pokemon = {
      imagen: data.sprites.front_default,
      nombre: data.name,
      habilidades: {
        vida: data.stats[0].base_stat,
        ataque: data.stats[1].base_stat,
        defensa: data.stats[2].base_stat,
        velocidad: data.stats[5].base_stat,
      },
    };
    const vida = pokemon.habilidades.vida;
    const ataque = pokemon.habilidades.ataque;
    const defensa = pokemon.habilidades.defensa;
    const velocidad = pokemon.habilidades.velocidad;

    nombreCambiar.innerText = pokemon.nombre;

    divImg.innerHTML =
      '<img id="imgCambiar" src="" width="100%" height="225" alt="">';
    let imgCambiar = document.getElementById("imgCambiar");
    imgCambiar.src = pokemon.imagen;
    imgCambiar.alt = pokemon.nombre;
    spinnerBusqueda.remove();
    // console.log(spinnerBusqueda);

    estrellas(maxVida, vida, vidaCambiar, textoVidaCambiar);
    estrellas(maxAta, ataque, ataCambiar, textoAtaCambiar);
    estrellas(maxDef, defensa, defCambiar, textoDefCambiar);
    estrellas(maxVel, velocidad, velCambiar, textoVelCambiar);
  };

  inputPokemon.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
      let nombrePokemon = e.target.value;
      buscarPokemon(nombrePokemon);
    }
  });

  let btnBusqueda = document.getElementById("btn-busqueda");
  btnBusqueda.addEventListener("click", (e) => {
    e.preventDefault();
    let valor = $("#buscar-pokemon").val();
    buscarPokemon(valor);
  });


  ////////////////////////////////////////

  let totalPokemon = document.getElementById("total-pokemon");
  let paginasPokemon = document.getElementById("paginas-pokemon");

  const modeloPokemon = (
    src,
    nombre,
    vidaCantStar,
    vidaTxtStar,
    ataCantStar,
    ataTxtStar,
    defCantStar,
    defTxtStar,
    velCantStar,
    velTxtStar
  ) => {
    totalPokemon.innerHTML += `<div class="col-xs-12 col-md-4">
    <div class="card shadow-sm">
    <div class="div-pokemon">
    <img src="${src}" class="bd-placeholder-img card-img-top" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false">
    </div>
      <div class="card-body">
        <p class="card-text">${nombre}</p>
      </div>
      <table class="table">
          <tbody>
              <tr class="table-secondary">
                  <td  scope="row">Vida</td>
                  <td class="estrellas">${vidaCantStar}</td>
                  <td>${vidaTxtStar}</td>
              </tr>
              <tr class="table-danger">
                  <td  scope="row">Ataque</td>
                  <td class="estrellas">${ataCantStar}</td>
                  <td>${ataTxtStar}</td>
              </tr>
              <tr class="table-primary">
                  <td  scope="row">Defensa</td>
                  <td class="estrellas">${defCantStar}</td>
                  <td>${defTxtStar}</td>
              </tr>
              <tr class="table-warning">
                  <td  scope="row">Velocidad</td>
                  <td class="estrellas">${velCantStar}</td>
                  <td>${velTxtStar}</td>
              </tr>
          </tbody>
      </table>
    </div>
  </div>`;
  };

  const cantPaginaPokemon = async () => {
    const url = `https://pokeapi.co/api/v2/pokemon/`;
    const res = await fetch(url);
    const data = await res.json();
    crearPaginaPokemon(data.count / 21);
  };
  cantPaginaPokemon();

  const crearPaginaPokemon = (a) => {
    // console.log(parseInt(a+1));
    let elemento =
      '<li class="page-item disabled"><a class="page-link" href="" tabindex="-1">Anterior</a></li>';
    let cant = parseInt(a + 2);
    for (let index = 1; index < cant; index++) {
      if (index == 1) {
        elemento += `<li class="page-item active" aria-current="page"><a class="page-link" href="">${index}</a></li>`;
      } else {
        if (index < 6) {
          elemento += `<li class="page-item"><a class="page-link" href="">${index}</a></li>`;
        } else {
          elemento += `<li class="page-item d-none"><a class="page-link" href="">${index}</a></li>`;
        }
      }
    }
    elemento +=
      '<li class="page-item"><a class="page-link" href="">Siguiente</a></li>';
    paginasPokemon.innerHTML = elemento;
  };

  const estrellasLista = (max, numero) => {
    if (numero == max) {
      return cincoStar;
    }
    if (numero < max && numero >= (max * 4) / 5) {
      return cuatroStar;
    }
    if (numero < (max * 4) / 5 && numero >= (max * 3) / 5) {
      return tresStar;
    }
    if (numero < (max * 3) / 5 && numero >= (max * 2) / 5) {
      return dosStar;
    }
    if (numero < (max * 2) / 5) {
      return unaStar;
    }
  };

  const insertarPokemonId = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data.id);
    src = data.sprites.front_default;
    nombre = data.name;
    vidaTxtStar = data.stats[0].base_stat;
    vidaCantStar = estrellasLista(maxVida, vidaTxtStar);
    ataTxtStar = data.stats[1].base_stat;
    ataCantStar = estrellasLista(maxAta, ataTxtStar);
    defTxtStar = data.stats[2].base_stat;
    defCantStar = estrellasLista(maxDef, defTxtStar);
    velTxtStar = data.stats[5].base_stat;
    velCantStar = estrellasLista(maxVel, velTxtStar);

    modeloPokemon(
      src,
      nombre,
      vidaCantStar,
      vidaTxtStar,
      ataCantStar,
      ataTxtStar,
      defCantStar,
      defTxtStar,
      velCantStar,
      velTxtStar
    );
  };

  const generarLista = async (pagina) => {
    index = pagina == 1 ? 1 : 1 + 21 * (pagina - 1);
    // console.log({"desde":index,"cuantos":21*pagina});
    for (index; index < 21 * pagina + 1; index++) {
      await insertarPokemonId(index);
    }
  };

  let active = 1;
  const pag = document.querySelector(".pagination");
  pag.addEventListener("click", (e) => {
    e.preventDefault();
    totalPokemon.innerHTML = "";
    // console.log(e.target)
    // Selecciona pagina
    let pagElementos = pag.childNodes;
    const limpiarClassActive = () => {
      pagElementos.forEach((element) => {
        // console.log(element.nodeName);
        if (element.nodeName == "LI") {
          element.removeAttribute("aria-current", "page");
          element.classList.remove("active");
        }
      });
    };
    active = parseInt(
      document.querySelector(".pagination .active").children[0].innerHTML
    );

    if (e.target.textContent > 0) {
      // console.log(e.target);
      // console.log(pag.children);
      limpiarClassActive();
      e.target.parentElement.setAttribute("aria-current", "page");
      e.target.parentElement.classList.add("active");
      active = e.target.innerText;
      console.log(active);
    }

    // Desactivar o Activar a Anterior/Siguiente
    let arrayPaginas = [];
    const pagItem = document.getElementsByClassName("page-link");
    // Array.from(pagItem) convierte HTMLCollection en array, saca el array que tiene adentro
    Array.from(pagItem).forEach((e) => {
      if (e.innerText > 0) {
        arrayPaginas.push(e.innerText);
      }
    });
    // console.log(arrayPaginas);

    // Boton Anterior y Boton Siguiente accion

    let anteriorClases = Array.from(e.target.classList);
    if (
      e.target.innerText == "Anterior" &&
      anteriorClases.indexOf("disabled") == -1
    ) {
      // Limpiar la clase Active para reasignarla a la Anterior Pag
      limpiarClassActive();
      pag.children[active - 1].setAttribute("aria-current", "page");
      pag.children[active - 1].classList.add("active");
      if (
        Array.from(pag.children[active - 1].classList).indexOf("d-none") &&
        pag.children[active + 5] !== undefined
      ) {
        pag.children[active - 1].classList.remove("d-none");
        pag.children[active + 4].classList.add("d-none");
      }
      active = pag.children[active - 1].innerText;
    }

    let siguienteClases = Array.from(e.target.classList);
    if (
      e.target.innerText == "Siguiente" &&
      siguienteClases.indexOf("disabled") == -1
    ) {
      // Limpiar la clase Active para reasignarla a la Siguiente Pag
      limpiarClassActive();
      pag.children[active + 1].setAttribute("aria-current", "page");
      pag.children[active + 1].classList.add("active");
      if (
        Array.from(pag.children[active + 1].classList).indexOf("d-none") &&
        pag.children[active - 5] !== undefined
      ) {
        pag.children[active + 1].classList.remove("d-none");
        pag.children[active - 4].classList.add("d-none");
      }
      active = pag.children[active + 1].innerText;
    }

    // Boton Anterior y Boton Siguiente desactivar o activar
    if (active > arrayPaginas[0]) {
      pag.firstElementChild.classList.remove("disabled");
      pag.firstElementChild.children[0].removeAttribute("tabindex", "-1");
    } else {
      pag.firstElementChild.classList.add("disabled");
      pag.firstElementChild.children[0].setAttribute("tabindex", "-1");
    }
    if (active < arrayPaginas.length) {
      pag.lastElementChild.classList.remove("disabled");
      pag.lastElementChild.children[0].removeAttribute("tabindex", "-1");
    } else {
      pag.lastElementChild.classList.add("disabled");
      pag.lastElementChild.children[0].setAttribute("tabindex", "-1");
    }

    generarLista(active);
  });
  generarLista(active);
});

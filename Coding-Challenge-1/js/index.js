function doSomething(busqueda){
  let config = {
    method: 'GET'
  };
  let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${busqueda}`;
  console.log(url);
  fetch(url,config)
  .then(respuestaAPI => {
    if (respuestaAPI.ok) {
      return respuestaAPI.json();
    }
    throw new Error("Error")
  })
  .then(respuesta => {
    show(respuesta);
  })
  .catch(err => {
    console.log(err);
  }
  );

}

function show(respuesta){
  console.log(respuesta);
  let resultados = document.querySelector('.js-search-results');
  if (respuesta.meals == null) {
    resultados.innerHTML = "<h1>Meal not found</h1>"
    return ;
  } else {
    for (var i = 0; i < respuesta.meals.length; i++) {
      resultados.innerHTML += `<h1>${respuesta.meals[i].strMeal}</h1><h2>${respuesta.meals[i].strArea}</h2><p> ${respuesta.meals[i].strInstructions}</p><img src="${respuesta.meals[i].strMealThumb}" />`;
    }
  }


}

function watchInput(){
  let mealForm = document.querySelector('.js-search-form');

  mealForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let busqueda = document.querySelector('#query').value;

    doSomething(busqueda);
  });
}

function init(){
  watchInput();
}

init();

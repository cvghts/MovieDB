'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };
    
    const adv = document.querySelectorAll(".promo__adv img"),
          poster = document.querySelector(".promo__bg"),
          genre = poster.querySelector('.promo__genre'),
          movieList = document.querySelector('.promo__interactive-list'),
          addForm = document.querySelector('form.add'),
          addInput = addForm.querySelector('.adding__input'),
          checkbox = addForm.querySelector('[type="checkbox"]');

    
    //1)после заполнения формы
    addForm.addEventListener('submit', (event) => {
        //Страница не должна перезагружаться
        event.preventDefault();

        let newFilm = addInput.value;
        const favorite = checkbox.checked;

        if(newFilm) {
            //2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки
            if(newFilm.length > 21) {
                newFilm = `${newFilm.substring(0, 22)}...`
            }

            /*4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
            "Добавляем любимый фильм" */
            if(favorite) {
                console.log("Додаємо улюблений фільм");
            }

            movieDB.movies.push(newFilm);
            //5) Фильмы должны быть отсортированы по алфавиту
            sortArr(movieDB.movies);

            //новый фильм добавляется в список
            createMovieList(movieDB.movies, movieList);
        }

        event.target.reset();
    });
    
    const deleteAdv = (arr) => {
        arr.forEach(item => {
            item.remove();
        });
    };

    const makeChanges = () => {
        genre.textContent = 'драма';
    
        poster.style.backgroundImage = 'url("img/bg.jpg")';
    };
    
    const sortArr = (arr) => {
        arr.sort();
    }
    
    movieDB.movies.forEach((film, i) => {
        movieList.innerHTML += `
            <li class="promo__interactive-item">
                ${i+1} ${film}
                <div class="delete"></div>
            </li>
        `;
    });

    function createMovieList(films, parent) {
        parent.innerHTML = '';
        sortArr(films);

        films.forEach((film, i) => {
            parent.innerHTML += `
                <li class="promo__interactive-item">
                    ${i+1} ${film}
                    <div class="delete"></div>
                </li>
            `;
        });

        //3) При клике на мусорную корзину - элемент будет удаляться из списка
        document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                films.splice(i, 1);
                createMovieList(films, parent);
            });
        });
    }

    deleteAdv(adv);
    makeChanges();
    createMovieList(movieDB.movies, movieList);

});





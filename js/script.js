'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const movieDB = {
        movies: [
            "Логан",
            "Ліга справедливості",
            "Ла-ла ленд",
            "Одержимість",
            "Скотт Пілігрим проти..."
        ]
    };
    
    const adv = document.querySelectorAll(".promo__adv img"),
          poster = document.querySelector(".promo__bg"),
          genre = poster.querySelector('.promo__genre'),
          movieList = document.querySelector('.promo__interactive-list'),
          addForm = document.querySelector('form.add'),
          addInput = addForm.querySelector('.adding__input'),
          checkbox = addForm.querySelector('[type="checkbox"]');

    
    //1)після заповнення форми
    addForm.addEventListener('submit', (event) => {
        //Сторінка не повинна перезавантажуватись
        event.preventDefault();

        let newFilm = addInput.value;
        const favorite = checkbox.checked;

        if(newFilm) {
            //2) Якщо назва фільму більше, ніж 21 символ - обрізати його та додати три крапки
            if(newFilm.length > 21) {
                newFilm = `${newFilm.substring(0, 22)}...`
            }

            /*4) Якщо у формі стоїть галочка "Зробити улюбленим" - у консоль вивести повідомлення:
            "Додаємо улюблений фільм" */
            if(favorite) {
                console.log("Додаємо улюблений фільм");
            }

            movieDB.movies.push(newFilm);
            //5) Фільми мають бути відсортовані за алфавітом
            sortArr(movieDB.movies);

            //новий фільм додається до списку
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

        //3) При натисканні на сміттєвий кошик - елемент видалятиметься зі списку
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





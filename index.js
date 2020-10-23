import Slider from './js/slider';
import Navigator from './js/navigator.js'; {
    const slider = new Slider('cardWrap', 10);
    // const navigator = new Navigator('cardNav', 'leftBtn', 'rightBtn', 10);

    const nav = document.getElementById('nav');


    const ifMaxCount = 10;

    let navWidth = nav.clientWidth;
    let navUnit = navWidth / 5;
    let memIdx = 0;
    const leftMaxIdx = 2;
    const rightMaxIdx = ifMaxCount - 3

    nav.addEventListener('click', (e) => {
        /* 이미지 선택시 */
        const images = nav.children;
        for (let image of images) {
            const classList = image.classList;
            if (classList.contains('on')) {
                classList.remove('on');
            }
        }

        const tgt = e.target;
        tgt.classList.add('on');

        const idx = tgt.dataset.idx;

        if (memIdx < idx && leftMaxIdx < idx) {
            nav.scrollLeft += navUnit;
        } else if (memIdx > idx && rightMaxIdx > idx) {
            nav.scrollLeft -= navUnit;
        }



        slider.moveTo(idx);

        memIdx = idx;
    });

    slider.addMoveEventListener((e) => {
        // navigator.moveToDirection(e.direction);
        const images = nav.children;
        for (let image of images) {
            const classList = image.classList;
            if (classList.contains('on')) {
                classList.remove('on');
            }
        }

        const idx = slider.idx;

        images[idx].classList.add('on')

        if (memIdx < idx && leftMaxIdx < idx) {
            nav.scrollLeft += navUnit;
        } else if (memIdx > idx && rightMaxIdx > idx) {
            nav.scrollLeft -= navUnit;
        }

        memIdx = idx;

    });

    window.addEventListener('touchstart', (e) => {
        if (slider.isScrolling) {
            e.preventDefault();
        }
    }, {
        passive: false,
        capture: false
    });

    window.addEventListener('resize', (e) => {
        slider.resizingWrapper();
        navWidth = nav.clientWidth;
        navUnit = navWidth / 5;
    });

}
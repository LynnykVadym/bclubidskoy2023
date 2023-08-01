const swiper = new Swiper( '.slider-main-block', {
    // Optional parameters
    loop: true,
    // Navigation arrows
    navigation: {
        nextEl: '.body-main-block__arrow.swiper-button-next',
        prevEl: '.body-main-block__arrow.swiper-button-prev'
    }
} );

// Таби
const tabNavItems = document.querySelectorAll( '.tabs-deals__button' );
const tabItems = document.querySelectorAll( '.item-tabs' );
document.addEventListener( 'click', function ( e ) {
    const targetElement = e.target;
    let currentActiveIndex = null;
    let newActiveIndex = null;
    if ( targetElement.closest( '.tabs-deals__button' ) ) {
        tabNavItems.forEach( ( tabNavItem, index ) => {
            if ( tabNavItem.classList.contains( 'active' ) ) {
                currentActiveIndex = index;
                tabNavItem.classList.remove( 'active' );
            }
            if ( tabNavItem === targetElement ) {
                newActiveIndex = index;
            }
        } );
        targetElement.classList.add( 'active' );
        tabItems[currentActiveIndex].classList.remove( 'active' );
        tabItems[newActiveIndex].classList.add( 'active' );
    }
} );

'use strict';

document.addEventListener( 'DOMContentLoaded', function () {
    const form = document.getElementById( 'form' );
    form.addEventListener( 'submit', formSend );

    async function formSend( e ) {
        e.preventDefault();

        let error = formValidate( form );

    }

    function formValidate( form ) {
        let error = 0;
        let formReq = document.querySelectorAll( '._req' );

        for ( let index = 0; index < formReq.length; index++ ) {
            const input = formReq[index];
            formRemoveError( input );

            if ( input.classList.contains( '_email' ) ) {
                if ( emailTest( input ) ) {
                    formAddError( input );
                    error++;
                }
               else if ( input.getAttribute( 'type' ) === 'checkbox' && input.checked === false ) {
                    formAddError( input );
                    error++;
                } else {
                    if ( input.value === '' ) {
                        formAddError( input );
                        error++;
                    }
                }
            }
            return error;
        }

        function formAddError( input ) {
            input.parentElement.classList.add( '_error' );
            input.classList.add( '_error' );
        }

        function formRemoveError( input ) {
            input.parentElement.classList.remove( '_error' );
            input.classList.remove( '_error' );
        }

        //Функция теста email
        function emailTest( input ) {
            return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test( input.value );
        }
    };
} );
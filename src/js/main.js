;$(document).ready(function() {
    let
        modal = $('.modal'),
        menu = $('.header__menu'),
        form = $('.modal form'),
        burger = $('.burger'),
        menuItems = menu.find('li'),
        nameInput = $('form input[name=name]'),
        mailInput = $('form input[name=email]'),
        nameValidated = false,
        mailValidated = false,
        menuOpened = false;

    $('form input')
        .on('focus', function() {
            $(this).removeClass('input_error');
        })
        .on('blur', function() {
            if($(this).attr('name') === 'name') {
                validateNameInput();
            } else if($(this).attr('name') === 'email') {
                validateMailInput();
            }
            
        });

    $('#contact_us').click(function(e) {
        e.preventDefault();
        modal.addClass('modal__active');
        if(menuOpened) {
            closeMenu()
        }
    });

    modal.click(function(e) {
        if(e.target.closest('form')) return;
        modal.removeClass('modal__active');
    });

    burger.click(function() {
        menuOpened ? closeMenu() : openMenu();
    });

    form.on('submit', function(e) {
        e.preventDefault();
        validateNameInput();
        validateMailInput();
        
        if(!mailValidated || !nameValidated) return;

        $.ajax({
            url: $(this).attr('action'),
            method: "POST",
            data: $(this).serialize(),
            success: function() {
                modal.removeClass('modal__active');
                alert('Good!');
            },
            error: function(err) {
                console.log(err);
            }

        })
    });


    function validateNameInput() {
        if(nameInput.val().match(/^[A-Za-zА-ЯЁа-яё ?]+$/gi)) {
            nameInput.removeClass('input_error');
            nameValidated = true;
        } else {
            nameInput.addClass('input_error');
            nameValidated = false;
        }
    }

    function validateMailInput() {
        if(mailInput.val().match(/\w+@\w+\.\w+/gi)) {
            mailInput.removeClass('input_error');
            mailValidated = true;
        } else {
            mailInput.addClass('input_error');
            mailValidated = false;
        }
    }

    function openMenu() {
        menu.addClass('header__menu_active');

        burger.addClass('burger__active');

        setTimeout(function() {
            (function showByTurn(i) {
                if(i === menuItems.length) {
                    menuOpened = true;
                    return;
                }
                $(menuItems[i]).addClass('active');
                setTimeout(function() {
                    showByTurn(i + 1);
                },100);
            })(0);
        }, 300);
    }

    function closeMenu() {
        burger.removeClass('burger__active');
        menu.removeClass('header__menu_active');
        menuItems.removeClass('active');
        setTimeout(function() {
            menuOpened = false;
        }, 500);
    }
});
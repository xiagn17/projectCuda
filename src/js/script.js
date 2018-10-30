$(document).ready(function() {

    /* scrolling to contact-form when clicking main button + animation*/

    function scrollingTo (classPlace) {
        $([document.documentElement, document.body]).animate({
            scrollTop: classPlace.offset().top
        }, 2000);
    }

    $(".main-button-click").click(function () {
        let button = $('.main-button');
        let animationNameMainbutton = 'animated fadeOutUp';

        button.addClass(animationNameMainbutton);
        button.one(animationEnd, function () {
            $(this).removeClass(animationNameMainbutton);
        });

        scrollingTo($('.contact'));
    });

    /* menu-buttons  (nav-bar) */

    $(".menu-link").on("click", function (event) {
        event.preventDefault();
        let attr = $(this).attr("href");

        scrollingTo($(attr));
    });


    $(".menu-btn").on("click", function (event) {
        event.preventDefault();

        $(this).toggleClass("menu-btn-active");
        $(".menu-nav").toggleClass("menu-nav-active");
        $(".menu-nav-link").toggleClass("menu-nav-link-active");
    });
    $(".menu-nav-link").on("click", function (event) {
        event.preventDefault();
        let attr = $(this).attr("href");

        $(".menu-btn").toggleClass("menu-btn-active");
        $(".menu-nav").toggleClass("menu-nav-active");
        $(".menu-nav-link").toggleClass("menu-nav-link-active");

        scrollingTo($(attr));
    });


    $(".menu-slide-btn").on("click", function (event) {
        event.preventDefault();

        $(this).toggleClass("menu-slide-btn-active");
        $(".menu-slide").toggleClass("menu-slide-active");
    });
    $(".menu-slide-nav-link").on("click", function (event) {
        event.preventDefault();
        let attr = $(this).attr("href");

        $(".menu-slide-btn").toggleClass("menu-slide-btn-active");
        $(".menu-slide").toggleClass("menu-slide-active");

        scrollingTo($(attr));
    });




    /* process bar appears when scrolling down */

    let processBar_array = $('.process-bar');      /* pseudo-array of bars*/

    function waypoint_trigger (direction) {          /*triggered when waypoint has been scrolled*/
        let point = new ldBar(this.element);
        let pointPercent = this.element.dataset.percent;

        point.set(pointPercent);
    }

    Array.prototype.forEach.call(processBar_array, function (element) {
        new Waypoint({
            element: element,
            handler: waypoint_trigger,
            offset: '95%',
            group: 'bars'
        })
    });


    /* showing and hiding labels at contact-forms */

    let contactForms_inputAreas = [$('.contact-form-inputs input'), $('.contact-form-textarea textarea')];

    contactForms_inputAreas.forEach(function (element) {
        element
            .on('focus', function () {
                $(this).siblings('label').hide();
            })
            .on('blur', function () {
                if (!$(this).val())
                    $(this).siblings('label').show();
            });
    });


    /* animation */

    let animationEnd = (function (element) {
        let animations = {
            animation: 'animationend',
            OAnimation: 'oAnimationEnd',
            MozAnimation: 'mozAnimationEnd',
            WebkitAnimation: 'webkitAnimationEnd',
        };

        for (let prop in animations) {
            if (element.style[prop] !== undefined) {
                return animations[prop];
            }
        }
    })(document.createElement('div'));


    /* sliders */

    let sliders_array = [$('.services-slider'), $('.team-slider')];

    sliders_array.forEach(function (element) {
        element.slick({
            infinite: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 575,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    });



    /* fix-button(when clicking by span), sending form's and button animation*/


    $('.contact-form-button span').on('click', function (event) {
        $(this).siblings('input').trigger('click');
    });


    let contact_form = $('.contact-form');

    contact_form.submit(function (event) {
        event.preventDefault();

        let form_button = $('.contact-form-button');
        let animationNameButton = 'animated bounceIn';

        form_button.addClass(animationNameButton);
        form_button.one(animationEnd, function () {
            $(this).removeClass(animationNameButton);
        });


        let popup = $('.contact-popup');
        popup.css('display', 'flex').addClass('showPopup').removeClass('showPopup');

        let popupChild = popup.children();
        let animationNamePopup = 'animated flipInX';

        popupChild.addClass(animationNamePopup);
        popupChild.one(animationEnd, function () {
            $(this).removeClass(animationNamePopup);
        });
        setTimeout(function () {
            popup.fadeOut();
        }, 5000);


        $.ajax({
            type: "POST",
            url: "vendor/mailer/send.php",
            data: $(this).serialize()
        }).done(function () {
            $(this).find("input").val("");
            contact_form
                .trigger("reset")
                .find('label').css('display', 'inline-block')         /* labels show after sending*/
        });

        return false;
    });


    
    $('.filter').on('click', function (event) {
        event.preventDefault();

        $(this).addClass('filter-active');
        $(this).siblings().each(function () {
            $(this).removeClass('filter-active');
        });


        let category = String($(this).data('filter'));      /* category of project to display*/
        let sections = $('.portfolio-main').parent(':not(.hidden)').children();

        sections.each(function () {
            let cur = $(this);

            cur.slideUp(300);
            setTimeout(function () {
                cur.parent().css('display', 'none');
            }, 300);
        });
        setTimeout(function () {
            sections.each(function () {
                let cur = $(this);

                if (!cur.parent().hasClass('hidden') && cur.hasClass(category)){
                    cur.parent().css('display', 'block');
                    cur.slideDown(300);
                }
            });
        }, 300);

    });




    $('.portfolio-button-click').on('click', function () {

        let parents_new = $('.portfolio-father.hidden');
        parents_new
            .removeClass('hidden')
            .each(function () {
                let cur = $(this);

                cur.css('display', 'none');
                cur.children().slideUp(1);
        });

        let sections_new = parents_new.children();
        let category = String($('.filter-active').data('filter'));

        sections_new.each(function () {
            let cur = $(this);

            if (!cur.parent().hasClass('hidden') && cur.hasClass(category)){
                cur.parent().css('display', 'block');
                cur.slideDown(300);
            }
        });


        $('.portfolio-button').fadeOut(function () {
            $(this).parent().parent().remove();          /* deleting a row with the button*/
        });
    });


});



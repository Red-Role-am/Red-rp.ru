var respons = {
    winState: "",
    smallMedium: false,
    mediumLarge: false,
    sw: 0,
    scrollW: 0,
    large: 1100,
    medium: 800,
    sbWidth: function() {
        $("body").append("<div id='sbarWidth' style='overflow-y: scroll; width: 50px; height: 50px;visibility: hidden'></div>");
        var div = $("#sbarWidth")[0];
        var scrollWidth = div.offsetWidth - div.clientWidth;
        document.body.removeChild(div);
        return scrollWidth;
    },
    sbCheck: function() {
        var b;
        if ($(window).height() >= $(document).height()) {
            b = false;
        } else {
            b = true;
        }
        return b;
    },
    rCheck: function() {
        if (this.sbCheck()) {
            this.sw = $(window).width() + this.scrollW;
        } else {
            this.sw = $(window).width();
        }
        if (this.sw > this.medium) {
            if (!this.mediumLarge) {
                /* Вызов функций для больших и средних экранов */
                this.mediumLarge = true;
            }
            if (this.sw > this.large) {
                if (this.winState != "large") {
                    /* Вызов функций для больших экранов */
                    mobileMenu.destroy();
                    this.winState = "large";
                    this.smallMedium = false;
                };
            };
        };
        if (this.sw <= this.large) {
            if (!this.smallMedium) {
                /* Вызов функций для средних и маленьких экранов */
                mobileMenu.enable();
                this.smallMedium = true;
            }
            if (this.sw > this.medium && this.sw <= this.large) {
                if (this.winState != "medium") {
                    /* Вызов функций для планшетных экранов */

                    this.winState = "medium";
                }
            } else {
                if (this.winState != "small") {
                    /* Вызов функций для мобильных экранов */
                    this.mediumLarge = false;
                    this.winState = "small";
                }
            };
        }
    },
    init: function() {
        var $this = this;
        $this.scrollW = $this.sbWidth();
        $this.rCheck();
        $(window).resize(function() {
            $this.rCheck();
        });
    }
};

var mobileMenu = {
    button: $(".hm_but"),
    menu: $(".hm_list"),
    wrap: $(".h_menu"),
    itemsLvl1: $(".hm_list > li > a"),
    enable: function() {
        var $this = this;
        $this.menu.hide();
        $this.button.on("click.menu", function() {
            if ($this.button.hasClass("active")) {
                hide();
            } else {
                show();
            }
        });
        $(window).on("click.menu", function(e) {
            if ($(e.target).closest($this.wrap).length > 0) {
                return;
            } else {
                hide();
            };
        });
        //$(".hm_close").on("click", hide);
        $this.itemsLvl1.on("click", function(e) {
            if ($(this).siblings(".hm_lvl2").length) {
                e.preventDefault();
                $(this).toggleClass("active");
            };
        });
        $this.itemsLvl1.on("dblclick", function(e) {
            window.location.href = $(this).attr("href");
        });

        function show() {
            $("body").addClass("menuActive");
            $("html, body").css("overflow", "hidden");
            $this.button.addClass("active");
            $this.menu.slideDown(200);
        };

        function hide() {
            $("body").removeClass("menuActive");
            $("html, body").css("overflow", "visible");
            $this.button.removeClass("active");
            $this.menu.hide();
        };
    },
    destroy: function() {
        $("body").removeClass("menuActive");
        $("html, body").css("overflow", "visible");
        $(window).off("click.menu");
        this.button.off(".menu");
        //$(".hm_close").off("click");
        this.menu.find("a").off(".menu");
        this.itemsLvl1.off("click").removeClass("active");
        this.button.removeClass("active");
        this.menu.show();
    },
};

function clipbrdInit() { // Скопировать ip
    var timerCnt = 0,
        defaultText = $(".fss_copy").eq(0).text(),
        copyText = "Скопировано"
    $(".fs_body").on("click", ".fss_icoCopy, .fss_copy", function() {
        clearTimeout(timerCnt);
        $(".fss_icoCopy").removeClass("active");
        $(".fss_copy").text(defaultText).removeClass("active");


        var ip = $(this).parent().data("ip"),
            $ipIcon = $(this).parent().find(".fss_icoCopy"),
            $ipTextEl = $(this).parent().find(".fss_copy");

        clipboard.writeText(ip);
        $ipIcon.addClass("active");
        $ipTextEl.text(copyText).addClass("active");
        timerCnt = setTimeout(function() {
            $ipTextEl.text(defaultText).removeClass("active");
            $ipIcon.removeClass("active");
        }, 3000);
    });
};
$(function() {
    respons.init();
    $("input, select").styler();
    $(".fancybox").fancybox({
        padding: 0,
        selector: '.owl-item a.fancybox'
    });
    if ($(".d_crsl").length) {
        $(".d_crsl").slick({
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            vertical: true,
            verticalSwiping: true,
            responsive: [{
                    breakpoint: 1000,
                    settings: {
                        vertical: false,
                        verticalSwiping: false,
                    }
                },
                {
                    breakpoint: 700,
                    settings: {
                        slidesToShow: 2,
                        vertical: false,
                        verticalSwiping: false,
                    }
                },
                {
                    breakpoint: 420,
                    settings: {
                        slidesToShow: 1,
                        vertical: false,
                        verticalSwiping: false,
                    }
                },
            ]
        });
    };
    if ($(".pp_orgTable").length) {
        $(".pp_orgTable").tabs();
    };
    if ($(".m_tabs").length) {
        $(".m_tabs").tabs();
    };
    if ($(".r_body").length) {
        $(".r_body").owlCarousel({
            nav: true,
            loop: true,
            smartSpeed: 700,
            responsive: {
                0: {
                    items: 1,
                },
                360: {
                    items: 2,
                    margin: 12,
                },
                620: {
                    items: 3,
                    margin: 24,
                },
                900: {
                    items: 4,
                    margin: 36,
                }
            }
        });
    };

    $(".ppot_dropBut").on("click", function() {
        $(this).toggleClass("active").parents(".ppot_position").toggleClass("active");
    });

    if ($(".am_lvl .circle").length) {
        var Circle = function(sel) {
            var circles = document.querySelectorAll(sel);
            [].forEach.call(circles, function(el) {
                var valEl = parseFloat(el.innerHTML);
                valEl = valEl * 408 / 100;
                el.innerHTML = '<svg width="160" height="160"><linearGradient id="linear-gradient"><stop offset="0%" stop-color="#16AEFD"/><stop offset="100%" stop-color="#6846E8"/></linearGradient><circle style="stroke-dasharray:' + valEl + 'px 408px;" r="65" cx="80" cy="80" /></svg>';

            });
        };
        Circle('.circle');
    };
    clipbrdInit();

    AOS.init();

    $("#toTop").on("click", function() {
        $("html, body").animate({
            scrollTop: 0
        });
    });

    function hideToTop() {
        if ($(window).scrollTop() > 400) {
            $("#toTop").addClass("active");
        } else {
            $("#toTop").removeClass("active");
        }
    };
    hideToTop();
    $(window).on("scroll", function() {
        hideToTop();
    });

});
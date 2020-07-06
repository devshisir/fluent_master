function redirect1() {
    $(".form_3_input1").addClass("show").removeClass("hide"), $(".form_3_input2").addClass("hide").removeClass("show"), $(".form_3_input3").addClass("hide").removeClass("show"), $(".form_3_input4").addClass("hide").removeClass("show"), $("#name").focus(), $("#name").click()
}

function redirect2() {
    $(".form_3_input1").addClass("hide").removeClass("show"), $(".form_3_input2").addClass("show").removeClass("hide"), $(".form_3_input3").addClass("hide").removeClass("show"), $(".form_3_input4").addClass("hide").removeClass("show"), $("#phone").focus(), $("#phone").click()
}

function redirect3() {
    $(".form_3_input1").addClass("hide").removeClass("show"), $(".form_3_input2").addClass("hide").removeClass("show"), $(".form_3_input3").addClass("show").removeClass("hide"), $(".form_3_input4").addClass("hide").removeClass("show"), $("#email").focus(), $("#email").click()
}

function scrollFunction() {
    document.body.scrollTop > 40 || document.documentElement.scrollTop > 40 ? ($(".hideBook").css({
        display: "block"
    }), $(".bookParent").css({
        display: "block"
    })) : ($(".hideBook").css({
        display: "none"
    }), $(".bookParent").css({
        display: "none"
    }))
}

function phoneCheck() {
	phone.value.length < 6 ? (PhoneNext.classList.remove("show"), phoneError.innerHTML = "Error. Please enter 10 digit mobile no.", PhoneNext.classList.add("dissable")) : (phoneError.innerHTML = "", PhoneNext.classList.remove("dissable"), PhoneNext.classList.add("show"))
}
$("#mobile_quote_btn_link").on("click", function (a) {
    a.preventDefault(), $("#form_area").addClass("show")
}), $(".new_mobile_form_Close").on("click", function (a) {
    a.preventDefault(), $("#form_area").removeClass("show")
}), $("input").click(function () {
    $(".hideBook").css({
        display: "none"
    }), $(".bookParent").css({
        display: "none"
    })
}), $("input").focusout(function () {}), window.onscroll = function () {
    scrollFunction()
}, $(document).keypress(function () {
    if ($("#name").on("keydown", function (a) {
            13 == a.keyCode && $("#nameNext").click()
        }), $("#email").on("keydown", function (a) {
            13 == a.keyCode && $("#EmailNext").click()
        }), $("#phone").on("keydown", function (a) {
            13 == a.keyCode && $("#PhoneNext").click()
        }), $("#drop_val").on("keydown", function () {
            event.stopPropagation()
        }), $("#dropState").on("keydown", function () {
            event.stopPropagation()
        }), $(".form_3_input4").hasClass("show")) {
        if ("0" == $("#drop_val").val()) return void mdtoast("Please select an option", {
            type: "info"
        });
        $("#inputNext4").click()
    }
}), $("[data-pin]").pin({
    allowSequential: !0,
    allowRepeat: !0,
    count: 4
}), $(document).ready(function () {
    function a(a) {
        a.innerHTML = ""
    }

    function a(a) {
        a.innerHTML = ""
    }
    $("select").on("change", function () {
        "0" != this.value &&
            ($("#progress8").removeAttr("hidden"),
            $("#progress4").hide(),
            $("#phone").focus(),
            $("#inputNext4").css("background", "#FF9C40"),
            $("#progressBar8").animate(
                {
                    width: "100%",
                },
                300
            ));
    });
    var b = $(".sightbox__slideshow");
    $("#sightbox__slide--2").show(), b.slick({
        arrows: !1,
        autoplay: !0,
        infinite: !1,
        dots: !0
    });
    var c = document.querySelectorAll(".slick-dots button");
    c.forEach(a), b.on("afterChange", function (a, c, d) {
        console.log(d), 1 === d && (setTimeout(function () {
            b.slick("slickGoTo", 0)
        }, 2e3), console.log("last slide"))
    });
    var d = $(".sightbox__slideshow1");
    $("#sightbox__slide1--2").show(), d.slick({
        arrows: !1,
        autoplay: !0,
        infinite: !1,
        dots: !0
    });
    var c = document.querySelectorAll(".slick-dots button");
    c.forEach(a), d.on("afterChange", function (a, b, c) {
        console.log(c), 1 === c && (setTimeout(function () {
            d.slick("slickGoTo", 0)
        }, 2e3), console.log("last slide"))
    }), $("#name").focus(), $(this).scrollTop(0), $("form input:radio").change(function () {
        "Others" == $(this).val() && $("#SubmitButton").attr("class", "showSubmit")
    })
}), $("#name").focus(), jQuery(document).bind("pageshow", function () {
	jQuery($("#name")).focus()
}), $("input").on("keyup", function () {
	$(this).scrollTop(0)
}), errorMsg = document.querySelector("#phoneError"), input = document.querySelector("#phone"), $("#phone").on("input", function (e) {
	if (input.value.trim())
		if (10 == input.value.trim().length) {
			console.log("+"), $("#phoneCode").text("+"), $("#inputNext2").css("background", "#FF9C40"), $("#inputNext2").css("background", "#FF9C40"), phoneCheck()
		} else input.classList.add("error"), errorMsg.innerHTML = "Error. Enter valid number.", errorMsg.classList.remove("hide"), $("#inputNext2").css("background", "#C4C4C4"), phoneError.innerHTML = "Error. Enter valid number.", PhoneNext.classList.add("dissable")
});
var phoneError = document.getElementById("phoneError"),
	PhoneNext = document.getElementById("inputNext2"),
	phone = document.getElementById("phone");
input.addEventListener("change", reset), input.addEventListener("keyup", reset);
var input = document.querySelector("#phoneEdit");
window.intlTelInput(input, {
    placeholderNumberType: "MOBILE",
    formatOnDisplay: !0,
    autoHideDialCode: !0,
    autoPlaceholder: "polite",
    separateDialCode: !0
}), $("#name").on("focus", function () {
    document.body.scrollTop = $(this).offset().top
}), $("#email").on("focus", function () {
    document.body.scrollTop = $(this).offset().top
}), $("#email").on("click", function () {
    document.body.scrollTop = $(this).offset().top
}), $(window).on("load", function () {
    var a = window.location.href,
        b = new URL(a);
    console.log(b);
    var c = b.searchParams.get("source"),
        d = "";
    "" == c || null == c ? ($("#source").val("fluent life"), d = $("#mobile_quote_btn_link").attr("href") + "?source=fluent life") : ($("#source").val(c.replace("%20", " ")), d = $("#mobile_quote_btn_link").attr("href") + "?source=" + c), console.log("source_name" + c), "" == c || null == c ? $("#mobile_quote_btn_link").attr("href", d) : $("#mobile_quote_btn_link").attr("href", d)
});
var upsc = $(window),
    page = $("html, body");
$("button").click(function () {
    var a = document.getElementById("mobile_quote_bottom_custom"),
        b = a.offsetTop;
    alert(b)
}), $(document).ready(function () {
    $(".rippler").rippler({
        effectClass: "rippler-effect",
        effectSize: 10,
        addElement: "div",
        duration: 800
    })
});
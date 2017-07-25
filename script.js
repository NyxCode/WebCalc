
setTimeout(() => main(), 500)

const ERROR = "Error"
const ESCAPE = 27
const BACKSPACE = 8

allowedKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", ".", "-", "+", "/", "*", "(", ")"]

calculation = ""

width = window.innerWidth
          || document.documentElement.clientWidth
          || document.body.clientWidth;

height = window.innerHeight
          || document.documentElement.clientHeight
          || document.body.clientHeight;

function main() {
  $(".close_impressum").click(() =>  {
    $('.toast.impressum').fadeOut(200)
    $(".content").css("filter", "")
  })
  $('.toast.info').stop().fadeIn(200).delay(5000).fadeOut(200);
  $(document).keypress((e) => {
    let char = String.fromCharCode(e.which)
    if(char == ":") char = "/";
    if(char == "x") char = "*"
    if(char == ",") char = "."
    if(char == "i") {
      $('.toast.impressum').stop().fadeIn(200);
      $(".content").css("filter", "blur(5px)")
    }
    if($.inArray(char, allowedKeys) !== -1) {
      calculation += char
      calculate()
    }
  })

  $(document).keyup((e) => {
    if(e.which == ESCAPE) {
      $(".button.clear").trigger("click")
      $(".close_impressum").trigger("click")
    } else if(e.which == BACKSPACE) {
      if(calculation.length != 0) {
        calculation = calculation.slice(0, -1);
        calculate()
      }
    }
  })

  $(".display").click(() => {
    calculate()
    let result = $(".display_result").html()
    if(result.length > 0 && result != ERROR) {
      copyToClipboard(result)
    }
  })

  $(".button.equals").click(() => {
    calculate()
    let result = $(".display_result").html()
    if(result != ERROR) {
      calculation = $(".display_result").html()
      calculate()
      $(".display_result").html("")
    }
  })

  $(".button.clear").click(() => {
    calculation = ""
    calculate()
    $(".display_result").html("")
  })

  $(".button.divide").click(() => {
    calculation += "/"
    calculate()
  })

  $(".button.multiply").click(() => {
    calculation += "*"
    calculate()
  })

  $(".button.subtract").click(() => {
    calculation += "-"
    calculate()
  })

  $(".button.add").click(() => {
    calculation += "+"
    calculate()
  })

  $(".button.comma").click(() => {
    calculation += "."
    calculate()
  })

  for(let i = 0; i <= 9; i++) {
    $(".button." + i).click(() => {
      calculation += i
      calculate()
    })
  }
}

function calculate() {
  let displayCalculation = calculation.replace(/\*/g, "×").replace(/\//g, "÷")
  let display_result = $(".display_result")
  $(".display_calculation").html(displayCalculation)
  if(calculation.length == 0) {
    display_result.html("")
    return
  }
  try {
    eval(`
      result = ${calculation};
      $(".display_result").html(result);
    `, 0)
    display_result.css("color", "")
    display_result.css("animation-name", "")
  } catch (e) {
    display_result.html(ERROR)
    display_result.css("animation-name", "error_blinking")
  }
}

function randomWithoutDecimals() {
  return Math.round(Math.random())
}

function copyToClipboard(element) {
    var temp = $("<input>");
    $("body").append(temp);
    temp.val($(element).text()).select();
    if(document.execCommand("copy")) {
      $('.toast.copy').stop().fadeIn(200).delay(2000).fadeOut(200);
    }
    temp.remove();
}

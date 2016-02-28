var make_grid = function(xsize, ysize, square_width, square_height) {
  var grid = $("#grid"),
    i, j;

  for (i = 0; i < ysize; i++) {
    for (j = 0; j < xsize; j++) {
      grid.append('<div class="square row_' + i + ' col_' + j + ' pos_' + i + '_' + j + '"></div>');
    }
  }

  for (i = 0; i < ysize; i++) {
    $(".row_" + i).each(function() {
      $(this).css({'top': 50 + (i * square_height) + 'px', height: square_height + 'px' });
    });
  }

  for (j = 0; j < xsize; j++) {
    $(".col_" + j).each(function() {
      $(this).css({'left': 200 + (j * square_width) + 'px', width: square_width + 'px' });
    });
  }

  return grid;
};

var darkenAll = function() {
  $(".square").each(function() {
    var that = this,
      darken = function() {
        var bg = tinycolor($(that).css('background'));
        bg.darken(Math.random() * 10);
        $(that).css('background', bg.toString());
        if (bg.getBrightness() > 2) {
          setTimeout(darken, parseInt(Math.round(Math.random()*200)));
        }
      }
    setTimeout(darken, 1500);
  });
}

$(function() {
  var square_height = 64,
    square_width = 64,
    xsize = 10,
    ysize = 10,
    score = 0,
    charge = 0,
    health = 30,
    shortinterval, midinterval, longinterval, rewardinterval;

  make_grid(xsize, ysize, square_width, square_height);

  $(".square").click(function() {
    var classes = $(this).attr('class').split(" "),
      bg = tinycolor($(this).css("background"));

    if (bg.getBrightness() < 250 && health >= 1) {
      if (charge >= 5) {
        charge = 0;
        $("#charge").text("Nuke Charge: " + charge + " / 5");
        $(".square").css("background", "red");
        $("h1").text("Nuked!");
        setTimeout(function() {
          $(".square").css("background", "white");
        }, 350);
        setTimeout(function() {
          $("h1").text("Click to reset boxes! Reds charge nukes!");
        }, 2000);
      } else {
        rgb = bg.toRgb();
        r = rgb['r'];
        g = rgb['g'];
        b = rgb['b'];
        if (r > 220 && g < 30 && b < 30) {
          charge += 1;
          $("#charge").text("Nuke Charge: " + charge + " / 5");
        }

        score += parseInt(Math.round(bg.getBrightness()));
        $("#score").text("Score: " + score);
        bg.brighten(100);
        $(this).css("background", bg.toString());
      }
    }
  });

  shortinterval = setInterval(function() {
    var x = parseInt(Math.floor(Math.random() * xsize));
    var y = parseInt(Math.floor(Math.random() * ysize));
    $(".pos_" + y + "_" + x).css("background", function() {
      var bg = tinycolor($(this).css('background'));
      darkness = Math.random() * 4 - 1,
      spin = Math.random() * 40 - 4,
      saturation = Math.random() * 5 - 2;

      rgb = bg.toRgb();
      r = rgb['r'];
      g = rgb['g'];
      b = rgb['b'];
      if (r > 220 && g < 30 && b < 30) {
        return;
      } 

      bg.darken(darkness).spin(spin);
      if (health >= 1 && bg.getBrightness() < 20) {
        health -= 1;
        if (health < 1) {
          $("#health").text("Game over. You died.");
          $("h1").text("Game over!");
          clearInterval(shortinterval);
          clearInterval(midinterval);
          clearInterval(longinterval);
          clearInterval(rewardinterval);
          darkenAll();
          return "black";
        } else {
          $("#health").text("Health: " + health);
        }
      }
      return bg.toString();
    });
  }, 4)

  midinterval = setInterval(function() {
    var x = parseInt(Math.floor(Math.random() * xsize));
    var y = parseInt(Math.floor(Math.random() * ysize));
    $(".pos_" + y + "_" + x).css("background", function() {
      var bg = tinycolor($(this).css('background'));
      darkness = Math.random() * 6,
      spin = Math.random() * 40,
      saturation = Math.random() * 8;

      rgb = bg.toRgb();
      r = rgb['r'];
      g = rgb['g'];
      b = rgb['b'];
      if (r > 220 && g < 30 && b < 30) {
        return;
      } 

      bg.darken(darkness).spin(spin);
      if (bg.getBrightness() < 20) {
        health -= 1;
        if (health < 1) {
          $("#health").text("Game over. You died.");
          $("h1").text("Game over!");
          clearInterval(shortinterval);
          clearInterval(midinterval);
          clearInterval(longinterval);
          clearInterval(rewardinterval);
          darkenAll();
          return "black";
        } else {
          $("#health").text("Health: " + health);
        }
      }
      return bg.toString();
    });
  }, 80)

  longinterval = setInterval(function() {
    var x = parseInt(Math.floor(Math.random() * xsize));
    var y = parseInt(Math.floor(Math.random() * ysize));
    $(".pos_" + y + "_" + x).css("background", function() {
      var bg = tinycolor($(this).css('background'));
      darkness = Math.random() * 100 - 3,
      spin = Math.random() * 80 - 4,
      saturation = Math.random() * 80 - 2;

      rgb = bg.toRgb();
      r = rgb['r'];
      g = rgb['g'];
      b = rgb['b'];
      if (r > 220 && g < 30 && b < 30) {
        return;
      } 

      bg.saturate(saturation).darken(darkness).spin(spin);
      if (bg.getBrightness() < 20) {
        health -= 1;
        if (health < 1) {
          $("#health").text("Game over. You died.");
          $("h1").text("Game over!");
          clearInterval(shortinterval);
          clearInterval(midinterval);
          clearInterval(longinterval);
          clearInterval(rewardinterval);
          darkenAll();
          return "black";
        } else {
          $("#health").text("Health: " + health);
        }
      }
      return bg.toString();
    });
  }, 1550)

  rewardinterval = setInterval(function() {
    var x = parseInt(Math.floor(Math.random() * xsize));
    var y = parseInt(Math.floor(Math.random() * ysize));
    $(".pos_" + y + "_" + x).css("background", function() {
      var that = this;

      if (Math.random() > 0.65) {
        $(this).css('background', 'red');
      }

      setTimeout(function() {
        var bg = tinycolor($(that).css('background')),
          rgb = bg.toRgb(),
          r = rgb['r'],
          g = rgb['g'],
          b = rgb['b'];
        if (r > 220 && g < 30 && b < 30) {
          $(that).css('background', 'blue');
        }
      }, 2000);
    });
  }, 1200);
});

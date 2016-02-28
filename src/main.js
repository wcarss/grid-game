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

$(function() {
  var square_height = 64,
    square_width = 64,
    xsize = 10,
    ysize = 10,
    score = 0,
    health = 20,
    shortinterval, midinterval, longinterval;

  make_grid(xsize, ysize, square_width, square_height);

  $(".square").click(function() {
    var classes = $(this).attr('class').split(" "),
      bg = tinycolor($(this).css("background")),
      values, row, col;

    for (i = 0; i < classes.length; i++) {
      if (classes[i].indexOf("pos") === 0) {
        values = classes[i].split("_");
        row = values[1];
        col = values[2];
      }
    }

    if (bg.getBrightness() < 250 && health > 1) {
      score += parseInt(Math.round(bg.getBrightness()));
      $("#score").text("Score: " + score);
      bg.brighten(100);
      $(this).css("background", bg.toString());
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
      bg.darken(darkness).spin(spin);
      if (health > 1 && bg.getBrightness() < 20) {
        health -= 1;
        if (health < 1) {
          $("#health").text("Game over. You died.");
          $("h1").text("Game over!");
          clearInterval(midinterval);
          clearInterval(longinterval);
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
      bg.darken(darkness).spin(spin);
      if (bg.getBrightness() < 20) {
        health -= 1;
        if (health < 1) {
          $("#health").text("Game over. You died.");
          $("h1").text("Game over!");
          clearInterval(midinterval);
          clearInterval(longinterval);
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
      bg.saturate(saturation).darken(darkness).spin(spin);
      if (bg.getBrightness() < 20) {
        health -= 1;
        if (health < 1) {
          $("#health").text("Game over. You died.");
          $("h1").text("Game over!");
          clearInterval(midinterval);
          clearInterval(longinterval);
        } else {
          $("#health").text("Health: " + health);
        }
      }
      return bg.toString();
    });
  }, 1550)

});

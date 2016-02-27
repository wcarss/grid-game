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
      $(this).css({'top': i * square_height + 'px', height: square_height + 'px' });
    });
  }

  for (j = 0; j < xsize; j++) {
    $(".col_" + j).each(function() {
      $(this).css({'left': j * square_width + 'px', width: square_width + 'px' });
    });
  }

  return grid;
};

$(function() {
  var square_height = 8,
    square_width = 8,
    xsize = 150,
    ysize = 50;

  make_grid(xsize, ysize, square_width, square_height);

  $(".square").click(function() {
    var classes = $(this).attr('class').split(" "),
      values, row, col;

    for (i = 0; i < classes.length; i++) {
      if (classes[i].indexOf("pos") === 0) {
        values = classes[i].split("_");
        row = values[1];
        col = values[2];
      }
    }

    console.log("x, y: (" + col + ", " + row + ")");
  });

  setInterval(function() {
    var x = parseInt(Math.floor(Math.random() * xsize));
    var y = parseInt(Math.floor(Math.random() * ysize));
    $(".pos_" + y + "_" + x).css("background", function() {
      var bg = tinycolor($(this).css('background'));
      return bg.saturate().darken().spin(1).toString();
    });
  }, 10)
});

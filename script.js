$(document).ready(function() {

    var grid = $('#gridWrapper');
    var tile = $('.tile');
    var newGrid = $('#newGrid');
    var resetGrid = $('#resetGrid');
    var fadeButton = $('#fadeButton');
    var randomColorButton = $('#randomColorButton');
    var newTile = '<div class="tile"></div>';
    var gridSize = 700;
    var tiles = 16;
    var limit = 72;
    var fadeEffect = false;
    var fadeStringOn = 'Fade: On';
    var fadeStringOff = 'Fade: Off';
    var newColor = 'black';
    var hasHovered = false;
    fadeButton.append(fadeStringOff);
    $('#gridWrapper').height(gridSize);
    $('#gridWrapper').width(gridSize);

    start();

    newGrid.on("click", function() {
        var newSize = 0;
        do {
            newSize = prompt('Please enter a new grid size ( 1 - ' + limit + ' )').valueOf();
        } while (isNaN(newSize) || newSize < 1 || newSize > limit);
        tiles = newSize;
        start();
    });

    resetGrid.on("click", function() {
        if (hasHovered) {
            if (fadeEffect) {
                tile.finish();
            } else {
                clearGrid();
            }
            hasHovered = false;
        }else{
            newColor = 'black';
            setColor();
        }
    });
    randomColorButton.on("click", function() {
        var x = Math.round(0xffffff * Math.random()).toString(16);
        var y = (6 - x.length);
        var z = '000000';
        var z1 = z.substring(0, y);
        var color = '#' + z1 + x;
        tile.css("background-color", color);
        newColor = color;
    });
    fadeButton.click(function() {
        clearGrid();
        tile.finish();
        fadeEffect = !fadeEffect;
        if (fadeEffect) {
            $(this).empty();
            $(this).append(fadeStringOn);
        } else {
            $(this).empty();
            $(this).append(fadeStringOff);
        }
    });

    function start() {
        emptyGrid();
        refreshTiles();
        fillGrid();
        fixTileSize();
        refreshTiles();
        refreshListener();
        setColor();
    }

    function refreshListener() {
        tile.on("mouseenter", function() {
            hasHovered = true;
            if (fadeEffect) {
                $(this).stop();
                $(this).fadeOut(0);
                $(this).fadeIn(2000);
            } else {
                $(this).css('opacity', '0');
            }
        });
    }

    function fixTileSize() {
        //minus 2 for the 1px border;
        newHeight = (gridSize / (tiles)) - 0;
        newWidth = (gridSize / (tiles)) - 0;
        refreshTiles();
        tile.css('width', newWidth);
        tile.css('height', newHeight);
    }

    function emptyGrid() {
        tile.remove();
    }

    function fillGrid() {
        totalTiles = tiles * tiles;
        for (var i = 0; i < totalTiles; i++) {
            grid.append(newTile);
        }
        $('div#currentGridSize').empty();
        $('div#currentGridSize').append('Current Grid Size: ' + tiles + 'x' + tiles);
    }

    function refreshTiles() {
        tile = $('.tile');
    }

    function clearGrid() {
        $('.tile').css('opacity', '1');

    }

    function setColor() {
        tile.css('background-color', newColor);
    }
});
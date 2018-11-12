$(document).ready(function() {

  var characters = [
    "Homer Simpson", "Peter Griffin", "PJ Fry", "Rick Sanchez", "Morty", "Spongebob",
    "Patrick", "Micheal Scott", "Stewie", "Bart Simpson", "Squidward",
    "dwight schrute"
  ];

  // function to make buttons and add to page
  function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
    $(areaToAddTo).empty();

    for (var i = 0; i < arrayToUse.length; i++) {
      var a = $('<button class="aqua-gradient">');
      a.addClass(classToAdd);
      a.attr("data-type", arrayToUse[i]);
      a.text(arrayToUse[i]);
      $(areaToAddTo).append(a);
    }

  }

  $(document).on("click", ".character-button", function() {
    $("#characters").empty();
    $(".character-button").removeClass("active");
    $(this).addClass("active");

    var type = $(this).attr("data-type");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=ChZ7QEoRoWNeksqTD2HgL2a628hVNo7v&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
          var characterDiv = $("<div class=\"character-item\">");

          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          var animated = results[i].images.fixed_height.url;
          var still = results[i].images.fixed_height_still.url;

          var characterImage = $("<img>");
          characterImage.attr("src", still);
          characterImage.attr("data-still", still);
          characterImage.attr("data-animate", animated);
          characterImage.attr("data-state", "still");
          characterImage.addClass("character-image");

          characterDiv.append(p);
          characterDiv.append(characterImage);

          $("#characters").append(characterDiv);
        }
      });
  });

  $(document).on("click", ".character-image", function() {

    var state = $(this).attr("data-state");

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    }
    else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

  $("#add-character").on("click", function(event) {
    event.preventDefault();
    var newcharacter = $("input").eq(0).val();

    if (newcharacter.length > 2) {
      characters.push(newcharacter);
    }

    populateButtons(characters, "character-button", "#character-buttons");

  });

  populateButtons(characters, "character-button", "#character-buttons");
});

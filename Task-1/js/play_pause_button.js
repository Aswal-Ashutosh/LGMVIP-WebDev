$(document).ready(function () {
  $(".video")
    .parent()
    .click(function () {
      if ($(this).children(".video").get(0).paused) {
        $(this).children(".video").get(0).play();
        $(this).children(".play-pause-btn").fadeOut();
      } else {
        $(this).children(".video").get(0).pause();
        $(this).children(".play-pause-btn").fadeIn();
      }
    });
});
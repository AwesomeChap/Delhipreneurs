$(document).ready(function() {
  /*
   * Main variables
   */

  var images = [
    "../img/service1.jpg",
    "../img/service2.jpg",
    "../img/service3.jpg",
    "../img/service4.jpg"
  ]; 

  var content = [
    {
      title: "Service #1",
      desc: "Amet cillum Bobo mjs sdb ciefhu ddhfe ihfeuhf kdhf eiusmod aliqua et et occaecat cillum enim velit minim ."
    },
    {
      title: "Service #2",
      desc:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    {
      title: "Service #3",
      desc:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
      title: "Service #4",
      desc: "Exercitation non ullamco reprehenderit id incididunt ullamco aute reprehenderit non deserunt non do id."
    }
  ];
  var currentPage = 0;
  //generate content
  for (var i = 0; i < content.length; i++) {
    //split content letters to array
    for (var obj in content[i]) {
      //if string
      if (typeof content[i][obj] === "string") {
        content[i][obj] = content[i][obj].split("");
        continue;
      } else if (typeof content[i][obj] === "object") {
        //if array (grouped text)
        var toPush = [];
        for (var j = 0; j < content[i][obj].length; j++) {
          for (var k = 0; k < content[i][obj][j].length; k++) {
            toPush.push(content[i][obj][j][k]);
          }
        }
        content[i][obj] = toPush;
      }
    }
    //set text to
    $("#segments").append(
      '<div class="letters-wrap mutable"><div class="soup-title"></div><div class="soup-desc"></div></div>'
    );
    setText();
    //clone to data
    $("#segments").append(
      '<div class="letters-wrap position-data"><div class="soup-title"></div><div class="soup-desc"></div></div>'
    );
    setText();
  }

  //set image div
  $("#service-img").append(
    '<div id="service-image"></div>'
  );

  //initial arrangement
  arrangeCurrentPage();
  scrambleOthers();
  /*
   * Event handlers
   */
  $(window).resize(function() {
    arrangeCurrentPage();
    scrambleOthers();
  });
  $("#soup-prev").hide();
  $("#soup-prev").click(function() {
    $("#soup-next").show();
    currentPage--;
    if (currentPage === 0) {
      $("#soup-prev").hide();
    }
    arrangeCurrentPage();
    scrambleOthers();
  });
  $("#soup-next").click(function() {
    $("#soup-prev").show();
    currentPage++;
    if (currentPage === content.length - 1) {
      $("#soup-next").hide();
    }
    arrangeCurrentPage();
    scrambleOthers();
  });

  /* Images column*/

  $("#soup-prev").click(function(){
    $("#service-image").fadeOut(400,function(){
      $("#service-image").css({'background':'url('+images[currentPage]+') center top no-repeat', 'background-size':'cover'});
    }).fadeIn(400);
  });

  $("#soup-next").click(400,function(){
    $("#service-image").fadeOut(function(){
      $("#service-image").css({'background':'url('+images[currentPage]+') center top no-repeat', 'background-size':'cover'});
    }).fadeIn(400);
  });

  // $("#soup-prev").click(function(){
  //   $("#service-image").css({'background':'url('+images[currentPage]+') center top no-repeat', 'background-size':'cover'});
  // });

  // $("#soup-next").click(function(){
  //   $("#service-image").css({'background':'url('+images[currentPage]+') center top no-repeat', 'background-size':'cover'});
  // });

  /* */

  /*
   * Functions
   */
  function arrangeCurrentPage() {
    for (var i = 0; i < content[currentPage].title.length; i++) {
      $(".mutable:eq(" + currentPage + ") > .soup-title > .letter")
        .eq(i)
        .css({
          left:
            $(".position-data:eq(" + currentPage + ") > .soup-title > .letter")
              .eq(i)
              .offset().left + "px",
          top:
            $(".position-data:eq(" + currentPage + ") > .soup-title > .letter")
              .eq(i)
              .offset().top + "px",
          color: "#111",
          zIndex: 9001
        });
    }
    for (var i = 0; i < content[currentPage].desc.length; i++) {
      $(".mutable:eq(" + currentPage + ") > .soup-desc > .letter")
        .eq(i)
        .css({
          left:
            $(".position-data:eq(" + currentPage + ") > .soup-desc > .letter")
              .eq(i)
              .offset().left + "px",
          top:
            $(".position-data:eq(" + currentPage + ") > .soup-desc > .letter")
              .eq(i)
              .offset().top + "px",
          color: "#111",
          zIndex: 9001
        });
    }
  }

  function setText() {
    var j;
    for (j = 0; j < content[i].title.length; j++) {
      $(".soup-title")
        .last()
        .append('<span class="letter">' + content[i].title[j] + "</span>");
    }
    for (j = 0; j < content[i].desc.length; j++) {
      $(".soup-desc")
        .last()
        .append('<span class="letter">' + content[i].desc[j] + "</span>");
    }
  }

  function scrambleOthers() {
    for (var i = 0; i < content.length; i++) {
      //don't scramble currentPage
      if (currentPage === i) continue;
      var parts = [["title", ".soup-title"], ["desc", ".soup-desc"]];
      //apply to .title h1s and .desc ps
      for (var j = 0; j < parts.length; j++) {
        for (var k = 0; k < content[i][parts[j][0]].length; k++) {
          //define random position on screen
          var randLeft = Math.floor(Math.random() * $(window).width());
          var randTop = Math.floor(Math.random() * $(window).height());
          //defining boundaries
          var offset = $(".position-data")
            .eq(currentPage)
            .offset();
          var bounds = {
            left: offset.left,
            top: offset.top,
            right: $(window).width() - offset.left,
            bottom: $(window).height() - offset.top
          };
          var middleX =
            bounds.left +
            $(".position-data")
              .eq(currentPage)
              .width() /
              2;
          var middleY =
            bounds.top +
            $(".position-data")
              .eq(currentPage)
              .height() /
              2;
          //finally, apply all the scrambles
          $(".mutable:eq(" + i + ") > " + parts[j][1] + " > .letter")
            .eq(k)
            .css({
              left: randLeft,
              top: randTop,
              color: "#F9F7F6",//
              zIndex: "initial"
            });
        }
      }
    }
  }
});

var wikidata = [];
var content;

$(function() {
  $("#go").click(function() {
    var url =
      "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=" +
      $("#searchFor").val();
    $.ajax({
      url: url,
      type: "GET",
      contentType: "application/json; charset=utf-8",
      async: false,
      dataType: "jsonp",
      success: function(data, status, jqXHR) {
        content = data;
        buildWiki();
        getTitles();
        showData();
      }
    })
      .done(function() {
        console.log("success");
      })
      .fail(function() {
        console.log("error");
      })
      .always(function() {
        console.log("complete");
      });
  });
});

function showData() {
  for (var i = 0; i < wikidata.length; i++) {
    //create elements to display content
    var div = document.createElement("div");
    var h2 = document.createElement("h2");
    var p = document.createElement("p");
    var display = document.getElementById("display");
    //set div attributes
    div.setAttribute("id", i);
    div.setAttribute("class", "container-fluid");
    div.setAttribute(
      "style",
      "padding-top:50px;height:500px;color: #fff; background-color: #" +
        randomColor() +
        ";"
    );

    //set h2 content
    h2.textContent = wikidata[i][0];

    //set paragraph content
    p.innerHTML = wikidata[i][1] + "<br>" + wikidata[i][2];

    //appending elements
    div.appendChild(h2);
    div.appendChild(p);
    display.appendChild(div);
  }
}
function buildWiki() {
  var i = 1,
    j;
  for (j = 0; j < content[i].length; j++) {
    wikidata.push([content[i][j], content[i + 1][j], content[i + 2][j]]);
  }
}

function getTitles() {
  for (var i = 0; i < wikidata.length; i++) {
    var item = document.createElement("li");
    var a = document.createElement("a");
    var list = document.getElementById("navTitles");
    a.textContent = "ID: " + i;
    a.setAttribute("href", "#" + i);
    item.appendChild(a);
    list.appendChild(item);
  }
}

function randomColor() {
  let color;

  color = ("000000" +
    Math.random()
      .toString(16)
      .slice(2, 8)
      .toUpperCase()).slice(-6);

  return color;
}

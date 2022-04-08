
var index = 1;

var objectFilter = { category: "Đầm", target: "Nữ" }
var ob = JSON.stringify(objectFilter);

function renderOrigin() {
  render(1);
}
$.ajax({
  url:"/product/pr",
  type:"GET",
})
.then((data)=>{
  $.ajax({
    url:"/product/pr1",
    type:"GET",
  })
  .then((data)=>{
    console.log(data);
  })
  .catch((err)=>{
    console.log(err);
  })
})
.catch((error)=>{
  console.log(error);
})

function render(indexInput) {
  $(".paging").html("");
  $(".allProduct").html("");


  index = indexInput;
  /*AllCard*/
  $.ajax({
    url: "/product/findAllProInPageByCategory",
    type: "POST",
    data: { index: indexInput, numberInPage: 3, objectFilter: ob }
  })
    .then((data) => {

      data.map((element) => {
        var color = " ";

        (() => {
          $.ajax({
            url: "/product/findAllColor",
            type: "POST",
            data: { name: element._id, objectFilter: ob }
          })
            .then((dat) => {

              dat.map((elemen) => {
                color += `<img src="${elemen.img}"  onmouseover="doo('${elemen.id}','${element.id}')"  alt="" srcset="">`;
              });

              var content =
                `
                <div>
                <div class="headerCard">
                  <div class="productImg"><img class="a${element.id}"
                      src="${element.img}"
                      alt=""></div>
                  <div class="addToCart">THÊM VÀO GIỎ HÀNG</div>
                </div>
                <div class="inforCard">
                  <div><a href="">${element._id}</a></div>
                  <div class="allProduct-price">
                    <div>${element.price} <span>đ</span></div>
                    <div><i class="far fa-heart"></i></div>
                  </div>
                  <div class="productColor">` +
                color +
                `
                  </div>
                </div>
              </div>
                `;
              $(".allProduct").append(content);
            })
            .catch((err) => {
              console.log(err);
            });
        })();
      });
      /*Paging*/
      $.ajax({
        url: "/product/findTotalByCategory",
        type: "POST",
        data: { numberInPage: 3, objectFilter: ob }
      })
        .then(data => {

          if (typeof data == "number") {
            $(".paging").append(`
                  <div class="totalPage"></div>
                  <div class="previousPage" onclick="changePage(${index - 1},${data})"><i class="fas fa-chevron-left"></i></div>
                  <div class="pageIndex">
                  </div>
                  <div class="nextPage" onclick="changePage(${index + 1},${data})"><i class="fas fa-chevron-right"></i></div>
                  `)
            $(".totalPage").html("Tổng số " + data + " trang");
            for (let i = 1; i <= data; i++) {
              $(".pageIndex").append(`<a class="${i == index ? "active" : ""}" onclick="render(${i})">${i}</a>`)
            }
          } else {

            $(".allProduct").html("<h4>Shop hiện tại chưa nhập sản phẩm này</h4>");
          }


        })
        .catch((err) => {
          console.log(err.message);
        })
    })
    .catch((err) => {
      console.log(err);
    });




}
renderOrigin();
setFilter();
function setFilter() {

  $.ajax({
    url: "/filter/setFilter",
    type: "POST",
    data: { objectFilter: ob }
  })
    .then((data) => {
      $(".filter").html("");
      $(".filter").append(`<div class="resetFilter" onclick="resetFilter()">Reset Filter</div>`)
      data.map((element) => {
        var content = `
    <div>
    <div class="atrr">
      <div>
        <h6>${element}</h6>
      </div>
      <div id="${element}"><i class="fas fa-minus" onclick="dodo(this)"></i><i class="fas fa-plus plus"
          onclick="dodo1(this)"></i></div>
    </div>
    <div class="filter-ck ${element}">
    </div>
  </div>
    `
        $(".filter").append(content);
      })

      $.ajax({
        url: "/filter/findMaxMinPrice",
        type: "POST",
        data: { objectFilter: ob }
      })
        .then((data) => {
          var content = `
      <div>
      <div class="slider">
        <div>
          <h6>Sort By Price (Dong)</h6>
        </div>
        <div class="range">

          <input type="range"  onchange="showVal()" class="form-range" min="${data[0].minPrice}" value="${data[0].maxPrice}" max="${data[0].maxPrice}" step="5000"
             id="customRange3">
        </div>
        <div class="labelPrice">
          <label for="customRange3" class="form-label"><span
              class="minPrice">${data[0].minPrice}</span><span>đ</span></label>
          <label for="customRange3" class="form-label"><span
              class="maxPrice">${data[0].maxPrice}</span><span>đ</span></label>
        </div>
      </div>
    </div> 
      `

          $(".filter").append(content);
        })
        .catch((error) => {
          console.log(error.message);
        })

    })
    .catch((err) => {
      console.log(err.message);
    })
}

function doo(productId, imgClass) {

  $.ajax({
    url: "/product/findById",
    type: "POST",
    data: { id: productId }
  })
    .then((data) => {
      $(".a" + imgClass + "").attr("src", data[0].img);
    })
    .catch(error => {
      console.log(error);

    })
}

function changePage(index, totalPage) {

  index = index <= 0 ? 1 : index;
  index = index >= totalPage ? totalPage : index;
  render(index);

}
function dodo1(kc) {
  var k = $(kc).parent().attr('id');
  $("." + k).html("");
  $.ajax({
    url: "/filter/setDetailsProperty",
    type: "POST",
    data: { property: k, objectFilter: ob },

  })
    .then((data) => {
      data.map((element) => {
        let content = "";
        if (k == "color") {
          content = `
          <img class="imgg"
          src="${element}" onclick="chooseColor(this)" id="${element}"
          alt="" srcset="">
          `
        }
        else
          content = `
       <div><input class="inputFilter" type="checkbox" value="${element}" onchange="findByFilter(${index},'${k}','${element}')"  id="${element}">${element}</div>
       `
        $("." + k).append(content);
      })


      $("." + k).show("slow");
      $($(kc).prev()).show();
      $(kc).hide();
    })
    .catch((error) => {
      console.log(error);
    })

}
function resetFilter() {
  setFilter();
  objectFilter = { category: "Đầm", target: "Nữ" }
  ob = JSON.stringify(objectFilter);
 
  render(1);
}


function removeInObject(property, propertyDetails) {
  let array = objectFilter[property]["$in"];
  objectFilter[property]["$in"].splice(array.indexOf(propertyDetails), 1); console.log(objectFilter[property]["$in"]);
  if (array.length == 0) delete objectFilter[property];
  ob = JSON.stringify(objectFilter);


}
function addInObject(property, propertyDetails) {
  if (objectFilter[property] == undefined) objectFilter[property] = { $in: [propertyDetails] }
  else {
    temp = objectFilter[property]["$in"]
    temp.push(propertyDetails)
  }
  ob = JSON.stringify(objectFilter);
  console.log(objectFilter[property]["$in"]);

}
function findByFilter(index, property, propertyDetails) {
  if (!$("#" + propertyDetails).is(":checked")) {
    removeInObject(property, propertyDetails)
  } else {
    addInObject(property, propertyDetails)
  }
 

  $.ajax({
    url: "/product/findById",
    type: "POST",
    data: { objectFilter: ob }
  })
    .then((data) => {

    })
    .catch((error) => {
      console.log(error);
    })
  console.log(index + "|" + property + "|" + propertyDetails);
  render(1)
}

function showVal() {

  value = $("#customRange3").val();
  $(".minPrice").html(value);
  objectFilter["price"] = { $lte: Number.parseInt(value) };
  ob = JSON.stringify(objectFilter);
  render(1);

}
function chooseColor(colortag) {
  var tag = $(colortag).css("padding")
  if (tag == "0px") {
    $(colortag).css({
      "border": "1px solid black",
      "padding": "2px"
    })
    addInObject("color.img", $(colortag).attr("id"))
  } else {
    $(colortag).css({
      "border": "none",
      "padding": "0px"
    })
    removeInObject("color.img", $(colortag).attr("id"))
  }
  render(1);



}
function searchByName(){
  var valueSearch=$(".searchInput").val();
   objectFilter = { name:{$regex:valueSearch,$options:"i"} }
   ob = JSON.stringify(objectFilter);
   setFilter();

   render(1)
}



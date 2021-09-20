
var index = 1;


function renderOrigin() {
  render(1);
}
function render(indexInput,property,propertyDetails) {
  $(".paging").html("");
  $(".allProduct").html("");
  var ob={category:"Đầm",size:{$in:["XXL","XS"]}};

  index = indexInput;
  /*AllCard*/
  $.ajax({
    url: "/product/findAllProInPageByCategory",
    type: "POST",
    data: { category: "Đầm", index: indexInput, numberInPage: 3, target: "Nữ",property:property,propertyDetails:propertyDetails,ob:  JSON.stringify(ob)},
  })
    .then((data) => {

      data.map((element) => {
        var color = " ";

        (() => {
          $.ajax({
            url: "/product/findAllColor",
            type: "POST",
            data: { name: element._id, target: "Nữ",property:property,propertyDetails:propertyDetails }
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
        data: { category: "Đầm", numberInPage: 3, target: "Nữ",property:property,propertyDetails:propertyDetails }
      })
        .then(data => {
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

        })
        .catch((err) => {
          console.log(err);
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
    data: { categoryName: "Đầm", target: "Nữ" }
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
        data: { categoryName: "Đầm", target: "Nữ" }
      })
        .then((data) => { 
          var content = `
      <div>
      <div class="slider">
        <div>
          <h6>Sort By Price (Dong)</h6>
        </div>
        <div class="range">

          <input type="range"  onchange="showVal()" class="form-range" min="${data[0].minPrice}" max="${data[0].maxPrice}" step="5000"
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
    data: { property: k, categoryName: "Đầm", target: "Nữ" },

  })
    .then((data) => {
      data.map((element) => {
        let content = "";
        if (k == "color") {
          content = `
          <img class="imgg"
          src="${element}"
          alt="" srcset="">
          `
        }
        else
          content = `
       <div><input class="inputFilter" type="checkbox" value="${element}" onchange="findByFilter(${index},'${k}','${element}')"  id="ck">${element}</div>
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
function resetFilter(){
   setFilter();
   render(1);
}
function findByFilter(index,property,propertyDetails){
     console.log(index+"|"+property+"|"+propertyDetails);
     render(index,property,propertyDetails)
}



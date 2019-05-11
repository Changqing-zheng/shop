import Mock from "mockjs";

let Random = Mock.Random;
let getVarityItem = res => {
  let productList = [];
  for(let i=0; i<100; i++){
      let product = {
          name: Random.ctitle(5, 10),
          img: Random.dataImage("200x200", '农机' + Random.integer(1, 100)),
          price: Random.integer(1000, 9999),
          owner: Random.cname()
      };
      productList.push(product);
  }
  return productList;
};

Mock.mock("http://www.zcq.com/getVarietyItem", getVarityItem());
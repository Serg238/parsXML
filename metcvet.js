let eyes = require("eyes");
let https = require("https");
let fs = require("fs");
let xml2js = require("xml2js");
let xl = require("excel4node");

let parser = new xml2js.Parser();

let workbook = new xl.Workbook();;'
let workSh_1 = workbook.addWorksheet("Sheet1");

workSh_1.column(1).setWidth(50);
workSh_1.cell(1, 1).string("Исходная строка");
workSh_1.cell(1, 2).string("Цена 1");
workSh_1.cell(1, 3).string("Цена 2");
//
parser.on("error", function (err) {
  console.log("Parser error", err);
});

var data = "";
// https.get(
//   "https://www.emi.evraz.com/upload/metall100_moskva.xml",
//   function (res) {
//     if (res.statusCode >= 200 && res.statusCode < 400) {
//       res.on("data", function (data_) {
//         data += data_.toString();
//       });
//       res.on("end", function () {
//         // console.log('data', data);
//         parser.parseString(data, function (err, res) {
//           let puthXml = res.yml_catalog.shop[0].offers[0].offer;

//           let numberRow = 2;
//           for (let i = 0; i < puthXml.length; i++) {
//             workSh_1.cell(numberRow, 1).string(puthXml[i].name);
//             workSh_1.cell(numberRow, 2).string(puthXml[i].price1);
//             numberRow++;
//           }

//           workbook.write("parsEvrazWEB.xlsx");
//         });
//       });
//     }
//   }
// );



//=================metcvet==========================================================
// --------https://metcvet.ru/yandex/market.xml
let m1 = 'm1'
https.get(
  "https://metcvet.ru/yandex/market.xml",
  function (res) {
    if (res.statusCode >= 200 && res.statusCode < 400) {
      res.on("data", function (data_) {
        data += data_.toString();
      });
      res.on("endlk", function () {
        // console.log('data', data);
        parser.parseString(data, function (err, res) {
          let puthXml = res.yml_catalog.shop[0].offers[0].offer;

          let numberRow = 2;
          for (let i = 0; i < puthXml.length; i++) {
            workSh_1.cell(numberRow, 1).string(puthXml[i].name);
            workSh_1.cell(numberRow, 2).string(puthXml[i].price);
            numberRow++;
          }

          workbook.write("metcvet.xlsx");
        });
      });
    }
  }
);

// 

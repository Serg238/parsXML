// let eyes = require("eyes");
// let fs = require("fs");
let https = require("https");
let xml2js = require("xml2js");
let xl = require("excel4node");

let parser = new xml2js.Parser();

let workbook = new xl.Workbook();
let workSh_1 = workbook.addWorksheet("Sheet1");

workSh_1.column(1).setWidth(50);
workSh_1.cell(1, 1).string(`evraz ${new Date()}`);
workSh_1.cell(1, 2).string("Цена 1");
workSh_1.cell(1, 3).string("Цена 2");
//
parser.on("error", function (err) {
  console.log("Parser error", err);
});

function EvrazPars(evrazMarketUploadXML) {
  var data = "";
  https.get(evrazMarketUploadXML, function (res) {
    if (res.statusCode >= 200 && res.statusCode < 400) {
      res.on("data", function (data_) {
        data += data_.toString();
      });
      res.on("end", function () {
        // console.log('data', data);
        parser.parseString(data, function (err, res) {
          let puthXml = res.yml_catalog.shop[0].offers[0].offer;

          let numberRow = 2;
          for (let i = 0; i < puthXml.length; i++) {
            workSh_1.cell(numberRow, 1).string(puthXml[i].name);
            workSh_1.cell(numberRow, 2).string(puthXml[i].price2);
            numberRow++;
          }

          workbook.write("parsEvrazWEB.xlsx");
        });
      });
    }
  });
}

EvrazPars("https://evraz.market/upload/metall100_moskva.xml");

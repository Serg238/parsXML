let parseString = require("xml2js").parseString;
let fs = require("fs");
let xl = require("excel4node");

let workbook = new xl.Workbook();
let workSh_1 = workbook.addWorksheet("Sheet1");
workSh_1.column(1).setWidth(50);

workSh_1.cell(1, 1).string("Исходная строка");

workSh_1.cell(1, 2).string("Цена 1");
workSh_1.cell(1, 3).string("Цена 2");

let xml = "https://www.emi.evraz.com/upload/metall100_moskva.xml"

fs.readFile("https://www.emi.evraz.com/upload/metall100_moskva.xml", (er, data) => {
  parseString(data, (er, res) => {
    let puthXml = res.yml_catalog.shop[0].offers[0].offer;

    let numberRow = 2;
    for (let i = 0; i < puthXml.length; i++) {
      workSh_1.cell(numberRow, 1).string(puthXml[i].name);
      workSh_1.cell(numberRow, 2).string(puthXml[i].price1);
      numberRow++;
    }

    workbook.write("parsEvraz.xlsx");
  });
});

//-------------------------------------------------
// let resa = {
//     yml_catalog: {
//       $: { date: "2021-08-15T02:10:02+03:00" },
//       shop: [[Object]],
//     },
//   };



const readline = require('readline');
const fs = require('fs');
var year=[];
var jsonData1=[],
jsonData2=[];
var above500=[];
var below500=[];
var val=[];
var count=0;
var count1=0;
var count2=0;
var hash=[],
hash1=[];
var arrest1=[],
arrest2=[];
var tt=0,
ff=0,
dell=" ";
for(i=2001;i<=2016;i++)
{
  hash[i]=0;
  hash1[i]=0;
  arrest1[i]=0;
  arrest2[i]=0;
}
var i=0;
const rl = readline.createInterface({
  input: fs.createReadStream('crimes2001onwards.csv')
});
rl.on('line',function(line)
{
  var lineRecords=line.trim().split(',');


  for(i=2001;i<=2016;i++)
  {

    if(" "+lineRecords[17]==" "+i && lineRecords[5]=="THEFT")
    {


      if(lineRecords[6]=="OVER $500")
      {

        hash[i]++;
      }
      if(lineRecords[6]=="$500 AND UNDER")
      {

        hash1[i]++;
      }
      //  dell=lineRecords[8];
      if(lineRecords[8].trim()=="true"){
        arrest1[i]++;
        //console.log("True");
      }

      if (lineRecords[8].trim()=="false")

      {
        //console.log("True");
        arrest2[i]++;
      }


    }


  }

});

rl.on('close',function()
{

  for(j=2001;j<=2016;j++)
  {
    tempData1={};
    tempData1["year"]=j;
    tempData1["above500"]=hash[j];
    tempData1["below500"]=hash1[j];

    jsonData1.push(tempData1);

    tempData2={};
    tempData2["Year"]=j;
    tempData2["TRUE"]=arrest1[j];
    tempData2["FALSE"]=arrest2[j];

    jsonData2.push(tempData2);


  }
  // arrest={};
  // arrest["TRUE"]=tt;
  // arrest["FALSE"]=ff;


  console.log(jsonData1);
  console.log(jsonData2);
  //console.log(dell);

  fs.writeFileSync("text.json",JSON.stringify(jsonData1),encoding="utf8")
  fs.writeFileSync("text3.json",JSON.stringify(jsonData2),encoding="utf8")
});

// ./src/App.jsx
import React from 'react';
import PDFDocument from './pdfkit'; // re-compiled with browserify -> node_modules\.bin\browserify --standalone PDFDocument node_modules\pdfkit\js\pdfkit.js > pdfkit.js
import blobStream from 'blob-stream';
import logoEscuela from '../../img/logoEscuela.svg';
import logoUpm from '../../img/logoUpm.svg';
import Libre from "!url-loader?limit=65536!../../fonts/LibreSemiSansSSI.ttf";
import OCR from "!url-loader?limit=32768!../../fonts/OCR-A.ttf";

class Pdf_Generater extends React.Component {
  handleClick() {
    const SVGtoPDF=require('svg-to-pdfkit');
    const barcode = require('pure-svg-code/barcode');
    const qrcode = require('pure-svg-code/qrcode');
    //console.log('this is it:', this);
    const mm1 = 2.8346; // 1mm en pts 
    const mm5 = 14.173; //  5mm en pts
    let doc = new PDFDocument({size: 'A4',layout:'portrait',margins:{top:mm5,bottom:mm5,left:mm5,right:mm5}});

    function tableLevel2(doc,col1,col2) {
      doc.font('Helvetica-Bold').fontSize(12).text(col1+' : ',7*mm5,doc.y+6,{align:'right',width:15.5*mm5});
      doc.moveUp();
      doc.font('Libre').text(col2,23*mm5, doc.y,{align:'justify',width:16*mm5});
      doc.moveTo(7*mm5,doc.y).lineTo(39*mm5,doc.y).stroke();
    }
    const stream = doc.pipe(blobStream());
    /* Auto imported (built-in) fonts .afm are located , at: /node_modules/pdfkit/js/data
    Families: Courier, Helvetica, Times and ZapfDingbats */    
    const LibreData = /^data:.+;base64,(.*)$/.exec(Libre)[1];        
    const LibreBuffer = Buffer.from(LibreData, "base64");       
    doc.registerFont("Libre", LibreBuffer); // dont use family (3rd parameter), gets an error importing external fonts
    
    const OCRData = /^data:.+;base64,(.*)$/.exec(OCR)[1];        
    const OCRBuffer = Buffer.from(OCRData, "base64");        
    doc.registerFont("OCR", OCRBuffer); // dont use family, gets an error importing external fonts        
    let grad = doc.linearGradient(5*mm5,5*mm5+mm1,36*mm5,1.66*mm5);
    grad.stop(0,'black').stop(1,'white');
    doc.rect(5*mm5, 5*mm5+mm1, 36*mm5, 1.66*mm5).fillAndStroke(grad);
    doc.fillAndStroke('black'); // doc.restore() dont apply after gradient
    doc.font('Helvetica').fontSize(25).fillColor('white').text('Proyector A037', 5*mm5, (5*mm5)+mm1);  // table title      

    doc.font('Helvetica-Bold').fontSize(16).fillColor('black').text('Datos Administrativos',6*mm5, doc.y); // level 1
    doc.moveTo(6*mm5,doc.y).lineTo(40*mm5,doc.y).stroke();
    doc.moveTo(23*mm5, doc.y+5);        
    
    tableLevel2(doc,'Ubicación Alias','A037');    
    tableLevel2(doc,'Ubicación de Inventario','09A.00.009.0');
    tableLevel2(doc,'Marca','Panasonic');
    tableLevel2(doc,'Modelo','PT-VX420');
    tableLevel2(doc,'Etiqueta','1700534');    
    tableLevel2(doc,'Año de compra','2017');
    tableLevel2(doc,'Número de serie','DC7240307');

    doc.font('Helvetica-Bold').fontSize(16).text('Datos Técnicos',6*mm5, doc.y+8); // level 1
    doc.moveTo(6*mm5,doc.y).lineTo(40*mm5,doc.y).stroke();
    doc.moveTo(23*mm5, doc.y+5);

    tableLevel2(doc,'Dirección IP','https://github.com/JesusMartinezRuano/PDF-Gen');
    tableLevel2(doc,'Password',' ');
    tableLevel2(doc,'Operable','NO');
    tableLevel2(doc,'Observaciones','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum ');
    
    let escuela_options = { width: 147.079, height: 45.528 };
    let barcode_options = { width:184.252,  height:42.52 };
    let upm_options = { width: 57.305, height: 45.354 }; // 45.354 = media pulgada    
    let qr_options = { width:56, height:56 }
          
    var barCodeUbi = barcode('09A.00.009.0', 'code128', {width:'184.252', barWidth:0.6, barHeight:42.52});
    var barCodeLoc = barcode('1700534', 'code128', {width:'184.252', barWidth:0.6, barHeight:42.52});
    const qrCode = qrcode({
      content: window.location.href,
      padding: 0,
      width: 56,
      height: 56,
      color: "#000000",
      background: "#ffffff",
      ecl: "M"    
    }) 
    
    SVGtoPDF(doc,logoUpm,14.173,14.173,upm_options);
    SVGtoPDF(doc,logoEscuela,433.921,14.173,escuela_options);
    SVGtoPDF(doc,qrCode,14.173,785.197,qr_options);

    doc.rotate(-90,{origin : [14.173,739.36]});
    SVGtoPDF(doc,barCodeUbi,14.173,739.36,barcode_options); // bottom left barcode 
    doc.font('OCR').text('09A.00.009.0',14.173,779.36);
    SVGtoPDF(doc,barCodeLoc,240.945,739.36,barcode_options); // middle left barcode 
    doc.font('OCR').text('1700534',240.945,779.36); 
    SVGtoPDF(doc,barCodeUbi,467.17,739.36,barcode_options); // top left barcode
    doc.font('OCR').text('09A.00.009.0',467.17,779.36);    
    doc.rotate(90,{origin : [14.173,739.36]});
    
    doc.end();
        
    stream.on('finish', () => {
      const blob = stream.toBlob('application/pdf');
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {  // apaño para explorer/edge
        window.navigator.msSaveOrOpenBlob(blob,'pdfkit-and-webpack.pdf');
        return;
      } else {          
      const anchor = document.createElement('a');
      document.body.appendChild(anchor);
      anchor.style = 'display: none';
      const url = window.URL.createObjectURL(blob);
      anchor.href = url;
      anchor.download = 'pdfkit-and-webpack.pdf';
      anchor.click();
      window.URL.revokeObjectURL(url);
      }
    })     
  }
    
  render() {
    return (
      <div>
        <div className="jumbotron">
          <h1 className="display-4">Pdf online Generation</h1>
          <p className="lead">Created using React and pdfkit. All graphics are vectorized. Rasterized in pdf are for botched workers</p>
          <hr className="my-4"/>
          <p>Run npm start and press the button</p>
          <p className="lead">
            <a className="btn btn-danger btn-lg" onClick={(e) => this.handleClick(e)} href="#" role="button">generate PDF</a>
          </p>
        </div>
      </div>
    );
  }
  
}

export default Pdf_Generater;

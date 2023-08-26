const PDFpdfument = require("pdfkit");
const fs = require("fs");

const pdftemplate = async (name,options,pdfTemp) => {
    let pdf = new PDFpdfument({ size: 'A4', margin: 25 });
    generateHeader(pdf,pdfTemp);
    generateContent(pdf, options);
    generateContentFoot(pdf, options);
    pdf.end()
    pdf.pipe(fs.createWriteStream(__dirname + '/../uploads/' + name + '.pdf'));
    return true;
}

function generateHeader(pdf,pdfTemp) {
    pdf.fillColor('black').fontSize(20).text(`${pdfTemp.name ? pdfTemp.name : ""} `, { align: 'left' });
    pdf.fillColor('black').fontSize(10).text(`${pdfTemp.fullAddress ? pdfTemp.fullAddress : ""} ${pdfTemp.city ? pdfTemp.city : ""}, ${pdfTemp.state ? pdfTemp.state : ""} ${pdfTemp.zipCode ? pdfTemp.zipCode : ""}`, { align: 'left' });
    pdf.fillColor('black').fontSize(10).text(`(p) ${pdfTemp.phoneNumber ? pdfTemp.phoneNumber : ""} | (f) ${pdfTemp.fax ? pdfTemp.fax : ""} `, { align: 'left' });
    pdf.fillColor('black').fontSize(10).text(`${pdfTemp.email ? pdfTemp.email : ""}`, { align: 'left' }).moveDown(3);
    pdf
    .image(__dirname + "/image.png", 390, 01, { width: 200 ,align:"right"})
    .fillColor("#444444")
    .fontSize(20);


    pdf.strokeColor("black").lineWidth(2).moveTo(25, 105).lineTo(560, 105).stroke("black");
}

function generateContent(pdf, options) {

    pdf.fillColor('black').fontSize(9).text(`Date: ${options.date ? options.date : ""}                                                             Email: ${options.email ? options.email : ""}`, { align: 'left' }).moveDown(1);
    pdf.fillColor('black').fontSize(9).text(`Company: ${options.company ? options.company : ""}  `, { align: 'left' }).moveDown(1);
    pdf.fillColor('black').fontSize(9).text(`Company Contact: ${options.companyPhoneNumber ? options.companyPhoneNumber : ""}  `, { align: 'left' }).moveDown(1);
    pdf.fillColor('black').fontSize(9).text(`Address: ${options.companyAddress ? options.companyAddress : ""}  `, { align: 'left' }).moveDown(1);
    pdf.fillColor('black').fontSize(9).text(`City: ${options.companyCity ? options.companyCity : ""}                                                             State: ${options.companyState ? options.companyState : ""}                                         Zip: ${options.companyZipCode ? options.companyZipCode : ""} `, { align: 'left' }).moveDown(1);
    pdf.fillColor('black').fontSize(9).text(`Phone: ${options.companyPhoneNumber ? options.companyPhoneNumber : ""}                                              Fax: ${options.fax ? options.fax : ""}  `, { align: 'left' }).moveDown(3);

    pdf.strokeColor("black").lineWidth(2).moveTo(25, 257).lineTo(560, 257).stroke("black");

    pdf.fillColor('black').fontSize(9).text(`Year: ${options.year ? options.year : ""}                                                             Vehicle: ${options.make ? options.make : ""}`, { align: 'left' }).moveDown(1);
    pdf.fillColor('black').fontSize(9).text(`Vin: ${options.vin ? options.vin : ""}  `, { align: 'left' }).moveDown(1);
    pdf.fillColor('black').fontSize(9).text(`Tag: ${options.tag ? options.tag : ""}                                                              ST:${options.st1 ? options.st1 : ""}                                                                 Color: ${options.color ? options.color : ""} `, { align: 'left' }).moveDown(1);
    pdf.fillColor('black').fontSize(9).text(`Drivers License #: ${options.driversLicense ? options.driversLicense : ""}                                                                                                                   ST: ${options.st2 ? options.st2 : ""}  `, { align: 'left' }).moveDown(1);
    pdf.fillColor('black').fontSize(9).text(`Finance CO/Customer Account #: ${options.accNo ? options.accNo : ""}`, { align: 'left' }).moveDown(3);

    pdf.strokeColor("black").lineWidth(2).moveTo(25, 385).lineTo(560, 385).stroke("black");


    pdf.rect(25, 410, 550, 20).lineWidth(0.7).fillAndStroke('white', 'black');
    pdf.fill('black').stroke();
    pdf.fontSize(9);
    pdf.text(`Subject: ${options.debtor ? options.debtor : ""}                                                    SS#: ${options.ssnNum ? options.ssnNum : ""}`, 27, 416, { lineBreak: false });
    pdf.rect(25, 430, 550, 20).lineWidth(0.7).fillAndStroke('white', 'black');
    pdf.fill('black').stroke();
    pdf.fontSize(9);
    pdf.text(`Address: ${options.address ? options.address : ""}`, 27, 436, { lineBreak: false });
    pdf.rect(25, 450, 550, 20).lineWidth(0.7).fillAndStroke('white', 'black');
    pdf.fill('black').stroke();
    pdf.fontSize(9);
    pdf.text(`city: ${options.city ? options.city : ""}                                                             State: ${options.state ? options.state : ""}                                                          Zip: ${options.zipCode ? options.zipCode : ""}`, 27, 456, { lineBreak: false });
    pdf.rect(25, 470, 550, 20).lineWidth(0.7).fillAndStroke('white', 'black');
    pdf.fill('black').stroke();
    pdf.fontSize(9);
    pdf.text(`Phone: ${options.cellNumber ? options.cellNumber : ""}                                                             Dob: ${options.dob ? options.dob : ""}`, 27, 476, { lineBreak: false });


    pdf.rect(25, 520, 550, 20).lineWidth(0.7).fillAndStroke('white', 'black');
    pdf.fill('black').stroke();
    pdf.fontSize(9);
    pdf.text(`Co-Buyer: ${options.coDebtor ? options.coDebtor : ""}                                                    SS#: ${options.coDebtorSsnNum ? options.coDebtorSsnNum : ""}`, 27, 526, { lineBreak: false });
    pdf.rect(25, 540, 550, 20).lineWidth(0.7).fillAndStroke('white', 'black');
    pdf.fill('black').stroke();
    pdf.fontSize(9);
    pdf.text(`Address: ${options.coDebtorAddress ? options.coDebtorAddress : ""}`, 27, 546, { lineBreak: false });
    pdf.rect(25, 560, 550, 20).lineWidth(0.7).fillAndStroke('white', 'black');
    pdf.fill('black').stroke();
    pdf.fontSize(9);
    pdf.text(`city: ${options.coDebtorCity ? options.coDebtorCity : ""}                                                             State: ${options.coDebtorState ? options.coDebtorState : ""}                                                          Zip: ${options.coDebtorZipCode ? options.coDebtorZipCode : ""}`, 27, 566, { lineBreak: false });
    pdf.rect(25, 580, 550, 20).lineWidth(0.7).fillAndStroke('white', 'black');
    pdf.fill('black').stroke();
    pdf.fontSize(9);
    pdf.text(`Phone: ${options.coDebtorCellNumber ? options.coDebtorCellNumber : ""}                                                             Dob: ${options.coDebtorDob ? options.coDebtorDob : ""}`, 27, 586, { lineBreak: false }).moveDown(3);
}

function generateContentFoot(pdf, options) {

    pdf.text(`                                                                          ${options.date ? options.date : "04-02-2000"}`, 27, 630, { lineBreak: false });
    pdf.strokeColor("black").lineWidth(2).moveTo(25, 643).lineTo(270, 643).stroke("black");
    pdf.text(`Authorized Signature                                              Date`, 27, 650, { lineBreak: false });


    pdf.text(`Drive fast USA`, 27, 680, {lineBreak: false} );
    pdf.strokeColor("black").lineWidth(2).moveTo(25, 690).lineTo(270, 690).stroke("black");
    pdf.text(`Print Name`, 27, 697, { lineBreak: false });
}

module.exports = {
    pdftemplate,
  };
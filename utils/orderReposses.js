const PDFpdfument = require("pdfkit");
const fs = require("fs");

const orderRepossesTemplate = async (name,options,pdfTemp) => {
    let pdf = new PDFpdfument({ size: 'A4', margin: 25 });
    generateHeader(pdf);
    generateContent(pdf, options,pdfTemp);
    // generateContentFoot(pdf, options);
    pdf.end()
    pdf.pipe(fs.createWriteStream(__dirname + '/../uploads/' + name + '.pdf'));
    return true;
}

function generateHeader(pdf) {
    pdf.fillColor('black').fontSize(9).text(``).moveDown(4);
    pdf.fontSize(13).font('Times-Bold').text(`ORDER TO REPOSSESS`, { align: 'center' }).moveDown(4);
}

function generateContent(pdf, options,pdfTemp) {

   
    pdf.strokeColor("black").lineWidth(0.5).moveTo(380, 168).lineTo(480, 168).stroke("black");
      
    pdf.strokeColor("black").lineWidth(0.5).moveTo(380, 198).lineTo(480, 198).stroke("black");

    pdf.strokeColor("black").lineWidth(0.5).moveTo(380, 228).lineTo(480, 228).stroke("black");

    pdf.fillColor('black').font('Times-Bold').fontSize(10).text(`Date ${options.date ? options.date : ""}`,50, 140);


    pdf.fillColor('black').fontSize(9).text(`MEND Financial, LLC`,50, 160);
    pdf.fillColor('black').fontSize(9).text(`4880 S 96th St`,50, 175);
    pdf.fillColor('black').fontSize(9).text(`Omaha, NE 68127`,50, 190);
    pdf.fillColor('black').fontSize(9).text(`(531)600-1112 `,50, 205);
    pdf.fillColor('black').fontSize(9).text(`Field ${pdfTemp.name ? pdfTemp.name : ""}`, 380, 160);
    pdf.fillColor('black').fontSize(6).text(`Repossession Company ${options.date ? options.date : ""}`, 380, 170);
    pdf.fillColor('black').fontSize(9).text(`PO ${pdfTemp.fullAddress ? pdfTemp.fullAddress : ""} ${pdfTemp.city ? pdfTemp.city : ""}, ${pdfTemp.state ? pdfTemp.state : ""} ${pdfTemp.zipCode ? pdfTemp.zipCode : ""}`, 380, 190);
    pdf.fillColor('black').fontSize(6).text(`Repossession Company Address ${options.date ? options.date : ""}`, 380, 200);
    pdf.fillColor('black').fontSize(9).text(`531.600.1112`, 380, 220);
    pdf.fillColor('black').fontSize(6).text(`Repossession Company Direct Line ${options.date ? options.date : ""}`, 380, 230);

    pdf.fillColor('black').fontSize(6).text(`YOU ARE AUTHORIZED TO REPOSSESS THE AUTOMOBILE DESCRIBED BELOW. IT IS UNDERSTOOD THAT YOU WILL ACT AS AN INDEPENDENT CONTRACTOR WHILE MAKING`, 50, 285);
    pdf.fillColor('black').fontSize(6).text(`SUCH REPOSSESSION, AND WE RESERVE NO RIGHT TO CONTROL AND DIRECT THE MANNER IN WHICH YOU PERFORM THE SERVICES FOR US. THE TIME, MANNER AND`, 50, 295);
    pdf.fillColor('black').fontSize(6).text(`METHOD OF PERFORMANCE OF SUCH SERVICES SHALL BE DETERMINED BY YOU. YOU ARE ACCOUNTABLE TO US FOR THE ULTIMATE RESULTS ACCOMPLISHED THROUGH `, 50, 305);
    pdf.fillColor('black').fontSize(6).text(`THE RENDITION OF SUCH SERVICES. WE WILL PAY YOUR USUAL RATE, FEES AND EXPENSES FOR THE SERVICES PERFORMED IN THIS CONNECTION AND WILL NOTIFY YOU `, 50, 315);
    pdf.fillColor('black').fontSize(6).text(`IMMEDIATELY OF SETTLEMENTS MADE BY US SO THAT REPOSSESSIONS SHOULD NOT BE CARRIED OUT. WE AGREE TO PROTECT AND HOLD YOU HARMLESS FROM ANY `, 50, 325);
    pdf.fillColor('black').fontSize(6).text(`AND ALL LIABILITY OF EVERY KIND AND NATURE IMPOSED OR SOUGHT TO BE IMPOSED UPON YOU AS A RESULT OF ANY NEGLIGENCE, ERROR OR OMISSION ON OUR PART; `, 50, 335);
    pdf.fillColor('black').fontSize(6).text(`INCLUDING EMPLOYEES AND/OR AGENTS. WE HERBY WARRANT THAT WE ARE ENTITLED TO IMMEDIATE POSSESSION OF THE VEHICLE DESCRIBED BELOW. `, 50, 345);


    pdf.fillColor('black').fontSize(9).text(`Contract Number: ${options.date ? options.date : ""}`,50, 380);
    pdf.fillColor('black').fontSize(9).text(`Year,Make,Modal & Color: ${options.year ? options.year : ""} ${options.make ? options.make : ""} ${options.model ? options.model : ""} ${options.color ? options.color : ""}`,50, 400);
    pdf.fillColor('black').fontSize(9).text(`Vin: ${options.vin ? options.vin : ""} `,380, 400);
    pdf.fillColor('black').fontSize(9).text(`Past Due Amount: ${options.amountPastDue ? options.amountPastDue : ""}`,50, 420);
    pdf.fillColor('black').fontSize(9).text(`Days Past Due: ${options.date ? options.date : ""}`,380, 420);
    pdf.fillColor('black').fontSize(9).text(`Borrower/Lessee: ${options.debtor ? options.debtor : ""}`,50, 445);
    pdf.fillColor('black').fontSize(9).text(`Date Of Birth: ${options.dob ? options.dob : ""}`,380, 445);
    pdf.fillColor('black').fontSize(9).text(`Home address: ${options.address ? options.address : ""}`,50, 465);
    pdf.fillColor('black').fontSize(9).text(`License #: ${options.driversLicense ? options.driversLicense : ""} `,50, 485);
    pdf.fillColor('black').fontSize(9).text(`Customer Home Phone: ${options.companyPhoneNumber ? options.companyPhoneNumber : ""} `,50, 510);
    pdf.fillColor('black').fontSize(9).text(`Customer Cell Phone: ${options.cellNumber ? options.cellNumber : ""} `,380, 510);
    pdf.fillColor('black').fontSize(9).text(`Customer Employer Name:  ${options.employerName ? options.employerName : ""} `,50, 530);
    pdf.fillColor('black').fontSize(9).text(`Customer Work Phone:  ${options.companyPhoneNumber ? options.companyPhoneNumber : ""}`,380, 530);
    pdf.fillColor('black').fontSize(9).text(`Co-Buyer Name: ${options.coDebtor ? options.coDebtor : ""}  `,50, 555);
    pdf.fillColor('black').fontSize(9).text(`Co-Buyer Date Of Birth:  ${options.coDebtorDob ? options.coDebtorDob : ""}`,380, 555);
    pdf.fillColor('black').fontSize(9).text(`Co-Buyer Address:  ${options.coDebtorAddress ? options.coDebtorAddress : ""}`,50, 575);
    pdf.fillColor('black').fontSize(9).text(`Co-Buyer License#: ${options.coDebtorSsnNum ? options.coDebtorSsnNum : ""}`,50, 595);   
    
    pdf.fillColor('black').fontSize(9).text(`Co-Buyer Home Phone: ${options.coDebtorHomeNumber ? options.coDebtorHomeNumber : ""}`,50, 620);
    pdf.fillColor('black').fontSize(9).text(`Co-Buyer Cell Phone: ${options.coDebtorCellNumber ? options.coDebtorCellNumber : ""}`,380, 620);
    pdf.fillColor('black').fontSize(9).text(`Co-Buyer Employer Name:  ${options.coDebtorEmployerName ? options.coDebtorEmployerName : ""}`,50, 640);
    pdf.fillColor('black').fontSize(9).text(`Co-Buyer Work Phone:  ${options.coDebtorHomeNumber ? options.coDebtorHomeNumber : ""}`,380, 640);

    pdf.strokeColor("black").lineWidth(1).moveTo(25, 720).lineTo(560, 720).stroke("black");

    pdf.fillColor('black').fontSize(9).text(`Assigned By (Name) `,120, 735);
    pdf.fillColor('black').fontSize(9).text(`Assigned By (Signature) `,330, 735);

}

module.exports = {
    orderRepossesTemplate,
  };
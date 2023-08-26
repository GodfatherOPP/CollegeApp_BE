const PDFpdfument = require("pdfkit");
const fs = require("fs");

const fieldServicepdftemplate = async (name,options,pdfTemp) => {
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
        .image(__dirname + "/image.png", 395, 01, { width: 200, align: "right" })
        .fillColor("#444444")
        .fontSize(20);


    pdf.strokeColor("black").lineWidth(2).moveTo(25, 105).lineTo(560, 105).stroke("black");
}

function generateContent(pdf, options) {

    pdf.fillColor('black').fontSize(9).text(`                                                    Repossession Agreement                                                                              Acct#: ${options.accNo ? options.accNo : ""}`, { align: 'left' }).moveDown(1);
    pdf.fillColor('black').fontSize(9).text(`Client/Lien Holder: ${options.clientHolder ? options.clientHolder : ""}                                                                                                        Contact name:${options.name ? options.name : ""}`, { align: 'left' }).moveDown(1);
    pdf.fillColor('black').fontSize(9).text(`Phone: ${options.phoneNumber ? options.phoneNumber : ""}                                          Fax: ${options.fax ? options.fax : ""}            Updates/Billing Email: ${options.email ? options.email : ""}`, { align: 'left' }).moveDown(1);
    pdf.fillColor('black').fontSize(9).text(`Mailing Address: ${options.mailingAddress ? options.mailingAddress : ""}  `, { align: 'left' }).moveDown(2);


    pdf.strokeColor("black").lineWidth(2).moveTo(25, 200).lineTo(560, 200).stroke("black");

    pdf.fillColor('black').fontSize(9).text(`Debtor: ${options.debtor ? options.debtor : ""}                                                 SSN: ${options.ssnNum ? options.ssnNum : ""}                                       DOB: ${options.dob ? options.dob : ""}`, { align: 'left' }).moveDown(1);
    pdf.fillColor('black').fontSize(9).text(`Address: ${options.address ? options.address : ""}  `, { align: 'left' }).moveDown(1);
    pdf.fillColor('black').fontSize(9).text(`Home Phone: ${options.homeNumber ? options.homeNumber : ""}                                                            Cell Phone: ${options.cellNumber ? options.cellNumber : ""}                                    Employer: ${options.employerName ? options.employerName : ""} `, { align: 'left' }).moveDown(1);
    pdf.fillColor('black').fontSize(9).text(`Employer Address #: ${options.employerAddress ? options.employerAddress : ""}   `, { align: 'left' }).moveDown(1);
    pdf.fillColor('black').fontSize(9).text(`Co-Debtor: ${options.coDebtor ? options.coDebtor : ""}                                                             SSN: ${options.coDebtorSsnNum ? options.coDebtorSsnNum : ""}                                                                 DOB: ${options.coDebtorDob ? options.coDebtorDob : ""}`, { align: 'left' }).moveDown(1);
    pdf.fillColor('black').fontSize(9).text(`Address: ${options.coDebtorAddress ? options.coDebtorAddress : ""}  `, { align: 'left' }).moveDown(1);
    pdf.fillColor('black').fontSize(9).text(`Home Phone: ${options.coDebtorHomeNumber ? options.coDebtorHomeNumber : ""}                                                       Cell Phone: ${options.coDebtorCellNumber ? options.coDebtorCellNumber : ""}                                    Employer: ${options.coDebtorEmployerName ? options.coDebtorEmployerName : ""} `, { align: 'left' }).moveDown(1);
    pdf.fillColor('black').fontSize(9).text(`Employer Address #: ${options.coDebtorEmployerAddress ? options.coDebtorEmployerAddress : ""}   `, { align: 'left' }).moveDown(2);

    pdf.strokeColor("black").lineWidth(2).moveTo(25, 377).lineTo(560, 377).stroke("black");

    pdf.fillColor('black').fontSize(9).text(`Year: ${options.year ? options.year : ""}                                 Make: ${options.make ? options.make : ""}                                     Model: ${options.model ? options.model : ""}                        color: ${options.color ? options.color : ""}`, { align: 'left' }).moveDown(1);
    pdf.fillColor('black').fontSize(9).text(`Vin #: ${options.vin ? options.vin : ""}                                                                                                                Tag: ${options.tag ? options.tag : ""}                              Key code: ${options.keyCode ? options.keyCode : ""}  `, { align: 'left' }).moveDown(1);
    pdf.fillColor('black').fontSize(9).text(`Amount Past Due: ${options.amountPastDue ? options.amountPastDue : ""}                                             Delinquency Date: ${options.delinquencyDate ? options.delinquencyDate : ""}                      RTC Date Sent: ${options.rtcDateSent ? options.rtcDateSent : ""} `, { align: 'left' }).moveDown(2);

    pdf.strokeColor("black").lineWidth(2).moveTo(25, 455).lineTo(560, 455).stroke("black");

    pdf.fillColor('black').fontSize(8).text(`**Please Attach Any additional Information Including Additionl addresses, family Members, And References, Thank You.`, { align: 'left' }).moveDown(1);
    pdf.fillColor('black').fontSize(7).text(`This is Your Authorization To Act As Our Agent To Repossess, On Sight, All Collateral Which We Assign To You Which Is Covered By Default Contract, We Agree To Indemnify And Hold You Harmless From And Against Any And All Claims Except Unauthorized Or Unlawful Act of Your Firm. You Will Not Be Held Liable For The Mechanical Operation Of The Vehicle Or For Insurance Protection Except In Case Of Your Neglect.`, { align: 'left' }).moveDown(1);
}

function generateContentFoot(pdf, options) {

    pdf.text(`                                                                                        ${options.basicda ? options.basicda : "04-02-2000"}`, 27, 530, { lineBreak: false });
    pdf.strokeColor("black").lineWidth(2).moveTo(25, 543).lineTo(270, 543).stroke("black");
    pdf.fontSize(9).text(`Authorized Signature                                              Date`, 27, 550, { lineBreak: false });



    pdf.strokeColor("black").lineWidth(2).moveTo(25, 570).lineTo(270, 570).stroke("black");
    pdf.fontSize(9).text(`Print Name`, 27, 577, { lineBreak: false });
}

module.exports = {
    fieldServicepdftemplate,
};
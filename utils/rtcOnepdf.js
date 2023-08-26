const PDFpdfument = require("pdfkit");
const fs = require("fs");
const dayjs = require("dayjs");

const rtcOnepdftemplate = async (name, options,amount, customer) => {
    let pdf = new PDFpdfument({ size: 'A4', margin: 25 });
    pdf.lineGap(4);
    pdf.fontSize(9);
    pdf.fillColor('black');
    generateHeader(pdf, options);
    generateContentHead(pdf, customer,amount);
    generateContent(pdf);
    generateContentFoot(pdf, options);
    pdf.end()
    pdf.pipe(fs.createWriteStream(__dirname + '/../uploads/' + name + '.pdf'));
    return true;
}

function generateHeader(pdf, options) {
    pdf.moveDown(1.2);
    pdf.text(`${options.name ? options.name : "MEND Financial, LLC"} `, { align: 'center' });
    pdf.text(`${options.fullAddress ? options.fullAddress : "4880 S 96th St"} ${options.city ? options.city : ""}, ${options.state ? options.state : ""} ${options.zipCode ? options.zipCode : ""}`, { align: 'center' });
    pdf.text(`${options.phoneNumber ? options.phoneNumber : "Omaha, NE 68127"} | (f) ${options.fax ? options.fax : ""} `, { align: 'center' });
    pdf.text(`${options.phoneNumber ? options.phoneNumber : "(531)600-1112"}`, { align: 'center' });
    pdf.moveDown(0.7);
}

function generateContentHead(pdf, customer,amount) {
    pdf.text(`${customer.firstName ? customer.firstName : ``} ${customer.lastName ? customer.lastName : ``}`);
    pdf.text(`${customer.address1 ? customer.address1 : ``}`);
    pdf.text(`${customer.city ? customer.city : ``}, ${customer.state ? customer.state : ``}  ${customer.zipCode ? customer.zipCode : ``}`);
    pdf.text(`${dayjs().format('DD-MM-YYYY') ? dayjs().format('DD-MM-YYYY') : ``}`);
    pdf.moveDown(1.0);
    pdf.text(`${`NOTICE OF RIGHT TO CURE DEFAULT`}`, { align: 'center' });
    pdf.moveDown(1.0);
    pdf.text(`Account Number: ${customer.stkNumber ? customer.stkNumber : ``}`);
    pdf.text(`Description Of Collateral: ${customer.colletralDesc ? customer.colletralDesc : ``}`);
    pdf.text(`Vehicle Identification No: ${customer.vin ? customer.vin : ``}`);
    pdf.moveDown(1.0);
    pdf.text(`$${amount ? amount : ``} Is The AMOUNT NOW DUE`);
    pdf.text(`${dayjs().format('DD-MM-YYYY') ? dayjs().format('DD-MM-YYYY') : ``} Is The LAST DAY FOR PAYMENT`);
    pdf.moveDown(1.0);
    pdf.text(`Dear ${customer.firstName ? customer.firstName : ``} ${customer.lastName ? customer.lastName : ``}`);
    pdf.moveDown(0.7);
}

function generateContent(pdf) {
    pdf.text(`You Are Late In Making Your Payment(s). If You Pay The AMOUNT NOW DUE (above) By The LAST DAY FOR PAYMENT (above), You May Continue With The Contract As Though You Were Not Late. If You Do Not Pay By That Date, May Exercise Our Rights Under The Law. You May Be Obligated To Pay Reasonable Costs Of Collection, Including, But Not Limited To, Court Costs, Attorney Fees And Collection Agency Fees, Except That Such Cost Of Collection: (1) May Not Include Costs That Were Incurred By A Salaried Employee Of The Creditor Or Its Assignee; (2) May Not Include The Recovery Of Both Attorney Fees And Collection Agency Fees; And (3) Shall Not Be In Excess Of 15% Of The Unpaid Debt After Default`);
    pdf.moveDown(0.7);
    pdf.text(`If You Voluntarily Surrender Possession Of The Above Vehicle, You Could Still Owe Additional Money After The Money Received From The Sale Of The Above Vehicle Is Deducted From The Total Amount You Owe.`);
    pdf.moveDown(0.7);
    pdf.text(`If You Have Filed Bankruptcy, This Notice Is Not An Attempt To Collect A Debt But Is For Your Information Only. We May Enforce Our Lien Against Any Property That You Gave As Collateral For This Debt. If This Debt Has Been Discharged, You Are Not Personally Liable For Payment Unless You Have Reaffirmed Such Debt In Your Bankruptcy`);
    pdf.moveDown(0.7);
    pdf.text(`In The Case Of Future Defaults Of This Agreement, You Will Have No Further Right To Cure And We May Exercise Our Rights Without Sending You Another Notice Like This One.`);
    pdf.moveDown(0.7);
    pdf.text(`If You Have Any Questions Write Or Telephone Us Promptly At (402)504-4952`);
    pdf.moveDown(0.7);
    pdf.text(`Sincerely,`);
    pdf.moveDown(1.5);
}

function generateContentFoot(pdf, options) {
    pdf.text(`${options.name ? options.name : "MEND Financial, LLC"} `, { align: 'left' });
    pdf.text(`${options.fullAddress ? options.fullAddress : "4880 S 96th St"} ${options.city ? options.city : ""}, ${options.state ? options.state : ""} ${options.zipCode ? options.zipCode : ""}`, { align: 'left' });
    pdf.text(`${options.phoneNumber ? options.phoneNumber : "Omaha, NE 68127"} | (f) ${options.fax ? options.fax : ""} `, { align: 'left' });
    pdf.text(`${options.email ? options.email : "(531)600-1112"}`, { align: 'left' }).moveDown(3);
}

module.exports = {
    rtcOnepdftemplate,
};
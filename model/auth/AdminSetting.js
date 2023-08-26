const mongoose = require("mongoose");

const AdminSettingSchema = new mongoose.Schema({
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  flags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Flags",
    },
  ],
  email: {
    type: String,
    trim: true,
  },
  auxChatApiKey: {
    type: String,
    trim: true,
  },
  fromNumber: {
    type: String,
    trim: true,
  },
  merchantId: {
    type: String,
    trim: true,
  },
  signatureName: {
    type: String,
    trim: true,
  },
  password: {
    iv: {
      type: String,
      trim: true,
    },
    encryptedPassword: {
      type: String,
      trim: true,
    },
  },
  institutionId: {
    type: Number,
    trim: true,
  },
  token: {
    value: { type: String, trim: true },
    createdAt: Date,
  },
  logo: {
    type: String,
    trim: true,
  },
  appName: {
    type: String,
    trim: true,
  },
  sidebarPermission: {
    dashboardPermission: { type: Boolean, default: true },
    customers: { type: Boolean, default: true },
    arrangement: { type: Boolean, default: true },
    queues: { type: Boolean, default: true },
    repos: { type: Boolean, default: true },
    insurance: { type: Boolean, default: true },
    sales: { type: Boolean, default: true },
    agent: { type: Boolean, default: true },
    flags: { type: Boolean, default: true },
    idms: { type: Boolean, default: true },
    text: { type: Boolean, default: true },
    email: { type: Boolean, default: true },
    callTemp: { type: Boolean, default: true },
    note: { type: Boolean, default: true },
    callDisposition: { type: Boolean, default: true },
    imports: { type: Boolean, default: true },
    impoundCompany: { type: Boolean, default: true },
    workflow: { type: Boolean, default: true },
    callerId: { type: Boolean, default: true },
    phoneScripts: { type: Boolean, default: true },
    callCampaign: { type: Boolean, default: true },
    callDialer: { type: Boolean, default: true },
    call: { type: Boolean, default: true },
    transaction: { type: Boolean, default: true },
    autopay: { type: Boolean, default: true },
    failedAutopay: { type: Boolean, default: true },
    ticketPermission: { type: Boolean, default: true },
    chatPermission: { type: Boolean, default: true },
    callcenterNumbers: { type: Boolean, default: true },
    callcenterQueues: { type: Boolean, default: true },
    callcenterIvr: { type: Boolean, default: true },
    callcenterAudio: { type: Boolean, default: true },
    customerTicket: { type: Boolean, default: true },
    customerAccident: { type: Boolean, default: true },
    agentRoute: { type: Boolean, default: true },
    virtualTerminal: { type: Boolean, default: true },
    calendar: { type: Boolean, default: true },
    calltransferList: { type: Boolean, default: true },
    smsfromnumber: { type: Boolean, default: true },
  },
});

// export model AgentSetting with AgentSettingSchema
module.exports = mongoose.model("AdminSetting", AdminSettingSchema);

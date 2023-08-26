const mongoose = require("mongoose");

const AgentSettingSchema = new mongoose.Schema({
  agentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  routes: [
    {
      type: Map,
      of: String,
    },
  ],
  supervisor: {
    type: Boolean,
    default: false,
  },
  flags: {
    p2pFlag: { type: Boolean },
    rtcFlag: { type: Boolean },
    pastDueFlag: { type: Boolean },
    nextDueFlag: { type: Boolean },
    callReferencesFlag: { type: Boolean },
    needDisabledFlag: { type: Boolean },
    smsProviderFlag: { type: Boolean },
    emailFlag: { type: Boolean },
    editMessageTemplateFlag: { type: Boolean },
    callDialerFlag: { type: Boolean },
    techFee: { type: Boolean },
    currentDueFlag: { type: Boolean },
    ptpOpenFlag: { type: Boolean },
    virtualTerminal: { type: Boolean },
  },
  sidebarPermission: {
    dashboardPermission: { type: Boolean },
    customers: { type: Boolean },
    arrangement: { type: Boolean },
    queues: { type: Boolean },
    repos: { type: Boolean },
    insurance: { type: Boolean },
    sales: { type: Boolean },
    agent: { type: Boolean },
    flags: { type: Boolean },
    idms: { type: Boolean },
    text: { type: Boolean },
    email: { type: Boolean },
    callTemp: { type: Boolean },
    note: { type: Boolean },
    callDisposition: { type: Boolean },
    imports: { type: Boolean },
    impoundCompany: { type: Boolean },
    workflow: { type: Boolean },
    callerId: { type: Boolean },
    phoneScripts: { type: Boolean },
    callCampaign: { type: Boolean },
    callDialer: { type: Boolean },
    call: { type: Boolean },
    transaction: { type: Boolean },
    autopay: { type: Boolean },
    failedAutopay: { type: Boolean },
    ticketPermission: { type: Boolean },
    chatPermission: { type: Boolean },
    callcenterNumbers: { type: Boolean },
    callcenterQueues: { type: Boolean },
    callcenterIvr: { type: Boolean },
    callcenterAudio: { type: Boolean },
    customerTicket: { type: Boolean },
    customerAccident: { type: Boolean },
    agentRoute: { type: Boolean },
    virtualTerminal: { type: Boolean },
    calendar: { type: Boolean },
    smsfromnumber: { type: Boolean },
  },
});

// export model AgentSetting with AgentSettingSchema
module.exports = mongoose.model("AgentSetting", AgentSettingSchema);

/**
 * @createdBy Kamal
 * @createdOn 05th May 2020
 */

import { eventModel } from '../models/event.model';
import MessageService from '../services/message.service';
const eventHandler: any = {};

/**
 *
 * @param {Object} req - request object
 * @param {Object} reply - response object
 * @description - create event function
 */
eventHandler.createEvent = async function (req: any, res: any, done: any) {
  try {
    const data: any = {};
    data.SUMMARY = req.body.summary;
    data.DURATION = req.body.duration;
    data.REPEATTYPE = req.body.repeat_type;
    data.REPEATTIME = req.body.repeat_time;
    data.REPEATWHEN = req.body.repeat_when;
    data.SECTION = req.body.section;
    data.MSGID = req.body.msgid;
    data.DESCRIPTION = req.body.description;
    data.COMPLETEPERCENTAGE = req.body.complete_percentage;
    data.UID = req.body.uid;
    data.CATEGORY_COLOR = req.body.category_color;
    data.LASTMODIFIED = req.body.last_modified;
    data.COMPLETEDWHEN = req.body.completed_when;
    data.FMTTYPE = req.body.fmttype;
    data.ATTENDEE = req.body.attendee;
    data.DTSTART = req.body.dtstart;
    data.DTEND = req.body.dtend;
    data.ACTION = req.body.action;
    data.TRIGGER = req.body.trigger;
    data.OWNERID = req.body.owner_id;
    data.SIPID = req.body.sip_id;
    data.STATUS = req.body.status;
    data.SENDER = req.body.sender;
    data.RECEIVER = req.body.receiver;
    data.CONV_ID = req.body.conv_id;
    data.THREAD_ID = req.body.thread_id;
    data.ASSIGNEECOMPLETED = req.body.assignee_completed;
    data.DUETIME = req.body.due_time;
    data.GROUPID = req.body.group_id;
    data.RRULE = req.body.rrule;
    data.LOCATION = req.body.location;
    data.COMPANY_ID = req.body.company_id;

    const stanzaData: any = {};
    stanzaData.from = data.OWNERID;
    stanzaData.to = data.RECEIVER;
    const chatType = data.GROUPID ? 'groupchat' : 'chat';
    // stanzaData.stanza = `<message type='${chatType}' id='${data.MSGID}' from = '${data.OWNERID}' to = '${data.RECEIVER}'> <body>${data.DESCRIPTION}</body> <markable xmlns = 'urn:xmpp:chat-markers:0' /><origin-id id = '${data.MSGID}' xmlns = 'urn:xmpp:sid:0' /> <message-type value = 'TEXT' xmlns = 'urn:xmpp:message-correct:0' /> <thread parent='' >${data.THREAD_ID} < /thread><active xmlns='http:/ / jabber.org / protocol / chatstates'/></message>`;
    stanzaData.stanza = `<message type='${chatType}' id='${data.MSGID}' from='${data.OWNERID}' to='${data.RECEIVER}'><body>${data.DESCRIPTION}</body><markable xmlns='urn:xmpp:chat-markers:0'/><origin-id id='${data.MSGID}' xmlns='urn:xmpp:sid:0'/><message-type value='TEXT' xmlns='urn:xmpp:message-correct:0'/><thread parent=''>${data.THREAD_ID}</thread><active xmlns='http://jabber.org/protocol/chatstates'/></message>`;
    const eventCollection = await this.mongo.MONGO1.db.collection('event');
    await eventModel.createEvent(data, eventCollection);
    console.log(stanzaData);
    const messageService = new MessageService();
    const sendMessageResult = await messageService.sendStanza(stanzaData);
    console.log(sendMessageResult);
    if (sendMessageResult === 0) {
      res.send({ status_code: 200, message: 'Event sent successfully' });
    } else {
      res.send({ status_code: 200, message: 'Event sent failed' });
    }
  } catch (err) {
    console.log(err);
    res.send({ status_code: 500, message: 'internal server error' });
  }
};

/**
 *
 * @param {Object} req - request object
 * @param {Object} reply - response object
 * @description - update event function
 */
eventHandler.updateEvent = async function (req: any, res: any, done: any) {
  try {
    const stanzaData: any = {};
    await eventModel.updateEvent();
    const messageService = new MessageService();
    await messageService.sendStanza(stanzaData);
    res.send({ status_code: 200, message: 'success' });
  } catch (err) {
    console.log(err);
    res.send({ status_code: 500, message: 'internal server error' });
  }
};

/**
 *
 * @param {Object} req - request object
 * @param {Object} reply - response object
 * @description - delete event function DeleteEventbyUID
 */
eventHandler.deleteEvent = async function (req: any, res: any, done: any) {
  try {
    const data: any = {};
    data.UID = req.params.uid;
    const eventCollection = await this.mongo.MONGO1.db.collection('event');
    const deleteRes = await eventModel.deleteEvent(data, eventCollection);
    if (deleteRes.deletedCount > 0) {
      res.send({ status_code: 200, message: 'Event deleted successfully' });
    } else {
      res.send({ status_code: 200, message: 'Event delete failed' });
    }
  } catch (err) {
    console.log(err);
    res.send({ status_code: 500, message: 'internal server error' });
  }
};

export const eventHandlers: any = eventHandler;
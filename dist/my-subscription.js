"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const enqueuer_1 = require("enqueuer");
class MySubscription extends enqueuer_1.Subscription {
    constructor(subscriptionModel) {
        super(subscriptionModel);
    }
    receiveMessage() {
        return __awaiter(this, void 0, void 0, function* () {
            //Get the message and send it back as this method return
            this.executeHookEvent('onMessageReceived', { value: this.received, numeral: this.number });
        });
    }
    subscribe() {
        return __awaiter(this, void 0, void 0, function* () {
            //Override it to open a server, register a listener or something similar
            this.executeHookEvent('onSubscribed', { subscribed: 'yay' });
        });
    }
    unsubscribe() {
        return __awaiter(this, void 0, void 0, function* () {
            //Override it if you need to close a server, remove a listener or something similar
            this.executeHookEvent('onUnsubscribed', { unsubscribed: 'noo' });
        });
    }
    sendResponse() {
        return __awaiter(this, void 0, void 0, function* () {
            //If it's a synchronous protocol, feel free to send a response back
            console.log('virgs');
            this.executeHookEvent('onResponseSent', { response: 'sync' });
        });
    }
}
exports.MySubscription = MySubscription;

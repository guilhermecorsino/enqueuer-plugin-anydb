"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const my_subscription_1 = require("./my-subscription");
const my_publisher_1 = require("./my-publisher");
const enqueuer_1 = require("enqueuer");
const my_formatter_1 = require("./my-formatter");
const my_parser_1 = require("./my-parser");
const my_asserter_1 = require("./my-asserter");
//Enqueuer demands a 'entryPoint' method in the index file to the plugin work correctly
function entryPoint(mainInstance) {
    const mySubscription = new enqueuer_1.SubscriptionProtocol('my-plugin', (subscriptionModel) => new my_subscription_1.MySubscription(subscriptionModel), {
        homepage: 'web home page',
        description: 'Give it a nice description',
        libraryHomepage: 'main library web home page',
        schema: {
            attributes: {
                received: {
                    type: 'string'
                },
                number: {
                    type: 'number'
                }
            },
            hooks: {
                onMessageReceived: {
                    description: 'When does it happen?',
                    arguments: {
                        value: {
                            description: 'Same as subscription \'received\''
                        },
                        numeral: {
                            description: 'Same as subscription \'number\''
                        }
                    }
                },
                onSubscribed: {
                    description: 'When does it happen?',
                    arguments: {
                        subscribed: {
                            description: 'yay'
                        },
                    }
                },
                onUnsubscribed: {
                    description: 'When does it happen?',
                    arguments: {
                        unsubscribed: {
                            description: 'noo'
                        },
                    }
                },
                onResponseSent: {
                    description: 'When does it happen?',
                    arguments: {
                        response: {
                            description: 'sync'
                        },
                    }
                },
            }
        }
    })
        .addAlternativeName('alternativeName') //Optional. Set it to help enqueuer users. Set it if your plugin has alias
        .setLibrary('main-dependency-name'); //Optional. Set it to help enqueuer users
    mainInstance.protocolManager.addProtocol(mySubscription);
    const myPublisher = new enqueuer_1.PublisherProtocol('my-plugin', (publisherModel) => new my_publisher_1.MyPublisher(publisherModel), {
        homepage: 'web home page',
        description: 'Give it a nice description',
        libraryHomepage: 'main library web home page',
        schema: {
            attributes: {
                first: {
                    type: 'string'
                },
                second: {
                    type: 'string'
                }
            },
            hooks: {
                onFirstHook: {
                    description: 'When does it happen?',
                    arguments: {
                        revertedFirst: {
                            description: 'Gets \'first\' value and revert it'
                        }
                    }
                },
                onSecondHook: {
                    description: 'When does it happen?',
                    arguments: {
                        second: {
                            description: 'Gets \'second\' and split it using \'.\''
                        }
                    }
                },
            }
        }
    })
        .addAlternativeName('alternativeName') //Optional. Set it to help enqueuer users. Set it if your plugin has alias
        .setLibrary('main-dependency-name'); //Optional. Set it to help enqueuer users
    mainInstance.protocolManager.addProtocol(myPublisher);
    mainInstance.reportFormatterManager.addReportFormatter(() => new my_formatter_1.MyReportFormatter(), 'my-plugin');
    mainInstance.objectParserManager.addObjectParser(() => new my_parser_1.MyParser(), 'nqr');
    mainInstance.asserterManager.addAsserter({
        assertThat: {
            description: 'actual value'
        }, is: {
            description: 'expected value'
        }
    }, () => new my_asserter_1.MyAsserter());
}
exports.entryPoint = entryPoint;

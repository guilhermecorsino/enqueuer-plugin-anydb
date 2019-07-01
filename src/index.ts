import {MySubscription} from './my-subscription';
import {MyPublisher} from './my-publisher';
import {
    InputPublisherModel as PublisherModel,
    InputSubscriptionModel as SubscriptionModel,
    MainInstance,
    PublisherProtocol,
    SubscriptionProtocol
} from 'enqueuer';
import {MyReportFormatter} from './my-formatter';
import {MyParser} from './my-parser';
import {MyAsserter} from './my-asserter';

//Enqueuer demands a 'entryPoint' method in the index file to the plugin work correctly
export function entryPoint(mainInstance: MainInstance): void {

    const mySubscription = new SubscriptionProtocol('my-plugin',
        (subscriptionModel: SubscriptionModel) => new MySubscription(subscriptionModel),
        {
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

    const myPublisher = new PublisherProtocol('my-plugin',
        (publisherModel: PublisherModel) => new MyPublisher(publisherModel),
        {
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
        .setLibrary('main-dependency-name');  //Optional. Set it to help enqueuer users
    mainInstance.protocolManager.addProtocol(myPublisher);

    mainInstance.reportFormatterManager.addReportFormatter(() => new MyReportFormatter(), 'my-plugin');

    mainInstance.objectParserManager.addObjectParser(() => new MyParser(), 'nqr');

    mainInstance.asserterManager.addAsserter({
        assertThat: {
            description: 'actual value'
        }, is: {
            description: 'expected value'
        }
    }, () => new MyAsserter());

}

import {
  InputActuatorModel as ActuatorModel,
  Logger,
  Actuator,
} from "enqueuer";

import * as ddb from "@aws-sdk/client-dynamodb";

import { CreateTableCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";

const constructors = {
  CreateTableCommand: (params: any) => new CreateTableCommand(params),
};

const commands: { [key: string]: any } = {};

Object.keys(ddb)
  .filter((key) => key.endsWith("Command"))
  .map((key) => {
    if (key in ddb) {
      const command = ddb[key as keyof typeof ddb];
      if (typeof command === "function") {
        //@ts-ignore
        commands[key] = (params: any) => new command(params);
      }
    }
  });

export class DynamoDbActuator extends Actuator {
  private readonly client: DynamoDBClient;

  public constructor(publisherProperties: ActuatorModel) {
    super(publisherProperties);

    this.client = new DynamoDBClient(this.configuration);
  }

  public async act(): Promise<any> {
    Logger.trace(`Executing actuator: ${this.name}`);
    try {
      if (commands[this.command] === undefined) {
        throw new Error(`Command '${this.command}' not found`);
      }
      const command = commands[this.command](this.params);
      const data = await this.client.send(command);
      Logger.trace(`Query completed: ${data}`);
      this.executeHookEvent("onCommandCompleted", data);
      return data;
    } catch (error: any) {
      Logger.error(error.toString());
      throw error;
    }
  }
}

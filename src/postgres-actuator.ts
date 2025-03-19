import {
  InputActuatorModel as ActuatorModel,
  Logger,
  Actuator,
} from "enqueuer";

import { Client } from "pg";

export class PostgresActuator extends Actuator {
  private readonly client: Client;

  public constructor(properties: ActuatorModel) {
    super(properties);

    this.client = new Client(this.options);
  }

  public async act(): Promise<any> {
    try {
      await this.client.connect();
      const result = await this.client.query(this.query, this.params);
      Logger.trace(`Query completed: ${result}`);
      this.executeHookEvent("onQueryCompleted", result);
      return result;
    } catch (error) {
      Logger.error(`Error executing query: ${error}`);
      throw error;
    }
  }
}

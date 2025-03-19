import {
  Actuator,
  InputActuatorModel,
  MainInstance,
  ActuatorProtocol,
} from "enqueuer";
import { DynamoDbActuator } from "./dynamodb-actuator";
import { PostgresActuator } from "./postgres-actuator";
import { MongoDbActuator } from "./mongodb-actuator";

export function entryPoint(mainInstance: MainInstance): void {
  mainInstance.protocolManager.addProtocol(
    new ActuatorProtocol(
      "dynamodb",
      (actuator: InputActuatorModel) => new DynamoDbActuator(actuator)
    )
  );
  mainInstance.protocolManager.addProtocol(
    new ActuatorProtocol(
      "postgres",
      (actuator: InputActuatorModel) => new PostgresActuator(actuator)
    )
  );
  mainInstance.protocolManager.addProtocol(
    new ActuatorProtocol(
      "mongodb",
      (actuator: InputActuatorModel) => new MongoDbActuator(actuator)
    )
  );
}

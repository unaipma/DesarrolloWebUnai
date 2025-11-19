class CommandManager {
  static execute(command, data) {
    command.execute(data);
  }
}

export class AddTrainCommand {
  constructor(trainStorage) {
    this.trainStorage = trainStorage;
  }

  execute(trainData) {
    const currentTrains = this.trainStorage.getTrainData();
    currentTrains.push(trainData);
    this.trainStorage.setTrainData(currentTrains);
  }
}

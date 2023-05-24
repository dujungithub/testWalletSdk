// task status
export enum TaskStatus {
  /** @description Not Started */
  NotStarted = 0,
  /** @description ing */
  Ing = 1,
  /** @description finish */
  Finish = 2,
  /** @description expire */
  Expire = 3
}

// can share
export enum PosterStatus {
  /** @description Created */
  Created = 0,
  /** @description Queued */
  Queued = 1,
  /** @description Succeeded */
  Succeeded = 2,
  /** @description Failed */
  Failed = 3
}

// task type
export enum TaskType {
  /** @description Discord */
  Discord = 1000,
  /** @description Steam */
  Steam = 3000,
  /** @description Wallet */
  Wallet = 10000,
  /** @description Email */
  Email = 10001,
  /** @description Twitter */
  Twitter = 2000,
  /** @description Follow */
  Follow = 2001,
  /** @description Like */
  Like = 2004,
  /** @description JoinDiscord */
  JoinDiscord = 1001
}

export const MonthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

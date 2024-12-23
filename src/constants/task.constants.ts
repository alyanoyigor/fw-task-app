export enum TaskStatusEnum {
  PENDING = 'pending',
  IN_PROGRESS = 'in-progress',
  COMPLETED = 'completed',
}

export enum TaskPriorityEnum {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export enum TaskSortEnum {
  TITLE = 'title',
  PRIORITY = 'priority',
  STATUS = 'status',
  DEADLINE = 'deadline',
}

export enum TaskKeysEnum {
  ID = 'id',
  TITLE = 'title',
  DESCRIPTION = 'description',
  PRIORITY = 'priority',
  STATUS = 'status',
  DEADLINE = 'deadline',
  SORT = 'sort',
  USER_ID = 'user_id',
}

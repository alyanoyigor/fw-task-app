import {
  TaskKeysEnum,
  TaskPriorityEnum,
  TaskSortEnum,
  TaskStatusEnum,
} from '@/constants/task.constants';

export interface BaseTaskInterface {
  [TaskKeysEnum.TITLE]: string;
  [TaskKeysEnum.DESCRIPTION]: string;
  [TaskKeysEnum.PRIORITY]: TaskPriorityEnum;
  [TaskKeysEnum.STATUS]: TaskStatusEnum;
  [TaskKeysEnum.DEADLINE]: Date;
}

export interface TaskInterface extends BaseTaskInterface {
  [TaskKeysEnum.ID]: number;
  [TaskKeysEnum.USER_ID]: string;
}

export interface TaskFiltersInterface {
  [TaskKeysEnum.PRIORITY]: TaskPriorityEnum | 'all';
  [TaskKeysEnum.STATUS]: TaskStatusEnum | 'all';
  [TaskKeysEnum.DEADLINE]: string;
  [TaskKeysEnum.SORT]: TaskSortEnum | 'none';
}

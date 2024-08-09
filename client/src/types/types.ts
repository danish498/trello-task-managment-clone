export interface Task {
  id: string;
  content: string;
  title: string;
  priority: string;
  deadline: string;
  createdAt: string;
  updatedAt: string;
}

export interface Status {
  id: string;
  title: string;
  taskIds: string[];
}

export interface Tasks {
  [key: string]: Task;
}

export interface Statuses {
  [key: string]: Status;
}

export interface ApiResponse {
  statusCode: number;
  data: {
    tasks: Tasks;
    statuses: Statuses;
    statusOrder: string[];
  };
  message: string;
  success: boolean;
}

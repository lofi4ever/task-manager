export interface Task {
  id?: number, //ids are set on backend
  name: string,
  description? : string,
  isComplete? : boolean
}
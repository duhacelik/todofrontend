import axios from 'axios'

const TASK_API_BASE_URL = "http://localhost:3000/todo/task"
const TASK_API_PRIORITY_URL = "http://localhost:3000/todo/task/priority"
const TASK_API_GROUP_URL = "http://localhost:3000/todo/task/group"
const TASK_API_DATE_URL = "http://localhost:3000/todo/task/date"

class TaskService{

    getTasks(){
        return axios.get(TASK_API_BASE_URL,
            {
              params:{
                id:2
              }  
            });
    }

    addTasks(taskName, taskPriority, taskGroup, taskDue){
        return axios.post(TASK_API_BASE_URL, 
            {
                
                    "userId":2,
                    "description": taskName,
                    "priority":taskPriority,
                    "groupId":taskGroup,
                    "dueDate": taskDue,
                    "active": true,

                
            });
    }

    deleteTask(taskId){
        return axios.delete(TASK_API_BASE_URL,
            {
              params:{
                id:taskId
              }  
            });
    }

    editTasks(taskId, taskName, taskPriority, taskGroup, taskDue){
        return axios.put(TASK_API_BASE_URL, 
            {
                    "Id":taskId,
                    "userId":2,
                    "description": taskName,
                    "priority":taskPriority,
                    "groupId":taskGroup,
                    "dueDate": taskDue,
                    "isActive": true,
                
            });
    }

    markedAsDone(taskId){
        return axios.put(TASK_API_BASE_URL, 
            {
                    "Id":taskId,
                    "isActive": false,
                
            });
    }

    filterPriority(filterpriority){
        return axios.get(TASK_API_PRIORITY_URL,
            {
              params:{
                id:2,
                priority:filterpriority
              }  
            });
    }

    filterGroup(filtergroup){
        return axios.get(TASK_API_GROUP_URL,
            {
              params:{
                id:2,
                group:filtergroup
              }  
            });
    }
    filterDue(filterdue){
        return axios.get(TASK_API_DATE_URL,
            {
              params:{
                id:2,
                dueDate:filterdue
              }  
            });
    }
}

export default new TaskService()
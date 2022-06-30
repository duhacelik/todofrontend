<template>
    <div class="container">
        <div class = "d-flex text-center">
            <input v-model="taskName" type="text" placeholder="Task Name" class="form-control">
            <input v-model="taskPriority" type="text" placeholder="Task Priority (between 1-3)" class="form-control">
            <input v-model="taskGroup" type="text" placeholder="Task Belonging Group" class="form-control">
            <input v-model="taskDue" type="text" placeholder="Task Due Date" class="form-control">
            <button @click="addTask" class = "btn btn-primary rounded-0"> ADD TASK</button>
            <button @click="updateTask(0, 0, 0, 0, 0)" class = "btn btn-warning rounded-0"> EDIT TASK</button>
        </div>
        <h1 class="text-center" style="margin-top:50px;"> Filter </h1>
        <div class = "d-flex text-center">
            <!--select v-model="filterPriority" class="form-select form-control">
                <option> Priority </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select-->
            <input v-model="filterPriority" type="text" placeholder="Priority" class="form-control">
            <input v-model="filterGroup" type="text" placeholder="Belonging Group" class="form-control">
            <input v-model="filterDue" type="text" placeholder="Task Due Date" class="form-control">
            <button @click="filterTask" class = "btn btn-dark"> Apply Filter</button>
            <div class = "text-center" @click="getTasks()">
                    <span class = "fa fa-undo fa-4x"></span>
            </div>
        </div>
        <h1 class="text-center" style="margin-top:50px;"> Active Tasks List</h1>
        <table class="table table-bordered">
            <thead>
                <!--th> Task Id </th>
                <th> IsActive? </th>
                <th> Belonging User </th-->
                <th> Task Description </th>
                <th> Task Priority </th>
                <th> Belonging Group </th>
                <th> Due Date </th>
            </thead>
            <tbody>
                <tr v-for = "task in tasks" v-bind:key = "task.Id">
                    <!--td> {{task.id}}</td>
                    <td> {{task.active}}</td>
                    <td> {{task.userId}}</td-->
                    <td> {{task.description}}</td>
                    <td> {{task.priority}}</td>
                    <td> {{task.groupId}}</td>
                    <td> {{task.dueDate}}</td>
                    <td> 
                        <div class = "text-center" @click="updateTask(task.id, task.description, task.priority, task.groupId, task.dueDate)">
                            <span class = "fa fa-pen"></span>
                        </div>
                    </td>
                    <td> 
                        <div class = "text-center" @click="deleteTask(task.id)">
                            <span class = "fa fa-trash"></span>
                        </div>
                    </td>
                    <td> 
                        <div class = "text-center" @click="markedDone(task.id)">
                            <span class = "fa-solid fa-check"></span>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import TaskService from '../services/TaskService'
window.globalId = 0;

    export default {
        name: 'TasksInfo',
        data(){
            return{
                taskName:'',
                taskPriority:'',
                taskGroup:'',
                taskDue:'',
                filterPriority:'',
                filterDue:'',
                filterGroup:'',
                tasks : []
            }
        },
        methods: {
            getTasks(){
                TaskService.getTasks().then((response)=>{
                    this.tasks = response.data;
                });
            },

            addTask(){
                if(this.taskName.length == 0) return;
                if(this.taskPriority < 1 && this.taskPriority > 3) return;
                TaskService.addTasks(this.taskName, this.taskPriority, this.taskGroup,this.taskDue)
                setTimeout(()=>{
                this.getTasks();
                },100);
            },

            deleteTask(taskId){
                TaskService.deleteTask(taskId)
                setTimeout(()=>{
                this.getTasks();
                },100);
            },

            updateTask(taskId, taskDesc, taskPrior, taskGroupId, taskDueDate){
                console.log(window.globalId)
                if(taskId != 0){
                    window.globalId = taskId;
                    this.taskName = taskDesc
                    this.taskPriority = taskPrior
                    this.taskGroup = taskGroupId
                    this.taskDue = taskDueDate
                }
                else{
                    if(this.taskName.length == 0) return;
                    if(this.taskPriority < 1 && this.taskPriority > 3) return;
                    TaskService.editTasks(window.globalId, this.taskName, this.taskPriority, this.taskGroup,this.taskDue)
                    window.globalId = 0
                    this.taskName = null
                    this.taskPriority = null
                    this.taskGroup = null
                    this.taskDue = null
                    setTimeout(()=>{
                    this.getTasks();
                    },100);

                }
            },
            markedDone(taskId){
                TaskService.markedAsDone(taskId)
                setTimeout(()=>{
                    this.getTasks();
                    },100);
            },
            filterTask(){
                if(this.filterDue == '' && this.filterGroup == '' && this.filterPriority == '')
                    return
                if(this.filterGroup != '')
                    TaskService.filterGroup(this.filterGroup).then((response)=>{
                    this.tasks = response.data;
                });
                else if(this.filterPriority != '')
                    TaskService.filterPriority(this.filterPriority).then((response)=>{
                    this.tasks = response.data;
                });
                else if(this.filterDue != '')
                    TaskService.filterDue(this.filterDue).then((response)=>{
                    this.tasks = response.data;
                });
                this.filterDue = ''
                this.filterGroup = ''
                this.filterPriority = ''           
            }
        },
        created(){
            this.getTasks();
            //this.addTask();
        }
    }


</script>
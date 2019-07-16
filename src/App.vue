<template>
  <div id="app">
    <h2>{{ project.name }}</h2>
    <h3>{{ project.day }}</h3>
    <input type="text" v-model="assigntask.name">
    <button @click="addTask">タスク追加</button>
    <div id="box1" class="box">
    <ul>
      <span class="tag">To Do</span>
      <draggable class="dragarea" :options="{group:'ITEMS'}" v-model="ToDos" @change="updateToDo">
        <li v-for="(ToDo,id) in ToDos" :key="id">{{ ToDo.name }}</li>
      </draggable>
      <span class="tag">Want</span>
      <draggable class="dragarea" :options="{group:'ITEMS'}" v-model="wantToDos" @change="updatewantToDo">
        <li v-for="(wantToDo,id) in wantToDos" :key="id">{{ wantToDo.name }}</li>
      </draggable>
    </ul>
  </div>

  <div id="box2" class="box">
    <ul>
      <span class="tag">WorkInProgress</span>
      <draggable class="dragarea" :options="{group:'ITEMS'}" v-model="WorkInProgress" @change="updateWiP">
        <li v-for="(WiP,id) in WorkInProgress" :key="id">{{ WiP.name }}</li>
       </draggable>
       <span class="tag">Want</span>
      <draggable class="dragarea" :options="{group:'ITEMS'}" v-model="wantWorkInProgress" @change="updatewantWiP">
        <li v-for="(wantWiP,id) in wantWorkInProgress" :key="id">{{ wantWiP.name }}</li>
      </draggable>
    </ul>
  </div>

  <div id="box3" class="box">
    <ul>
      <span class="tag">Done</span>
      <draggable class="dragarea" :options="{group:'ITEMS'}" v-model="Dones" @change="updateDone">
          <li v-for="(Done,id) in Dones" :key="id">{{ Done.name }}</li>
      </draggable>
      <span class="tag">Want</span>
      <draggable class="dragarea" :options="{group:'ITEMS'}" v-model="wantDones" @change="updatewantDone">
        <li v-for="(wantDone,id) in wantDones" :key="id">{{ wantDone.name }}</li>
      </draggable>
    </ul>
  </div>
  </div>
</template>

<script>
import './store'
import Project from './model/Project'
import Task from './model/Task'
import draggable from 'vuedraggable'

export default{
  components: {
    draggable,
  },
  data(){
    return {
      ToDos:[],
      WorkInProgress:[],
      Dones:[],
      wantToDos:[],
      wantWorkInProgress:[],
      wantDones:[],
      project: [{
        'id': null,
        'name': '',
        'day': ''
      }],
      task: [{
        'id': null,
        'project_id': null,
        'name': '',
        'phase': null,
        'want': false
      }],
      assigntask: {
        'name': ''
      }
    }
  },
  methods: {
    addTask: function(){
      Task.insert({
        data: {
          'project_id': this.project.id,
          'name': this.assigntask.name,
          'phase': 0,
        }
      })
      this.task = Task.all()
      this.ToDos = []
      this.WorkInProgress = []
      this.Dones = []
      this.wantToDos = []
      this.wantWorkInProgress = []
      this.wantDones =[]
      for(let i=0;i<this.task.length;i++){
        if(this.task[i].phase == 0 && !this.task[i].want){
          this.ToDos.push({
            'id': this.task[i].id,
            'project_id': this.task[i].project_id,
            'name': this.task[i].name,
            'want': this.task[i].want
          })
        }else if(this.task[i].phase == 0 && this.task[i].want){
          this.wantToDos.push({
            'id': this.task[i].id,
            'project_id': this.task[i].project_id,
            'name': this.task[i].name,
            'want': this.task[i].want
          })
        }else if(this.task[i].phase == 1 && !this.task[i].want){
          this.WorkInProgress.push({
            'id': this.task[i].id,
            'project_id': this.task[i].project_id,
            'name': this.task[i].name,
            'want': this.task[i].want
          })
        }else if(this.task[i].phase == 1 && this.task[i].want){
          this.wantWorkInProgress.push({
            'id': this.task[i].id,
            'project_id': this.task[i].project_id,
            'name': this.task[i].name,
            'want': this.task[i].want
          })
        }else if(this.task[i].phase == 2 && !this.task[i].want){
          this.Dones.push({
            'id': this.task[i].id,
            'project_id': this.task[i].project_id,
            'name': this.task[i].name,
            'want': this.task[i].want
          })
        }else if(this.task[i].phase == 2 && this.task[i].want){
          this.wantDones.push({
            'id': this.task[i].id,
            'project_id': this.task[i].project_id,
            'name': this.task[i].name,
            'want': this.task[i].want
          })
        }
      }
    },
    updateToDo:function(){
      console.log('update todo')
      for(let i=0;i<this.ToDos.length;i++){
        Task.update({
          data:{
            id: this.ToDos[i].id,
            phase:0
          }
        })
      }
    },
    updateWiP:function(){
      console.log('update WiP')
      for(let i=0;i<this.WorkInProgress.length;i++){
        Task.update({
          data:{
            id: this.WorkInProgress[i].id,
            phase:1
          }
        })
      }
    },
    updateDone:function(){
      console.log('update done')
      for(let i=0;i<this.Dones.length;i++){
        Task.update({
          data:{
            id: this.Dones[i].id,
            phase:2
          }
        })
      }
    },
    updatewantToDo:function(){
      console.log('update todo')
      for(let i=0;i<this.wantToDos.length;i++){
        Task.update({
          data:{
            id: this.wantToDos[i].id,
            phase:0
          }
        })
      }
    },
    updatewantWiP:function(){
      console.log('update WiP')
      for(let i=0;i<this.wantWorkInProgress.length;i++){
        Task.update({
          data:{
            id: this.wantWorkInProgress[i].id,
            phase:1
          }
        })
      }
    },
    updatewantDone:function(){
      console.log('update done')
      for(let i=0;i<this.wantDones.length;i++){
        Task.update({
          data:{
            id: this.wantDones[i].id,
            phase:2
          }
        })
      }
    }
  },
  created:function(){
      console.log(Project.query().with('tasks').get())
      let result = Project.find(1)
      this.$set(this.project,'id',result.id)
      this.$set(this.project,'name',result.name)
      this.$set(this.project,'day',result.day)
    }
  }

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.box {
  width: 30%;
  float: left;
  padding: 20px 0;
}
#box1 {
  background-color: #fdd;
}
#box2 {
  background-color: #ddf;
}
#box3 {
  background-color: #fdd;
}

.tag{
  padding:3px;
  font-size: 20px;
}

li {
  cursor:pointer;
  padding: 10px;
  border: solid #ddd 1px;
  background-color: #fff;
}

.dragarea{
  width:300px;
  height:300px;
  border: #2c3e50;
}
</style>

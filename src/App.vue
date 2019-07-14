<template>
  <div id="app">
    <h2>{{ project.name }}</h2>
    <h3>{{ project.day }}</h3>
    <div id="box1" class="box">
    <ul>
      <span>To Do</span>
      <draggable :options="{group:'ITEMS'}" v-model="ToDos" @change="updateToDo">
        <li v-for="ToDo in ToDos" :key="ToDo.id">{{ ToDo.name }}</li>
      </draggable>
    </ul>
  </div>

  <div id="box2" class="box">
    <ul>
      <span>WorkOnProgress</span>
      <draggable :options="{group:'ITEMS'}" v-model="WorkOnProgress" @change="updateWoP">
        <li v-for="WoP in WorkOnProgress" :key="WoP.id">{{ WoP.name }}</li>
       </draggable>
    </ul>
  </div>

  <div id="box3" class="box">
    <ul>
      <span>Done</span>
      <draggable :options="{group:'ITEMS'}" v-model="Dones" @change="updateDone">
        <li v-for="Done in Dones" :key="Done.id">{{ Done.name }}</li>
      </draggable>
    </ul>
  </div>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
    <button @click="addProject()">VuexORM!!</button>
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
      WorkOnProgress:[],
      Dones:[],
      project: [{
        'id': null,
        'name': '',
        'day': ''
      }],
      task: [{
        'id': null,
        'project_id': null,
        'name': '',
        'phase': null
      }],
      assigntask: {
        'id': null,
        'project_id': null,
        'name': '',
        'phase': null
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
      console.log(Task.all())
    },
    updateWoP:function(){
      console.log('update WoP')
      for(let i=0;i<this.WorkOnProgress.length;i++){
        Task.update({
          data:{
            id: this.WorkOnProgress[i].id,
            phase:1
          }
        })
      }
      console.log(Task.all())
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
      console.log(Task.all())
    }
  },
  created:function(){
    //テスト用シーディング
      const project = [
      {
        name: 'example project',
        tasks: [{
          project_id: 1,
          name: 'MAGURO',
          phase: 0
        },
        {
          project_id: 1,
          name: 'SAME',
          phase: 1
        },
        {
          project_id: 1,
          name: 'TAI',
          phase: 2
        }]
      }
      ]
      Project.insert({ data: project })
      console.log(Project.query().with('tasks').get())
      let result = Project.find(1)
      this.$set(this.project,'id',result.id)
      this.$set(this.project,'name',result.name)
      this.$set(this.project,'day',result.day)
      this.task = Task.all()

      for(let i=0;i<this.task.length;i++){
        if(this.task[i].phase == 0){
          this.ToDos.push({
            'id': this.task[i].id,
            'project_id': this.task[i].project_id,
            'name': this.task[i].name
          })
        }else if(this.task[i].phase == 1){
          this.WorkOnProgress.push({
            'id': this.task[i].id,
            'project_id': this.task[i].project_id,
            'name': this.task[i].name
          })
        }else if(this.task[i].phase == 2){
          this.Dones.push({
            'id': this.task[i].id,
            'project_id': this.task[i].project_id,
            'name': this.task[i].name
          })
        }
      }
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

li {
  cursor:pointer;
  padding: 10px;
  border: solid #ddd 1px;
  background-color: #fff;
}

</style>

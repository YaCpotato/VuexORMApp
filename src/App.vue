<template>
  <div id="app2">
    <h2>{{ project.name }}</h2>
    <h3>{{ project.id }}</h3>
    <h3>{{ project.day }}</h3>
    <p><el-input type="text" v-model="assigntask.name"></el-input>
    <el-button @click="addTask">タスク追加</el-button></p>
    
    <div id="box1" class="box">
    <ul>
      <span class="tag todo">To Do</span>
      <draggable class="dragarea" :options="{group:'ITEMS'}" v-model="ToDos" @change="updateToDo">
        <el-tag type="danger" effect="dark" v-for="(ToDo,id) in ToDos" :key="id">{{ ToDo.name }}</el-tag>
      </draggable>
      <span class="tag todo">Want</span>
      <draggable class="dragarea" :options="{group:'ITEMS'}" v-model="wantToDos" @change="updatewantToDo">
        <el-tag type="danger" effect="dark" v-for="(wantToDo,id) in wantToDos" :key="id">{{ wantToDo.name }}</el-tag>
      </draggable>
    </ul>
  </div>

  <div id="box2" class="box">
    <ul>
      <span class="tag wip">WorkInProgress</span>
      <draggable class="dragarea" :options="{group:'ITEMS'}" v-model="WorkInProgress" @change="updateWiP">
        <el-tag type="warning" effect="dark" v-for="(WiP,id) in WorkInProgress" :key="id">{{ WiP.name }}</el-tag>
       </draggable>
       <span class="tag wip">Want</span>
      <draggable class="dragarea" :options="{group:'ITEMS'}" v-model="wantWorkInProgress" @change="updatewantWiP">
        <el-tag type="warning" effect="dark" v-for="(wantWiP,id) in wantWorkInProgress" :key="id">{{ wantWiP.name }}</el-tag>
      </draggable>
    </ul>
  </div>

  <div id="box3" class="box">
    <ul>
      <span class="tag done">Done</span>
      <draggable class="dragarea" :options="{group:'ITEMS'}" v-model="Dones" @change="updateDone">
          <el-tag type="success" effect="dark" v-for="(Done,id) in Dones" :key="id">{{ Done.name }}</el-tag>
      </draggable>
      <span class="tag done">Want</span>
      <draggable class="dragarea" :options="{group:'ITEMS'}" v-model="wantDones" @change="updatewantDone">
        <el-tag type="success" effect="dark" v-for="(wantDone,id) in wantDones" :key="id">{{ wantDone.name }}</el-tag>
      </draggable>
    </ul>
  </div>
  </div>
</template>

<script>
import Vue from 'vue'
import './store'
import Task from './model/Task'
import Current from './model/Current'
import draggable from 'vuedraggable'
import VModal from 'vue-js-modal'
Vue.use(VModal)

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
    Initialize:function(){
      this.task = Task.query().where('project_id',this.project.id).get()
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
    addTask: function(){
      Task.insert({
        data: {
          'project_id': this.project.id,
          'name': this.assigntask.name,
          'phase': 0,
        }
      })
      this.Initialize()
    },
    updateToDo:function(){
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
      let result = Current.all()
      this.$set(this.project,'id',result[0].id)
      this.$set(this.project,'name',result[0].name)
      this.$set(this.project,'day',result[0].day)
      this.Initialize()
    }
  }

</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Russo+One&display=swap');
.el-input__inner{
    width:40%;
}

.el-tag{
  width:75%;
  font-weight:bold;
}

.el-tag .el-tag__inner{
  font-size: 30px;
}

#app {
  font-family: 'Russo One','Avenir', Helvetica, Arial, sans-serif;
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
  border:red 5px;
}
#box2 {
  background-color: #FFC7AF;
}
#box3 {
  background-color: #AEFFBD;
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

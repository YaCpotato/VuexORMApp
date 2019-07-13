<template>
  <div id="app">
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

export default{
  created:function(){
      const project = [
  {
    id: 1,
    name: 'example project',
    start: '2019/07/13',
    end: '2019/07/20',
    tasks: [{
      id: 1,
      project_id: 1,
      name: 'MAGURO',
      start: '2019/07/13',
      end: '2019/07/15'
    }]
  }
]

Project.insert({ data: project })
console.log(Project.query().with('tasks').get())
console.log(Project.all())
console.log(Task.all())
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
</style>

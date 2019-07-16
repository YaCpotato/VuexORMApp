<template>
<div id="app">
    <img alt="salmon logo" src="./assets/sushi_salmon.png">
    <el-input type="text" v-model="projectName"></el-input>
    <div id="nav">
      <router-link to="/App">Let's start project!!</router-link>
    </div>
    <router-view/>
</div>
</template>
<script>
import Project from './model/Project'

    export default{
        data(){
            return{
                projectName: '',
                projectDay: '',
            }
        },
        watch: {
            '$route': function (to, from) {
            if (to.path !== from.path) {
                this.startProject()
            }
            }
        },
        methods:{
            startProject:function(){
                Project.insert({
                    data:{
                        name: this.projectName
                    }
                })
                console.log(Project.all())
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
  width:100%;
}

.el-input .el-input__inner{
    width: 40%;
}
</style>
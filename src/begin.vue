<template>
<div id="app">
    <input type="text" v-model="projectName">
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

</style>
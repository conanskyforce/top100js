<template>
  <div id="app">
    <div v-if="test" class="test">
    <div :class="classBox1">1</div>
    <div class="animated">2</div>
    <div class="animated">3</div>
    <div class="animated">4</div>
    <hr>
    <input type="checkbox" value="where" v-model="checkedBox">
    <input type="radio" value="female" v-model="checkedRadio">
    <input type="radio" value="male" v-model="checkedRadio">
    <!-- <input type="checkbox" value="name" v-model="checkedBox"> -->
    {{checkedBox}}
    {{checkedRadio}}
    <hr>
    <select v-model="selected">
      <option>A</option>
      <option>B</option>
      <option>C</option>
    </select>
    {{selected}}
    <hr>
    <input @keyup.enter="classStyle=classStyle.repeat(2)" v-model="classStyle" name="">  {{classStyle}}
    </div>
    <div v-else class="container">
      <h1>Top100 
        <select v-model="language">
          <option value="JavaScript" selected>JavaScript</option>
          <option value="CSS" >CSS</option>
          <option value="HTML" >HTML</option>
          <option value="Node" >Node</option>
          <option value="Python" >Python</option>
        </select>
       repository</h1>
      <div class="items">
        <p v-show="projects.length==0">loading...</p>
        <ul class="items-ul">
          <li class="item" v-for="(item,idx) in projects">
            <span class="index">{{idx+1}}.</span>
            <span class="name"><a target="_blank" :href="item.url">{{item.name}}</a></span>
            <span>Stars:{{item.stargazers_count}}</span>
            <span>Intro:{{item.description}}</span>
          </li>
        </ul>
      </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      classBase:['animated'],
      classStyle:'',
      page:1,
      test:false,
      projects:[],
      checkedBox:[],
      checkedRadio:'',
      selected:'',
      language:'JavaScript'
    }
  },
  beforeCreate(){
    this.node = 3;
  },
  created(){
    var dateNow = localStorage.dateNow;
    if(dateNow&&(+dateNow-Date.now()<=-86400000)){
      localStorage.JavaScript = '';
      localStorage.CSS = '';
      localStorage.HTML = '';
      localStorage.Python = '';
      localStorage.Node = '';
    }else{
      localStorage.dateNow = Date.now();
    }
  },
  mounted(){
    var localData = this.getLocal('JavaScript');
    if(localData){
      this.projects = JSON.parse(localData);
    }
    else{
    this.$fetch(`https://api.github.com/search/repositories?q=JavaScript&per_page=100&sort=stars&page=${this.page}`)
    .then(res=>res.json())
    .then(res=>{
      this.projects = res.items;
      console.log('save items to localStorage');
      this.saveToLocal('JavaScript',JSON.stringify(res.items));
    })
    }
    var sr = ScrollReveal();
    // console.log(sr);
    sr.reveal('div');
  },
  methods:{
    saveToLocal(name,value){
      localStorage.setItem(name,value);
    },
    getLocal(name){
      var local = localStorage.getItem(name)
      if(local){
        console.log('get data from local.')
        return local;
      }
    }
  },
  computed:{
    classBox1(){
      var sty = this.classStyle;
      return {
        animated:true,
        tada:this.classStyle==='tada',
        bounce:this.classStyle==='bounce',
        flash:this.classStyle==='flash',
        shake:this.classStyle==='shake',
        swing:this.classStyle==='swing',
        wobble:this.classStyle==='wobble',
        jello:this.classStyle==='jello',
        hinge:this.classStyle==='hinge',
        rollIn:this.classStyle==='rollIn',
        jackInTheBox:this.classStyle==='jackInTheBox',
      }
    },
    cptMsg(){
      // return ++this.node ;
    },
    watchMsg(){
      // return this.component;
    }
  },
  filter:{
    toFixed(e){
      // return e.toFixed(2);
    }
  },
  watch:{
    cptMsg(v){
      // this.watchMsg = this.cptMsg+v;
    },
    language(newV,oldV){
      var localAllData = localStorage.getItem(newV);
      if(localAllData){
        this.projects = JSON.parse(localAllData);
        return;
      }else{
      this.projects = [];
      this.$fetch(`https://api.github.com/search/repositories?q=${newV}&per_page=100&sort=stars&page=${this.page}`)
      .then(res=>res.json())
      .then(res=>{
        this.projects = res.items;
        console.log('save items to localStorage');
        this.saveToLocal(newV,JSON.stringify(res.items));
      })
      }
    
    }
  }
}
</script>

<style>


div.animated{
  height: 150px;
  width: 150px;
  background-color: whitesmoke;
  border-radius: 5px;
  box-shadow: 3px 5px 12px lightgrey;
  text-align: center;
  line-height: 150px;
  margin: 25px;
  border:solid 1px grey;
  display: inline-block;
}
input{
  outline: none;
  height:25px;
  width:150px;
  line-height:25px;
  padding:12px;
  border-radius: 25px;
  border:solid 1px grey;
}
input:focus{
  border:solid 1px #42b983;
}
.container h1 {
  text-align:center;
}
.container p {
  text-align:center;
}
.items-ul{
  list-style: none;
    padding: 12px;
    border-radius:5px;
}
.items-ul li:nth-child(odd){
  background-color:whitesmoke;
}
.items-ul li:nth-child(even){
  background-color:lightgrey;
}
.items-ul li:hover{
  background-color:grey;
}
.items-ul li a:hover{
  color:red;
  // font-size:1.2em;
}
select{
  height: 40px;
  line-height: 45px;
  vertical-align: middle;
  margin-bottom: 2.5px;
  font-size: 1.em;
  font-size: 25px;
  outline:none;
}
select:focus{
  border:solid 1px green;
}



</style>
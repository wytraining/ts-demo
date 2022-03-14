<template>
    <div class="computed">

        全选：<input type="checkbox" v-model="allDone" ></input>
        <p>
            <input type="text" v-model="title" @keydown.enter="addTodo">
            <button @click="addTodo">添加</button>
        </p>
        <ul>
            <li v-for="todo in todos">
                <input type="checkbox" v-model="todo.done">
                <span :class="{done:todo.done}"> {{todo.title}}</span>
            </li>
        </ul>
        <span>未完成数/总数：{{undo}} / {{all}}</span>

    </div>
</template>

<script lang="ts">
import {Vue, Component} from "vue-property-decorator";

@Component({
    components: {}
})
export default class Computed extends Vue {

    // allDone:boolean = false
    // undo: number = 0
    // all: number = 0

    title: string =  "" // 定义一个数据
    todos:Array<any> = [ {title:'吃饭',done:false}, {title:'睡觉',done:true} ]

    // 获取未完成数
    get undo() {
        return this.todos.filter(v=>!v.done).length
    }

    // 获取总数
    get all() {
        return this.todos.length
    }

    // 获取全选状态
    get allDone() {
        console.log(this.undo);
        return this.undo === 0  // 如果未完成数为0（所有的都做了），全选
    }

    // 修改全选状态
    set allDone(val) {
        console.log(val);  // 根据修改的全选的状态，来修改数组每项是否选中
        this.todos.forEach(todo=>{
            todo.done = val
        })
    }

    // 添加待做任务
    addTodo(){
        this.todos.push({title: this.title,done:false})
        this.title = ""
    }

}
</script>

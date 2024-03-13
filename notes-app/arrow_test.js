const tasks = {
    tasks: [
        {
            text: 'Alışveriş',
            completed: true
        },
        {
            text: 'Temizlik',
            completed: false
        },
        {
            text: 'Ödev',
            completed: false
        },
    ],
    
    // getTasksToDo: function () {
    //     const tasksToDo = this.tasks.filter((task) => {
    //         return task.completed === false
    //     })
    //     return tasksToDo
    // }

    getTasksToDo() {
        return this.tasks.filter((task) => task.completed === false)
    }
}


console.log(tasks.getTasksToDo());
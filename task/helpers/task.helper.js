var Gulp;

function addTask(gulp, task) {
    var args;

    if(task instanceof Task) {
        args = [
            task.getName(),
            task.getDependencies()
        ];

        if(task.hasFunc()) {
            args.push(task.getFunc());
        }

        gulp.task.apply(gulp, args);

    } else if(Object.prototype.toString.call(task) === '[object Object]') {
        for(var k in task) {
            if(task.hasOwnProperty(k)) {
                addTask(gulp, task[k]);
            }
        }
    }
}

function Task(name, dependencies, func) {
    this.name = name;

    // no dependencies, task function as 2. argument
    if(typeof dependencies === 'function') {
        func = dependencies;
        dependencies = [];
    }

    // dependencies only, no task function
    if(typeof func === 'undefined') {
        func = false;
    }

    this.dependencies = dependencies;
    this.func = func
}

Task.prototype = {
    constructor: Task,

    getName: function() {
        return this.name;
    },
    getDependencies: function() {
        return this.dependencies;
    },
    getFunc: function() {
        return this.func;
    },
    hasFunc: function() {
        return this.func !== false;
    },
    addTo: function(gulp) {
        addTask(gulp, this);
    }
};

Task.to = function(gulp) {
    Gulp = gulp;
    return Task;
};
Task.add = function(task) {
    addTask(Gulp, task);
    return Task;
};

module.exports = Task;

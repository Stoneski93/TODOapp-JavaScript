(function (window) {
	'use strict';

	var taskList = [],
		ID = 1;

	function createTask () {
		var input = document.getElementById('new-todo'),
			task = {};

			

			task = {
				id: ID++, 
				value: input.value.trim(),
				status: 'active'
			};
			taskList.push(task);
			input.value = '';
	}

	
	function generateTask (task) {
		var todoList = document.getElementById('todo-list'),
			newTask = {},
			defaultItem = '',
			newItem = document.createElement('li');

			newTask = {
				id: task.id,
				value: task.value,
				status: task.status
			}

			defaultItem = [
	 			'<div class="view">',
					'<input id="'+newTask.id+'" class="toggle" type="checkbox">',
					'<label id="'+newTask.id+'">'+newTask.value+'</label>',
					'<button class="destroy"></button>',
				'</div>',
				'<input class="edit" value="Rule the web">',
			 ].join('');

		 	 newItem.innerHTML = defaultItem;
		 	 todoList.appendChild(newItem);
	}

	function printTasks(taskList) {
		var list = taskList,
			todoList = document.getElementById('todo-list');

			todoList.innerHTML = '';

		for (var i = 0; i<list.length; i++){
			generateTask(list[i]);
		}
	}

	document.getElementById("todo-form").addEventListener ("submit", function (e) {
		e.preventDefault();
		createTask();
		printTasks(taskList);	
	}, false);
	 

	// Your starting point. Enjoy the ride!	

})(window);

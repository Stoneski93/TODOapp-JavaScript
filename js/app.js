(function (window) {
	'use strict';
	
	// TODO
	// change css after checkbox click and change status
	// check all checkbox
	// count todo left
	// print in anoter tabs
	// delete tasks

	var taskList = [],
		ID = 1;


	var findById = function (id) {
		var searchId = id;
		
		for (var i=0; i < taskList.length; i++){
			if (taskList[i].id = searchId) {
				return taskList[i];
			}
		}
	};

	var createTask = function () {
		var input = document.getElementById('new-todo'),
			task = {};

			task = {
				id: ID++, 
				value: input.value.trim(),
				status: 'active'
			};

			taskList.push(task);
			input.value = '';
	};

	var generateTask = function(task) {
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
	};

	var printTasks = function (taskList) {
		var list = taskList,
			todoList = document.getElementById('todo-list');

			todoList.innerHTML = '';

		for (var i = 0; i<list.length; i++){
			generateTask(list[i]);
		}
	};

	var printActiveTasks = function (taskList) {
		var list = taskList,
			todoList = document.getElementById('todo-list');

			todoList.innerHTML = '';

		for (var i = 0; i<list.length; i++){
			if(list[i].status = 'active'){
				generateTask(list[i]);
			}
		}
	};

	var printCompleteTasks = function (taskList) {
		var list = taskList,
			todoList = document.getElementById('todo-list');

			todoList.innerHTML = '';

		for (var i = 0; i<list.length; i++){
			if(list[i].status = 'complete'){
				generateTask(list[i]);
			}
		}
	};

	var toggleStatus = function (item) {
		var searchId = item.getAttribute('id'),
		 	task = findById(searchId),
			itemList = item.parentNode.parentNode;

		if(itemList.classList.contains('completed')){
			itemList.className = "";
			task.status = 'active';
		} else {
			itemList.className = "completed";
			task.status = 'complete';
		}
		console.log(task);

	};

	var toggleFooter = function () {
		var footer = document.getElementById('info');
		if (taskList.length < 1) {
			footer.style.display = 'none';
		} else {
			footer.style.display = 'block';
		}
	};

	var checkboxes = document.getElementsByClassName('toggle');

	var addCheckboxesEvent = function () {
		for (var i=0; i<checkboxes.length; i++){
			checkboxes[i].addEventListener("change", function () {
		 		toggleStatus(this);
		 	}, false);
		}
	}	
	document.getElementById("todo-form").addEventListener ("submit", function (e) {
		e.preventDefault();
		createTask();
		printTasks(taskList);
		toggleFooter();
		addCheckboxesEvent();
	}, false);


	
	// checkboxes[0].addEventListener ("click", function () {
	// 		toggleStatus(checkboxes[0]);
	// 	}, false);
	// 	checkboxes[1].addEventListener ("click", function () {
	// 		toggleStatus(checkboxes[1]);
	// 	}, false);
	// }
	

	// Your starting point. Enjoy the ride!	

})(window);

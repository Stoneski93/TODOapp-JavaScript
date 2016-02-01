(function (window) {
	'use strict';
	
	// TODO
	// check all checkbox
	// count todo left
	// print in anoter tabs
	// delete tasks

	var taskList = [],
		ID = 1,
		checkboxes = document.getElementsByClassName('toggle'),
		deleteButtons = document.getElementsByClassName('destroy');


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
					'<button id="'+newTask.id+'" class="destroy"></button>',
				'</div>',
				'<input class="edit" value="Rule the web">',
			 ].join('');

		 	 newItem.innerHTML = defaultItem;
		 	 todoList.appendChild(newItem);
		 	 checkboxes = document.getElementsByClassName('toggle');
	};

	var printTasks = function (taskList) {
		var list = taskList,
			todoList = document.getElementById('todo-list');

			todoList.innerHTML = '';

		for (var i = 0; i<list.length; i++){
			generateTask(list[i]);
		}
		addCheckboxesEvent();
		addDeleteEvents();
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

	var deleteTask = function (item) {
		var searchId = item.getAttribute('id'),
			taskID;
		for (var i = 0;i < taskList.length; i++) {
			console.log(i, +searchId)
			if (taskList[i].id === +searchId) {
				taskID = i;
			}
		}

		taskList.splice(taskID,1);
		printTasks(taskList);
	}

	var toggleFooter = function () {
		var footer = document.getElementById('info');
		if (taskList.length < 1) {
			footer.style.display = 'none';
		} else {
			footer.style.display = 'block';
		}
	};

	var addCheckboxesEvent = function () {
		for (var i=0; i<checkboxes.length; i++){
			checkboxes[i].removeEventListener("change", function () {
		 		toggleStatus(this);
		 	}, false);
			checkboxes[i].addEventListener("change", function () {
		 		toggleStatus(this);
		 	}, false);
		}
	}

	var addDeleteEvents = function () {
		for (var i=0; i<deleteButtons.length; i++){
			deleteButtons[i].removeEventListener("click");
			deleteButtons[i].addEventListener("click", function () {
		 		deleteTask(this);
		 	}, false);
		}
		console.log(deleteButtons)
	}

	document.getElementById("todo-form").addEventListener ("submit", function (e) {
		e.preventDefault();
		createTask();
		printTasks(taskList);
		toggleFooter();
		// addCheckboxesEvent();
		// addDeleteEvents();
		
	}, false);

	// Your starting point. Enjoy the ride!	

})(window);

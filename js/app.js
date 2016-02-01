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
		var searchId = +id;
		
		for (var i=0; i < taskList.length; i++){
			if (taskList[i].id === searchId) {
				return i;
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
			defaultItem = '',
			newItem = document.createElement('li'),
			checked;

			checked = task.status === "complete" ? 'checked="checked"' : '';
			defaultItem = [
	 			'<div class="view">',
					'<input id="'+task.id+'" class="toggle" type="checkbox" '+checked+'>',
					'<label id="'+task.id+'">'+task.value+'</label>',
					'<button id="'+task.id+'" class="destroy"></button>',
				'</div>',
				'<input class="edit" value="Rule the web">',
			 ].join('');

			  if (task.status === 'complete' ) {
			 		newItem.className = 'completed';
			  }

		 	 newItem.innerHTML = defaultItem;
		 	 todoList.appendChild(newItem);
	};

	var printTasks = function (type) {
		var list = taskList,
			todoList = document.getElementById('todo-list'),
			statusParam = type;

			console.log(statusParam);

			todoList.innerHTML = '';

		for (var i = 0; i<list.length; i++){
			if((statusParam === 'active') && (list[i].status === 'active')){
				generateTask(list[i]);
			} else if ((statusParam === 'complete') && (list[i].status === 'complete')) {
				generateTask(list[i]);
			}
		}
		addCheckboxesEvent();
		addDeleteEvents();
		document.getElementById('todo-count').innerHTML = ''+countItemLeft()+'';
	};

	var printAllTasks = function (type) {
		var list = taskList,
			todoList = document.getElementById('todo-list'),
			statusParam = type;

			console.log(statusParam);

			todoList.innerHTML = '';

		for (var i = 0; i<list.length; i++){
			generateTask(list[i]);
		}
		addCheckboxesEvent();
		addDeleteEvents();
		document.getElementById('todo-count').innerHTML = ''+countItemLeft()+'';
	};

	var toggleStatus = function (item) {
		var searchId = +item.getAttribute('id'),
		 	taskID = findById(searchId),
			itemList = item.parentNode.parentNode;
			console.log(searchId);

		if(itemList.classList.contains('completed')){
			itemList.className = "";
			taskList[taskID].status = 'active';
		} else {
			itemList.className = "completed";
			taskList[taskID].status = 'complete';
		}
		
		printAllTasks();

	};

	var deleteTask = function (item) {
		var searchId = item.getAttribute('id'),
			taskID;

		for (var i = 0;i < taskList.length; i++) {
			if (taskList[i].id === +searchId) {
				taskID = i;
			}
		}

		taskList.splice(taskID,1);
		toggleFooter();
		printAllTasks();
	}

	var countItemLeft = function () { 
		var counter = 0,
			desc = '';
		for (var i=0; i<taskList.length; i++){
				if (taskList[i].status === 'active') {
					counter++;
				};
			}
		if(counter > 1){
			desc = ' items left';
		} else {
			desc= ' item left';
		}
		return counter + desc;
	};

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
	};

	var addDeleteEvents = function () {
		for (var i=0; i<deleteButtons.length; i++){
			deleteButtons[i].removeEventListener("click");
			deleteButtons[i].addEventListener("click", function () {
		 		deleteTask(this);
		 	}, false);
		}
	}

	document.getElementById("todo-form").addEventListener ("submit", function (e) {
		e.preventDefault();
		createTask();
		printAllTasks();
		toggleFooter();
		
	}, false);

	document.getElementById("all").addEventListener("click", function (e) {
		e.preventDefault();
		printAllTasks();

		
	}, false);
	document.getElementById("active").addEventListener ("click", function (e) {
		e.preventDefault();
		printTasks('active');
		
		
	}, false);
	document.getElementById("completed").addEventListener ("click", function (e) {
		e.preventDefault();
		printTasks('complete');
		
	}, false);
	// Your starting point. Enjoy the ride!	

})(window);

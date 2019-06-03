/*jshint esversion:6*/
function myFunction(divObj) {
    divObj.style.background="#90EE90";
}
$(document).one('pageinit', function(){
  let todos;
  showTodos();

  $('#submitAdd').on('tap', addTask);
  $('#todos').on('tap', '#editLink', setCurrent);
  $('#submitEdit').on('tap', editTask);
  $('#todos').on('tap', '#deleteLink', deleteTask);



  $('.date').each(function(){
    $(this).datepicker();
  });


  function deleteTask(){
    localStorage.setItem('currentTask', $(this).data('task'));
    localStorage.setItem('currentDate', $(this).data('date'));

    let currentTask = localStorage.getItem('currentTask');
    let currentDate = localStorage.getItem('currentDate');

    todos = getTodoObject();

    for(let i = 0;i<todos.length;i++){
      if(todos[i].task == currentTask && todos[i].date == currentDate){
        todos.splice(i, 1);
      }
      localStorage.setItem('todos',JSON.stringify(todos));
    }

    alert("Ülesanne kustatud");
    window.location.href="index.html";
  }

function setCurrent(){
  localStorage.setItem('currentTask', $(this).data('task'));
  localStorage.setItem('currentDate', $(this).data('date'));

  $('#editTask').val(localStorage.getItem('currentTask'));
  $('#editDate').val(localStorage.getItem('currentDate'));
}

function editTask(){
  let currentTask = localStorage.getItem('currentTask');
  let currentDate = localStorage.getItem('currentDate');

  todos = getTodoObject();

  for(let i = 0;i<todos.length;i++){
    if(todos[i].task == currentTask && todos[i].date == currentDate){
      todos.splice(i, 1);
    }
    localStorage.setItem('todos',JSON.stringify(todos));
  }

  let task = $('#editTask').val();
  let date = $('#editDate').val();

  let update_todo = {
    task: task,
    date: date
  };
  todos.push(update_todo);
  alert("Weight changed");
  localStorage.setItem('todos',JSON.stringify(todos));

  window.location.href="index.html";
  return false;
}

function addTask(){
  let task = $('#addTask').val();
  let date = $('#addDate').val();

  let todo = {
    task: task,
    date: date
  };

  todos = getTodoObject();
  todos.push(todo);

  localStorage.setItem('todos', JSON.stringify(todos));

  window.location.href="index.html";

  return false;
}
function getTodoObject(){
  let currentTodos = localStorage.getItem('todos');

  if(currentTodos != null){
    todos = JSON.parse(currentTodos);
  } else{
    todos = [];
  }

  return todos.sort(function(a, b){
    return new Date(b.date) - new Date(a.date);
  });

}

function showTodos(){
  todos = getTodoObject();
  if(todos != "" && todos != null){
    for(let i = 0;i < todos.length; i++){
        $('#todos').append('<li class="ui-body-inherit ui-li-static" onclick=myFunction(this)>'+ todos[i].task+ '<br>'+ todos[i].date +'<div class="controls"><a href="#edit" id="editLink" data-task="'+todos[i].task + '" data-date="' + todos[i].date + '">Edit|</a><a href="#" id="deleteLink" data-task="'+todos[i].task + '" data-date="' + todos[i].date + '" onclick="return confirm(\'Are you sure?\')">Delete</a></div></li>');
	}
  }
  $('#add').on('pageinit', function(){
    $('#todos').listview('refresh');
  });
}

function sortUnorderedList(ul, sortDescending) {
  if(typeof ul == "string")
    ul = document.getElementById(ul);
    var lis = ul.getElementsByTagName("LI");
    var vals = [];
    for(var i = 0, l = lis.length; i < l; i++)
      vals.push(lis[i].innerHTML);
      vals.sort();
  if(sortDescending)
    vals.reverse();
    for(var i = 0, l = lis.length; i < l; i++)
      lis[i].innerHTML = vals[i];
  }
  window.onload = function() {
    var desc = false;
    document.getElementById("sortByName").onclick = function() {
      sortUnorderedList("todos", desc);
      desc = !desc;
      return false;
  };
  };
});

filterSelection("all");
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("filterDiv");
  if (c == "all") c = "";
  // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
  for (i = 0; i < x.length; i++) {
    RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) AddClass(x[i], "show");
  }
}

// Show filtered elements
function AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

// Hide elements that are not selected
function RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}

// Add active class to the current control button (highlight it)
var btnContainer = document.getElementById("myBtnContainer");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}

/* Calculate MAN BMR */
(function () {
	function calculatemanBMR(manWeight, manHeight, manAge) {
		manWeight = parseFloat(manWeight);
		manHeight = parseFloat(manHeight);
		manAge = parseFloat(manAge);
		return ((manWeight * 10) + (manHeight * 6.25) - (manAge *5) + 5);
	}

	var manBMR = document.getElementById("manBMR");
	if (manBMR) {
		manBMR.onsubmit = function () {
			this.result.value = calculatemanBMR(this.manWeight.value, this.manHeight.value, this.manAge.value);
			return false;
		};
	}
}());



/* Calculate Woman BMR */
(function () {
	function calculatewomanBMR(womanWeight, womanHeight, womanAge) {
		womanWeight = parseFloat(womanWeight);
		womanHeight = parseFloat(womanHeight);
		womanAge = parseFloat(womanAge);
		return ((womanWeight * 10) + (womanHeight * 6.25) - (womanAge *5) - 161);
	}

	var womanBMR = document.getElementById("womanBMR");
	if (womanBMR) {
		womanBMR.onsubmit = function () {
			this.result.value = calculatewomanBMR(this.womanWeight.value, this.womanHeight.value, this.womanAge.value);
			return false;
		};
	}
}());

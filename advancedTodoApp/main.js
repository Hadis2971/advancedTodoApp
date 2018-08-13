var myStorage = localStorage;

var app_data = (myStorage.getItem("appData"))? JSON.parse(myStorage.getItem("appData")) :
{
    tasks_arr: [],
    completed_tasks_arr: [],
    brojac_how_many_left: 0
};

function update_storage(){
    myStorage.setItem("appData",JSON.stringify(app_data));
}

var btn_all = document.getElementById("btn_all"),
    btn_act = document.getElementById("btn_act"),
    btn_cmp = document.getElementById("btn_cmp");

var user_input = document.getElementById("user_input");
var add_btn = document.getElementById("add_btn");
var todoList = document.getElementById("todoList");
var todoList = document.getElementById("todoList");
var footer = document.getElementById("footer");
var how_many_left = document.getElementById("how_many_left");
var clear_completed = document.getElementById("clear_completed");

var all_btn = document.getElementById("btn_all");
var active_btn = document.getElementById("btn_act");
var completed_btn = document.getElementById("btn_cmp");

var arrow = document.getElementById("arrow");



function get_task(){
    var text_input = user_input.value;
    var same = false;
    if(text_input){
        
        if(app_data.tasks_arr.indexOf(text_input) !== -1){
            same = confirm("You have this task already added wanta to add again?");
            if(same){
                app_data.tasks_arr.push(text_input);
                
                app_data.brojac_how_many_left++;
            }else{
                return;
            }
        }else{
            if(!same){
                app_data.tasks_arr.push(text_input);
                app_data.brojac_how_many_left++;
            }else{
                return;
            }
            
        }
        
        update_storage();
        
        if(app_data.brojac_how_many_left === 1){
            how_many_left.textContent = (app_data.brojac_how_many_left + " item left");
        }else if(app_data.brojac_how_many_left > 1){
            how_many_left.textContent = (app_data.brojac_how_many_left + " items left");
        }
        
        add_task(text_input,false);
        user_input.value = "";
    }else{
        return;
    }
}

function remove_task(){
    app_data.brojac_how_many_left--;
    
    if(app_data.brojac_how_many_left === 1){
            how_many_left.textContent = (app_data.brojac_how_many_left + " item left");
    }else if(app_data.brojac_how_many_left > 1){
            how_many_left.textContent = (app_data.brojac_how_many_left + " items left");
    }
    
    var list_item = this.parentNode;
    var parent = this.parentNode.parentNode;
    var text_content= 
    list_item.textContent.substring(0,list_item.textContent.length -1);
    
    if(app_data.tasks_arr.indexOf(text_content) !== -1){
        
        app_data.tasks_arr.splice(app_data.tasks_arr.indexOf(text_content),1);
        update_storage();
    }else{
        app_data.completed_tasks_arr.splice(app_data.completed_tasks_arr.indexOf(text_content),1);
        update_storage();
    }
    
    parent.removeChild(list_item);
    
    if(footer.className === "show_footer" && !app_data.tasks_arr.length){
        footer.className = "";
        
    }
    
    if(!app_data.completed_tasks_arr.length){
        clear_completed.className = "";
    }
    console.log(app_data);
}

function compliting_task(){
    var list_item = this.parentNode;
    var text_content = list_item.textContent.substring(0,list_item.textContent.length-1);
    
    if(this.textContent === ""){
        this.textContent = "✓";
        if(app_data.completed_tasks_arr.indexOf(text_content) === -1){
            app_data.completed_tasks_arr.push(text_content);
            app_data.tasks_arr.splice(app_data.tasks_arr.indexOf(text_content),1);
            
            list_item.childNodes[1].style.transition = "all 0.8s";
            list_item.childNodes[1].style.opacity = "0.5";
            list_item.childNodes[1].style.textDecoration = "line-through";
            app_data.brojac_how_many_left--;
            update_storage();
            if(app_data.brojac_how_many_left === 1){
            how_many_left.textContent = (app_data.brojac_how_many_left + " item left");
            }else if(app_data.brojac_how_many_left > 1){
                how_many_left.textContent = (app_data.brojac_how_many_left + " items left");
            }else if(!app_data.brojac_how_many_left){
                how_many_left.textContent = "";
            } 
        }
    }else{
        this.textContent = "";
        text_content = text_content.substring(1,text_content.length);
        if(app_data.completed_tasks_arr.indexOf(text_content) !== -1){
           app_data.completed_tasks_arr.splice(app_data.tasks_arr.indexOf(text_content),1);
           app_data.tasks_arr.push(text_content);
            
            app_data.brojac_how_many_left++;
            if(app_data.brojac_how_many_left === 1){
            how_many_left.textContent = (app_data.brojac_how_many_left + " item left");
            }else if(app_data.brojac_how_many_left > 1){
                how_many_left.textContent = (app_data.brojac_how_many_left + " items left");
            }         
            
            
           update_storage();
        }
        list_item.childNodes[1].style.transition = "all 0.8s";
        list_item.childNodes[1].style.opacity = "1";
        list_item.childNodes[1].style.textDecoration = "none";
        
    }
    
        
    if(clear_completed.className === "" && app_data.completed_tasks_arr.length){
        clear_completed.className = "show_clear_completed";
    }
    
    if(!app_data.completed_tasks_arr.length){
        clear_completed.className = "";
    }
    
    console.log(app_data);
}

function add_task(task,bol){
    var li_item = document.createElement("li");
    li_item.classList.add("list_style");
    
    
    if(!bol){
       var btn_circle = document.createElement("button");
       btn_circle.classList.add("circle");
       btn_circle.addEventListener("click",compliting_task); 
    }else{
        var btn_circle = document.createElement("button");
        btn_circle.classList.add("circle");
        btn_circle.textContent = "✓";
        btn_circle.addEventListener("click",compliting_task); 
    }
    
    if(!bol){
        var text = document.createElement("p");
        text.classList.add("para");
        text.textContent = task;
    }else{
        var text = document.createElement("p");
        text.classList.add("para");
        text.style.opacity = "0.5";
        text.style.textDecoration = "line-through";
        text.textContent = task;
    }
    
    
    
    var btn_delete = document.createElement("button");
    btn_delete.innerHTML = "&#10005;";
    btn_delete.classList.add("delete");
    btn_delete.addEventListener("click",remove_task);
    
    li_item.appendChild(btn_circle);
    li_item.appendChild(text);
    li_item.appendChild(btn_delete);
    
    
    todoList.insertBefore(li_item,todoList.childNodes[0]);
    
    
   
    if(footer.className === ""){
        footer.className += "show_footer";

    } 
   
    console.log(app_data);
}

add_btn.addEventListener("click",get_task);


function render_storage(){
    var i, i2;
    
    if(app_data.tasks_arr.length){
        for(i = 0; i < app_data.tasks_arr.length; i++){
            add_task(app_data.tasks_arr[i],false);
        }
    }
    
    if(app_data.completed_tasks_arr.length){
        for(i2 = 0; i2 < app_data.completed_tasks_arr.length; i2++){
            add_task(app_data.completed_tasks_arr[i2],true);
        }
    }
    
    if(app_data.brojac_how_many_left){
        if(app_data.brojac_how_many_left === 1){
            how_many_left.textContent = (app_data.brojac_how_many_left + " item left");
        }else if(app_data.brojac_how_many_left > 1){
            how_many_left.textContent = (app_data.brojac_how_many_left + " items left");
        } 
    }
    
    if(clear_completed.className === "" && app_data.completed_tasks_arr.length){
        clear_completed.className = "show_clear_completed";
    }
    
}


function clear_all_completed(){
    app_data.completed_tasks_arr = [];
    update_storage();
    
    var childs = todoList.childNodes;
    var i;
    
    for(i = 0; i < childs.length; i++){
        if(todoList.childNodes[i].nodeName === "LI"){
            if(todoList.childNodes[i].childNodes[0].textContent === "✓"){
                todoList.removeChild(childs[i]);
            }
        }
    }
    for(i = 0; i < childs.length; i++){
        if(todoList.childNodes[i].nodeName === "LI"){
            if(todoList.childNodes[i].childNodes[0].textContent === "✓"){
                todoList.removeChild(childs[i]);
            }
        }
    }
    
    clear_completed.className = "";
    if(!app_data.tasks_arr.length){
        footer.className = "";
    }
    
    arrow.className = "";
    
}
clear_completed.addEventListener("click",clear_all_completed);

function mark_as_completed(){
    var i, i2;
    if(arrow.className === ""){
        var x = app_data.completed_tasks_arr.concat(app_data.tasks_arr);
        app_data.tasks_arr = [];
        app_data.completed_tasks_arr = x;
        
        for(i = 0; i < todoList.childNodes.length; i++){
            if(todoList.childNodes[i].nodeName === "LI"){
                todoList.childNodes[i].childNodes[0].textContent = "✓";
                todoList.childNodes[i].childNodes[1].style.opacity = "0.5";
                todoList.childNodes[i].childNodes[1].style.textDecoration = "line-through";
            }
        }
        
        app_data.brojac_how_many_left = 0;
        how_many_left.textContent = "";
    }else{
       var y = app_data.tasks_arr.concat(app_data.completed_tasks_arr);
       app_data.completed_tasks_arr = [];
       app_data.tasks_arr = y;
       app_data.brojac_how_many_left = app_data.tasks_arr.length;
        
       for(i2 = 0; i2< todoList.childNodes.length; i2++){
            if(todoList.childNodes[i2].nodeName === "LI"){
                todoList.childNodes[i2].childNodes[0].textContent = "";
                todoList.childNodes[i2].childNodes[1].style.opacity = "1";
                todoList.childNodes[i2].childNodes[1].style.textDecoration = "none";
            }
        }
        
       if(app_data.brojac_how_many_left === 1){
        how_many_left.textContent = (app_data.brojac_how_many_left + " item left");
        }else if(app_data.brojac_how_many_left > 1){
            how_many_left.textContent = (app_data.brojac_how_many_left + " items left");
        }
    }
    
    if(app_data.completed_tasks_arr.length){
        clear_completed.className += "show_clear_completed"
    }
    
    update_storage();
}

arrow.addEventListener("click",mark_as_completed);
arrow.addEventListener("click",function(){
    if(arrow.className === ""){
        arrow.className += "arrow_class";
    }else{
        arrow.className = "";
    }
});



function show_active(){
    var i, i2, j;
    
    while (todoList.childNodes.length > 2) {
       todoList.removeChild(todoList.firstChild);
   }
    
    for(i2 = 0; i2 < app_data.tasks_arr.length; i2++){
        add_task(app_data.tasks_arr[i2],false);
    }
}

function show_complete(){
    var i, i2, j;
    
    while (todoList.childNodes.length > 2) {
       todoList.removeChild(todoList.firstChild);
    }
    
    for(j = 0; j < app_data.completed_tasks_arr.length; j++){
        add_task(app_data.completed_tasks_arr[j],true);
    }
}

function show_all(){
   var i, i2, j;
    
    while (todoList.childNodes.length > 2) {
       todoList.removeChild(todoList.firstChild);
    } 
    for(i2 = 0; i2 < app_data.tasks_arr.length; i2++){
        add_task(app_data.tasks_arr[i2],false);
    }
    for(j = 0; j < app_data.completed_tasks_arr.length; j++){
        add_task(app_data.completed_tasks_arr[j],true);
    }
    
    
}

all_btn.addEventListener("click",show_all);
active_btn.addEventListener("click",show_active);
completed_btn.addEventListener("click",show_complete);

window.onkeypress = function(e){
    if(e.keyCode === 13){
        get_task();
    }
}

render_storage();

myStorage.clear();






















